/* eslint-disable react/prop-types */
import { useState } from "react";

const OrderItem = ({ item, onSubmitReview }) => {
  const [rating, setRating] = useState("");
  const [comment, setComment] = useState("");

  const handleSubmit = () => {
    if (rating && comment) {
      const reviewData = { rating, comment };
      onSubmitReview(item.product, reviewData);
    }
  };

  return (
    <li className="text-gray-300">
      {item.productName} (x{item.quantity}) - ${item.price.toFixed(2)}
      <div className="mt-2">
        <label className="block text-gray-400">
          Rating:
          <select
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            className="ml-2 p-1 bg-gray-700 text-gray-100"
          >
            <option value="">Select Rating</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
        </label>
        <label className="block mt-2 text-gray-400">
          Comment:
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="w-full p-2 mt-1 bg-gray-700 text-gray-100 rounded"
          />
        </label>
        <button
          onClick={handleSubmit}
          className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Submit Review
        </button>
      </div>
    </li>
  );
};

export default OrderItem;
