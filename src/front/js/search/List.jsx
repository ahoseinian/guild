import React from 'react';
import classNames from 'classnames';

export const List = props => {
  const cNames = classNames('list-group', {
    'list-group-flush': props.flush
  });
  const items = props.items.map((item) => <ListItem item={item} key={item._id} />);
  return (
    <div className="search-list">
      <ul className={cNames}>
        {items}
      </ul>
    </div>
  );
};
List.propTypes = {
  flush: React.PropTypes.bool,
  items: React.PropTypes.array,
};

export const ListItem = props => {
  return (
    <a href={props.item.guildname}>
      <li className="list-group-item p-a-0">
        <ol className="breadcrumb m-a-0 ">
          <li className="breadcrumb-item text-muted text-capitalize">{props.item.region}</li>
          <li className="breadcrumb-item text-muted text-capitalize">{props.item.realm}</li>
          <li className="breadcrumb-item text-capitalize">{props.item.guildname}</li>
        </ol>
      </li>
    </a>
  );
};
ListItem.propTypes = {
  item: React.PropTypes.object.isRequired,
};
