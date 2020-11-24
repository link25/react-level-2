import React from "react";
import "./Search.css";
import axios from 'axios';

class Search extends React.Component {
  // Initilise some information in state
  constructor(props) {
    super(props);
    this.state = {
      query: "",
      results: {},
      loading: false,
      message: "",
    };
  }
  // Handle input value
  handleOnInputChange = (event) => {
    const query = event.target.value;
    this.setState({ query:query, loading: true, message: "" });
  };

  render() {
    const { query } = this.state;
    console.warn(this.state);
    return (
      <div className="container">
        {/*Heading*/}
        <h2 className="heading">Github User Search</h2>
        {/*Search Input*/}
        <label className="search-label" htmlFor="search-input">
          <input
            type="text"
            name="query"
            value={query}
            id="search-input"
            placeholder="Search..."
            onChange={this.handleOnInputChange}
          />
          <i className="fa fa-search search-icon" aria-hidden="true" />
        </label>
      </div>
    );
  }
}

export default Search;
