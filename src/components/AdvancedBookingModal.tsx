import { useState, useEffect } from "react";
import { Calendar, MapPin, Users, CreditCard, Clock, Star, X, Heart, Shield, Gift, Zap, Timer, CheckCircle, AlertTriangle, Share2, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";
import PaymentModal from "./PaymentModal";
import { useWishlist } from "./WishlistProvider";
import { useUserData } from "./UserDataProvider";
import { useLocalStorage, BookingRecord } from "./LocalStorageProvider";
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

interface AdvancedBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  event: Event | null;
}

const AdvancedBookingModal = ({ isOpen, onClose, event }: AdvancedBookingModalProps) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedSeats, setSelectedSeats] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState("premium");
  const [showPayment, setShowPayment] = useState(false);
  const [timeLeft, setTimeLeft] = useState(900); // 15 minutes
  const [seatMapView, setSeatMapView] = useState(false);
  const [recommendedSeats, setRecommendedSeats] = useState<string[]>([]);
  
  const [bookingData, setBookingData] = useState({
    userDetails: {
      name: "",
      email: "",
      phone: "",
      emergencyContact: "",
      specialRequests: ""
    },
    addOns: [] as string[],
    insurance: false,
    newsletter: true,
    smsUpdates: true,
    guestDetails: [] as Array<{name: string, age?: number}>
  });

  const { toast } = useToast();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const { isLoggedIn, userStats, trackActivity } = useUserData();
  const { addBooking } = useLocalStorage();

  // Session timer
  useEffect(() => {
    if (!isOpen) return;
    
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          toast({
            title: "Session Expired",
            description: "Your booking session has expired. Please start over.",
            variant: "destructive"
          });
          onClose();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isOpen, onClose, toast]);

  // Pre-fill user details if logged in
  useEffect(() => {
    if (isLoggedIn) {
      // In a real app, fetch user profile data
      setBookingData(prev => ({
        ...prev,
        userDetails: {
          ...prev.userDetails,
          name: "John Doe", // This would come from user context
          email: "john@example.com",
          phone: "+91 9876543210"
        }
      }));
    }
  }, [isLoggedIn]);

  if (!event) return null;

  const steps = [
    { id: 1, title: 'Seat Selection', icon: Users, description: 'Choose your seats' },
    { id: 2, title: 'Add-ons & Extras', icon: Gift, description: 'Enhance your experience' },
    { id: 3, title: 'Personal Details', icon: Shield, description: 'Contact information' },
    { id: 4, title: 'Review & Payment', icon: CreditCard, description: 'Confirm booking' }
  ];

  const seatCategories = [
    { 
      id: "platinum", 
      name: "Platinum", 
      price: 3500, 
      available: 8, 
      description: "VIP experience with meet & greet", 
      features: ["Best view", "VIP lounge access", "Meet & greet", "Premium food"],
      color: "bg-gradient-to-r from-yellow-400 to-yellow-600",
      popular: false,
      soldPercentage: 90
    },
    { 
      id: "gold", 
      name: "Gold", 
      price: 2500, 
      available: 25, 
      description: "Premium seats with excellent view", 
      features: ["Excellent view", "Premium amenities", "Fast entry", "Complimentary snacks"],
      color: "bg-gradient-to-r from-amber-400 to-amber-600",
      popular: true,
      soldPercentage: 75
    },
    { 
      id: "premium", 
      name: "Premium", 
      price: 1500, 
      available: 89, 
      description: "Great view with good amenities", 
      features: ["Great view", "Good amenities", "Priority entry"],
      color: "bg-gradient-to-r from-blue-400 to-blue-600",
      popular: false,
      soldPercentage: 60
    },
    { 
      id: "regular", 
      name: "Regular", 
      price: 800, 
      available: 234, 
      description: "Standard seating", 
      features: ["Standard view", "Basic amenities"],
      color: "bg-gradient-to-r from-gray-400 to-gray-600",
      popular: false,
      soldPercentage: 40
    },
    { 
      id: "economy", 
      name: "Economy", 
      price: 400, 
      available: 156, 
      description: "Budget-friendly option", 
      features: ["Budget-friendly", "Standard access"],
      color: "bg-gradient-to-r from-green-400 to-green-600",
      popular: false,
      soldPercentage: 30
    }
  ];

  const addOns = [
    {
      id: 'merchandise',
      name: 'Official Team Merchandise',
      price: 899,
      description: 'Limited edition jersey, cap, and team scarf',
      image: '🏆',
      popular: true,
      discount: 15
    },
    {
      id: 'food_premium',
      name: 'Premium Food & Beverage',
      price: 1200,
      description: 'Gourmet meal, premium snacks, and unlimited beverages',
      image: '🍽️',
      popular: true,
      discount: 0
    },
    {
      id: 'parking_vip',
      name: 'VIP Parking',
      price: 500,
      description: 'Reserved parking spot closest to the entrance',
      image: '🚗',
      popular: false,
      discount: 0
    },
    {
      id: 'photo_package',
      name: 'Professional Photo Package',
      price: 750,
      description: 'Professional photos with players and digital album',
      image: '📸',
      popular: false,
      discount: 20
    },
    {
      id: 'transport',
      name: 'Shuttle Service',
      price: 300,
      description: 'Round-trip shuttle from city center',
      image: '🚌',
      popular: false,
      discount: 0
    }
  ];

  const selectedCategoryData = seatCategories.find(cat => cat.id === selectedCategory);
  const basePrice = (selectedCategoryData?.price || 0) * selectedSeats;
  const addOnPrice = addOns
    .filter(addon => bookingData.addOns.includes(addon.id))
    .reduce((sum, addon) => {
      const discountAmount = addon.discount > 0 ? (addon.price * addon.discount / 100) : 0;
      return sum + (addon.price - discountAmount);
    }, 0);
  const insurancePrice = bookingData.insurance ? Math.round(basePrice * 0.05) : 0;
  const convenienceFee = Math.round((basePrice + addOnPrice) * 0.08);
  const gstAmount = Math.round((basePrice + addOnPrice + convenienceFee) * 0.18);
  const finalPrice = basePrice + addOnPrice + insurancePrice + convenienceFee + gstAmount;

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const nextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
      trackActivity('booking_step_completed', { step: currentStep, event_id: event.id });
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleBooking = () => {
    if (!validateStep()) return;
    
    // Add booking to history
    const newBooking: BookingRecord = {
      id: `booking_${Date.now()}`,
      eventId: event.id.toString(),
      eventTitle: event.title,
      eventDate: new Date(`${event.date} ${event.time}`).toISOString(),
      venue: event.venue,
      seats: Array.from({ length: selectedSeats }, (_, i) => `${selectedCategoryData?.name || "Regular"}-${i + 1}`),
      totalAmount: finalPrice,
      status: "confirmed" as const,
      bookingDate: new Date().toISOString(),
      paymentId: `PAY_${Date.now()}`
    };

    addBooking(newBooking);
    trackActivity('booking_completed', { 
      event_id: event.id, 
      seats: selectedSeats, 
      category: selectedCategory,
      total_amount: finalPrice
    });

    setShowPayment(true);
  };

  const validateStep = () => {
    switch (currentStep) {
      case 1:
        if (!selectedCategory || selectedSeats < 1) {
          toast({
            title: "Selection Required",
            description: "Please select seats and category",
            variant: "destructive"
          });
          return false;
        }
        break;
      case 3:
        if (!bookingData.userDetails.name || !bookingData.userDetails.email || !bookingData.userDetails.phone) {
          toast({
            title: "Missing Information",
            description: "Please fill in all required details",
            variant: "destructive"
          });
          return false;
        }
        // Validate guest details if multiple seats
        if (selectedSeats > 1 && bookingData.guestDetails.length !== selectedSeats - 1) {
          toast({
            title: "Guest Details Required",
            description: `Please provide details for all ${selectedSeats - 1} additional guests`,
            variant: "destructive"
          });
          return false;
        }
        break;
    }
    return true;
  };

  const toggleAddOn = (addOnId: string) => {
    setBookingData(prev => ({
      ...prev,
      addOns: prev.addOns.includes(addOnId)
        ? prev.addOns.filter(id => id !== addOnId)
        : [...prev.addOns, addOnId]
    }));
  };

  const updateGuestDetails = (index: number, field: string, value: string) => {
    setBookingData(prev => {
      const newGuestDetails = [...prev.guestDetails];
      if (!newGuestDetails[index]) {
        newGuestDetails[index] = { name: "" };
      }
      newGuestDetails[index] = { ...newGuestDetails[index], [field]: value };
      return { ...prev, guestDetails: newGuestDetails };
    });
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

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6 animate-fade-in">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Select Your Seats</h3>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setSeatMapView(!seatMapView)}
              >
                {seatMapView ? 'List View' : 'Seat Map View'}
              </Button>
            </div>

            {seatMapView ? (
              <div className="bg-gradient-card rounded-lg p-4">
                <InteractiveSeatMap
                  eventId={event.id}
                  onSeatSelect={(seats) => {
                    setSelectedSeats(seats.length);
                    if (seats.length > 0) {
                      setSelectedCategory(seats[0].category);
                    }
                  }}
                />
              </div>
            ) : (
              <>
                {/* Number of Seats */}
                <Card className="border-0 bg-gradient-card">
                  <CardContent className="p-6">
                    <Label className="text-base font-semibold mb-4 block">Number of Seats</Label>
                    <div className="flex items-center gap-4 mb-4">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => setSelectedSeats(Math.max(1, selectedSeats - 1))}
                        disabled={selectedSeats <= 1}
                      >
                        -
                      </Button>
                      <span className="text-2xl font-bold min-w-[3rem] text-center">{selectedSeats}</span>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => setSelectedSeats(Math.min(10, selectedSeats + 1))}
                        disabled={selectedSeats >= 10}
                      >
                        +
                      </Button>
                    </div>
                    <p className="text-sm text-muted-foreground">Maximum 10 seats per booking</p>
                  </CardContent>
                </Card>

                {/* Seat Categories */}
                <div className="space-y-4">
                  <Label className="text-base font-semibold">Seat Categories</Label>
                  {seatCategories.map((category) => (
                    <Card 
                      key={category.id}
                      className={`cursor-pointer border-2 transition-all duration-300 hover:shadow-floating ${
                        selectedCategory === category.id
                          ? "border-primary bg-primary/5 shadow-floating scale-[1.02]"
                          : "border-border hover:border-primary/50"
                      }`}
                      onClick={() => setSelectedCategory(category.id)}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className={`w-6 h-6 rounded-full ${category.color}`} />
                            <div>
                              <div className="flex items-center gap-2 mb-1">
                                <h4 className="font-semibold text-lg">{category.name}</h4>
                                {category.popular && (
                                  <Badge className="bg-primary/10 text-primary animate-pulse">
                                    <Star className="w-3 h-3 mr-1 fill-current" />
                                    Most Popular
                                  </Badge>
                                )}
                              </div>
                              <p className="text-sm text-muted-foreground mb-2">{category.description}</p>
                              <div className="flex flex-wrap gap-2">
                                {category.features.map((feature, idx) => (
                                  <Badge key={idx} variant="secondary" className="text-xs">
                                    <CheckCircle className="w-3 h-3 mr-1" />
                                    {feature}
                                  </Badge>
                                ))}
                              </div>
                              <div className="mt-2">
                                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                  <div className="w-20 bg-muted rounded-full h-1.5">
                                    <div 
                                      className="bg-primary h-1.5 rounded-full transition-all duration-500"
                                      style={{ width: `${category.soldPercentage}%` }}
                                    />
                                  </div>
                                  <span>{category.soldPercentage}% sold</span>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-2xl font-bold text-primary">₹{category.price.toLocaleString()}</div>
                            <div className="text-sm text-muted-foreground">per seat</div>
                            <div className="text-xs text-muted-foreground mt-1">
                              {category.available} available
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* Demand Indicator */}
                {selectedCategoryData && (
                  <Alert className="border-orange-200 bg-orange-50 dark:bg-orange-950/20">
                    <AlertTriangle className="h-4 w-4 text-orange-600" />
                    <AlertDescription className="text-orange-800 dark:text-orange-200">
                      {selectedCategoryData.soldPercentage > 80 
                        ? "⚡ High demand! Only few seats left in this category"
                        : selectedCategoryData.soldPercentage > 60
                        ? "📈 Moderate demand for this category"
                        : "✅ Good availability in this category"
                      }
                    </AlertDescription>
                  </Alert>
                )}
              </>
            )}
          </div>
        );

      case 2:
        return (
          <div className="space-y-6 animate-fade-in">
            <div>
              <h3 className="text-lg font-semibold mb-2">Enhance Your Experience</h3>
              <p className="text-muted-foreground text-sm mb-6">Add optional extras to make your event unforgettable</p>
            </div>

            <div className="grid gap-4">
              {addOns.map((addOn) => {
                const isSelected = bookingData.addOns.includes(addOn.id);
                const discountedPrice = addOn.discount > 0 ? addOn.price - (addOn.price * addOn.discount / 100) : addOn.price;
                
                return (
                  <Card 
                    key={addOn.id}
                    className={`cursor-pointer border-2 transition-all duration-300 hover:shadow-floating ${
                      isSelected
                        ? 'border-primary shadow-floating scale-[1.02] bg-primary/5' 
                        : 'border-border hover:border-primary/50'
                    }`}
                    onClick={() => toggleAddOn(addOn.id)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-3">
                            <div className={`w-5 h-5 rounded border-2 transition-all duration-300 ${
                              isSelected ? 'bg-primary border-primary' : 'border-border'
                            }`}>
                              {isSelected && (
                                <CheckCircle className="w-3 h-3 text-primary-foreground m-0.5" />
                              )}
                            </div>
                            <span className="text-2xl">{addOn.image}</span>
                          </div>
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <h4 className="font-semibold">{addOn.name}</h4>
                              {addOn.popular && (
                                <Badge className="bg-primary/10 text-primary text-xs">Popular</Badge>
                              )}
                              {addOn.discount > 0 && (
                                <Badge className="bg-green-100 text-green-800 text-xs">
                                  {addOn.discount}% OFF
                                </Badge>
                              )}
                            </div>
                            <p className="text-sm text-muted-foreground">{addOn.description}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          {addOn.discount > 0 ? (
                            <div>
                              <div className="text-lg font-bold text-primary">₹{discountedPrice.toLocaleString()}</div>
                              <div className="text-sm text-muted-foreground line-through">₹{addOn.price.toLocaleString()}</div>
                            </div>
                          ) : (
                            <div className="text-lg font-bold text-primary">₹{addOn.price.toLocaleString()}</div>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {/* Insurance Option */}
            <Card className="border-0 bg-gradient-card">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Checkbox
                      id="insurance"
                      checked={bookingData.insurance}
                      onCheckedChange={(checked) => setBookingData(prev => ({ ...prev, insurance: !!checked }))}
                    />
                    <div>
                      <Label htmlFor="insurance" className="font-semibold cursor-pointer">Event Protection Insurance</Label>
                      <p className="text-sm text-muted-foreground">Get full refund if event is cancelled or postponed</p>
                    </div>
                  </div>
                  <div className="text-lg font-bold text-primary">₹{insurancePrice.toLocaleString()}</div>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6 animate-fade-in">
            <div>
              <h3 className="text-lg font-semibold mb-2">Contact & Guest Details</h3>
              <p className="text-muted-foreground text-sm mb-6">We'll use this information for booking confirmation and updates</p>
            </div>

            {/* Primary Contact */}
            <Card className="border-0 bg-gradient-card">
              <CardHeader>
                <CardTitle className="text-base">Primary Contact Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      value={bookingData.userDetails.name}
                      onChange={(e) => setBookingData(prev => ({
                        ...prev,
                        userDetails: { ...prev.userDetails, name: e.target.value }
                      }))}
                      placeholder="Enter your full name"
                      className="mt-2"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={bookingData.userDetails.email}
                      onChange={(e) => setBookingData(prev => ({
                        ...prev,
                        userDetails: { ...prev.userDetails, email: e.target.value }
                      }))}
                      placeholder="Enter your email"
                      className="mt-2"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input
                      id="phone"
                      value={bookingData.userDetails.phone}
                      onChange={(e) => setBookingData(prev => ({
                        ...prev,
                        userDetails: { ...prev.userDetails, phone: e.target.value }
                      }))}
                      placeholder="+91 9876543210"
                      className="mt-2"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="emergency">Emergency Contact</Label>
                    <Input
                      id="emergency"
                      value={bookingData.userDetails.emergencyContact}
                      onChange={(e) => setBookingData(prev => ({
                        ...prev,
                        userDetails: { ...prev.userDetails, emergencyContact: e.target.value }
                      }))}
                      placeholder="+91 9876543210"
                      className="mt-2"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="special-requests">Special Requests</Label>
                  <Input
                    id="special-requests"
                    value={bookingData.userDetails.specialRequests}
                    onChange={(e) => setBookingData(prev => ({
                      ...prev,
                      userDetails: { ...prev.userDetails, specialRequests: e.target.value }
                    }))}
                    placeholder="Wheelchair access, dietary requirements, etc."
                    className="mt-2"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Guest Details for multiple seats */}
            {selectedSeats > 1 && (
              <Card className="border-0 bg-gradient-card">
                <CardHeader>
                  <CardTitle className="text-base">Additional Guest Details ({selectedSeats - 1} guests)</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {Array.from({ length: selectedSeats - 1 }, (_, index) => (
                    <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-muted/30 rounded-lg">
                      <div>
                        <Label htmlFor={`guest-name-${index}`}>Guest {index + 1} Name *</Label>
                        <Input
                          id={`guest-name-${index}`}
                          value={bookingData.guestDetails[index]?.name || ""}
                          onChange={(e) => updateGuestDetails(index, 'name', e.target.value)}
                          placeholder="Enter guest name"
                          className="mt-2"
                        />
                      </div>
                      <div>
                        <Label htmlFor={`guest-age-${index}`}>Age (Optional)</Label>
                        <Input
                          id={`guest-age-${index}`}
                          type="number"
                          value={bookingData.guestDetails[index]?.age || ""}
                          onChange={(e) => updateGuestDetails(index, 'age', e.target.value)}
                          placeholder="Enter age"
                          className="mt-2"
                          min="1"
                          max="100"
                        />
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}

            {/* Communication Preferences */}
            <Card className="border-0 bg-gradient-card">
              <CardHeader>
                <CardTitle className="text-base">Communication Preferences</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="newsletter"
                    checked={bookingData.newsletter}
                    onCheckedChange={(checked) => setBookingData(prev => ({ ...prev, newsletter: !!checked }))}
                  />
                  <Label htmlFor="newsletter" className="cursor-pointer">
                    Subscribe to newsletter for latest updates and offers
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="sms"
                    checked={bookingData.smsUpdates}
                    onCheckedChange={(checked) => setBookingData(prev => ({ ...prev, smsUpdates: !!checked }))}
                  />
                  <Label htmlFor="sms" className="cursor-pointer">
                    Receive SMS updates about your booking
                  </Label>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6 animate-fade-in">
            <div className="text-center">
              <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4 animate-bounce" />
              <h3 className="text-2xl font-bold mb-2">Review Your Booking</h3>
              <p className="text-muted-foreground">Please review all details before completing your booking</p>
            </div>

            {/* Event Summary */}
            <Card className="border-0 bg-gradient-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  Event Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="font-medium">{event.title}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Date & Time</span>
                  <span>{event.date} • {event.time}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Venue</span>
                  <span>{event.venue}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Category</span>
                  <span>{selectedCategoryData?.name}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Seats</span>
                  <span>{selectedSeats} seats</span>
                </div>
              </CardContent>
            </Card>

            {/* Price Breakdown */}
            <Card className="border-0 bg-gradient-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="w-5 h-5" />
                  Price Breakdown
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span>{selectedCategoryData?.name} × {selectedSeats}</span>
                  <span>₹{basePrice.toLocaleString()}</span>
                </div>
                
                {bookingData.addOns.length > 0 && (
                  <>
                    <Separator />
                    <div className="text-sm font-medium text-muted-foreground">Add-ons:</div>
                    {bookingData.addOns.map(addOnId => {
                      const addOn = addOns.find(a => a.id === addOnId);
                      if (!addOn) return null;
                      const discountedPrice = addOn.discount > 0 ? addOn.price - (addOn.price * addOn.discount / 100) : addOn.price;
                      return (
                        <div key={addOnId} className="flex justify-between text-sm">
                          <span>{addOn.name}</span>
                          <span>₹{discountedPrice.toLocaleString()}</span>
                        </div>
                      );
                    })}
                  </>
                )}

                {bookingData.insurance && (
                  <div className="flex justify-between text-sm">
                    <span>Event Protection Insurance</span>
                    <span>₹{insurancePrice.toLocaleString()}</span>
                  </div>
                )}

                <Separator />
                
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>Convenience Fee (8%)</span>
                  <span>₹{convenienceFee.toLocaleString()}</span>
                </div>
                
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>GST (18%)</span>
                  <span>₹{gstAmount.toLocaleString()}</span>
                </div>
                
                <Separator />
                
                <div className="flex justify-between text-xl font-bold">
                  <span>Total Amount</span>
                  <span className="text-primary">₹{finalPrice.toLocaleString()}</span>
                </div>

                {/* Savings indicator */}
                {bookingData.addOns.some(id => addOns.find(a => a.id === id)?.discount || 0 > 0) && (
                  <div className="text-sm text-green-600 font-medium">
                    You saved ₹{addOns.filter(a => bookingData.addOns.includes(a.id) && a.discount > 0)
                      .reduce((sum, a) => sum + (a.price * a.discount / 100), 0).toLocaleString()} on add-ons!
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Important Notes */}
            <Alert>
              <Shield className="h-4 w-4" />
              <AlertDescription>
                <strong>Important:</strong> Tickets are non-refundable except in case of event cancellation. 
                Please review all details carefully before proceeding.
              </AlertDescription>
            </Alert>
          </div>
        );

      default:
        return null;
    }
  };

  const stepProgress = (currentStep / steps.length) * 100;

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-5xl max-h-[95vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold bg-gradient-sports bg-clip-text text-transparent flex items-center gap-3">
              <Zap className="w-6 h-6 text-primary" />
              Advanced Booking System
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
              <Button variant="ghost" size="icon">
                <Share2 className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="icon" onClick={onClose}>
                <X className="w-4 h-4" />
              </Button>
            </div>
          </DialogHeader>

          {/* Header with Event Info and Session Timer */}
          <div className="space-y-4 mb-6">
            <Card className="border-0 bg-gradient-card">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="p-2 bg-primary/10 rounded-full">
                      <Calendar className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg">{event.title}</h3>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {event.date} • {event.time}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          {event.venue}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                      <Timer className="w-4 h-4" />
                      <span>Session expires in</span>
                    </div>
                    <div className={`text-lg font-bold ${timeLeft < 300 ? 'text-red-500 animate-pulse' : 'text-primary'}`}>
                      {formatTime(timeLeft)}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Progress Indicator */}
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span>Step {currentStep} of {steps.length}</span>
                <span>{Math.round(stepProgress)}% Complete</span>
              </div>
              <Progress value={stepProgress} className="h-2" />
              
              <div className="flex justify-between">
                {steps.map((step) => {
                  const Icon = step.icon;
                  const isCompleted = currentStep > step.id;
                  const isCurrent = currentStep === step.id;
                  
                  return (
                    <div 
                      key={step.id}
                      className={`flex flex-col items-center gap-2 transition-all duration-300 ${
                        isCompleted || isCurrent ? 'text-primary' : 'text-muted-foreground'
                      }`}
                    >
                      <div className={`w-10 h-10 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                        isCompleted 
                          ? 'border-primary bg-primary text-primary-foreground' 
                          : isCurrent
                          ? 'border-primary bg-primary/10 text-primary animate-pulse'
                          : 'border-muted-foreground/30'
                      }`}>
                        {isCompleted ? (
                          <CheckCircle className="w-5 h-5" />
                        ) : (
                          <Icon className="w-5 h-5" />
                        )}
                      </div>
                      <div className="text-center">
                        <div className="text-xs font-medium">{step.title}</div>
                        <div className="text-[10px] text-muted-foreground">{step.description}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Step Content */}
          <div className="mb-8">
            {renderStepContent()}
          </div>

          {/* Footer Navigation */}
          <div className="flex items-center justify-between pt-6 border-t border-border">
            <div className="text-sm text-muted-foreground">
              {isLoggedIn && (
                <span className="flex items-center gap-2">
                  <Shield className="w-4 h-4" />
                  Logged in • Auto-save enabled
                </span>
              )}
            </div>
            
            <div className="flex gap-3">
              {currentStep > 1 && (
                <Button variant="outline" onClick={prevStep}>
                  Previous
                </Button>
              )}
              {currentStep < steps.length ? (
                <Button 
                  onClick={() => {
                    if (validateStep()) nextStep();
                  }}
                  className="hover:scale-105 transition-transform duration-300"
                >
                  Continue
                  <Zap className="w-4 h-4 ml-2" />
                </Button>
              ) : (
                <Button 
                  onClick={handleBooking}
                  className="bg-green-500 hover:bg-green-600 hover:scale-105 transition-all duration-300"
                  size="lg"
                >
                  Complete Booking - ₹{finalPrice.toLocaleString()}
                  <CreditCard className="w-4 h-4 ml-2" />
                </Button>
              )}
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

export default AdvancedBookingModal;