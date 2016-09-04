import React from 'react';
import ajax from 'jquery';
import JoinSiteButton from '../common/buttons/href.jsx';
import Button from '../common/buttons/button.jsx';
import ToggleButton from '../common/buttons/toggle-button.jsx';
import {Card, CardText} from '../common/card.jsx';

export default class JoinButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      alreadyRequested: false
    };

    this.toggle = this.toggle.bind(this);
    this.afterSubmit = this.afterSubmit.bind(this);
  }

  toggle() {
    this.setState({
      open: !this.state.open
    });
  }

  afterSubmit(text) {
    this.setState({alreadyRequested: true});
    ajax.post(this.props.guild.url.api + '/join', {text: text}).done((r) => this.setState({message: r.message})).fail((r) => this.setState({message: r.responseJSON.message}));
  }

  render() {
    const form = this.state.open
      ? <JoinForm afterSubmit={this.afterSubmit}/>
      : null;

    const joinMethod = this.props.user.id
      ? <span>
          <ToggleButton className="pull-xs-right" open={this.state.open} onClick={this.toggle} size="sm" type="primary" yesProps={{
            icon: 'arrow-up'
          }} noProps={{
            icon: 'arrow-down'
          }}/> {form}
        </span>
      : <JoinSiteButton href="/auth/login" sm text="LOGIN / SIGN UP" icon="arrow-right"/>;

    const beforeRequest = <div>
      <CardText text="JOIN?"/> {joinMethod}
    </div>;

    const afterRequest = <CardText text={this.state.message}/>;

    return <Card block inverse type='info'>
      {this.state.alreadyRequested
        ? afterRequest
        : beforeRequest}
    </Card>;
  }
}

JoinButton.propTypes = {
  user: React.PropTypes.object.isRequired,
  guild: React.PropTypes.object.isRequired
};

class JoinForm extends React.Component {

  handleSubmit(e) {
    e.preventDefault();
    this.props.afterSubmit(this.messageInput.value);
  }

  render() {
    return <form onSubmit={this.handleSubmit.bind(this)} className="m-t-1">
      <div className="form-group">
        <textarea className="form-control" required ref={(ref) => this.messageInput = ref} placeholder="Message"></textarea>
      </div>
      <Button type="primary" icon="send" text="Send"/>
    </form>;
  }
}

JoinForm.propTypes = {
  afterSubmit: React.PropTypes.func.isRequired
};
