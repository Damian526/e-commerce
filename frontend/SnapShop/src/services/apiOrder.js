import axiosInstance from "./axiosInstance";

export const placeOrder = async () => {
  const data = await axiosInstance.post("/order");
  return data;
};
