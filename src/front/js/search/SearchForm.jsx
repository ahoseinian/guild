import React from 'react';
import update from 'react-addons-update';

export class SearchForm extends React.Component {
  constructor() {
    super();
    this.handleSearch = this.handleSearch.bind(this);
    this.state = {
      name: null,
      region: null
    };
  }
  handleSearch(query) {
    this.setState(update(this.state, {$set: query}));
  }
  handleInput() {
    this.handleSearch({name: this.input.value});
  }
  render() {
    return (
      <form className="form-inline">
        <Regions handleChange={this.handleSearch}/>
        <input type="search" className="form-control" placeholder="Search Guilds ..." onKeyUp={this.handleInput.bind(this)} ref={(ref) => this.input = ref}/>
      </form>
    );
  }
}
SearchForm.propTypes = {
  handleSearch: React.PropTypes.func.isRequired
};

class Regions extends React.Component {
  constructor() {
    super();
    this.items = ['eu', 'us'].map((item, i) => (
      <option value={item} key={i}>{item}</option>
    ));
  }
  handleChange() {
    this.props.handleChange({region: this.region.value});
  }
  render() {

    return (
      <select className="form-control" onChange={this.handleChange.bind(this)} ref={(ref) => this.region = ref}>
        {this.items}
      </select>
    );
  }
}

Regions.propTypes = {
  handleChange: React.PropTypes.func.isRequired
};
