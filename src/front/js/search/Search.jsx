import './search.scss';
import React from 'react';
import request from 'superagent';
import {Card} from '../common/card.jsx';
import {SearchForm} from './SearchForm.jsx';
import {List} from './List.jsx';

export default class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: []
    };
  }

  search(query) {
    let qry = query.trim();
    if (!qry) {
      return this.setState({items: []});
    }
    request.get(this.props.url).query({query: query}).end((err, r) => {
      this.setState({items: r.body.guilds});
    });
  }

  render() {
    return (
      <Card className="search-box">
        <SearchForm handleSearch={this.search.bind(this)}/>
        <List items={this.state.items}/>
      </Card>
    );
  }
}
Search.propTypes = {
  url: React.PropTypes.string.isRequired
};
