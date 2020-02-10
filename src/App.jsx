import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Layout from './components/templates/layout/base';
import Home from './components/pages/home/base';
import About from './components/pages/about';

// posts
import P120119 from './components/pages/120119';
import P121519 from './components/pages/121519';
import P020920 from './components/pages/020920';

class App extends Component {
    render () {
        return (
            <BrowserRouter>
                <Switch>
                    <Route path="/me"><About /></Route>
                    <Layout>
                        <Route exact path="/"><Home /></Route>
                        <Route path="/post/120119"><P120119 /></Route>
                        <Route path="/post/121519"><P121519 /></Route>
                        <Route path="/post/020920"><P020920 /></Route>
                    </Layout>
                </Switch>
            </BrowserRouter>
        );
    }
}

export default App;

