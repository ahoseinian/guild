import React from 'react';
import classNames from 'classnames';

export const Img = props => {
  const cNames = classNames({'img-fluid': props.fluid});
  return <img src={props.url} className={cNames} alt={props.alt}/>;
};
Img.propTypes = {
  url: React.PropTypes.string.isRequired,
  alt: React.PropTypes.string,
  fluid: React.PropTypes.bool
};
