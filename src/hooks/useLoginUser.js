import { useMutation } from "@tanstack/react-query";
import { loginUserService } from "../services/authService";
import { toast } from "react-toastify";

export const useLoginUser = () => {
  return useMutation({
    mutationKey: ["login"],
    mutationFn: loginUserService,
    onSuccess: (data) => {
      toast.success(data.message || "Login successful");
      sessionStorage.setItem("token", data.token);
    },
    onError: (err) => {
      toast.error(err?.message || err?.msg || "Login failed");

    },
  });
};
