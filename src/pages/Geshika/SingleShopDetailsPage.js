import React, { useEffect, useState, usestore } from "react";
import toast from "react-hot-toast"; // Import the toast function

import Rating from "@mui/material/Rating";
import Typography from "@mui/material/Typography";
import axios from "axios";
import ReviewCard from "../../components/Geshika/ReviewCard";
import { useDispatch, useSelector } from "react-redux";
import {
  addReview,
  deleteReview,
  getAllReviews,
  updateReview,
  updateReviewResponse,
} from "../../redux/reviewSlice";
import { useNavigate, useParams } from "react-router-dom";
import { fetchSingleStore } from "../../redux/registeredStoresSlice";
import { fetchProductsByStoreId } from "../../redux/productSlice";
import ReviewModal from "../../components/Geshika/ReviewModal";
import { getCurrentUser } from "../../api/api";
import HeaderComponent from "../../components/Banuka/HeaderComponent";

const SingleShopDetailsPage = () => {

  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [errorUser, setErrorUser] = useState(null);

  const { storeId } = useParams();
  const { singleStore, status, error } = useSelector((store) => store.stores);
  const { products } = useSelector((store) => store.product);

  const { reviews } = useSelector((store) => store.review);

  const dispatch = useDispatch();
  const [openModal, setOpenModal] = useState(false);

  const openUpdateModal = (review) => {
    setUpdateFeedback(review); // Load the review data into the feedback state
    setOpenModal(true); // Open the modal
  };
  const closeModal = () => {
    setOpenModal(false);
  };

  const [sortOption, setSortOption] = useState(""); // Sorting option
  const [filterRating, setFilterRating] = useState(0); // Filter by rating
  const [searchTerm, setSearchTerm] = useState(""); // Search term
  const [sortDirection, setSortDirection] = useState("asc"); // Sorting direction (asc or desc)

  useEffect(() => {
    if (storeId) {
      dispatch(fetchProductsByStoreId(storeId));
      dispatch(fetchSingleStore(storeId));
      dispatch(getAllReviews(storeId));
    }
  }, [dispatch, storeId]);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const userData = await getCurrentUser();
        setUser(userData.data); // Assuming the user data is in response.data
        setFeedback((prev) => ({
          ...prev,
          userId: userData.data._id, // Update userId here
        }));
      } catch (err) {
        console.log(err);
        setErrorUser(
          err.response ? err.response.data.message : "Error fetching user data"
        );
      }
    };

    fetchUserDetails();
  }, []);

  const [feedback, setFeedback] = useState({
    name: "",
    email: "",
    review: "",
    value: 0,
    storeId: storeId,
    userId: "",
  });

  const [updateFeedback, setUpdateFeedback] = useState({
    name: "",
    email: "",
    review: "",
    value: 0,
    storeId: storeId,
  });

  const handleInputChange = (e, isUpdate = false) => {
    const { name, value } = e.target;
    if (isUpdate) {
      setUpdateFeedback((prev) => ({
        ...prev,
        [name]: value,
      }));
    } else {
      setFeedback((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleRatingChange = (event, newValue, isUpdate = false) => {
    if (isUpdate) {
      setUpdateFeedback((prev) => ({
        ...prev,
        value: newValue !== null ? newValue : 0,
      }));
    } else {
      setFeedback((prev) => ({
        ...prev,
        value: newValue !== null ? newValue : 0,
      }));
    }
  };

  const handleDelete = (id) => {
    dispatch(deleteReview(id))
      .then(() => {
        toast.success("Review Deleted Succssfully!");
      })
      .catch((error) => {
        toast.error("Failed To Delete Review");
      });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    dispatch(addReview(feedback))
      .then(() => {
        // Dispatch was successful
        toast.success("Review submitted successfully!"); // Show success toast
        setFeedback({
          name: "",
          email: "",
          review: "",
          value: 0,
          storeId: storeId,
        });
      })
      .catch((error) => {
        // Dispatch failed
        toast.error("Failed to submit review."); // Show error toast
        console.error(error); // Optionally log the error

        setFeedback({
          name: "",
          email: "",
          review: "",
          value: 0,
          storeId: storeId,
        });
      });
  };

  const handleRespond = (id, response) => {
    dispatch(updateReviewResponse({ id, response }))
      .then(() => {
        toast.success("Response submitted successfully!");
      })
      .catch((error) => {
        toast.error("Failed to submit response.");
        console.error(error);
      });
  };

  const handleUpdate = (e, updatedReview) => {
    e.preventDefault(e); // Prevent the default form submission
    dispatch(updateReview(updatedReview))
      .then(() => {
        toast.success("Review updated successfully!");
        closeModal(); // Close the modal after successful update
        setUpdateFeedback({
          name: "",
          email: "",
          review: "",
          value: 0,
          storeId: storeId,
        });
      })
      .catch((error) => {
        toast.error("Failed to update review.");
        closeModal(); // Close the modal even if there's an error
        setUpdateFeedback({
          name: "",
          email: "",
          review: "",
          value: 0,
          storeId: storeId,
        });
        console.error(error);
      });
  };

  if (status === "loading") return <div>Loading...</div>; // Show loading state
  if (status === "failed") return <div>{error}</div>; // Show error message if fetching failed
  if (!singleStore) return <div>No store found.</div>; // Return if there is no single store

  // Filter reviews by rating and search term
  // Filter reviews by either rating or search term, but not both simultaneously
  const filteredReviews = reviews.filter((review) => {
    if (filterRating && !searchTerm) {
      // If filtering by rating only
      return review.value === filterRating;
    } else if (searchTerm && !filterRating) {
      // If filtering by search term only
      return review.review.toLowerCase().includes(searchTerm.toLowerCase());
    } else if (filterRating && searchTerm) {
      // If both rating and search term are provided, apply both
      return (
        review.value === filterRating &&
        review.review.toLowerCase().includes(searchTerm.toLowerCase())
      );
    } else {
      // If neither is provided, return all reviews
      return true;
    }
  });

  // Sort reviews based on the selected option
  const sortedReviews = [...filteredReviews].sort((a, b) => {
    const directionFactor = sortDirection === "asc" ? 1 : -1;
    if (sortOption === "rating") {
      return (a.value - b.value) * directionFactor; // Sort by rating
    }
    if (sortOption === "helpfulness") {
      return (a.helpfulness - b.helpfulness) * directionFactor; // Assuming you have a helpfulness property
    }
    return 0; // Default if no sorting is applied
  });

  return (
    <>
    <HeaderComponent/>
    
    <div style={{ padding: "20px" }}>
      
      {/* Shop Cover Section */}
      <div style={{ textAlign: "center" }}>
        <img
          src={singleStore.profileImage}
          alt="Shop Cover"
          style={{
            width: "100%",
            maxHeight: "500px",
            minHeight: "300px",
            borderRadius: "10px",
          }}
        />
        <h1 style={{ marginTop: "20px", fontSize: "2.5rem" }}>
          {singleStore.name}
        </h1>
      </div>

      {/* Product List Section */}
      <div style={{ marginTop: "40px" }}>
        <h2>Products</h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)", // Ensure 4 columns
            gap: "20px",
          }}
        >
          {products.length > 0 ? ( // Check if products array has items
            products.map((product) => (
              <div
                key={product.id}
                style={{
                  borderRadius: "10px",
                  padding: "10px",
                  textAlign: "center",
                  backgroundColor: "#f9f9f9",
                  boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
                  transition: "box-shadow 0.3s ease",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.boxShadow =
                    "0px 8px 16px rgba(0, 0, 0, 0.2)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.boxShadow =
                    "0px 4px 8px rgba(0, 0, 0, 0.2)")
                }
              >
                <img
                  src={product.img_url}
                  alt={product.name}
                  style={{
                    width: "100%",
                    height: "200px",
                    objectFit: "cover",
                    borderRadius: "10px",
                  }}
                />
                <h3 style={{ marginTop: "10px" }}>{product.name}</h3>
                <p style={{ fontWeight: "bold", color: "#e60023" }}>
                  {product.price}
                </p>

                {/* Action Buttons */}
                <div
                  style={{
                    marginTop: "10px",
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <button onClick={()=> navigate(`/Banuka/singleproduct/${product._id}`)}
                    style={{
                      padding: "8px 12px",
                      backgroundColor: "#007bff",
                      border: "none",
                      borderRadius: "5px",
                      color: "#fff",
                      cursor: "pointer",
                      width: "100%",
                    }}
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div style={{ gridColumn: "span 4", textAlign: "center" }}>
              {" "}
              {/* Span all columns */}
              <p>No products available for this store.</p>
            </div>
          )}
        </div>
      </div>

      {/* Feedback Section */}
      <div style={{ display: "flex", marginTop: "40px", gap: "20px" }}>
        {/* Feedback Text */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            flex: 1,
            padding: "20px",
            borderRadius: "10px",
            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
            backgroundColor: "#f9f9f9",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <h1>We Value Your Feedback</h1>
          <p>
            Let us know what you think about our products and services. Your
            feedback helps us improve and serve you better.
          </p>
        </div>
        {/* Feedback Form */}
        <div
          style={{
            flex: 1,
            padding: "20px",
            borderRadius: "10px",
            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
            backgroundColor: "#fff",
          }}
        >
          <h2>Submit Your Review</h2>
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: "10px" }}>
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                id="name"
                name="name"
                value={feedback.name}
                onChange={handleInputChange}
                required
                style={{
                  width: "100%",
                  padding: "8px",
                  borderRadius: "5px",
                  border: "1px solid #ddd",
                }}
              />
            </div>
            <div style={{ marginBottom: "10px" }}>
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                name="email"
                value={feedback.email}
                onChange={handleInputChange}
                required
                style={{
                  width: "100%",
                  padding: "8px",
                  borderRadius: "5px",
                  border: "1px solid #ddd",
                }}
              />
            </div>
            <div style={{ marginBottom: "10px" }}>
              <label htmlFor="review">Review:</label>
              <textarea
                id="review"
                name="review"
                value={feedback.review}
                onChange={handleInputChange}
                rows="4"
                required
                style={{
                  width: "100%",
                  padding: "8px",
                  borderRadius: "5px",
                  border: "1px solid #ddd",
                }}
              ></textarea>
            </div>
            <div
              style={{
                display: "flex", // Correct property for using flex layout
                flexDirection: "row", // Align items horizontally
                alignItems: "center", // Center items vertically
                border: "1px solid #ddd",
                borderRadius: "5px",
                padding: "10px",
                marginTop: "20px",
                marginBottom: "20px",
              }}
            >
              <div style={{ marginRight: "10px" }}>Your Rating:</div>
              <Rating
                name="simple-controlled"
                value={feedback.value}
                onChange={handleRatingChange}
              />
            </div>
            <button
              type="submit"
              style={{
                backgroundColor: "#007bff",
                color: "#fff",
                border: "none",
                padding: "10px 20px",
                borderRadius: "5px",
                cursor: "pointer",
                fontSize: "16px",
              }}
            >
              Submit
            </button>
          </form>
        </div>
      </div>

      {/* Reviews Section */}
      <div style={{ marginTop: "40px" }}>
        <h2>Customer Reviews</h2>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            margin: "20px 0",
          }}
        >
          {/* Sorting Dropdown */}
          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
          >
            <option value="">Sort By</option>
            <option value="rating">Rating</option>
            <option value="helpfulness">Helpfulness</option>
          </select>
          {/* Sort Direction Toggle */}
          <button
            onClick={() =>
              setSortDirection(sortDirection === "asc" ? "desc" : "asc")
            }
            style={{
              backgroundColor: "#007bff",
              color: "#fff",
              border: "none",
              padding: "10px",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            {sortDirection === "asc" ? "Ascending" : "Descending"}
          </button>

          {/* Filter by Rating */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <label>Filter by Rating: </label>
            <Rating
              name="filter-rating"
              value={filterRating}
              onChange={(e, newValue) => setFilterRating(newValue)}
            />
          </div>

          {/* Search Reviews */}
          <input
            type="text"
            placeholder="Search reviews..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              padding: "8px",
              borderRadius: "5px",
              border: "1px solid #ddd",
              width: "200px",
            }}
          />
          <button
            onClick={() => {
              setSortOption("");
              setFilterRating(0);
              setSearchTerm("");
            }}
            style={{
              backgroundColor: "#007bff",
              color: "#fff",
              border: "none",
              padding: "10px 20px",
              borderRadius: "5px",
              cursor: "pointer",
              marginTop: "10px",
            }}
          >
            Reset Filters
          </button>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "20px",
          }}
        >
          {sortedReviews.length > 0 ? (
            <div
              style={{ display: "flex", flexDirection: "column", gap: "20px" }}
            >
              {sortedReviews.map((review) => (
                <ReviewCard
                  reviewData={review}
                  key={review._id}
                  handleDelete={handleDelete}
                  onRespond={handleRespond}
                  onEdit={() => openUpdateModal(review)}
                  currentUserId={user ? user._id : null} // Ensure user exists before accessing _id
                />
              ))}
            </div>
          ) : (
            <p>No reviews found.</p>
          )}
        </div>
      </div>

      <ReviewModal
        open={openModal}
        reviewData={updateFeedback}
        modalTitle="Edit Review"
        onClose={closeModal}
        handleUpdate={handleUpdate}
        handleInputChange={(e) => handleInputChange(e, true)} // Mark as update
        handleRatingChange={(event, newValue) =>
          handleRatingChange(event, newValue, true)
        }
      />
    </div>
    </>
  );
};

export default SingleShopDetailsPage;
