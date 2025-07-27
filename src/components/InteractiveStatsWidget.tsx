import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TrendingUp, TrendingDown, BarChart3, Users, Trophy, Star, Zap, Target } from "lucide-react";

interface StatItem {
  label: string;
  value: string;
  change: number;
  trend: 'up' | 'down' | 'stable';
  icon: React.ComponentType<any>;
  color: string;
}

const InteractiveStatsWidget = () => {
  const [activeTab, setActiveTab] = useState('events');
  const [animatedValues, setAnimatedValues] = useState<{ [key: string]: number }>({});

  const stats = {
    events: [
      {
        label: "Live Events",
        value: "147",
        change: 12,
        trend: 'up' as const,
        icon: Zap,
        color: "text-red-500"
      },
      {
        label: "Today's Matches",
        value: "23",
        change: 5,
        trend: 'up' as const,
        icon: Trophy,
        color: "text-primary"
      },
      {
        label: "Upcoming",
        value: "891",
        change: -3,
        trend: 'down' as const,
        icon: Target,
        color: "text-blue-500"
      },
      {
        label: "This Month",
        value: "2,341",
        change: 18,
        trend: 'up' as const,
        icon: BarChart3,
        color: "text-green-500"
      }
    ],
    audience: [
      {
        label: "Active Users",
        value: "45.2K",
        change: 8,
        trend: 'up' as const,
        icon: Users,
        color: "text-primary"
      },
      {
        label: "Tickets Sold",
        value: "12.8K",
        change: 15,
        trend: 'up' as const,
        icon: Trophy,
        color: "text-green-500"
      },
      {
        label: "Revenue",
        value: "₹2.1M",
        change: 22,
        trend: 'up' as const,
        icon: TrendingUp,
        color: "text-tertiary"
      },
      {
        label: "Rating",
        value: "4.8",
        change: 0.2,
        trend: 'up' as const,
        icon: Star,
        color: "text-yellow-500"
      }
    ]
  };

  const tabs = [
    { id: 'events', label: 'Events', icon: Trophy },
    { id: 'audience', label: 'Audience', icon: Users }
  ];

  useEffect(() => {
    const currentStats = stats[activeTab as keyof typeof stats];
    currentStats.forEach((stat, index) => {
      setTimeout(() => {
        const targetValue = parseInt(stat.value.replace(/[^\d]/g, ''));
        let currentValue = 0;
        const increment = targetValue / 50;
        
        const timer = setInterval(() => {
          currentValue += increment;
          if (currentValue >= targetValue) {
            setAnimatedValues(prev => ({ ...prev, [stat.label]: targetValue }));
            clearInterval(timer);
          } else {
            setAnimatedValues(prev => ({ ...prev, [stat.label]: Math.floor(currentValue) }));
          }
        }, 20);
      }, index * 100);
    });
  }, [activeTab]);

  const formatAnimatedValue = (stat: StatItem, animatedValue: number) => {
    if (stat.value.includes('K')) {
      return `${(animatedValue / 1000).toFixed(1)}K`;
    } else if (stat.value.includes('M')) {
      return `₹${(animatedValue / 1000000).toFixed(1)}M`;
    } else if (stat.value.includes('.')) {
      return (animatedValue / 10).toFixed(1);
    }
    return animatedValue.toLocaleString();
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <TrendingUp className="w-3 h-3 text-green-500" />;
      case 'down': return <TrendingDown className="w-3 h-3 text-red-500" />;
      default: return null;
    }
  };

  return (
    <section className="py-12 bg-gradient-subtle">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8 animate-slide-in-bottom">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-sports bg-clip-text text-transparent">
              Live Sports Analytics
            </h2>
            <p className="text-muted-foreground text-lg">
              Real-time insights into the sports entertainment ecosystem
            </p>
          </div>

          {/* Tab Navigation */}
          <div className="flex justify-center mb-8">
            <div className="flex bg-card border border-border/50 rounded-lg p-1 shadow-lg">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <Button
                    key={tab.id}
                    variant={activeTab === tab.id ? "default" : "ghost"}
                    className={`flex items-center gap-2 transition-all duration-300 ${
                      activeTab === tab.id 
                        ? 'shadow-floating scale-105' 
                        : 'hover:scale-105'
                    }`}
                    onClick={() => setActiveTab(tab.id)}
                  >
                    <Icon className="w-4 h-4" />
                    {tab.label}
                  </Button>
                );
              })}
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {stats[activeTab as keyof typeof stats].map((stat, index) => {
              const Icon = stat.icon;
              const animatedValue = animatedValues[stat.label] || 0;
              
              return (
                <Card 
                  key={stat.label}
                  className="group hover:shadow-floating transition-all duration-500 hover:-translate-y-2 animate-scale-in border-border/50 bg-card/80 backdrop-blur-sm"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <CardHeader className="pb-2">
                    <CardTitle className="flex items-center justify-between text-sm font-medium text-muted-foreground">
                      <span>{stat.label}</span>
                      <div className={`p-2 rounded-full bg-muted/20 group-hover:scale-110 transition-transform duration-300 ${stat.color}`}>
                        <Icon className="w-3 h-3" />
                      </div>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="space-y-3">
                      <div className={`text-2xl md:text-3xl font-bold ${stat.color} group-hover:scale-110 transition-transform duration-300`}>
                        {formatAnimatedValue(stat, animatedValue)}
                      </div>
                      
                      <div className="flex items-center gap-2">
                        {getTrendIcon(stat.trend)}
                        <Badge 
                          variant={stat.trend === 'up' ? 'default' : 'secondary'}
                          className={`text-xs ${
                            stat.trend === 'up' 
                              ? 'bg-green-500/10 text-green-500 border-green-500/20' 
                              : 'bg-red-500/10 text-red-500 border-red-500/20'
                          } group-hover:scale-105 transition-transform duration-300`}
                        >
                          {stat.change > 0 ? '+' : ''}{stat.change}%
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Additional Insights */}
          <Card className="mt-8 bg-gradient-card border-border/50 animate-slide-in-bottom [animation-delay:600ms]">
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center group cursor-pointer">
                  <div className="p-4 bg-primary/10 rounded-full w-16 h-16 mx-auto mb-3 group-hover:bg-primary/20 transition-colors duration-300 flex items-center justify-center">
                    <Trophy className="w-8 h-8 text-primary group-hover:animate-wiggle" />
                  </div>
                  <h4 className="font-semibold mb-1 group-hover:text-primary transition-colors duration-300">Peak Season</h4>
                  <p className="text-sm text-muted-foreground">December shows highest activity with 40% more bookings</p>
                </div>
                
                <div className="text-center group cursor-pointer">
                  <div className="p-4 bg-secondary/10 rounded-full w-16 h-16 mx-auto mb-3 group-hover:bg-secondary/20 transition-colors duration-300 flex items-center justify-center">
                    <Target className="w-8 h-8 text-secondary group-hover:animate-wiggle" />
                  </div>
                  <h4 className="font-semibold mb-1 group-hover:text-secondary transition-colors duration-300">Top Sport</h4>
                  <p className="text-sm text-muted-foreground">Cricket leads with 45% of total bookings this month</p>
                </div>
                
                <div className="text-center group cursor-pointer">
                  <div className="p-4 bg-tertiary/10 rounded-full w-16 h-16 mx-auto mb-3 group-hover:bg-tertiary/20 transition-colors duration-300 flex items-center justify-center">
                    <Star className="w-8 h-8 text-tertiary group-hover:animate-wiggle" />
                  </div>
                  <h4 className="font-semibold mb-1 group-hover:text-tertiary transition-colors duration-300">User Satisfaction</h4>
                  <p className="text-sm text-muted-foreground">98% of users rate their experience as excellent</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default InteractiveStatsWidget;