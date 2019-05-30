import React from "react";
import PropTypes from "prop-types";
import Image from "../../Image";

require("./styles.scss");
const MovieCard = ({ onItemClick, movie }) => {
  return (
    <div className="col movie-card-wrapper">
      <div
        className="movie-card"
        onClick={() => {
          onItemClick(movie);
        }}
      >
        <Image src={movie.poster_url} width="250" height="300" />
        <div className="movie-title">
          <span>{movie.title}</span>
        </div>
      </div>
    </div>
  );
};

MovieCard.propTypes = {
  onItemClick: PropTypes.func.isRequired,
  movie: PropTypes.shape({
    title: PropTypes.string.isRequired
  }).isRequired
};

export default MovieCard;
