import React, { useState } from "react";
import Rating from "@mui/material/Rating";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

import TextField from "@mui/material/TextField";
import { useDispatch } from "react-redux";
import { deleteReview, voteReview } from "../../redux/reviewSlice";
import { FaThumbsUp, FaThumbsDown } from "react-icons/fa"; // Import thumbs-up/down icons
import axios from "axios";

function ReviewCard({
  reviewData,
  handleDelete,
  onRespond,
  respondButton = false,
  onEdit,
  currentUserId,
}) {
  const dispatch = useDispatch();
  const [response, setResponse] = useState(reviewData.response || "");
  const [isResponding, setIsResponding] = useState(false);

  const handleResponseSubmit = () => {
    onRespond(reviewData._id, response); // Make sure this matches your review object structure
    setIsResponding(false);
  };

  const handleVote = (voteType) => {
    dispatch(voteReview({ id: reviewData._id, voteType })); // Dispatch the vote action
  };

  return (
    <div
      style={{
        borderRadius: "10px",
        padding: "15px",
        backgroundColor: "#f9f9f9",
        boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
        marginBottom: "15px",
        marginTop: "15px",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "10px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <Rating name="read-only" value={reviewData.value} readOnly />{" "}
          {/* Ensure rating property exists */}
          <div style={{ marginLeft: "10px" }}>
            <div style={{ fontWeight: "bold" }}>{reviewData.name}</div>
          </div>
        </div>
        <div>
          {currentUserId === reviewData.userId && (
            <>
              <Button
                startIcon={<EditIcon />}
                variant="contained"
                color="primary"
                size="small"
                style={{
                  marginRight: "10px",
                  fontFamily: "Poppins, sans-serif",
                }}
                onClick={onEdit}
              >
                Update
              </Button>
              <Button
                variant="contained"
                startIcon={<DeleteIcon />}
                color="error"
                size="small"
                onClick={() => handleDelete(reviewData._id)}
              >
                Delete
              </Button>
            </>
          )}
        </div>
      </div>
      <p>{reviewData.review}</p> {/* Ensure review property exists */}
      <div style={{ fontSize: "12px", color: "#888" }}>
        {new Date(reviewData.date).toLocaleDateString()}{" "}
        {/* Ensure date property exists */}
      </div>
      {/* Thumbs Up / Down Section */}
      {/* Display shop owner response if available */}
      {reviewData.response && (
        <div
          style={{
            marginTop: "10px",
            padding: "10px",
            backgroundColor: "#e0f7fa",
            borderRadius: "5px",
          }}
        >
          <strong>Seller Response:</strong>
          <p>{reviewData.response}</p>
        </div>
      )}
      <div style={{ marginTop: "10px" }}>
        <p>Was this review helpful?</p>
        <button
          style={{ marginRight: "10px" }}
          onClick={() => handleVote("thumbsUp")}
        >
          <FaThumbsUp /> {reviewData.helpfulVotes?.thumbsUp || 0}
        </button>
        <button onClick={() => handleVote("thumbsDown")}>
          <FaThumbsDown /> {reviewData.helpfulVotes?.thumbsDown || 0}
        </button>
      </div>
      {/* Response input area */}
      {isResponding ? (
        <div style={{ marginTop: "10px" }}>
          <TextField
            label="Your Response"
            variant="outlined"
            fullWidth
            multiline
            required
            rows={3}
            value={response}
            onChange={(e) => setResponse(e.target.value)}
            style={{ marginBottom: "10px" }}
          />
          <Button
            variant="contained"
            color="primary"
            style={{ marginRight: "10px" }}
            onClick={handleResponseSubmit}
          >
            Submit Response
          </Button>
          <Button variant="outlined" onClick={() => setIsResponding(false)}>
            Cancel
          </Button>
        </div>
      ) : (
        respondButton && (
          <Button
            variant="outlined"
            onClick={() => setIsResponding(true)}
            style={{ marginTop: "20px", fontFamily: "Poppins, sans-serif" }}
            size="small"
          >
            Respond to Review
          </Button>
        )
      )}
    </div>
  );
}

export default ReviewCard;
