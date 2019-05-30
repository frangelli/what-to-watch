export const moviesListDataParser = moviesList => {
  if (!moviesList || moviesList.length === 0) {
    return [];
  }
  return moviesList.map(m => {
    return {
      title: m.Title || m.title,
      imdb_id: m.imdbID || m.imdb_id,
      poster_url: m.Poster || m.poster_url
    };
  });
};

export const movieDataParser = m => {
  if (!m) {
    throw new Error("Invalid movie object to parse.");
  }

  return {
    title: m.Title,
    year: m.Year,
    imdb_id: m.imdbID,
    poster_url: m.Poster,
    released: m.Released,
    runtime: m.Runtime,
    genre: m.Genre,
    director: m.Director,
    writer: m.Writer,
    actors: m.Actors,
    plot: m.Plot,
    language: m.Language,
    country: m.Country,
    awards: m.Awards,
    imdb_rating: m.imdbRating,
    production: m.Production
  };
};
