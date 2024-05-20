import React from "react";
import MultiSelect from "./MultiSelect";

const Filter = ({ setFilter }) => {
  const filterArray = [];
  const handleFilterChange = (event) => {
    filterArray.push(event.target.value);
    setFilter(filterArray);
  };
  return (
    <>
      <MultiSelect />
    </>
  );
};
export default Filter;
