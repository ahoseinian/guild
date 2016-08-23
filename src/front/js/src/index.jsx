import React from 'react';
import {render} from 'react-dom';

class App extends React.Component {
  render () {
    return <div className="col-xs-12">
      <p> Hello React! Test2</p>
    </div>; 
  } 
}

render(<App/>, document.getElementById('app'));
