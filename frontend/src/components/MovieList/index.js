import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { uniqueId } from "lodash";
import { setSearchData } from "store/actions";
import MovieCard from "./MovieCard";
const loadingImg = require("../../assets/images/loading.gif");

require("./styles.scss");
export class MovieList extends Component {
  static propTypes = {
    movies: PropTypes.array.isRequired,
    setSearchData: PropTypes.func.isRequired
  };

  onItemClick = movie => {
    const { history, setSearchData } = this.props;
    setSearchData({ movie });
    history.push(`/details/${movie.imdb_id}`);
  };

  render() {
    const { movies, loading, searchMade } = this.props;
    return (
      <section id="movies-list" className="row">
        {loading && (
          <div
            id="search-loading-indicator"
            className="col col-xs-12 text-center"
          >
            <img src={loadingImg} />
          </div>
        )}
        {movies.length === 0 && searchMade && !loading && (
          <div id="search-no-results" className="col col-xs-12 text-center">
            <h5 className="text-center">Your search has no results!</h5>
          </div>
        )}
        {movies.length === 0 && !searchMade && (
          <div id="search-instructions" className="col col-xs-12 text-center">
            <h5 className="text-center">
              Search for your movie or TV Show above!
            </h5>
          </div>
        )}
        {movies.map(movie => {
          return (
            <MovieCard
              key={uniqueId()}
              movie={movie}
              onItemClick={this.onItemClick}
            />
          );
        })}
      </section>
    );
  }
}

const mapStateToProps = state => ({
  movies: state.searchReducer.movies,
  loading: state.searchReducer.loading,
  searchMade: state.searchReducer.searchMade
});
const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      setSearchData
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(MovieList));
