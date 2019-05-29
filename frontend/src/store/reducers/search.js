import { handle } from "redux-pack";
import * as types from "../actionTypes";

const initialState = {
  searchTerm: "",
  searchMade: false,
  movies: [],
  loading: false
};

export default (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case types.SEARCH:
      return handle(state, action, {
        start: prevState => ({
          ...prevState,
          loading: true,
          searchMade: true,
          movies: []
        }),
        success: prevState => ({
          ...prevState,
          loading: false,
          movies: payload.data.Search
        }),
        failure: prevState => ({
          ...prevState,
          loading: false,
          movies: []
        })
      });
    case types.SET_SEARCH_DATA:
      return { ...state, ...payload };
    default:
      return state;
  }
};
