import React, { Component } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

import Layout from './components/templates/layout/base';
import Home from './components/pages/home/base';
import About from './components/pages/about';

// posts
import P120119 from './components/pages/120119';
import P121519 from './components/pages/121519';
import P020920 from './components/pages/020920';
import P022320 from './components/pages/022320';

class App extends Component {
    render () {
        return (
            <BrowserRouter>
                <Switch>
                    <Route path="/me" component={About} />
                    <Layout>
                        <Switch>
                            <Route exact path="/" component={Home} />
                            <Route path="/post/120119" component={P120119} />
                            <Route path="/post/121519" component={P121519} />
                            <Route path="/post/020920" component={P020920} />
                            <Route path="/post/022320" component={P022320} />
                            <Redirect from="*" to="/" />
                        </Switch>
                    </Layout>
                </Switch>
            </BrowserRouter>
        );
    }
}

export default App;

