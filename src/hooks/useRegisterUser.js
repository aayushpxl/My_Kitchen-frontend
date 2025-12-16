import { useMutation } from "@tanstack/react-query";
import { registerUserService } from "../services/authService";
import { toast } from "react-toastify";

export const useRegisterUser = () => {
  return useMutation({
    mutationKey: ["register"],
    mutationFn: registerUserService,
    onSuccess: (data) => {
      toast.success(data.message || "Registration successful");
    },
    onError: (err) => {
      toast.error(err?.message || "Registration failed");
    },
  });
};
