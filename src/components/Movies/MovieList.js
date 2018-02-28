import React, { Component, Fragment } from 'react';
import validUrl from 'valid-url';

import Alert from '../Alert/Alert';
import defaultMovie from '../../img/movie_default.png';
import imdbImage from '../../img/imdb.png';
import rottenImage from '../../img/rotten.png';
import metacriticImage from '../../img/metacritic.png';

class MovieList extends Component {

  renderList(movies) {
    return (
      <ul className="list-group">
      {
        movies.map(movie => {
          const imdbLink = `http://imdb.com/title/${movie.imdbID}`;
          const rottenLink = `https://rottentomatoes.com/m/${movie.name.split(' ').join('_')}`;
          const metacriticLink = `http://metacritic.com/movie/${movie.name.split(' ').join('-').toLowerCase()}`;

          return (
            <li key={movie.id} className="list-group-item">
              <div 
                className="list-item delete-button"
                onClick={() => this.props.deleteMovie(movie.id)}
              >
                &#x2715;
              </div>

              <div className="list-item">
                <div className='movie-pic'>
                  <img
                    src={validUrl.isUri(movie.image) ? movie.image : defaultMovie}
                    alt="movie"
                  />
                </div>
                <div className='movie-title-info'>
                  <div className='movie-name'>
                    {movie.year ? <h1 className="movie_name">{movie.name} <p>({movie.year})</p></h1> : <h1 className="movie_name">{movie.name}</h1>}
                  </div>
                  <div className='movie-info'>
                    <p>{movie.duration ? movie.duration : 'N/A'}</p>
                    <p>{movie.genre ? movie.genre : 'N/A'}</p>
                    <p>{movie.released ? movie.released : 'N/A'}</p>
                  </div>
                </div>
                <div className='movie-plot'>
                  <p>{movie.description ? movie.description : 'N/A'}</p>
                </div>
                <div className='rating-info'>
                  <a target='_blank' href={imdbLink}>
                    <img
                        className='imdb-image'
                        style={{width: 50, height: 25}}
                        src={imdbImage}
                        alt="imdb"
                    />
                    <p>{movie.imdbRating}</p>
                  </a>
                </div>
                <div className='rating-info'>
                  <a target='_blank' href={rottenLink}>
                    <img
                        className='rotten-image'
                        style={{width: 24, height: 25}}
                        src={rottenImage}
                        alt="rotten tomatoes"
                    />
                    <p>{movie.rottenRating}</p>
                  </a>
                </div>
                <div className='rating-info'>
                  <a target='_blank' href={metacriticLink}>
                    <img
                        className='metacritic-image'
                        style={{width: 25, height: 25}}
                        src={metacriticImage}
                        alt="metacritic"
                    />
                    <p>{movie.metacriticRating}</p>
                  </a>
                </div>
              </div>
            </li>
          )   
        })
      }
      </ul>
    )
  }

  shouldComponentUpdate(nextProps, nextState) {
    const { movies } = this.props.movies;
    if (movies.length > 0 && nextProps.movies.movies.length > 0) {
      if (movies[0].id === nextProps.movies.movies[0].id && movies.length === nextProps.movies.movies.length) {
        return false;
      }
    }
    return true;
  }

  render() {
    const { movies } = this.props.movies;
    const moviesFiltered = movies.filter(movie => movie.response !== 'False')
    console.log('MOVIES', movies);
    if (movies.length > 0 && movies[0].response === 'False' && !this.props.deleteStatus) {
      return (
        <Fragment>
          <Alert />
          {this.renderList(moviesFiltered)}
        </Fragment>
      )
    }
    
    return this.renderList(moviesFiltered)
  }

}

export default MovieList;