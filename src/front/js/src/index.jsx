import React from 'react';
import { render } from 'react-dom';
import { GuildListBox } from './guild/list-box.jsx';
import GuildPage from './guild/page.jsx';
import request from 'superagent';
import Search from '../search/Search.jsx';
import { Card } from '../common/card.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { guilds: [], selectedGuild: {} };
    this.handleUserInput = this.handleUserInput.bind(this);
  }

  handleUserInput(key) {
    this.setState({
      selectedGuild: this.state.guilds[key],
    });
  }

  loadFromServer() {
    request
      .get(this.props.guildUrl)
      .end((err, r) => {
        this.setState({
          guilds: r.body,
          selectedGuild: r.body[0]
        });
      });
  }

  componentDidMount() {
    this.loadFromServer();
    // setInterval(this.loadFromServer.bind(this), 5000);
  }

  render() {

    return (
      <div className="row">
        <div className="col-xs-12 col-md-8">
          <GuildPage item={ this.state.selectedGuild } />
        </div>
        <div className="col-xs-12 col-md-4">
          <Card>
            <Search  url="api/search" />
          </Card>
          <GuildListBox items={this.state.guilds} onUserInput={this.handleUserInput}/>
        </div>
      </div>
    );
  }
}
App.propTypes = { guildUrl: React.PropTypes.string };

const container = document.getElementById('app');
if (container) {
  render(<App guildUrl="/api/guilds" />, container);
}
