import React from 'react';
import { ListItem } from './list-item.jsx';
import classNames from 'classnames';

export const UserList = props => {
  const classes = classNames('list-group', {
    'list-group-flush': props.flush
  });
  const items = props.users.map((x) => <ListItem user={x} key={x._id}/>);
  return <ul className={classes} >{items}</ul>;
};
UserList.propTypes = {
  users: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
  flush: React.PropTypes.bool
};
