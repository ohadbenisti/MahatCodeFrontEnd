import React, { useState } from "react";
import axios from "axios";
import './AddQuestion.css';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import SendIcon from '@mui/icons-material/Send';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

function AddQuestion({}) {
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
  const [showAlert , setShowAlert] = useState(false);

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setTestInput('');
    setTestYear('');
    setTestSeason('');
    setTestSeasonNum('');
    setPartOfTheTest('');
    setNumberOfQuestion('');
    setTestOutput('');
    setSolution('');
    setSolutionSource('');
    setDifficulty('easy');
    setTags([]);
  };

  const handleTagChange = (e) => {
    const value = e.target.value;
    setTags(prevTags =>
      prevTags.includes(value)
        ? prevTags.filter(tag => tag !== value)
        : [...prevTags, value]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = `${import.meta.env.VITE_SERVER}/admin/problem`;
      console.log("Sending request to:", url);

      const response = await axios.post(url, {
        title,
        description,
        "questionSource": {
          "testYear": testYear,
          "testSeason": testSeason,
          "testSeasonNum": testSeasonNum,
          "partOfTheTest": partOfTheTest,
          "numberOfQuestion": numberOfQuestion
        },
        test: { input: testInput, output: testOutput },
        difficulty,
        tags,
        solution,
        solutionSource
      }, {
        withCredentials: true,
      });

      if (response.data.status === "success") {
        setShowAlert(true);
        setTimeout(() => {
          setShowAlert(false);
          resetForm();
        }, 3000);
      }
    } catch (err) {
      console.error("Error adding data", err);
      setError("An error occurred during adding the question");
    }
  };

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
      <div className="add-question-container max-w-2xl mx-auto p-4 bg-white shadow-md rounded-lg">
        <h2 className="text-2xl font-bold mb-4">טופס הוספת שאלה</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">כותרת</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">תיאור</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div className="mb-4">
            <div className="block text-sm font-medium text-gray-700">מקור השאלה:</div>
            <div className="mt-2 space-y-2">
              <div className="flex items-center space-x-4">
                <label htmlFor="year" className="block text-sm font-medium text-gray-700">שנה</label>
                <select
                  name="Year"
                  id="testYearSelect"
                  onChange={(e) => setTestYear(e.target.value)}
                  value={testYear}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                >
                  <option value=""></option>
                  <option value="2020 (תש''פ)">2020</option>
                  <option value="2021 (תשפ''א)">2021</option>
                  <option value="2022 (תשפ''ב)">2022</option>
                  <option value="2023 (תשפ''ג)">2023</option>
                  <option value="2024 (תשפ''ד)">2024</option>
                  <option value="2025 (תשפ''ה)">2025</option>
                </select>

                <label htmlFor="season" className="block text-sm font-medium text-gray-700">עונה</label>
                <select
                  name="Season"
                  id="seasonSelect"
                  onChange={(e) => setTestSeason(e.target.value)}
                  value={testSeason}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                >
                  <option value=""></option>
                  <option value="אביב">אביב</option>
                  <option value="קיץ">קיץ</option>
                </select>

                <label htmlFor="seasonNum" className="block text-sm font-medium text-gray-700">מועד</label>
                <select
                  name="SeasonNum"
                  id="seasonNumSelect"
                  onChange={(e) => setTestSeasonNum(e.target.value)}
                  value={testSeasonNum}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                >
                  <option value=""></option>
                  <option value="א">א</option>
                  <option value="ב">ב</option>
                </select>
              </div>

              <div className="flex items-center space-x-4 mt-2">
                <label htmlFor="partOfTheTest" className="block text-sm font-medium text-gray-700">חלק</label>
                <select
                  name="partOfTheTest"
                  id="partOfTheTest"
                  onChange={(e) => setPartOfTheTest(e.target.value)}
                  value={partOfTheTest}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                >
                  <option value=""></option>
                  <option value="א">א</option>
                  <option                  value="ב">ב</option>
                  <option value="ג">ג</option>
                </select>

                <label htmlFor="numberOfQuestion" className="block text-sm font-medium text-gray-700">מספר שאלה</label>
                <select
                  name="numberOfQuestion"
                  id="numberOfQuestion"
                  onChange={(e) => setNumberOfQuestion(e.target.value)}
                  value={numberOfQuestion}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                >
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
            </div>
          </div>

          <div className="mb-4">
            <label htmlFor="testInput" className="block text-sm font-medium text-gray-700">טסט קלט</label>
            <input
              type="text"
              id="testInput"
              value={testInput}
              onChange={(e) => setTestInput(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="testOutput" className="block text-sm font-medium text-gray-700">טסט פלט</label>
            <input
              type="text"
              id="testOutput"
              value={testOutput}
              onChange={(e) => setTestOutput(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="solution" className="block text-sm font-medium text-gray-700">פתרון</label>
            <textarea
              id="solution"
              value={solution}
              onChange={(e) => setSolution(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="solutionSource" className="block text-sm font-medium text-gray-700">מקור הפתרון</label>
            <input
              type="text"
              id="solutionSource"
              value={solutionSource}
              onChange={(e) => setSolutionSource(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">רמת קושי</label>
            <div className="radio-container mt-2 space-y-2">
              <div className="inline-flex items-center">
                <input
                  type="radio"
                  id="easy"
                  name="difficulty"
                  value="easy"
                  checked={difficulty === 'easy'}
                  onChange={(e) => setDifficulty(e.target.value)}
                  className="h-4 w-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"
                />
                <label htmlFor="easy" className="ml-3 block text-sm font-medium text-gray-700">קל</label>
              </div>
              <div className="inline-flex items-center">
                <input
                  type="radio"
                  id="medium"
                  name="difficulty"
                  value="medium"
                  checked={difficulty === 'medium'}
                  onChange={(e) => setDifficulty(e.target.value)}
                  className="h-4 w-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"
                />
                <label htmlFor="medium" className="ml-3 block text-sm font-medium text-gray-700">בינוני</label>
              </div>
              <div className="inline-flex items-center">
                <input
                  type="radio"
                  id="hard"
                  name="difficulty"
                  value="hard"
                  checked={difficulty === 'hard'}
                  onChange={(e) => setDifficulty(e.target.value)}
                  className="h-4 w-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"
                />
                <label htmlFor="hard" className="ml-3 block text-sm font-medium text-gray-700">קשה</label>
              </div>
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">תגיות:</label>
            <div className="checkbox-container mt-2 space-y-2">
              {tagOptions.map(tag => (
                <div key={tag.id} className="inline-flex items-center">
                  <input
                    type="checkbox"
                    id={tag.id}
                    value={tag.id}
                    checked={tags.includes(tag.id)}
                    onChange={handleTagChange}
                    className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                  />
                  <label htmlFor={tag.id} className="ml-3 block text-sm font-medium text-gray-700">{tag.label}</label>
                </div>
              ))}
            </div>
          </div>

          <Stack direction="column" spacing={2}>
            <Button
              type="submit"
              variant="contained"
              endIcon={<SendIcon />}
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded"
            >
              הוספת שאלה
            </Button>
          </Stack>
          {showAlert && <Alert severity="success">השאלה הוספה בהצלחה!</Alert>}
          {error && <p className="text-red-500 text-sm">{error}</p>}
        </form>
      </div>
      <Snackbar
        open={showAlert}
        autoHideDuration={3000}
        onClose={() => setShowAlert(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert severity="success" onClose={() => setShowAlert(false)}>
          השאלה הוספה בהצלחה!
        </Alert>
      </Snackbar>
    </>
  );
}

export default AddQuestion;

