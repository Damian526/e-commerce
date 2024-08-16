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
  const { category, minPrice, maxPrice, sort, page, limit, discount, search } =
    filters;
  const params = {};

  if (category) params.category = category;
  if (minPrice) params.price = { ...params.price, gte: minPrice };
  if (maxPrice) params.price = { ...params.price, lte: maxPrice };
  if (sort) params.sort = sort;
  if (search) {
    params.search = search;
  }
  if (discount) params["priceDiscount[gte]"] = 0;

  params.page = page;
  params.limit = limit;

  const response = await axiosInstance.get("/products", { params });
  return {
    products: response.data.data.products,
    totalProducts: response.data.totalProducts,
    results: response.data.results,
  };
};
export const fetchCategories = async () => {
  const { data } = await axiosInstance.get("/products/categories");

  return data;
};

export const fetchProductDetails = async (slug) => {
  
  const data = await axiosInstance.get(`/products/${slug}`);

  return data.data.data;
};

export const fetchProductsByQuery = async (searchTerm) => {
  if (!searchTerm) return { data: { products: [] } };
  const data = await axiosInstance.get(`/products?search=${searchTerm}`);

  return data.data;
};
