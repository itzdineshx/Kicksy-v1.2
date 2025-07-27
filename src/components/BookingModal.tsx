import { useState } from "react";
import { Calendar, MapPin, Users, CreditCard, Clock, Star, X, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import PaymentModal from "./PaymentModal";
import { useWishlist } from "./WishlistProvider";
import InteractiveSeatMap from "./InteractiveSeatMap";

interface Event {
  id: number;
  title: string;
  subtitle?: string;
  teams?: string;
  date: string;
  time: string;
  venue: string;
  price: string;
  originalPrice?: string;
  category: string;
  rating?: number;
  attendance?: string;
  image?: string;
}

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  event: Event | null;
}

const BookingModal = ({ isOpen, onClose, event }: BookingModalProps) => {
  const [selectedSeats, setSelectedSeats] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState("premium");
  const [showPayment, setShowPayment] = useState(false);
  const [userDetails, setUserDetails] = useState({
    name: "",
    email: "",
    phone: ""
  });
  const { toast } = useToast();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

  if (!event) return null;

  const seatCategories = [
    { id: "vip", name: "VIP", price: 2500, available: 12, description: "Best view, premium amenities" },
    { id: "premium", name: "Premium", price: 1500, available: 45, description: "Great view, good amenities" },
    { id: "regular", name: "Regular", price: 800, available: 156, description: "Standard seating" },
    { id: "economy", name: "Economy", price: 400, available: 289, description: "Budget-friendly option" }
  ];

  const selectedCategoryData = seatCategories.find(cat => cat.id === selectedCategory);
  const totalPrice = (selectedCategoryData?.price || 0) * selectedSeats;
  const convenienceFee = Math.round(totalPrice * 0.1);
  const finalPrice = totalPrice + convenienceFee;

  const handleBooking = () => {
    if (!userDetails.name || !userDetails.email || !userDetails.phone) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required details",
        variant: "destructive"
      });
      return;
    }

    setShowPayment(true);
  };

  const handleWishlist = () => {
    if (!event) return;
    
    const wishlistEvent = {
      id: event.id,
      title: event.title,
      date: event.date,
      venue: event.venue,
      price: event.price,
      category: event.category
    };

    if (isInWishlist(event.id)) {
      removeFromWishlist(event.id);
    } else {
      addToWishlist(wishlistEvent);
    }
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold bg-gradient-sports bg-clip-text text-transparent">
              Book Your Tickets
            </DialogTitle>
            <div className="absolute right-4 top-4 flex gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={handleWishlist}
                className={`${isInWishlist(event?.id || 0) ? 'text-red-500' : 'text-muted-foreground'} hover:text-red-500 transition-colors`}
              >
                <Heart className={`w-4 h-4 ${isInWishlist(event?.id || 0) ? 'fill-current' : ''}`} />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </DialogHeader>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Event Details */}
          <div className="space-y-6">
            <Card className="border-0 bg-gradient-card">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <Badge className="bg-primary/10 text-primary">
                    {event.category}
                  </Badge>
                  {event.rating && (
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium">{event.rating}</span>
                    </div>
                  )}
                </div>

                <h3 className="text-xl font-bold mb-2">{event.title}</h3>
                {event.subtitle && (
                  <p className="text-muted-foreground mb-4">{event.subtitle}</p>
                )}
                {event.teams && (
                  <p className="text-muted-foreground mb-4">{event.teams}</p>
                )}

                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Calendar className="w-5 h-5 text-primary" />
                    <div>
                      <p className="font-medium">{event.date}</p>
                      <p className="text-sm text-muted-foreground">{event.time}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <MapPin className="w-5 h-5 text-primary" />
                    <div>
                      <p className="font-medium">{event.venue}</p>
                    </div>
                  </div>
                  
                  {event.attendance && (
                    <div className="flex items-center gap-3">
                      <Users className="w-5 h-5 text-primary" />
                      <div>
                        <p className="font-medium">Capacity: {event.attendance}</p>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Seat Selection */}
            <Card className="border-0 bg-gradient-card">
              <CardContent className="p-6">
                <h4 className="text-lg font-semibold mb-4">Select Seat Category</h4>
                
                <div className="grid grid-cols-1 gap-3">
                  {seatCategories.map((category) => (
                    <div
                      key={category.id}
                      className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-300 ${
                        selectedCategory === category.id
                          ? "border-primary bg-primary/5"
                          : "border-border hover:border-primary/50"
                      }`}
                      onClick={() => setSelectedCategory(category.id)}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <h5 className="font-semibold">{category.name}</h5>
                          <p className="text-sm text-muted-foreground">{category.description}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-primary">₹{category.price}</p>
                          <p className="text-sm text-muted-foreground">{category.available} available</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6">
                  <Label htmlFor="seats">Number of Seats</Label>
                  <Select value={selectedSeats.toString()} onValueChange={(value) => setSelectedSeats(parseInt(value))}>
                    <SelectTrigger className="mt-2">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {[1,2,3,4,5,6,7,8].map(num => (
                        <SelectItem key={num} value={num.toString()}>{num} {num === 1 ? 'seat' : 'seats'}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Booking Form */}
          <div className="space-y-6">
            {/* User Details */}
            <Card className="border-0 bg-gradient-card">
              <CardContent className="p-6">
                <h4 className="text-lg font-semibold mb-4">Contact Details</h4>
                
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      value={userDetails.name}
                      onChange={(e) => setUserDetails(prev => ({ ...prev, name: e.target.value }))}
                      placeholder="Enter your full name"
                      className="mt-2"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={userDetails.email}
                      onChange={(e) => setUserDetails(prev => ({ ...prev, email: e.target.value }))}
                      placeholder="Enter your email"
                      className="mt-2"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input
                      id="phone"
                      value={userDetails.phone}
                      onChange={(e) => setUserDetails(prev => ({ ...prev, phone: e.target.value }))}
                      placeholder="Enter your phone number"
                      className="mt-2"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Price Breakdown */}
            <Card className="border-0 bg-gradient-card">
              <CardContent className="p-6">
                <h4 className="text-lg font-semibold mb-4">Price Breakdown</h4>
                
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>{selectedCategoryData?.name} × {selectedSeats}</span>
                    <span>₹{totalPrice.toLocaleString()}</span>
                  </div>
                  
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>Convenience Fee</span>
                    <span>₹{convenienceFee.toLocaleString()}</span>
                  </div>
                  
                  <Separator />
                  
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total Amount</span>
                    <span className="text-primary">₹{finalPrice.toLocaleString()}</span>
                  </div>
                </div>
                
                <Button 
                  className="w-full mt-6 hover:scale-105 transition-transform duration-300"
                  size="lg"
                  onClick={handleBooking}
                >
                  <CreditCard className="w-4 h-4 mr-2" />
                  Proceed to Payment
                </Button>
                
                <p className="text-xs text-muted-foreground text-center mt-3">
                  Secure payment powered by Razorpay
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </DialogContent>
    </Dialog>

    <PaymentModal
      isOpen={showPayment}
      onClose={() => {
        setShowPayment(false);
        onClose();
      }}
      bookingDetails={event ? {
        eventTitle: event.title,
        seats: selectedSeats,
        category: selectedCategoryData?.name || "Premium",
        totalAmount: finalPrice
      } : null}
    />
    </>
  );
};

export default BookingModal;