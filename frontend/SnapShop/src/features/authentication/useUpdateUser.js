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
    },
    onError: (error) => {
      const errorMessage = handleError(error, "useUpdateUser");
      toast.error(`Update error: ${errorMessage}`);
    },
  });

  return {
    updateUser: mutation.mutate,
    isLoading: mutation.isLoading,
    error: mutation.error,
  };
};
