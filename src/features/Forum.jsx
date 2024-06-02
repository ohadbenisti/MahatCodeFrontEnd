import React, { useEffect, useState } from "react";
import axios from "axios";
import Comment from "./Comment";

const Forum = () => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.get('/api/comments'); // יש להחליף את כתובת ה-API המתאימה
        setComments(response.data.comments);
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };

    fetchComments();
  }, []);

  return (
    <div>
      <messageForm />
      {comments.map((comment) => (
        <Comment key={comment.id} comment={comment} />
      ))}
    </div>
  );
};

export default Forum;
