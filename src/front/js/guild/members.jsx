import React from 'react';
import { Card } from '../common/card.jsx';
import { UserList } from '../user/list.jsx';
import request from 'superagent';

export class Members extends React.Component {
  constructor(props) {
    super(props);
    this.state = { users: [] };
  }

  componentDidMount() {
    request
      .get(this.props.guild.url.api + '/members')
      .end((err, res) => this.setState({ users: res.body }));
  }

  render() {
    return (
      <Card>
        <UserList users={this.state.users} />
      </Card>
    );
  }
}

Members.propTypes = {
  guild: React.PropTypes.object.isRequired
};
