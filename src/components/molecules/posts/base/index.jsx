import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const Posts = (props) => {
    const {
        id,
        className,
        ...rest
    } = props;

    var classNameList = classNames(
        'posts',
        {
        },
        className,
    );

    return (
        <ul id={id} className={classNameList} {...rest}>
            {props.children}
        </ul>
    );
};

Posts.propTypes = {
    children: PropTypes.node,
    id: PropTypes.string,
    className: PropTypes.string
};

Posts.defaultProps = {

};

export default Posts;
