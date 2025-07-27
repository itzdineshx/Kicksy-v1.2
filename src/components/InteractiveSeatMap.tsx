import { useState, useEffect } from "react";
import { Eye, Users, MapPin, Maximize2, RotateCw, Zap, Star, AlertCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

interface Seat {
  id: string;
  row: string;
  number: number;
  status: "available" | "selected" | "occupied" | "blocked";
  price: number;
  category: "premium" | "standard" | "economy";
  view: "excellent" | "good" | "average";
  accessibility?: boolean;
}

interface SeatSection {
  id: string;
  name: string;
  seats: Seat[][];
  color: string;
}

const InteractiveSeatMap = ({ eventId, onSeatSelect }: { 
  eventId: number; 
  onSeatSelect: (seats: Seat[]) => void;
}) => {
  const [selectedSeats, setSelectedSeats] = useState<Seat[]>([]);
  const [hoveredSeat, setHoveredSeat] = useState<Seat | null>(null);
  const [currentView, setCurrentView] = useState<"2d" | "3d">("2d");
  const [zoomLevel, setZoomLevel] = useState(1);
  const { toast } = useToast();

  // Generate stadium layout
  const generateStadiumLayout = (): SeatSection[] => {
    const sections: SeatSection[] = [
      {
        id: "premium",
        name: "Premium Box",
        color: "bg-yellow-400",
        seats: Array.from({ length: 8 }, (_, rowIndex) =>
          Array.from({ length: 12 }, (_, seatIndex) => ({
            id: `premium-${rowIndex}-${seatIndex}`,
            row: String.fromCharCode(65 + rowIndex),
            number: seatIndex + 1,
            status: Math.random() > 0.7 ? "occupied" : "available",
            price: 5000,
            category: "premium",
            view: "excellent"
          }))
        )
      },
      {
        id: "standard",
        name: "Standard Seating",
        color: "bg-blue-400",
        seats: Array.from({ length: 15 }, (_, rowIndex) =>
          Array.from({ length: 20 }, (_, seatIndex) => ({
            id: `standard-${rowIndex}-${seatIndex}`,
            row: String.fromCharCode(73 + rowIndex),
            number: seatIndex + 1,
            status: Math.random() > 0.6 ? "occupied" : "available",
            price: 3000,
            category: "standard",
            view: "good"
          }))
        )
      },
      {
        id: "economy",
        name: "Economy Section",
        color: "bg-green-400",
        seats: Array.from({ length: 20 }, (_, rowIndex) =>
          Array.from({ length: 25 }, (_, seatIndex) => ({
            id: `economy-${rowIndex}-${seatIndex}`,
            row: String.fromCharCode(88 + rowIndex),
            number: seatIndex + 1,
            status: Math.random() > 0.5 ? "occupied" : "available",
            price: 1500,
            category: "economy",
            view: "average",
            accessibility: Math.random() > 0.95
          }))
        )
      }
    ];
    return sections;
  };

  const [seatSections, setSeatSections] = useState<SeatSection[]>([]);

  useEffect(() => {
    setSeatSections(generateStadiumLayout());
  }, [eventId]);

  const handleSeatClick = (seat: Seat) => {
    if (seat.status === "occupied" || seat.status === "blocked") {
      toast({
        title: "Seat Unavailable",
        description: "This seat is already taken or blocked.",
        variant: "destructive",
      });
      return;
    }

    const isSelected = selectedSeats.find(s => s.id === seat.id);
    let newSelection: Seat[];

    if (isSelected) {
      newSelection = selectedSeats.filter(s => s.id !== seat.id);
    } else {
      if (selectedSeats.length >= 6) {
        toast({
          title: "Maximum Seats",
          description: "You can select up to 6 seats at once.",
          variant: "destructive",
        });
        return;
      }
      newSelection = [...selectedSeats, seat];
    }

    setSelectedSeats(newSelection);
    onSeatSelect(newSelection);
  };

  const getSeatColor = (seat: Seat) => {
    if (seat.status === "occupied") return "bg-red-500";
    if (seat.status === "blocked") return "bg-gray-400";
    if (selectedSeats.find(s => s.id === seat.id)) return "bg-primary";
    if (seat.category === "premium") return "bg-yellow-200 hover:bg-yellow-300";
    if (seat.category === "standard") return "bg-blue-200 hover:bg-blue-300";
    return "bg-green-200 hover:bg-green-300";
  };

  const getViewIcon = (view: string) => {
    switch (view) {
      case "excellent": return <Star className="w-3 h-3 text-yellow-500" />;
      case "good": return <Eye className="w-3 h-3 text-blue-500" />;
      default: return <Eye className="w-3 h-3 text-gray-500" />;
    }
  };

  const totalPrice = selectedSeats.reduce((sum, seat) => sum + seat.price, 0);

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h3 className="text-xl font-bold flex items-center gap-2">
            <MapPin className="w-5 h-5 text-primary" />
            Wankhede Stadium - Interactive Seat Map
          </h3>
          <Badge className="bg-primary/10 text-primary">
            Live Availability
          </Badge>
        </div>
        
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentView(currentView === "2d" ? "3d" : "2d")}
          >
            <Maximize2 className="w-4 h-4 mr-2" />
            {currentView === "2d" ? "3D View" : "2D View"}
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setZoomLevel(zoomLevel === 1 ? 1.5 : 1)}
          >
            <RotateCw className="w-4 h-4 mr-2" />
            Zoom {zoomLevel === 1 ? "In" : "Out"}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Seat Map */}
        <div className="lg:col-span-3">
          <Card className="p-6">
            {/* Stadium Field */}
            <div className="mb-6 text-center">
              <div className="bg-green-500 text-white py-3 px-6 rounded-lg inline-block mb-2">
                🏏 Cricket Field
              </div>
              <p className="text-sm text-muted-foreground">This side faces the main action</p>
            </div>

            {/* Seat Sections */}
            <div 
              className="space-y-8 transition-all duration-300"
              style={{ transform: `scale(${zoomLevel})`, transformOrigin: "center top" }}
            >
              {seatSections.map((section) => (
                <div key={section.id} className="space-y-4">
                  <div className="flex items-center gap-2">
                    <div className={`w-4 h-4 rounded ${section.color}`}></div>
                    <h4 className="font-bold">{section.name}</h4>
                    <Badge variant="outline" className="text-xs">
                      ₹{section.seats[0]?.[0]?.price.toLocaleString()}
                    </Badge>
                  </div>
                  
                  <div className="grid gap-1">
                    {section.seats.map((row, rowIndex) => (
                      <div key={rowIndex} className="flex items-center gap-1">
                        <span className="w-6 text-xs font-bold text-muted-foreground text-center">
                          {row[0]?.row}
                        </span>
                        <div className="flex gap-1">
                          {row.map((seat) => (
                            <button
                              key={seat.id}
                              className={`w-6 h-6 rounded-sm text-xs font-bold transition-all duration-200 hover:scale-110 ${getSeatColor(seat)} ${
                                seat.accessibility ? 'ring-2 ring-blue-400' : ''
                              }`}
                              onClick={() => handleSeatClick(seat)}
                              onMouseEnter={() => setHoveredSeat(seat)}
                              onMouseLeave={() => setHoveredSeat(null)}
                              disabled={seat.status === "occupied" || seat.status === "blocked"}
                            >
                              {seat.accessibility ? "♿" : seat.number}
                            </button>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Legend */}
            <div className="mt-8 flex flex-wrap gap-4 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-green-200 rounded"></div>
                <span>Available</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-primary rounded"></div>
                <span>Selected</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-red-500 rounded"></div>
                <span>Occupied</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-yellow-200 rounded"></div>
                <span>Premium</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-blue-200 rounded"></div>
                <span>Standard</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 ring-2 ring-blue-400 rounded"></div>
                <span>Accessible</span>
              </div>
            </div>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Seat Details */}
          {hoveredSeat && (
            <Card className="p-4 border-primary/20 bg-primary/5">
              <CardHeader className="p-0 pb-3">
                <CardTitle className="text-sm flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  Seat {hoveredSeat.row}{hoveredSeat.number}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Price:</span>
                  <span className="font-bold text-primary">₹{hoveredSeat.price.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Category:</span>
                  <Badge variant="outline" className="text-xs capitalize">{hoveredSeat.category}</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">View:</span>
                  <div className="flex items-center gap-1">
                    {getViewIcon(hoveredSeat.view)}
                    <span className="text-xs capitalize">{hoveredSeat.view}</span>
                  </div>
                </div>
                {hoveredSeat.accessibility && (
                  <div className="flex items-center gap-2 text-blue-600">
                    <AlertCircle className="w-4 h-4" />
                    <span className="text-xs">Wheelchair Accessible</span>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* Selection Summary */}
          <Card className="p-4">
            <CardHeader className="p-0 pb-3">
              <CardTitle className="text-sm flex items-center gap-2">
                <Users className="w-4 h-4" />
                Selected Seats ({selectedSeats.length})
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0 space-y-3">
              {selectedSeats.length === 0 ? (
                <p className="text-sm text-muted-foreground">No seats selected</p>
              ) : (
                <>
                  <div className="space-y-1">
                    {selectedSeats.map((seat) => (
                      <div key={seat.id} className="flex items-center justify-between text-sm">
                        <span>{seat.row}{seat.number}</span>
                        <span className="font-medium">₹{seat.price.toLocaleString()}</span>
                      </div>
                    ))}
                  </div>
                  <div className="border-t pt-2">
                    <div className="flex items-center justify-between font-bold">
                      <span>Total:</span>
                      <span className="text-primary">₹{totalPrice.toLocaleString()}</span>
                    </div>
                  </div>
                </>
              )}
            </CardContent>
          </Card>

          {/* AI Recommendations */}
          <Card className="p-4 bg-gradient-primary text-primary-foreground">
            <CardHeader className="p-0 pb-3">
              <CardTitle className="text-sm flex items-center gap-2">
                <Zap className="w-4 h-4" />
                AI Seat Recommendations
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0 space-y-2 text-sm">
              <p>Based on your preferences:</p>
              <ul className="space-y-1 text-xs text-primary-foreground/90">
                <li>• Section B offers best value for money</li>
                <li>• Premium seats Row C have excellent field view</li>
                <li>• Weather is perfect - no roof needed</li>
              </ul>
            </CardContent>
          </Card>

          {/* 360° View */}
          <Card className="p-4">
            <CardHeader className="p-0 pb-3">
              <CardTitle className="text-sm flex items-center gap-2">
                <Eye className="w-4 h-4" />
                360° Stadium View
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="bg-gradient-mesh rounded-lg p-8 text-center">
                <Maximize2 className="w-8 h-8 mx-auto mb-2 text-primary" />
                <p className="text-sm text-muted-foreground">Interactive 360° view coming soon</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default InteractiveSeatMap;