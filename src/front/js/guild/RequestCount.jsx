import React from 'react';
import Button from '../common/buttons/href.jsx';
import request from 'superagent';

export default class RequestCount extends React.Component {
  constructor() {
    super();
    this.state = {
      count: 0
    };
  }

  componentDidMount() {
    request.get('/api/guilds/' + this.props.guildId + '/requests/count').end((err, r) => this.setState({count: r.body.count}));
  }

  render() {
    const text = this.state.count + ' NEW REQUESTS';
    return <Button href="/user/settings/guild" text={text} type="info" sm/>;
  }
}
RequestCount.propTypes = {
  guildId: React.PropTypes.string.isRequired
};
