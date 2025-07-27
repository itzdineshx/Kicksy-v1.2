import { useState } from "react";
import { MapPin, Calendar, Ticket, ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const InteractiveMap = () => {
  const [selectedCity, setSelectedCity] = useState("mumbai");

  const cities = [
    {
      id: "mumbai",
      name: "Mumbai",
      events: 45,
      position: { x: 30, y: 60 },
      upcoming: [
        { name: "India vs Australia", date: "Dec 15", venue: "Wankhede", price: "₹1,500" },
        { name: "Mumbai City FC", date: "Dec 18", venue: "DY Patil", price: "₹800" }
      ]
    },
    {
      id: "delhi",
      name: "Delhi",
      events: 38,
      position: { x: 45, y: 25 },
      upcoming: [
        { name: "Delhi Capitals", date: "Dec 16", venue: "Feroz Shah Kotla", price: "₹1,200" },
        { name: "Kabaddi League", date: "Dec 19", venue: "Thyagaraj", price: "₹600" }
      ]
    },
    {
      id: "bangalore",
      name: "Bengaluru",
      events: 32,
      position: { x: 42, y: 70 },
      upcoming: [
        { name: "RCB vs CSK", date: "Dec 17", venue: "Chinnaswamy", price: "₹2,000" },
        { name: "Bengaluru FC", date: "Dec 20", venue: "Kanteerava", price: "₹700" }
      ]
    },
    {
      id: "chennai",
      name: "Chennai",
      events: 28,
      position: { x: 52, y: 75 },
      upcoming: [
        { name: "CSK Home Match", date: "Dec 21", venue: "Chepauk", price: "₹1,800" },
        { name: "Tamil Thalaivas", date: "Dec 22", venue: "Nehru Stadium", price: "₹650" }
      ]
    },
    {
      id: "kolkata",
      name: "Kolkata",
      events: 25,
      position: { x: 65, y: 40 },
      upcoming: [
        { name: "KKR vs MI", date: "Dec 23", venue: "Eden Gardens", price: "₹1,600" },
        { name: "Mohun Bagan", date: "Dec 24", venue: "Salt Lake", price: "₹500" }
      ]
    }
  ];

  const selectedCityData = cities.find(city => city.id === selectedCity);

  return (
    <section className="py-20 bg-gradient-mesh">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-slide-in-bottom">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-sports bg-clip-text text-transparent">
            Events Across India
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Discover amazing sports events happening in your city and plan your next adventure
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Interactive Map */}
          <div className="relative animate-scale-in">
            <Card className="p-8 bg-card/60 backdrop-blur-sm border-0 shadow-floating">
              <CardContent className="p-0">
                {/* India Map SVG */}
                <div className="relative w-full h-96 bg-gradient-to-br from-primary/5 to-secondary/5 rounded-lg overflow-hidden">
                  <svg viewBox="0 0 100 100" className="w-full h-full">
                    {/* Accurate India outline */}
                    <path
                      d="M35,10 L45,8 L55,12 L65,15 L70,20 L75,25 L78,30 L80,35 L78,40 L76,45 L74,50 L72,55 L70,60 L68,65 L65,70 L62,75 L58,80 L54,82 L50,84 L46,82 L42,80 L38,78 L34,75 L30,72 L26,68 L24,64 L22,60 L20,55 L18,50 L16,45 L18,40 L20,35 L22,30 L25,25 L28,20 L32,15 L35,10 Z"
                      fill="hsl(var(--muted))"
                      stroke="hsl(var(--border))"
                      strokeWidth="0.5"
                      className="transition-all duration-500"
                    />
                    
                    {/* Kashmir region */}
                    <path
                      d="M40,8 L45,6 L50,8 L48,12 L45,10 L42,10 Z"
                      fill="hsl(var(--muted))"
                      stroke="hsl(var(--border))"
                      strokeWidth="0.3"
                      className="transition-all duration-500"
                    />
                    
                    {/* Northeast states */}
                    <path
                      d="M70,20 L75,18 L78,22 L76,26 L72,24 Z"
                      fill="hsl(var(--muted))"
                      stroke="hsl(var(--border))"
                      strokeWidth="0.3"
                      className="transition-all duration-500"
                    />
                    
                    {/* Andaman & Nicobar (small dots) */}
                    <circle cx="85" cy="50" r="1" fill="hsl(var(--muted))" />
                    <circle cx="86" cy="55" r="0.8" fill="hsl(var(--muted))" />
                    <circle cx="84" cy="60" r="0.6" fill="hsl(var(--muted))" />
                    
                    {/* Lakshadweep (small dots) */}
                    <circle cx="15" cy="65" r="0.5" fill="hsl(var(--muted))" />
                    <circle cx="17" cy="68" r="0.4" fill="hsl(var(--muted))" />
                    
                    {/* City markers */}
                    {cities.map((city) => (
                      <g key={city.id}>
                        <circle
                          cx={city.position.x}
                          cy={city.position.y}
                          r={selectedCity === city.id ? "3" : "2"}
                          fill={selectedCity === city.id ? "hsl(var(--primary))" : "hsl(var(--secondary))"}
                          className="cursor-pointer transition-all duration-300 hover:r-3"
                          onClick={() => setSelectedCity(city.id)}
                        />
                        <circle
                          cx={city.position.x}
                          cy={city.position.y}
                          r={selectedCity === city.id ? "6" : "0"}
                          fill="hsl(var(--primary))"
                          opacity="0.3"
                          className="animate-pulse"
                        />
                        {/* City labels */}
                        <text
                          x={city.position.x}
                          y={city.position.y - 5}
                          fontSize="3"
                          fill="hsl(var(--foreground))"
                          textAnchor="middle"
                          className="font-medium"
                        >
                          {city.name}
                        </text>
                      </g>
                    ))}
                  </svg>
                  
                  {/* Floating stats */}
                  <div className="absolute top-4 right-4 space-y-2">
                    <Badge variant="secondary" className="bg-primary/10 text-primary">
                      <Calendar className="w-3 h-3 mr-1" />
                      500+ Events
                    </Badge>
                    <Badge variant="secondary" className="bg-secondary/10 text-secondary">
                      <MapPin className="w-3 h-3 mr-1" />
                      75+ Cities
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* City Details */}
          <div className="space-y-6 animate-slide-in-bottom [animation-delay:400ms]">
            {selectedCityData && (
              <>
                <Card className="border-0 bg-gradient-card shadow-floating overflow-hidden">
                  <CardContent className="p-8">
                    <div className="flex items-center justify-between mb-6">
                      <div>
                        <h3 className="text-3xl font-bold mb-2 bg-gradient-sports bg-clip-text text-transparent">
                          {selectedCityData.name}
                        </h3>
                        <p className="text-muted-foreground flex items-center">
                          <Ticket className="w-4 h-4 mr-2" />
                          {selectedCityData.events} upcoming events
                        </p>
                      </div>
                      <div className="text-6xl opacity-20 group-hover:animate-float">
                        🏟️
                      </div>
                    </div>

                    <div className="space-y-4">
                      {selectedCityData.upcoming.map((event, index) => (
                        <div 
                          key={index}
                          className="flex items-center justify-between p-4 bg-muted/50 rounded-lg hover:bg-muted/70 transition-all duration-300 group cursor-pointer"
                        >
                          <div>
                            <h4 className="font-semibold group-hover:text-primary transition-colors duration-300">
                              {event.name}
                            </h4>
                            <p className="text-sm text-muted-foreground">{event.venue}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-bold text-primary">{event.price}</p>
                            <p className="text-sm text-muted-foreground">{event.date}</p>
                          </div>
                          <ArrowRight className="w-4 h-4 ml-4 group-hover:translate-x-1 transition-transform duration-300" />
                        </div>
                      ))}
                    </div>

                    <Button className="w-full mt-6 group hover:scale-105 transition-transform duration-300">
                      View All Events in {selectedCityData.name}
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                    </Button>
                  </CardContent>
                </Card>

                {/* Quick city navigation */}
                <div className="flex flex-wrap gap-2">
                  {cities.map((city) => (
                    <Button
                      key={city.id}
                      variant={selectedCity === city.id ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedCity(city.id)}
                      className={`transition-all duration-300 ${
                        selectedCity === city.id 
                          ? "scale-105 shadow-floating" 
                          : "hover:scale-105"
                      }`}
                    >
                      {city.name}
                    </Button>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default InteractiveMap;