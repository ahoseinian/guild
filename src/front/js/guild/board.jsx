import React from 'react';
import { TextArea, FormGroup, File } from '../common/form.jsx';
import { Card } from '../common/card.jsx';
import Button from '../common/buttons/button.jsx';
import request from 'superagent';
import UserImage from '../user/img.jsx';
import update from 'react-addons-update';

export default class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = { messages: [] };
  }

  componentDidMount() {
    request
      .get(this.props.url)
      .end((err, r) => {
        this.setState({
          messages: r.body
        });
      });
  }

  handleSubmit(data) {
    let r = request
      .post(this.props.url)
      .field('text', data.text);

    if (data.file) {
      r.attach('image', data.file);
    }

    r.end((err, r) => {
      this.setState({
        messages: update(this.state.messages, { $unshift: [r.body] })
      });
    });
  }

  render() {
    return (
      <div>
        {this.props.editable ? <Form formSubmit={this.handleSubmit.bind(this)} /> : null}
        <MessageList messages={this.state.messages}/>
      </div>
    );
  }
}
Board.propTypes = {
  url: React.PropTypes.string.isRequired,
  editable: React.PropTypes.bool.isRequired,
};

export class Form extends React.Component {
  constructor(props) {
    super(props);
  }
  handleSubmit(e) {
    e.preventDefault();

    const data = {
      text: e.target.childNodes[0].firstChild.value,
      file: e.target.childNodes[1].firstChild.files[0],
    };

    this.props.formSubmit(data);
    e.target.reset();
  }

  render() {
    return (
      <Card block>
        <form onSubmit={this.handleSubmit.bind(this)}>
          <FormGroup>
            <TextArea placeholder="Say something..." name="text"/>
          </FormGroup>
          <FormGroup>
            <File name="file"/>
          </FormGroup>
          <Button type="primary" text="Submit" />
        </form>
      </Card>
    );
  }
}
Form.propTypes = {
  formSubmit: React.PropTypes.func.isRequired
};


const MessageList = props => {
  const messages = props.messages.map((m) => <Message item={m} key={m._id} />);
  return <section>{messages}</section>;
};
MessageList.propTypes = {
  messages: React.PropTypes.arrayOf(React.PropTypes.object)
};

const Message = props => {
  const images = props.item._images.map((x) => <Image item={x} key={x._id} />);

  return <Card block>
    <div className="row">
      <div className="col-xs-1">
        <UserImage user={props.item._user} />
      </div>
      <div className="col-xs-11">
        <p> 
          <small className="text-muted">{props.item._user.displayName}: </small>
          {props.item.text} 
        </p>
        {images}
      </div>
    </div>
  </Card>;
};
Message.propTypes = {
  item: React.PropTypes.object.isRequired
};


export const Image = props => <img src={props.item.url} alt="Post image" className="img-fluid" />;
Image.propTypes = {
  item: React.PropTypes.object.isRequired
};
