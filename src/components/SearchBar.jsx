import React, { useState } from "react";

function SearchBar({ onSearch }) {
  const [search, setSearch] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(search);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex gap-2 w-full max-w-md mx-auto"
    >
      <input
        type="text"
        placeholder="Search location..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="flex-1 border rounded-lg px-4 py-2 outline-none"
      />
      <button className="bg-blue-600 text-white px-4 py-2 rounded-lg">
        Search
      </button>
    </form>
  );
}

export default SearchBar;