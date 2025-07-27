import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, Calendar, MapPin, Users, Play, Pause, Star, Trophy, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useBooking } from "@/components/BookingProvider";
import heroCricket from "@/assets/hero-cricket.jpg";
import heroFootball from "@/assets/hero-football.jpg";
import heroKabaddi from "@/assets/hero-kabaddi.jpg";

const HeroCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [progress, setProgress] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const { openBookingModal } = useBooking();

  const events = [
    {
      id: 1,
      title: "India vs Australia",
      subtitle: "ODI Cricket World Cup Final",
      date: "December 15, 2025",
      time: "2:30 PM IST",
      venue: "Wankhede Stadium, Mumbai",
      image: heroCricket,
      price: "₹1,500",
      attendance: "45,000",
      category: "Cricket",
      status: "Hot",
      rating: 4.9,
      highlights: ["World Cup Final", "Star Players", "Premium Experience"]
    },
    {
      id: 2,
      title: "Mumbai City FC vs Kerala Blasters",
      subtitle: "Indian Super League Semi-Final",
      date: "December 18, 2025",
      time: "7:30 PM IST",
      venue: "DY Patil Stadium, Mumbai",
      image: heroFootball,
      price: "₹800",
      attendance: "37,000",
      category: "Football",
      status: "Featured",
      rating: 4.7,
      highlights: ["Semi-Final", "Derby Match", "Electric Atmosphere"]
    },
    {
      id: 3,
      title: "Pro Kabaddi League Finals",
      subtitle: "Bengaluru Bulls vs Tamil Thalaivas",
      date: "December 20, 2025",
      time: "8:00 PM IST",
      venue: "Jawaharlal Nehru Stadium, Chennai",
      image: heroKabaddi,
      price: "₹600",
      attendance: "12,000",
      category: "Kabaddi",
      status: "New",
      rating: 4.8,
      highlights: ["Championship", "Traditional Sport", "Cultural Experience"]
    }
  ];

  useEffect(() => {
    if (isAutoPlay && !isHovered) {
      intervalRef.current = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % events.length);
        setProgress(0);
      }, 5000);
      
      const progressInterval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) return 0;
          return prev + 2;
        });
      }, 100);

      return () => {
        if (intervalRef.current) clearInterval(intervalRef.current);
        clearInterval(progressInterval);
      };
    }
  }, [isAutoPlay, isHovered, events.length]);

  const toggleAutoPlay = () => {
    setIsAutoPlay(!isAutoPlay);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % events.length);
    setProgress(0);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + events.length) % events.length);
    setProgress(0);
  };

  return (
    <div 
      className="relative h-[400px] md:h-[500px] lg:h-[600px] overflow-hidden rounded-lg shadow-elevated group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Progress Bar */}
      <div className="absolute top-0 left-0 w-full h-1 bg-black/20 z-30">
        <div 
          className="h-full bg-gradient-primary transition-all duration-100 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Auto-play Control */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute top-4 right-4 z-30 bg-black/20 text-white hover:bg-black/40 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        onClick={toggleAutoPlay}
      >
        {isAutoPlay ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
      </Button>

      {/* Carousel Container */}
      <div 
        className="flex transition-transform duration-700 ease-in-out h-full"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {events.map((event, index) => (
          <div
            key={event.id}
            className="w-full h-full flex-shrink-0 relative"
          >
            {/* Background Image with Parallax Effect */}
            <div 
              className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 ease-out"
              style={{ 
                backgroundImage: `url(${event.image})`,
                transform: index === currentSlide ? 'scale(1.05)' : 'scale(1)'
              }}
            />
            
            {/* Enhanced Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-hero" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-black/30" />
            
            {/* Floating Elements */}
            <div className="absolute top-20 right-20 animate-float opacity-20">
              <Trophy className="w-16 h-16 text-primary" />
            </div>
            <div className="absolute bottom-32 right-16 animate-float opacity-20" style={{ animationDelay: '2s' }}>
              <Zap className="w-12 h-12 text-accent" />
            </div>
            
            {/* Content */}
            <div className="relative z-10 h-full flex items-center">
              <div className="container mx-auto px-4">
                <div className="max-w-3xl text-white">
                  <div className="mb-6 flex items-center gap-4 animate-slide-in-bottom">
                    <Badge variant="default" className="bg-gradient-primary text-primary-foreground px-4 py-2 text-sm font-bold border-0">
                      {event.category}
                    </Badge>
                    <Badge variant="secondary" className="bg-accent/20 text-accent border border-accent/30 backdrop-blur-sm">
                      {event.status}
                    </Badge>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-sm font-medium">{event.rating}</span>
                    </div>
                  </div>
                  
                  <h1 className="text-4xl md:text-6xl lg:text-7xl font-black mb-6 animate-slide-up tracking-tight bg-gradient-to-r from-white via-white to-white/80 bg-clip-text text-transparent">
                    {event.title}
                  </h1>
                  
                  <p className="text-xl md:text-2xl lg:text-3xl mb-8 text-white/90 font-semibold animate-slide-up" style={{ animationDelay: '200ms' }}>
                    {event.subtitle}
                  </p>

                  {/* Highlights */}
                  <div className="flex flex-wrap gap-2 mb-8 animate-slide-in-bottom" style={{ animationDelay: '400ms' }}>
                    {event.highlights.map((highlight, idx) => (
                      <span 
                        key={idx}
                        className="px-3 py-1 bg-white/10 text-white/80 rounded-full text-sm backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-colors duration-300"
                      >
                        {highlight}
                      </span>
                    ))}
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10 animate-slide-in-bottom" style={{ animationDelay: '600ms' }}>
                    <Card className="bg-white/10 backdrop-blur-sm border border-white/20 p-4 hover:bg-white/15 transition-all duration-300 group">
                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-primary/20 rounded-full">
                          <Calendar className="w-5 h-5 text-primary group-hover:animate-wiggle" />
                        </div>
                        <div>
                          <p className="text-sm text-white/70 font-medium">Date & Time</p>
                          <p className="font-bold text-white">{event.date}</p>
                          <p className="text-sm text-primary font-semibold">{event.time}</p>
                        </div>
                      </div>
                    </Card>
                    
                    <Card className="bg-white/10 backdrop-blur-sm border border-white/20 p-4 hover:bg-white/15 transition-all duration-300 group">
                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-accent/20 rounded-full">
                          <MapPin className="w-5 h-5 text-accent group-hover:animate-wiggle" />
                        </div>
                        <div>
                          <p className="text-sm text-white/70 font-medium">Venue</p>
                          <p className="font-bold text-white line-clamp-1">{event.venue}</p>
                        </div>
                      </div>
                    </Card>
                    
                    <Card className="bg-white/10 backdrop-blur-sm border border-white/20 p-4 hover:bg-white/15 transition-all duration-300 group">
                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-secondary/20 rounded-full">
                          <Users className="w-5 h-5 text-secondary group-hover:animate-wiggle" />
                        </div>
                        <div>
                          <p className="text-sm text-white/70 font-medium">Capacity</p>
                          <p className="font-bold text-white">{event.attendance} seats</p>
                          <p className="text-sm text-tertiary font-bold">From {event.price}</p>
                        </div>
                      </div>
                    </Card>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-6 animate-slide-in-bottom" style={{ animationDelay: '800ms' }}>
                    <Button 
                      variant="hero" 
                      size="lg" 
                      className="magnetic-button text-lg px-8 py-4 h-auto font-bold shadow-glow hover:shadow-stadium transform hover:scale-105 transition-all duration-300"
                      onClick={() => openBookingModal(event)}
                    >
                      Book Tickets Now
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="lg" 
                      className="border-2 border-white/20 text-white bg-transparent hover:bg-transparent hover:border-white/40 hover:scale-105 transition-all duration-300 text-lg px-8 py-4 h-auto font-semibold"
                    >
                      Event Details
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Enhanced Navigation Arrows */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute left-6 top-1/2 transform -translate-y-1/2 bg-white/10 text-white hover:bg-white/20 backdrop-blur-sm border border-white/20 w-12 h-12 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110"
        onClick={prevSlide}
      >
        <ChevronLeft className="w-6 h-6" />
      </Button>
      
      <Button
        variant="ghost"
        size="icon"
        className="absolute right-6 top-1/2 transform -translate-y-1/2 bg-white/10 text-white hover:bg-white/20 backdrop-blur-sm border border-white/20 w-12 h-12 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110"
        onClick={nextSlide}
      >
        <ChevronRight className="w-6 h-6" />
      </Button>

      {/* Enhanced Dots Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex items-center space-x-3 bg-black/20 backdrop-blur-sm px-6 py-3 rounded-full border border-white/20">
        {events.map((event, index) => (
          <button
            key={index}
            className={`group flex items-center transition-all duration-300 ${
              index === currentSlide ? "scale-110" : "hover:scale-105"
            }`}
            onClick={() => {
              setCurrentSlide(index);
              setProgress(0);
            }}
          >
            <div className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide
                ? "bg-primary shadow-glow" 
                : "bg-white/40 group-hover:bg-white/60"
            }`} />
            {index === currentSlide && (
              <span className="ml-2 text-xs text-white font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {event.category}
              </span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default HeroCarousel;