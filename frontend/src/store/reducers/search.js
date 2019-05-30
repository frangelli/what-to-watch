import { handle } from "redux-pack";
import * as types from "../actionTypes";
import { moviesListDataParser, movieDataParser } from "../utils";

const initialState = {
  searchTerm: "",
  searchMade: false,
  movies: [],
  movie_lists: [],
  loading: false,
  selectedMovie: null,
  notification: "",
  loggedIn: localStorage.getItem("w2w-loggedIn") || false,
  user: localStorage.getItem("w2w-user")
    ? JSON.parse(localStorage.getItem("w2w-user"))
    : null
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
          movies: moviesListDataParser(payload.data.Search)
        }),
        failure: prevState => ({
          ...prevState,
          loading: false,
          movies: []
        })
      });
    case types.FETCH_LIST_MOVIES:
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
          movies: moviesListDataParser(payload.data)
        }),
        failure: prevState => ({
          ...prevState,
          loading: false,
          movies: []
        })
      });
    case types.FETCH_USER_MOVIE_LISTS:
      return handle(state, action, {
        start: prevState => ({
          ...prevState,
          movie_lists: []
        }),
        success: prevState => ({
          ...prevState,
          movie_lists: payload.data
        }),
        failure: prevState => ({
          ...prevState,
          movie_lists: []
        })
      });
    case types.FIND_BY_IMDB:
      return handle(state, action, {
        start: prevState => ({
          ...prevState,
          loading: true,
          selectedMovie: null
        }),
        success: prevState => ({
          ...prevState,
          loading: false,
          selectedMovie: movieDataParser(payload.data)
        }),
        failure: prevState => ({
          ...prevState,
          loading: false,
          movies: null
        })
      });
    case types.LOGIN:
      return handle(state, action, {
        start: prevState => ({
          ...prevState,
          loading: true,
          loggedIn: false,
          user: null
        }),
        success: prevState => {
          localStorage.setItem("w2w-user", JSON.stringify(payload.data));
          localStorage.setItem("w2w-loggedIn", true);
          return {
            ...prevState,
            loading: false,
            loggedIn: true,
            user: payload.data
          };
        },
        failure: prevState => ({
          ...prevState,
          loading: false,
          loggedIn: false,
          user: null
        })
      });
    case types.SET_SEARCH_DATA:
      return { ...state, ...payload };
    case types.ADD_MOVIE_TO_LIST:
      return state;
    case types.SAVE_LIST:
      return state;
    default:
      return state;
  }
};
