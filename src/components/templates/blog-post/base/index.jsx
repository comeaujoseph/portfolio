import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Header from '../../../organisms/header/base';

const BlogPost = (props) => {
    const {
        className,
        title,
        subtitle,
        ...rest
    } = props;

    var classNameList = classNames(
        'blog-post',
        {
        },
        className,
    );

    return (
        <div className={classNameList} {...rest}>
            <Header title={title} subtitle={subtitle} back />
            <div className="blog-post__inner">
                {props.children}
            </div>
        </div>
    );
};

BlogPost.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    title: PropTypes.string,
    subtitle: PropTypes.string
};

BlogPost.defaultProps = {

};

export default BlogPost;

