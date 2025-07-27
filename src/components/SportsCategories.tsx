import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

const SportsCategories = () => {
  const navigate = useNavigate();
  const categories = [
    {
      id: 1,
      name: "Cricket",
      icon: "🏏",
      upcomingEvents: 24,
      description: "From IPL to international matches",
      gradient: "from-primary to-primary-glow",
      textColor: "text-primary-foreground"
    },
    {
      id: 2,
      name: "Football",
      icon: "⚽",
      upcomingEvents: 18,
      description: "ISL, I-League and more",
      gradient: "from-secondary to-secondary/80",
      textColor: "text-secondary-foreground"
    },
    {
      id: 3,
      name: "Kabaddi",
      icon: "🤼",
      upcomingEvents: 12,
      description: "Pro Kabaddi League action",
      gradient: "from-tertiary to-tertiary/80",
      textColor: "text-tertiary-foreground"
    },
    {
      id: 4,
      name: "Badminton",
      icon: "🏸",
      upcomingEvents: 8,
      description: "BWF tournaments and leagues",
      gradient: "from-accent to-accent/80",
      textColor: "text-accent-foreground"
    },
    {
      id: 5,
      name: "Tennis",
      icon: "🎾",
      upcomingEvents: 6,
      description: "ATP and WTA events",
      gradient: "from-primary to-secondary",
      textColor: "text-primary-foreground"
    },
    {
      id: 6,
      name: "Hockey",
      icon: "🏑",
      upcomingEvents: 10,
      description: "Hockey India League",
      gradient: "from-secondary to-tertiary",
      textColor: "text-secondary-foreground"
    }
  ];

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 animate-slide-in-bottom">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-sports bg-clip-text text-transparent">
            Browse by Sports
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Find tickets for your favorite sports and discover new exciting events
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
          {categories.map((category, index) => (
            <Card 
              key={category.id} 
              className="group cursor-pointer overflow-hidden hover:shadow-floating transition-all duration-500 hover:-translate-y-3 hover:scale-110 animate-scale-in"
              style={{ animationDelay: `${index * 100}ms` }}
              onClick={() => navigate(`/sports/${category.name.toLowerCase()}`)}
            >
              <CardContent className="p-0">
                <div className={`bg-gradient-to-br ${category.gradient} p-6 text-center relative overflow-hidden group-hover:shadow-glow transition-shadow duration-500`}>
                  {/* Background Pattern */}
                  <div className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity duration-500">
                    <div className="absolute top-2 right-2 text-4xl transform rotate-12 group-hover:rotate-45 transition-transform duration-500">
                      {category.icon}
                    </div>
                    <div className="absolute bottom-2 left-2 text-2xl transform -rotate-12 opacity-50 group-hover:-rotate-45 group-hover:opacity-70 transition-all duration-500">
                      {category.icon}
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="relative z-10">
                    <div className="text-4xl md:text-5xl mb-3 group-hover:animate-stadium-bounce group-hover:scale-125 transition-transform duration-300">
                      {category.icon}
                    </div>
                    <h3 className={`font-bold text-lg md:text-xl mb-2 ${category.textColor}`}>
                      {category.name}
                    </h3>
                    <p className={`text-sm ${category.textColor} opacity-90 mb-3`}>
                      {category.description}
                    </p>
                    <div className={`inline-flex items-center gap-1 text-sm font-medium ${category.textColor} opacity-80 group-hover:opacity-100 transition-opacity duration-300`}>
                      <span>{category.upcomingEvents} events</span>
                      <ArrowRight className="w-3 h-3 group-hover:translate-x-2 transition-transform duration-300" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Stats */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 animate-slide-in-bottom [animation-delay:800ms]">
          <div className="text-center group cursor-pointer">
            <div className="text-3xl md:text-4xl font-bold text-primary mb-2 group-hover:scale-110 transition-transform duration-300">500+</div>
            <p className="text-muted-foreground group-hover:text-foreground transition-colors duration-300">Events Monthly</p>
          </div>
          <div className="text-center group cursor-pointer">
            <div className="text-3xl md:text-4xl font-bold text-secondary mb-2 group-hover:scale-110 transition-transform duration-300">50+</div>
            <p className="text-muted-foreground group-hover:text-foreground transition-colors duration-300">Cities Covered</p>
          </div>
          <div className="text-center group cursor-pointer">
            <div className="text-3xl md:text-4xl font-bold text-tertiary mb-2 group-hover:scale-110 transition-transform duration-300">1M+</div>
            <p className="text-muted-foreground group-hover:text-foreground transition-colors duration-300">Happy Fans</p>
          </div>
          <div className="text-center group cursor-pointer">
            <div className="text-3xl md:text-4xl font-bold text-primary mb-2 group-hover:scale-110 transition-transform duration-300">24/7</div>
            <p className="text-muted-foreground group-hover:text-foreground transition-colors duration-300">Support</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SportsCategories;