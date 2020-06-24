import React, { Component } from 'react';
import Prism from "prismjs";

import BlogPost from '../../templates/blog-post/base';

class P120119 extends Component {
    componentDidMount () {
        Prism.highlightAll();
    }

    render () {
        return (
            <BlogPost id="p120119" title="EBS volume resizing in EKS" subtitle="12.01.2019">
                <p>
                    Awhile back I created an EBS volume via Kubernetes’ dynamic volume provisioning to store data for a Postgres database:
                </p>

                <pre className="code-block">
                    <code className="language-yaml">---</code>
                    <code className="language-yaml">apiVersion: v1</code>
                    <code className="language-yaml">kind: PersistentVolumeClaim</code>
                    <code className="language-yaml">metadata:</code>
                    <code className="language-yaml">  name: pvc-postgres</code>
                    <code className="language-yaml">  labels:</code>
                    <code className="language-yaml">    type: amazonEBS</code>
                    <code className="language-yaml">spec:</code>
                    <code className="language-yaml">  accessModes:</code>
                    <code className="language-yaml">    - ReadWriteOnce</code>
                    <code className="language-yaml">  resources:</code>
                    <code className="language-yaml">    requests:</code>
                    <code className="language-yaml">      storage: 60Gi</code>
                </pre>
                <pre>
                    <code className="language-bash">$ kubectl apply -f k8s/dynamic-volume.yaml</code>
                </pre>

                <p>
                    The time had come to resize the volume, which normal wouldn’t be an issue with k8s. Unfortunately, I was fairly new to Kubernetes
                    (k8s) and created the volume using the default storage class.
                </p>

                <h3 className="code-block-header">List StorageClasses:</h3>
                <pre>
                    <code className="language-bash">$ kubectl get storageclass</code>
                    <code className="language-bash">NAME            PROVISIONER             AGE</code>
                    <code className="language-bash">fast            kubernetes.io/aws-ebs   25d</code>
                    <code className="language-bash">gp2 (default)   kubernetes.io/aws-ebs   35d</code>
                    <code className="language-bash">standard        kubernetes.io/aws-ebs   35d</code>
                </pre>

                <h3 className="code-block-header">Describe the default StorageClass:</h3>
                <pre>
                    <code className="language-bash">$ kubectl describe storageclass gp2</code>
                    <code className="language-bash">Name:            gp2</code>
                    <code className="language-bash">IsDefaultClass:  Yes</code>
                    <code className="language-bash">...</code>
                    <code className="language-bash">AllowVolumeExpansion:  unset</code>
                    <code className="language-bash">...</code>
                </pre>

                <p>
                    The default storage class, gp2, did not have the flag allowVolumeExpansion set at the time of volume creation; which prevented me
                    from resizing the PV resource. You can update the allowVolumeExpansion flag of a storage class, but this has no effect on existing
                    volumes. To get around this, I had to create a new PV via static provisioning using a StorageClass that has the allowVolumeExpansion
                    set to true. Static provisioning allowed me to reuse the EBS volume. Before doing this, I cleaned up the existing resources:
                </p>

                <ul className="blog-post__list">
                    <li>Change the PV reclaim policy to Retain</li>
                    <li>Delete the pod using the PVC</li>
                    <li>Delete the PVC</li>
                    <li>Delete the PV</li>
                </ul>

                <div className="blog-post__note">
                    <b>!!</b> Ensure that the PV has a Reclaim Policy of Retain so that the actual EBS volume (data) does not get deleted. <b>!!</b>
                </div>

                <p>
                    Once the old resources were removed, I made a custom StorageClass with the allowVolumeExpansion enabled:
                </p>

                <h3 className="code-block-header" />
                <pre>
                    <code className="language-yaml">---</code>
                    <code className="language-yaml">apiVersion: storage.k8s.io/v1</code>
                    <code className="language-yaml">kind: StorageClass</code>
                    <code className="language-yaml">metadata:</code>
                    <code className="language-yaml">  name: standard</code>
                    <code className="language-yaml">provisioner: kubernetes.io/aws-ebs</code>
                    <code className="language-yaml">reclaimPolicy: Retain</code>
                    <code className="language-yaml">parameters:</code>
                    <code className="language-yaml">  type: gp2</code>
                    <code className="language-yaml">mountOptions:</code>
                    <code className="language-yaml">  - debug</code>
                    <code className="language-yaml">volumeBindingMode: Immediate</code>
                    <code className="language-yaml">allowVolumeExpansion: true</code>
                </pre>
                <pre>
                    <code className="language-bash">$ kubectl apply -f k8s/custom-storage-class.yaml</code>
                </pre>

                <p>
                    Defined the PV specifying the custom StorageClass and the EBS volume ID created by the dynamic provisioning:
                </p>

                <h3 className="code-block-header" />
                <pre>
                    <code className="language-yaml">---</code>
                    <code className="language-yaml">apiVersion: v1</code>
                    <code className="language-yaml">kind: PersistentVolume</code>
                    <code className="language-yaml">metadata:</code>
                    <code className="language-yaml">  name: pv001</code>
                    <code className="language-yaml">  labels:</code>
                    <code className="language-yaml">    type: amazonEBS</code>
                    <code className="language-yaml">spec:</code>
                    <code className="language-yaml">  capacity:</code>
                    <code className="language-yaml">    storage: 120Gi</code>
                    <code className="language-yaml">  storageClassName: standard</code>
                    <code className="language-yaml">  accessModes:</code>
                    <code className="language-yaml">    - ReadWriteOnce</code>
                    <code className="language-yaml">  awsElasticBlockStore:</code>
                    <code className="language-yaml">    volumeID: vol-xxxxxxx</code>
                    <code className="language-yaml">    fsType: ext4</code>
                </pre>
                <pre>
                    <code className="language-bash">$ kubectl apply -f k8s/static-volume.yaml</code>
                </pre>

                <p>
                    Created a PVC that references the custom StorageClass and the newly create PV:
                </p>

                <pre>
                    <code className="language-yaml">---</code>
                    <code className="language-yaml">apiVersion: v1</code>
                    <code className="language-yaml">kind: PersistentVolumeClaim</code>
                    <code className="language-yaml">metadata:</code>
                    <code className="language-yaml">  name: pvc-postgres</code>
                    <code className="language-yaml">  labels:</code>
                    <code className="language-yaml">    type: amazonEBS</code>
                    <code className="language-yaml">spec:</code>
                    <code className="language-yaml">  storageClassName: standard</code>
                    <code className="language-yaml">  accessModes:</code>
                    <code className="language-yaml">    - ReadWriteOnce</code>
                    <code className="language-yaml">  volumeName: pv001</code>
                    <code className="language-yaml">  resources:</code>
                    <code className="language-yaml">    requests:</code>
                    <code className="language-yaml">      storage: 120Gi</code>
                </pre>
                <pre>
                    <code className="language-bash">$ kubectl apply -f k8s/pvc.yaml</code>
                </pre>

                <p>
                    The EBS volume has now been resized and you can attach it to a pod. You must make sure that the pod and volume
                    are in the same region and availability zone as the PVC, which can be ensured via node selectors. Once the pod
                    has been redeployed with the attach volume, it is a good idea to check that the pod has picked up resized volume.
                </p>

                <pre>
                    <code className="language-yaml">$ kubectl exec -it POD_NAME -- /bin/bash</code>
                    <code className="language-yaml">root@pod:/# df -h</code>
                    <code className="language-yaml">Filesystem      Size  Used Avail Use% Mounted on</code>
                    <code className="language-yaml">...</code>
                    <code className="language-yaml">/dev/nvme1n1    58G   439M 60G   1%   /var/lib/postgresql/data</code>
                    <code className="language-yaml">...</code>
                    <code className="language-yaml">root@pod:/# lsblk</code>
                    <code className="language-yaml">NAME          MAJ:MIN RM  SIZE RO TYPE MOUNTPOINT</code>
                    <code className="language-yaml">...</code>
                    <code className="language-yaml">nvme1n1       259:3    0  120G  0 disk /var/lib/postgresql/data</code>
                </pre>

                <p>
                    In the above code snippet, the pod only had access to the original volume size. To fix this the filesystem had to be expanded
                    to allow the additional space on the volume to be usable by the pod. Kubernetes usually takes care of this for you but since
                    I manually increased the EBS volume in the AWS console this did not happen. Expanding a file system requires elevated privileges
                    not available from a container. You need to directly connect to the node, which was not an option for me. I created these
                    nodes in AWS and did not provided SSH credentials at node creation time. To get around this, I created a privileged pod
                    that will run on the same node that has the volume attach to it. This privileged pod will give me root access
                    and the ability to resize the filesystem.  Download the privileged
                    pod YAML <a href="https://gist.github.com/comeaujoseph/d29dfc253122bef324cd03de75685c1e" target="_blank">here</a>.
                </p>
                <pre>
                    <code className="language-yaml">$ kubectl create -f privileged-pod.yaml</code>
                    <code className="language-yaml">$ kubectl exec -it privileged-pod sh</code>
                    <code className="language-yaml">/ # chroot /host/</code>
                    <code className="language-yaml">[root@ip-192-168-156-1 /]# resize2fs /dev/nvme1n1</code>
                    <code className="language-yaml">[root@ip-192-168-156-1 /]# df -h</code>
                    <code className="language-yaml">Filesystem      Size  Used Avail Use% Mounted on</code>
                    <code className="language-yaml">...</code>
                    <code className="language-yaml">/dev/nvme1n1            118.0G    444.0M    117.5G   0% /host/var/lib/kubelet/plugins/kubernetes.io/aws-ebs/mounts/vol-xxxxx</code>
                    <code className="language-yaml">/dev/nvme1n1            118.0G    444.0M    117.5G   0% /host/var/lib/kubelet/pods/xx-xx-xx-xx-xx/volumes/kubernetes.io~aws-ebs/pv001</code>
                    <code className="language-yaml">/dev/nvme1n1            118.0G    444.0M    117.5G   0% /host/var/lib/kubelet/pods/xx-xx-xx-xx-xx/volume-subpaths/pv001/postgres/0</code>
                    <code className="language-yaml">...</code>
                    <code className="language-yaml">$ kubectl delete pod privileged-pod</code>
                </pre>

                <p>You should now see that the filesystem matches the volume size.</p>

                <section className="blog-post__references">
                    <h3>References</h3>
                    <a href="https://kubernetes.io/docs/concepts/storage/persistent-volumes/" target="_blank">https://kubernetes.io/docs/concepts/storage/persistent-volumes/</a>
                    <a href="https://kubernetes.io/docs/concepts/storage/persistent-volumes/#retain" target="_blank">https://kubernetes.io/docs/concepts/storage/persistent-volumes/#retain</a>
                    <a href="https://stackoverflow.com/questions/50667437/what-to-do-with-released-persistent-volume" target="_blank">https://stackoverflow.com/questions/50667437/what-to-do-with-released-persistent-volume</a>
                    <a href="https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/recognize-expanded-volume-linux.html" target="_blank">https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/recognize-expanded-volume-linux.html</a>
                    <a href="https://kubernetes.io/blog/2018/07/12/resizing-persistent-volumes-using-kubernetes/" target="_blank">https://kubernetes.io/blog/2018/07/12/resizing-persistent-volumes-using-kubernetes/</a>
                    <a href="https://gardener.cloud/050-tutorials/content/howto/ssh-into-node/" target="_blank">https://gardener.cloud/050-tutorials/content/howto/ssh-into-node/</a>
                </section>

            </BlogPost>
        );
    }
}

export default P120119;
