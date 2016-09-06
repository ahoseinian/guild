import React from 'react';
import update from 'react-addons-update';
import request from 'superagent';
import {Card} from '../common/card.jsx';

export class SearchForm extends React.Component {
  constructor() {
    super();
    this.handleSearch = this.handleSearch.bind(this);
    this.regions = [
      {
        name: 'eu'
      }, {
        name: 'us'
      }
    ];
    this.state = {
      realms: [],
      query: {}
    };
  }
  handleSearch(key, value) {
    let obj = {};
    obj[key] = {
      $set: value
    };
    this.setState({
      query: update(this.state.query, obj)
    }, function() {
      if (key == 'region')
        this.getRealms();
      this.props.handleSearch(this.state.query);
    });
  }
  handleInput() {
    this.handleSearch('name', this.input.value);
  }
  getRealms() {
    request.get('/api/realms/' + this.state.query.region).end((err, r) => {
      this.setState({realms: r.body});
    });
  }
  componentDidMount() {
    this.getRealms();
  }
  render() {
    return (
      <Card block>

        <div className="text-xs-center">

          <form className="form-inline">
            <div className="form-group">
              <SelectInput handleChange={this.handleSearch} name="region" items={this.regions}/>
              <SelectInput handleChange={this.handleSearch} name="realm" items={this.state.realms}/>
            </div>
            <div className="form-group">
              <input type="search" className="form-control " placeholder="Search Guilds ..." onKeyUp={this.handleInput.bind(this)} ref={(ref) => this.input = ref}/>
            </div>
          </form>
        </div>
      </Card>
    );
  }
}
SearchForm.propTypes = {
  handleSearch: React.PropTypes.func.isRequired
};

class SelectInput extends React.Component {
  constructor(props) {
    super(props);
  }
  handleChange() {
    this.props.handleChange(this.props.name, this.input.value);
  }
  render() {

    const items = this.props.items.map((item, i) => (
      <option className="text-uppercase" value={item.name} key={i}>{item.name}</option>
    ));
    return (
      <select className="form-control  text-capitalized" onChange={this.handleChange.bind(this)} ref={(ref) => this.input = ref}>
        <option value="">{this.props.name.toUpperCase()}</option>
        {items}
      </select>
    );
  }
}

SelectInput.propTypes = {
  name: React.PropTypes.string.isRequired,
  handleChange: React.PropTypes.func.isRequired,
  items: React.PropTypes.array
};
