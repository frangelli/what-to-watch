import React, { Component, Fragment } from "react";
import { Provider } from "react-redux";
import { HashRouter, Switch, Route } from "react-router-dom";
import store from "./store";
import Home from "./pages/Home";
import MovieDetails from "./pages/MovieDetails";

require("./App.scss");
export default class App extends Component {
  render() {
    return (
      <Fragment>
        <Provider store={store}>
          <HashRouter>
            <Switch>
              <Route path="/" exact component={Home} />
              <Route path="/details/:imdb_id" exact component={MovieDetails} />
            </Switch>
          </HashRouter>
        </Provider>
      </Fragment>
    );
  }
}
