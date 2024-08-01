import { useEffect, useState } from "react";
import { useUser } from "../hooks/useUser";
import axiosInstance from "../services/axiosInstance";

const Cart = () => {
  const { isAuthenticated } = useUser();
  const [cart, setCart] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const res = await axiosInstance.get("/cart");
        setCart(res.data.data.cart); // Update this line to match the structure of the response
      } catch (error) {
        console.error(
          "Error fetching cart:",
          error.response?.data?.message || error.message,
        );
        setError(
          error.response?.data?.message || "An unexpected error occurred",
        );
      }
    };

    if (isAuthenticated) {
      fetchCart();
    }
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    return <p>Please log in to view your cart.</p>;
  }

  if (error) {
    return <p>{error}</p>; // Display the error message
  }

  if (!cart) {
    return <p>Loading cart...</p>; // Add a loading state
  }

  return (
    <div className="container mx-auto py-4">
      <h2 className="text-2xl font-bold mb-4">Your Cart</h2>
      {cart.items.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ul>
          {cart.items.map((item) => (
            <li key={item.product._id} className="mb-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold">{item.product.name}</h3>
                  <p>Quantity: {item.quantity}</p>
                  <p>Price: ${item.product.price}</p>
                </div>
                <div>
                  <img
                    src={item.product.imageUrl}
                    alt={item.product.name}
                    className="w-20 h-20 object-cover"
                  />
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
      <p className="text-xl font-bold mt-4">Total: ${cart.total}</p>
    </div>
  );
};

export default Cart;
