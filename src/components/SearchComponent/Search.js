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
        const resultNotFoundMsg = !res.data.items.length
          ? "There are no more search results. Please try a new search"
          : "";
        this.setState({
          results: res.data.items,
          message: resultNotFoundMsg,
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

  /**
   * Fetch results according to the prev or next page requests.
   *
   * @param {String} type 'prev' or 'next'
   */

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
