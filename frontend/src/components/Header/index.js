import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { bindActionCreators } from "redux";
import { Link } from "react-router-dom";
import { login, setSearchData, fetchUserMovieLists } from "store/actions";
import SearchInput from "./SearchInput";

require("./styles.scss");
export class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showLoginForm: false,
      name: "",
      email: "",
      showError: false
    };
  }
  onLoginClick = () => {
    this.setState({ showLoginForm: true });
  };

  onLoginCloseClick = () => {
    this.setState({ showLoginForm: false, name: "", email: "" });
  };

  onLoginSubmit = e => {
    e.preventDefault();
    const { name, email } = this.state;
    if (!name || !email) {
      this.setState({ showError: true });
      return;
    }
    this.props.login(name, email).then(() => {
      this.props.fetchUserMovieLists(this.props.user.id);
    });
  };

  onLogoutClick = () => {
    localStorage.removeItem("w2w-user");
    localStorage.removeItem("w2w-loggedIn");
    this.props.setSearchData({
      user: null,
      loggedIn: false,
      movies: [],
      movie_lists: [],
      searchTerm: ""
    });
    this.setState({ showLoginForm: false });
  };

  render() {
    const { loggedIn, user } = this.props;
    return (
      <Fragment>
        <nav id="header" className="navbar fixed-top navbar-light bg-light">
          <Link className="navbar-brand" to="/">
            <i className="fa fa-film" /> What to Watch
          </Link>
          <SearchInput />
          {!loggedIn && !this.state.showLoginForm && (
            <button className="btn btn-dark" onClick={this.onLoginClick}>
              <i className="fa fa-user" /> Login
            </button>
          )}
          {!loggedIn && this.state.showLoginForm && (
            <button className="btn btn-danger" onClick={this.onLoginCloseClick}>
              <i className="fa fa-times" />
            </button>
          )}
          {loggedIn && (
            <Fragment>
              <span className="username">{user.name}</span>
              <button
                className="btn btn-dark btn-sm"
                onClick={this.onLogoutClick}
              >
                <i className="fa fa-sign-out-alt" />
              </button>
            </Fragment>
          )}
        </nav>
        {this.state.showLoginForm && !loggedIn && (
          <div className="login-form-wrapper" ref={this.loginWrapperRef}>
            <form onSubmit={this.onLoginSubmit}>
              <div className="form-group row">
                <label htmlFor="name" className="col-sm-2 col-form-label">
                  Name
                </label>
                <div className="col-sm-10">
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    placeholder="Username"
                    value={this.state.name}
                    onChange={e => {
                      this.setState({ name: e.target.value });
                    }}
                  />
                </div>
              </div>
              <div className="form-group row">
                <label htmlFor="email" className="col-sm-2 col-form-label">
                  Email
                </label>
                <div className="col-sm-10">
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    placeholder="Email"
                    value={this.state.email}
                    onChange={e => {
                      this.setState({ email: e.target.value });
                    }}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col col-xs-12">
                  <button
                    className="btn btn-dark btn-block"
                    onClick={this.onLoginSubmit}
                  >
                    Submit
                  </button>
                </div>
              </div>
            </form>
          </div>
        )}
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  loggedIn: state.searchReducer.loggedIn,
  user: state.searchReducer.user
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      login,
      setSearchData,
      fetchUserMovieLists
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Header));
