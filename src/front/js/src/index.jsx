import React from 'react';
import {render} from 'react-dom';
import { GuildListBox } from './guild/list-box.jsx';
import GuildPage from './guild/page.jsx';
import {ajax} from 'jquery';

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = { guilds:[], selectedGuild: {} };
    this.handleUserInput = this.handleUserInput.bind(this);
  }

  handleUserInput(key){
    this.setState({
      selectedGuild: this.state.guilds[key],
    });
  }

  loadFromServer(){
    ajax({
      url:this.props.guildUrl,
      dataType:'json',
      cache:false,
      success: (data) => {
        this.setState({ 
          guilds:data,
          selectedGuild: data[0]
        });
      }
    });
  }

  componentDidMount() {
    this.loadFromServer();
    // setInterval(this.loadFromServer.bind(this), 5000);
  }

  render () {

    return ( 
      <div className="row">
        <div className="col-xs-12 col-md-8">
          <GuildPage item={ this.state.selectedGuild } />
        </div>
        <div className="col-xs-12 col-md-4">
          <GuildListBox items={this.state.guilds} onUserInput={this.handleUserInput}/>
        </div>
      </div>
    ); 
  } 
}
App.propTypes = { guildUrl: React.PropTypes.string };


render(<App guildUrl="/guilds" />, document.getElementById('app'));
