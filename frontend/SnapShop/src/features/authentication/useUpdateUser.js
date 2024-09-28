import { useMutation } from "@tanstack/react-query";
import axiosInstance from "../../services/axiosInstance";
import { toast } from "react-hot-toast";
import { handleError } from "../../utils/errorHandling";

export const useUpdateUser = () => {
  const mutation = useMutation({
    mutationFn: (data) =>
      axiosInstance.patch("/users/updateMe", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }),
    onSuccess: (response) => {
      toast.success("User information updated successfully!");
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
