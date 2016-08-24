import React from 'react'; 
import Infos from './info.jsx';

export const GuildListBox = (props) => (
  <div className="card">
    <div className="card-header"  >
      <h4> Latest Guild Added </h4>
    </div> 
    <List onUserInput={props.onUserInput} items={props.items} />
  </div> 
);

GuildListBox.propTypes = { 
  items: React.PropTypes.array,
  onUserInput: React.PropTypes.func
};


class List extends React.Component {
  constructor(props) {
    super(props);
    this.state ={ activeKey: 0 };
    this.setActive = this.setActive.bind(this);
  }

  setActive(key){
    this.setState({
      activeKey: key
    });
  }

  showItems(){
    return this.props.items.map((item, key) => (
      <ListItem onUserInput={this.props.onUserInput} item={item} key={key} itemKey={key} isActive={key == this.state.activeKey} setActive={this.setActive} />
    ));
  }

  render() {
    return <ul className="list-group list-group-flush"  >
      {this.showItems()}
    </ul>;
  }
}

List.propTypes = { 
  items: React.PropTypes.array.isRequired,
  onUserInput: React.PropTypes.func
};


const ListItem = props => {
  const handleClick = ()=> {
    props.onUserInput(props.itemKey);
    props.setActive(props.itemKey);
  };

  var classNames = 'list-group-item';
  if(props.isActive) { classNames += ' list-group-item-info'; }
  return(
    <li className={classNames} onClick={handleClick} role="button">
      {props.item.name} 
      <Infos item={props.item} />
    </li>
  ); 
};

ListItem.propTypes = { 
  item: React.PropTypes.object.isRequired,
  itemKey: React.PropTypes.number.isRequired,
  onUserInput: React.PropTypes.func,
  setActive: React.PropTypes.func,
  isActive: React.PropTypes.bool,
};

