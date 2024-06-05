import React, { useState } from "react";
import CoursesComponent from "../../features/Courses";
import QuestionTable from "../../features/QuestionTable";
import FilteredQuestions from "../../features/FilteredQuestions";
import useLogin from "../../hooks/useLogin";
import TypeEffect from "./TypeEffect";
import "./Content.css"; // ייבוא של קובץ ה-CSS

const Content = () => {
  const [filter, setFilter] = useState("");
  const userInfo = useLogin();

  return (
    <div className="content-body">
      <div className="container">
        <TypeEffect />
        <h2 style={{ fontFamily: 'Roboto, sans-serif', fontSize: '30px', fontWeight: '700', color: '#333' }}>קורסים</h2>
        <CoursesComponent />
        <h2>שאלות</h2>
        <div className="my-4">
          <FilteredQuestions setFilter={setFilter} />
        </div>
      </div>
    </div>
  );
};

export default Content;
