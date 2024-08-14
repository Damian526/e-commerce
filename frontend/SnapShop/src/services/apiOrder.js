import axiosInstance from "./axiosInstance";

export const placeOrder = async (selectedItems) => {
  
  const data = await axiosInstance.post("/order", {
    selectedItems, // Pass the selected items in the request body
  });
  console.log(data);
  return data;
};
