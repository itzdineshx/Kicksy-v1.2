import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Share2, Heart, MapPin, Calendar, Clock, Users, Star, TrendingUp, AlertTriangle, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAIData } from "@/components/AIDataService";
import SmartPriceTags from "@/components/SmartPriceTags";
import DemandIndicator from "@/components/DemandIndicator";
import UrgencyProgress from "@/components/UrgencyProgress";
import { useBooking } from "@/components/BookingProvider";
import { useToast } from "@/hooks/use-toast";

const EventDetailsPage = () => {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const { openBookingModal } = useBooking();
  const { toast } = useToast();
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [selectedSection, setSelectedSection] = useState("premium");

  // Get AI data for this event
  const { priceData, demandData, insights, loading } = useAIData(eventId || 'cricket-final');

  // Mock event data - in real app this would come from API
  const eventData = {
    id: eventId,
    title: "ICC Cricket World Cup Final",
    subtitle: "India vs Australia",
    date: "2025-03-15",
    time: "14:30",
    venue: "Narendra Modi Stadium, Ahmedabad",
    capacity: "132,000",
    description: "Witness history in the making as two cricket powerhouses clash in the ultimate showdown. The ICC Cricket World Cup Final promises to be an unforgettable spectacle of skill, strategy, and sporting excellence.",
    image: "/hero-cricket.jpg",
    category: "Cricket",
    rating: 4.8,
    attendees: "125,000+ going",
    highlights: [
      "World's largest cricket stadium",
      "HD live streaming on stadium screens",
      "Pre-match entertainment show",
      "Meet & greet with cricket legends",
      "Exclusive merchandise store"
    ],
    sections: [
      {
        id: "premium",
        name: "Premium Box",
        price: "₹15,000",
        originalPrice: "₹18,000",
        available: 12,
        total: 50,
        perks: ["Climate controlled", "Complimentary refreshments", "Valet parking", "Exclusive restrooms"]
      },
      {
        id: "vip",
        name: "VIP Stand",
        price: "₹8,500",
        originalPrice: "₹10,000",
        available: 47,
        total: 200,
        perks: ["Cushioned seating", "Fast track entry", "Complimentary snacks", "Better view angle"]
      },
      {
        id: "general",
        name: "General Admission",
        price: "₹2,500",
        available: 3842,
        total: 15000,
        perks: ["Stadium atmosphere", "Food court access", "Merchandise discounts"]
      }
    ]
  };

  const handleWishlist = () => {
    setIsWishlisted(!isWishlisted);
    toast({
      title: isWishlisted ? "Removed from Wishlist" : "Added to Wishlist",
      description: isWishlisted 
        ? "Event removed from your favorites" 
        : "You'll be notified of price changes and updates"
    });
  };

  const handleBookNow = () => {
    const selectedSectionData = eventData.sections.find(s => s.id === selectedSection);
    openBookingModal({
      id: parseInt(eventId || '1'),
      title: eventData.title,
      subtitle: eventData.subtitle,
      date: eventData.date,
      time: eventData.time,
      venue: eventData.venue,
      price: selectedSectionData?.price || "₹2,500",
      category: eventData.category
    });
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: eventData.title,
        text: `Check out this amazing event: ${eventData.title}`,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast({
        title: "Link Copied",
        description: "Event link copied to clipboard"
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-mesh p-6 flex items-center justify-center">
        <div className="animate-pulse text-center">
          <div className="w-16 h-16 bg-primary/20 rounded-full mx-auto mb-4 animate-bounce"></div>
          <p className="text-muted-foreground">Loading event details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-mesh">
      {/* Hero Section */}
      <div className="relative h-96 overflow-hidden">
        <img 
          src={eventData.image} 
          alt={eventData.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        
        {/* Navigation */}
        <div className="absolute top-6 left-6 right-6 flex justify-between items-center">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => navigate(-1)}
            className="bg-black/20 text-white hover:bg-black/40 backdrop-blur-sm"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          
          <div className="flex gap-2">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={handleWishlist}
              className="bg-black/20 text-white hover:bg-black/40 backdrop-blur-sm"
            >
              <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-red-500 text-red-500' : ''}`} />
            </Button>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={handleShare}
              className="bg-black/20 text-white hover:bg-black/40 backdrop-blur-sm"
            >
              <Share2 className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Event Info Overlay */}
        <div className="absolute bottom-6 left-6 right-6 text-white">
          <div className="flex items-center gap-2 mb-2">
            <Badge className="bg-primary text-primary-foreground">
              {eventData.category}
            </Badge>
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span className="text-sm">{eventData.rating}</span>
            </div>
          </div>
          <h1 className="text-3xl font-bold mb-2">{eventData.title}</h1>
          <p className="text-xl text-gray-200 mb-4">{eventData.subtitle}</p>
          
          <div className="flex flex-wrap gap-4 text-sm">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>{new Date(eventData.date).toLocaleDateString('en-IN', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>{eventData.time}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              <span>{eventData.venue}</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              <span>{eventData.attendees}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* AI Insights */}
            {insights.length > 0 && (
              <Card className="border-primary/20 bg-gradient-to-r from-primary/5 to-transparent">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-primary">
                    <Sparkles className="w-5 h-5 animate-pulse-glow" />
                    AI Insights
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {insights.map((insight) => (
                    <div 
                      key={insight.id}
                      className={`p-3 rounded-lg border ${
                        insight.urgent 
                          ? 'bg-destructive/10 border-destructive/20 animate-attention-bounce' 
                          : 'bg-muted/50 border-border'
                      }`}
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <div className={`p-1 rounded ${
                          insight.type === 'pricing' ? 'bg-orange-500/20 text-orange-500' :
                          insight.type === 'demand' ? 'bg-red-500/20 text-red-500' :
                          'bg-blue-500/20 text-blue-500'
                        }`}>
                          {insight.type === 'pricing' && <TrendingUp className="w-3 h-3" />}
                          {insight.type === 'demand' && <AlertTriangle className="w-3 h-3" />}
                          {insight.type === 'recommendation' && <Sparkles className="w-3 h-3" />}
                        </div>
                        <span className="font-medium text-sm">{insight.title}</span>
                        <Badge variant="outline" className="text-xs">
                          {insight.confidence}% confidence
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{insight.message}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}

            {/* Event Description */}
            <Card>
              <CardHeader>
                <CardTitle>About This Event</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">{eventData.description}</p>
                
                <h4 className="font-semibold mb-2">Event Highlights:</h4>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  {eventData.highlights.map((highlight, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                      {highlight}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Venue Information */}
            <Card>
              <CardHeader>
                <CardTitle>Venue Details</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <MapPin className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold">{eventData.venue}</h4>
                    <p className="text-sm text-muted-foreground mb-2">
                      Capacity: {eventData.capacity} • World's largest cricket stadium
                    </p>
                    <Button variant="outline" size="sm">
                      View on Map
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Booking Sidebar */}
          <div className="space-y-6">
            {/* Price & Demand */}
            <Card className="sticky top-6">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Book Tickets</CardTitle>
                  {demandData && (
                    <DemandIndicator 
                      demand={demandData.level}
                      seatsLeft={demandData.ticketsLeft}
                      totalSeats={demandData.totalTickets}
                      prediction={demandData.predictedSellout}
                    />
                  )}
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Seat Selection */}
                <Tabs value={selectedSection} onValueChange={setSelectedSection}>
                  <TabsList className="w-full">
                    <TabsTrigger value="premium" className="text-xs">Premium</TabsTrigger>
                    <TabsTrigger value="vip" className="text-xs">VIP</TabsTrigger>
                    <TabsTrigger value="general" className="text-xs">General</TabsTrigger>
                  </TabsList>
                  
                  {eventData.sections.map((section) => (
                    <TabsContent key={section.id} value={section.id} className="space-y-4">
                      <div className="text-center">
                        {priceData && (
                          <SmartPriceTags
                            price={section.price}
                            originalPrice={section.originalPrice}
                            priceChange={priceData.change}
                            deal={section.originalPrice ? "early-bird" : undefined}
                            className="justify-center"
                          />
                        )}
                      </div>
                      
                      <div className="space-y-2">
                        <UrgencyProgress 
                          seatsLeft={section.available}
                          totalSeats={section.total}
                          title="Seats Booked"
                          showCountdown={true}
                        />
                        <p className="text-sm text-center text-muted-foreground">
                          {section.available} of {section.total} tickets available
                        </p>
                      </div>
                      
                      <div className="space-y-2">
                        <h4 className="font-medium text-sm">Included:</h4>
                        <ul className="space-y-1">
                          {section.perks.map((perk, index) => (
                            <li key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
                              <div className="w-1 h-1 bg-primary rounded-full"></div>
                              {perk}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </TabsContent>
                  ))}
                </Tabs>

                <Button 
                  onClick={handleBookNow}
                  className="w-full magnetic-button bg-gradient-primary hover:shadow-glow"
                  size="lg"
                >
                  Book Now
                </Button>

                {demandData?.level === "high" && (
                  <div className="text-center">
                    <p className="text-xs text-destructive animate-pulse">
                      ⚡ High demand • Expected to sell out {demandData.predictedSellout}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetailsPage;