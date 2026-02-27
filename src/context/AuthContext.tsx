import { createContext, useState, type ReactNode } from "react";
import * as authService from "../services/authService";

export interface User {
  name?: string;
  email: string;
  phone?: string;
  password: string;
  isAdmin: boolean;
  isActive: boolean;
  createdAt: number; // timestamp
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: (email: string, password: string, remember: boolean) => Promise<void>;
  logout: () => void;
  register: (user: User) => Promise<void>;
  updateProfile: (user: User) => Promise<User>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export { AuthContext };

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  // Initialize state from storage
  const initializeUser = (): [User | null, string | null] => {
    const userStr = localStorage.getItem("user");
    const token = localStorage.getItem("token");
    const storedUser = userStr ? JSON.parse(userStr) : null;
    return [storedUser, token];
  };

  const [initialUser, initialToken] = initializeUser();
  const [user, setUser] = useState<User | null>(initialUser);
  const [token, setToken] = useState<string | null>(initialToken);
  const [isAuthenticated, setIsAuthenticated] = useState(!!initialToken);
  const isAdmin = user?.isAdmin || false;

  const login = async (
    email: string,
    password: string,
    rememberMe: boolean,
  ) => {
    try {
      const resp = await authService.login(email, password);
      setUser(resp.user);
      setToken(resp.token);
      setIsAuthenticated(true);
      localStorage.setItem("user", JSON.stringify(resp.user));
      localStorage.setItem("token", resp.token);
      if (!rememberMe) {
        sessionStorage.setItem("token", resp.token);
      }
    } catch (e) {
      throw e;
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    setIsAuthenticated(false);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    sessionStorage.removeItem("token");
  };

  const register = async (user: User) => {
    try {
      const resp = await authService.register(user);
      setUser(resp.user);
      setToken(resp.token);
      setIsAuthenticated(true);
      localStorage.setItem("user", JSON.stringify(resp.user));
      localStorage.setItem("token", resp.token);
    } catch (e) {
      throw e;
    }
  };

  const updateProfile = async (updatedUser: User) => {
    try {
      const user = await authService.updateProfile(updatedUser);
      setUser(user);
      localStorage.setItem("user", JSON.stringify(user));
      return user;
    } catch (e) {
      throw e;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated,
        isAdmin,
        login,
        logout,
        register,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
