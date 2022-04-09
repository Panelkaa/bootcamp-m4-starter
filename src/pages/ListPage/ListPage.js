import React, { Component } from 'react';
import './ListPage.css';

class ListPage extends Component {
    state = {
        movies: [],
        imdbID: [],
        titleID: ""
    }

    componentDidMount() {
        const id = this.props.match.params.id;
        console.log(id);
        fetch(`https://acb-api.algoritmika.org/api/movies/list/${id}`)
        .then(res => res.json())
        .then((data) => {
            console.log("dw", data.movies)
            this.setState({
                titleID: data.title,
                movies: data.movies
            })

            const newMovies= [];
            this.state.movies.map((item) => {
                console.log(item)
                fetch (`http://www.omdbapi.com/?i=${item}&apikey=11ecf7e1`)
                .then(res => res.json())
                .then((data) => {
                    newMovies.push(data)
                    console.log(newMovies)
                    this.setState({movies: newMovies})
                })
            })
        })
        
        // TODO: запрос к сервер на получение списка
        // TODO: запросы к серверу по всем imdbID       
    }
    render() { 
        console.log('Title', this.state.titleID)
        const {imdbID, title } = this.props;
        return (
            <div className="list-page" >
                <h1 className="list-page__title">{this.state.titleID}</h1>
                <ul>
                    {this.state.movies.map((item) => {
                        return (
                            <li key={item.imdbID}>
                                <a href={`https://www.imdb.com/title/${item.imdbID}`} target="_blank">{item.Title} ({item.Year})</a>
                            </li>
                        );
                    })}
                </ul>
            </div>
        );
    }
}
 
export default ListPage;