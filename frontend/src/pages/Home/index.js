import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Header from "../../components/Header";
import MovieList from "../../components/MovieList";
import UserMovieLists from "../../components/UserMovieLists";

require("./styles.scss");
export class Home extends Component {
  render() {
    const { loggedIn, user } = this.props;
    return (
      <Fragment>
        <Header />
        <section className="content">
          <MovieList />
        </section>
        <UserMovieLists />
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  loggedIn: state.searchReducer.loggedIn,
  user: state.searchReducer.user
});

const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
