import { DELETE_MOVIE, FETCH_MOVIE_START,
  FETCH_MOVIE_ERROR, RECEIVE_MOVIE } from "../constants";

const INITIAL_STATE = {
  movies: [],
  loading: false
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
      if (action.payload.Error != null) {
        movies = {...state, movies: [{response: action.payload.Response, id: action.payload.imdbID, name: 'Movie not found!', error: action.payload.Error}, ...state.movies], loading: false };
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
          ...state.movies], loading: false};
      }
      return movies;
    default:
      return state;
  }
};

export default movieReducer;
