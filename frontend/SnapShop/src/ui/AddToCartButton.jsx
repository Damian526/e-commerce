import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

const addToCart = async (productId) => {
  const token = localStorage.getItem("token"); // Retrieve the token from localStorage

  const response = await fetch(`http://localhost:8000/api/v1/cart`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`, // Include the token in the headers
    },
    body: JSON.stringify({ productId, quantity: 1 }), // Specify the quantity
  });

  if (!response.ok) {
    console.log(response);
    throw new Error("Failed to add product to cart");
  }

  return response.json();
};

// eslint-disable-next-line react/prop-types
const AddToCartButton = ({ productId }) => {
  const queryClient = useQueryClient();

  const { mutate: addToCartMutate, isLoading } = useMutation({
    mutationFn: addToCart,
    onSuccess: () => {
      queryClient.invalidateQueries(["cart"]);
      toast.success("Product added to cart!");
    },
    onError: () => {
      toast.error("Failed to add product to cart");
    },
  });

  return (
    <button
      onClick={() => addToCartMutate(productId)}
      disabled={isLoading}
      className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:bg-blue-300"
    >
      {isLoading ? "Adding..." : "Add to Cart"}
    </button>
  );
};

export default AddToCartButton;
