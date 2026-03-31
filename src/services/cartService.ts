// Cart service using real backend API
import api from "./api";
import type { Product } from "./productService";

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface CartResponse {
  items: CartItem[];
  total: number;
}

export const getCart = async (): Promise<CartResponse> => {
  const response = await api.get("/cart");
  return response.data;
};

export const addToCart = async (productId: string): Promise<CartResponse> => {
  const response = await api.post("/cart", { productId });
  return response.data;
};

export const updateCartItemQuantity = async (
  productId: string,
  quantity: number,
): Promise<CartResponse> => {
  const response = await api.put("/cart", { productId, quantity });
  return response.data;
};

export const removeFromCart = async (
  productId: string,
): Promise<CartResponse> => {
  const response = await api.delete("/cart", { data: { productId } });
  return response.data;
};

export const clearCart = async (): Promise<CartResponse> => {
  const response = await api.delete("/cart/clear");
  return response.data;
};

export const totalPrice = (items: CartItem[]) =>
  items.reduce((sum, i) => sum + i.product.price * i.quantity, 0);

export default {
  getCart,
  addToCart,
  updateCartItemQuantity,
  removeFromCart,
  clearCart,
  totalPrice,
};
