import React from 'react';
import {render} from 'react-dom';
import { GuildListBox } from './guild/list-box.jsx';

class App extends React.Component {
  render () {
    return ( 
      <div className="row">
        <div className="col-xs-12 col-md-8">
          <p> Hello React! Test3</p>
        </div>
        <div className="col-xs-12 col-md-4">
          <GuildListBox url="/guilds" />
        </div>
      </div>
    ); 
  } 
}

render(<App/>, document.getElementById('app'));
