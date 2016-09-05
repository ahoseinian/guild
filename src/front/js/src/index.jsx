import React from 'react';
import {render} from 'react-dom';
import request from 'superagent';
import Search from '../search/Search.jsx';
import {GuildListBox} from './guild/list-box.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      guilds: []
    };
  }

  loadFromServer() {
    request.get(this.props.guildUrl).end((err, r) => {
      this.setState({guilds: r.body});
    });
  }

  componentDidMount() {
    this.loadFromServer();
    // setInterval(this.loadFromServer.bind(this), 5000);
  }

  render() {

    return (
      <div className="row">
        <div className="col-xs-12 col-md-8"></div>
        <div className="col-xs-12 col-md-4">
          <Search url="api/search"/>
          <GuildListBox items={this.state.guilds}/>
        </div>
      </div>
    );
  }
}
App.propTypes = {
  guildUrl: React.PropTypes.string
};

const container = document.getElementById('app');
if (container) {
  render(
    <App guildUrl="/api/guilds"/>, container);
}
