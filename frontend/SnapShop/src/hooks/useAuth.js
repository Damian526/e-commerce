import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { getCurrentUser } from "../services/apiAuth";


export function useAuth() {
  const queryClient = useQueryClient();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      getCurrentUser(token).then((user) => {
        if (user) {
          queryClient.setQueryData(["user"], user);
        } else {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
        }
      });
    }
  }, [queryClient]);
}

