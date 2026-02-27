import { createContext, useState, useEffect, type ReactNode } from "react";

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
  setCart: (cart: CartItem[]) => void;
  addToCart: (product: Product) => void;
  clearCart: () => void;
}

// eslint-disable-next-line react-refresh/only-export-components
export const CartContext = createContext<CartContextType | undefined>(
  undefined,
);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    const storedCart = localStorage.getItem("guestCart");
    return storedCart ? JSON.parse(storedCart) : [];
  });

  // حفظ الكارت دايمًا
  useEffect(() => {
    localStorage.setItem("guestCart", JSON.stringify(cart));
  }, [cart]);

  // إضافة منتج
  const addToCart = (product: Product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);

      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }

      return [...prev, { ...product, quantity: 1 }];
    });
  };

  // مسح الكارت
  const clearCart = () => {
    setCart([]);
    localStorage.removeItem("guestCart");
  };
  

  return (
    <CartContext.Provider value={{ cart, setCart, addToCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};
