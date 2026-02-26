import { createContext, useContext, useState, type ReactNode } from "react";

export interface User {
  email: string;
  password: string;
  role: "admin" | "user";
  name?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (user: User, rememberMe: boolean) => void;
  logout: () => void;
  register: (user: User) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  // Initialize state from storage
  const initializeUser = (): [User | null, boolean] => {
    const userStr =
      localStorage.getItem("user") || sessionStorage.getItem("user");
    const storedUser = userStr ? JSON.parse(userStr) : null;
    return [storedUser, !!storedUser];
  };

  const [initialUser, initialAuth] = initializeUser();
  const [user, setUser] = useState<User | null>(initialUser);
  const [isAuthenticated, setIsAuthenticated] = useState(initialAuth);

  const login = (user: User, rememberMe: boolean) => {
    setUser(user);
    setIsAuthenticated(true);

    if (rememberMe) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      sessionStorage.setItem("user", JSON.stringify(user));
    }
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem("user");
    sessionStorage.removeItem("user");
  };

  const register = (user: User) => {
    const usersStr = localStorage.getItem("users");
    const users = usersStr
      ? JSON.parse(usersStr)
      : [{ email: "admin@gmail.com", password: "123456", role: "admin" }];

    // Check if user already exists
    if (users.some((u: User) => u.email === user.email)) {
      throw new Error("User with this email already exists");
    }

    users.push(user);
    localStorage.setItem("users", JSON.stringify(users));
  };

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, login, logout, register }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
