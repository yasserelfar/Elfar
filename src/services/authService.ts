// Mock auth service simulating backend
// We'll export types and async functions. Replace with axios calls later.

// import api from "./api"; // axios instance available for future use

export interface User {
  name?: string;
  email: string;
  phone?: string;
  password: string;
  isAdmin: boolean;
  isActive: boolean;
  createdAt: number;
}

interface AuthResponse {
  user: User;
  token: string;
}

// People data stored in localStorage for now
const getStoredUsers = (): User[] => {
  const str = localStorage.getItem("users");
  return str
    ? JSON.parse(str)
    : [
        {
          name: "Admins",
          email: "admin@gmail.com",
          phone: "",
          password: "123456",
          isAdmin: true,
          isActive: true,
          createdAt: Date.now(),
        },
      ];
};

const saveUsers = (users: User[]) => {
  localStorage.setItem("users", JSON.stringify(users));
};

// simulate network latency
const delay = (ms = 500) => new Promise((resolve) => setTimeout(resolve, ms));

export const login = async (
  email: string,
  password: string,
): Promise<AuthResponse> => {
  await delay();
  const users = getStoredUsers();
  const user = users.find((u) => u.email === email && u.password === password);
  if (!user) {
    throw new Error("Invalid credentials");
  }
  const token = "mock-token-" + Date.now();
  return { user, token };
};

export const register = async (newUser: User): Promise<AuthResponse> => {
  await delay();
  const users = getStoredUsers();
  if (users.some((u) => u.email === newUser.email)) {
    throw new Error("User already exists");
  }
  users.push(newUser);
  saveUsers(users);
  const token = "mock-token-" + Date.now();
  return { user: newUser, token };
};

export const updateProfile = async (updated: User): Promise<User> => {
  await delay();
  const users = getStoredUsers();
  const idx = users.findIndex((u) => u.email === updated.email);
  if (idx >= 0) {
    users[idx] = updated;
    saveUsers(users);
  }
  return updated;
};

// future functions could call api
export const fetchCurrentUser = async (): Promise<User> => {
  // placeholder; with real backend, use token to fetch
  await delay();
  const userStr = localStorage.getItem("user");
  if (!userStr) {
    throw new Error("No user");
  }
  return JSON.parse(userStr);
};

export default {
  login,
  register,
  updateProfile,
  fetchCurrentUser,
};
