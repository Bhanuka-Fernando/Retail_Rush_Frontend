import React from "react";
import { Modal, Box, Typography, Button, TextField } from "@mui/material";
import Rating from "@mui/material/Rating";

// Modal styling
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const ReviewModal = ({
  open,
  onClose,
  reviewData,
  handleInputChange,
  handleRatingChange,
  handleSubmit,
  modalTitle,
  handleUpdate,
}) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          {modalTitle}
        </Typography>
        <form onSubmit={(e) => handleUpdate(e, reviewData)}>
          <TextField
            label="Name"
            name="name"
            value={reviewData.name}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Email"
            name="email"
            value={reviewData.email}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Review"
            name="review"
            value={reviewData.review}
            onChange={handleInputChange}
            fullWidth
            multiline
            rows={4}
            margin="normal"
            required
          />
          <Box sx={{ display: "flex", alignItems: "center", mt: 2 }}>
            <Typography>Your Rating:</Typography>
            <Rating
              name="rating"
              value={reviewData.value}
              onChange={handleRatingChange}
              sx={{ ml: 2 }}
            />
          </Box>
          <Box sx={{ mt: 2, display: "flex", justifyContent: "flex-end" }}>
            <Button onClick={onClose} sx={{ mr: 2 }} variant="outlined">
              Cancel
            </Button>

            <Button variant="contained" color="primary" type="submit">
              Submit
            </Button>
          </Box>
        </form>
      </Box>
    </Modal>
  );
};

export default ReviewModal;
