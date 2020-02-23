import React, { Component } from 'react';
import Prism from "prismjs";

import BlogPost from '../../templates/blog-post/base';

class P022320 extends Component {
    componentDidMount () {
        Prism.highlightAll();
    }

    render () {
        return (
            <BlogPost id="p022320" title="React.js: Setup Guide" subtitle="02.23.2020">
                <p>Repository: <a href="https://github.com/comeaujoseph/react.js-example" target="_blank">https://github.com/comeaujoseph/react.js-example</a></p>

                <p>
                    <h3 className="blog-post__section-header">Perquisites</h3>
                    You will need npm, which is a package manager for JavaScript. To install npm setup Node.js and npm will
                    automatically be included. Follow <a href="https://nodejs.org/en/" target="_blank">these</a> instructions
                    to install Node.js.
                </p>

                <p>
                    <h3 className="blog-post__section-header">Working Directory</h3>
                    Create a new directory in the location of your choosing; using the name of the project as the directory name.
                    <pre>
                        <code className="language-bash">$ mkdir project-name</code>
                    </pre>
                    Move into the directory and initialize the project:
                    <pre>
                        <code className="language-bash">$ cd project-name</code>
                        <code className="language-bash">$ npm init</code>
                    </pre>
                    The npm init command will create a new file name <b>packaged.json</b>. The package.json file contains project, metadata,
                    dependencies, and commands to help test, build and run your code.
                </p>

                <div style={{ margin: "20px 0" }}>
                    <h3 className="blog-post__section-header">Core Dependencies</h3>
                    React.js Library
                    <pre>
                        <code className="language-bash">$ npm install --save react react-dom</code>
                    </pre>
                    <ul className="blog-post__list">
                        <li>react: includes the functionality needed to define React components</li>
                        <li>react-dom: serves as the entry point to the DOM and server renderers for React</li>
                    </ul>

                    <h6>Babel</h6>
                    Babel is a toolchain that is mainly used to convert ECMAScript 2015+ code into a backwards compatible version of JavaScript,
                    i.e. Babel is a library for transpiling ES6 to ES5.
                    <div style={{ backgroundColor: "rgba(0, 0, 0, 0.05)", margin: "10px 0", padding: "15px" }}>
                        <h6>Brief explanation of ECMAScript:</h6>
                        ES6 (renamed to ECMAScript 2015) refers to version 6 of ECMA Script programming language. ECMA Script is the standardized
                        name for JavaScript. ESG is a new version of JS that adds some nice syntactical and functional additions. It is almost
                        fully supported by all major browsers but it will be some time until older versions of web browsers are phased out of use.
                    </div>
                    React.js library requires the latest JavaScript, making Babel a required dependency. It will transform React.js code (jsx)
                    to regular JavaScript that the browser understands. You will only use Babel in development mode so when installing use the --save-dev flag.
                    <pre>
                        <code className="language-bash">$ npm install --save-dev @babel/core @babel/preset-env @babel/preset-react babel-loader</code>
                    </pre>
                    <ul className="blog-post__list">
                        <li>@babel/core: the main dependency that includes babel transform script</li>
                        <li>@babel/preset-env: the default Babel preset used to transform ES6+ into valid ES5 code. Optionally configures browser polyfills automatically.</li>
                        <li>@babel/preset-react: used for transforming JSX and React class syntax into valid JavaScript code</li>
                        <li>babel-loader: a webpack loader that hooks Babel into webpack. We will run Babel from webpack with this package</li>
                    </ul>
                    Create the babel configuration file .babelrc with the following instructions:
                    <pre>
                        <code className="language-bash">$ vim .babelrc</code>
                    </pre>
                    <pre className="code-block">
                        <code className="language-json">{"{"}</code>
                        <code className="language-json">  "presets": [</code>
                        <code className="language-json">    "@babel/preset-env",</code>
                        <code className="language-json">    "@babel/preset-react"</code>
                        <code className="language-json">  ],</code>
                        <code className="language-json">  "plugins": []</code>
                        <code className="language-json">{"}"}</code>
                    </pre>
                    These presets were installed above and are now present in the configuration to instruct Babel to use them.
                    <ul className="blog-post__list">
                        <li>babel preset-env: compile modern JS down to ES5</li>
                        <li>babel preset-react: compile JSX and other React features to JS</li>
                    </ul>

                    <h6>Webpack</h6>
                    A module bundler and task runner. It's job is to run your React code through various transformations.
                    <pre>
                        <code className="language-bash">$ npm install --save-dev webpack webpack-dev-server html-webpack-plugin webpack-cli</code>
                    </pre>
                    <ul className="blog-post__list">
                        <li>webpack: core package which takes care of bundling your assets</li>
                        <li>webpack-dev-server: provides a dev server that supports hot reloading</li>
                        <li>html-webpack-plugin: generates index.html file including webpack bundle</li>
                        <li>webpack-cli — enable running webpack from the command line</li>
                    </ul>
                    Webpack is going to take your JS run it through some transformations, and create a new, transformed JavaScript
                    file. This file will be the one that the browser actually reads. In order to do this, Webpack needs to know three things:
                    <ul className="blog-post__list">
                        <li>What JS file it should transform</li>
                        <li>Which transformations it should use on that file</li>
                        <li>
                            Where the new, transformed file should go Webpack knows which transformations to run via the webpack.config.js.
                            That transformation is called transpilling. Webpack doesn't know how to transform ES6 to ES5 but it has this concept
                            of loaders: think of them as of transformers. A webpack loader takes something as the input and produces something
                            else as the output. The babel-loader is the Webpack loader responsible for taking the ES6 code and making it understandable
                            by the browser.
                        </li>
                    </ul>
                    We also need some additional package that will use by webpack to load our application styling code (Sass/CSS). By default
                    webpack only knows how to bundle JavaScript, so if want to include styling code, i.e. CSS or Sass, we will need to install
                    the following packages:
                    <pre>
                        <code className="language-bash">$ npm install --save-dev node-sass sass-loader style-loader css-loader mini-css-extract-plugin</code>
                    </pre>
                    These packages are called loaders and are node-based utilities built for webpack to help it compile and/or transform a given type of
                    resource so that can be bundled as a JavaScript module.
                    <br/>
                    To configure Webpack, create a file named webpack.config.js in the root of your directory with the following content:
                    <pre>
                        <code className="language-bash">$ vim webpack.config.json</code>
                    </pre>
                    <p>
                        <a href="https://github.com/comeaujoseph/react.js-example/blob/master/webpack.config.js" target="_blank">webpack.config.json</a>
                    </p>
                    We defined two new files in webpack.config.js; <b>./src/index.jsx</b> and <b>./src/index.html</b>. Let’s create these two files:
                    <pre>
                        <code className="language-bash">$ mkdir src && touch src/index.jsx src/index.html</code>
                    </pre>
                    <p>
                        <a href="https://github.com/comeaujoseph/react.js-example/blob/master/src/index.jsx" target="_blank">src/index.jsx</a>
                        <br/>
                        <a href="https://github.com/comeaujoseph/react.js-example/blob/master/src/index.html" target="_blank">src/index.html</a>
                    </p>
                    <b>The React.js application is now ready to go!</b> Let's add a few useful scripts to the package.json file:
                    <pre className="code-block">
                        <code className="language-json">"scripts": {"{"}</code>
                        <code className="language-json">  "test": "echo \"Error: no test specified\" && exit 1",</code>
                        <code className="language-json">  "start": "webpack-dev-server --mode development",</code>
                        <code className="language-json">  "debug": "webpack --display-error-details",</code>
                        <code className="language-json">  "format": "prettier --write \"src/**/*.jsx\"",</code>
                        <code className="language-json">  "eslint-fix": "eslint --fix \"src/**/*.jsx\"",</code>
                        <code className="language-json">  "build": "webpack --mode production"</code>
                        <code className="language-json">{"}"}</code>
                    </pre>
                    To start the development server run the following command in your projects root directory:
                    <pre>
                        <code className="language-bash">$ npm run start</code>
                    </pre>
                </div>

                <div style={{ margin: "20px 0" }}>
                    <h3 className="blog-post__section-header">Recommended Dependencies</h3>
                    ESLint
                    <br/>
                    A program that checks our JavaScript code for any error or warning that can cause bugs. 
                    <pre>
                        <code className="language-bash">$ npm install --save-dev eslint eslint-loader babel-eslint eslint-config-react eslint-plugin-react</code>
                    </pre>
                    <ul className="blog-post__list">
                        <li>eslint: the core dependency for all functionalities</li>
                        <li>eslint-loader: enables us to hook eslint into webpack</li>
                        <li>babel-eslint: a parser that enables eslint to lint all valid ES6+ codes</li>
                        <li>eslint-config-react & eslint-plugin-react: used to enable ESLint to use pre-made rules</li>
                    </ul>
                    Create the eslint configuration file .eslintrc with the following instructions: <a href="https://github.com/comeaujoseph/react.js-example/blob/master/.eslintrc" target="_blank">.eslintrc</a>
                    <br/>
                    Rather than specifying our own rules manually, we simply extend react rules which were made available by eslint-config-react and eslint-plugin-react.
                    The config is basically saying,
                    <div style={{ margin: "10px 15px" }}>
                        “Hey ESLint, please parse the code using babel-eslint before you check it, and when you’re checking it,
                        please check if all the rules from our React rules config is passed. Take global variables from the environment of browser and node.
                        Oh, and if it’s React code, take the version from the module itself. That way the user won’t have to specify the version manually.”
                    </div>
                    Unfortunately the only way to really figure out how to fix ESLint errors is by looking at the documentation for rules. There’s a
                    quick way to fix ESLint errors by using eslint—fix, which is part of script we added to the package.json file.

                    <br/>
                    <br/>
                    Prettier
                    <br/>
                    Install the dependency locally and use the — save-exact argument since Prettier introduces stylistic changes in patch releases.
                    <pre>
                        <code className="language-bash">$ npm install --save-dev --save-exact prettier</code>
                    </pre>
                    Create the prettier configuration file .prettierrc with the following instructions: <a href="https://github.com/comeaujoseph/react.js-example/blob/master/.prettierrc" target="_blank">.prettierrc</a>
                    <br/>
                    The rules means that we want to add semicolon for the end of every statement, use a single quote whenever appropriate and put trailing
                    commas for multi-line ES5 code like objects or arrays. You can prettify the code by running the script from the package.json file:
                    <pre>
                        <code className="language-bash">$ npm run format</code>
                    </pre>
                </div>

                <div>
                    <h3 className="blog-post__section-header">Random Questions</h3>
                    <p>
                        What is JSX?
                        <br/>
                        JSX (JavaScript eXtension) is a react extension that allows us to write JS that looks like HTML.
                        It extends ECMAScript so that XML/HTML-like text can co-exist with JavaScript/React code.
                        <br/>
                        <br/>
                        What is the difference between "@babel/preset-react" and "react"?
                        <br/>
                        <a hrer="https://babeljs.io/docs/en/v7-migration#scoped-packages" target="_blank">https://babeljs.io/docs/en/v7-migration#scoped-packages</a>
                    </p>
                </div>

                <section className="blog-post__references">
                    <h3>References</h3>
                    <a href="https://www.codecademy.com/articles/react-setup-i" target="_blank">https://www.codecademy.com/articles/react-setup-i</a>
                    <a href="https://www.fullstackreact.com/30-days-of-react/" target="_blank">https://www.fullstackreact.com/30-days-of-react/</a>
                    <a href="https://medium.com/@siddharthac6/getting-started-with-react-js-using-webpack-and-babel-66549f8fbcb8" target="_blank">https://medium.com/@siddharthac6/getting-started-with-react-js-using-webpack-and-babel-66549f8fbcb8</a>
                    <a href="https://www.valentinog.com/blog/babel/" target="_blank">https://www.valentinog.com/blog/babel/</a>
                    <a href="https://www.freecodecamp.org/news/how-to-set-up-deploy-your-react-app-from-scratch-using-webpack-and-babel-a669891033d4/" target="_blank">https://www.freecodecamp.org/news/how-to-set-up-deploy-your-react-app-from-scratch-using-webpack-and-babel-a669891033d4/</a>
                </section>
            </BlogPost>
        );
    }
}

export default P022320;
