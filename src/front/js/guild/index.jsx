import React from 'react';
import { render } from 'react-dom';

import Sidebar from './sidebar.jsx';

export default class GuildPage extends React.Component {

  render() {
    return <div className="row">
      <div className="col-md-8"></div>
      <div className="col-md-4">
        <Sidebar {...this.props} />
      </div>
    </div>;
  }
}
GuildPage.propTypes = {
  guild: React.PropTypes.object.isRequired,
  user: React.PropTypes.object.isRequired,
  requested: React.PropTypes.bool
};

const container = document.getElementById('app');
const guild = JSON.parse(container.dataset.guild);
const user = container.dataset.user ? JSON.parse(container.dataset.user) : {};
const requested = !!JSON.parse(container.dataset.requested);
render(<GuildPage guild={guild} user={user} requested={requested} />, container);
