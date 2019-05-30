import axios from "axios";
import * as types from "../actionTypes";

export const search = searchTerm => {
  const req = axios.get(`http://localhost:3000/search/search?q=${searchTerm}`);
  return {
    type: types.SEARCH,
    promise: req
  };
};

export const findByImdb = imdbId => {
  const req = axios.get(
    `http://localhost:3000/search/find_by_imdb?imdb_id=${imdbId}`
  );
  return {
    type: types.FIND_BY_IMDB,
    promise: req
  };
};

export const fetchUserMovieLists = userId => {
  const req = axios.get(`http://localhost:3000/users/${userId}/movie_lists`);
  return {
    type: types.FETCH_USER_MOVIE_LISTS,
    promise: req
  };
};

export const fetchListMovies = (userId, listId) => {
  const req = axios.get(
    `http://localhost:3000/users/${userId}/movie_lists/${listId}/movies`
  );
  return {
    type: types.FETCH_LIST_MOVIES,
    promise: req
  };
};

export const login = (name, email) => {
  const req = axios.post("http://localhost:3000/users", { name, email });
  return {
    type: types.LOGIN,
    promise: req
  };
};

export const addMovieToList = (
  userId,
  listId,
  { title, imdb_id, poster_url }
) => {
  const req = axios.post(
    `http://localhost:3000/users/${userId}/movie_lists/${listId}/movies`,
    { title, imdb_id, poster_url }
  );
  return {
    type: types.ADD_MOVIE_TO_LIST,
    promise: req
  };
};

export const saveList = (userId, name) => {
  const req = axios.post(`http://localhost:3000/users/${userId}/movie_lists`, {
    name
  });
  return {
    type: types.SAVE_LIST,
    promise: req
  };
};

export const setSearchData = data => {
  return {
    type: types.SET_SEARCH_DATA,
    payload: data
  };
};
