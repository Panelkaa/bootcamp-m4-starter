export function addFilmsToList (id) {
    return {
        type: 'ADD_FILMS_TO_LIST',
        payload: {
            films: id
        }
    }
}

export function addList (movieToSave) {
    console.log('imdbID', movieToSave)
    return {
        type: 'ADD_TO_LIST',
        payload: {
            movies: movieToSave
        }
    }
}

export function removeFilm (imdbID) {
    return{
        type: 'REMOVE_FILM',
        payload: {
            removeFilm: imdbID
        }
    }
}