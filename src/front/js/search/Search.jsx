import './search.scss';
import React from 'react';
import { Input } from './Input.jsx';
import { List } from './List.jsx';
import request from 'superagent';

export default class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = { items: [] };
  }

  search(query) {
    let qry = query.trim();
    if (!qry) {
      return this.setState({ items: [] });
    }
    request
      .get(this.props.url)
      .query({ query: query })
      .end((err, r) => {
        this.setState({ items: r.body.guilds });
      });
  }

  render() {
    return (
      <div className="search-box">
        <Input handleSearch={this.search.bind(this)} />
        <List items={this.state.items} />
      </div>
    );
  }
}
Search.propTypes = {
  url: React.PropTypes.string.isRequired
};
