// Order service using real backend API
import api from "./api";
import type { Product } from "./productService";

export interface OrderItem {
  product: Product;
  quantity: number;
  price: number; // price at time of order
}

export interface Order {
  _id?: string;
  id?: string;
  user: string; // user ID
  items: OrderItem[];
  total: number;
  shippingAddress: string;
  paymentMethod: string;
  status: "Pending" | "Processing" | "Shipped" | "Delivered" | "Cancelled";
  createdAt: string;
  updatedAt: string;
}

export interface CreateOrderData {
  shippingAddress: string;
  paymentMethod: string;
}

export interface UpdateOrderStatusData {
  status: "Pending" | "Processing" | "Shipped" | "Delivered" | "Cancelled";
}

export const createOrder = async (data: CreateOrderData): Promise<Order> => {
  const response = await api.post("/orders", data);
  return response.data;
};

export const getMyOrders = async (): Promise<Order[]> => {
  const response = await api.get("/orders");
  return response.data;
};

export const getAllOrders = async (): Promise<Order[]> => {
  const response = await api.get("/orders/all");
  return response.data;
};

export const updateOrderStatus = async (
  orderId: string,
  data: UpdateOrderStatusData,
): Promise<Order> => {
  const response = await api.patch(`/orders/${orderId}/status`, data);
  return response.data;
};

export default {
  createOrder,
  getMyOrders,
  getAllOrders,
  updateOrderStatus,
};
