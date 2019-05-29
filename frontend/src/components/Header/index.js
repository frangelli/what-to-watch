import React, { Component } from "react";
import { Link } from "react-router-dom";
import SearchInput from "./SearchInput";

require("./styles.scss");
export default class Header extends Component {
  render() {
    return (
      <nav id="header" className="navbar fixed-top navbar-light bg-light">
        <Link className="navbar-brand" to="/">
          <i className="fa fa-film" /> What to Watch
        </Link>
        <SearchInput />
      </nav>
    );
  }
}
