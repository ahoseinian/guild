import React from 'react'; 
import {ajax} from 'jquery';

export class GuildListBox extends React.Component {
  constructor(props){
    super(props);
    this.state = {data: []};
  }
  loadFromServer(){
    ajax({
      url:this.props.url,
      dataType:'json',
      cache:false,
      success: (data) => {
        this.setState({data:data});
      }
    });
  }
  componentDidMount() {
    this.loadFromServer();
    // setInterval(this.loadFromServer.bind(this), 5000);
  }

  render () {
    return (
      <div className="card">
        <div className="card-header">
          <h4> Latest Guild Added </h4>
        </div> 
        <List items={this.state.data} />
      </div> 
    );
  }  
} 

GuildListBox.propTypes = { url: React.PropTypes.string.isRequired };


class List extends React.Component {
  showItems(){
    return this.props.items.map((x) => <ListItem item={x} key={x._id} />);
  }
  render(){
    return <ul className="list-group list-group-flush">
      {this.showItems()}
    </ul>;
  }

}
List.propTypes = { items: React.PropTypes.array.isRequired };

class ListItem extends React.Component {
  render(){
    return <li className="list-group-item">
      {this.props.item.name} -
      <span className="text-muted">
        <small> {this.props.item.realm} - </small>
        <small> {this.props.item.region}</small>
      </span>
    </li>;
  }
}
ListItem.propTypes = { item: React.PropTypes.object.isRequired };

