import React, { useState, useEffect } from "react";
import MultiSelect from "./MultiSelect";
import QuestionTable from "./QuestionTable";
import SearchBar from "./SearchQuestion";
import axios from "axios";

const FilteredQuestions = () => {
  const [questions, setQuestions] = useState([]);
  const [filteredByMultiSelect, setFilteredByMultiSelect] = useState([]);
  const [finalFilteredQuestions, setFinalFilteredQuestions] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_SERVER}/problem`);
        setQuestions(response.data.questions);
        setFilteredByMultiSelect(response.data.questions); // Initialize with all questions
        setFinalFilteredQuestions(response.data.questions); // Initialize final filtered questions
      } catch (error) {
        console.error("שגיאה בהבאת השאלות:", error);
      }
    };

    fetchQuestions();
  }, []);

  useEffect(() => {
    const filterQuestions = () => {
      const filtered = filteredByMultiSelect.filter((question) =>
        question.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        question.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFinalFilteredQuestions(filtered);
    };

    filterQuestions();
  }, [searchQuery, filteredByMultiSelect]);

  return (
      <>
      <div style={{display: 'flex', gap: '30px'}}>
      <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <MultiSelect questions={questions} onFilterChange={setFilteredByMultiSelect} />
      </div>
      <div>
      <QuestionTable questions={finalFilteredQuestions} />
      </div>
      </>
  );
};

export default FilteredQuestions;