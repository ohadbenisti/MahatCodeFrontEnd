import * as React from 'react';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';

const EraseComment = ({comment, questionId, setComments, forumId}) => {
    const handleDelete =  async ()=> {
        console.log(forumId);
        const commentId = comment._id;
        try{
            const deletedComment = await axios.delete(`${import.meta.env.VITE_SERVER}/problem/${questionId}/forum/${forumId}/${commentId}`)
            setComments((prevComments) => prevComments.filter(comment => comment._id !== commentId));
        }
        catch{
            console.log("couldn't erase comment");
    }}
  return (
      <Button id={comment._id} variant="outlined" style={{float: "left"}} startIcon={<DeleteIcon />} onClick={handleDelete}>
        מחק תגובה
      </Button>
  )
}

export default EraseComment;