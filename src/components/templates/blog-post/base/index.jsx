import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Link } from "react-router-dom";

import Header from '../../../organisms/header/base';

const BlogPost = (props) => {
    const {
        className,
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
            <Header title="Blueprint: Flask app" subtitle="11.28.2019" back />
            <div className="blog-post__inner">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi pretium, neque et porta auctor, elit tellus ultrices odio, non aliquam lacus lacus eget tellus. Vestibulum sed velit malesuada sem malesuada pulvinar quis vel risus. Cras porta porta ullamcorper. Integer dapibus sodales sodales. Quisque bibendum maximus justo non dapibus. Nullam a dui fermentum, hendrerit nisl blandit, sodales dolor. Aliquam tincidunt sagittis lorem, ac rhoncus tellus sollicitudin non. Donec a feugiat erat. Proin quis justo hendrerit, commodo quam id, finibus mauris. Duis magna mi, interdum sed varius at, feugiat eget enim.

                Maecenas non dui nec nisi fermentum elementum. In diam turpis, ornare a felis et, ultrices iaculis nunc. Vestibulum et mi fermentum, venenatis mi id, ultrices lectus. Quisque eu dui ac est tincidunt commodo. In id euismod augue, quis lacinia neque. Nullam vel varius massa, vitae tristique nulla. Etiam gravida eu orci quis maximus. Nam finibus nibh justo, eu fermentum sem venenatis nec. Nullam sollicitudin consectetur diam vitae dictum. Nunc ut cursus nulla. Donec ornare tincidunt dui, quis venenatis velit ultrices id. Nullam vel hendrerit tellus. Donec egestas, nisi non faucibus hendrerit, orci sem venenatis est, vitae scelerisque odio erat quis turpis. Aliquam erat volutpat. Nullam fringilla felis eu odio blandit mattis. Donec vitae sollicitudin ante.

                Nullam in diam facilisis, hendrerit tortor viverra, accumsan neque. Vivamus molestie augue augue. Integer massa massa, dapibus ut imperdiet quis, feugiat at dolor. Quisque placerat condimentum fringilla. Cras vel augue non metus pharetra viverra a vel risus. Morbi et eleifend lectus, ac blandit elit. Cras et odio dignissim, ullamcorper nisl sit amet, faucibus nisi. Sed scelerisque turpis sit amet mattis sodales. Etiam volutpat aliquam orci vel mollis. Nunc iaculis quam a nisi mattis interdum id at turpis. Ut non ligula sit amet urna luctus imperdiet in nec nibh. Mauris molestie placerat enim nec tristique. Quisque in neque hendrerit, vestibulum ante ac, laoreet nisl.

                Aliquam iaculis arcu id sem aliquam, ut sollicitudin odio luctus. Duis ut augue fermentum, pharetra mauris eget, porta tellus. Morbi viverra quam diam, id mattis mi semper a. Etiam ut bibendum augue, vel tincidunt neque. Donec aliquet bibendum feugiat. In vitae sapien id orci accumsan fringilla id sit amet nisl. Pellentesque quis maximus nisl, sagittis mollis risus. Suspendisse porttitor dolor eu ante consectetur mattis. Pellentesque hendrerit porta tortor in malesuada. Sed mauris velit, sollicitudin ac orci nec, sodales feugiat tortor.

                Donec vitae consectetur lacus, vitae ultricies nisl. Cras nec tempor nunc, nec elementum sapien. Aenean dictum lobortis lorem et mattis. Proin congue, arcu eu blandit posuere, lacus risus dictum augue, vel tempor erat urna et dui. Vestibulum non dolor ultricies ante blandit molestie. Vivamus cursus eu metus at volutpat. In nec urna vestibulum, porttitor dui ut, dignissim tellus. Quisque lobortis quam vel viverra consequat. Suspendisse potenti. Duis ultricies diam eget posuere porta. Praesent varius tempor tortor, id suscipit erat lobortis sed. Suspendisse vulputate ac diam sed volutpat.
            </div>
        </div>
    );
};

BlogPost.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string
};

BlogPost.defaultProps = {

};

export default BlogPost;

