import React from 'react';

const Img = props => <img src={props.user.info.img} title={props.user.displayName}  className="img-circle" width="30" />;
Img.propTypes = { user: React.PropTypes.object.isRequired };
export default Img;
