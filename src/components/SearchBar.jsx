import React from "react";

const SearchBar = ({ onSearch }) => {
  const handleSearch = (e) => {
    onSearch(e.target.value);
  };

  return (
    <input
      type="text"
      placeholder="Search for a movie..."
      onChange={handleSearch}
      className="search-bar"
    />
  );
};

export default SearchBar;
