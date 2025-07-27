import { Star, MapPin, Calendar, Users, Sparkles } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useBooking } from "@/components/BookingProvider";
import SmartPriceTags from "./SmartPriceTags";
import DemandIndicator from "./DemandIndicator";

const RecommendedForYou = () => {
  const { openBookingModal } = useBooking();

  const recommendations = [
    {
      id: 1,
      title: "Cricket World Cup Semi-Final",
      teams: "India vs New Zealand",
      date: "Dec 28, 2025",
      time: "2:30 PM",
      venue: "Eden Gardens, Kolkata",
      price: "₹3,500",
      originalPrice: "₹4,000",
      category: "Cricket",
      rating: 4.9,
      demand: "high" as const,
      seatsLeft: 23,
      totalSeats: 1000,
      priceChange: "up" as const,
      deal: "last-chance" as const,
      prediction: "May sell out today",
      matchScore: 95,
      reason: "Based on your cricket preferences"
    },
    {
      id: 2,
      title: "Mumbai vs Barcelona Friendly",
      teams: "Mumbai City FC vs FC Barcelona",
      date: "Jan 15, 2025",
      time: "7:30 PM",
      venue: "DY Patil Stadium, Mumbai",
      price: "₹2,800",
      originalPrice: "₹3,200",
      category: "Football",
      rating: 4.8,
      demand: "medium" as const,
      seatsLeft: 156,
      totalSeats: 800,
      priceChange: "down" as const,
      deal: "special" as const,
      prediction: "Price may rise",
      matchScore: 92,
      reason: "Popular in your area"
    },
    {
      id: 3,
      title: "Badminton All Stars",
      teams: "PV Sindhu vs Carolina Marin",
      date: "Jan 20, 2025",
      time: "6:00 PM",
      venue: "Siri Fort Complex, Delhi",
      price: "₹1,200",
      originalPrice: "₹1,500",
      category: "Badminton",
      rating: 4.7,
      demand: "low" as const,
      seatsLeft: 289,
      totalSeats: 500,
      priceChange: "stable" as const,
      deal: "early-bird" as const,
      prediction: "Best time to buy",
      matchScore: 88,
      reason: "Perfect for weekend"
    }
  ];

  return (
    <section className="py-20 bg-gradient-subtle">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12 animate-slide-in-bottom">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Sparkles className="w-6 h-6 text-primary" />
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-sports bg-clip-text text-transparent">
              Recommended for You
            </h2>
            <Sparkles className="w-6 h-6 text-primary" />
          </div>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Handpicked events based on your preferences and activity
          </p>
          <Badge className="mt-4 bg-primary/10 text-primary border-primary/20">
            <Star className="w-3 h-3 mr-1" />
            AI-Powered Recommendations
          </Badge>
        </div>

        {/* Recommendations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {recommendations.map((event, index) => (
            <Card 
              key={event.id}
              className="group hover:shadow-floating transition-all duration-500 hover:-translate-y-2 cursor-pointer overflow-hidden border-0 bg-gradient-card animate-scale-in"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <CardContent className="p-0">
                {/* Header with match score */}
                <div className="p-6 pb-4">
                  <div className="flex items-center justify-between mb-4">
                    <Badge className="bg-primary/10 text-primary border-primary/20">
                      <Sparkles className="w-3 h-3 mr-1" />
                      {event.matchScore}% Match
                    </Badge>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      {event.rating}
                    </div>
                  </div>
                  
                  <div className="flex items-center mb-4">
                    <div className="text-4xl mr-4 group-hover:animate-stadium-bounce">
                      {event.category === "Cricket" ? "🏏" : 
                       event.category === "Football" ? "⚽" : "🏸"}
                    </div>
                    <div>
                      <h3 className="font-bold text-lg group-hover:text-primary transition-colors duration-300">
                        {event.title}
                      </h3>
                      <p className="text-muted-foreground text-sm">{event.teams}</p>
                      <p className="text-xs text-primary font-medium mt-1">
                        {event.reason}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Event details */}
                <div className="px-6 pb-4 space-y-3">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Calendar className="w-4 h-4 mr-2" />
                    {event.date} • {event.time}
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <MapPin className="w-4 h-4 mr-2" />
                    <span className="line-clamp-1">{event.venue}</span>
                  </div>
                  
                  {/* Smart Price Tags */}
                  <SmartPriceTags
                    price={event.price}
                    originalPrice={event.originalPrice}
                    priceChange={event.priceChange}
                    deal={event.deal}
                    className="mb-3"
                  />
                  
                  {/* Demand Indicator */}
                  <DemandIndicator
                    demand={event.demand}
                    seatsLeft={event.seatsLeft}
                    totalSeats={event.totalSeats}
                    prediction={event.prediction}
                  />
                </div>

                {/* Action Button */}
                <div className="px-6 pb-6">
                  <Button 
                    className="w-full group-hover:scale-105 transition-transform duration-300 shadow-floating"
                    onClick={() => openBookingModal({
                      id: event.id,
                      title: event.title,
                      date: event.date,
                      time: event.time,
                      venue: event.venue,
                      price: event.price,
                      category: event.category,
                      attendance: `${event.seatsLeft} tickets left`
                    })}
                  >
                    Book Now - Perfect Match!
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* AI Insight */}
        <div className="mt-12 text-center animate-slide-in-bottom [animation-delay:600ms]">
          <Card className="max-w-2xl mx-auto p-6 bg-gradient-primary text-primary-foreground">
            <div className="flex items-center justify-center gap-2 mb-3">
              <Sparkles className="w-5 h-5" />
              <h3 className="font-bold text-lg">AI Insight</h3>
            </div>
            <p className="text-primary-foreground/90">
              Based on your activity, you're 3x more likely to enjoy cricket matches on weekends. 
              We've found events similar to your recent bookings with 95% satisfaction rate.
            </p>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default RecommendedForYou;