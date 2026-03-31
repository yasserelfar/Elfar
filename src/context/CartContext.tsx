import { createContext, useState, useEffect, type ReactNode } from "react";
import * as cartService from "../services/cartService";
import type { Product } from "../services/productService";

interface CartItem {
  product: Product;
  quantity: number;
}

interface CartContextType {
  cart: CartItem[];
  loading: boolean;
  addToCart: (productId: string) => Promise<void>;
  removeFromCart: (productId: string) => Promise<void>;
  updateQuantity: (productId: string, quantity: number) => Promise<void>;
  clearCart: () => Promise<void>;
  totalPrice: () => number;
  refreshCart: () => Promise<void>;
}

// eslint-disable-next-line react-refresh/only-export-components
export const CartContext = createContext<CartContextType | undefined>(
  undefined,
);

// eslint-disable-next-line react-refresh/only-export-components

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(false);

  const refreshCart = async () => {
    setLoading(true);
    try {
      const cartData = await cartService.getCart();
      setCart(cartData.items);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshCart();
  }, []);

  const syncCart = (cartResponse: cartService.CartResponse) => {
    setCart(cartResponse.items);
  };

  const addToCart = async (productId: string) => {
    const cartResponse = await cartService.addToCart(productId);
    syncCart(cartResponse);
  };

  const removeFromCart = async (productId: string) => {
    const cartResponse = await cartService.removeFromCart(productId);
    syncCart(cartResponse);
  };

  const updateQuantity = async (productId: string, quantity: number) => {
    const cartResponse = await cartService.updateCartItemQuantity(
      productId,
      quantity,
    );
    syncCart(cartResponse);
  };

  const clearCart = async () => {
    const cartResponse = await cartService.clearCart();
    syncCart(cartResponse);
  };

  const totalPrice = () => cartService.totalPrice(cart);

  return (
    <CartContext.Provider
      value={{
        cart,
        loading,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalPrice,
        refreshCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
