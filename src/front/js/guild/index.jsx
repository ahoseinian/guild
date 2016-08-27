import React from 'react';
import {render} from 'react-dom';

import Sidebar from './sidebar.jsx';

export default class GuildPage extends React.Component {
  constructor(props){
    super(props);

    this.user = container.dataset.user ? JSON.parse(container.dataset.user) : {};
    const guild = JSON.parse(container.dataset.guild);
    this.guildApiUrl = this.props.url + guild.id;

  }

  render(){
    return <div className="row">
      <div className="col-md-8"></div>
      <div className="col-md-4">
        <Sidebar user={this.user} url={this.guildApiUrl} requested={!!JSON.parse(container.dataset.requested)} />
      </div>
    </div>;
  }
}
GuildPage.propTypes = { 
  url: React.PropTypes.string.isRequired,
};

const container = document.getElementById('app');


render(<GuildPage url="/api/guilds/" />, container);