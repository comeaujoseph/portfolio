import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const Tag = (props) => {
    const {
        id,
        className,
        ...rest
    } = props;

    var classNameList = classNames(
        'tag',
        {
        },
        className,
    );

    return (
        <a id={id} className={classNameList} {...rest}>
            {props.children}
        </a>
    );
};

Tag.propTypes = {
    children: PropTypes.node,
    id: PropTypes.string,
    className: PropTypes.string
};

Tag.defaultProps = {

};

export default Tag;
