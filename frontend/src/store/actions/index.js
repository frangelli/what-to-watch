import axios from "axios";
import * as types from "../actionTypes";

export const search = searchTerm => {
  const req = axios.get(`http://localhost:3000/search/search?q=${searchTerm}`);
  return {
    type: types.SEARCH,
    promise: req
  };
};

export const setSearchData = data => {
  return {
    type: types.SET_SEARCH_DATA,
    payload: data
  };
};
