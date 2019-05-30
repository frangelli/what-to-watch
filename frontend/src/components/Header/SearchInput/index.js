import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { search, setSearchData } from "store/actions";

require("./styles.scss");
export class SearchInput extends Component {
  constructor(props) {
    super(props);
    // this timer will be used to dispatch the
    // search only after stoping typing for a while
    this.inputDebouncer = null;
    this.searchFieldRef = React.createRef();
  }

  componentDidMount() {
    this.searchFieldRef.current.focus();
  }

  onChange = e => {
    if (this.inputDebouncer) {
      clearTimeout(this.inputDebouncer);
    }
    const searchTerm = e.target.value;
    const {
      search,
      setSearchData,
      match: { path }
    } = this.props;
    setSearchData({ searchTerm });
    if (searchTerm.length > 1) {
      this.inputDebouncer = setTimeout(() => {
        search(searchTerm);
        if (path !== "/") {
          this.props.history.push("/");
        }
      }, 400);
    } else {
      setSearchData({ people: [], searchMade: false });
    }
  };

  componentWillUnmount() {
    if (this.inputDebouncer) {
      clearTimeout(this.inputDebouncer);
    }
  }

  render() {
    return (
      <div id="search-input" className="col col-xs-12">
        <div className="form-group has-search">
          <span className="fa fa-search form-control-feedback" />
          <input
            type="text"
            ref={this.searchFieldRef}
            placeholder="Type here the movie or TV Show name: e.g. Mission Impossible"
            className="form-control form-control-lg"
            onChange={this.onChange}
            value={this.props.searchTerm}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  searchTerm: state.searchReducer.searchTerm
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      search,
      setSearchData
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(SearchInput));
