import React from 'react';
import Button from './button.jsx';

const ToggleButton = ({open, yesProps, noProps, ...props}) => {
  return open ? <Button {...yesProps} {...props} /> : <Button {...noProps} {...props}/>;
};
ToggleButton.propTypes = {
  open: React.PropTypes.bool,
  yesProps: React.PropTypes.object,
  noProps: React.PropTypes.object,
};

export default ToggleButton;