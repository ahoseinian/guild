import React from 'react';

const Image = props => <img src={props.src} alt={props.alt} className="img-thumbnail pull-xs-right"/>;
Image.propTypes = { 
  src: React.PropTypes.string.isRequired,
  alt: React.PropTypes.string
};


export default Image;