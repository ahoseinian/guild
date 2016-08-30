import React from 'react';
import Img from './img.jsx';

export const ListItem = props => {
  return <li className="list-group-item"><Img user={props.user} /> {props.user.displayName}</li>;
};
ListItem.propTypes = {
  user: React.PropTypes.object
};
