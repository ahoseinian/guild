import React from 'react';

const Infos = props => {

  return <ul className="list-inline">
    <Info name="Realm" amount={props.item.realm} />
    <Info name="Region" amount={props.item.region} />
  </ul>;
};
Infos.propTypes = {
  item: React.PropTypes.object.isRequired
};

const Info = props => <li className="list-inline-item small text-muted">{props.name}: {props.amount}</li>;
Info.propTypes = {
  name: React.PropTypes.string.isRequired,
  amount: React.PropTypes.string.isRequired,
};


export default Infos;
