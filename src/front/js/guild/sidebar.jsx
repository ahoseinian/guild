import React from 'react';
import JoinButton from './join-button.jsx';
import {Card, CardText} from '../common/card.jsx';
import {Members} from './members.jsx';

const Sidebar = ({
  requested,
  ...props
}) => (
  <div>
    {(() => {
      if (props.guild._user == props.user._id)
        return;
      if (requested)
        return (
          <Card block>
            <CardText text="We have your request here and will get back to you when our leader see this"/>
          </Card>
        );
      else if (!props.user._guild)
        return <JoinButton {...props}/>;
      }
    )()}
    <Members guild={props.guild}/>
  </div>
);

Sidebar.propTypes = {
  user: React.PropTypes.object.isRequired,
  guild: React.PropTypes.object.isRequired,
  requested: React.PropTypes.bool.isRequired
};

export default Sidebar;
