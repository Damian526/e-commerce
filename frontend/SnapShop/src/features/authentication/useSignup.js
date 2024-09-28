import { useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { signup as signupApi } from "../../services/apiAuth";
import { handleError } from "../../utils/errorHandling";

export function useSignup() {
  return useMutation({
    mutationFn: signupApi, // mutationFn is the API call function
    onSuccess: () => {
      toast.success("Signup successful!");
    },
    onError: (error) => {
      const errorMessage = handleError(error, "useSignup");
      toast.error(`Signup error: ${errorMessage}`);
    },
  });
}
