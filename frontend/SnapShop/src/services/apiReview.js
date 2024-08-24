import axiosInstance from "./axiosInstance";

export const submitReview = async ({ productId, rating, comment }) => {
  try {
    const response = await axiosInstance.post(
      `/products/${productId}/reviews`,
      {
        review: comment, // 'review' field contains the comment text
        rating,
      },
    );

    return response.data;
  } catch (error) {
    console.log("Submit Review Error:", error.response?.data || error.message);
    throw error;
  }
};

export const updateReview = async ({ reviewId, rating, comment }) => {
  try {
    const response = await axiosInstance.patch(`/reviews/${reviewId}`, {
      rating,
      review: comment,
    });

    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getReviews = async (id) => {
  try {
    const response = await axiosInstance.get(`/products/${id}/reviews`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
