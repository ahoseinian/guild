import React from 'react';
import {Card, CardText, CardBlock} from '../common/card.jsx';
import Button from '../common/buttons/href.jsx';
import RequestCount from './RequestCount.jsx';

export const Infobar = props => (
  <div className="infobar">

    {props.owner
      ? <div className="p-b-1">
          <RequestCount guildId={props.guild._id}/>
          <Button text="Guild setting" href="/user/settings/guild" icon="cog" sm/>
        </div>
      : null}
    {props.guild.public
      ? <PublicInfo guild={props.guild}/>
      : null}

    {props.guild.private
      ? <PrivateInfo {...props}/>
      : null}
  </div>
);
Infobar.propTypes = {
  children: React.PropTypes.node,
  guild: React.PropTypes.object.isRequired,
  owner: React.PropTypes.bool
};

const PublicInfo = props => {
  return props.guild.public
    ? (
      <Card>
        {props.guild._image
          ? <img src={props.guild._image.url} alt={props.guild.name} className="img-fluid"/>
          : null}
        {props.guild.public.text
          ? <CardBlock>
              <CardText text={props.guild.public.text}/>
            </CardBlock>
          : null}
      </Card>
    )
    : null;
};
PublicInfo.propTypes = {
  guild: React.PropTypes.object.isRequired
};

const PrivateInfo = props => {
  return props.guild.private
    ? (
      <Card block>
        <CardText text={props.guild.private.text}/>
      </Card>
    )
    : null;
};
PrivateInfo.propTypes = {
  guild: React.PropTypes.object.isRequired
};
