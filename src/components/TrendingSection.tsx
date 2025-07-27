import { useState } from "react";
import { TrendingUp, Flame, Clock, Users, ChevronRight, Zap, AlertTriangle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useBooking } from "@/components/BookingProvider";
import SmartPriceTags from "./SmartPriceTags";
import DemandIndicator from "./DemandIndicator";

const TrendingSection = () => {
  const [activeTab, setActiveTab] = useState("trending");
  const { openBookingModal } = useBooking();

  const trendingEvents = [
    {
      id: 1,
      title: "India vs Australia ODI",
      category: "Cricket",
      date: "Today, 2:30 PM",
      venue: "Wankhede Stadium",
      price: "₹1,500",
      originalPrice: "₹1,800",
      popularity: 98,
      status: "Selling Fast",
      image: "🏏",
      ticketsLeft: 156,
      demand: "high" as const,
      priceChange: "up" as const,
      deal: "flash" as const,
      prediction: "Price rising fast!"
    },
    {
      id: 2,
      title: "Mumbai City FC vs Bengaluru FC",
      category: "Football",
      date: "Tomorrow, 7:30 PM",
      venue: "DY Patil Stadium",
      price: "₹800",
      originalPrice: "₹1,000",
      popularity: 94,
      status: "Hot",
      image: "⚽",
      ticketsLeft: 289,
      demand: "medium" as const,
      priceChange: "down" as const,
      deal: "special" as const,
      prediction: "Good value"
    },
    {
      id: 3,
      title: "PKL Finals - Bulls vs Thalaivas",
      category: "Kabaddi",
      date: "Dec 20, 8:00 PM",
      venue: "Nehru Stadium",
      price: "₹600",
      originalPrice: "₹750",
      popularity: 92,
      status: "Limited",
      image: "🤼",
      ticketsLeft: 67,
      demand: "high" as const,
      priceChange: "stable" as const,
      deal: "last-chance" as const,
      prediction: "Almost sold out!"
    }
  ];

  const liveEvents = [
    {
      id: 1,
      title: "RCB vs CSK",
      score: "145/4 (18.2)",
      status: "Live",
      viewers: "2.3M"
    },
    {
      id: 2,
      title: "India vs Pakistan",
      score: "Set 2: 21-18",
      status: "Live",
      viewers: "890K"
    }
  ];

  const tabs = [
    { id: "trending", label: "Trending", icon: TrendingUp },
    { id: "live", label: "Live Now", icon: Flame }
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 animate-slide-in-bottom">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-sports bg-clip-text text-transparent">
            What's Hot Right Now
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Don't miss out on the most popular events and live action
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-12 animate-scale-in [animation-delay:200ms]">
          <div className="bg-muted/50 p-1 rounded-lg backdrop-blur-sm">
            {tabs.map((tab) => (
              <Button
                key={tab.id}
                variant={activeTab === tab.id ? "default" : "ghost"}
                onClick={() => setActiveTab(tab.id)}
                className={`mx-1 transition-all duration-300 ${
                  activeTab === tab.id 
                    ? "shadow-floating scale-105" 
                    : "hover:scale-105"
                }`}
              >
                <tab.icon className="w-4 h-4 mr-2" />
                {tab.label}
              </Button>
            ))}
          </div>
        </div>

        {/* Trending Events */}
        {activeTab === "trending" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-slide-in-bottom [animation-delay:400ms]">
            {trendingEvents.map((event, index) => (
              <Card 
                key={event.id}
                className="group hover:shadow-floating transition-all duration-500 hover:-translate-y-2 cursor-pointer overflow-hidden border-0 bg-gradient-card animate-scale-in"
                style={{ animationDelay: `${(index + 3) * 100}ms` }}
              >
                <CardContent className="p-0">
                  {/* Header with popularity */}
                  <div className="p-6 pb-4">
                    <div className="flex items-center justify-between mb-4">
                      <Badge 
                        variant="secondary" 
                        className={`
                          ${event.status === "Selling Fast" ? "bg-destructive/10 text-destructive" : ""}
                          ${event.status === "Hot" ? "bg-primary/10 text-primary" : ""}
                          ${event.status === "Limited" ? "bg-secondary/10 text-secondary" : ""}
                        `}
                      >
                        <Flame className="w-3 h-3 mr-1" />
                        {event.status}
                      </Badge>
                      <div className="text-sm text-muted-foreground">
                        {event.popularity}% popular
                      </div>
                    </div>
                    
                    <div className="flex items-center mb-4">
                      <div className="text-4xl mr-4 group-hover:animate-stadium-bounce">
                        {event.image}
                      </div>
                      <div>
                        <h3 className="font-bold text-lg group-hover:text-primary transition-colors duration-300">
                          {event.title}
                        </h3>
                        <p className="text-muted-foreground text-sm">{event.category}</p>
                      </div>
                    </div>
                  </div>

                  {/* Event details */}
                  <div className="px-6 pb-4 space-y-3">
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Clock className="w-4 h-4 mr-2" />
                      {event.date}
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Users className="w-4 h-4 mr-2" />
                      {event.venue}
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
                      seatsLeft={event.ticketsLeft}
                      totalSeats={1000}
                      prediction={event.prediction}
                    />
                  </div>

                  {/* Popularity bar */}
                  <div className="px-6 pb-6">
                    <div className="w-full bg-muted rounded-full h-2 mb-3 overflow-hidden">
                      <div 
                        className="h-full bg-gradient-primary rounded-full transition-all duration-1000 group-hover:animate-pulse"
                        style={{ width: `${event.popularity}%` }}
                      />
                    </div>
                    <Button 
                      className="w-full group-hover:scale-105 transition-transform duration-300"
                      onClick={() => openBookingModal({
                        id: event.id,
                        title: event.title,
                        date: event.date,
                        time: "TBD",
                        venue: event.venue,
                        price: event.price,
                        category: event.category,
                        attendance: `${event.ticketsLeft} tickets left`
                      })}
                    >
                      Book Now
                      <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Live Events */}
        {activeTab === "live" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto animate-slide-in-bottom [animation-delay:400ms]">
            {liveEvents.map((event, index) => (
              <Card 
                key={event.id}
                className="group hover:shadow-floating transition-all duration-500 cursor-pointer overflow-hidden border-2 border-destructive/20 animate-scale-in"
                style={{ animationDelay: `${(index + 3) * 100}ms` }}
              >
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <Badge variant="destructive" className="animate-pulse">
                      <div className="w-2 h-2 bg-white rounded-full mr-2 animate-pulse" />
                      {event.status}
                    </Badge>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Users className="w-4 h-4 mr-1" />
                      {event.viewers} watching
                    </div>
                  </div>
                  
                  <h3 className="font-bold text-xl mb-2 group-hover:text-primary transition-colors duration-300">
                    {event.title}
                  </h3>
                  <p className="text-lg text-muted-foreground mb-4">{event.score}</p>
                  
                  <Button variant="outline" className="w-full group-hover:scale-105 transition-transform duration-300">
                    Watch Live
                    <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default TrendingSection;