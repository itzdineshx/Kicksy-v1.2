import { TrendingUp, TrendingDown, AlertTriangle, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface SmartPriceTagProps {
  price: string;
  originalPrice?: string;
  priceChange?: "up" | "down" | "stable";
  deal?: "flash" | "early-bird" | "last-chance" | "special";
  className?: string;
}

const SmartPriceTags = ({ 
  price, 
  originalPrice, 
  priceChange = "stable", 
  deal,
  className = ""
}: SmartPriceTagProps) => {
  const getPriceChangeIcon = () => {
    switch (priceChange) {
      case "up":
        return <TrendingUp className="w-3 h-3" />;
      case "down":
        return <TrendingDown className="w-3 h-3" />;
      default:
        return null;
    }
  };

  const getPriceChangeColor = () => {
    switch (priceChange) {
      case "up":
        return "text-red-500";
      case "down":
        return "text-green-500";
      default:
        return "text-muted-foreground";
    }
  };

  const getDealBadge = () => {
    switch (deal) {
      case "flash":
        return (
          <Badge variant="destructive" className="animate-deal-flash bg-red-500/10 text-red-500 border-red-500/20 shadow-glow">
            <Sparkles className="w-3 h-3 mr-1 animate-spin-slow" />
            Flash Sale!
          </Badge>
        );
      case "early-bird":
        return (
          <Badge className="bg-primary/10 text-primary border-primary/20 hover:bg-primary/20 transition-all duration-300">
            <TrendingDown className="w-3 h-3 mr-1 animate-bounce-gentle" />
            Early Bird
          </Badge>
        );
      case "last-chance":
        return (
          <Badge variant="secondary" className="bg-orange-500/10 text-orange-500 border-orange-500/20 animate-attention-bounce shadow-floating">
            <AlertTriangle className="w-3 h-3 mr-1 animate-wiggle" />
            Last Chance
          </Badge>
        );
      case "special":
        return (
          <Badge className="bg-gradient-primary text-primary-foreground hover:shadow-glow transition-all duration-300">
            <Sparkles className="w-3 h-3 mr-1 animate-pulse-glow" />
            Special Deal
          </Badge>
        );
      default:
        return null;
    }
  };

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className="flex items-center gap-2">
        <span className={`text-xl font-bold text-primary transition-all duration-300 ${
          priceChange === "down" ? "animate-price-pulse" : ""
        }`}>
          {price}
        </span>
        {originalPrice && (
          <span className="text-sm text-muted-foreground line-through opacity-60 hover:opacity-100 transition-opacity">
            {originalPrice}
          </span>
        )}
        {priceChange !== "stable" && (
          <div className={`flex items-center gap-1 text-xs ${getPriceChangeColor()} animate-fade-in-up`}>
            <div className="animate-micro-bounce">
              {getPriceChangeIcon()}
            </div>
            <span className="font-medium animate-slide-up">
              {priceChange === "up" ? "Price Updated!" : "Price Drop!"}
            </span>
          </div>
        )}
      </div>
      {deal && (
        <div className="animate-scale-in">
          {getDealBadge()}
        </div>
      )}
    </div>
  );
};

export default SmartPriceTags;