import React, { useState, useContext } from "react";
import axios from "axios";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { UserContext } from "../App";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";

const MessageForm = ({ onMessageSubmit, questionId }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const { userInfo } = useContext(UserContext);
  console.log(questionId);
  const authorName = userInfo.data.user.name;
  const authorId = userInfo.data.user._id;
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (authorName && content) {
      const newComment = { authorName, authorId, title, content };
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_SERVER}/problem/${questionId}/forum`,
          { newComment }
        );
        console.log(response);
        onMessageSubmit(response.data.commentForId);
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
      <Typography variant="h6" gutterBottom sx={{ textAlign: "right" }}>
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
          "& .MuiInputLabel-root": {
            right: "1rem", // Adjust the right margin for the label
            left: "auto",
            transformOrigin: "right"
          },
          "& .MuiInputBase-input": {
            textAlign: "right"
          },
          "& legend": {
            textAlign: "right"
          },
          "& .MuiInputLabel-formControl": {
            right: "1.77rem",
            left: "auto"
          },
          "& .MuiInputLabel-shrink": {
            right: "1.77rem",
            left: "auto"
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
          "& .MuiInputLabel-root": {
            right: "1rem",
            left: "auto",
            transformOrigin: "right"
          },
          "& .MuiInputBase-input": {
            textAlign: "right"
          },
          "& legend": {
            textAlign: "right"
          },
          "& .MuiInputLabel-formControl": {
            right: "1.77rem",
            left: "auto"
          },
          "& .MuiInputLabel-shrink": {
            right: "1.77rem",
            left: "auto"
          }
        }}
      />
      <Button type="submit" variant="contained" endIcon={<SendIcon />}>
        שלח תגובה
      </Button>
    </Box>
  );
};

export default MessageForm;
