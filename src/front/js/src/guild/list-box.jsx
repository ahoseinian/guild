import React from 'react';
import {Breadcrumb} from '../../guild/breadcrumb.jsx';
import {Card, CardHeader} from '../../common/card.jsx';

export const GuildListBox = (props) => (
  <Card>
    <CardHeader text="LATEST GUILDS"/>
    <List items={props.items}/>
  </Card>
);
GuildListBox.propTypes = {
  items: React.PropTypes.array
};
class List extends React.Component {
  showItems() {
    return this.props.items.map((item, key) => (<ListItem item={item} key={key}/>));
  }

  render() {
    return <ol className="list-unstyled m-b-0">
      {this.showItems()}
    </ol>;
  }
}

List.propTypes = {
  items: React.PropTypes.array.isRequired
};
const ListItem = props => {
  return (
    <li className="p-a-1 ">

      <a href={'/' + props.item.guildname}>

        <strong className="text-capitalize">@{props.item.guildname}</strong>
        <div className="pull-xs-right">
          <Breadcrumb item={props.item}/>
        </div>
      </a>
    </li>
  );
};
ListItem.propTypes = {
  item: React.PropTypes.object.isRequired
};
