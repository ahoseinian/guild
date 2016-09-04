import React from 'react';
import {TextArea, FormGroup, File} from '../common/form.jsx';
import {Card, CardHeader, CardFooter, CardBlock, CardText} from '../common/card.jsx';
import Button from '../common/buttons/button.jsx';
import request from 'superagent';
import UserImage from '../user/img.jsx';
import update from 'react-addons-update';

export default class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: []
    };
  }

  componentDidMount() {
    request.get(this.props.url).end((err, r) => {
      this.setState({messages: r.body});
    });
  }

  handleSubmit(data) {
    let r = request.post(this.props.url).field('text', data.text);

    if (data.file) {
      r.attach('image', data.file);
    }

    r.end((err, r) => {
      this.setState({
        messages: update(this.state.messages, {
          $unshift: [r.body]
        })
      });
    });
  }

  removeMessage(item) {
    request.delete(this.props.url + '/' + item._id).end((err, r) => {
      if (r.body.status == 'ok') {

        const index = this.state.messages.indexOf(item);
        if (index > -1) {
          this.setState({
            messages: update(this.state.messages, {
              $splice: [
                [index, 1]
              ]
            })
          });
        }
      }
    });
  }

  render() {
    return (
      <div>
        {this.props.editable
          ? <Form formSubmit={this.handleSubmit.bind(this)}/>
          : null}
        <MessageList messages={this.state.messages} user={this.props.user} removeMessage={this.removeMessage.bind(this)}/>
      </div>
    );
  }
}
Board.propTypes = {
  url: React.PropTypes.string.isRequired,
  editable: React.PropTypes.bool.isRequired,
  user: React.PropTypes.object.isRequired
};

export class Form extends React.Component {
  constructor(props) {
    super(props);
  }
  handleSubmit(e) {
    e.preventDefault();
    let form = e.target;

    const data = {
      text: form.elements['text'].value,
      file: form.elements['file'].files[0]
    };

    this.props.formSubmit(data);
    form.reset();
  }

  render() {
    return (
      <Card>
        <CardHeader text="Make a new story" icon="edit"/>
        <CardBlock>
          <form onSubmit={this.handleSubmit.bind(this)}>
            <FormGroup>
              <TextArea placeholder="Say something..." name="text"/>
            </FormGroup>
            <FormGroup>
              <div className="row">
                <div className="col-sm-6">
                  <File name="file"/>
                </div>
                <div className="col-sm-6 text-xs-right">
                  <Button type="primary" text="Write" icon="pencil"/>
                </div>
              </div>
            </FormGroup>
          </form>
        </CardBlock>
      </Card>
    );
  }
}
Form.propTypes = {
  formSubmit: React.PropTypes.func.isRequired
};

const MessageList = props => {
  const messages = props.messages.map((m) => <Message item={m} key={m._id} editable={m._user._id == props.user._id} removeMessage={props.removeMessage}/>);
  return <section>{messages}</section>;
};
MessageList.propTypes = {
  messages: React.PropTypes.arrayOf(React.PropTypes.object),
  user: React.PropTypes.object.isRequired,
  removeMessage: React.PropTypes.func
};

const Message = props => {
  const images = props.item._images.map((x) => <Image item={x} key={x._id}/>);
  const date = new Date(props.item.date);

  return <Card>
    <CardBlock row>
      <div className="col-xs-1 text-xs-center">
        <UserImage user={props.item._user}/>
        <small className="text-muted">
          {date.toLocaleDateString('en-us', {
            month: 'short',
            day: 'numeric'
          })}
        </small>
      </div>
      <div className="col-xs-11">
        <div className="p-b-1">
          <small className="text-muted">{props.item._user.displayName}</small>
          <CardText text={props.item.text}/>
        </div>
        {images}
      </div>
    </CardBlock>
    {props.editable
      ? <CardFooter right>
          <Button type="danger" icon="trash" size="sm" onClick={() => props.removeMessage(props.item)}/>
        </CardFooter>
      : null
}
  </Card>;
};
Message.propTypes = {
  item: React.PropTypes.object.isRequired,
  editable: React.PropTypes.bool,
  removeMessage: React.PropTypes.func
};

export const Image = props => <img src={props.item.url} alt="Post image" className="img-fluid"/>;
Image.propTypes = {
  item: React.PropTypes.object.isRequired
};
