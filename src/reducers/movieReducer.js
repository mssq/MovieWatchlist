import { DELETE_MOVIE, FETCH_MOVIE_START,
  FETCH_MOVIE_ERROR, RECEIVE_MOVIE } from "../constants";

const INITIAL_STATE = {
  movies: [],
  loading: false,
  error: 'None'
}

const movieReducer = (state=INITIAL_STATE, action) => {
  let movies = null;

  const removeById = (state, id) => {
    const movies = {...state, movies: state.movies.filter(movie => movie.id !== id)};
    return movies;
  }
  
  const filterRatings = (state, name) => {
    const rating = state.Ratings.filter(rating => rating.Source === name);
    return rating.length > 0 ? rating[0].Value : 'N/A';
  }

  switch(action.type) {
    case DELETE_MOVIE:
      movies = removeById(state, action.id);
      return movies;
    case FETCH_MOVIE_START:
      console.log('fetch_movie_start');
      return {...state, movies: [...state.movies], loading: true};
    case FETCH_MOVIE_ERROR:
      console.log('fetch_movie_error', action.payload);
      return state;
    case RECEIVE_MOVIE:
      console.log('receive_movie', action.payload);

      let duplicate = false;
      state.movies.forEach(movie => {
        if (movie.id === action.payload.imdbID) {
          duplicate = true;
        }
      });

      if (!duplicate) {
        if (action.payload.Error != null) {
          movies = {...state, loading: false, error: 'Movie not found!' };
        } else {
          movies = {...state, movies: [
            {response: action.payload.Response,
            id: action.payload.imdbID,
            name: action.payload.Title,
            year: action.payload.Year,
            image: action.payload.Poster,
            duration: action.payload.Runtime,
            released: action.payload.Released,
            genre: action.payload.Genre,
            description: action.payload.Plot,
            imdbID: action.payload.imdbID,
            imdbRating: action.payload.imdbRating,
            imdbVotes: action.payload.imdbVotes,
            rottenRating: filterRatings(action.payload, 'Rotten Tomatoes'),
            metacriticRating: filterRatings(action.payload, 'Metacritic')},
            ...state.movies], loading: false, error: 'None'};
        }
      } else {
        movies = {...state, loading: false, error: 'Film is already on the list!'};
      }
        
      return movies;
    default:
      return state;
  }
};

export default movieReducer;
