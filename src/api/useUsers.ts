import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  fetchUsers,
  fetchUserById,
  deleteUser,
  upsertUser,
} from "../api/users";
import type { User } from "../types";
import type { CreateUserInput, CreateUserResponse } from "./types/apiTypes";

export const USER_QUERY_KEY = "users";

export const useUsers = () => {
  return useQuery<User[], Error>({
    queryKey: [USER_QUERY_KEY],
    queryFn: fetchUsers,
  });
};

export const useUser = (userId: string) => {
  return useQuery<User | undefined, Error>({
    queryKey: [USER_QUERY_KEY, userId],
    queryFn: () => fetchUserById(userId),
  });
};
export const useUpsertUser = () => {
  const queryClient = useQueryClient();
  return useMutation<CreateUserResponse, Error, CreateUserInput & { id?: number }>({
    mutationFn: upsertUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });
};



export const useDeleteUser = () => {
  const queryClient = useQueryClient();
  return useMutation<boolean, Error, string>({
    mutationFn: deleteUser,
    onSuccess: () => {
      // Invalidate and refetch users after a user is deleted
      queryClient.invalidateQueries({ queryKey: [USER_QUERY_KEY] });
      // Also invalidate events as users registeredEvents might change
      queryClient.invalidateQueries({ queryKey: ["events"] });
    },
  });
};
