import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { addToCart } from "../services/apiCart";

 import PropTypes from "prop-types";



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
 AddToCartButton.propTypes = {
  productId: PropTypes.string.isRequired,
}; 
export default AddToCartButton;
