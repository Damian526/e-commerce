import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-hot-toast";
import { login as loginApi } from "../../services/apiAuth";
import { setUser } from "../../store/userSlice";
import { storeToken } from "../../utils/tokenManagment";
import useAuthMutation from "../../hooks/useAuthMutation";
import { handleError } from "../../utils/errorHandling";

export function useLogin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return useAuthMutation(
    loginApi,
    (response, { rememberMe }) => {
      const { token, data } = response;
      const user = data?.user || data;

      storeToken(token, user, rememberMe);

      queryClient.setQueryData(["user"], (oldData) => {
        return {
          ...oldData,
          ...user, // Merging the existing user data with the new data
        };
      });

      dispatch(setUser(user));
      navigate("/home", { replace: true });
      toast.success("Login successful!");
    },
    (err) => {
      handleError(err, 'useLogin');
      toast.error("Provided email or password are incorrect");
    },
  );
}
