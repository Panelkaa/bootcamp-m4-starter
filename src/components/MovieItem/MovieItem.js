import React, { Component } from 'react';
import './MovieItem.css';
import { connect } from 'react-redux';
import {addList} from '../../redux/actions';

const mapDispatchToProps = dispatch => ({
    addList: (imdbID) => dispatch(addList(imdbID))
  })

class MovieItem extends Component {

    MovieHandler = (e)=> {
        const movieToSave = {
            Title: this.props.Title,
            Year: this.props.Year,
            imdbID: this.props.imdbID
        }
        this.props.addList(movieToSave)
    }
    render() {
        const { Title, Year, Poster, imdbID } = this.props;
        return (
            <article className="movie-item" key={imdbID}>
                <img className="movie-item__poster" src={Poster} alt={Title} />
                <div className="movie-item__info">
                    <h3 className="movie-item__title">{Title}&nbsp;({Year})</h3>
                    <button onClick={this.MovieHandler} type="button" className="movie-item__add-button">Добавить в список</button>
                </div>
            </article>
        );
    }
}
 
export default connect(null, mapDispatchToProps)(MovieItem);