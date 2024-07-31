import { useMutation } from "@tanstack/react-query";
import { signup } from "./../services/apiAuth"; 
import { toast } from "react-hot-toast";

export function useSignup() {
  const mutation = useMutation({
    mutationFn: (userData) => signup(userData),
    // eslint-disable-next-line no-unused-vars
    onSuccess: (data) => {
      toast.success("Signup successful!");
    },
    onError: (error) => {
      toast.error(
        `Signup error: ${error.response?.data?.message || "An error occurred"}`,
      );
    },
  });

  return {
    signup: mutation.mutate,
    isLoading: mutation.isLoading,
    error: mutation.error,
  };
}
