import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  fetchUserMovieLists,
  fetchListMovies,
  setSearchData,
  saveList
} from "store/actions";

require("./styles.scss");
export class UserMovieLists extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showListForm: false,
      name: ""
    };
  }

  componentDidMount() {
    if (this.props.loggedIn) {
      this.props.fetchUserMovieLists(this.props.user.id);
    }
  }

  onListClick = listId => {
    this.props.fetchListMovies(this.props.user.id, listId);
    this.props.setSearchData({ searchTerm: "" });
  };

  renderList = () => {
    return this.props.movie_lists.map(list => {
      return (
        <div key={list.id} className="list-item">
          <a
            href="#"
            onClick={e => {
              e.preventDefault();
              this.onListClick(list.id);
            }}
          >
            {list.name}
          </a>
        </div>
      );
    });
  };

  onAddListClick = () => {
    const { loggedIn } = this.props;
    if (!loggedIn) {
      window.alert("Login before to be able to create lists!");
      return;
    }
    this.setState({ showListForm: true });
  };

  onListSubmit = e => {
    e.preventDefault();
    const { saveList, user, fetchUserMovieLists } = this.props;
    if (!this.state.name) {
      window.alert("Please add a name to the list!");
      return;
    }
    saveList(user.id, this.state.name).then(() => {
      this.setState({ showListForm: false, name: "" });
      fetchUserMovieLists(user.id);
    });
  };

  render() {
    const { loggedIn, user } = this.props;
    return (
      <section className="user-movie-lists">
        <h5 className="title">
          My Lists{" "}
          <button className="btn btn-sm btn-dark" onClick={this.onAddListClick}>
            <i className="fa fa-plus" />
          </button>
        </h5>
        {loggedIn && this.state.showListForm && (
          <form onSubmit={this.onLoginSubmit} className="container">
            <div className="form-group row">
              <label htmlFor="name" className="col-sm-12 col-form-label">
                Name
              </label>
              <div className="col-sm-12">
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  placeholder="List name"
                  value={this.state.name}
                  onChange={e => {
                    this.setState({ name: e.target.value });
                  }}
                />
              </div>
            </div>
            <button
              className="btn btn-block btn-dark"
              onClick={this.onListSubmit}
            >
              Save
            </button>
            <button
              className="btn btn-block btn-danger"
              onClick={() => {
                this.setState({ showListForm: false });
              }}
            >
              Cancel
            </button>
          </form>
        )}
        {!loggedIn && <span>Login to create your movie lists!</span>}
        {loggedIn && <Fragment>{this.renderList()}</Fragment>}
      </section>
    );
  }
}

const mapStateToProps = state => ({
  loggedIn: state.searchReducer.loggedIn,
  user: state.searchReducer.user,
  movie_lists: state.searchReducer.movie_lists
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      fetchUserMovieLists,
      fetchListMovies,
      setSearchData,
      saveList
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserMovieLists);
