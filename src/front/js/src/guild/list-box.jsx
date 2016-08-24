import React from 'react'; 

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
  constructor(props){
    super(props);
  }
  showItems(){
    return this.props.items.map((x) => <ListItem onUserInput={this.props.onUserInput} item={x} key={x._id} />);
  }
  render(){
    return <ul className="list-group list-group-flush"  >
      {this.showItems()}
    </ul>;
  }

}
List.propTypes = { 
  items: React.PropTypes.array.isRequired,
  onUserInput: React.PropTypes.func
};


class ListItem extends React.Component {
  constructor(props){
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(){
    this.props.onUserInput(this.props.item);
  }

  render(){
    return <li className="list-group-item" onClick={this.handleClick}>
      {this.props.item.name} -
      <span className="text-muted">
        <small> {this.props.item.realm} - </small>
        <small> {this.props.item.region}</small>
      </span>
    </li>;
  }
}
ListItem.propTypes = { 
  item: React.PropTypes.object.isRequired, 
  onUserInput: React.PropTypes.func, 
};

