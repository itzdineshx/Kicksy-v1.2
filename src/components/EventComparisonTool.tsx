import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useMockData, MockEvent } from "@/components/MockDataProvider";
import { 
  Plus, 
  X, 
  Calendar, 
  MapPin, 
  IndianRupee, 
  Star, 
  Users, 
  Clock,
  Trophy,
  GitCompare,
  CheckCircle,
  XCircle
} from "lucide-react";
import { cn } from "@/lib/utils";

export const EventComparisonTool: React.FC = () => {
  const { events } = useMockData();
  const [selectedEvents, setSelectedEvents] = useState<MockEvent[]>([]);
  const [availableEvents, setAvailableEvents] = useState(events);

  const addEventToComparison = (event: MockEvent) => {
    if (selectedEvents.length < 3 && !selectedEvents.find(e => e.id === event.id)) {
      setSelectedEvents([...selectedEvents, event]);
      setAvailableEvents(availableEvents.filter(e => e.id !== event.id));
    }
  };

  const removeEventFromComparison = (eventId: string) => {
    const eventToRemove = selectedEvents.find(e => e.id === eventId);
    if (eventToRemove) {
      setSelectedEvents(selectedEvents.filter(e => e.id !== eventId));
      setAvailableEvents([...availableEvents, eventToRemove]);
    }
  };

  const clearComparison = () => {
    setSelectedEvents([]);
    setAvailableEvents(events);
  };

  const formatPrice = (price: string) => {
    return price.replace('₹', '').replace(',', '');
  };

  const getLowestPrice = () => {
    if (selectedEvents.length === 0) return null;
    return Math.min(...selectedEvents.map(e => parseInt(formatPrice(e.price))));
  };

  const getHighestRating = () => {
    if (selectedEvents.length === 0) return null;
    return Math.max(...selectedEvents.map(e => e.rating || 0));
  };

  const ComparisonMetric = ({ 
    label, 
    values, 
    type = "text",
    highlightBest = false 
  }: { 
    label: string;
    values: (string | number | boolean | undefined)[];
    type?: "text" | "price" | "rating" | "boolean";
    highlightBest?: boolean;
  }) => {
    const getBestIndex = () => {
      if (!highlightBest) return -1;
      
      if (type === "price") {
        const numValues = values.map(v => typeof v === 'string' ? parseInt(formatPrice(v)) : 0);
        const minPrice = Math.min(...numValues);
        return numValues.findIndex(v => v === minPrice);
      }
      
      if (type === "rating") {
        const numValues = values.map(v => typeof v === 'number' ? v : 0);
        const maxRating = Math.max(...numValues);
        return numValues.findIndex(v => v === maxRating);
      }
      
      return -1;
    };

    const bestIndex = getBestIndex();

    return (
      <div className="grid grid-cols-4 gap-4 py-3">
        <div className="font-medium text-muted-foreground">{label}</div>
        {values.map((value, index) => (
          <div 
            key={index}
            className={cn(
              "text-center p-2 rounded",
              bestIndex === index && "bg-green-100 text-green-700 font-semibold border border-green-200"
            )}
          >
            {type === "price" && value ? `₹${value}` : 
             type === "rating" && value ? `${value}/5` :
             type === "boolean" ? (value ? <CheckCircle className="w-4 h-4 text-green-500 mx-auto" /> : <XCircle className="w-4 h-4 text-red-500 mx-auto" />) :
             value || "N/A"}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <GitCompare className="w-6 h-6 text-primary" />
          <h2 className="text-2xl font-bold bg-gradient-sports bg-clip-text text-transparent">
            Event Comparison
          </h2>
        </div>
        {selectedEvents.length > 0 && (
          <Button variant="outline" onClick={clearComparison}>
            Clear All
          </Button>
        )}
      </div>

      {/* Available Events */}
      {availableEvents.length > 0 && (
        <Card className="border-0 bg-gradient-card shadow-floating">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Plus className="w-5 h-5 text-primary" />
              Select Events to Compare (Max 3)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {availableEvents.slice(0, 6).map(event => (
                <div 
                  key={event.id} 
                  className="p-4 rounded-lg border bg-background hover:shadow-md transition-all cursor-pointer"
                  onClick={() => addEventToComparison(event)}
                >
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-semibold text-sm">{event.title}</h4>
                    <Badge variant="secondary" className="text-xs">
                      {event.category}
                    </Badge>
                  </div>
                  <div className="space-y-1 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {event.date}
                    </div>
                    <div className="flex items-center gap-1">
                      <IndianRupee className="w-3 h-3" />
                      {event.price}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Comparison Table */}
      {selectedEvents.length > 0 && (
        <Card className="border-0 bg-gradient-card shadow-floating">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Trophy className="w-5 h-5 text-primary" />
              Comparison Results
            </CardTitle>
          </CardHeader>
          <CardContent>
            {/* Event Headers */}
            <div className="grid grid-cols-4 gap-4 mb-6">
              <div></div>
              {selectedEvents.map(event => (
                <div key={event.id} className="text-center relative">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute -top-2 -right-2 h-6 w-6 p-0 rounded-full"
                    onClick={() => removeEventFromComparison(event.id)}
                  >
                    <X className="w-3 h-3" />
                  </Button>
                  
                  <div className="p-4 rounded-lg bg-muted/20 border">
                    <h3 className="font-bold text-sm mb-2">{event.title}</h3>
                    <Badge variant="outline" className="text-xs">
                      {event.category}
                    </Badge>
                    {event.image && (
                      <div className="w-full h-20 bg-muted rounded mt-2 flex items-center justify-center">
                        <span className="text-xs text-muted-foreground">Event Image</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <Separator className="my-6" />

            {/* Comparison Metrics */}
            <div className="space-y-1">
              <ComparisonMetric
                label="Price"
                values={selectedEvents.map(e => e.price)}
                type="price"
                highlightBest={true}
              />
              
              <Separator />
              
              <ComparisonMetric
                label="Date & Time"
                values={selectedEvents.map(e => `${e.date} ${e.time}`)}
              />
              
              <Separator />
              
              <ComparisonMetric
                label="Venue"
                values={selectedEvents.map(e => e.venue)}
              />
              
              <Separator />
              
              <ComparisonMetric
                label="Rating"
                values={selectedEvents.map(e => e.rating)}
                type="rating"
                highlightBest={true}
              />
              
              <Separator />
              
              <ComparisonMetric
                label="Teams/Participants"
                values={selectedEvents.map(e => e.teams || "Various")}
              />
              
              <Separator />
              
              <ComparisonMetric
                label="Attendance"
                values={selectedEvents.map(e => e.attendance || "TBA")}
              />
              
              <Separator />
              
              <ComparisonMetric
                label="Featured Event"
                values={selectedEvents.map(e => e.featured)}
                type="boolean"
              />
              
              <Separator />
              
              <ComparisonMetric
                label="Trending"
                values={selectedEvents.map(e => e.trending)}
                type="boolean"
              />
            </div>

            <Separator className="my-6" />

            {/* Action Buttons */}
            <div className="grid grid-cols-4 gap-4">
              <div></div>
              {selectedEvents.map(event => (
                <div key={event.id} className="space-y-2">
                  <Button className="w-full" size="sm">
                    Book Now
                  </Button>
                  <Button variant="outline" size="sm" className="w-full">
                    View Details
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Summary & Recommendations */}
      {selectedEvents.length > 1 && (
        <Card className="border-0 bg-gradient-primary text-primary-foreground shadow-floating">
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <Trophy className="w-6 h-6" />
              <h3 className="text-lg font-bold">Quick Comparison Summary</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white/10 rounded-lg p-4">
                <div className="text-sm opacity-90 mb-1">Best Value</div>
                <div className="font-bold">
                  {selectedEvents.find(e => parseInt(formatPrice(e.price)) === getLowestPrice())?.title || "N/A"}
                </div>
                <div className="text-sm">₹{getLowestPrice()?.toLocaleString()}</div>
              </div>
              
              <div className="bg-white/10 rounded-lg p-4">
                <div className="text-sm opacity-90 mb-1">Highest Rated</div>
                <div className="font-bold">
                  {selectedEvents.find(e => e.rating === getHighestRating())?.title || "N/A"}
                </div>
                <div className="text-sm">{getHighestRating()}/5 stars</div>
              </div>
              
              <div className="bg-white/10 rounded-lg p-4">
                <div className="text-sm opacity-90 mb-1">Most Popular</div>
                <div className="font-bold">
                  {selectedEvents.find(e => e.trending)?.title || "Multiple Options"}
                </div>
                <div className="text-sm">Trending now</div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Empty State */}
      {selectedEvents.length === 0 && (
        <Card className="border-0 bg-gradient-card shadow-floating">
          <CardContent className="p-12 text-center">
            <GitCompare className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-2">Compare Events Side by Side</h3>
            <p className="text-muted-foreground mb-6">
              Select up to 3 events to compare prices, venues, ratings, and more.
            </p>
            <div className="flex justify-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <IndianRupee className="w-4 h-4" />
                Compare Prices
              </div>
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4" />
                Check Ratings
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                Compare Venues
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};