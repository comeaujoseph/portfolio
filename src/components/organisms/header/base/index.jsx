import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Link } from "react-router-dom";


const Header = (props) => {
    const {
        className,
        title,
        subtitle,
        back,
        ...rest
    } = props;

    var classNameList = classNames(
        'header',
        {
        },
        className,
    );

    return (
        <header id="header" className={classNameList} {...rest}>
            <h2 className="header__inner">
                <span>{ title } <em>{ subtitle }</em></span>
            </h2>

            { back ?
                <Link to="/" className="back-button icon">
                    <span className="back-button-icon">
                        <svg width="14" height="10" viewBox="0 0 14 10">
                            <g fill="none" fillRule="evenodd">
                                <path d="M-1 13V-3h16v16z" />
                                <g stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.2">
                                    <path d="M1 5h11.018M9 1l4 4-4 4" />
                                </g>
                            </g>
                        </svg>
                    </span>
                    <span className="back-button-text">back</span>
                </Link> : null }
        </header>
    );
};

Header.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    title: PropTypes.string,
    subtitle: PropTypes.string,
    back: PropTypes.bool
};

Header.defaultProps = {

};

export default Header;

