import React, { useState } from 'react';

const MessageInForum = () => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    if (newComment.trim()) {
      setComments([...comments, newComment]);
      setNewComment('');
    }
  };

  return (
    <div>
      <h2>Forum</h2>
      <form onSubmit={handleSubmit}>
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Add your comment"
          rows="4"
          cols="50"
        />
        <br />
        <button type="submit">Submit</button>
      </form>
      <div>
        <h3>Comments</h3>
        {comments.length > 0 ? (
          <ul>
            {comments.map((comment, index) => (
              <li key={index}>{comment}</li>
            ))}
          </ul>
        ) : (
          <p>No comments yet.</p>
        )}
      </div>
    </div>
  );
};

export default MessageInForum;
