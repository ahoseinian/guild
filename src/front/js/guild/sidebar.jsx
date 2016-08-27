import React from 'react';

import JoinButton from './join-button.jsx';

const Sidebar = props => (
  <div>
    <JoinButton {...props} />
    Sidebar
  </div>
);

Sidebar.propTypes = {
  user: React.PropTypes.object.isRequired,
  url: React.PropTypes.string.isRequired,
};

export default Sidebar;
