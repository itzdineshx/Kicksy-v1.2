import { Trophy, Users, MapPin, Calendar } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const StatsShowcase = () => {
  const stats = [
    {
      icon: Trophy,
      value: "2.5M+",
      label: "Tickets Sold",
      description: "Across all sports events",
      gradient: "from-primary to-primary-glow",
      iconBg: "bg-primary/10"
    },
    {
      icon: Users,
      value: "5M+",
      label: "Sports Fans",
      description: "Trust our platform",
      gradient: "from-secondary to-secondary/80",
      iconBg: "bg-secondary/10"
    },
    {
      icon: MapPin,
      value: "75+",
      label: "Cities",
      description: "Events available",
      gradient: "from-tertiary to-tertiary/80",
      iconBg: "bg-tertiary/10"
    },
    {
      icon: Calendar,
      value: "1000+",
      label: "Events",
      description: "Every month",
      gradient: "from-accent to-accent/80",
      iconBg: "bg-accent/10"
    }
  ];

  return (
    <section className="py-20 bg-gradient-mesh">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-slide-in-bottom">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-sports bg-clip-text text-transparent">
            India's Largest Sports Platform
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Join millions of sports enthusiasts who trust us for the best live sports experience
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <Card 
              key={index}
              className="group hover:shadow-floating transition-all duration-500 hover:-translate-y-2 animate-scale-in border-0 bg-card/60 backdrop-blur-sm"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <CardContent className="p-8 text-center relative overflow-hidden">
                {/* Background decoration */}
                <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${stat.gradient} opacity-5 rounded-full transform translate-x-16 -translate-y-16 group-hover:scale-150 transition-transform duration-700`} />
                
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full ${stat.iconBg} mb-6 group-hover:scale-110 transition-all duration-500 group-hover:rotate-6`}>
                  <stat.icon className="w-8 h-8 text-primary group-hover:animate-wiggle" />
                </div>
                
                <div className="relative z-10">
                  <div className={`text-4xl md:text-5xl font-bold mb-2 bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300`}>
                    {stat.value}
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-foreground group-hover:text-primary transition-colors duration-300">
                    {stat.label}
                  </h3>
                  <p className="text-muted-foreground group-hover:text-foreground transition-colors duration-300">
                    {stat.description}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Trust indicators */}
        <div className="mt-20 text-center animate-slide-in-bottom [animation-delay:800ms]">
          <p className="text-muted-foreground mb-8 text-lg">Trusted by leading sports organizations</p>
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-60 hover:opacity-80 transition-opacity duration-500">
            <div className="text-2xl font-bold">BCCI</div>
            <div className="text-2xl font-bold">ISL</div>
            <div className="text-2xl font-bold">PKL</div>
            <div className="text-2xl font-bold">BWF</div>
            <div className="text-2xl font-bold">AIFF</div>
            <div className="text-2xl font-bold">HIL</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatsShowcase;