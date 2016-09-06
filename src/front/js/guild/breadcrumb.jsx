import React from 'react';
export const Breadcrumb = props => (
  <ol className="breadcrumb bg-inverse font-weight-bold text-muted small text-uppercase p-a-0 m-b-0">
    <li className="breadcrumb-item">{props.item.region}</li>
    <li className="breadcrumb-item">{props.item.realm}</li>
    <li className="breadcrumb-item">
      {props.item.name}
    </li>
  </ol>
);
Breadcrumb.propTypes = {
  item: React.PropTypes.object.isRequired
};
