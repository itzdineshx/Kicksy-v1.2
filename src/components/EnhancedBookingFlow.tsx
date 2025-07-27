import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { 
  Calendar, 
  MapPin, 
  Users, 
  CreditCard, 
  Shield, 
  Clock,
  CheckCircle,
  Star,
  Zap,
  Gift,
  Timer,
  Heart
} from "lucide-react";

interface EnhancedBookingFlowProps {
  event: {
    id: number;
    title: string;
    date: string;
    time: string;
    venue: string;
    price: string;
    category: string;
    rating?: number;
    image?: string;
  };
  onClose: () => void;
}

const EnhancedBookingFlow = ({ event, onClose }: EnhancedBookingFlowProps) => {
  const [step, setStep] = useState(1);
  const [selectedSeats, setSelectedSeats] = useState(2);
  const [bookingData, setBookingData] = useState({
    seats: 2,
    seatType: 'premium',
    customerInfo: {
      name: '',
      email: '',
      phone: ''
    },
    addOns: [] as string[]
  });

  const steps = [
    { id: 1, title: 'Select Seats', icon: Users },
    { id: 2, title: 'Add-ons', icon: Gift },
    { id: 3, title: 'Details', icon: Shield },
    { id: 4, title: 'Payment', icon: CreditCard }
  ];

  const seatTypes = [
    {
      id: 'general',
      name: 'General',
      price: 500,
      features: ['Standard View', 'Basic Amenities'],
      color: 'bg-secondary'
    },
    {
      id: 'premium',
      name: 'Premium',
      price: 1000,
      features: ['Great View', 'Premium Amenities', 'Fast Entry'],
      color: 'bg-primary',
      popular: true
    },
    {
      id: 'vip',
      name: 'VIP',
      price: 2000,
      features: ['Best View', 'VIP Lounge', 'Meet & Greet', 'Exclusive Merchandise'],
      color: 'bg-tertiary'
    }
  ];

  const addOns = [
    {
      id: 'merchandise',
      name: 'Official Merchandise',
      price: 500,
      description: 'Team jersey and cap'
    },
    {
      id: 'food',
      name: 'Food & Beverage Package',
      price: 800,
      description: 'Snacks and drinks during the event'
    },
    {
      id: 'parking',
      name: 'Premium Parking',
      price: 200,
      description: 'Reserved parking spot near entrance'
    },
    {
      id: 'insurance',
      name: 'Event Insurance',
      price: 100,
      description: 'Full refund if event is cancelled'
    }
  ];

  const calculateTotal = () => {
    const seatType = seatTypes.find(s => s.id === bookingData.seatType);
    const seatPrice = (seatType?.price || 0) * bookingData.seats;
    const addOnPrice = addOns
      .filter(addon => bookingData.addOns.includes(addon.id))
      .reduce((sum, addon) => sum + addon.price, 0);
    return seatPrice + addOnPrice;
  };

  const progress = (step / steps.length) * 100;

  const nextStep = () => {
    if (step < steps.length) {
      setStep(step + 1);
    }
  };

  const prevStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const toggleAddOn = (addOnId: string) => {
    setBookingData(prev => ({
      ...prev,
      addOns: prev.addOns.includes(addOnId)
        ? prev.addOns.filter(id => id !== addOnId)
        : [...prev.addOns, addOnId]
    }));
  };

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6 animate-fade-in">
            <div>
              <Label className="text-base font-semibold mb-4 block">Number of Seats</Label>
              <div className="flex items-center gap-4">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setBookingData(prev => ({ ...prev, seats: Math.max(1, prev.seats - 1) }))}
                  disabled={bookingData.seats <= 1}
                >
                  -
                </Button>
                <span className="text-2xl font-bold min-w-[3rem] text-center">{bookingData.seats}</span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setBookingData(prev => ({ ...prev, seats: Math.min(10, prev.seats + 1) }))}
                  disabled={bookingData.seats >= 10}
                >
                  +
                </Button>
              </div>
            </div>

            <div>
              <Label className="text-base font-semibold mb-4 block">Seat Category</Label>
              <div className="grid gap-4">
                {seatTypes.map((seatType) => (
                  <Card 
                    key={seatType.id}
                    className={`cursor-pointer border-2 transition-all duration-300 hover:shadow-floating ${
                      bookingData.seatType === seatType.id 
                        ? 'border-primary shadow-floating scale-105' 
                        : 'border-border hover:border-primary/50'
                    }`}
                    onClick={() => setBookingData(prev => ({ ...prev, seatType: seatType.id }))}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className={`w-4 h-4 rounded-full ${seatType.color}`} />
                          <div>
                            <div className="flex items-center gap-2">
                              <h4 className="font-semibold">{seatType.name}</h4>
                              {seatType.popular && (
                                <Badge className="bg-primary/10 text-primary animate-pulse-glow">
                                  <Star className="w-3 h-3 mr-1" />
                                  Popular
                                </Badge>
                              )}
                            </div>
                            <div className="flex gap-2 text-xs text-muted-foreground mt-1">
                              {seatType.features.map((feature, idx) => (
                                <span key={idx} className="flex items-center gap-1">
                                  <CheckCircle className="w-3 h-3" />
                                  {feature}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-bold">₹{seatType.price.toLocaleString()}</div>
                          <div className="text-xs text-muted-foreground">per seat</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6 animate-fade-in">
            <div>
              <Label className="text-base font-semibold mb-4 block">Enhance Your Experience</Label>
              <div className="grid gap-4">
                {addOns.map((addOn) => (
                  <Card 
                    key={addOn.id}
                    className={`cursor-pointer border-2 transition-all duration-300 hover:shadow-floating ${
                      bookingData.addOns.includes(addOn.id)
                        ? 'border-primary shadow-floating scale-105' 
                        : 'border-border hover:border-primary/50'
                    }`}
                    onClick={() => toggleAddOn(addOn.id)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className={`w-5 h-5 rounded border-2 transition-all duration-300 ${
                            bookingData.addOns.includes(addOn.id) 
                              ? 'bg-primary border-primary' 
                              : 'border-border'
                          }`}>
                            {bookingData.addOns.includes(addOn.id) && (
                              <CheckCircle className="w-3 h-3 text-primary-foreground m-0.5" />
                            )}
                          </div>
                          <div>
                            <h4 className="font-semibold">{addOn.name}</h4>
                            <p className="text-sm text-muted-foreground">{addOn.description}</p>
                          </div>
                        </div>
                        <div className="text-lg font-bold">+₹{addOn.price}</div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6 animate-fade-in">
            <div>
              <Label className="text-base font-semibold mb-4 block">Contact Information</Label>
              <div className="grid gap-4">
                <div>
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={bookingData.customerInfo.name}
                    onChange={(e) => setBookingData(prev => ({
                      ...prev,
                      customerInfo: { ...prev.customerInfo, name: e.target.value }
                    }))}
                    placeholder="Enter your full name"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={bookingData.customerInfo.email}
                    onChange={(e) => setBookingData(prev => ({
                      ...prev,
                      customerInfo: { ...prev.customerInfo, email: e.target.value }
                    }))}
                    placeholder="Enter your email"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    value={bookingData.customerInfo.phone}
                    onChange={(e) => setBookingData(prev => ({
                      ...prev,
                      customerInfo: { ...prev.customerInfo, phone: e.target.value }
                    }))}
                    placeholder="Enter your phone number"
                    className="mt-1"
                  />
                </div>
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6 animate-fade-in">
            <div className="text-center">
              <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4 animate-scale-in" />
              <h3 className="text-2xl font-bold mb-2">Booking Summary</h3>
              <p className="text-muted-foreground">Review your order before payment</p>
            </div>

            <Card className="bg-gradient-card border-border/50">
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>Seats ({bookingData.seats}x)</span>
                    <span className="font-semibold">
                      ₹{(seatTypes.find(s => s.id === bookingData.seatType)?.price || 0) * bookingData.seats}
                    </span>
                  </div>
                  {bookingData.addOns.map(addOnId => {
                    const addOn = addOns.find(a => a.id === addOnId);
                    return addOn ? (
                      <div key={addOnId} className="flex justify-between items-center">
                        <span>{addOn.name}</span>
                        <span className="font-semibold">₹{addOn.price}</span>
                      </div>
                    ) : null;
                  })}
                  <Separator />
                  <div className="flex justify-between items-center text-lg font-bold">
                    <span>Total</span>
                    <span>₹{calculateTotal().toLocaleString()}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-4 mb-4">
          <div className="p-2 bg-primary/10 rounded-full">
            <Calendar className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h2 className="text-2xl font-bold">{event.title}</h2>
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

        {/* Progress */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Step {step} of {steps.length}</span>
            <span>{Math.round(progress)}% Complete</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Steps */}
        <div className="flex justify-between mt-4">
          {steps.map((stepItem) => {
            const Icon = stepItem.icon;
            return (
              <div 
                key={stepItem.id}
                className={`flex flex-col items-center gap-2 ${
                  step >= stepItem.id ? 'text-primary' : 'text-muted-foreground'
                }`}
              >
                <div className={`w-10 h-10 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                  step >= stepItem.id 
                    ? 'border-primary bg-primary text-primary-foreground' 
                    : 'border-muted-foreground/30'
                }`}>
                  {step > stepItem.id ? (
                    <CheckCircle className="w-5 h-5" />
                  ) : (
                    <Icon className="w-5 h-5" />
                  )}
                </div>
                <span className="text-xs font-medium">{stepItem.title}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Content */}
      <div className="mb-8">
        {renderStepContent()}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-6 border-t border-border">
        <div className="flex items-center gap-2">
          <Timer className="w-4 h-4 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">
            Session expires in 15:00
          </span>
        </div>
        
        <div className="flex gap-3">
          {step > 1 && (
            <Button variant="outline" onClick={prevStep}>
              Previous
            </Button>
          )}
          {step < steps.length ? (
            <Button onClick={nextStep} className="hover:scale-105 transition-transform duration-300">
              Continue
              <Zap className="w-4 h-4 ml-2" />
            </Button>
          ) : (
            <Button className="bg-green-500 hover:bg-green-600 hover:scale-105 transition-all duration-300">
              Complete Booking
              <Heart className="w-4 h-4 ml-2" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default EnhancedBookingFlow;