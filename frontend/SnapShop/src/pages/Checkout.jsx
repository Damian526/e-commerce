import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate, useLocation } from "react-router-dom";
import { placeOrder } from "../services/apiOrder";

const Checkout = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const location = useLocation();

  // Get the selected items passed from the Cart page
  const selectedItems =
    location.state?.items.map((item) => item.product._id) || [];

  const placeOrderMutation = useMutation({
    mutationFn: () => placeOrder(selectedItems), // Pass the selected items to the placeOrder function
    onSuccess: (response) => {
      queryClient.invalidateQueries(["cart"]);

      // Extract the actual order object from the nested data
      const order = response.data.data.order;
      console.log(order);

      if (!order || !order.items) {
        console.error("Order or order.items is undefined");
        toast.error("Unexpected error: Order details are missing.");
        return;
      }
      console.log(selectedItems); // Sanitize the order object before passing to the confirmation page
      /* const sanitizedOrder = {
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
      }; */
      
      navigate("/order-confirmation", { state: { order } });
    },
    onError: (error) => {
      console.error("Failed to place order:", error);
      toast.error(
        "An error occurred while placing the order. Please try again.",
      );
    },
  });

  const handlePay = () => {
    if (selectedItems.length === 0) {
      toast.error("No items selected for checkout.");
      return;
    }
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
      <ul className="space-y-4">
        {location.state?.items.map((item) => (
          <li
            key={item.product._id}
            className="flex items-center justify-between p-4 bg-gray-800 rounded-lg shadow-md"
          >
            <img
              src={item.product.imageUrl}
              alt={item.product.name}
              className="w-20 h-20 object-cover rounded-lg mr-4"
            />
            <div className="flex-1 ml-4">
              <h3 className="text-xl font-semibold text-gray-100">
                {item.product.name}
              </h3>
              <p className="text-gray-400 mt-2">Quantity: {item.quantity}</p>
              <p className="text-gray-400 mt-2">Price: ${item.product.price}</p>
            </div>
          </li>
        ))}
      </ul>
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
