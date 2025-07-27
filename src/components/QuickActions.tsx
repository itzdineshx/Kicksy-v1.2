import { Calendar, MapPin, Search, Trophy, Users, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const QuickActions = () => {
  const quickActions = [
    {
      icon: Calendar,
      title: "Today's Matches",
      description: "Live scores & schedules",
      count: "8 matches",
      color: "text-primary",
      bgColor: "bg-primary/10",
      borderColor: "border-primary/20"
    },
    {
      icon: Trophy,
      title: "Championships",
      description: "Ongoing tournaments",
      count: "5 active",
      color: "text-accent",
      bgColor: "bg-accent/10",
      borderColor: "border-accent/20"
    },
    {
      icon: MapPin,
      title: "Nearby Events",
      description: "Events in your city",
      count: "12 venues",
      color: "text-secondary",
      bgColor: "bg-secondary/10",
      borderColor: "border-secondary/20"
    },
    {
      icon: TrendingUp,
      title: "Trending",
      description: "Popular right now",
      count: "Hot picks",
      color: "text-tertiary",
      bgColor: "bg-tertiary/10",
      borderColor: "border-tertiary/20"
    }
  ];

  return (
    <section className="py-12 bg-gradient-mesh">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 kicksy-gradient-text">
            Quick Actions
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Fast access to everything you need for sports events
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {quickActions.map((action, index) => {
            const IconComponent = action.icon;
            return (
              <Card 
                key={index}
                className={`interactive-card p-4 md:p-6 ${action.bgColor} ${action.borderColor} border-2 hover-glow group`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`p-3 rounded-full ${action.bgColor} ${action.borderColor} border`}>
                    <IconComponent className={`w-6 h-6 ${action.color} group-hover:animate-bounce-gentle`} />
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    {action.count}
                  </Badge>
                </div>
                
                <h3 className="font-bold text-lg mb-2 text-foreground group-hover:text-primary transition-colors duration-300">
                  {action.title}
                </h3>
                <p className="text-muted-foreground text-sm mb-4">
                  {action.description}
                </p>
                
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className={`w-full ${action.color} hover:bg-background/50 font-medium`}
                >
                  Explore
                </Button>
              </Card>
            );
          })}
        </div>

        {/* Search Bar */}
        <div className="mt-12 max-w-2xl mx-auto">
          <Card className="p-6 glass-effect border border-white/20">
            <div className="flex items-center gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search events, teams, or venues..."
                  className="w-full pl-10 pr-4 py-3 bg-background/50 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-300"
                />
              </div>
              <Button variant="hero" className="px-6 py-3">
                Search
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default QuickActions;