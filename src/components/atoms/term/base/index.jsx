import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';


const Term = (props) => {
    const {
        id,
        className,
        term,
        hasReadMore,
        ...rest
    } = props;

    var classNameList = classNames(
        'term',
        {
        },
        className,
    );

    return (
        <abbr id={id} className={classNameList} {...rest}>
            <span className="term__name">{ term }</span>
            <span className="term__tooltip">
                <span>
                    { props.children }
                    { hasReadMore ? <a href="#">Read more</a> : null }
                </span>
            </span>
        </abbr>
    );
};

Term.propTypes = {
    children: PropTypes.node,
    id: PropTypes.string,
    className: PropTypes.string,
    term: PropTypes.string,
    hasReadMore: PropTypes.bool
};

export default Term;
