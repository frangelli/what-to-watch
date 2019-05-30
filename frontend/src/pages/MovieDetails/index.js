import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { bindActionCreators } from "redux";
import {
  findByImdb,
  setSearchData,
  fetchUserMovieLists,
  addMovieToList
} from "store/actions";
import Header from "../../components/Header";
import Image from "../../components/Image";

require("./styles.scss");
export class MovieDetails extends Component {
  componentDidMount() {
    const { imdb_id } = this.props.match.params;
    if (!imdb_id) {
      this.props.history.push("/");
    }
    this.props.findByImdb(imdb_id);
    if (this.props.loggedIn) {
      this.props.fetchUserMovieLists(this.props.user.id);
    }
  }

  onBackClick = () => {
    this.props.history.push("/");
    this.props.setSearchData({ selectedMovie: null });
  };

  onListChange = e => {
    const listId = e.target.value;
    const { user, movie } = this.props;
    if (listId === "0") {
      return;
    }
    this.props.addMovieToList(user.id, listId, movie).then(() => {
      window.alert("Movie added to list");
    });
  };

  renderLists = () => {
    return this.props.movie_lists.map(list => {
      return (
        <option key={list.id} value={list.id}>
          {list.name}
        </option>
      );
    });
  };

  render() {
    const { movie, loggedIn } = this.props;
    if (!movie) return null;
    return (
      <Fragment>
        <Header />
        <div className="container">
          <div className="row">
            <div className="col col-xs-12 col-md-4">
              <div className="poster-and-actions">
                <Image src={movie.poster_url} width="250" height="300" />
                <div className="actions">
                  <button className="btn btn-dark" onClick={this.onBackClick}>
                    <i className="fa fa-arrow-left" /> Back
                  </button>
                  <select onChange={this.onListChange}>
                    <option key="0" value="0">
                      Add to List
                    </option>
                    {!loggedIn && (
                      <option key="#" value="#">
                        Login Before...
                      </option>
                    )}
                    {this.renderLists()}
                  </select>
                </div>
              </div>
            </div>
            <div className="col col-xs-12 col-md-8">
              <div className="movie-info">
                <h4>{movie.title}</h4>
                <table className="table table-sm">
                  <tbody>
                    <tr>
                      <th>Release:</th>
                      <td>{movie.released}</td>
                      <th>Run time:</th>
                      <td>{movie.runtime}</td>
                    </tr>
                    <tr>
                      <th>IMDB Rating:</th>
                      <td>{movie.imdb_rating}</td>
                      <th>Production:</th>
                      <td>{movie.production}</td>
                    </tr>
                    <tr>
                      <th>Director:</th>
                      <td>{movie.director}</td>
                      <th>Genre:</th>
                      <td>{movie.genre}</td>
                    </tr>
                    <tr>
                      <th>Writer:</th>
                      <td colSpan="3">{movie.writer}</td>
                    </tr>
                    <tr>
                      <th>Actors:</th>
                      <td colSpan="3">{movie.actors}</td>
                    </tr>
                    <tr>
                      <th>Plot:</th>
                      <td colSpan="3">{movie.plot}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  movie: state.searchReducer.selectedMovie,
  loading: state.searchReducer.loading,
  movie_lists: state.searchReducer.movie_lists,
  loggedIn: state.searchReducer.loggedIn,
  user: state.searchReducer.user
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      findByImdb,
      setSearchData,
      fetchUserMovieLists,
      addMovieToList
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(MovieDetails));
