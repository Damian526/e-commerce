import { toast } from "react-hot-toast";
import { signup as signupApi } from "../../services/apiAuth";
import useAuthMutation from "../../hooks/useAuthMutation";
import { handleError } from "../../utils/errorHandling";

export function useSignup() {
  return useAuthMutation(
    signupApi,
    () => {
      toast.success("Signup successful!");
    },
    (error) => {
      const errorMessage = handleError(error, "useSignup");
      toast.error(`Signup error: ${errorMessage}`);
    },
  );
}
