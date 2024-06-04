import React, { useState, useEffect } from "react";
import MultiSelect from "./MultiSelect";
import QuestionTable from "./QuestionTable";
import axios from "axios";

const FilteredQuestions = () => {
  const [questions, setQuestions] = useState([]);
  const [filteredQuestions, setFilteredQuestions] = useState([]);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_SERVER}/problem`);
        setQuestions(response.data.questions);
        console.log(response);
        setFilteredQuestions(response.data.questions); // הגדרה ראשונית של כל השאלות
      } catch (error) {
        console.error("שגיאה בהבאת השאלות:", error);
      }
    };

    fetchQuestions();
  }, []);

 

  return (
    <div>
      <MultiSelect questions={questions} onFilterChange={setFilteredQuestions} />
      <QuestionTable questions={filteredQuestions} />
    </div>
  );
};

export default FilteredQuestions;
