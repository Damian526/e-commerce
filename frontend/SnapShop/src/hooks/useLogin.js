import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login as loginApi } from "../services/apiAuth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/userSlice";

export function useLogin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { mutate: login, isLoading } = useMutation({
    mutationFn: loginApi,
    onSuccess: (response, { rememberMe }) => {
      const { token, data } = response;
      const user = data?.user || data;

      if (rememberMe) {
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));
      } else {
        sessionStorage.setItem("token", token);
        sessionStorage.setItem("user", JSON.stringify(user));
      }

      queryClient.setQueryData(["user"], user);
      dispatch(setUser(user));
      navigate("/home", { replace: true });
      toast.success("Login successful!");
    },
    onError: (err) => {
      console.error("ERROR", err);
      toast.error("Provided email or password are incorrect");
    },
  });

  return { login, isLoading };
}
