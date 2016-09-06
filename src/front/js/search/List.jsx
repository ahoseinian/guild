import React from 'react';
import {Card, CardBlock, CardFooter} from '../common/card.jsx';
import {Img} from '../common/Img.jsx';
import Button from '../common/buttons/href.jsx';

export const List = props => {
  const items = props.items.map((item) => <ListItem item={item} key={item._id}/>);
  return (
    <div className="m-t-3">
      <ul className='list-unstyled'>
        {items}
      </ul>
    </div>
  );
};
List.propTypes = {
  flush: React.PropTypes.bool,
  items: React.PropTypes.array
};

export const ListItem = props => {
  return (
    <Card>
      <CardBlock text>
        <div className="row">
          <div className="col-md-2">
            <a href={'/' + props.item.guildname} title={props.item.name}>
              <Img url={props.item._image.url} alt={props.item.name} fluid/>
            </a>
          </div>
          <div className="col-md-10">
            <Breadcrumb item={props.item}/>
            <p>{props.item.public.text}</p>
            <CardFooter right>
              <Button href={'/' + props.item.guildname} text="Guild Page" icon="users" size="sm"/>
            </CardFooter>
          </div>
        </div>
      </CardBlock>
    </Card>
  );
};
ListItem.propTypes = {
  item: React.PropTypes.object.isRequired
};

const Breadcrumb = props => (
  <ol className="breadcrumb bg-inverse font-weight-bold text-uppercase m-b-0">
    <li className="breadcrumb-item text-muted">{props.item.region}</li>
    <li className="breadcrumb-item text-muted">{props.item.realm}</li>
    <li className="breadcrumb-item">
      <strong>
        {props.item.name}
        - {props.item.guildname}
      </strong>

    </li>
  </ol>
);
Breadcrumb.propTypes = {
  item: React.PropTypes.object.isRequired
};
