import { createContext, useContext, useState, ReactNode } from "react";

interface AuthState {
  isLoggedIn: boolean;
  user: { username: string; avatar: string; isPremium: boolean } | null;
  token: string | null;
  login: (username: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthState | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<AuthState["user"]>(null);
  const [token, setToken] = useState<string | null>(null);

  const login = (username: string) => {
    setIsLoggedIn(true);
    setUser({ username, avatar: username.slice(0, 2).toUpperCase(), isPremium: false });
    setToken(`mock-jwt-${Date.now()}`);
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUser(null);
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
