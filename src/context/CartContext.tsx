import { createContext, useState, useEffect, type ReactNode } from "react";
import * as cartService from "../services/cartService";

interface CartItem {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product) => Promise<void>;
  removeFromCart: (id: number) => Promise<void>;
  updateQuantity: (id: number, quantity: number) => Promise<void>;
  clearCart: () => Promise<void>;
  totalPrice: () => number;
}

// eslint-disable-next-line react-refresh/only-export-components
export const CartContext = createContext<CartContextType | undefined>(
  undefined,
);

// eslint-disable-next-line react-refresh/only-export-components

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [_loading, setLoading] = useState(false);

  useEffect(() => {
    // load cart from service
    const load = async () => {
      setLoading(true);
      try {
        const items = await cartService.getCart();
        setCart(items);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const syncCart = (items: CartItem[]) => {
    setCart(items);
  };

  const addToCart = async (product: Product) => {
    const items = await cartService.addToCart(product);
    syncCart(items);
  };

  const removeFromCart = async (id: number) => {
    const items = await cartService.removeFromCart(id);
    syncCart(items);
  };

  const updateQuantity = async (id: number, quantity: number) => {
    const items = await cartService.updateQuantity(id, quantity);
    syncCart(items);
  };

  const clearCart = async () => {
    const items = await cartService.clearCart();
    syncCart(items);
  };

  const totalPrice = () => cartService.totalPrice(cart);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
