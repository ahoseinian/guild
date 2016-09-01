import React from 'react';
import { ListItem } from './list-item.jsx';

export const UserList = props => {
  const items = props.users.map((x) => <ListItem user={x} key={x._id}/>);
  return <ul className='list-inline' >{items}</ul>;
};
UserList.propTypes = {
  users: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
  flush: React.PropTypes.bool
};
