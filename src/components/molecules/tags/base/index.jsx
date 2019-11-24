import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const Tags = (props) => {
    const {
        id,
        className,
        ...rest
    } = props;

    var classNameList = classNames(
        'tags',
        {
        },
        className,
    );

    return (
        <div id={id} className={classNameList} {...rest}>
            <h6 className="tags__title">Tags</h6>
            <div className="tags__inner">
                {props.children}
            </div>
        </div>
    );
};

Tags.propTypes = {
    children: PropTypes.node,
    id: PropTypes.string,
    className: PropTypes.string
};

Tags.defaultProps = {

};

export default Tags;
