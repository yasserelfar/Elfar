import { createContext, useState, type ReactNode } from "react";
import * as authService from "../services/authService";

export interface User {
  _id?: string;
  name: string;
  email: string;
  phoneNumber?: string;
  isAdmin?: boolean;
  isActive?: boolean;
  createdAt?: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: (email: string, password: string, remember: boolean) => Promise<void>;
  logout: () => void;
  register: (
    name: string,
    email: string,
    password: string,
    phoneNumber?: string,
  ) => Promise<void>;
  updateProfile: (data: authService.UpdateProfileData) => Promise<User>;
  fetchCurrentUser: () => Promise<void>;
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
      const resp = await authService.login({ email, password });
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

  const register = async (
    name: string,
    email: string,
    password: string,
    phoneNumber?: string,
  ) => {
    try {
      const resp = await authService.register({
        name,
        email,
        password,
        phoneNumber,
      });
      setUser(resp.user);
      setToken(resp.token);
      setIsAuthenticated(true);
      localStorage.setItem("user", JSON.stringify(resp.user));
      localStorage.setItem("token", resp.token);
    } catch (e) {
      throw e;
    }
  };

  const updateProfile = async (data: authService.UpdateProfileData) => {
    if (!user?._id) throw new Error("User not authenticated");
    try {
      const updatedUser = await authService.updateProfile(user._id, data);
      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));
      return updatedUser;
    } catch (e) {
      throw e;
    }
  };

  const fetchCurrentUser = async () => {
    if (!user?._id) return;
    try {
      const currentUser = await authService.fetchCurrentUser(user._id);
      setUser(currentUser);
      localStorage.setItem("user", JSON.stringify(currentUser));
    } catch (e) {
      // If fetch fails, logout
      logout();
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
        fetchCurrentUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
