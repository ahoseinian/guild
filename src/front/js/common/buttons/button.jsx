import React from 'react';
import Icon from '../icon.jsx';
import classNames from 'classnames';

const Button = props => {
  const cNames = classNames(
    'btn', props.className, {
      [`btn-${props.type}`]: true,
      [`btn-${props.size}`]: true,
    }
  );
  return <button className={cNames} onClick={props.onClick}><Icon name={props.icon} /> {props.text}</button>;
};
Button.propTypes = {
  type: React.PropTypes.string,
  size: React.PropTypes.string,
  icon: React.PropTypes.string,
  text: React.PropTypes.string,
  className: React.PropTypes.string,
  onClick: React.PropTypes.func,
};

export default Button;
