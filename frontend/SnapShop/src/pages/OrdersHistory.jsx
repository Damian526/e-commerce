import { useQuery } from "@tanstack/react-query";
import { getOrderHistory } from "../services/apiOrder";
import Loader from "../ui/Loader";

const OrdersHistory = () => {
  const { data, error, isLoading } = useQuery({
    queryKey: ["orderHistory"],
    queryFn: getOrderHistory,
  });

  if (isLoading) return <Loader />;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="container mx-auto py-8 px-4 bg-gray-900 rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-100">
        Order History
      </h2>
      {data.orders.length === 0 ? (
        <p className="text-center text-lg text-gray-300">No orders found.</p>
      ) : (
        <ul className="space-y-4">
          {data.orders.map((order) => (
            <li
              key={order._id}
              className="p-4 bg-gray-800 rounded-lg shadow-md"
            >
              <h3 className="text-xl font-semibold text-gray-100">
                Order #{order._id}
              </h3>
              <p className="text-gray-400">
                Date: {new Date(order.orderDate).toLocaleDateString()}
              </p>
              <p className="text-gray-400">Total: ${order.total.toFixed(2)}</p>
              <ul className="mt-2">
                {order.items.map((item) => (
                  <li key={item.product} className="text-gray-300">
                    {item.productName} (x{item.quantity}) - $
                    {item.price.toFixed(2)}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default OrdersHistory;
