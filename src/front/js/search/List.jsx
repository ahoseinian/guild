import React from 'react';
import {Card, CardBlock, CardFooter} from '../common/card.jsx';
import {Img} from '../common/Img.jsx';
import {Breadcrumb} from '../guild/breadcrumb.jsx';

export const List = props => {
  const items = props.items.map((item) => <ListItem item={item} key={item._id}/>);
  return (
    <div className="m-t-1">
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
    <a href={'/' + props.item.guildname} title={props.item.name}>
      <Card>
        <CardBlock text>
          <div className="row">
            <div className="col-xs-12 col-lg-3 m-b-1">
              {props.item._image
                ? <Img url={props.item._image.url} alt={props.item.name} fluid/>
                : null}
            </div>
            <div className="col-xs-12 col-lg-9">
              <h2 className="p-b-1">@{props.item.guildname}</h2>
              <Breadcrumb item={props.item}/>
              <p className="small p-t-1">
                {props.item.public
                  ? props.item.public.text
                  : null}
              </p>
              <CardFooter right>
                {/* <Button href={'/' + props.item.guildname} text="Guild Page" icon="users" size="sm"/> */}
              </CardFooter>
            </div>
          </div>
        </CardBlock>
      </Card>
    </a>
  );
};
ListItem.propTypes = {
  item: React.PropTypes.object.isRequired
};
