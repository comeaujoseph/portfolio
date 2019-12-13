import React, { Component } from 'react';
import Prism from "prismjs";

import BlogPost from '../../templates/blog-post/base';

class P121519 extends Component {
    componentDidMount () {
        Prism.highlightAll();
    }

    render () {
        return (
            <BlogPost id="p121519" title="Capturing Client IPs: AWS + Kubernetes + NGINX" subtitle="12.15.2019">
                <p>
                    I needed to forward the IP addresses of the external clients to the pods backing my Kubernetes service.
                    The pods are OpenResty web application, which uses NGINX as a webserver. There were 3 solutions that I was considering:
                </p>

                <ul className="blog-post__list">
                    <li>AWS Elastic Load Balancer (ELB) with proxy-protocol</li>
                    <li>AWS Network Load Balancer (NLB)</li>
                    <li>NGINX-ingress-controller</li>
                </ul>

                <p>
                    I started with the AWS ELB with proxy-protocol option. To get this working I needed to enable the protocol on the ELB. Kubernetes
                    already provides support for this; simply had to add the following line to the service annotations:
                </p>

                <pre>
                    <code className="language-yaml">---</code>
                    <code className="language-yaml">apiVersion: v1</code>
                    <code className="language-yaml">kind: Service</code>
                    <code className="language-yaml">metadata:</code>
                    <code className="language-yaml">  name: linkprotect</code>
                    <code className="language-yaml">  annotations:</code>
                    <code className="language-yaml">    service.beta.kubernetes.io/aws-load-balancer-proxy-protocol: "*"</code>
                    <code className="language-yaml">...</code>
                </pre>

                <p>
                    Now that the ELB is setup to forward the client connection information, NGINX needs to be configured to use the data.
                    <a href="https://docs.nginx.com/nginx/admin-guide/load-balancer/using-proxy-protocol/" target="_blank"> Following the instructions provided by NGINX,</a> I
                    was able to get everything working. I wasn’t completely satisfied with this option because the NGINX configuration file does not work with Docker,
                    which I use for testing. That is when I came across the AWS NLB and preservers the client IP without any additional configurations.
                    This means I do not have to separate NGINX.conf file for k8s and docker. In the service YAML, file simple specify the load balancer type and set the
                    spec.externalTrafficPolicy to Local:
                </p>

                <pre>
                    <code className="language-yaml">---</code>
                    <code className="language-yaml">apiVersion: v1</code>
                    <code className="language-yaml">kind: Service</code>
                    <code className="language-yaml">metadata:</code>
                    <code className="language-yaml">  name: linkprotect</code>
                    <code className="language-yaml">  annotations:</code>
                    <code className="language-yaml">    service.beta.kubernetes.io/aws-load-balancer-type: "nlb"</code>
                    <code className="language-yaml">spec:</code>
                    <code className="language-yaml">  type: LoadBalancer</code>
                    <code className="language-yaml">  externalTrafficPolicy: Local</code>
                    <code className="language-yaml">  ports:</code>
                    <code className="language-yaml">  - name: http</code>
                    <code className="language-yaml">    port: 80</code>
                    <code className="language-yaml">    protocol: TCP</code>
                    <code className="language-yaml">    targetPort: 80</code>
                    <code className="language-yaml">  selector:</code>
                    <code className="language-yaml">    app: linkprotect</code>
                </pre>

                <p>
                    The third option, NGINX-ingress-controller, works but found it to be more complex and advanced compared to other options. If you want more flexible
                    routing, traffic manipulation, and a cloud agnostic solution, then it could be worth the additional configuration.
                </p>

                <section className="blog-post__references">
                    <h3>References</h3>
                    <a href="https://docs.nginx.com/nginx/admin-guide/load-balancer/using-proxy-protocol/" target="_blank">https://docs.nginx.com/nginx/admin-guide/load-balancer/using-proxy-protocol/</a>
                    <a href="https://github.com/kubernetes/kops/issues/5243" target="_blank">https://github.com/kubernetes/kops/issues/5243</a>
                    <a href="https://github.com/kubernetes/kubernetes/issues/49682#issuecomment-322236009" target="_blank">https://github.com/kubernetes/kubernetes/issues/49682#issuecomment-322236009</a>
                    <a href="https://aws.amazon.com/blogs/opensource/network-load-balancer-support-in-kubernetes-1-9/" target="_blank">https://aws.amazon.com/blogs/opensource/network-load-balancer-support-in-kubernetes-1-9/</a>
                </section>

            </BlogPost>
        );
    }
}

export default P121519;
