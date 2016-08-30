import React from 'react';
import { TextArea, FormGroup } from '../common/form.jsx';
import Button from '../common/buttons/button.jsx';
import request from 'superagent';

export default class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = { messages: [] };
  }

  handleSubmit(text) {
    request
      .post(this.props.url)
      .send({ text: text })
      .end((err, r) => {
        this.setState({
          messages: this.state.messages.concat([r.body])
        });
      });
  }

  render() {
    return (
      <div>
        <Form formSubmit={this.handleSubmit.bind(this)} />
        <MessageList messages={this.state.messages}/>
      </div>
    );
  }
}
Board.propTypes = {
  url: React.PropTypes.string.isRequired,
};

export class Form extends React.Component {
  constructor(props) {
    super(props);
    this._input = null;
  }
  handleSubmit(e) {
    e.preventDefault();
    let el = e.target.firstChild.firstChild;
    this.props.formSubmit(el.value);
    el.value = null;
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit.bind(this)}>
        <FormGroup>
          <TextArea placeholder="Say something..." required/>
        </FormGroup>
        <Button type="primary" text="Submit" />
      </form>
    );
  }
}
Form.propTypes = {
  formSubmit: React.PropTypes.func.isRequired
};


const MessageList = props => {
  const messages = props.messages.map((m) => <Message text={m.text} />);
  return <div>{messages}</div>;
};
MessageList.propTypes = {
  messages: React.PropTypes.arrayOf(React.PropTypes.object)
};

const Message = props => <div>{props.text}</div>;
Message.propTypes = {
  text: React.PropTypes.string.isRequired
};
