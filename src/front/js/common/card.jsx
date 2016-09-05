import React from 'react';
import classNames from 'classnames';
import Icon from './icon.jsx';

export const Card = props => {
  const cNames = classNames('card', 'card-inverse', 'bg-inverse', props.className, {
    'card-block': props.block,
    'card-inverse': props.inverse,
    [`card-${props.type}`]: true
  });
  return <div className={cNames}>
    {props.children}
  </div>;
};
Card.propTypes = {
  type: React.PropTypes.string,
  className: React.PropTypes.string,
  children: React.PropTypes.node,
  block: React.PropTypes.bool,
  inverse: React.PropTypes.bool
};

export const CardText = props => (
  <div className="card-text">
    {/* line breaks  */}
    {props.text.split('\n').map(function(item, i) {
      return item.length
        ? (
          <span key={i}>
            {item}
            <br/>
          </span>
        )
        : null;
    })}
  </div>
);
CardText.propTypes = {
  text: React.PropTypes.string
};

export const CardHeader = props => (
  <div className="card-header bg-inverse">
    <h3 className="h5 m-b-0">
      <Icon name={props.icon}/> {props.text}
    </h3>
  </div>
);
CardHeader.propTypes = {
  text: React.PropTypes.string.isRequired,
  icon: React.PropTypes.string
};

export const CardBlock = props => {
  const cNames = classNames('card-block', {'row': props.row});
  return <div className={cNames}>{props.children}</div>;
};
CardBlock.propTypes = {
  children: React.PropTypes.node,
  row: React.PropTypes.bool
};

export const CardFooter = props => {
  const cNames = classNames('card-footer', 'bg-inverse', {'text-xs-right': props.right});
  return <div className={cNames}>
    {props.children}
  </div>;
};
CardFooter.propTypes = {
  children: React.PropTypes.node,
  row: React.PropTypes.bool,
  right: React.PropTypes.bool
};
