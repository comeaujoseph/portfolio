import React, { Component } from 'react';

import Header from '../../../organisms/header/base';
import Posts from '../../../molecules/posts/base';
import Post from '../../../molecules/posts/post';

class Home extends Component {
    render () {
        return (
            <div id="home">
                <Header title="recent posts" subtitle="updated 11.24.2019" />
                <Posts>
                    <Post
                        title="EBS volume resizing in EKS"
                        summary="Able rent long in do we. Uncommonly no it announcing melancholy an in. Mirth learn it he given.
                        Secure shy favour length all twenty denote. He felicity no an at packages answered opinions juvenile." 
                        date="11.24.2019"
                        link="/post/112419" />
                </Posts>
            </div>
        );
    }
}

export default Home;

