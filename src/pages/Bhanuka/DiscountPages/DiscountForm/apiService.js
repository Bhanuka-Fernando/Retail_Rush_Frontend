import axios from 'axios';

export const fetchItemsByStore = async (storeId) => {
  try {
    const { data } = await axios.get(`/api/items/store/${storeId}`);
    return data;
  } catch (err) {
    throw new Error(err.response?.data?.message || 'An error occurred while fetching items.');
  }
};
