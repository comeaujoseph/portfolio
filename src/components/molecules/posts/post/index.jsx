import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Link } from "react-router-dom";

const Post = (props) => {
    const {
        id,
        className,
        title,
        summary,
        date,
        link,
        ...rest
    } = props;

    var classNameList = classNames(
        'post',
        {
        },
        className,
    );

    return (
        <li id={id} className={classNameList} {...rest}>
            <Link className="post__inner" to={link}>
                <div className="post__child post__title">{ title }</div>
                <div className="post__child post__summary">{ summary }</div>
                <div className="post__child post__date"><em>{ date }</em></div>
            </Link>
        </li>
    );
};

Post.propTypes = {
    children: PropTypes.node,
    id: PropTypes.string,
    className: PropTypes.string,
    title: PropTypes.string,
    summary: PropTypes.string,
    date: PropTypes.string,
    link: PropTypes.string
};

Post.defaultProps = {

};

export default Post;
