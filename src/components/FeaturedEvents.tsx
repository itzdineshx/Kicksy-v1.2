import { Calendar, MapPin, Users, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useBooking } from "@/components/BookingProvider";
import SmartPriceTags from "./SmartPriceTags";
import DemandIndicator from "./DemandIndicator";
import CountdownTimer from "./CountdownTimer";
import UrgencyProgress from "./UrgencyProgress";
import eventCricketIpl from "@/assets/event-cricket-ipl.jpg";
import eventBadmintonChampionship from "@/assets/event-badminton-championship.jpg";
import eventHockeyLeague from "@/assets/event-hockey-league.jpg";
import eventTennisMasters from "@/assets/event-tennis-masters.jpg";

const FeaturedEvents = () => {
  const { openBookingModal } = useBooking();
  const featuredEvents = [
    {
      id: 1,
      title: "IPL 2024 Finals",
      teams: "Mumbai Indians vs Chennai Super Kings",
      date: "Dec 22, 2024",
      time: "7:30 PM",
      venue: "Narendra Modi Stadium, Ahmedabad",
      price: "₹2,000",
      originalPrice: "₹2,500",
      image: eventCricketIpl,
      category: "Cricket",
      rating: 4.8,
      attendees: "1,32,000",
      isHot: true,
      discount: "20% OFF",
      demand: "high" as const,
      seatsLeft: 45,
      totalSeats: 1000,
      priceChange: "up" as const,
      deal: "flash" as const,
      prediction: "Selling fast!"
    },
    {
      id: 2,
      title: "Badminton Premier League",
      teams: "PV Sindhu vs Carolina Marin",
      date: "Dec 25, 2025",
      time: "6:00 PM",
      venue: "KD Jadhav Indoor Hall, Delhi",
      price: "₹800",
      originalPrice: "₹1,000",
      image: eventBadmintonChampionship,
      category: "Badminton",
      rating: 4.6,
      attendees: "8,000",
      isHot: false,
      discount: "Early Bird",
      demand: "medium" as const,
      seatsLeft: 234,
      totalSeats: 500,
      priceChange: "down" as const,
      deal: "early-bird" as const,
      prediction: "Good time to buy"
    },
    {
      id: 3,
      title: "Hockey India League",
      teams: "Punjab Warriors vs Mumbai Magicians",
      date: "Dec 28, 2025",
      time: "4:00 PM",
      venue: "Major Dhyan Chand Stadium, Delhi",
      price: "₹500",
      originalPrice: "₹600",
      image: eventHockeyLeague,
      category: "Hockey",
      rating: 4.4,
      attendees: "15,000",
      isHot: false,
      discount: "Weekend Special",
      demand: "low" as const,
      seatsLeft: 345,
      totalSeats: 600,
      priceChange: "stable" as const,
      deal: "special" as const,
      prediction: "Best time to buy"
    },
    {
      id: 4,
      title: "Tennis Masters Cup",
      teams: "Rohan Bopanna vs Sumit Nagal",
      date: "Jan 5, 2025",
      time: "3:30 PM",
      venue: "R.K. Khanna Tennis Complex, Delhi",
      price: "₹1,200",
      originalPrice: "₹1,500",
      image: eventTennisMasters,
      category: "Tennis",
      rating: 4.7,
      attendees: "5,000",
      isHot: true,
      discount: "New Year Offer",
      demand: "medium" as const,
      seatsLeft: 89,
      totalSeats: 400,
      priceChange: "down" as const,
      deal: "last-chance" as const,
      prediction: "Price may rise"
    }
  ];

  const getCategoryColor = (category: string) => {
    const colors = {
      Cricket: "bg-primary",
      Football: "bg-secondary",
      Badminton: "bg-tertiary",
      Hockey: "bg-accent",
      Tennis: "bg-primary",
      Kabaddi: "bg-secondary"
    };
    return colors[category as keyof typeof colors] || "bg-muted";
  };

  return (
    <section className="py-12 bg-gradient-mesh">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10 animate-slide-in-bottom">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-sports bg-clip-text text-transparent">
            Featured Events
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Don't miss out on the biggest sporting events happening near you
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {featuredEvents.map((event, index) => (
            <Card key={event.id} className="group overflow-hidden hover:shadow-floating transition-all duration-500 hover:-translate-y-2 animate-scale-in bg-card border-border/50" style={{ animationDelay: `${index * 100}ms` }}>
              <div className="relative">
                {/* Event Image */}
                <div className="h-48 relative overflow-hidden">
                  <img 
                    src={event.image} 
                    alt={`${event.title} - ${event.teams}`}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                
                {/* Overlay Badges */}
                <div className="absolute top-3 left-3 flex flex-col gap-2">
                  <Badge className={`${getCategoryColor(event.category)} text-white hover:scale-110 transition-transform duration-300`}>
                    {event.category}
                  </Badge>
                  {event.isHot && (
                    <Badge variant="destructive" className="animate-pulse-glow hover:animate-wiggle">
                      🔥 Hot
                    </Badge>
                  )}
                </div>
                
                <div className="absolute top-3 right-3">
                  <Badge variant="secondary" className="bg-black/60 text-white hover:bg-black/80 transition-colors duration-300">
                    {event.discount}
                  </Badge>
                </div>

                {/* Rating */}
                <div className="absolute bottom-3 right-3 flex items-center gap-1 bg-black/60 text-white px-2 py-1 rounded hover:bg-black/80 transition-colors duration-300">
                  <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                  <span className="text-xs font-medium">{event.rating}</span>
                </div>
              </div>

              <CardContent className="p-4">
                <h3 className="font-bold text-lg mb-2 group-hover:text-primary transition-colors">
                  {event.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                  {event.teams}
                </p>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Calendar className="w-4 h-4 mr-2" />
                    <span>{event.date} • {event.time}</span>
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <MapPin className="w-4 h-4 mr-2" />
                    <span className="line-clamp-1">{event.venue}</span>
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Users className="w-4 h-4 mr-2" />
                    <span>{event.attendees} capacity</span>
                  </div>
                </div>

                {/* Smart Price Tags */}
                <SmartPriceTags
                  price={event.price}
                  originalPrice={event.originalPrice}
                  priceChange={event.priceChange}
                  deal={event.deal}
                  className="mb-4"
                />

                {/* Demand Indicator */}
                <DemandIndicator
                  demand={event.demand}
                  seatsLeft={event.seatsLeft}
                  totalSeats={event.totalSeats}
                  prediction={event.prediction}
                  className="mb-4"
                />

                {/* Countdown for flash deals */}
                {event.deal === "flash" && (
                  <CountdownTimer
                    targetDate={new Date(Date.now() + 2 * 60 * 60 * 1000)} // 2 hours from now
                    title="Flash Sale Ends In"
                    variant="deal"
                    className="mb-4"
                  />
                )}

                {/* Urgency Progress for high demand events */}
                {event.demand === "high" && (
                  <UrgencyProgress
                    seatsLeft={event.seatsLeft}
                    totalSeats={event.totalSeats}
                    title="Seats Filling Fast"
                    className="mb-4"
                  />
                )}

                <Button 
                  className="w-full hover:shadow-floating transition-all duration-300" 
                  variant="default"
                  onClick={() => openBookingModal({
                    id: event.id,
                    title: event.title,
                    teams: event.teams,
                    date: event.date,
                    time: event.time,
                    venue: event.venue,
                    price: event.price,
                    originalPrice: event.originalPrice,
                    category: event.category,
                    rating: event.rating,
                    attendance: event.attendees
                  })}
                >
                  Book Now
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-10 animate-slide-in-bottom [animation-delay:600ms]">
          <Button variant="outline" size="lg" className="hover:shadow-floating hover:scale-105 transition-all duration-300">
            View All Events
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedEvents;