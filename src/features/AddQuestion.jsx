import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import './AddQuestion.css';

function AddQuestion({ showForm }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [testInput, setTestInput] = useState('');
  const [testOutput, setTestOutput] = useState('');
  const [solution, setSolution] = useState('');
  const [difficulty, setDifficulty] = useState('easy');
  const [tags, setTags] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleTagChange = (e) => {
    const value = e.target.value;
    setTags(prevTags =>
      prevTags.includes(value)
        ? prevTags.filter(tag => tag !== value) // Remove tag if already selected
        : [...prevTags, value] // Add tag if not selected
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = `${import.meta.env.VITE_SERVER}/admin/problem`; // Server URL
      console.log("Sending request to:", url);

      const response = await axios.post(url, {
        title,
        description,
        test: { input: testInput, output: testOutput }, // Send test input and output as an object
        difficulty,
        tags,
        solution
      });
      console.log("added successfully", response.data);

      navigate("/AdminPage"); // Redirect to admin page after successful submission
    } catch (err) {
      console.error("Error adding data", err);
      setError("An error occurred during adding the question"); // Set error message
    }
  };

  const tagOptions = [
    { id: "string", label: "מחרוזת" },
    { id: "array", label: "מערך" },
    { id: "oop", label: "OOP" },
    { id: "complexity", label: "סיבוכיות" },
    { id: "recursion", label: "רקורסיה" },
    { id: "table-tracking", label: "טבלת מעקב" },
  ];

  if (!showForm) {
    return null;
  }

  return (
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
            required
          />
        </div>
        <div className="add-question-form-group">
          <label htmlFor="description">תיאור</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div className="add-question-form-group">
          <label htmlFor="testInput">טסט קלט</label>
          <input
            type="text"
            id="testInput"
            value={testInput}
            onChange={(e) => setTestInput(e.target.value)}
            required
          />
        </div>
        <div className="add-question-form-group">
          <label htmlFor="testOutput">טסט פלט</label>
          <input
            type="text"
            id="testOutput"
            value={testOutput}
            onChange={(e) => setTestOutput(e.target.value)}
            required
          />
        </div>
        <div className="add-question-form-group">
          <label htmlFor="solution">פתרון</label>
          <textarea
            id="solution"
            value={solution}
            onChange={(e) => setSolution(e.target.value)}
            required
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
                  onChange={handleTagChange}
                />
                <label htmlFor={tag.id}>{tag.label}</label>
              </div>
            ))}
          </div>
        </div>
        <button className="add-question-submit-btn" type="submit">הוספת שאלה</button>
        {error && <p className="add-question-error">{error}</p>}
      </form>
    </div>
  );
}

export default AddQuestion;
