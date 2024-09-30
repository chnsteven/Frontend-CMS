import React, { useState, useEffect } from "react";
import axios from "axios";

function MessageBoard() {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState({
    uuid: localStorage.getItem("uuid") || "",
    anonymous: false,
    nickname: "",
    content: "",
  });
  const [nicknameError, setNicknameError] = useState("");
  const [contentError, setContentError] = useState("");

  const nicknameIsValid = (name) => {
    const regex = /[a-zA-Z]/;
    return regex.test(name);
  };

  const contentIsValid = (content) => {
    return content.trim().length > 0; // Content must not be empty
  };
  const loadComments = async () => {
    try {
      const res = await axios.get(
        "http://localhost:3000/public/api/get_comments.php",
        { params: { uuid: localStorage.getItem("uuid") || "" } }
      );
      console.log(res.data);

      // Make sure we access the comments array inside res.data
      if (res.data && res.data.comments) {
        setComments(res.data.comments);
      }
    } catch (e) {
      console.error("There was an error fetching comments!", e);
    }
  };

  useEffect(() => {
    loadComments();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Reset error messages
    setNicknameError("");
    setContentError("");

    let isValid = true;

    if (!nicknameIsValid(newComment.nickname)) {
      setNicknameError(
        "Nickname is invalid. Please use at least one English character."
      );
      isValid = false; // Mark as invalid
    }

    if (!contentIsValid(newComment.content)) {
      setContentError("Content cannot be empty.");
      isValid = false; // Mark as invalid
    }

    if (isValid) {
      try {
        await axios.post(
          "http://localhost:3000/public/api/submit_comment.php",
          newComment,
          {
            headers: { "Content-Type": "application/json" },
            params: { uuid: newComment.uuid },
          }
        );

        setNewComment({
          uuid: localStorage.getItem("uuid") || "",
          anonymous: false,
          nickname: "",
          content: "",
        });
        loadComments();
      } catch (e) {
        console.error("There was an error submitting the comment!", e);
      }
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target; // Use name to identify the field
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
          <label htmlFor="anonymous">Anonymous? </label>
          <input
            type="radio"
            name="anonymous"
            checked={newComment.anonymous}
            onClick={() =>
              setNewComment((prev) => ({
                ...prev,
                anonymous: !prev.anonymous,
              }))
            }
            onChange={handleInputChange}
          ></input>
          <label htmlFor="nickname">Nickname: </label>
          <input
            type="text"
            name="nickname"
            onChange={handleInputChange}
            value={newComment.nickname}
            placeholder="At least 1 English character"
          />
          {nicknameError && (
            <p className="comment-field-error">{nicknameError}</p>
          )}
          {/* Display the error message */}
          <label htmlFor="content">Comment: </label>
          <textarea
            type="textarea"
            name="content"
            rows={5}
            cols={60}
            onChange={handleInputChange}
            value={newComment.content}
            placeholder="At least 1 character"
          />
          {contentError && (
            <p className="comment-field-error">{contentError}</p>
          )}
          <button>Submit Comment</button>
        </form>
      </div>
      <div className="comment-history">
        <h2>Comment History</h2>
        <ul>
          {comments &&
            comments.map((comment, index) => (
              <li key={`comment-${index}`}>
                <p
                  style={
                    comment.nickname === "?????"
                      ? { filter: "blur(5px)" }
                      : null
                  }
                >
                  {comment.nickname}
                </p>
                <p>{comment.content}</p>
                {comment.is_user_comment && (
                  <p>I am allowed to edit this comment</p>
                )}
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
}

export default MessageBoard;
