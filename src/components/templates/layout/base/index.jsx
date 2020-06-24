import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Link } from "react-router-dom";

import Tags from '../../../molecules/tags/base';
import Tag from '../../../molecules/tags/tag';


const Layout = (props) => {
    const {
        className,
        ...rest
    } = props;

    var classNameList = classNames(
        'layout',
        {
        },
        className,
    );

    return (
        <main id="layout" className={classNameList} {...rest}>
            <section className="layout__left">
                <div className="layout__left-inner">
                    <h2 className="layout__left-header">
                        <Link to="/" className="icon">/</Link>
                    </h2>
                    <h3 className="layout__left-body">
                        My name is Joey Comeau, I am a software developer and web designer based in San Franisco, CA. I'm currently
                        working at <a href="https://www.barracuda.com" target="_blank"><em>Barracuda Networks</em></a>, where I am the lead developer
                        and architect for multiple microservices. In my free time, I work on <a href="https://github.com/comeaujoseph/xyz-design" target="_blank"><em>xyz</em></a>,
                        an open source design system.
                    </h3>
                    <h3 className="layout__left-more-info">
                        <Link to="/me">More information here</Link>
                    </h3>

                    <ul>
                        <li><a href="https://github.com/comeaujoseph" target="_blank">github.com/comeaujoseph</a></li>
                        {/* <li><a href="https://www.instagram.com/joey.comeau/" target="_blank">instagram.com/joey.comeau</a></li> */}
                        <li><a href="https://www.linkedin.com/in/joey-comeau-27329390" target="_blank">linkedin.com/joeycomeau</a></li>
                        <li><a href="https://hub.docker.com/u/jcomeau" target="_blank">hub.docker.com/jcomeau</a></li>
                        <li><a href="mailto:comeau.joey@gmail.com" target="_top">comeau.joey@gmail.com</a></li>
                    </ul>
                    <Tags>
                        <Tag>Kubernetes</Tag>
                        <Tag>NGINX</Tag>
                        <Tag>Java</Tag>
                        <Tag>React.js</Tag>
                    </Tags>
                </div>
            </section>
            <section className="layout__right">
                { props.children}
            </section>
        </main>
    );
};

Layout.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string
};

Layout.defaultProps = {

};

export default Layout;

