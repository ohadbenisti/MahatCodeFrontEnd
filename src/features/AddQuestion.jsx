import React, { useState } from "react";
import axios from "axios";
import './AddQuestion.css';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import SendIcon from '@mui/icons-material/Send';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

function AddQuestion() {
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
  const [showAlert, setShowAlert] = useState(false);

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
          "numberOfQuestion": parseInt(numberOfQuestion) // המרת השדה למספר
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
                </select>
              </div>
              <div className="flex items-center space-x-4">
                <label htmlFor="season" className="block text-sm font-medium text-gray-700">מועד</label>
                <select
                  name="Season"
                  id="testSeasonSelect"
                  onChange={(e) => setTestSeason(e.target.value)}
                  value={testSeason}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                >
                  <option value=""></option>
                  <option value="קיץ">קיץ</option>
                  <option value="אביב">אביב</option>
                </select>
              </div>
              <div className="flex items-center space-x-4">
                <label htmlFor="seasonNum" className="block text-sm font-medium text-gray-700">מספר מועד</label>
                <select
                  name="SeasonNum"
                  id="testSeasonNumSelect"
                  onChange={(e) => setTestSeasonNum(e.target.value)}
                  value={testSeasonNum}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                >
                  <option value=""></option>
                  <option value="א">א</option>
                  <option value="ב">ב</option>
                </select>
              </div>
              <div className="flex items-center space-x-4">
                <label htmlFor="partOfTheTest" className="block text-sm font-medium text-gray-700">חלק</label>
                <select
                  name="PartOfTheTest"
                  id="partOfTheTestSelect"
                  onChange={(e) => setPartOfTheTest(e.target.value)}
                  value={partOfTheTest}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                >
                  <option value=""></option>
                  <option value="א">א</option>
                  <option value="ב">ב</option>
                  <option value="ג">ג</option>
                </select>
              </div>
            </div>
          </div>
          <div className="mb-4">
            <label htmlFor="numberOfQuestion" className="block text-sm font-medium text-gray-700">מספר שאלה</label>
            <input
              type="number"
              id="numberOfQuestion"
              value={numberOfQuestion}
              onChange={(e) => setNumberOfQuestion(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="testInput" className="block text-sm font-medium text-gray-700">קלט לבדיקה</label>
            <textarea
              id="testInput"
              value={testInput}
              onChange={(e) => setTestInput(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="testOutput" className="block text-sm font-medium text-gray-700">פלט לבדיקה</label>
            <textarea
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
            <textarea
              id="solutionSource"
              value={solutionSource}
              onChange={(e) => setSolutionSource(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="difficulty" className="block text-sm font-medium text-gray-700">רמת קושי</label>
            <select
              name="difficulty"
              id="difficultySelect"
              onChange={(e) => setDifficulty(e.target.value)}
              value={difficulty}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              <option value="easy">קל</option>
              <option value="medium">בינוני</option>
              <option value="hard">קשה</option>
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="tags" className="block text-sm font-medium text-gray-700">תגים</label>
            <div className="mt-2 space-y-2">
              {tagOptions.map(tag => (
                <div key={tag.id} className="flex items-center">
                  <input
                    type="checkbox"
                    id={tag.id}
                    value={tag.id}
                    checked={tags.includes(tag.id)}
                    onChange={handleTagChange}
                    className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
                  />
                  <label htmlFor={tag.id} className="ml-2 block text-sm text-gray-900">{tag.label}</label>
                </div>
              ))}
            </div>
          </div>
          {error && <Alert severity="error">{error}</Alert>}
          <Stack direction="row" spacing={2}>
            <Button
              type="submit"
              variant="contained"
              endIcon={<SendIcon />}
            >
              שלח
            </Button>
          </Stack>
        </form>
        <Snackbar open={showAlert} autoHideDuration={3000} onClose={() => setShowAlert(false)}>
          <Alert onClose={() => setShowAlert(false)} severity="success">
            השאלה נוספה בהצלחה!
          </Alert>
        </Snackbar>
      </div>
    </>
  );
}

export default AddQuestion;
