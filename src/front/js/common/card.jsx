import React from 'react';
import classNames from 'classnames';
import Icon from './icon.jsx';

export const Card = props => {
  const cNames = classNames(
    'card', {
      'card-block': props.block,
      'card-inverse': props.inverse,
      [`card-${props.type}`]: true
    }
  );
  return <div className={cNames}> {props.children} </div>;
};
Card.propTypes = {
  type: React.PropTypes.string,
  children: React.PropTypes.node,
  block: React.PropTypes.bool,
  inverse: React.PropTypes.bool,
};

export const CardText = props => <div className="card-text">{props.text}</div>;
CardText.propTypes = {
  text: React.PropTypes.string.isRequired
};

export const CardHeader = props => (
  <div className="card-header">
    <h5>
      <Icon name={props.icon} />
      {props.text}
    </h5>
  </div>
);
CardHeader.propTypes = {
  text: React.PropTypes.string.isRequired,
  icon: React.PropTypes.string
};

export const CardBlock = props => {
  const cNames = classNames(
    'card-block', {
      'row': props.row,
    }
  );
  return <div className={cNames}>{props.children}</div>;
};
CardBlock.propTypes = {
  children: React.PropTypes.node,
  row: React.PropTypes.bool,
};


export const CardFooter = props => {
  const cNames = classNames(
    'card-footer', {
      'text-xs-right': props.right,
    }
  );
  return <div className={cNames}> {props.children} </div>;
};
CardFooter.propTypes = {
  children: React.PropTypes.node,
  row: React.PropTypes.bool,
  right: React.PropTypes.bool,
};
