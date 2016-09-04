import './guild.scss';
import React from 'react';
import {render} from 'react-dom';
import Sidebar from './sidebar.jsx';
import Board from './board.jsx';
import {Infobar} from './Infobar.jsx';

export const GuildPage = props => {
  const editable = !!props.user._guild && props.user._guild._id == props.guild._id;
  const owner = !!props.user._guild && props.guild._user == props.user._id;
  return <div className="row">
    <div className="col-md-3">
      <Infobar guild={props.guild} owner={owner}/>
    </div>
    <div className="col-md-6">
      <Board url={props.guild.url.api + '/board'} editable={editable} user={user}/>
    </div>
    <div className="col-md-3">
      <Sidebar {...props}/>
    </div>
  </div>;
};

GuildPage.propTypes = {
  guild: React.PropTypes.object.isRequired,
  user: React.PropTypes.object.isRequired,
  requested: React.PropTypes.bool
};

const container = document.getElementById('app');
const guild = JSON.parse(container.dataset.guild);
const user = container.dataset.user
  ? JSON.parse(container.dataset.user)
  : {};
const requested = !!JSON.parse(container.dataset.requested);
render(
  <GuildPage guild={guild} user={user} requested={requested}/>, container);
