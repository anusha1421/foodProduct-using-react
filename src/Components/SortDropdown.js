import React from "react";

const SortDropdown = ({ onSort }) => {
  const handleChange = (event) => {
    if (onSort) {
      onSort(event.target.value);
    } else {
      console.error("onSort is not a function");
    }
  };

  return (
    <select onChange={handleChange}>
      <option value="name-asc">Name: A-Z</option>
      <option value="name-desc">Name: Z-A</option>
      <option value="grade-asc">Nutrition Grade: A-E</option>
      <option value="grade-desc">Nutrition Grade: E-A</option>
    </select>
  );
};

export default SortDropdown;
