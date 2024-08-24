import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getOrderHistory } from "../services/apiOrder";
import { submitReview } from "../services/apiReview";
import Loader from "../ui/Loader";
import ErrorMessage from "../ui/ErrorMessage";
import Order from "../features/order/Order";

const OrdersHistory = () => {
  const { data, error, isLoading } = useQuery({
    queryKey: ["orderHistory"],
    queryFn: getOrderHistory,
  });

  const queryClient = useQueryClient();

  const submitReviewMutation = useMutation({
    mutationFn: submitReview,
    onSuccess: () => {
      queryClient.invalidateQueries("orderHistory"); // Refresh the order history to show the new reviews
    },
  });

  const handleSubmitReview = (productId, review) => {
    submitReviewMutation.mutate({ productId, ...review });
  };

  if (isLoading) return <Loader />;
  if (error) return <ErrorMessage error={error} />;

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
            <Order
              key={order._id}
              order={order}
              onSubmitReview={handleSubmitReview}
              userId={data.userId}
            />
          ))}
        </ul>
      )}
    </div>
  );
};

export default OrdersHistory;
