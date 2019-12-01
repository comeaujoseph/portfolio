import React, { Component } from 'react';

import Header from '../../../organisms/header/base';
import Posts from '../../../molecules/posts/base';
import Post from '../../../molecules/posts/post';

class Home extends Component {
    render () {
        return (
            <div id="home">
                <Header title="recent posts" subtitle="updated 12.01.2019" />
                <Posts>
                    <Post
                        title="EBS volume resizing in EKS"
                        summary="Deploy, manage, and use an AWS elastic block volume (EBS) in Kubernetes. Resize an
                        existing EBS volume, increase claim size, and grow the storage capacity of a pod."
                        date="12.01.2019"
                        link="/post/120119" />
                </Posts>
            </div>
        );
    }
}

export default Home;

