import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import './AddQuestion.css';

function AddQuestion() {
  // State variables to hold form data
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [testInput, setTestInput] = useState('');

  const [testYear, setTestYear] = useState('');
  const [testSeason, setTestSeason] = useState('');
  const [testSeasonNum, setTestSeasonNum] = useState('');
  const [partOfTheTest, setPartOfTheTest] = useState('');
  const [numberOfQuestion, setNumberOfQuestion] = useState('');


  const [testOutput, setTestOutput] = useState('');
  const [solution, setSolution] = useState('');

  const [solutionSource, setSolutionSource] = useState('');

  const [difficulty, setDifficulty] = useState('easy');
  const [tags, setTags] = useState([]);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false); // State to manage form visibility
  const navigate = useNavigate();

  // Handle changes in tag selection
  const handleTagChange = (e) => {
    const value = e.target.value;
    setTags(prevTags =>
      prevTags.includes(value)
        ? prevTags.filter(tag => tag !== value) // Remove tag if already selected
        : [...prevTags, value] // Add tag if not selected
    );
  };
  const handleToggleForm = () => {
    setShowForm(prevShowForum => !prevShowForum)
  }

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = `${import.meta.env.VITE_SERVER}/admin/problem`; // Server URL
      console.log("Sending request to:", url);

      const response = await axios.post(url, {
        title,
        description,
        "questionSource": {
          "testYear": testYear,
          "testSeason": testSeason,
          "testSeasonNum": testSeasonNum,
          "partOfTheTest":partOfTheTest,
          "numberOfQuestion":numberOfQuestion
        },
        test: { input: testInput, output: testOutput }, // Send test input and output as an object
        difficulty,
        tags,
        solution,
        solutionSource
      }, { withCredentials: true });
      console.log("added successfully", response.data);

      navigate("/admin"); // Redirect to admin page after successful submission
    } catch (err) {
      console.error("Error adding data", err);
      setError("An error occurred during adding the question"); // Set error message
    }
  };

  // Tag options for the checkbox inputs
  const tagOptions = [
    { id: "string", label: "מחרוזת" },
    { id: "class", label: "מחלקה" },
    { id: "array", label: "מערך" },
    { id: "complexity", label: "סיבוכיות" },
    { id: "recursion", label: "רקורסיה" },
    { id: "table-tracking", label: "טבלת מעקב" },
    { id: "decoding", label: "פיענוח קוד" },

  ];

  return (
    <>
      <button
        id="but"
        type="button"
        className="btn btn-primary m-3 w-5"
        onClick={handleToggleForm}
      >
        הוספת שאלה
      </button>
      {showForm && (
        <div className="add-question-container">
          <h2 className="add-question-title">טופס הוספת שאלה</h2>
          <form onSubmit={handleSubmit}>
            <div className="add-question-form-group">
              <label htmlFor="title">כותרת</label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required // Title is required
              />
            </div>
            <div className="add-question-form-group">
              <label htmlFor="description">תיאור</label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required // Description is required
              />
            </div>
            <div>
              <div>מקור השאלה:</div>
              <label htmlFor="year" className="add-question-form-group mx-1 pt-2">שנה </label>
              <select name="Year" id="testYearSelect"
                onChange={(e) => setTestYear(e.target.value)} >
                <option value=""></option>
                <option value="2020 (תש''פ)">2020</option>
                <option value="2021 (תשפ''א)">2021</option>
                <option value="2022 (תשפ''ב)">2022</option>
                <option value="2023 (תשפ''ג)">2023</option>
                <option value="2024 (תשפ''ד)">2024</option>
                <option value="2025 (תשפ''ה)">2025</option>
              </select>

              <label htmlFor="season" className="add-question-form-group mx-1">עונה </label>
              <select name="Season" id="seasonSelect"
                onChange={(e) => setTestSeason(e.target.value)} >
                <option value=""></option>
                <option value="אביב">אביב</option>
                <option value="קיץ">קיץ</option>
              </select>

              <label htmlFor="seasonNum" className="add-question-form-group mx-1">מועד </label>
              <select name="SeasonNum" id="seasonNumSelect"
                onChange={(e) => setTestSeasonNum(e.target.value)} >
                <option value=""></option>
                <option value="א">א</option>
                <option value="ב">ב</option>
              </select>
              <br />
              <label htmlFor="partOfTheTest" className="add-question-form-group mx-1 pt-3">חלק </label>
              <select name="partOfTheTest" id="partOfTheTest"
                onChange={(e) => setPartOfTheTest(e.target.value)} >
                <option value=""></option>
                <option value="א">א</option>
                <option value="ב">ב</option>
                <option value="ג">ג</option>
              </select>

              <label htmlFor="numberOfQuestion" className= "add-question-form-group mx-2">מספר שאלה </label>
              <select name="numberOfQuestion" id="numberOfQuestion"
                onChange={(e) => setNumberOfQuestion(e.target.value)} >
                <option value=""></option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
                <option value="11">11</option>
                <option value="12">12</option>
                <option value="13">13</option>
                <option value="14">14</option>
                <option value="15">15</option>
              </select>


            </div>
            <div className="add-question-form-group pt-3">
              <label htmlFor="testInput">טסט קלט</label>
              <input
                type="text"
                id="testInput"
                value={testInput}
                onChange={(e) => setTestInput(e.target.value)}
                required // Test input is required
              />
            </div>
            <div className="add-question-form-group">
              <label htmlFor="testOutput">טסט פלט</label>
              <input
                type="text"
                id="testOutput"
                value={testOutput}
                onChange={(e) => setTestOutput(e.target.value)}
                required // Test output is required
              />
            </div>
            <div className="add-question-form-group">
              <label htmlFor="solution">פתרון</label>
              <textarea
                id="solution"
                value={solution}
                onChange={(e) => setSolution(e.target.value)}
                required // Solution is required
              />
            </div>

            <div className="add-question-form-group"> 
              <label htmlFor="solutionSource">מקור הפתרון</label>
              <input
                type="text"
                id="solutionSource"
                value={solutionSource}
                onChange={(e) => setSolutionSource(e.target.value)}
              />
            </div>

            <div className="add-question-form-group">
              <label>רמת קושי</label>
              <div className="radio-container">
                <div className="inline">
                  <input
                    type="radio"
                    id="easy"
                    name="difficulty"
                    value="easy"
                    checked={difficulty === 'easy'}
                    onChange={(e) => setDifficulty(e.target.value)}
                  />
                  <label htmlFor="easy">קל</label>
                </div>
                <div className="inline">
                  <input
                    type="radio"
                    id="medium"
                    name="difficulty"
                    value="medium"
                    checked={difficulty === 'medium'}
                    onChange={(e) => setDifficulty(e.target.value)}
                  />
                  <label htmlFor="medium">בינוני</label>
                </div>
                <div className="inline">
                  <input
                    type="radio"
                    id="hard"
                    name="difficulty"
                    value="hard"
                    checked={difficulty === 'hard'}
                    onChange={(e) => setDifficulty(e.target.value)}
                  />
                  <label htmlFor="hard">קשה</label>
                </div>
              </div>
            </div>
            <div className="add-question-form-group">
              <label>תגיות:</label>
              <div className="checkbox-container">
                {tagOptions.map(tag => (
                  <div key={tag.id} className="inline">
                    <input
                      type="checkbox"
                      id={tag.id}
                      value={tag.id}
                      checked={tags.includes(tag.id)}
                      onChange={handleTagChange} // Handle tag selection
                    />
                    <label htmlFor={tag.id}>{tag.label}</label>
                  </div>
                ))}
              </div>
            </div>
            <button className="add-question-submit-btn" type="submit">הוספת שאלה</button>
            {error && <p className="add-question-error">{error}</p>} {/* Display error message if any */}
          </form>
        </div>
      )}
    </>
  );
}

export default AddQuestion;
