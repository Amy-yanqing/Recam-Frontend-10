import React from "react";

const SearchBar = React.memo(function SearchBar({ value, onChange }) {
  console.log("SearchBar rendered");

  return (
    <div className="relative w-full max-w-md">
      <input
        type="text"
        placeholder="Search from listing case"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full border border-gray-300 rounded-full py-2 pl-10 pr-4 
                text-gray-600 focus:ring-2 focus:ring-blue-400 focus:outline-none"
      />
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-5 h-5 text-gray-400 absolute left-3 top-2.5"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
        />
      </svg>
    </div>
  );
});

export default SearchBar;
