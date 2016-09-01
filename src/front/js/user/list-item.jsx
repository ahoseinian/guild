import React from 'react';
import Img from './img.jsx';

export const ListItem = props => {
  return <li className="list-inline-item"><Img user={props.user} /></li>;
};
ListItem.propTypes = {
  user: React.PropTypes.object
};
