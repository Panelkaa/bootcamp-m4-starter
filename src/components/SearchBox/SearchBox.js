import React, { Component } from 'react';
import './SearchBox.css';
import store from '../../redux/store';

class SearchBox extends Component {
        state = {
            searchLine: '',
            films: []
        }
         
    searchLineChangeHandler = (e) => {
        this.setState({ searchLine: e.target.value });
    }
    searchBoxSubmitHandler = (e) => {
        e.preventDefault();
    }
    searchButtonHandler = (e) => {
        const searchFilm  = this.state.searchLine;
        fetch(`http://www.omdbapi.com/?s=${searchFilm}&apikey=11ecf7e1`)
            .then(res => res.json())
            .then(data => {
                if (!data.Response || data.Response === "False") 
                return alert("Error!")
                console.log(data)      
                this.setState({
                    films: data.Search
                })
                const films = this.state.films
                store.dispatch({
                    type: 'ADD_FILMS_TO_LIST',
                    payload: {
                        films: data.Search
                    }                   
              })
            })      
    }
    render() {
        const { searchLine } = this.state;
        return (
            <div className="search-box">
                <form className="search-box__form" onSubmit={this.searchBoxSubmitHandler}>
                    <label className="search-box__form-label">
                        Искать фильм по названию:
                        <input
                            value={searchLine}
                            type="text"
                            className="search-box__form-input"
                            placeholder="Например, Shawshank Redemption"
                            onChange={this.searchLineChangeHandler}
                        />
                    </label>
                    <button
                        type="submit"
                        className="search-box__form-submit"
                        disabled={!searchLine}
                        onClick={this.searchButtonHandler}
                    >
                        Искать
                    </button>
                </form>    
            </div>
        );
    }
}
 
export default SearchBox;