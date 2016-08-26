import React from 'react';

export default class JoinButton extends React.Component {
  constructor(){
    super();
    this.state = {open: true};
    this.toggle = this.toggle.bind(this);
  }
  
  toggle() {
    this.setState({ open: !this.state.open }); 
  }

  afterSubmit(text){
    console.log(text);
  }

  render(){
    const form = this.state.open ? <JoinForm afterSubmit={this.afterSubmit} /> : null;

    return <div className="card bg-danger">
      <div className="card-block">
        Hi 
        <em> {this.props.userName} </em> 
        would you like to join us?
        <button className="btn btn-secondary" onClick={this.toggle}>Yes !</button>
      </div>
      {form}
    </div>;
  }
}

JoinButton.propTypes = {
  userName: React.PropTypes.string.isRequired,
};



class JoinForm extends React.Component {

  handleSubmit(e){
    e.preventDefault();
    this.props.afterSubmit(this.refs.msg.value);
  }

  render(){
    return <form onSubmit={this.handleSubmit.bind(this)} className="card-block">
      <div className="form-group">
       <textarea className="form-control" required  ref="msg"></textarea>
      </div>
      <button className="btn btn-primary btn-sm">Send Request</button>
    </form>;
  }
}

JoinForm.propTypes = {
  afterSubmit: React.PropTypes.func.isRequired
};