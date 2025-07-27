import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar
} from "recharts";
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  Calendar,
  AlertTriangle,
  Target,
  Eye,
  Bell
} from "lucide-react";
import { cn } from "@/lib/utils";

interface PricePoint {
  date: string;
  price: number;
  availability: number;
  demand: "low" | "medium" | "high";
}

interface EventPriceData {
  id: string;
  name: string;
  sport: string;
  venue: string;
  date: string;
  currentPrice: number;
  originalPrice: number;
  priceHistory: PricePoint[];
  priceChange: number;
  priceChangePercent: number;
  predictedPrice: number;
  isWatching: boolean;
}

interface PriceTrend {
  period: string;
  avgPrice: number;
  events: number;
  savings: number;
}

export const PriceTrackingCharts: React.FC = () => {
  const [selectedEvent, setSelectedEvent] = useState<string>("cricket-final");
  const [timeRange, setTimeRange] = useState<string>("30d");
  const [watchedEvents, setWatchedEvents] = useState<EventPriceData[]>([]);
  const [priceTrends, setPriceTrends] = useState<PriceTrend[]>([]);

  // Sample event data
  const eventData: EventPriceData[] = [
    {
      id: "cricket-final",
      name: "Cricket Championship Final",
      sport: "Cricket",
      venue: "Wankhede Stadium",
      date: "2024-08-15",
      currentPrice: 2500,
      originalPrice: 3000,
      priceChange: -500,
      priceChangePercent: -16.7,
      predictedPrice: 2300,
      isWatching: true,
      priceHistory: [
        { date: "2024-07-01", price: 3000, availability: 100, demand: "low" },
        { date: "2024-07-05", price: 2950, availability: 95, demand: "low" },
        { date: "2024-07-10", price: 2800, availability: 80, demand: "medium" },
        { date: "2024-07-15", price: 2750, availability: 70, demand: "medium" },
        { date: "2024-07-20", price: 2600, availability: 60, demand: "high" },
        { date: "2024-07-25", price: 2500, availability: 45, demand: "high" },
        { date: "2024-07-27", price: 2500, availability: 40, demand: "high" }
      ]
    },
    {
      id: "football-derby",
      name: "Football City Derby",
      sport: "Football",
      venue: "Salt Lake Stadium",
      date: "2024-08-20",
      currentPrice: 1800,
      originalPrice: 1500,
      priceChange: 300,
      priceChangePercent: 20,
      predictedPrice: 1950,
      isWatching: true,
      priceHistory: [
        { date: "2024-07-01", price: 1500, availability: 100, demand: "low" },
        { date: "2024-07-05", price: 1550, availability: 90, demand: "medium" },
        { date: "2024-07-10", price: 1650, availability: 75, demand: "medium" },
        { date: "2024-07-15", price: 1700, availability: 60, demand: "high" },
        { date: "2024-07-20", price: 1750, availability: 50, demand: "high" },
        { date: "2024-07-25", price: 1800, availability: 35, demand: "high" },
        { date: "2024-07-27", price: 1800, availability: 30, demand: "high" }
      ]
    },
    {
      id: "kabaddi-league",
      name: "Pro Kabaddi League Finals",
      sport: "Kabaddi",
      venue: "Thyagaraj Stadium",
      date: "2024-08-10",
      currentPrice: 1200,
      originalPrice: 1400,
      priceChange: -200,
      priceChangePercent: -14.3,
      predictedPrice: 1100,
      isWatching: false,
      priceHistory: [
        { date: "2024-07-01", price: 1400, availability: 100, demand: "low" },
        { date: "2024-07-05", price: 1350, availability: 85, demand: "low" },
        { date: "2024-07-10", price: 1300, availability: 70, demand: "medium" },
        { date: "2024-07-15", price: 1250, availability: 65, demand: "medium" },
        { date: "2024-07-20", price: 1200, availability: 60, demand: "medium" },
        { date: "2024-07-25", price: 1200, availability: 55, demand: "medium" },
        { date: "2024-07-27", price: 1200, availability: 50, demand: "medium" }
      ]
    }
  ];

  const currentEvent = eventData.find(event => event.id === selectedEvent) || eventData[0];

  useEffect(() => {
    setWatchedEvents(eventData.filter(event => event.isWatching));
    
    // Sample price trends data
    setPriceTrends([
      { period: "Week 1", avgPrice: 2800, events: 5, savings: 200 },
      { period: "Week 2", avgPrice: 2650, events: 4, savings: 350 },
      { period: "Week 3", avgPrice: 2400, events: 6, savings: 600 },
      { period: "Week 4", avgPrice: 2200, events: 3, savings: 800 }
    ]);
  }, []);

  const toggleWatchEvent = (eventId: string) => {
    setWatchedEvents(prev => {
      const event = eventData.find(e => e.id === eventId);
      if (!event) return prev;
      
      const isCurrentlyWatched = prev.some(e => e.id === eventId);
      if (isCurrentlyWatched) {
        return prev.filter(e => e.id !== eventId);
      } else {
        return [...prev, event];
      }
    });
  };

  const getDemandColor = (demand: string) => {
    switch (demand) {
      case "low": return "hsl(var(--muted-foreground))";
      case "medium": return "hsl(var(--secondary))";
      case "high": return "hsl(var(--destructive))";
      default: return "hsl(var(--muted-foreground))";
    }
  };

  const getPriceChangeColor = (change: number) => {
    return change >= 0 ? "text-red-500" : "text-green-500";
  };

  const getPriceChangeIcon = (change: number) => {
    return change >= 0 ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-foreground">Price Tracking</h2>
          <p className="text-muted-foreground">Monitor ticket price trends and save money</p>
        </div>
        <div className="flex items-center gap-3">
          <Select value={selectedEvent} onValueChange={setSelectedEvent}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Select event" />
            </SelectTrigger>
            <SelectContent>
              {eventData.map(event => (
                <SelectItem key={event.id} value={event.id}>
                  {event.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-24">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">7d</SelectItem>
              <SelectItem value="30d">30d</SelectItem>
              <SelectItem value="90d">90d</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Current Event Overview */}
      <Card className="border-0 bg-gradient-card shadow-floating">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="w-5 h-5 text-primary" />
                {currentEvent.name}
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                {currentEvent.sport} • {currentEvent.venue} • {currentEvent.date}
              </p>
            </div>
            <Button
              variant={currentEvent.isWatching ? "default" : "outline"}
              onClick={() => toggleWatchEvent(currentEvent.id)}
              className="gap-2"
            >
              <Eye className="w-4 h-4" />
              {currentEvent.isWatching ? "Watching" : "Watch"}
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="text-center p-4 rounded-lg bg-muted/20">
              <div className="text-2xl font-bold text-foreground">
                ₹{currentEvent.currentPrice.toLocaleString()}
              </div>
              <div className="text-sm text-muted-foreground">Current Price</div>
            </div>
            
            <div className="text-center p-4 rounded-lg bg-muted/20">
              <div className={cn("text-2xl font-bold flex items-center justify-center gap-1", getPriceChangeColor(currentEvent.priceChange))}>
                {getPriceChangeIcon(currentEvent.priceChange)}
                {currentEvent.priceChangePercent > 0 ? "+" : ""}{currentEvent.priceChangePercent}%
              </div>
              <div className="text-sm text-muted-foreground">Price Change</div>
            </div>
            
            <div className="text-center p-4 rounded-lg bg-muted/20">
              <div className="text-2xl font-bold text-foreground">
                ₹{currentEvent.predictedPrice.toLocaleString()}
              </div>
              <div className="text-sm text-muted-foreground">Predicted Price</div>
            </div>
            
            <div className="text-center p-4 rounded-lg bg-muted/20">
              <div className="text-2xl font-bold text-foreground">
                {currentEvent.priceHistory[currentEvent.priceHistory.length - 1]?.availability || 0}%
              </div>
              <div className="text-sm text-muted-foreground">Availability</div>
            </div>
          </div>

          {/* Price History Chart */}
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={currentEvent.priceHistory}>
              <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
              <XAxis 
                dataKey="date" 
                className="text-muted-foreground text-xs"
                tickFormatter={(value) => new Date(value).toLocaleDateString()}
              />
              <YAxis 
                className="text-muted-foreground text-xs"
                tickFormatter={(value) => `₹${value}`}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: "hsl(var(--background))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px"
                }}
                labelFormatter={(value) => new Date(value).toLocaleDateString()}
                formatter={(value: any) => [`₹${value}`, "Price"]}
              />
              <Area
                type="monotone"
                dataKey="price"
                stroke="hsl(var(--primary))"
                fill="hsl(var(--primary))"
                fillOpacity={0.3}
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Watched Events */}
        <Card className="border-0 bg-gradient-card shadow-floating">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Eye className="w-5 h-5 text-primary" />
              Watched Events ({watchedEvents.length})
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {watchedEvents.map(event => (
              <div key={event.id} className="p-4 rounded-lg bg-muted/20 border">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <div className="font-semibold text-sm">{event.name}</div>
                    <div className="text-xs text-muted-foreground">{event.sport} • {event.date}</div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => toggleWatchEvent(event.id)}
                  >
                    <Eye className="w-4 h-4" />
                  </Button>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="text-lg font-bold">₹{event.currentPrice.toLocaleString()}</div>
                  <div className={cn("flex items-center gap-1 text-sm font-medium", getPriceChangeColor(event.priceChange))}>
                    {getPriceChangeIcon(event.priceChange)}
                    {event.priceChangePercent > 0 ? "+" : ""}{event.priceChangePercent}%
                  </div>
                </div>
                
                {Math.abs(event.priceChangePercent) > 15 && (
                  <div className="flex items-center gap-2 mt-2 p-2 bg-primary/10 rounded text-xs">
                    <AlertTriangle className="w-3 h-3 text-primary" />
                    <span>Significant price change detected!</span>
                  </div>
                )}
              </div>
            ))}
            
            {watchedEvents.length === 0 && (
              <div className="text-center text-muted-foreground py-8">
                <Eye className="w-8 h-8 mx-auto mb-2 opacity-50" />
                <p>No events being tracked</p>
                <p className="text-sm">Start watching events to track price changes</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Price Trends */}
        <Card className="border-0 bg-gradient-card shadow-floating">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingDown className="w-5 h-5 text-primary" />
              Price Trends
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={priceTrends}>
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis 
                  dataKey="period" 
                  className="text-muted-foreground text-xs"
                />
                <YAxis 
                  className="text-muted-foreground text-xs"
                  tickFormatter={(value) => `₹${value}`}
                />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: "hsl(var(--background))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px"
                  }}
                  formatter={(value: any) => [`₹${value}`, "Avg Price"]}
                />
                <Bar
                  dataKey="avgPrice"
                  fill="hsl(var(--primary))"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>

            <div className="mt-4 grid grid-cols-2 gap-4">
              <div className="text-center p-3 rounded-lg bg-green-50 dark:bg-green-950">
                <div className="text-xl font-bold text-green-600">₹1,350</div>
                <div className="text-xs text-muted-foreground">Total Savings</div>
              </div>
              <div className="text-center p-3 rounded-lg bg-blue-50 dark:bg-blue-950">
                <div className="text-xl font-bold text-blue-600">18</div>
                <div className="text-xs text-muted-foreground">Tracked Events</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Price Alerts */}
      <Card className="border-0 bg-gradient-primary text-primary-foreground shadow-floating">
        <CardContent className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <Bell className="w-6 h-6" />
            <h3 className="text-lg font-bold">Smart Price Alerts</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-lg bg-white/10">
              <div className="font-semibold mb-1">Price Drop Alert</div>
              <div className="text-sm opacity-90">Get notified when prices drop by 10% or more</div>
            </div>
            <div className="p-4 rounded-lg bg-white/10">
              <div className="font-semibold mb-1">Best Time to Buy</div>
              <div className="text-sm opacity-90">AI-powered predictions for optimal purchase timing</div>
            </div>
            <div className="p-4 rounded-lg bg-white/10">
              <div className="font-semibold mb-1">Last Minute Deals</div>
              <div className="text-sm opacity-90">Alert for last-minute price reductions</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};