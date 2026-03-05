"use client";

import { cheackSession, getMe } from "@/lib/api/clientApi";
import { useAuthStore } from "@/lib/store/authStore";
import { useEffect, useState } from "react";

interface AuthProviderProps {
  children: React.ReactNode;
}

const AuthProvider = ({ children }: AuthProviderProps) => {
  const setUser = useAuthStore((state) => state.setUser);
  const clearIsAuthenticated = useAuthStore(
    (state) => state.clearIsAuthenticated,
  );
  const [isCheacking, setIsCheacking] = useState<boolean>(false);

  useEffect(() => {
    const fetchUser = async () => {
      setIsCheacking(true);
      const isAuthenticated = await cheackSession();
      if (isAuthenticated.success) {
        const user = await getMe();
        if (user) setUser(user);
        else {
          clearIsAuthenticated();
        }
      }
      setIsCheacking(false);
    };
    fetchUser();
  }, [clearIsAuthenticated, setUser]);

  return isCheacking ? <p>Loading...</p> : children;
};

export default AuthProvider;
