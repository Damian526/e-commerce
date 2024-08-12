export const handleError = (error, context) => {
    console.error(`Error in ${context}:`, error);
    return error.response?.data?.message || "An error occurred";
  };