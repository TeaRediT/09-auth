"use client";

import { cheackSession, getMe } from "@/lib/api/clientApi";
import { useAuthStore } from "@/lib/store/authStore";
import { useEffect } from "react";

interface AuthProviderProps {
  children: React.ReactNode;
}

const AuthProvider = ({ children }: AuthProviderProps) => {
  const setUser = useAuthStore((state) => state.setUser);
  const clearIsAuthenticated = useAuthStore(
    (state) => state.clearIsAuthenticated,
  );

  useEffect(() => {
    const fetchUser = async () => {
      const isAuthenticated = await cheackSession();
      if (isAuthenticated) {
        const user = await getMe();
        if (user) setUser(user);
        else {
          clearIsAuthenticated();
        }
      }
    };
    fetchUser();
  }, [clearIsAuthenticated, setUser]);

  return children;
};

export default AuthProvider;
