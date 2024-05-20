import React, { useState } from "react";
import Select from "react-select";

const MultiSelect = () => {
  const [selectedDifOptions, setSelectedDifOptions] = useState([]);
  const [selectedTagOptions, setSelectedTagOptions] = useState([]);

  // Define the options for the dropdown
  const difficultyOptions = [
    { value: "easy", label: "Easy" },
    { value: "medium", label: "Medium" },
    { value: "hard", label: "Hard" },
  ];

  const tagsOptions = [
    { value: "oop", label: "oop" },
    { value: "string", label: "string" },
    { value: "array", label: "array" },
    { value: "numbers", label: "numbers" },
  ];

  const handleChangeDif = (selectedDifOptions) => {
    setSelectedDifOptions(selectedDifOptions);
  };
  const handleChangeTag = (selectedTagOptions) => {
    setSelectedTagOptions(selectedTagOptions);
  };

  return (
    <div className="d-flex">
      <Select
        isMulti
        name="difficulties"
        options={difficultyOptions}
        className="basic-multi-select"
        classNamePrefix="select"
        onChange={handleChangeDif}
        value={selectedDifOptions}
        placeholder="רמת קושי"
      />
      <Select
        isMulti
        name="tags"
        options={tagsOptions}
        className="basic-multi-select"
        classNamePrefix="select"
        onChange={handleChangeTag}
        value={selectedTagOptions}
        placeholder="תגיות"
      />
    </div>
  );
};

export default MultiSelect;
