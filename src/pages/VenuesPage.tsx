import { useState } from "react";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import InteractiveMap from "@/components/InteractiveMap";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MapPin, Star, Users, Calendar, Search, Filter } from "lucide-react";
import ProgressiveDisclosure from "@/components/ProgressiveDisclosure";


const VenuesPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedCapacity, setSelectedCapacity] = useState("");


  const featuredVenues = [
    {
      id: 1,
      name: "Wankhede Stadium",
      city: "Mumbai",
      capacity: "33,108",
      rating: 4.8,
      events: 12,
      image: "/hero-cricket.jpg",
      sports: ["Cricket"],
      description: "Home to Mumbai Indians and iconic cricket matches"
    },
    {
      id: 2,
      name: "Salt Lake Stadium",
      city: "Kolkata",
      capacity: "85,000",
      rating: 4.6,
      events: 8,
      image: "/hero-football.jpg",
      sports: ["Football"],
      description: "One of the largest football stadiums in the world"
    },
    {
      id: 3,
      name: "Thyagaraj Sports Complex",
      city: "Delhi",
      capacity: "5,000",
      rating: 4.7,
      events: 15,
      image: "/hero-kabaddi.jpg",
      sports: ["Kabaddi", "Wrestling"],
      description: "Premier indoor sports facility in the capital"
    }
  ];

  const cities = ["Mumbai", "Delhi", "Bengaluru", "Chennai", "Kolkata", "Hyderabad"];
  const capacityRanges = ["Under 5K", "5K-15K", "15K-30K", "30K-50K", "50K+"];

  const VenueCard = ({ venue }: { venue: any }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -5 }}
    >
      <Card className="overflow-hidden hover:shadow-xl transition-all duration-300">
        <div className="relative h-48 overflow-hidden">
          <img 
            src={venue.image} 
            alt={venue.name}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
          />
          <div className="absolute top-4 right-4">
            <Badge className="bg-white/90 text-foreground">
              <Star className="w-3 h-3 mr-1 fill-current" />
              {venue.rating}
            </Badge>
          </div>
        </div>
        <CardHeader>
          <CardTitle className="text-xl">{venue.name}</CardTitle>
          <CardDescription>{venue.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center text-sm text-muted-foreground">
              <MapPin className="w-4 h-4 mr-2" />
              {venue.city}
            </div>
            <div className="flex items-center text-sm text-muted-foreground">
              <Users className="w-4 h-4 mr-2" />
              Capacity: {venue.capacity}
            </div>
            <div className="flex items-center text-sm text-muted-foreground">
              <Calendar className="w-4 h-4 mr-2" />
              {venue.events} upcoming events
            </div>
            <div className="flex flex-wrap gap-1 pt-2">
              {venue.sports.map((sport: string) => (
                <Badge key={sport} variant="secondary" className="text-xs">
                  {sport}
                </Badge>
              ))}
            </div>
            <div className="flex gap-2 pt-4">
              <Button size="sm" className="flex-1">
                View Events
              </Button>
              <Button variant="outline" size="sm">
                Details
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        
        {/* Hero Section */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center py-12 bg-gradient-sports rounded-3xl mb-12"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            Explore Iconic Venues
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto">
            Discover world-class sports venues across India
          </p>
          
          {/* Search and Filters */}
          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative md:col-span-2">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
              <Input
                placeholder="Search venues..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 h-12 bg-white/95 backdrop-blur-sm border-0"
              />
            </div>
            <Select value={selectedCity} onValueChange={setSelectedCity}>
              <SelectTrigger className="h-12 bg-white/95 backdrop-blur-sm border-0">
                <SelectValue placeholder="Select City" />
              </SelectTrigger>
              <SelectContent>
                {cities.map(city => (
                  <SelectItem key={city} value={city}>{city}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={selectedCapacity} onValueChange={setSelectedCapacity}>
              <SelectTrigger className="h-12 bg-white/95 backdrop-blur-sm border-0">
                <SelectValue placeholder="Capacity" />
              </SelectTrigger>
              <SelectContent>
                {capacityRanges.map(range => (
                  <SelectItem key={range} value={range}>{range}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </motion.section>

        {/* Stats Section */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12"
        >
          <Card className="text-center p-6">
            <h3 className="text-3xl font-bold text-primary">200+</h3>
            <p className="text-muted-foreground">Venues</p>
          </Card>
          <Card className="text-center p-6">
            <h3 className="text-3xl font-bold text-primary">25+</h3>
            <p className="text-muted-foreground">Cities</p>
          </Card>
          <Card className="text-center p-6">
            <h3 className="text-3xl font-bold text-primary">15</h3>
            <p className="text-muted-foreground">Sports</p>
          </Card>
          <Card className="text-center p-6">
            <h3 className="text-3xl font-bold text-primary">5M+</h3>
            <p className="text-muted-foreground">Total Capacity</p>
          </Card>
        </motion.section>

        {/* Interactive Map */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-12"
        >
          <ProgressiveDisclosure
            title="Interactive Venue Map"
            variant="card"
            defaultOpen={false}
          >
            <InteractiveMap />
          </ProgressiveDisclosure>
        </motion.section>

        {/* Featured Venues */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold">Featured Venues</h2>
            <Button variant="outline">
              <Filter className="w-4 h-4 mr-2" />
              More Filters
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredVenues.map(venue => (
              <VenueCard key={venue.id} venue={venue} />
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Button size="lg">
              Load More Venues
            </Button>
          </div>
        </motion.section>
      </main>
      
      <Footer />
    </div>
  );
};

export default VenuesPage;