// Mock cart service
// import api from "./api"; // axios instance for real backend
import type { Product } from "./productService";

export interface CartItem extends Product {
  quantity: number;
}

let cart: CartItem[] = [];

const delay = (ms = 300) => new Promise((res) => setTimeout(res, ms));

export const getCart = async (): Promise<CartItem[]> => {
  await delay();
  // read from localStorage for persistence
  const stored = localStorage.getItem("cart");
  if (stored) {
    cart = JSON.parse(stored);
  }
  return [...cart];
};

const persist = () => {
  localStorage.setItem("cart", JSON.stringify(cart));
};

export const addToCart = async (product: Product): Promise<CartItem[]> => {
  await delay();
  const existing = cart.find((i) => i.id === product.id);
  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }
  persist();
  return [...cart];
};

export const removeFromCart = async (id: number): Promise<CartItem[]> => {
  await delay();
  cart = cart.filter((i) => i.id !== id);
  persist();
  return [...cart];
};

export const updateQuantity = async (
  id: number,
  quantity: number,
): Promise<CartItem[]> => {
  await delay();
  cart = cart.map((i) => (i.id === id ? { ...i, quantity } : i));
  cart = cart.filter((i) => i.quantity > 0);
  persist();
  return [...cart];
};

export const clearCart = async (): Promise<CartItem[]> => {
  await delay();
  cart = [];
  persist();
  return [...cart];
};

export const totalPrice = (items: CartItem[]) =>
  items.reduce((sum, i) => sum + i.price * i.quantity, 0);

export default {
  getCart,
  addToCart,
  removeFromCart,
  updateQuantity,
  clearCart,
  totalPrice,
};
