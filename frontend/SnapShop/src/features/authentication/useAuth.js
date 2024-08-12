import { useQueryClient } from "@tanstack/react-query";
import { getCurrentUser } from "../../services/apiAuth";
import { useDispatch } from "react-redux";
import { setUser, clearUser } from "../../store/userSlice";
import { clearToken, getToken } from "../../utils/tokenManagment";

export function useAuth() {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();

  const fetchUser = async () => {
    const token = getToken();
    if (!token) return;

    try {
      const user = await getCurrentUser();
      queryClient.setQueryData(["user"], user.data?.user || user);
      dispatch(setUser(user.data?.user || user));
    } catch (error) {
      clearToken();
      dispatch(clearUser());
      console.error("Error fetching user data:", error);
    }
  };

  return { fetchUser };
}
