import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useUser } from "../features/authentication/useUser";
import { useState } from "react";
import { FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { deleteItem, getCart, updateQuantity } from "../services/apiCart";

const Cart = () => {
  const { isAuthenticated } = useUser();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const [selectedItems, setSelectedItems] = useState({});

  const {
    data: cart,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["cart"],
    queryFn: getCart,
    enabled: isAuthenticated,
  });

  const updateCartItem = useMutation({
    mutationFn: (cart) => updateQuantity(cart),
    onSuccess: () => {
      queryClient.invalidateQueries(["cart"]);
    },
  });

  const removeFromCart = useMutation({
    mutationFn: (productId) => deleteItem(productId),
    onSuccess: () => {
      queryClient.invalidateQueries(["cart"]);
    },
  });

  const handleQuantityChange = (productId, quantity) => {
    updateCartItem.mutate({ productId, quantity });
  };

  const handleRemoveItem = (productId) => {
    removeFromCart.mutate(productId);
  };

  const handleCheckboxChange = (productId) => {
    setSelectedItems((prev) => ({
      ...prev,
      [productId]: !prev[productId],
    }));
  };

  const calculateTotal = () => {
    return cart.items
      .filter((item) => selectedItems[item.product._id])
      .reduce((acc, item) => acc + item.quantity * item.product.price, 0)
      .toFixed(2);
  };

  const handleCheckout = () => {
    // Filter selected items to pass only those to the checkout page
    const filteredItems = cart.items.filter(
      (item) => selectedItems[item.product._id],
    );

    if (filteredItems.length === 0) {
      alert("Please select at least one item to proceed to checkout.");
      return;
    }

    navigate("/checkout", { state: { items: filteredItems } });
  };

  if (!isAuthenticated) {
    return (
      <div className="container mx-auto py-4">
        <p className="text-center text-lg text-gray-300">
          Please log in to view your cart.
        </p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="container mx-auto py-4">
        <p className="text-center text-lg text-gray-300">Loading cart...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto py-4">
        <p className="text-center text-lg text-red-600">
          {error.response?.data?.message || "An unexpected error occurred"}
        </p>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4 bg-gray-900 rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-100">
        Your Cart
      </h2>
      {cart.items.length === 0 ? (
        <p className="text-center text-lg text-gray-300">Your cart is empty.</p>
      ) : (
        <ul className="space-y-4">
          {cart.items.map((item) => (
            <li
              key={item.product._id}
              className="flex items-center justify-between p-4 bg-gray-800 rounded-lg shadow-md"
            >
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={!!selectedItems[item.product._id]}
                  onChange={() => handleCheckboxChange(item.product._id)}
                  className="mr-2"
                />
                <img
                  src={item.product.imageUrl}
                  alt={item.product.name}
                  className="w-20 h-20 object-cover rounded-lg mr-4"
                />
              </div>
              <div className="flex-1 ml-4">
                <h3 className="text-xl font-semibold text-gray-100">
                  {item.product.name}
                </h3>
                <div className="flex items-center mt-2">
                  <button
                    onClick={() =>
                      handleQuantityChange(item.product._id, item.quantity - 1)
                    }
                    className="px-2 py-1 bg-gray-600 text-gray-100 rounded"
                  >
                    -
                  </button>
                  <input
                    type="number"
                    value={item.quantity}
                    min="1"
                    readOnly
                    disabled={item.quantity === 1}
                    className="mx-2 w-12 text-center bg-gray-700 text-gray-100 rounded"
                  />
                  <button
                    onClick={() =>
                      handleQuantityChange(item.product._id, item.quantity + 1)
                    }
                    className="px-2 py-1 bg-gray-600 text-gray-100 rounded"
                  >
                    +
                  </button>
                </div>
                <p className="text-gray-400 mt-2">
                  Price: ${item.product.price}
                </p>
              </div>
              <button
                onClick={() => handleRemoveItem(item.product._id)}
                className="text-red-600 hover:text-red-800"
              >
                <FaTrash size={20} />
              </button>
            </li>
          ))}
        </ul>
      )}
      <div className="text-right mt-6">
        <p className="text-2xl font-bold text-gray-100">
          Total: ${calculateTotal()}
        </p>
      </div>
      <div className="flex justify-end mt-4">
        <button
          onClick={handleCheckout}
          className="px-6 py-2 bg-blue-500 text-white font-bold rounded hover:bg-blue-600"
        >
          Proceed to Payment
        </button>
      </div>
    </div>
  );
};

export default Cart;
