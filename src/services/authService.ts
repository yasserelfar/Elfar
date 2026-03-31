// Auth service using real backend API
import api from "./api";

export interface User {
  _id?: string;
  name: string;
  email: string;
  phoneNumber?: string;
  isAdmin?: boolean;
  isActive?: boolean;
  createdAt?: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  phoneNumber?: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface UpdateProfileData {
  name?: string;
  email?: string;
  phoneNumber?: string;
}

interface AuthResponse {
  user: User;
  token: string;
}

export const login = async (data: LoginData): Promise<AuthResponse> => {
  const response = await api.post("/users/login", data);
  return response.data;
};

export const register = async (data: RegisterData): Promise<AuthResponse> => {
  const response = await api.post("/users/register", data);
  return response.data;
};

export const fetchCurrentUser = async (userId: string): Promise<User> => {
  const response = await api.get(`/users/${userId}`);
  return response.data;
};

export const updateProfile = async (
  userId: string,
  data: UpdateProfileData,
): Promise<User> => {
  const response = await api.put(`/users/${userId}`, data);
  return response.data;
};

// Admin functions
export const getAllUsers = async (
  page = 1,
  limit = 10,
): Promise<{ users: User[]; total: number }> => {
  const response = await api.get(`/users?page=${page}&limit=${limit}`);
  return response.data;
};

export const addAdmin = async (data: RegisterData): Promise<User> => {
  const response = await api.post("/users/addadmin", data);
  return response.data;
};

export const deactivateUser = async (userId: string): Promise<User> => {
  const response = await api.put(`/users/deactivate/${userId}`);
  return response.data;
};

export default {
  login,
  register,
  fetchCurrentUser,
  updateProfile,
  getAllUsers,
  addAdmin,
  deactivateUser,
};
