import React, { Component } from 'react';

import Header from '../../../organisms/header/base';
import Posts from '../../../molecules/posts/base';
import Post from '../../../molecules/posts/post';

class Home extends Component {
    render () {
        return (
            <div id="home">
                <Header title="recent posts" subtitle="updated 02.23.2020" />
                <Posts>
                    <Post
                        title="EBS volume resizing in EKS"
                        summary="Deploy, manage, and use an AWS elastic block volume (EBS) in Kubernetes. Resize an
                        existing EBS volume, increase claim size, and grow the storage capacity of a pod."
                        date="12.01.2019"
                        link="/post/120119" />
                    <Post
                        title="Capturing Client IPs: AWS + Kubernetes + NGINX"
                        summary="Receive client connection information in NGINX with AWS and Kubernetes"
                        date="12.15.2019"
                        link="/post/121519" />
                    <Post
                        title="Java Debugging: High CPU Usage"
                        summary="Troubleshooting a Java process that is using a large amount of CPU"
                        date="02.09.2020"
                        link="/post/020920" />
                    <Post
                        title="React.js: Setup Guide"
                        summary="A React.js browser application setup guide"
                        date="02.23.2020"
                        link="/post/022320" />
                </Posts>
            </div>
        );
    }
}

export default Home;

