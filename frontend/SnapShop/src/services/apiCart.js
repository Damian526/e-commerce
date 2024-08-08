import axiosInstance from "./axiosInstance";

export const getCart = async () => {
  const res = await axiosInstance.get("/cart");
  return res.data.data.cart;
};

export const addToCart = async (productId) => {
  try {
    const data = await axiosInstance.post("/cart", { productId, quantity: 1 }); // Specify the quantity
    return data;
  } catch (error) {
    console.error("Add to cart error:", error.response?.data || error.message);
    throw error;
  }
};

export const updateQuantity = async ({ productId, quantity }) => {
  return await axiosInstance.patch("/cart/item", { productId, quantity });
};
export const deleteItem = async (productId) => {
  return await axiosInstance.delete("/cart/item", { data: { productId } });
};
