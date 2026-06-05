import { useActor } from "@caffeineai/core-infrastructure";
import { useInternetIdentity } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createActor } from "../backend";

const ADMIN_KEY = ["auth", "isAdmin"] as const;

/**
 * Wraps Internet Identity login/logout and backend admin-status queries.
 * - `login()` calls backend.login() (which bootstraps the first-user admin)
 * - `checkIsAdmin()` is cached per principal
 * - `logout()` clears identity and resets auth state
 */
export function useAuth() {
  const { loginStatus, login, clear, identity } = useInternetIdentity();
  const { actor, isFetching } = useActor(createActor);
  const queryClient = useQueryClient();

  const isAuthenticated = loginStatus === "success";
  const principal = identity?.getPrincipal().toText() ?? null;

  // Query admin status — only when actor is ready and user is logged in
  const { data: isAdmin = false, isLoading: isAdminLoading } =
    useQuery<boolean>({
      queryKey: [...ADMIN_KEY, principal],
      queryFn: async () => {
        if (!actor) return false;
        return actor.checkIsAdmin();
      },
      enabled: isAuthenticated && !!actor && !isFetching,
      staleTime: 60_000,
    });

  // Login mutation: calls II login then backend login() to bootstrap admin
  const loginMutation = useMutation({
    mutationFn: async () => {
      await login();
      // After II login the actor will be re-initialized; backend.login() is
      // called via the post-login effect below when actor becomes available.
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ADMIN_KEY });
    },
  });

  // Once authenticated and actor is ready, register user in backend
  const { data: _loginResult } = useQuery<boolean>({
    queryKey: ["auth", "backendLogin", principal],
    queryFn: async () => {
      if (!actor) return false;
      return actor.login();
    },
    enabled: isAuthenticated && !!actor && !isFetching,
    staleTime: Number.POSITIVE_INFINITY, // run once per session
    gcTime: 0,
  });

  function logout() {
    clear();
    queryClient.removeQueries({ queryKey: ADMIN_KEY });
    queryClient.removeQueries({ queryKey: ["auth", "backendLogin"] });
  }

  return {
    isAuthenticated,
    isAdmin,
    isAdminLoading,
    principal,
    login: () => loginMutation.mutate(),
    logout,
    isLoggingIn: loginMutation.isPending || loginStatus === "logging-in",
  };
}
