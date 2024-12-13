import React, { useState } from "react";
import "../styles/SearchBar.css";

const SearchBar = ({ placeholder, onSearch }) => {
  const [query, setQuery] = useState("");

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (onSearch) onSearch(query);
  };

  return (
    <form className="search-bar" onSubmit={handleSearch} style={{ margin: 10 }}>
      <input
        type="text"
        className="search-input"
        placeholder={placeholder || "Search..."}
        value={query}
        onChange={handleInputChange}
      />
      <button type="submit" className="search-button">
        🔍
      </button>
    </form>
  );
};

export default SearchBar;
