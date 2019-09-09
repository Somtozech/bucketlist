import React, { Component } from 'react';

export default class Search extends Component {
  state = {
    query: ''
  };

  handleChange = e => {
    this.setState({ query: e.target.value });
    this.props.handleSearch(e.target.value);
  };
  render() {
    const { query } = this.state;
    return (
      <div className="search">
        <i className="fas fa-search"></i>
        <input
          placeholder="Search BucketList"
          value={query}
          onChange={this.handleChange}
        ></input>
      </div>
    );
  }
}
