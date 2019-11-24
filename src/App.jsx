import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Layout from './components/templates/layout/base';
import Home from './components/pages/home/base';
import About from './components/pages/about';
import P102819 from './components/pages/112419';

class App extends Component {
    render () {
        return (
            <BrowserRouter>
                <Switch>
                    <Route path="/me"><About /></Route>
                    <Layout>
                        <Route exact path="/"><Home /></Route>
                        <Route path="/post/112419"><P102819 /></Route>
                    </Layout>
                </Switch>
            </BrowserRouter>
        );
    }
}

export default App;

