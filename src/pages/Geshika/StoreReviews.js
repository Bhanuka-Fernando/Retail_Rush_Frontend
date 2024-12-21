import React from "react";
import Layout from "../Dushan/Layout";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  deleteReview,
  getAllReviews,
  updateReviewResponse,
} from "../../redux/reviewSlice";
import ReviewCard from "../../components/Geshika/ReviewCard";
import toast from "react-hot-toast"; // Import the toast function

const StoreReviews = () => {
  const storeId = localStorage.getItem('userEmail');
  const dispatch = useDispatch();
  const { reviews, isLoading, error } = useSelector((state) => state.review);

  useEffect(() => {
    dispatch(getAllReviews(storeId));
  }, [dispatch]);

  const handleDelete = (id) => {
    dispatch(deleteReview(id))
      .then(() => {
        toast.success("Review Deleted Succssfully!");
      })
      .catch((error) => {
        toast.error("Failed To Delete Review");
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

  return (
    <Layout>
      <h2>Store Reviews</h2>
      {isLoading && <p>Loading reviews...</p>}
      {error && <p>Error fetching reviews: {error}</p>}
      {reviews.length === 0 && <p>No reviews available for this store.</p>}
      {reviews.map((review) => (
        <ReviewCard
          key={review._id}
          reviewData={review}
          handleDelete={handleDelete}
          onRespond={handleRespond}
          respondButton={true}
        />
      ))}
    </Layout>
  );
};

export default StoreReviews;
