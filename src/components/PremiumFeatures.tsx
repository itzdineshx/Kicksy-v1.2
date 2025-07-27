import { Crown, Star, Zap, Shield, Heart, Gift } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const PremiumFeatures = () => {
  const features = [
    {
      icon: Crown,
      title: "VIP Experience",
      description: "Premium seating, exclusive lounges, and personalized service",
      benefits: ["Priority Booking", "Exclusive Areas", "Concierge Service"],
      price: "₹2,999",
      popular: true
    },
    {
      icon: Zap,
      title: "Fast Track",
      description: "Skip the lines and get instant access to all events",
      benefits: ["No Queue Entry", "Express Checkout", "Mobile Tickets"],
      price: "₹999",
      popular: false
    },
    {
      icon: Shield,
      title: "Premium Protection",
      description: "Full refund guarantee and event insurance coverage",
      benefits: ["100% Refund", "Event Insurance", "Weather Protection"],
      price: "₹599",
      popular: false
    }
  ];

  const perks = [
    { icon: Star, title: "Early Access", description: "Get tickets before general sale" },
    { icon: Heart, title: "Member Rewards", description: "Earn points on every purchase" },
    { icon: Gift, title: "Exclusive Offers", description: "Special discounts and promotions" }
  ];

  return (
    <section className="py-16 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-4 bg-gradient-primary text-primary-foreground border-0">
            Premium Membership
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 kicksy-gradient-text">
            Elevate Your Experience
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Unlock exclusive features and premium benefits for the ultimate sports experience
          </p>
        </div>

        {/* Premium Plans */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <Card 
                key={index}
                className={`relative p-8 hover-lift group ${
                  feature.popular 
                    ? 'border-2 border-primary shadow-glow bg-gradient-card' 
                    : 'border border-border'
                }`}
              >
                {feature.popular && (
                  <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gradient-primary text-primary-foreground border-0">
                    Most Popular
                  </Badge>
                )}
                
                <div className="text-center mb-6">
                  <div className={`inline-flex p-4 rounded-full mb-4 ${
                    feature.popular 
                      ? 'bg-primary/10 text-primary' 
                      : 'bg-muted text-muted-foreground'
                  }`}>
                    <IconComponent className="w-8 h-8 group-hover:animate-bounce-gentle" />
                  </div>
                  
                  <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    {feature.description}
                  </p>
                  
                  <div className="text-3xl font-black text-primary mb-4">
                    {feature.price}
                    <span className="text-sm text-muted-foreground font-normal">/month</span>
                  </div>
                </div>
                
                <ul className="space-y-3 mb-8">
                  {feature.benefits.map((benefit, idx) => (
                    <li key={idx} className="flex items-center gap-3 text-sm">
                      <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center">
                        <Star className="w-3 h-3 text-primary fill-current" />
                      </div>
                      {benefit}
                    </li>
                  ))}
                </ul>
                
                <Button 
                  variant={feature.popular ? "hero" : "outline"}
                  className="w-full font-semibold"
                  size="lg"
                >
                  {feature.popular ? "Get Premium" : "Choose Plan"}
                </Button>
              </Card>
            );
          })}
        </div>

        {/* Additional Perks */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {perks.map((perk, index) => {
            const IconComponent = perk.icon;
            return (
              <Card 
                key={index}
                className="p-6 text-center hover-glow group glass-effect border border-white/20"
              >
                <div className="inline-flex p-3 rounded-full bg-accent/10 text-accent mb-4">
                  <IconComponent className="w-6 h-6 group-hover:animate-wiggle" />
                </div>
                <h3 className="font-bold mb-2">{perk.title}</h3>
                <p className="text-muted-foreground text-sm">{perk.description}</p>
              </Card>
            );
          })}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <Button variant="hero" size="lg" className="magnetic-button">
            Start Your Premium Journey
          </Button>
          <p className="text-muted-foreground text-sm mt-4">
            30-day free trial • Cancel anytime • No hidden fees
          </p>
        </div>
      </div>
    </section>
  );
};

export default PremiumFeatures;