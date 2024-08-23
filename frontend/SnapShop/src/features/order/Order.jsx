/* eslint-disable react/prop-types */
import OrderItem from "./OrderItem";

const Order = ({ order, onSubmitReview }) => {
  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow-md">
      <h3 className="text-xl font-semibold text-gray-100 mb-2">
        Order #{order._id}
      </h3>
      <ul>
        {order.items.map((item) => (
          <OrderItem
            key={item._id}
            item={item}
            onSubmitReview={onSubmitReview}
          />
        ))}
      </ul>
    </div>
  );
};

export default Order;
