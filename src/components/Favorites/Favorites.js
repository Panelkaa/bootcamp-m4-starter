import React, { Component } from 'react';
import './Favorites.css';
import { connect } from 'react-redux';
import { API_URL_LIST } from '../../config';
import { removeFilm } from '../../redux/actions';
import { Link } from "react-router-dom";


const mapStateToProps = (state) => {
    return {
        favoriteFilms: state.favoriteFilms
    }
}

const mapDispatchToProps = dispatch => ({
    removeFilm: (imdbID) => dispatch(removeFilm(imdbID))
})

class Favorites extends Component {
    state = {
        title: '',
        save: false,
        dataID: ''
    }
    createListHandler = (e) => {

        const obj = {
            title: this.state.title,
            movies: this.props.favoriteFilms.map((favoriteFilms) => {
                return favoriteFilms.imdbID
            })
        }
        fetch(`${API_URL_LIST}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },

            body: JSON.stringify(obj)
        })
            .then(res => res.json())
            .then(data => {
                console.log('Success', data)
                this.setState({
                    dataID: data.id
                })
                //add this id to global state 
            })

    }

    saveListHandler = () => {
        this.setState({
            save: true
        })

    }

    writeListHandler = (e) => {
        this.setState({ title: e.target.value });

    }

    render() {
        const { imdbID } = this.props;
        return (
            <div className="favorites" >
                <input placeholder="Введите название списка" onChange={this.writeListHandler} className="favorites__name" />
                <ul className="favorites__list">
                    {this.props.favoriteFilms && this.props.favoriteFilms.map((item) => {
                        return <li key={item.imdbID}> {item.Title} ({item.Year})
                            <button onClick={() => { this.props.removeFilm(item.imdbID) }}> X </button> </li>

                    })}
                </ul>
                {!this.state.save ? <button
                    disabled={this.props.favoriteFilms && !this.state.title}
                    onClick={() => { this.saveListHandler(); this.createListHandler() }}

                    type="button"
                    className={!this.state.save ? "favorites__save" : null}>
                    Сохранить список</button> : <Link to={`/list/${this.state.dataID}`}>Перейти к списку</Link>}


            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Favorites);