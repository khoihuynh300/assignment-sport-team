import imageWrapperStyles from './ImageWrapper.module.scss';

import React from 'react';

const ImageWrapper = ({ src, alt = 'default', style, styleWrapper }) => {
  return (
    <div className={imageWrapperStyles['wrapper']} style={styleWrapper}>
      <img src={src} alt={alt} style={style} />
    </div>
  );
};

export default ImageWrapper;
