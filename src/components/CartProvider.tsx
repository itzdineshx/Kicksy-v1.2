import React, { createContext, useContext, useState } from "react";
import { useToast } from "@/hooks/use-toast";

interface CartItem {
  id: number;
  eventId: string;
  title: string;
  date: string;
  venue: string;
  price: string;
  quantity: number;
  seats?: string[];
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (item: Omit<CartItem, 'quantity'>) => void;
  removeFromCart: (itemId: number) => void;
  updateQuantity: (itemId: number, quantity: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
  isInCart: (eventId: string) => boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const { toast } = useToast();

  const addToCart = (item: Omit<CartItem, 'quantity'>) => {
    const existingItem = cart.find(cartItem => cartItem.eventId === item.eventId);
    
    if (existingItem) {
      setCart(prev => 
        prev.map(cartItem => 
          cartItem.eventId === item.eventId 
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        )
      );
      toast({
        title: "Quantity Updated 🛒",
        description: `${item.title} quantity increased in cart`,
      });
    } else {
      const newItem = { ...item, quantity: 1 };
      setCart(prev => [...prev, newItem]);
      toast({
        title: "Added to Cart 🛒",
        description: `${item.title} has been added to your cart`,
      });
    }
  };

  const removeFromCart = (itemId: number) => {
    const item = cart.find(cartItem => cartItem.id === itemId);
    setCart(prev => prev.filter(cartItem => cartItem.id !== itemId));
    if (item) {
      toast({
        title: "Removed from Cart",
        description: `${item.title} has been removed from your cart`,
      });
    }
  };

  const updateQuantity = (itemId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(itemId);
      return;
    }
    
    setCart(prev => 
      prev.map(cartItem => 
        cartItem.id === itemId 
          ? { ...cartItem, quantity }
          : cartItem
      )
    );
  };

  const clearCart = () => {
    setCart([]);
    toast({
      title: "Cart Cleared",
      description: "All items have been removed from your cart",
    });
  };

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => {
      const price = parseInt(item.price.replace(/[₹,]/g, ''));
      return total + (price * item.quantity);
    }, 0);
  };

  const isInCart = (eventId: string) => {
    return cart.some(item => item.eventId === eventId);
  };

  return (
    <CartContext.Provider value={{
      cart,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      getTotalItems,
      getTotalPrice,
      isInCart
    }}>
      {children}
    </CartContext.Provider>
  );
};