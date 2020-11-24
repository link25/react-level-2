import React from "react";
import "./Search.css";
import axios from "axios";

class Search extends React.Component {
  // Initilise some information in state
  constructor(props) {
    super(props);
    this.state = {
      query: "",
      results: {},
      loading: false,
      message: "",
      totalResults: 0,
    };
    this.cancel = "";
  }
  getPageCount = ( total, denominator ) => {
    const divisible	= 0 === total % denominator;
    const valueToBeAdded = divisible ? 0 : 1;
    return Math.floor( total/denominator ) + valueToBeAdded;
};
  // fetching for users
  fetchSearchResults = (query) => {
    const searchUrl = ` https://api.github.com/search/users?q=${query}`;

    if (this.cancel) {
      this.cancel.cancel();
    }

    this.cancel = axios.CancelToken.source();

    axios
      .get(searchUrl, {
        cancelToken: this.cancel.token,
      })
      .then((res) => {
        const total = res.data.total;

        const resultNotFoundMsg = !res.data.items.length
          ? "There are no more search results. Please try a new search"
          : "";
        this.setState({
          results: res.data.items,
          message: resultNotFoundMsg,
          totalResults: total,
          loading: false,
        });
      })

      .catch((error) => {
        if (axios.isCancel(error) || error) {
          this.setState({
            loading: false,
            message: "Failed to fetch the data. Please check network",
          });
        }
      });
  };

  handleOnInputChange = (event) => {
    const query = event.target.value;
    if (!query) {
      this.setState({ query, results: {}, message: "" });
    } else {
      this.setState({ query, loading: true, message: "" }, () => {
        this.fetchSearchResults(query);
      });
    }
  };
// Displaying object from the API query
  renderSearchResults = () => {
    const { results } = this.state;

    if (Object.keys(results).length && results.length) {
      return (
        <div className="results-container">
          {results.map((result) => {
            return (
              <a
                key={result.id}
                href={result.avatar_url}
                className="result-item"
              >
                <h6 className="image-username">{result.login}</h6>
                <div className="image-wrapper">
                  <img
                    className="image"
                    src={result.avatar_url}
                    alt={`${result.login} image`}
                  />
                </div>
              </a>
            );
          })}
        </div>
      );
    }
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
        {/*	Result*/}
			{ this.renderSearchResults() }
      </div>
    );
  }
}

export default Search;
