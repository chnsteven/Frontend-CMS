import React, { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrashCan } from "@fortawesome/free-regular-svg-icons";

// const commentHistoryLimit = 3;

function MessageBoard() {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState({
    anonymous: false,
    nickname: "",
    content: "",
  });
  const [editComment, setEditComment] = useState({
    id: null,
    field: null,
  }); // Track which comment is being edited
  const [nicknameError, setNicknameError] = useState("");
  const [contentError, setContentError] = useState("");

  const loadComments = async () => {
    try {
      const res = await axios.get(
        "http://localhost:3000/public/api/get_comments.php",
        {
          params: {
            uuid: localStorage.getItem("uuid") || "",
            // limit: commentHistoryLimit,
          },
        }
      );
      // console.log(res.data);
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
          { params: { uuid: localStorage.getItem("uuid") || "" } }
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

  const handlePatch = async (updatedComment, id) => {
    try {
      await axios.patch(
        `http://localhost:3000/public/api/update_comment.php`,
        updatedComment,
        { params: { id: id } }
      );
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

  const handleEditClick = (commentId, fieldName) => {
    setEditComment({ id: commentId, field: fieldName }); // Set the comment ID being edited
  };

  const handleSaveEdit = (comment) => {
    const updatedValues = {
      nickname: comment.nickname,
      content: comment.content,
    };
    handlePatch(updatedValues, comment.id);
    setEditComment({ id: null, field: null }); // Stop editing after save
  };

  const handleCancelEdit = () => {
    setEditComment({ id: null, field: null });
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

  const handleDeleteComment = async (comment) => {
    console.log("comment:", comment);
    try {
      const res = await axios.delete(
        "http://localhost:3000/public/api/delete_comment.php",
        { params: { id: comment.id } }
      );
      loadComments();
      // console.log(res.data);
    } catch (e) {
      console.error("There was an error deleting the comment!", e);
    }
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
            id="anonymous"
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
            id="nickname"
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
            id="content"
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
                {editComment.id === comment.id &&
                editComment.field === "nickname" ? (
                  <div>
                    <input
                      id={`nickname-${comment.id}`} // Assign a unique ID
                      value={comment.nickname}
                      onChange={(e) =>
                        handleEditFieldChange(e, comment.id, "nickname")
                      }
                    />
                    <button onClick={() => handleSaveEdit(comment)}>
                      Save
                    </button>
                    <button onClick={() => handleCancelEdit()}>Cancel</button>
                  </div>
                ) : (
                  <div>
                    <span
                      id={`nickname-${comment.id}`}
                      style={comment.anonymous ? { filter: "blur(4px)" } : {}}
                    >
                      {comment.nickname}
                    </span>
                    {comment.is_user_comment && (
                      <button
                        onClick={() => handleEditClick(comment.id, "nickname")}
                      >
                        <FontAwesomeIcon icon={faPenToSquare} />
                      </button>
                    )}
                  </div>
                )}
              </div>

              <div>
                {/* Anonymous field */}
                {editComment.id === comment.id &&
                editComment.field === "anonymous" ? (
                  <div>
                    <input
                      type="radio"
                      id={`anonymous-${comment.id}`} // Assign a unique ID
                      value={comment.anonymous}
                      onChange={(e) =>
                        handleEditFieldChange(e, comment.id, "anonymous")
                      }
                    />
                    <button onClick={() => handleSaveEdit(comment)}>
                      Save
                    </button>
                    <button onClick={() => handleCancelEdit()}>Cancel</button>
                  </div>
                ) : (
                  <div>
                    <span id={`anonymous-${comment.id}`}>
                      {comment.anonymous}
                    </span>
                    {comment.is_user_comment && (
                      <button
                        onClick={() => handleEditClick(comment.id, "anonymous")}
                      >
                        <FontAwesomeIcon icon={faPenToSquare} />
                      </button>
                    )}
                  </div>
                )}
              </div>

              <div>
                {/* Content field */}
                {editComment.id === comment.id &&
                editComment.field === "content" ? (
                  <div>
                    <textarea
                      id={`content-${comment.id}`} // Assign a unique ID
                      value={comment.content}
                      onChange={(e) =>
                        handleEditFieldChange(e, comment.id, "content")
                      }
                    />
                    {/* Save button appears when editing */}
                    <button onClick={() => handleSaveEdit(comment)}>
                      Save
                    </button>
                    <button onClick={() => handleCancelEdit()}>Cancel</button>
                  </div>
                ) : (
                  <div>
                    <span id={`content-${comment.id}`}>{comment.content}</span>
                    {comment.is_user_comment && (
                      <button
                        onClick={() => handleEditClick(comment.id, "content")}
                      >
                        <FontAwesomeIcon icon={faPenToSquare} />
                      </button>
                    )}
                  </div>
                )}
              </div>
              {comment.is_user_comment && (
                <div>
                  <button onClick={() => handleDeleteComment(comment)}>
                    Delete
                    <FontAwesomeIcon icon={faTrashCan} />
                  </button>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default MessageBoard;
