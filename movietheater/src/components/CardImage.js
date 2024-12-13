import React, { useState } from "react";
import "../styles/MovieCard.css";
import MoviePopup from "./MoviePopup";

const MovieCard = ({ poster, title, genre, description, rating }) => {
  const [isPopupVisible, setPopupVisible] = useState(false);

  const movie = {
    poster,
    title,
    genre,
    description,
    rating
  }
  const handleOpenPopup = () => setPopupVisible(true);
  const handleClosePopup = () => setPopupVisible(false);

  return (
    <>
      <div className="col-5 col-md-4 col-lg-3 movie-card my-4">
        <img src={poster} alt={`${title} Poster`} />
        <div className="movie-info">
          <h3>{title}</h3>
          <p>Genre: {genre}</p>
          <div className="rating">
            <span>&#9733;</span>
            <span>{rating}</span>
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "center", padding: "10px" }}>
          <button className="btn-details" onClick={handleOpenPopup} style={{ padding: "10px 20px" }}>
            View Details
          </button>
        </div>
      </div>
      <MoviePopup
        movie={movie}
        isVisible={isPopupVisible}
        onClose={handleClosePopup}
      />
    </>
  );
};

export default MovieCard;
