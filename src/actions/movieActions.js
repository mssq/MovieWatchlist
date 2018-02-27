import axios from 'axios';
import { DELETE_MOVIE, FETCH_MOVIE_START,
  FETCH_MOVIE_ERROR, RECEIVE_MOVIE } from '../constants';

export const deleteMovie = (id) => {
  const action = {
    type: DELETE_MOVIE,
    id
  }

  return action;
}

export const fetchMovie = (name) => {
  const apikey = '3be4f1d';

  return (dispatch) => {
    dispatch({type: FETCH_MOVIE_START})
    axios.get(`http://www.omdbapi.com/?t=${name}&apikey=${apikey}`)
      .then((response) => {
        setTimeout(() => {
          dispatch({type: RECEIVE_MOVIE, payload: response.data})
        }, 500)
      })
      .catch((err) => {
        dispatch({type: FETCH_MOVIE_ERROR, payload: err})
      })
  };
}
