import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { placeOrder } from "../services/apiOrder";

const Checkout = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const placeOrderMutation = useMutation({
    mutationFn: placeOrder,
    onSuccess: (response) => {
      queryClient.invalidateQueries(["cart"]);

      // Extract the actual order object from the nested data
      const order = response.data.data.order;

      if (!order || !order.items) {
        console.error("Order or order.items is undefined");
        toast.error("Unexpected error: Order details are missing.");
        return;
      }

      // Sanitize the order object before passing to the confirmation page
      const sanitizedOrder = {
        id: order._id,
        items: order.items.map((item) => ({
          productId: item.product, // Assuming item.product is just an ID
          productName: item.productName,
          productDescription: item.productDescription,
          category: item.category,
          imageUrl: item.imageUrl,
          quantity: item.quantity,
          price: item.price, // Assuming price is directly on item
        })),
        total: order.total,
      };

      navigate("/order-confirmation", { state: { order: sanitizedOrder } });
    },
    onError: (error) => {
      console.error("Failed to place order:", error);
      toast.error(
        "An error occurred while placing the order. Please try again.",
      );
    },
  });

  const handlePay = () => {
    placeOrderMutation.mutate();
  };

  return (
    <div className="container mx-auto py-8 px-4 bg-gray-900 rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-100">
        Checkout
      </h2>
      <p className="text-center text-lg text-gray-300 mb-4">
        Please review your order and proceed to payment.
      </p>
      <div className="text-right mt-6">
        <button
          onClick={handlePay}
          className="px-6 py-2 bg-green-500 text-white font-bold rounded hover:bg-green-600"
        >
          Pay
        </button>
      </div>
    </div>
  );
};

export default Checkout;
