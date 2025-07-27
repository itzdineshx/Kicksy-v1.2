import Header from "@/components/Header";
import HeroCarousel from "@/components/HeroCarousel";
import MobileHeroSection from "@/components/MobileHeroSection";
import QuickActions from "@/components/QuickActions";
import LiveUpdates from "@/components/LiveUpdates";
import LiveScoreTicker from "@/components/LiveScoreTicker";
import InteractiveStatsWidget from "@/components/InteractiveStatsWidget";
import FeaturedEvents from "@/components/FeaturedEvents";
import SportsCategories from "@/components/SportsCategories";
import StatsShowcase from "@/components/StatsShowcase";
import PerformanceStats from "@/components/PerformanceStats";
import PremiumFeatures from "@/components/PremiumFeatures";
import TrendingSection from "@/components/TrendingSection";
import InteractiveMap from "@/components/InteractiveMap";
import PlayerProfiles from "@/components/PlayerProfiles";
import TestimonialsSection from "@/components/TestimonialsSection";
import AITrendingUpdates from "@/components/AITrendingUpdates";
import NewsletterCTA from "@/components/NewsletterCTA";
import Footer from "@/components/Footer";
import EnhancedRecommendations from "@/components/EnhancedRecommendations";
import ChatbotWidget from "@/components/ChatbotWidget";
import WeatherIntegration from "@/components/WeatherIntegration";
import FloatingActionMenu from "@/components/FloatingActionMenu";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        {/* Hero Section - Responsive */}
        <div className="hidden md:block">
          <section className="container mx-auto px-4 py-8">
            <HeroCarousel />
          </section>
        </div>
        
        <div className="md:hidden">
          <MobileHeroSection />
        </div>

        {/* Enhanced Quick Actions */}
        <section className="container mx-auto px-4 py-8">
          <div className="mt-8 text-center">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
              <Button asChild size="lg" className="h-12">
                <Link to="/events">Browse Events</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="h-12">
                <Link to="/venues">Find Venues</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="h-12">
                <Link to="/live-scores">Live Scores</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="h-12">
                <Link to="/news">Latest News</Link>
              </Button>
            </div>
          </div>
        </section>
        
        {/* Live Updates */}
        <LiveUpdates />
        
        {/* Live Score Ticker */}
        <LiveScoreTicker />
        
        {/* Featured Events - Priority Content */}
        <FeaturedEvents />
        
        {/* Sports Categories */}
        <SportsCategories />
        
        {/* Interactive Stats Widget */}
        <InteractiveStatsWidget />
        
        {/* Recommended for You - AI-powered personalization */}
        <EnhancedRecommendations />
        
        {/* Stats Showcase */}
        <StatsShowcase />
        
        {/* Performance Stats */}
        <PerformanceStats />
        
        {/* Premium Features */}
        <PremiumFeatures />
        
        {/* Weather Integration Section */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold bg-gradient-sports bg-clip-text text-transparent mb-4">
                Weather-Smart Event Planning
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                AI-powered weather insights help you choose the perfect events with optimal conditions
              </p>
            </div>
            <WeatherIntegration 
              eventDate="Dec 28, 2024"
              venue="Wankhede Stadium, Mumbai"
              sport="Cricket"
            />
          </div>
        </section>
        
        {/* Trending Section */}
        <TrendingSection />
        
        {/* Interactive Map with CTA */}
        <section className="py-16 bg-muted/50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4">Find Events Near You</h2>
              <Button asChild size="lg">
                <Link to="/venues">Explore All Venues</Link>
              </Button>
            </div>
            <InteractiveMap />
          </div>
        </section>
        
        {/* Player Profiles */}
        <PlayerProfiles />
        
        
        {/* Testimonials */}
        <TestimonialsSection />
        
        {/* Newsletter CTA */}
        <NewsletterCTA />
        
        
        
        
      </main>
      <Footer />
      
      {/* Floating Action Menu */}
      <FloatingActionMenu />
      
      {/* Chatbot Widget */}
      <ChatbotWidget />
    </div>
  );
};

export default Index;
