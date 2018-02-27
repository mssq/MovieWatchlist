import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { deleteMovie, fetchMovie } from '../actions/movieActions';
import { ClipLoader } from 'react-spinners';
import validUrl from 'valid-url';
import AlertS from 'react-s-alert';

import Alert from './Alert/Alert';
import defaultMovie from '../img/movie_default.png';
import imdbImage from '../img/imdb.png';
import rottenImage from '../img/rotten.png';
import metacriticImage from '../img/metacritic.png';

import '../css/App.css';
import '../css/s-alert-default.css';
import '../css/scale.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      movieAmount: 0
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.state.name !== nextState.name) {
      return false;
    }

    return true;
  }

  componentDidMount() {
    const mName = document.querySelectorAll('.movie_name');

    for (let i = 0; i < mName.length; i++) {
      if (window.getComputedStyle(mName[i]).height !== '30px') {
        mName[i].style.fontSize = '20px';
      }
    }
  }

  addMovie() {
    this.props.fetchMovie(this.state.name);
    this.setState({movieAmount: this.state.movieAmount + 1});
  }

  deleteMovie(id) {
    this.props.deleteMovie(id);
    this.setState({movieAmount: this.state.movieAmount - 1});
  }

  renderMovies() {
    const { movies } = this.props.movies;
    const moviesFiltered = movies.filter(movie => movie.response !== 'False')

    console.log('MOVIES', movies);

    if (movies.length > 0 && movies[0].response === 'False' && 
      movies.length === this.state.movieAmount) {
      return (
        <Fragment>
          <Alert />
          {this.renderList(moviesFiltered)}
        </Fragment>
      )
    }
    
    return this.renderList(moviesFiltered)
  }

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
                onClick={() => this.deleteMovie(movie.id)}
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

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Movie Watchlist</h1>
        </header>

        <div className="add-movie">
          <input
            className="form-control add-input"
            placeholder="Movie name"
            onChange={event => this.setState({name: event.target.value})}
            onKeyPress={(e) => {
              if (e.keyCode === 13 || e.key === 'Enter') {
                this.addMovie();
              }
            }}
          />
          <button
            type="button"
            className="btn btn-success add-button"
            onClick={() => this.addMovie()}
          >
            Add Movie
          </button>
        </div>

        <div className='sweet-loading'>
          <ClipLoader
            color={'#3d3d3d'} 
            loading={this.props.movies.loading} 
          />
        </div>
        
        <div className="movie-list">
          { this.renderMovies() }
        </div>

        <AlertS stack={{limit: 1}} />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    movies: state
  }
}

export default connect(mapStateToProps, { deleteMovie, fetchMovie })(App);
