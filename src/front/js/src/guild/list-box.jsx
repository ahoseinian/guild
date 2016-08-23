import React from 'react'; 
import {ajax} from 'jquery';

export class GuildListBox extends React.Component {
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
    setInterval(this.loadFromServer.bind(this), 5000);
  }
  render () {
    return (
      <div className="card">
        <div className="card-header">
          <h4> Guild List </h4>
        </div> 
        <div className="card-block">
          <List />
        </div>
      </div> 
    );
  }  
} 

GuildListBox.propTypes = { url: React.PropTypes.string.isRequired };


class List extends React.Component {
  render(){
    return <ul className="list-unstyled">
      <ListItem />
      <ListItem />
    </ul>;
  }
}

class ListItem extends React.Component {
  render(){
    return <li>List Item</li>;
  }
}
