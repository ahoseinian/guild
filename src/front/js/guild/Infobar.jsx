import React from 'react';
import {Card, CardText, CardBlock} from '../common/card.jsx';

export const Infobar = props => (
  <div className="infobar">
    <PublicInfo {...props}/>
    <PrivateInfo {...props}/>
  </div>
);
Infobar.propTypes = {
  children: React.PropTypes.node
};

const PublicInfo = props => (
  <Card>
    {props.guild._image
      ? <img src={props.guild._image.url} alt={props.guild.name} className="img-fluid"/>
      : null}
    <CardBlock>
      <CardText text={props.guild.public.text}/>
    </CardBlock>
  </Card>
);
PublicInfo.propTypes = {
  guild: React.PropTypes.object.isRequired
};

const PrivateInfo = props => (
  <Card block>
    <CardText text={props.guild.private.text}/>
  </Card>
);
PrivateInfo.propTypes = {
  guild: React.PropTypes.object.isRequired
}
