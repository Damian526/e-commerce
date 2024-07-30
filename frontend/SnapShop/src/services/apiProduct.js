import axiosInstance from "./axiosInstance";

// Fetch all products
export const fetchProducts = async () => {
  const response = await axiosInstance.get(`products`);
  return response.data;
};

// Fetch featured products
export const fetchFeaturedProducts = async () => {
  const response = await axiosInstance.get(`products/featured`);
  return response.data;
};
export const fetchLatestProducts = async () => {
  const { data } = await axiosInstance.get("/products?sort=-addedAt&limit=10");
  console.log("Fetched Products:", data);
  return data.data.products;
};
