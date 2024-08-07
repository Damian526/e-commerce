import { useMutation } from "@tanstack/react-query";
import axiosInstance from "../../services/axiosInstance";
import { toast } from "react-hot-toast";

export const useUpdateUser = () => {
  const mutation = useMutation({
    mutationFn: (data) => axiosInstance.patch("/users/updateMe", data),
    onSuccess: (response) => {
      toast.success("User information updated successfully!");
      console.log("User updated successfully", response.data);
    },
    onError: (error) => {
      toast.error(
        `Update error: ${error.response?.data?.message || "An error occurred"}`,
      );
      console.error("Failed to update user", error);
    },
  });

  return {
    updateUser: mutation.mutate,
    isLoading: mutation.isLoading,
    error: mutation.error,
  };
};
