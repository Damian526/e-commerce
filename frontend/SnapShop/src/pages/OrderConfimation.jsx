import { useLocation } from "react-router-dom";

const OrderConfirmation = () => {
  const location = useLocation();
  const order = location.state?.order;

  // Ensure order and order.items exist before accessing them
  if (order && order.items) {
    order.items.forEach((element) => console.log(element.productName));
  }

  return (
    <div className="container mx-auto py-8 px-4 bg-gray-900 rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-100">
        Order Confirmation
      </h2>
      {order ? (
        <div>
          <p className="text-lg text-gray-300">
            Thank you for your purchase! Your order number is{" "}
            <span className="font-bold text-white">{order.id}</span>.
          </p>
          <p className="mt-4 text-lg text-gray-300">
            You will receive a confirmation email shortly with the details of
            your order.
          </p>
          <div className="mt-6">
            <h3 className="text-xl font-semibold text-gray-100">
              Order Summary
            </h3>
            <ul className="mt-4 space-y-2">
              {order.items.map((item) => (
                <li
                  key={item.productId}
                  className="flex justify-between text-gray-300"
                >
                  <span>
                    {item.productName} (x{item.quantity})
                    <br />
                    <small>{item.productDescription}</small>
                  </span>
                  <span>${item.price.toFixed(2)}</span>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-2xl font-bold text-gray-100">
              Total: ${order.total.toFixed(2)}
            </p>
          </div>
        </div>
      ) : (
        <p className="text-lg text-gray-300">
          No order details found. Please check your order history.
        </p>
      )}
    </div>
  );
};

export default OrderConfirmation;
