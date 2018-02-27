import React, { Component } from 'react';
import { connect } from 'react-redux';
import { deleteMovie, fetchMovie } from '../actions/movieActions';
import { ClipLoader } from 'react-spinners';
import AlertS from 'react-s-alert';

import Search from './Movies/Search';
import MovieList from './Movies/MovieList';

import '../css/App.css';
import '../css/s-alert-default.css';
import '../css/scale.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.addMovie = this.addMovie.bind(this);
    this.deleteMovie = this.deleteMovie.bind(this);
  }

  addMovie(movieName) {
    this.props.fetchMovie(movieName);
  }

  deleteMovie(id) {
    this.props.deleteMovie(id);
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Movie Watchlist</h1>
        </header>
        
        <Search addMovie={this.addMovie} />

        <div className='sweet-loading'>
          <ClipLoader
            color={'#3d3d3d'} 
            loading={this.props.movies.loading} 
          />
        </div>
        
        <div className="movie-list">
          <MovieList 
            movies={this.props.movies}
            deleteMovie={this.deleteMovie} />
        </div>

        <AlertS stack={{limit: 1}} />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    movies: state
  }
}

export default connect(mapStateToProps, { deleteMovie, fetchMovie })(App);
