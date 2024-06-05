import React, { useState } from "react";
import axios from "axios";
import './EditQuestion.css';
import { useParams } from "react-router-dom";


const EditQuestion = ({ question, onClose, onSave }) => {
    const { questionId } = useParams()
    const [title, setTitle] = useState(question.title);
    const [description, setDescription] = useState(question.description);
    const [testInput, setTestInput] = useState(question.test.input);
    const [testYear, setTestYear] = useState(
        question.questionSource && question.questionSource.testYear
            ? question.questionSource.testYear
            : ''
    );
    const [testSeason, setTestSeason] = useState(
        question.questionSource && question.questionSource.testSeason
            ? question.questionSource.testSeason
            : ''
    );
    // const [testSeason, setTestSeason] = useState(question.questionSource.testSeason ? 
    //     question.questionSource.testSeason &&
    //      console.log(question.questionSource.testSeason) 
    //      : "" && console.log("nooo"));

    const [testSeasonNum, setTestSeasonNum] = useState(
        question.questionSource && question.questionSource.testSeasonNum
            ? question.questionSource.testSeasonNum
            : ''
    );
    const [partOfTheTest, setPartOfTheTest] = useState(
        question.questionSource && question.questionSource.partOfTheTest
            ? question.questionSource.partOfTheTest
            : ''
    );
    const [numberOfQuestion, setNumberOfQuestion] = useState(
        question.questionSource && question.questionSource.numberOfQuestion
            ? question.questionSource.numberOfQuestion
            : ''
    );
    const [testOutput, setTestOutput] = useState(question.test.output);
    const [solution, setSolution] = useState(question.solution);
    const [solutionSource, setSolutionSource] = useState(
        question.solutionSource ? question.solutionSource : ''
    );
    const [difficulty, setDifficulty] = useState(question.difficulty);
    const [tags, setTags] = useState(question.tags);
    const [error, setError] = useState('');

    // Handle changes in tag selection
    const handleTagChange = (e) => {
        const value = e.target.value;
        setTags(prevTags =>
            prevTags.includes(value)
                ? prevTags.filter(tag => tag !== value) // Remove tag if already selected
                : [...prevTags, value] // Add tag if not selected
        );
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const url = `${import.meta.env.VITE_SERVER}/admin/problem/${questionId}`; // Server URL
            console.log("Sending request to:", url);

            const questionSource =
            {
                "testYear": testYear,
                "testSeason": testSeason,
                "testSeasonNum": testSeasonNum,
                "partOfTheTest": partOfTheTest,
                "numberOfQuestion": numberOfQuestion
            }

            const response = await axios.put(url, {
                questionId,
                title,
                description,
                questionSource,
                // {"testYear": testYear,
                // "testSeason": testSeason,
                // "testSeasonNum": testSeasonNum,
                // "partOfTheTest": partOfTheTest,
                // "numberOfQuestion": numberOfQuestion},

                test: { input: testInput, output: testOutput },
                difficulty,
                tags,
                solution,
                solutionSource
            },
                {
                    withCredentials: true,
                }
            );
            console.log(questionSource);
            console.log(response);
            if (response.data.message === "success") {
                console.log("Question updated successfully");
                onSave({
                    title,
                    description,
                    questionSource,
                    test: { input: testInput, output: testOutput },
                    difficulty,
                    tags,
                    solution,
                    solutionSource
                });
                onClose();
            } else {
                console.log("Response message is not as expected");
            }
        } catch (err) {
            console.error("Error updating data", err);
            setError("An error occurred during updating the question");
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
        <div className="edit-question-popup">
            <div className="popup">
                <button className="close-button" onClick={onClose}>X</button>
            </div>
            <div className="edit-question-inner">
                <h2>עריכת שאלה</h2>
                <form onSubmit={handleSubmit}>
                    <div className="edit-question-form-group">
                        <label htmlFor="title">כותרת</label>
                        <input
                            type="text"
                            id="title"
                            value={title ? title : ""}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                        />
                    </div>
                    <div className="edit-question-form-group">
                        <label htmlFor="description">תיאור</label>
                        <textarea
                            id="description"
                            value={description ? description : ""}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <div>מקור השאלה:</div>
                        <label htmlFor="year" className="edit-question-form-group mx-1 pt-2">שנה </label>
                        <select name="Year" id="testYearSelect"
                            onChange={(e) => setTestYear(e.target.value)} value={testYear ? testYear : ""}>
                            <option value=""></option>
                            <option value="2020 (תש''פ)">2020</option>
                            <option value="2021 (תשפ''א)">2021</option>
                            <option value="2022 (תשפ''ב)">2022</option>
                            <option value="2023 (תשפ''ג)">2023</option>
                            <option value="2024 (תשפ''ד)">2024</option>
                            <option value="2025 (תשפ''ה)">2025</option>
                        </select>

                        <label htmlFor="season" className="edit-question-form-group mx-1">עונה </label>
                        <select name="Season" id="seasonSelect"
                            onChange={(e) => setTestSeason(e.target.value)} value={testSeason ? testSeason : ""}>
                            <option value=""></option>
                            <option value="אביב">אביב</option>
                            <option value="קיץ">קיץ</option>
                        </select>

                        <label htmlFor="seasonNum" className="edit-question-form-group mx-1">מועד </label>
                        <select name="SeasonNum" id="seasonNumSelect"
                            onChange={(e) => setTestSeasonNum(e.target.value)} value={testSeasonNum ? testSeasonNum : ""}>
                            <option value=""></option>
                            <option value="א">א</option>
                            <option value="ב">ב</option>
                        </select>
                        <br />
                        <label htmlFor="partOfTheTest" className="edit-question-form-group mx-1 pt-3">חלק </label>
                        <select name="partOfTheTest" id="partOfTheTest"
                            onChange={(e) => setPartOfTheTest(e.target.value)} value={partOfTheTest ? partOfTheTest : ""}>
                            <option value=""></option>
                            <option value="א">א</option>
                            <option value="ב">ב</option>
                            <option value="ג">ג</option>
                        </select>

                        <label htmlFor="numberOfQuestion" className="edit-question-form-group mx-2">מספר שאלה </label>
                        <select name="numberOfQuestion" id="numberOfQuestion"
                            onChange={(e) => setNumberOfQuestion(e.target.value)} value={numberOfQuestion ? numberOfQuestion : ""}>
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
                    <div className="edit-question-form-group pt-3">
                        <label htmlFor="testInput">טסט קלט</label>
                        <input
                            type="text"
                            id="testInput"
                            value={testInput}
                            onChange={(e) => setTestInput(e.target.value)}
                            required
                        />
                    </div>
                    <div className="edit-question-form-group">
                        <label htmlFor="testOutput">טסט פלט</label>
                        <input
                            type="text"
                            id="testOutput"
                            value={testOutput ? testOutput : ""}
                            onChange={(e) => setTestOutput(e.target.value)}
                            required
                        />
                    </div>
                    <div className="edit-question-form-group">
                        <label htmlFor="solution">פתרון</label>
                        <textarea
                            id="solution"
                            value={solution ? solution : ""}
                            onChange={(e) => setSolution(e.target.value)}
                            required
                        />
                    </div>

                    <div className="edit-question-form-group">
                        <label htmlFor="solutionSource">מקור הפתרון</label>
                        <input
                            type="text"
                            id="solutionSource"
                            value={solutionSource ? solutionSource : ""}
                            onChange={(e) => setSolutionSource(e.target.value)}
                        />
                    </div>

                    <div className="edit-question-form-group">
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

                    <div className="edit-question-form-group">
                        <label>תגיות</label>
                        <div className="checkbox-container">
                            {tagOptions.map((option) => (
                                <div key={option.id} className="inline">
                                    <input
                                        type="checkbox"
                                        id={option.id}
                                        value={option.id}
                                        checked={tags.includes(option.id)}
                                        onChange={handleTagChange}
                                    />
                                    <label htmlFor={option.id}>{option.label}</label>
                                </div>
                            ))}
                        </div>
                    </div>

                    {error && <div className="error">{error}</div>}
                    <button type="submit" className="submit-button">שמור</button>
                    <button type="button" className="cancel-button" onClick={onClose}>בטל</button>
                </form>
            </div>
        </div>

    );
}

export default EditQuestion;
