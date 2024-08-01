import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { getCurrentUser } from "../services/apiAuth";

export function useAuth() {
  const queryClient = useQueryClient();

  useEffect(() => {
    const token =
      localStorage.getItem("token") || sessionStorage.getItem("token");

    if (token) {
      getCurrentUser()
        .then((user) => {
          if (user) {
            const normalizedUser = user.data?.user || user; // Normalize the user object structure
            queryClient.setQueryData(["user"], normalizedUser);
          } else {
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            sessionStorage.removeItem("token");
            sessionStorage.removeItem("user");
          }
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          sessionStorage.removeItem("token");
          sessionStorage.removeItem("user");
        });
    }
  }, [queryClient]);
}
