import { useQueryClient } from "@tanstack/react-query";
import { getCurrentUser } from "../../services/apiAuth";
import { useDispatch } from "react-redux";
import { setUser, clearUser } from "../../redux/userSlice";

export function useAuth() {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();

  const fetchUser = async () => {
    const token =
      localStorage.getItem("token") || sessionStorage.getItem("token");
    if (!token) return;

    try {
      const user = await getCurrentUser();
      queryClient.setQueryData(["user"], user.data?.user || user);
      dispatch(setUser(user.data?.user || user));
    } catch (error) {
      localStorage.removeItem("token");
      sessionStorage.removeItem("token");
      dispatch(clearUser());
      console.error("Error fetching user data:", error);
    }
  };

  return { fetchUser };
}
