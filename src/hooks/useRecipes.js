import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getAllRecipes, getRecipeById, createRecipe, toggleSaveRecipe } from "../api/recipeApi";
import { useAuth } from "../context/AuthContext";

// ... existing hooks

export const useToggleSaveRecipe = () => {
    const queryClient = useQueryClient();
    const { fetchUser } = useAuth(); // We'll add this to context to refresh user state

    return useMutation({
        mutationFn: toggleSaveRecipe,
        onSuccess: (data) => {
            // Invalidate recipes or user data if needed
            queryClient.invalidateQueries(["user"]);
            // Also maybe refresh auth user context?
            if (fetchUser) fetchUser();
        },
    });
};

export const useRecipes = () => {
    return useQuery({
        queryKey: ["recipes"],
        queryFn: async () => {
            return await getAllRecipes();
        },
    });
};

export const useRecipe = (id) => {
    return useQuery({
        queryKey: ["recipe", id],
        queryFn: async () => {
            return await getRecipeById(id);
        },
        enabled: !!id,
    });
};

export const useCreateRecipe = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: createRecipe,
        onSuccess: () => {
            queryClient.invalidateQueries(["recipes"]);
        },
    });
};
