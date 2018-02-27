import React, { Component } from 'react';

class Search extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: ''
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.state.name !== nextState.name) {
      return false;
    }

    return true;
  }

  render() {
    return (
      <div className="add-movie">
        <input
          className="form-control add-input"
          placeholder="Movie name"
          onChange={event => this.setState({name: event.target.value})}
          onKeyPress={(e) => {
            if (e.keyCode === 13 || e.key === 'Enter') {
              this.props.addMovie(this.state.name);
            }
          }}
        />
        <button
          type="button"
          className="btn btn-success add-button"
          onClick={() => this.props.addMovie(this.state.name)}
        >
          Add Movie
        </button>
      </div>
    )
  }
};

export default Search;
