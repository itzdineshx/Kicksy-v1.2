import React, { createContext, useContext, useState, useEffect } from "react";
import { useLocalStorage, UserProfile, BookingRecord } from "./LocalStorageProvider";
import { useToast } from "@/hooks/use-toast";

interface UserStats {
  totalBookings: number;
  totalSpent: number;
  favoriteVenue: string;
  favoriteSport: string;
  eventsAttended: number;
  upcomingEvents: number;
  memberSince: string;
  loyaltyPoints: number;
}

interface UserDataContextType {
  // User management
  isLoggedIn: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  register: (userData: Partial<UserProfile>) => Promise<boolean>;
  
  // User stats and analytics
  userStats: UserStats;
  refreshStats: () => void;
  
  // Quick actions
  getUpcomingBookings: () => BookingRecord[];
  getRecentBookings: () => BookingRecord[];
  getPastBookings: () => BookingRecord[];
  
  // Recommendations based on user data
  getPersonalizedRecommendations: () => string[];
  
  // User activity tracking
  trackActivity: (action: string, data?: any) => void;
  getActivityHistory: () => any[];
}

const UserDataContext = createContext<UserDataContextType | undefined>(undefined);

export const useUserData = () => {
  const context = useContext(UserDataContext);
  if (!context) {
    throw new Error("useUserData must be used within a UserDataProvider");
  }
  return context;
};

export const UserDataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { 
    userProfile, 
    updateUserProfile, 
    bookingHistory, 
    preferences 
  } = useLocalStorage();
  const { toast } = useToast();
  
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userStats, setUserStats] = useState<UserStats>({
    totalBookings: 0,
    totalSpent: 0,
    favoriteVenue: "",
    favoriteSport: "",
    eventsAttended: 0,
    upcomingEvents: 0,
    memberSince: "",
    loyaltyPoints: 0,
  });
  
  const [activityHistory, setActivityHistory] = useState<any[]>([]);

  // Check if user is logged in on mount
  useEffect(() => {
    const checkLoginStatus = () => {
      const loginStatus = localStorage.getItem("isLoggedIn");
      const storedProfile = localStorage.getItem("userProfile");
      
      if (loginStatus === "true" && storedProfile) {
        setIsLoggedIn(true);
      }
    };
    
    checkLoginStatus();
  }, []);

  // Update stats when booking history or user profile changes
  useEffect(() => {
    refreshStats();
  }, [bookingHistory, userProfile]);

  // Mock login function
  const login = async (email: string, password: string): Promise<boolean> => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock validation - in real app, this would validate against a backend
    if (email && password.length >= 6) {
      setIsLoggedIn(true);
      localStorage.setItem("isLoggedIn", "true");
      
      // Create or update user profile if it doesn't exist
      if (!userProfile) {
        const newProfile: UserProfile = {
          id: `user_${Date.now()}`,
          name: email.split('@')[0] || "User",
          email: email,
          preferences: {
            favoriteTeams: [],
            favoriteSports: [],
            notifications: true,
            emailUpdates: true,
            location: "Mumbai, India",
          },
          subscription: {
            type: "free",
            features: ["basic booking", "event notifications"],
          },
        };
        updateUserProfile(newProfile);
      }
      
      trackActivity("login", { email, timestamp: new Date().toISOString() });
      
      toast({
        title: "Welcome back!",
        description: "You have successfully logged in.",
      });
      
      return true;
    }
    
    toast({
      title: "Login failed",
      description: "Please check your credentials and try again.",
      variant: "destructive",
    });
    
    return false;
  };

  // Mock registration function
  const register = async (userData: Partial<UserProfile>): Promise<boolean> => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    if (userData.email && userData.name) {
      const newProfile: UserProfile = {
        id: `user_${Date.now()}`,
        name: userData.name,
        email: userData.email,
        phone: userData.phone,
        preferences: {
          favoriteTeams: userData.preferences?.favoriteTeams || [],
          favoriteSports: userData.preferences?.favoriteSports || [],
          notifications: true,
          emailUpdates: true,
          location: userData.preferences?.location || "Mumbai, India",
        },
        subscription: {
          type: "free",
          features: ["basic booking", "event notifications"],
        },
      };
      
      updateUserProfile(newProfile);
      setIsLoggedIn(true);
      localStorage.setItem("isLoggedIn", "true");
      
      trackActivity("register", { 
        email: userData.email, 
        timestamp: new Date().toISOString() 
      });
      
      toast({
        title: "Registration successful!",
        description: "Welcome to Sports Central! Your account has been created.",
      });
      
      return true;
    }
    
    toast({
      title: "Registration failed",
      description: "Please fill in all required fields.",
      variant: "destructive",
    });
    
    return false;
  };

  // Logout function
  const logout = () => {
    setIsLoggedIn(false);
    localStorage.setItem("isLoggedIn", "false");
    
    trackActivity("logout", { timestamp: new Date().toISOString() });
    
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
  };

  // Calculate user statistics
  const refreshStats = () => {
    if (!bookingHistory.length) {
      return;
    }

    const now = new Date();
    const totalSpent = bookingHistory.reduce((sum, booking) => sum + booking.totalAmount, 0);
    const confirmedBookings = bookingHistory.filter(b => b.status === "confirmed");
    
    // Calculate favorite venue and sport
    const venues: { [key: string]: number } = {};
    const sports: { [key: string]: number } = {};
    
    bookingHistory.forEach(booking => {
      venues[booking.venue] = (venues[booking.venue] || 0) + 1;
      // Extract sport from eventTitle (simplified logic)
      const sport = booking.eventTitle.toLowerCase().includes('cricket') ? 'cricket' :
                   booking.eventTitle.toLowerCase().includes('football') ? 'football' :
                   booking.eventTitle.toLowerCase().includes('kabaddi') ? 'kabaddi' : 'other';
      sports[sport] = (sports[sport] || 0) + 1;
    });
    
    const favoriteVenue = Object.keys(venues).reduce((a, b) => venues[a] > venues[b] ? a : b, "");
    const favoriteSport = Object.keys(sports).reduce((a, b) => sports[a] > sports[b] ? a : b, "");
    
    // Count upcoming vs past events
    const upcomingEvents = bookingHistory.filter(booking => {
      const eventDate = new Date(booking.eventDate);
      return eventDate > now && booking.status === "confirmed";
    }).length;
    
    const eventsAttended = bookingHistory.filter(booking => {
      const eventDate = new Date(booking.eventDate);
      return eventDate < now && booking.status === "confirmed";
    }).length;
    
    setUserStats({
      totalBookings: bookingHistory.length,
      totalSpent,
      favoriteVenue,
      favoriteSport,
      eventsAttended,
      upcomingEvents,
      memberSince: userProfile?.id ? new Date(parseInt(userProfile.id.split('_')[1])).toLocaleDateString() : "",
      loyaltyPoints: Math.floor(totalSpent / 100), // 1 point per ₹100 spent
    });
  };

  // Get bookings by type
  const getUpcomingBookings = () => {
    const now = new Date();
    return bookingHistory.filter(booking => {
      const eventDate = new Date(booking.eventDate);
      return eventDate > now && booking.status === "confirmed";
    }).sort((a, b) => new Date(a.eventDate).getTime() - new Date(b.eventDate).getTime());
  };

  const getRecentBookings = () => {
    return bookingHistory
      .sort((a, b) => new Date(b.bookingDate).getTime() - new Date(a.bookingDate).getTime())
      .slice(0, 5);
  };

  const getPastBookings = () => {
    const now = new Date();
    return bookingHistory.filter(booking => {
      const eventDate = new Date(booking.eventDate);
      return eventDate < now;
    }).sort((a, b) => new Date(b.eventDate).getTime() - new Date(a.eventDate).getTime());
  };

  // Get personalized recommendations based on user data
  const getPersonalizedRecommendations = () => {
    const favoriteSports = userProfile?.preferences.favoriteSports || [];
    const favoriteTeams = userProfile?.preferences.favoriteTeams || [];
    
    // Simple recommendation logic based on user preferences
    const recommendations = [];
    
    if (favoriteSports.includes("cricket")) {
      recommendations.push("cricket-final-2024");
    }
    if (favoriteSports.includes("football")) {
      recommendations.push("football-championship-2024");
    }
    if (favoriteSports.includes("kabaddi")) {
      recommendations.push("kabaddi-league-2024");
    }
    
    // Add trending events if user has less than 3 specific preferences
    if (recommendations.length < 3) {
      recommendations.push("tennis-masters-2024", "hockey-league-2024");
    }
    
    return recommendations;
  };

  // Track user activity
  const trackActivity = (action: string, data?: any) => {
    const activity = {
      id: `activity_${Date.now()}`,
      action,
      data,
      timestamp: new Date().toISOString(),
    };
    
    setActivityHistory(prev => [activity, ...prev.slice(0, 49)]); // Keep last 50 activities
    
    // Save to localStorage
    const stored = localStorage.getItem("activityHistory");
    const activities = stored ? JSON.parse(stored) : [];
    activities.unshift(activity);
    localStorage.setItem("activityHistory", JSON.stringify(activities.slice(0, 50)));
  };

  const getActivityHistory = () => {
    return activityHistory;
  };

  return (
    <UserDataContext.Provider value={{
      isLoggedIn,
      login,
      logout,
      register,
      userStats,
      refreshStats,
      getUpcomingBookings,
      getRecentBookings,
      getPastBookings,
      getPersonalizedRecommendations,
      trackActivity,
      getActivityHistory,
    }}>
      {children}
    </UserDataContext.Provider>
  );
};