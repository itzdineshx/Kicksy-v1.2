import React from "react";
import { Button } from "@/components/ui/button";
import { Heart, ShoppingCart } from "lucide-react";
import { useWishlist } from "@/components/WishlistProvider";
import { useCart } from "@/components/CartProvider";

interface Event {
  id: number;
  title: string;
  date: string;
  venue: string;
  price: string;
  category: string;
}

interface CartWishlistActionsProps {
  event: Event;
  variant?: "default" | "outline" | "ghost";
  size?: "default" | "sm" | "lg";
}

export const CartWishlistActions: React.FC<CartWishlistActionsProps> = ({ 
  event, 
  variant = "outline", 
  size = "sm" 
}) => {
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const { addToCart, isInCart } = useCart();

  const inWishlist = isInWishlist(event.id);
  const inCartCheck = isInCart(event.id.toString());

  const handleWishlistToggle = () => {
    if (inWishlist) {
      removeFromWishlist(event.id);
    } else {
      addToWishlist(event);
    }
  };

  const handleAddToCart = () => {
    addToCart({
      id: Date.now(),
      eventId: event.id.toString(),
      title: event.title,
      date: event.date,
      venue: event.venue,
      price: event.price,
    });
  };

  return (
    <div className="flex gap-2">
      <Button
        variant={variant}
        size={size}
        onClick={handleWishlistToggle}
        className={`${inWishlist ? 'text-red-500 border-red-500' : ''}`}
      >
        <Heart className={`h-4 w-4 ${inWishlist ? 'fill-current' : ''}`} />
      </Button>
      
      <Button
        variant={variant}
        size={size}
        onClick={handleAddToCart}
        disabled={inCartCheck}
        className={`${inCartCheck ? 'opacity-50' : ''}`}
      >
        <ShoppingCart className="h-4 w-4" />
        {inCartCheck ? 'In Cart' : 'Add'}
      </Button>
    </div>
  );
};