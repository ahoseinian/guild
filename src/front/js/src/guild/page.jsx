import React from 'react';
import UserImage from '../user/img.jsx';
import Infos from './info.jsx';

const Page = props => {
  if (!props.item._user) return false;
  return (
    <div className="card">
    
      <div className="card-header">
        <div className="row">
          <div className="col-xs-10">
            <Head name={props.item.name}/>
            <Infos item={props.item} />
          </div>
          <div className="col-xs-2">
            <UserImage alt={props.item.name} src={props.item._user.info.img} />
          </div>
        </div>
      </div>

      <div className="card-block">
      </div>
    </div>
  );
};

Page.propTypes = { item: React.PropTypes.object.isRequired };
// Page.defaultProps = { item: { name: 'aaa' } };

const Head = (props) =>  <h1>{props.name}</h1>;
Head.propTypes = { name: React.PropTypes.string.isRequired };

export default Page;

