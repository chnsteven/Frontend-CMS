import React, { useState, useEffect } from "react";
import axios from "axios";

function MessageBoard() {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState({
    anonymous: false,
    nickname: "",
    content: "",
  });

  const loadComments = async () => {
    try {
      const res = await axios.get(
        "http://localhost:3000/PHP-CMS/public/api/get_comments.php"
      );
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
      await axios.post(
        "http://localhost:3000/PHP-CMS/public/api/submit_comment.php",
        newComment,
        { headers: { "Content-Type": "application/json" } }
      );
      setNewComment({
        anonymous: false,
        nickname: "",
        content: "",
      });
      loadComments();
    } catch (e) {
      console.error("There was an error submitting the comment!", e);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewComment((prev) => ({
      ...prev,
      [name]: name === "anonymous" ? e.target.checked : value, // Handle the checkbox differently
    }));
  };

  return (
    <div className="main-container">
      <div>
        <h2>New Comment</h2>
        <form onSubmit={handleSubmit} className="new-comment" method="post">
          <label for="anonymous">Anonymous? </label>
          <input
            type="radio"
            name="anonymous"
            checked={newComment.anonymous ? newComment.anonymous : false}
            onClick={() =>
              setNewComment({
                ...newComment,
                anonymous: !newComment.anonymous,
              })
            }
            onChange={handleInputChange}
          ></input>
          <label for="nickname">Nickname: </label>
          <input type="text" name="nickname" onChange={handleInputChange} />

          <label for="content">Comment: </label>
          <textarea
            type="textarea"
            name="content"
            rows={5}
            cols={60}
            onChange={handleInputChange}
          />

          <button>Submit Comment</button>
        </form>
      </div>
      <div className="comment-history">
        <h2>Comment History</h2>
        <ul>
          {comments.map((comment, index) => (
            <li key={`comment-${index}`}>
              {comment.anonymous} <br />
              {comment.nickname} <br />
              {comment.content}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default MessageBoard;
