import React from 'react';
import Infos from './info.jsx';

export const GuildListBox = (props) => (
  <div className="card">
    <div className="card-header text-xs-center">
      <h4 className="m-b-0">
        LATEST GUILDS
      </h4>
    </div>
    <List items={props.items}/>
  </div>
);

GuildListBox.propTypes = {
  items: React.PropTypes.array
};

class List extends React.Component {

  showItems() {
    return this.props.items.map((item, key) => (<ListItem item={item} key={key}/>));
  }

  render() {
    return <ul className="list-group list-group-flush">
      {this.showItems()}
    </ul>;
  }
}

List.propTypes = {
  items: React.PropTypes.array.isRequired
};

const ListItem = props => {

  return (
    <li role="button" className="list-group-item">
      <a href={'/' + props.item.guildname}>
        {props.item.name}
        <Infos item={props.item}/>
      </a>
    </li>
  );
};

ListItem.propTypes = {
  item: React.PropTypes.object.isRequired
};
