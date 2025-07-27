import { useState, useEffect } from "react";
import { Activity, Clock, Users, Zap } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const LiveUpdates = () => {
  const [updates, setUpdates] = useState([
    {
      id: 1,
      type: "score",
      title: "India vs Australia",
      content: "India: 287/6 (45.2 overs)",
      time: "Live",
      status: "live",
      sport: "Cricket"
    },
    {
      id: 2,
      type: "goal",
      title: "Mumbai City FC vs Kerala",
      content: "GOAL! Mumbai City FC 2-1",
      time: "2 min ago",
      status: "recent",
      sport: "Football"
    },
    {
      id: 3,
      type: "booking",
      title: "Pro Kabaddi Finals",
      content: "1,247 tickets sold in last hour",
      time: "5 min ago",
      status: "hot",
      sport: "Kabaddi"
    },
    {
      id: 4,
      type: "news",
      title: "Stadium Update",
      content: "New VIP section now available",
      time: "15 min ago",
      status: "info",
      sport: "General"
    }
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate real-time updates
      setUpdates(prev => {
        const newUpdate = {
          id: Date.now(),
          type: "score",
          title: "Live Match Update",
          content: `Score update: ${Math.floor(Math.random() * 300)}/6`,
          time: "Just now",
          status: "live",
          sport: "Cricket"
        };
        return [newUpdate, ...prev.slice(0, 3)];
      });
    }, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, []);

  const getStatusIcon = (type: string) => {
    switch (type) {
      case "score":
        return <Activity className="w-4 h-4" />;
      case "goal":
        return <Zap className="w-4 h-4" />;
      case "booking":
        return <Users className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "live":
        return "bg-red-500 animate-pulse";
      case "recent":
        return "bg-primary";
      case "hot":
        return "bg-accent";
      default:
        return "bg-muted";
    }
  };

  return (
    <section className="py-12 bg-background">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-2 kicksy-gradient-text">
              Live Updates
            </h2>
            <p className="text-muted-foreground">
              Real-time sports action and booking alerts
            </p>
          </div>
          <Button variant="outline" size="sm">
            View All
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {updates.map((update, index) => (
            <Card 
              key={update.id} 
              className="p-4 hover-glow group cursor-pointer animate-slide-in-bottom"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${getStatusColor(update.status)}`} />
                  <span className="text-xs text-muted-foreground font-medium">
                    {update.sport}
                  </span>
                </div>
                <div className="flex items-center gap-1 text-muted-foreground">
                  {getStatusIcon(update.type)}
                  <span className="text-xs">{update.time}</span>
                </div>
              </div>
              
              <h3 className="font-bold text-sm mb-2 text-foreground group-hover:text-primary transition-colors duration-300">
                {update.title}
              </h3>
              
              <p className="text-sm text-muted-foreground line-clamp-2">
                {update.content}
              </p>
              
              {update.status === "live" && (
                <Badge variant="destructive" className="mt-3 text-xs bg-red-500/10 text-red-500 border-red-500/20">
                  LIVE
                </Badge>
              )}
            </Card>
          ))}
        </div>

        {/* Real-time ticker */}
        <Card className="mt-8 p-4 bg-gradient-primary text-primary-foreground">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-white rounded-full animate-pulse" />
              <span className="font-bold">LIVE</span>
            </div>
            <div className="flex-1 overflow-hidden">
              <div className="animate-marquee whitespace-nowrap">
                <span className="mx-8">🏏 India 287/6 vs Australia - World Cup Final Live</span>
                <span className="mx-8">⚽ Mumbai City FC 2-1 Kerala Blasters - 78th minute</span>
                <span className="mx-8">🤼 Pro Kabaddi Finals tonight - Limited tickets available</span>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
};

export default LiveUpdates;