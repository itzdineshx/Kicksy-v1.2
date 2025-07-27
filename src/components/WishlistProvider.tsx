import React, { createContext, useContext, useState } from "react";
import { useToast } from "@/hooks/use-toast";

interface Event {
  id: number;
  title: string;
  date: string;
  venue: string;
  price: string;
  category: string;
}

interface WishlistContextType {
  wishlist: Event[];
  addToWishlist: (event: Event) => void;
  removeFromWishlist: (eventId: number) => void;
  isInWishlist: (eventId: number) => boolean;
  clearWishlist: () => void;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error("useWishlist must be used within a WishlistProvider");
  }
  return context;
};

export const WishlistProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [wishlist, setWishlist] = useState<Event[]>([]);
  const { toast } = useToast();

  const addToWishlist = (event: Event) => {
    if (!isInWishlist(event.id)) {
      setWishlist(prev => [...prev, event]);
      toast({
        title: "Added to Wishlist ❤️",
        description: `${event.title} has been added to your wishlist`,
      });
    }
  };

  const removeFromWishlist = (eventId: number) => {
    const event = wishlist.find(e => e.id === eventId);
    setWishlist(prev => prev.filter(item => item.id !== eventId));
    if (event) {
      toast({
        title: "Removed from Wishlist",
        description: `${event.title} has been removed from your wishlist`,
      });
    }
  };

  const isInWishlist = (eventId: number) => {
    return wishlist.some(item => item.id === eventId);
  };

  const clearWishlist = () => {
    setWishlist([]);
    toast({
      title: "Wishlist Cleared",
      description: "All items have been removed from your wishlist",
    });
  };

  return (
    <WishlistContext.Provider value={{
      wishlist,
      addToWishlist,
      removeFromWishlist,
      isInWishlist,
      clearWishlist
    }}>
      {children}
    </WishlistContext.Provider>
  );
};