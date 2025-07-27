import { useState, useEffect } from "react";
import { Calendar, MapPin, Users, Star, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useBooking } from "@/components/BookingProvider";
import heroCricket from "/hero-cricket.jpg";
import heroFootball from "/hero-football.jpg";
import heroKabaddi from "/hero-kabaddi.jpg";

const MobileHeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { openBookingModal } = useBooking();

  const events = [
    {
      id: 1,
      title: "India vs Australia",
      subtitle: "ODI Cricket World Cup Final",
      date: "Dec 15, 2025",
      time: "2:30 PM",
      venue: "Wankhede Stadium",
      city: "Mumbai",
      image: heroCricket,
      price: "₹1,500",
      category: "Cricket",
      status: "Hot",
      rating: 4.9
    },
    {
      id: 2,
      title: "Mumbai City FC vs Kerala Blasters",
      subtitle: "ISL Semi-Final",
      date: "Dec 18, 2025",
      time: "7:30 PM",
      venue: "DY Patil Stadium",
      city: "Mumbai",
      image: heroFootball,
      price: "₹800",
      category: "Football",
      status: "Featured",
      rating: 4.7
    },
    {
      id: 3,
      title: "Pro Kabaddi Finals",
      subtitle: "Bulls vs Thalaivas",
      date: "Dec 20, 2025",
      time: "8:00 PM",
      venue: "Nehru Stadium",
      city: "Chennai",
      image: heroKabaddi,
      price: "₹600",
      category: "Kabaddi",
      status: "New",
      rating: 4.8
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % events.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [events.length]);

  const currentEvent = events[currentSlide];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Hot": return "bg-red-500";
      case "Featured": return "bg-primary";
      case "New": return "bg-green-500";
      default: return "bg-muted";
    }
  };

  return (
    <div className="relative overflow-hidden rounded-2xl mx-4 mt-4">
      {/* Background Image */}
      <div 
        className="relative h-80 bg-cover bg-center transition-all duration-700 ease-in-out"
        style={{ backgroundImage: `url(${currentEvent.image})` }}
      >
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
        
        {/* Content */}
        <div className="relative h-full flex flex-col justify-end p-6 text-white">
          {/* Status Badge */}
          <div className="absolute top-4 left-4">
            <Badge className={`${getStatusColor(currentEvent.status)} text-white border-0`}>
              {currentEvent.status}
            </Badge>
          </div>

          {/* Rating */}
          <div className="absolute top-4 right-4 flex items-center gap-1 bg-black/50 rounded-lg px-2 py-1">
            <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
            <span className="text-xs font-medium">{currentEvent.rating}</span>
          </div>

          {/* Event Info */}
          <div className="space-y-3">
            <div>
              <h2 className="mobile-hero-title font-bold leading-tight mb-1">
                {currentEvent.title}
              </h2>
              <p className="mobile-hero-subtitle text-white/90">
                {currentEvent.subtitle}
              </p>
            </div>

            {/* Event Details */}
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                <span>{currentEvent.date}</span>
              </div>
              <div className="flex items-center gap-1">
                <MapPin className="w-3 h-3" />
                <span>{currentEvent.city}</span>
              </div>
            </div>

            {/* Venue and Price */}
            <div className="flex items-center justify-between">
              <div className="text-xs text-white/80">
                {currentEvent.venue}
              </div>
              <div className="text-lg font-bold text-primary">
                {currentEvent.price}
              </div>
            </div>

            {/* Action Button */}
            <Button 
              size="sm" 
              className="w-full h-10 font-semibold"
              onClick={() => openBookingModal(currentEvent)}
            >
              Book Tickets
              <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
        </div>

        {/* Slide Indicators */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {events.map((_, index) => (
            <button
              key={index}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentSlide 
                  ? 'bg-white w-6' 
                  : 'bg-white/50 hover:bg-white/75'
              }`}
              onClick={() => setCurrentSlide(index)}
            />
          ))}
        </div>
      </div>

      {/* Quick Event Switcher */}
      <div className="bg-card border border-border/50 p-3 rounded-b-2xl">
        <div className="flex gap-2 overflow-x-auto scrollbar-hide">
          {events.map((event, index) => (
            <button
              key={event.id}
              onClick={() => setCurrentSlide(index)}
              className={`flex-shrink-0 px-3 py-2 text-xs rounded-lg transition-all duration-200 ${
                index === currentSlide
                  ? 'bg-primary text-primary-foreground font-medium'
                  : 'bg-muted text-muted-foreground hover:bg-muted/80'
              }`}
            >
              {event.category}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MobileHeroSection;