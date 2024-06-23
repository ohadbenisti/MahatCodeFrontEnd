import React, { useState } from "react";
import axios from "axios";
import './AddQuestion.css';
import {
  Alert,
  Snackbar,
  Button,
  Card,
  CardContent,
  CardHeader,
  Grid,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Checkbox,
  FormControlLabel,
  Stack,
  Box,
  Typography,
  Divider,
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { styled } from '@mui/system';

const CustomButton = styled(Button)(({ theme }) => ({
  backgroundColor: '#1976d2',
  color: '#fff',
  '&:hover': {
    backgroundColor: '#1565c0',
  },
}));

const ModernCard = styled(Card)(({ theme }) => ({
  borderRadius: '12px',
  boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
}));

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
          "numberOfQuestion": parseInt(numberOfQuestion)
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
      <Box className="add-question-container">
        <ModernCard>
          <CardHeader
            title="טופס הוספת שאלה"
            titleTypographyProps={{ variant: 'h4', align: 'center', color: 'primary' }}
          />
          <CardContent>
            <form onSubmit={handleSubmit}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="כותרת"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="תיאור"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    multiline
                    required
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={6}>
                  <FormControl fullWidth variant="outlined">
                    <InputLabel>שנה</InputLabel>
                    <Select
                      value={testYear}
                      onChange={(e) => setTestYear(e.target.value)}
                      label="שנה"
                      required
                    >
                      <MenuItem value=""><em>None</em></MenuItem>
                      <MenuItem value="2020 (תש''פ)">2020</MenuItem>
                      <MenuItem value="2021 (תשפ''א)">2021</MenuItem>
                      <MenuItem value="2022 (תשפ''ב)">2022</MenuItem>
                      <MenuItem value="2023 (תשפ''ג)">2023</MenuItem>
                      <MenuItem value="2024 (תשפ''ד)">2024</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={6}>
                  <FormControl fullWidth variant="outlined">
                    <InputLabel>מועד</InputLabel>
                    <Select
                      value={testSeason}
                      onChange={(e) => setTestSeason(e.target.value)}
                      label="מועד"
                      required
                    >
                      <MenuItem value=""><em>None</em></MenuItem>
                      <MenuItem value="קיץ">קיץ</MenuItem>
                      <MenuItem value="אביב">אביב</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="מספר מועד"
                    value={testSeasonNum}
                    onChange={(e) => setTestSeasonNum(e.target.value)}
                    required
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="חלק מהמבחן"
                    value={partOfTheTest}
                    onChange={(e) => setPartOfTheTest(e.target.value)}
                    required
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="מספר שאלה"
                    type="number"
                    value={numberOfQuestion}
                    onChange={(e) => setNumberOfQuestion(e.target.value)}
                    required
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="קלט לדוגמה"
                    value={testInput}
                    onChange={(e) => setTestInput(e.target.value)}
                    multiline
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="פלט לדוגמה"
                    value={testOutput}
                    onChange={(e) => setTestOutput(e.target.value)}
                    multiline
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="פתרון"
                    value={solution}
                    onChange={(e) => setSolution(e.target.value)}
                    multiline
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="מקור הפתרון"
                    value={solutionSource}
                    onChange={(e) => setSolutionSource(e.target.value)}
                    multiline
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControl component="fieldset">
                    <Typography variant="h6">רמת קושי</Typography>
                    <Box display="flex" flexDirection="row">
                      <FormControlLabel
                        control={<Checkbox checked={difficulty === 'easy'} onChange={() => setDifficulty('easy')} />}
                        label="קל"
                      />
                      <FormControlLabel
                        control={<Checkbox checked={difficulty === 'medium'} onChange={() => setDifficulty('medium')} />}
                        label="בינוני"
                      />
                      <FormControlLabel
                        control={<Checkbox checked={difficulty === 'hard'} onChange={() => setDifficulty('hard')} />}
                        label="קשה"
                      />
                    </Box>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <FormControl component="fieldset">
                    <Typography variant="h6">תגיות</Typography>
                    <Box display="flex" flexWrap="wrap">
                      {tagOptions.map(tag => (
                        <FormControlLabel
                          key={tag.id}
                          control={<Checkbox checked={tags.includes(tag.id)} onChange={handleTagChange} value={tag.id} />}
                          label={tag.label}
                        />
                      ))}
                    </Box>
                  </FormControl>
                </Grid>
                {error && (
                  <Grid item xs={12}>
                    <Alert severity="error">{error}</Alert>
                  </Grid>
                )}
                <Grid item xs={12}>
                  <CustomButton
                    fullWidth
                    type="submit"
                    variant="contained"
                    startIcon={<SendIcon />}
                  >
                    הוסף שאלה
                  </CustomButton>
                </Grid>
              </Grid>
            </form>
          </CardContent>
        </ModernCard>
        <Snackbar open={showAlert} autoHideDuration={3000}>
          <Alert severity="success" sx={{ width: '100%' }}>
            השאלה נוספה בהצלחה!
          </Alert>
        </Snackbar>
      </Box>
    </>
  );
}

export default AddQuestion;
