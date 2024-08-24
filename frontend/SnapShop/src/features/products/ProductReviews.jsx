import { useQuery } from "@tanstack/react-query";
import { getReviews } from "../../services/apiReview";
import ErrorMessage from "../../ui/ErrorMessage";
import Loader from "../../ui/Loader";

// eslint-disable-next-line react/prop-types
const ProductReviews = ({ id }) => {
  const { data, error, isLoading } = useQuery({
    queryKey: ["productReviews", id],
    queryFn: () => getReviews(id),
    retry: false,
  });

  if (isLoading) return <Loader />;
  if (error)
    return (
      <ErrorMessage
        error={
          error || {
            message: "An unexpected error occurred while fetching reviews",
          }
        }
      />
    );

  const reviews = data.data.reviews;
  console.log(reviews);

  return (
    <div className="mt-8">
      <h3 className="text-xl font-bold mb-4">Customer Reviews</h3>
      {reviews.length > 0 ? (
        <ul className="space-y-4">
          {reviews.map((review) => (
            <li key={review.id} className="p-4 bg-slate-600 rounded">
              <div className="flex items-center mb-2">
                {review.user.photo && (
                  <img
                    src={review.user.photo}
                    alt={review.user.name}
                    className="w-10 h-10 rounded-full mr-3"
                  />
                )}
                <h4 className="font-bold">{review.user.name}</h4>
              </div>
              <div className="text-sm text-gray-300">
                Rating: {review.rating} / 5
              </div>
              <p className="mt-2">{review.comment}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No reviews yet. Be the first to review this product!</p>
      )}
    </div>
  );
};

export default ProductReviews;
