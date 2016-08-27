import React from 'react';
import ajax from 'jquery';
import JoinSiteButton from '../common/buttons/join-site.jsx';

export default class JoinButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      alreadyRequested: props.requested,
      message: props.requested ? 'Thank you for your interest we will get back to you as soon as possible' : null
    };
    this.toggle = this.toggle.bind(this);
    this.afterSubmit = this.afterSubmit.bind(this);
  }

  toggle() {
    this.setState({ open: !this.state.open });
  }

  afterSubmit(text) {
    this.setState({ alreadyRequested: true });
    ajax
      .post(this.props.url + '/join', { text: text })
      .done((r) => this.setState({ message: r.message }))
      .fail((r) => this.setState({ message: r.responseJSON.message }));
  }

  render() {
    const form = this.state.open ? <JoinForm afterSubmit={this.afterSubmit} /> : null;

    const joinMethod = this.props.user.id ? 
      <span>
        <ToggleButton open={this.state.open} onClick={this.toggle}/>
        {form}
      </span>: <JoinSiteButton />;


    const beforeRequest =
      <div>
        <span> Wanna join us? </span>
        {joinMethod}
      </div>;

    const afterRequest = <span className="text-justify">{this.state.message}</span>;


    return <div className='card card-block card-info'>{this.state.alreadyRequested ? afterRequest : beforeRequest}</div>;
  }
}

JoinButton.propTypes = {
  user: React.PropTypes.object.isRequired,
  url: React.PropTypes.string.isRequired,
  requested: React.PropTypes.bool,
};


const ToggleButton = props => {
  const message = props.open ?
    <span>No thanks <span className="fa fa-arrow-up"></span></span> :
    <span>Yes <span className="fa fa-arrow-down"></span></span>;
  return <button className="btn btn-info btn-sm pull-xs-right" onClick={props.onClick} >{message}</button>;
};
ToggleButton.propTypes = {
  open: React.PropTypes.bool,
  onClick: React.PropTypes.func,
};


class JoinForm extends React.Component {

  handleSubmit(e) {
    e.preventDefault();
    this.props.afterSubmit(this.messageInput.value);
  }

  render() {
    return <form onSubmit={this.handleSubmit.bind(this)} className="m-t-1">
      <div className="form-group">
       <textarea className="form-control" required ref={(ref)=> this.messageInput = ref } placeholder="Optional message"></textarea>
      </div>
      <button className="btn btn-primary btn-sm">Send Request</button>
    </form>;
  }
}

JoinForm.propTypes = {
  afterSubmit: React.PropTypes.func.isRequired
};
