import React from "react";

const Filter = ({ genres, onFilterChange }) => {
  const handleGenreChange = (e) => {
    onFilterChange(e.target.value, null);
  };

  const handleRatingChange = (e) => {
    onFilterChange(e.target.value, null);
  };

  return (
    <div className="filter-container">
      <select onChange={handleGenreChange}>
        <option value="">All Genres</option>
        {genres.map((genre) => (
          <option key={genre.id} value={genre.id}>
            {genre.name}
          </option>
        ))}
      </select>
      <select onChange={handleRatingChange}>
        <option value="">All Ratings</option>
        <option value="9">9+</option>
        <option value="8">8+</option>
        <option value="7">7+</option>
        <option value="6">6+</option>
      </select>
    </div>
  );
};

export default Filter;
