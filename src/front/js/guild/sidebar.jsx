import React from 'react';
import JoinButton from './join-button.jsx';
import { Card, CardText } from '../common/card.jsx';


const Sidebar = props => (
  <div>
    {(()=> {
      if(!props.user._guild) return <JoinButton {...props} />;
      else if(props.requested) 
        return (
          <Card block>
            <CardText text="We have your request here and will get back to you when our leader see this" />
          </Card>
        );
    })()}
    Sidebar
  </div>
);

Sidebar.propTypes = {
  user: React.PropTypes.object.isRequired,
  guild: React.PropTypes.object.isRequired,
  requested: React.PropTypes.bool.isRequired,
};

export default Sidebar;
