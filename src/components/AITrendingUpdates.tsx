import { useState, useEffect } from "react";
import { TrendingUp, TrendingDown, Zap, Users, Clock, Star, AlertTriangle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

interface TrendingUpdate {
  id: string;
  type: "price_change" | "demand_spike" | "new_availability" | "venue_update" | "weather_alert";
  title: string;
  description: string;
  impact: "high" | "medium" | "low";
  confidence: number;
  timestamp: Date;
  event: string;
  change?: {
    from: string;
    to: string;
    percentage: number;
  };
}

const AITrendingUpdates = () => {
  const [updates, setUpdates] = useState<TrendingUpdate[]>([]);
  const [loading, setLoading] = useState(true);

  // Generate realistic AI trending updates
  const generateUpdates = (): TrendingUpdate[] => {
    const now = new Date();
    return [
      {
        id: "update_1",
        type: "price_change",
        title: "Dynamic Pricing Activated",
        description: "AI detected surge in demand for Cricket World Cup Final. Pricing adjusted based on real-time analytics.",
        impact: "high",
        confidence: 94,
        timestamp: new Date(now.getTime() - 5 * 60000), // 5 minutes ago
        event: "Cricket World Cup Final",
        change: {
          from: "₹5,000",
          to: "₹6,200",
          percentage: 24
        }
      },
      {
        id: "update_2",
        type: "demand_spike",
        title: "Demand Surge Detected",
        description: "ML algorithms identified 340% increase in search volume for Football League matches in the last hour.",
        impact: "high",
        confidence: 89,
        timestamp: new Date(now.getTime() - 12 * 60000), // 12 minutes ago
        event: "Premier Football League"
      },
      {
        id: "update_3",
        type: "new_availability",
        title: "New Tickets Released",
        description: "Venue partnership AI optimized seating layout. 150 additional premium seats now available.",
        impact: "medium",
        confidence: 96,
        timestamp: new Date(now.getTime() - 18 * 60000), // 18 minutes ago
        event: "Tennis Championship"
      },
      {
        id: "update_4",
        type: "weather_alert",
        title: "Weather Impact Analysis",
        description: "Meteorological AI predicts 85% clear weather probability. Increased outdoor event bookings expected.",
        impact: "low",
        confidence: 78,
        timestamp: new Date(now.getTime() - 25 * 60000), // 25 minutes ago
        event: "Multiple Outdoor Events"
      },
      {
        id: "update_5",
        type: "venue_update",
        title: "Smart Venue Optimization",
        description: "AI-powered crowd flow analysis suggests optimal entry times. VIP fast-track lanes activated.",
        impact: "medium",
        confidence: 91,
        timestamp: new Date(now.getTime() - 32 * 60000), // 32 minutes ago
        event: "Kabaddi Championship"
      }
    ];
  };

  useEffect(() => {
    // Simulate loading and generate initial updates
    setTimeout(() => {
      setUpdates(generateUpdates());
      setLoading(false);
    }, 1000);

    // Update trends every 30 seconds
    const interval = setInterval(() => {
      if (Math.random() > 0.7) { // 30% chance to add new update
        const newUpdate = generateUpdates()[Math.floor(Math.random() * 2)]; // Random from first 2
        newUpdate.id = `update_${Date.now()}`;
        newUpdate.timestamp = new Date();
        
        setUpdates(prev => [newUpdate, ...prev.slice(0, 4)]); // Keep latest 5
      }
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const getUpdateIcon = (type: string) => {
    switch (type) {
      case "price_change":
        return <TrendingUp className="w-4 h-4" />;
      case "demand_spike":
        return <Zap className="w-4 h-4" />;
      case "new_availability":
        return <Users className="w-4 h-4" />;
      case "weather_alert":
        return <AlertTriangle className="w-4 h-4" />;
      case "venue_update":
        return <Star className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case "high":
        return "text-red-500 bg-red-500/10 border-red-500/20";
      case "medium":
        return "text-orange-500 bg-orange-500/10 border-orange-500/20";
      default:
        return "text-blue-500 bg-blue-500/10 border-blue-500/20";
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "price_change":
        return "text-orange-500";
      case "demand_spike":
        return "text-red-500";
      case "new_availability":
        return "text-green-500";
      case "weather_alert":
        return "text-blue-500";
      case "venue_update":
        return "text-purple-500";
      default:
        return "text-muted-foreground";
    }
  };

  const formatTimeAgo = (timestamp: Date): string => {
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - timestamp.getTime()) / 60000);
    
    if (diffInMinutes < 1) return "Just now";
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours}h ago`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays}d ago`;
  };

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <div className="animate-spin">
              <Zap className="w-5 h-5 text-primary" />
            </div>
            AI Trending Updates
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="h-4 bg-muted rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-muted rounded w-1/2"></div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="hover:shadow-floating transition-all duration-300">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Zap className="w-5 h-5 text-primary animate-pulse-glow" />
          AI Trending Updates
          <Badge variant="outline" className="ml-auto">
            Live
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {updates.map((update, index) => (
          <div 
            key={update.id}
            className={`p-4 rounded-lg border transition-all duration-300 hover:shadow-md ${
              index === 0 ? 'border-primary/30 bg-primary/5 animate-scale-in' : 'border-border bg-muted/20'
            }`}
          >
            <div className="flex items-start gap-3">
              <div className={`p-2 rounded-full bg-muted/50 ${getTypeColor(update.type)}`}>
                {getUpdateIcon(update.type)}
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="font-medium text-sm">{update.title}</h4>
                  <Badge className={getImpactColor(update.impact)}>
                    {update.impact}
                  </Badge>
                  <span className="text-xs text-muted-foreground ml-auto">
                    {formatTimeAgo(update.timestamp)}
                  </span>
                </div>
                
                <p className="text-sm text-muted-foreground mb-2 leading-relaxed">
                  {update.description}
                </p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-medium text-primary">
                      {update.event}
                    </span>
                    
                    {update.change && (
                      <div className="flex items-center gap-2 text-xs">
                        <span className="text-muted-foreground line-through">
                          {update.change.from}
                        </span>
                        <TrendingUp className="w-3 h-3 text-red-500" />
                        <span className="text-red-500 font-medium">
                          {update.change.to} (+{update.change.percentage}%)
                        </span>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1">
                      <Progress value={update.confidence} className="w-8 h-1" />
                      <span className="text-xs text-muted-foreground">
                        {update.confidence}%
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
        
        <Button variant="outline" className="w-full" size="sm">
          View All AI Insights
        </Button>
      </CardContent>
    </Card>
  );
};

export default AITrendingUpdates;