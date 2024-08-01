import axiosInstance from "./axiosInstance";

// Fetch featured products
export const fetchFeaturedProducts = async () => {
  const response = await axiosInstance.get(`products/featured`);
  return response.data;
};
export const fetchLatestProducts = async () => {
  const { data } = await axiosInstance.get("/products?sort=-addedAt&limit=10");

  return data.data.products;
};
export const fetchProducts = async (filters) => {
  const params = {};
  if (filters.category) params.category = filters.category;
  if (filters.minPrice) params["price[gte]"] = filters.minPrice;
  if (filters.maxPrice) params["price[lte]"] = filters.maxPrice;

  const response = await axiosInstance.get("/products", { params });
  console.log(response.data); // Log the entire response to see its structure
  return response.data.data.products; // Adjust this line based on the actual structure of your API response
};
