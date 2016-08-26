import React from 'react';
import {render} from 'react-dom';

import Sidebar from './sidebar.jsx';

export default class GuildPage extends React.Component {
  constructor(props){
    super(props);
    this.state = { guild: JSON.parse(container.dataset.guild) };
  }

  render(){
    return <div className="row">
      <div className="col-md-8"></div>
      <div className="col-md-4">
        <Sidebar />
      </div>
    </div>;
  }
}

const container = document.getElementById('app');


render(<GuildPage url="/api/guilds/" />, container);