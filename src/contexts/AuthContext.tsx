import { createContext, useContext, useState, useCallback, type ReactNode } from "react";
import type { UserProfile, AuthTokenPayload } from "@/lib/types";

interface AuthState {
  token: string | null;
  user: UserProfile | null;
  isLoggedIn: boolean;
}

interface AuthContextValue extends AuthState {
  login: (token: string, user: UserProfile) => void;
  logout: () => void;
  updateUser: (partial: Partial<UserProfile>) => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be inside AuthProvider");
  return ctx;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [state, setState] = useState<AuthState>({
    token: null,
    user: null,
    isLoggedIn: false,
  });

  const login = useCallback((token: string, user: UserProfile) => {
    setState({ token, user, isLoggedIn: true });
  }, []);

  const logout = useCallback(() => {
    setState({ token: null, user: null, isLoggedIn: false });
  }, []);

  const updateUser = useCallback((partial: Partial<UserProfile>) => {
    setState((prev) => ({
      ...prev,
      user: prev.user ? { ...prev.user, ...partial } : null,
    }));
  }, []);

  return (
    <AuthContext.Provider value={{ ...state, login, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};
