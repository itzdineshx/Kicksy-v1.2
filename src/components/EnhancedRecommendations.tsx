import { useState, useEffect } from "react";
import { Star, MapPin, Calendar, Users, Sparkles, Brain, TrendingUp, Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useBooking } from "@/components/BookingProvider";
import SmartPriceTags from "./SmartPriceTags";
import DemandIndicator from "./DemandIndicator";

interface UserPreferences {
  sports: string[];
  priceRange: [number, number];
  preferredDays: string[];
  location: string;
  pastBookings: string[];
}

interface MLRecommendation {
  id: number;
  title: string;
  teams: string;
  date: string;
  time: string;
  venue: string;
  price: string;
  originalPrice?: string;
  category: string;
  rating: number;
  demand: "high" | "medium" | "low";
  seatsLeft: number;
  totalSeats: number;
  priceChange: "up" | "down" | "stable";
  deal?: "flash" | "early-bird" | "last-chance" | "special";
  prediction: string;
  matchScore: number;
  reason: string;
  aiInsights: {
    similarUserBookings: number;
    popularityTrend: "rising" | "stable" | "declining";
    weatherImpact: "positive" | "neutral" | "negative";
    pricePredict: "increase" | "stable" | "decrease";
  };
}

const EnhancedRecommendations = () => {
  const { openBookingModal } = useBooking();
  const [recommendations, setRecommendations] = useState<MLRecommendation[]>([]);
  const [userPreferences, setUserPreferences] = useState<UserPreferences>({
    sports: ["Cricket", "Football", "Badminton"],
    priceRange: [1000, 5000],
    preferredDays: ["weekend"],
    location: "Mumbai",
    pastBookings: ["cricket", "football"]
  });
  const [loading, setLoading] = useState(true);

  // Simulate ML-powered recommendation engine
  useEffect(() => {
    const generateMLRecommendations = async () => {
      setLoading(true);
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const baseRecommendations: MLRecommendation[] = [
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
          demand: "high",
          seatsLeft: 23,
          totalSeats: 1000,
          priceChange: "up",
          deal: "last-chance",
          prediction: "May sell out today",
          matchScore: 97,
          reason: "98% match based on your cricket preference & location proximity",
          aiInsights: {
            similarUserBookings: 1247,
            popularityTrend: "rising",
            weatherImpact: "positive",
            pricePredict: "increase"
          }
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
          demand: "medium",
          seatsLeft: 156,
          totalSeats: 800,
          priceChange: "down",
          deal: "special",
          prediction: "Price may rise",
          matchScore: 94,
          reason: "Football matches you attended before + perfect timing",
          aiInsights: {
            similarUserBookings: 892,
            popularityTrend: "rising",
            weatherImpact: "neutral",
            pricePredict: "increase"
          }
        },
        {
          id: 3,
          title: "Badminton All Stars Championship",
          teams: "PV Sindhu vs Carolina Marin",
          date: "Jan 20, 2025",
          time: "6:00 PM",
          venue: "Siri Fort Complex, Delhi",
          price: "₹1,200",
          originalPrice: "₹1,500",
          category: "Badminton",
          rating: 4.7,
          demand: "low",
          seatsLeft: 289,
          totalSeats: 500,
          priceChange: "stable",
          deal: "early-bird",
          prediction: "Best time to buy",
          matchScore: 91,
          reason: "Emerging sport preference detected + price-conscious",
          aiInsights: {
            similarUserBookings: 234,
            popularityTrend: "rising",
            weatherImpact: "positive",
            pricePredict: "stable"
          }
        }
      ];

      setRecommendations(baseRecommendations);
      setLoading(false);
    };

    generateMLRecommendations();
  }, [userPreferences]);

  const getAIInsightIcon = (type: string) => {
    switch (type) {
      case "rising": return <TrendingUp className="w-3 h-3 text-green-500" />;
      case "stable": return <Clock className="w-3 h-3 text-muted-foreground" />;
      default: return <TrendingUp className="w-3 h-3 text-red-500 transform rotate-180" />;
    }
  };

  if (loading) {
    return (
      <section className="py-20 bg-gradient-subtle">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Brain className="w-6 h-6 text-primary animate-pulse" />
              <h2 className="text-4xl md:text-5xl font-bold bg-gradient-sports bg-clip-text text-transparent">
                AI Processing Your Preferences
              </h2>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <div className="w-3 h-3 bg-primary rounded-full animate-bounce"></div>
              <div className="w-3 h-3 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
              <div className="w-3 h-3 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-gradient-subtle">
      <div className="container mx-auto px-4">
        {/* Enhanced Header */}
        <div className="text-center mb-12 animate-slide-in-bottom">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Brain className="w-6 h-6 text-primary animate-pulse-glow" />
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-sports bg-clip-text text-transparent">
              AI-Powered Recommendations
            </h2>
            <Sparkles className="w-6 h-6 text-primary animate-spin-slow" />
          </div>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Machine learning algorithms analyzed your preferences and behavior patterns
          </p>
          <Badge className="mt-4 bg-primary/10 text-primary border-primary/20">
            <Brain className="w-3 h-3 mr-1" />
            Neural Network Powered • 97% Accuracy
          </Badge>
        </div>

        {/* ML Recommendations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {recommendations.map((event, index) => (
            <Card 
              key={event.id}
              className="group hover:shadow-floating transition-all duration-500 hover:-translate-y-2 cursor-pointer overflow-hidden border-0 bg-gradient-card animate-scale-in"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <CardContent className="p-0">
                {/* Enhanced Header with AI insights */}
                <div className="p-6 pb-4">
                  <div className="flex items-center justify-between mb-4">
                    <Badge className="bg-primary/10 text-primary border-primary/20">
                      <Brain className="w-3 h-3 mr-1 animate-pulse" />
                      {event.matchScore}% ML Match
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
                      <p className="text-xs text-primary font-medium mt-1 flex items-center gap-1">
                        <Sparkles className="w-3 h-3" />
                        {event.reason}
                      </p>
                    </div>
                  </div>

                  {/* AI Insights */}
                  <div className="grid grid-cols-2 gap-2 mb-4">
                    <div className="text-xs bg-muted/50 rounded-lg p-2">
                      <div className="flex items-center gap-1 mb-1">
                        {getAIInsightIcon(event.aiInsights.popularityTrend)}
                        <span className="font-medium">Trend</span>
                      </div>
                      <span className="text-muted-foreground capitalize">{event.aiInsights.popularityTrend}</span>
                    </div>
                    <div className="text-xs bg-muted/50 rounded-lg p-2">
                      <div className="flex items-center gap-1 mb-1">
                        <Users className="w-3 h-3 text-primary" />
                        <span className="font-medium">Similar Users</span>
                      </div>
                      <span className="text-muted-foreground">{event.aiInsights.similarUserBookings} booked</span>
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
                  
                  <SmartPriceTags
                    price={event.price}
                    originalPrice={event.originalPrice}
                    priceChange={event.priceChange}
                    deal={event.deal}
                    className="mb-3"
                  />
                  
                  <DemandIndicator
                    demand={event.demand}
                    seatsLeft={event.seatsLeft}
                    totalSeats={event.totalSeats}
                    prediction={event.prediction}
                  />
                </div>

                {/* Enhanced Action Button */}
                <div className="px-6 pb-6">
                  <Button 
                    className="w-full group-hover:scale-105 transition-transform duration-300 shadow-floating magnetic-button"
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
                    <Sparkles className="w-4 h-4 mr-2" />
                    AI Recommended - Book Now!
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Enhanced AI Insight */}
        <div className="mt-12 text-center animate-slide-in-bottom [animation-delay:600ms]">
          <Card className="max-w-3xl mx-auto p-6 bg-gradient-primary text-primary-foreground">
            <div className="flex items-center justify-center gap-2 mb-3">
              <Brain className="w-5 h-5 animate-pulse-glow" />
              <h3 className="font-bold text-lg">Advanced AI Analytics</h3>
            </div>
            <p className="text-primary-foreground/90 mb-4">
              Our neural network analyzed 50,000+ user interactions, weather patterns, and social trends. 
              You're 3.7x more likely to enjoy cricket matches on weekends based on similar user profiles.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="bg-primary-foreground/10 rounded-lg p-3">
                <div className="font-bold">Pattern Recognition</div>
                <div className="text-primary-foreground/80">97% accuracy in sports preference</div>
              </div>
              <div className="bg-primary-foreground/10 rounded-lg p-3">
                <div className="font-bold">Behavioral Analysis</div>
                <div className="text-primary-foreground/80">Weekend booking preference detected</div>
              </div>
              <div className="bg-primary-foreground/10 rounded-lg p-3">
                <div className="font-bold">Price Optimization</div>
                <div className="text-primary-foreground/80">₹847 average savings recommended</div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default EnhancedRecommendations;