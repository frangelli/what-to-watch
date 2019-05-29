import React, { Component, Fragment } from "react";
import { Provider } from "react-redux";
import { HashRouter, Switch, Route } from "react-router-dom";
import store from "./store";
import Home from "./pages/Home";

require("./App.scss");
export default class App extends Component {
  render() {
    return (
      <Fragment>
        <Provider store={store}>
          <HashRouter>
            <Switch>
              <Route path="/" exact component={Home} />
            </Switch>
          </HashRouter>
        </Provider>
      </Fragment>
    );
  }
}
