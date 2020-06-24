import React, { Component } from 'react';
import { Link } from "react-router-dom";
import Prism from "prismjs";

import BlogPost from '../../templates/blog-post/base';

class P041220 extends Component {
    componentDidMount () {
        Prism.highlightAll();
    }

    render () {
        return (
            <BlogPost id="p041220" title="React.js: Lint" subtitle="04.12.2020">
                <p>
                    <h3 className="blog-post__section-header">Perquisites</h3>
                    <Link to="/post/022320">React.js: Setup Guide</Link>
                </p>

                <p>
                    <h3 className="blog-post__section-header">Sass</h3>
                    <pre>
                        <code className="language-bash">$ npm install --save-dev stylelint</code>
                        <code className="language-bash">$ npm install --save-dev stylelint-config-recommended</code>
                    </pre>
                    Create the configuration file:
                    <pre className="code-block">
                        <code className="language-bash">$ vim .stylelintrc.yml</code>
                        <code className="language-json">{"{"}</code>
                        <code className="language-json">  "presets": [</code>
                        <code className="language-json">    "@babel/preset-env",</code>
                        <code className="language-json">    "@babel/preset-react"</code>
                        <code className="language-json">  ],</code>
                        <code className="language-json">  "plugins": []</code>
                        <code className="language-json">{"}"}</code>
                    </pre>
                </p>

                <section className="blog-post__references">
                    <h3>References</h3>
                </section>
            </BlogPost>
        );
    }
}

export default P041220;
