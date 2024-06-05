import React, { useState } from "react";
import Select from "react-select";

const MultiSelect = ({ questions, onFilterChange }) => {
  const [selectedDifOptions, setSelectedDifOptions] = useState([]);
  const [selectedTagOptions, setSelectedTagOptions] = useState([]);

  // Define the options for the dropdown
  const difficultyOptions = [
    { value: "easy", label: "קל" },
    { value: "medium", label: "בינוני" },
    { value: "hard", label: "קשה" },
  ];

  const tagsOptions = [
    { value: "oop", label: "מונחה עצמים" },
    { value: "string", label: "מחרוזות" },
    { value: "array", label: "מערך" },
    { value: "numbers", label: "מספרים" },
  ];

  const handleFilterChange = (selectedDifOptions, selectedTagOptions) => {
    const selectedDifficulties = selectedDifOptions ? selectedDifOptions.map(option => option.value) : [];
    const selectedTags = selectedTagOptions ? selectedTagOptions.map(option => option.value) : [];

    const filtered = questions.filter(question => {
      const matchesDifficulty = selectedDifficulties.length === 0 || selectedDifficulties.includes(question.difficulty);
      const matchesTags = selectedTags.length === 0 || selectedTags.some(tag => question.tags.includes(tag));

      return matchesDifficulty && matchesTags;
    });

    onFilterChange(filtered);
  };

  const handleChangeDif = (selectedDifOptions) => {
    setSelectedDifOptions(selectedDifOptions);
    handleFilterChange(selectedDifOptions, selectedTagOptions)
  };
  const handleChangeTag = (selectedTagOptions) => {
    setSelectedTagOptions(selectedTagOptions);
    handleFilterChange(selectedDifOptions, selectedTagOptions)
  };

  return (
    <div className="d-flex">
      <div style={{ marginLeft: "20px" }}>
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
      </div>
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
