import React from 'react';
import classNames from 'classnames';
import Icon from '../icon.jsx';

const Button = props => {
  const cNames = classNames('btn', 'btn-primary', {
    [`btn-${props.type}`]: true,
    [`btn-${props.size}`]: true
  });
  return <a href={props.href} className={cNames}><Icon name={props.icon}/> {props.text}</a>;
};
Button.propTypes = {
  href: React.PropTypes.string.isRequired,
  text: React.PropTypes.string.isRequired,
  size: React.PropTypes.string,
  icon: React.PropTypes.string,
  type: React.PropTypes.string
};
export default Button;
