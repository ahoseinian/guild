import React from 'react';

export class Input extends React.Component {
  handleSearch() {
    this.props.handleSearch(this.input.value);
  }
  render() {
    return <input 
      type="search" 
      className="form-control" 
      placeholder="Search Guilds ..." 
      onKeyUp={this.handleSearch.bind(this)} 
      ref={(ref) => this.input = ref}
    />;
  }
}

Input.propTypes = {
  handleSearch: React.PropTypes.func.isRequired
};
