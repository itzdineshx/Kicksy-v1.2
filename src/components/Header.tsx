import { useState } from "react";
import { Link, useLocation as useRouterLocation } from "react-router-dom";
import { Search, Menu, MapPin, User, ShoppingCart, Heart, Bell, LogOut, Settings, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useAuth } from "@/contexts/AuthContext";
import { useLocation } from "@/contexts/LocationContext";

import { useWishlist } from "./WishlistProvider";
import { useCart } from "./CartProvider";
import { useNotifications, NotificationPanel } from "./NotificationProvider";
import MobileNotificationManager from "./MobileNotificationManager";
import GlobalSearchBar from "./GlobalSearchBar";
import { CartSidebar } from "./CartSidebar";
import { WishlistSidebar } from "./WishlistSidebar";
import WeatherWidget from "./WeatherWidget";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  
  const { wishlist } = useWishlist();
  const { getTotalItems } = useCart();
  const { unreadCount } = useNotifications();
  const { isAuthenticated, user, logout, role } = useAuth();
  const { selectedCity, setSelectedCity } = useLocation();
  const routerLocation = useRouterLocation();

  // Helper function to check if a route is active
  const isActiveRoute = (path: string) => {
    return routerLocation.pathname === path || routerLocation.pathname.startsWith(path + '/');
  };

  const cities = [
    "Mumbai", "Delhi", "Bengaluru", "Chennai", "Kolkata", 
    "Hyderabad", "Pune", "Ahmedabad", "Jaipur", "Lucknow"
  ];

  const sports = ["Cricket", "Football", "Kabaddi", "Tennis", "Hockey", "Badminton"];

  const getDashboardLink = () => {
    switch (role) {
      case 'admin':
        return '/admin';
      case 'organizer':
        return '/organizer';
      case 'user':
        return '/dashboard';
      default:
        return '/';
    }
  };

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-border/40 glass-effect shadow-elevated">
        <div className="container mx-auto px-4">
          {/* Top Bar */}
          <div className="flex h-16 md:h-20 lg:h-24 items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="relative">
                <img 
                  src="/lovable-uploads/2e1be1c1-55e8-4a73-9401-61e6dec3e98d.png" 
                  alt="Kicksy - Your Ultimate Sports Booking Platform"
                  className="h-12 md:h-16 lg:h-20 w-auto group-hover:scale-110 transition-all duration-300 kicksy-logo-glow"
                />
              </div>
            </Link>

            {/* Desktop Search Bar */}
            <div className="hidden md:flex items-center space-x-4 flex-1 max-w-2xl mx-8">
              <GlobalSearchBar />
              <Select value={selectedCity} onValueChange={setSelectedCity}>
                <SelectTrigger className="w-40 border-border/60 hover:border-primary/50 transition-all duration-300">
                  <MapPin className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="City" />
                </SelectTrigger>
                <SelectContent className="bg-popover border border-border shadow-lg z-50">
                  {cities.map((city) => (
                    <SelectItem key={city} value={city} className="hover:bg-muted">
                      {city}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-6">
              <DropdownMenu>
                <DropdownMenuTrigger className="text-foreground hover:text-primary transition-all duration-300 font-medium relative group flex items-center gap-1">
                  Sports
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem asChild>
                    <Link to="/sports/cricket">Cricket</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/sports/football">Football</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/sports/kabaddi">Kabaddi</Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              
              <Link 
                to="/events" 
                className={`transition-all duration-300 font-medium relative group ${
                  isActiveRoute('/events') 
                    ? 'text-primary' 
                    : 'text-foreground hover:text-primary'
                }`}
              >
                Events
                <span className={`absolute -bottom-1 left-0 h-0.5 bg-primary transition-all duration-300 ${
                  isActiveRoute('/events') 
                    ? 'w-full' 
                    : 'w-0 group-hover:w-full'
                }`}></span>
              </Link>
              
              <Link 
                to="/venues" 
                className={`transition-all duration-300 font-medium relative group ${
                  isActiveRoute('/venues') 
                    ? 'text-primary' 
                    : 'text-foreground hover:text-primary'
                }`}
              >
                Venues
                <span className={`absolute -bottom-1 left-0 h-0.5 bg-primary transition-all duration-300 ${
                  isActiveRoute('/venues') 
                    ? 'w-full' 
                    : 'w-0 group-hover:w-full'
                }`}></span>
              </Link>
              
              <Link 
                to="/news" 
                className={`transition-all duration-300 font-medium relative group ${
                  isActiveRoute('/news') 
                    ? 'text-primary' 
                    : 'text-foreground hover:text-primary'
                }`}
              >
                News
                <span className={`absolute -bottom-1 left-0 h-0.5 bg-primary transition-all duration-300 ${
                  isActiveRoute('/news') 
                    ? 'w-full' 
                    : 'w-0 group-hover:w-full'
                }`}></span>
              </Link>
              
              <Link 
                to="/live-scores" 
                className={`transition-all duration-300 font-medium relative group ${
                  isActiveRoute('/live-scores') 
                    ? 'text-primary' 
                    : 'text-foreground hover:text-primary'
                }`}
              >
                Live Scores
                <span className={`absolute -bottom-1 left-0 h-0.5 bg-primary transition-all duration-300 ${
                  isActiveRoute('/live-scores') 
                    ? 'w-full' 
                    : 'w-0 group-hover:w-full'
                }`}></span>
              </Link>
            </nav>

            {/* Action Buttons */}
            <div className="flex items-center space-x-2 relative">
              <div className="hidden sm:block">
                <WeatherWidget />
              </div>
              
              {/* Desktop Notification Button */}
              <Button 
                variant="ghost" 
                size="icon" 
                className="relative hover-glow hidden md:flex"
                onClick={() => setIsNotificationOpen(!isNotificationOpen)}
              >
                <Bell className="w-5 h-5" />
                {unreadCount > 0 && (
                  <Badge className="absolute -top-1 -right-1 bg-destructive text-destructive-foreground">
                    {unreadCount}
                  </Badge>
                )}
              </Button>
              
              {/* Mobile Notification Manager */}
              <MobileNotificationManager />
              
              <NotificationPanel isOpen={isNotificationOpen} onClose={() => setIsNotificationOpen(false)} />
              
              <div className="hidden sm:block">
                <WishlistSidebar />
              </div>
              
              <div className="hidden sm:block">
                <CartSidebar />
              </div>
              
              {/* User Authentication */}
              <div className="hidden sm:block">
                {isAuthenticated ? (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback className="bg-primary text-primary-foreground">
                            {user?.email?.charAt(0).toUpperCase() || 'U'}
                          </AvatarFallback>
                        </Avatar>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56" align="end" forceMount>
                      <DropdownMenuItem asChild>
                        <Link to={getDashboardLink()} className="flex items-center gap-2">
                          <User className="w-4 h-4" />
                          Dashboard
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link to="/bookings" className="flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          My Bookings
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link to="/settings" className="flex items-center gap-2">
                          <Settings className="w-4 h-4" />
                          Settings
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={logout} className="flex items-center gap-2">
                        <LogOut className="w-4 h-4" />
                        Logout
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : (
                  <Button asChild>
                    <Link to="/auth">
                      <User className="w-4 h-4 mr-2" />
                      Login
                    </Link>
                  </Button>
                )}
              </div>
              
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                <Menu className="w-5 h-5" />
              </Button>
            </div>
          </div>

          {/* Mobile Search Bar */}
          <div className="md:hidden pb-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search events, teams, venues..."
                className="pl-10 pr-4"
              />
            </div>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="lg:hidden border-t pt-4 pb-4">
              <div className="flex flex-col space-y-4">
                <div className="flex space-x-2 overflow-x-auto pb-2">
                  {sports.map((sport) => (
                    <Button key={sport} variant="outline" size="sm" className="whitespace-nowrap">
                      {sport}
                    </Button>
                  ))}
                </div>
                <Select value={selectedCity} onValueChange={setSelectedCity}>
                  <SelectTrigger>
                    <MapPin className="w-4 h-4 mr-2" />
                    <SelectValue placeholder="Select City" />
                  </SelectTrigger>
                  <SelectContent className="bg-popover border border-border shadow-lg z-50">
                    {cities.map((city) => (
                      <SelectItem key={city} value={city} className="hover:bg-muted">
                        {city}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <div className="sm:hidden space-y-3">
                  {/* Mobile Action Buttons */}
                  <div className="flex justify-center gap-3 pb-3">
                    <WishlistSidebar />
                    <CartSidebar />
                  </div>
                  
                  {/* Authentication */}
                  {isAuthenticated ? (
                    <div className="flex flex-col space-y-2">
                      <Button variant="outline" asChild>
                        <Link to={getDashboardLink()}>Dashboard</Link>
                      </Button>
                      <Button variant="ghost" onClick={logout}>Logout</Button>
                    </div>
                  ) : (
                    <Button asChild>
                      <Link to="/auth">Login</Link>
                    </Button>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </header>
      
    </>
  );
};

export default Header;