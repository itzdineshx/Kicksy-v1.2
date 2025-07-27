import { TrendingUp, Users, Calendar, Trophy } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

const PerformanceStats = () => {
  const stats = [
    {
      icon: Users,
      title: "Active Users",
      value: "2.5M+",
      change: "+12%",
      progress: 85,
      color: "text-primary",
      bgColor: "bg-primary/10"
    },
    {
      icon: Calendar,
      title: "Events Hosted",
      value: "15,000+",
      change: "+8%",
      progress: 72,
      color: "text-secondary",
      bgColor: "bg-secondary/10"
    },
    {
      icon: Trophy,
      title: "Championships",
      value: "500+",
      change: "+25%",
      progress: 95,
      color: "text-accent",
      bgColor: "bg-accent/10"
    },
    {
      icon: TrendingUp,
      title: "Satisfaction",
      value: "98.5%",
      change: "+2%",
      progress: 98,
      color: "text-tertiary",
      bgColor: "bg-tertiary/10"
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-br from-background via-muted/20 to-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 kicksy-gradient-text">
            Platform Performance
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Trusted by millions of sports fans worldwide
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <Card 
                key={index}
                className={`p-6 hover-glow group relative overflow-hidden ${stat.bgColor} border-2 border-border/50`}
              >
                {/* Background Pattern */}
                <div className="absolute inset-0 pattern-dots opacity-5" />
                
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-3 rounded-full ${stat.bgColor} border border-current/20`}>
                      <IconComponent className={`w-6 h-6 ${stat.color} group-hover:animate-bounce-gentle`} />
                    </div>
                    <span className={`text-sm font-bold ${stat.color}`}>
                      {stat.change}
                    </span>
                  </div>
                  
                  <div className="mb-4">
                    <h3 className="text-2xl md:text-3xl font-black mb-1 text-foreground">
                      {stat.value}
                    </h3>
                    <p className="text-muted-foreground font-medium">
                      {stat.title}
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Progress</span>
                      <span className={`font-bold ${stat.color}`}>
                        {stat.progress}%
                      </span>
                    </div>
                    <Progress 
                      value={stat.progress} 
                      className="h-2"
                    />
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Additional Metrics */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="p-6 text-center glass-effect border border-white/20">
            <div className="text-4xl font-black text-primary mb-2">99.9%</div>
            <div className="text-muted-foreground">Uptime</div>
          </Card>
          <Card className="p-6 text-center glass-effect border border-white/20">
            <div className="text-4xl font-black text-secondary mb-2">&lt;2s</div>
            <div className="text-muted-foreground">Avg Response</div>
          </Card>
          <Card className="p-6 text-center glass-effect border border-white/20">
            <div className="text-4xl font-black text-accent mb-2">24/7</div>
            <div className="text-muted-foreground">Support</div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default PerformanceStats;