import axiosInstance from "./axiosInstance";

export const fetchCart = async () => {
  const res = await axiosInstance.get("/cart");
  return res.data.data.cart;
};

export const updateQuantity = async ({ productId, quantity }) => {
  return await axiosInstance.patch("/cart/item", { productId, quantity });
};
export const deleteItem = async (productId) => {
  return await axiosInstance.delete("/cart/item", { data: { productId } });
};
