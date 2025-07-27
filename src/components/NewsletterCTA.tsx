import { useState } from "react";
import { Mail, Send, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

const NewsletterCTA = () => {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const { toast } = useToast();

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    setIsSubscribed(true);
    toast({
      title: "Successfully subscribed!",
      description: "You'll receive the latest sports news and exclusive offers.",
    });
    
    setTimeout(() => {
      setIsSubscribed(false);
      setEmail("");
    }, 3000);
  };

  return (
    <section className="py-20 bg-gradient-to-r from-primary/10 via-secondary/10 to-tertiary/10 pattern-dots">
      <div className="container mx-auto px-4">
        <Card className="max-w-4xl mx-auto border-0 shadow-floating bg-gradient-card overflow-hidden animate-scale-in">
          <CardContent className="p-12 text-center relative">
            {/* Background decoration */}
            <div className="absolute inset-0 bg-gradient-mesh opacity-30" />
            <div className="absolute top-8 left-8 text-6xl opacity-10 animate-float">📧</div>
            <div className="absolute bottom-8 right-8 text-6xl opacity-10 animate-float [animation-delay:1s]">🏆</div>
            
            <div className="relative z-10">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-6 animate-pulse-glow">
                <Mail className="w-8 h-8 text-primary" />
              </div>
              
              <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-sports bg-clip-text text-transparent">
                Never Miss a Game
              </h2>
              
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
                Get exclusive access to ticket presales, breaking sports news, and special offers delivered straight to your inbox
              </p>
              
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto mb-8">
                <div className="relative flex-1">
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-12 pr-4 h-12 text-lg border-border/60 focus:border-primary/50 focus:shadow-floating transition-all duration-300"
                    required
                  />
                  <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                </div>
                <Button 
                  type="submit" 
                  size="lg"
                  disabled={isSubscribed}
                  className="h-12 px-8 magnetic-button hover:scale-105 transition-all duration-300"
                >
                  {isSubscribed ? (
                    <>
                      <Check className="w-5 h-5 mr-2" />
                      Subscribed!
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5 mr-2" />
                      Subscribe
                    </>
                  )}
                </Button>
              </form>
              
              <div className="flex flex-wrap justify-center gap-8 text-sm text-muted-foreground animate-slide-in-bottom [animation-delay:600ms]">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-primary rounded-full mr-2 animate-pulse" />
                  Breaking News
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-secondary rounded-full mr-2 animate-pulse [animation-delay:200ms]" />
                  Exclusive Offers
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-tertiary rounded-full mr-2 animate-pulse [animation-delay:400ms]" />
                  Presale Access
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-accent rounded-full mr-2 animate-pulse [animation-delay:600ms]" />
                  No Spam
                </div>
              </div>
              
              <p className="text-xs text-muted-foreground mt-6">
                Join 100,000+ sports fans • Unsubscribe anytime • Privacy guaranteed
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default NewsletterCTA;