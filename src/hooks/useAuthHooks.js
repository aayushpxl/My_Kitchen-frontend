import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getMe, loginUser, registerUser } from "../api/authApi";

// Hook to get current logged-in user profile
export const useUserProfile = () => {
  return useQuery({
    queryKey: ["user-profile"],
    queryFn: async () => {
      const { data } = await getMe();
      return data.user; // Accessing the user object from your backend response
    },
    retry: false, // Don't retry if the user isn't logged in
    staleTime: 1000 * 60 * 5, // Cache for 5 minutes
  });
};

// Hook for Login
export const useLogin = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      // Save token to localStorage
      localStorage.setItem("token", data.data.token);
      // Update the user profile in cache immediately
      queryClient.setQueryData(["user-profile"], data.data.user);
      queryClient.invalidateQueries(["user-profile"]);
    },
  });
};