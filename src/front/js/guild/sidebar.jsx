import React from 'react';

import JoinButton from './join-button.jsx';

const Sidebar = props => (
  <div>
    <JoinButton userName={props.userName} />
    Sidebar
  </div>
);

Sidebar.propTypes = {
  userName: React.PropTypes.string.isRequired
};

export default Sidebar;
