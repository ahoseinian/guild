import React from 'react';

export const TextArea = props => <textarea className="form-control" {...props}></textarea>;
TextArea.propTypes = {
  placeholder: React.PropTypes.string
};

export const FormGroup = (props) => <div className="form-group" >{props.children}</div>;
FormGroup.propTypes = {
  children: React.PropTypes.element
};
