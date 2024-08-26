import { useMutation } from "@tanstack/react-query";
import axiosInstance from "../../services/axiosInstance";
import { toast } from "react-hot-toast";
import { handleError } from "../../utils/errorHandling";

export const useUpdateUser = () => {
  const mutation = useMutation({
    mutationFn: (data) => axiosInstance.patch("/users/updateMe", data),
    // eslint-disable-next-line no-unused-vars
    onSuccess: (response) => {
      toast.success("User information updated successfully!");
      // Return the updated user data
      console.log(response.data.data.user);
      return response.data.data.user;
    },
    onError: (error) => {
      const errorMessage = handleError(error, "useUpdateUser");
      toast.error(`Update error: ${errorMessage}`);
    },
  });

  return {
    updateUser: mutation.mutateAsync,
    isLoading: mutation.isLoading,
    error: mutation.error,
  };
};
