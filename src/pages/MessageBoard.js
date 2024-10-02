import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";

function MessageBoard() {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState({
    uuid: localStorage.getItem("uuid") || "",
    anonymous: false,
    nickname: "",
    content: "",
  });
  const [editComment, setEditComment] = useState(null); // Track which comment is being edited
  const [nicknameError, setNicknameError] = useState("");
  const [contentError, setContentError] = useState("");

  const loadComments = async () => {
    try {
      const res = await axios.get(
        "http://localhost:3000/public/api/get_comments.php",
        { params: { uuid: localStorage.getItem("uuid") || "" } }
      );
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

  const handlePost = async (e) => {
    e.preventDefault();

    setNicknameError("");
    setContentError("");

    let isValid = true;

    if (!/[a-zA-Z]/.test(newComment.nickname)) {
      setNicknameError(
        "Nickname is invalid. Please use at least one English character."
      );
      isValid = false;
    }

    if (!newComment.content.trim()) {
      setContentError("Content cannot be empty.");
      isValid = false;
    }

    if (isValid) {
      try {
        await axios.post(
          "http://localhost:3000/public/api/submit_comment.php",
          newComment,
          {
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

  const handlePatch = async (updatedComment) => {
    try {
      const res = await axios.patch(
        `http://localhost:3000/public/api/update_comment.php`,
        updatedComment
      );
      console.log("Response:", res.data);
      loadComments();
    } catch (e) {
      console.error("There was an error updating the comment!", e);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewComment((prev) => ({
      ...prev,
      [name]: name === "anonymous" ? e.target.checked : value,
    }));
  };

  const handleEditClick = (commentId) => {
    setEditComment(commentId); // Set the comment ID being edited
  };

  const handleSaveEdit = (comment) => {
    const updatedValues = {
      id: comment.id,
      nickname: comment.nickname,
      content: comment.content,
    };
    handlePatch(updatedValues);
    setEditComment(null); // Stop editing after save
  };

  const handleEditFieldChange = (e, commentId, field) => {
    setComments((prevComments) =>
      prevComments.map((comment) =>
        comment.id === commentId
          ? { ...comment, [field]: e.target.value }
          : comment
      )
    );
  };

  return (
    <div className="main-container">
      <div>
        <h2>New Comment</h2>
        <form onSubmit={handlePost} className="new-comment" method="post">
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
          {comments.map((comment, index) => (
            <li key={`comment-${index}`}>
              <div>
                {/* Nickname field */}
                {editComment === comment.id ? (
                  <input
                    id={`nickname-${comment.id}`} // Assign a unique ID
                    value={comment.nickname}
                    onChange={(e) =>
                      handleEditFieldChange(e, comment.id, "nickname")
                    }
                  />
                ) : (
                  <p id={`nickname-${comment.id}`}>
                    {comment.nickname}
                    <button onClick={() => handleEditClick(comment.id)}>
                      <FontAwesomeIcon icon={faPenToSquare} />
                    </button>
                  </p>
                )}
              </div>

              <div>
                {/* Content field */}
                {editComment === comment.id ? (
                  <textarea
                    id={`content-${comment.id}`} // Assign a unique ID
                    value={comment.content}
                    onChange={(e) =>
                      handleEditFieldChange(e, comment.id, "content")
                    }
                  />
                ) : (
                  <p id={`content-${comment.id}`}>
                    {comment.content}
                    <button onClick={() => handleEditClick(comment.id)}>
                      <FontAwesomeIcon icon={faPenToSquare} />
                    </button>
                  </p>
                )}
              </div>

              {/* Save button appears when editing */}
              {editComment === comment.id && (
                <button onClick={() => handleSaveEdit(comment)}>Save</button>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default MessageBoard;
