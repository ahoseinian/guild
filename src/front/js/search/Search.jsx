import './search.scss';
import React from 'react';
import request from 'superagent';
import {SearchForm} from './SearchForm.jsx';
import {List} from './List.jsx';

export default class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: []
    };
    this.search({});
  }

  search(query) {
    request.get(this.props.url).query(query).end((err, r) => {
      if (err)
        return console.error(err);
      this.setState({items: r.body.guilds});
    });
  }

  render() {
    return (
      <div className="search-place">
        <SearchForm handleSearch={this.search.bind(this)}/>
        <List items={this.state.items}/>
      </div>
    );
  }
}
Search.propTypes = {
  url: React.PropTypes.string.isRequired
};
