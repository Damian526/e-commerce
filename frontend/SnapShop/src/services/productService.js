import axios from 'axios';

const API_URL = 'http://localhost:8000/api';

// Fetch all products
export const fetchProducts = async () => {
  const response = await axios.get(`${API_URL}/products`);
  return response.data;
};

// Fetch featured products
export const fetchFeaturedProducts = async () => {
  const response = await axios.get(`${API_URL}/products/featured`);
  return response.data;
};