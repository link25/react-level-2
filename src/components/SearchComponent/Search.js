import React from 'react';
import './Search.css';

class Search extends  React.Component {
// Initilise some information in state
    constructor( props ) {
		super( props );
		this.state = {
			query: '',
                        results: {},
                        loading: false,
                        message: '',
		};
    }
    
render() {
    return (
        <div className="container">
            {/*Heading*/}
            <h2 className="heading">Github User Search</h2>
            {/*Search Input*/}
            <label className="search-label" htmlFor="search-input">
                <input
                    type="text"
                    value=""
                    id="search-input"
                    placeholder="Search..."
                />
                <i className="fa fa-search search-icon" aria-hidden="true"/>
            </label>
            
        </div>
        )
}

}

export default Search