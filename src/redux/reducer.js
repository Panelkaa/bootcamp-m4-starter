const initialState = {
    films:[],
    favoriteFilms: [],
    favoriteFilmsID: null,
    

}
function reducer (state = initialState, action) {
      switch(action.type) {
        case 'ADD_FILMS_TO_LIST':
            const films = action.payload.films
            console.log(films)
            return {
                ...state,films
            }
        case 'ADD_TO_LIST':
            if(state.favoriteFilms.find(item => item.imdbID === action.payload.movies.imdbID))return state;
            return {
                ...state,
                favoriteFilms: [...state.favoriteFilms, action.payload.movies]
            }
        case 'REMOVE_FILM':
            const removeFilm = [...state.favoriteFilms];
            const newArray =  state.favoriteFilms.filter(item => item.imdbID != action.payload.removeFilm)
    
   
            return {
                ...state,
                favoriteFilms: newArray    
            }    
        default:
            return state;  
      }
}

export default reducer;