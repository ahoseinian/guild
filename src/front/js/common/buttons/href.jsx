import React from 'react';
import classNames from 'classnames';
import Icon from '../icon.jsx';

const Button = props => {
  const cNames = classNames('btn', 'btn-primary', {
    'btn-sm': props.sm,
    [`btn-${props.type}`]: true
  });
  return <a href={props.href} className={cNames}><Icon name={props.icon}/> {props.text}</a>;
};
Button.propTypes = {
  href: React.PropTypes.string.isRequired,
  text: React.PropTypes.string.isRequired,
  sm: React.PropTypes.bool,
  icon: React.PropTypes.string,
  type: React.PropTypes.string
};
export default Button;
