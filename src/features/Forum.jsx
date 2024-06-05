import React, { useState, useEffect } from "react";
import axios from "axios";
import MessageForm from "./MessageForm";
import Comment from "./Comment";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";

const Forum = ({currentQuestion}) => {
  const [comments, setComments] = useState([]);
const questionId = currentQuestion._id;
let forumId;
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_SERVER}/problem/${questionId}/forum`);
        forumId = response.data.forum._id;
        setComments(response.data.forum.comments.reverse());
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };

    fetchComments();
  }, []);

  const handleNewComment = (newComment) => {
    setComments((prevComments) => [newComment, ...prevComments]);
  };

  return (
    <Container>
      <Box sx={{ my: 4 }}>
        <MessageForm questionId={questionId} onMessageSubmit={handleNewComment} />
        <br/>
        {comments.map((comment) => (
          <Comment key={comment._id} comment={comment} setComments={setComments} questionId={questionId}/>
        ))}
      </Box>
    </Container>
  );
};

export default Forum;
