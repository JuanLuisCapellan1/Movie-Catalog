import React from "react";
import "../styles/MoviePopup.css";

const MoviePopup = ({ movie, isVisible, onClose }) => {
  if (!isVisible) return null;

  return (
    <div className="popup-overlay">
      <div className="popup-container">
        <button className="popup-close-button" onClick={onClose}>
          ✖
        </button>
        <div className="popup-content">
          <img src={movie.poster} alt={`${movie.title} Poster`} />
          <div className="popup-details">
            <h2>{movie.title}</h2>
            <p><strong>Genre:</strong> {movie.genre}</p>
            <p><strong>Rating:</strong> {movie.rating}</p>
            <p><strong>Description:</strong> {movie.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MoviePopup;
