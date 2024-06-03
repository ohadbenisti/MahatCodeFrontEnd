import React, { useState, useContext } from "react";
import axios from "axios";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { UserContext } from "../App";


const MessageForm = ({ onMessageSubmit }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const { userInfo } = useContext(UserContext);
const authorName = userInfo.name
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (authorName && content) {
      const newComment = { authorName, title, content };

      try {
        const response = await axios.post(`${import.meta.env.VITE_SERVER}/forum`, newComment);
        onMessageSubmit(response.data.comment);
        setTitle("");
        setContent("");
      } catch (error) {
        console.error("Error posting comment:", error);
      }
    } else {
      alert("All fields are required!");
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }} dir="rtl">
      <Typography variant="h6" gutterBottom sx={{ textAlign: 'right' }}>
        פרסם תגובה
      </Typography>
      <TextField
        label="כותרת"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        fullWidth
        margin="normal"
        dir="rtl"
        sx={{
          '& .MuiInputLabel-root': {
            right: '1rem', // Adjust the right margin for the label
            left: 'auto',
            transformOrigin: 'right'
          },
          '& .MuiInputBase-input': {
            textAlign: 'right'
          },
          "& legend": {
            textAlign: 'right',
          },
          '& .MuiInputLabel-formControl': {
            right: '1.77rem',
            left: 'auto'
          },
          '& .MuiInputLabel-shrink': {
            right: '1.77rem',
            left: 'auto'
          }
        }}
      />
      <TextField
        label="תוכן התגובה"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        required
        fullWidth
        margin="normal"
        multiline
        rows={4}
        dir="rtl"
        sx={{
          '& .MuiInputLabel-root': {
            right: '1rem', 
            left: 'auto',
            transformOrigin: 'right'
          },
          '& .MuiInputBase-input': {
            textAlign: 'right'
          },
          "& legend": {
            textAlign: 'right',
          },
          '& .MuiInputLabel-formControl': {
            right: '1.77rem',
            left: 'auto'
          },
          '& .MuiInputLabel-shrink': {
            right: '1.77rem',
            left: 'auto'
          }
        }}
      />
      <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
        שלח תגובה
      </Button>
    </Box>
  );
};

export default MessageForm;
