import { useMutation } from "@tanstack/react-query";

const useAuthMutation = (mutationFn, onSuccess, onError) => {
  return useMutation({
    mutationFn,
    onSuccess,
    onError,
  });
};

export default useAuthMutation;