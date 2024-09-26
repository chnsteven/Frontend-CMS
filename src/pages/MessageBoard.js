import React, { useState, useEffect } from "react";
import axios from "axios";

function MessageBoard() {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState({
    anonymous: null,
    nickname: null,
    content: null,
  });

  const loadComments = async () => {
    try {
      const res = await axios.get("");
      setComments(res.data);
    } catch (e) {
      console.error("There was an error fetching comments!", e);
    }
  };

  useEffect(() => {
    loadComments();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("", newComment);
      setNewComment({ anonymous: null, nickname: null, content: null });
      loadComments();
    } catch (e) {
      console.error("There was an error submitting the comment!", e);
    }
  };

  return (
    <div className="main-container">
      <div>
        <h2>New Comment</h2>
        <form onSubmit={handleSubmit} className="new-comment">
          <label for="is-anonymous">Anonymous? </label>
          <input
            type="radio"
            name="is-anonymous"
            checked={newComment.anonymous ? newComment.anonymous : false}
            onClick={() =>
              setNewComment({
                ...newComment,
                anonymous: !newComment.anonymous,
              })
            }
          ></input>
          <label for="nickname">Nickname: </label>
          <input type="text" name="nickname" />

          <label for="comment">Comment: </label>
          <textarea type="textarea" name="comment" rows={5} cols={60} />

          <button>Submit Comment</button>
        </form>
      </div>
      <div className="comment-history">
        <h2>Comment History</h2>
        <ul>
          {comments.map((comment, index) => (
            <li key={`comment-${index}`}>
              {comment.anonymous ? "Anonymous" : comment.nickname}
              {comment.content}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default MessageBoard;
