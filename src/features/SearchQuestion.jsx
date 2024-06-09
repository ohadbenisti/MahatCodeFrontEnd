// SearchBar.js
import React from 'react';

const SearchBar = ({ searchQuery, setSearchQuery }) => {
  return (
    <input
      type="text"
      placeholder="חפש שאלה..."
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
      className="form-control mb-3"
    />
  );
};

export default SearchBar;
