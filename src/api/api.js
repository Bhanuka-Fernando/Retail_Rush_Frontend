// api.js
import axios from "axios";

// Function to get the current user's details
export const getCurrentUser = async () => {
  try {
    // Retrieve the token from local storage
    const token = localStorage.getItem("token");

    // Set the authorization header
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    // Make a GET request to the /getUserDetails endpoint
    const response = await axios.get(
      "http://localhost:8070/api/user/getUserDetails",
      config
    );

    

    return response.data;
  } catch (error) {
    console.error("Error fetching user details:", error);
    throw error; // Rethrow the error for further handling
  }
};
