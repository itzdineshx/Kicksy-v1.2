import React, { createContext, useContext, useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";

// Types for stored data
export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone?: string;
  avatar?: string;
  preferences: {
    favoriteTeams: string[];
    favoriteSports: string[];
    notifications: boolean;
    emailUpdates: boolean;
    location: string;
  };
  subscription: {
    type: "free" | "premium" | "pro";
    features: string[];
    expiresAt?: string;
  };
}

export interface BookingRecord {
  id: string;
  eventId: string;
  eventTitle: string;
  eventDate: string;
  venue: string;
  seats: string[];
  totalAmount: number;
  bookingDate: string;
  status: "confirmed" | "pending" | "cancelled";
  paymentId?: string;
}

export interface CachedEvent {
  id: string;
  title: string;
  subtitle?: string;
  teams?: string;
  date: string;
  time: string;
  venue: string;
  price: string;
  originalPrice?: string;
  category: string;
  rating?: number;
  attendance?: string;
  image?: string;
  description?: string;
  highlights?: string[];
  lastUpdated: string;
}

export interface UserPreferences {
  theme: "light" | "dark" | "system";
  language: string;
  currency: string;
  notifications: {
    push: boolean;
    email: boolean;
    sms: boolean;
    eventReminders: boolean;
    priceAlerts: boolean;
  };
  privacy: {
    dataSharing: boolean;
    analytics: boolean;
    marketing: boolean;
  };
}

interface LocalStorageContextType {
  // User Profile
  userProfile: UserProfile | null;
  updateUserProfile: (profile: Partial<UserProfile>) => void;
  
  // Booking History
  bookingHistory: BookingRecord[];
  addBooking: (booking: BookingRecord) => void;
  updateBooking: (bookingId: string, updates: Partial<BookingRecord>) => void;
  
  // Cached Events
  cachedEvents: CachedEvent[];
  addEvent: (event: CachedEvent) => void;
  updateEvent: (eventId: string, updates: Partial<CachedEvent>) => void;
  getEvent: (eventId: string) => CachedEvent | null;
  
  // User Preferences
  preferences: UserPreferences;
  updatePreferences: (updates: Partial<UserPreferences>) => void;
  
  // Search History
  searchHistory: string[];
  addSearchTerm: (term: string) => void;
  clearSearchHistory: () => void;
  
  // Recently Viewed
  recentlyViewed: string[];
  addRecentlyViewed: (eventId: string) => void;
  
  // Clear all data
  clearAllData: () => void;
}

const LocalStorageContext = createContext<LocalStorageContextType | undefined>(undefined);

export const useLocalStorage = () => {
  const context = useContext(LocalStorageContext);
  if (!context) {
    throw new Error("useLocalStorage must be used within a LocalStorageProvider");
  }
  return context;
};

// Helper functions for localStorage operations
const getStoredData = (key: string, defaultValue: any): any => {
  try {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : defaultValue;
  } catch (error) {
    console.error(`Error reading ${key} from localStorage:`, error);
    return defaultValue;
  }
};

const setStoredData = (key: string, data: any): void => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error(`Error writing ${key} to localStorage:`, error);
  }
};

export const LocalStorageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { toast } = useToast();

  // State initialization from localStorage
  const [userProfile, setUserProfile] = useState<UserProfile | null>(
    () => getStoredData("userProfile", null)
  );

  const [bookingHistory, setBookingHistory] = useState<BookingRecord[]>(
    () => getStoredData("bookingHistory", [])
  );

  const [cachedEvents, setCachedEvents] = useState<CachedEvent[]>(
    () => getStoredData("cachedEvents", [])
  );

  const [preferences, setPreferences] = useState<UserPreferences>(
    () => getStoredData("preferences", {
      theme: "system",
      language: "en",
      currency: "INR",
      notifications: {
        push: true,
        email: true,
        sms: false,
        eventReminders: true,
        priceAlerts: true,
      },
      privacy: {
        dataSharing: false,
        analytics: true,
        marketing: false,
      },
    })
  );

  const [searchHistory, setSearchHistory] = useState<string[]>(
    () => getStoredData("searchHistory", [])
  );

  const [recentlyViewed, setRecentlyViewed] = useState<string[]>(
    () => getStoredData("recentlyViewed", [])
  );

  // Auto-save to localStorage when state changes
  useEffect(() => {
    setStoredData("userProfile", userProfile);
  }, [userProfile]);

  useEffect(() => {
    setStoredData("bookingHistory", bookingHistory);
  }, [bookingHistory]);

  useEffect(() => {
    setStoredData("cachedEvents", cachedEvents);
  }, [cachedEvents]);

  useEffect(() => {
    setStoredData("preferences", preferences);
  }, [preferences]);

  useEffect(() => {
    setStoredData("searchHistory", searchHistory);
  }, [searchHistory]);

  useEffect(() => {
    setStoredData("recentlyViewed", recentlyViewed);
  }, [recentlyViewed]);

  // User Profile functions
  const updateUserProfile = (updates: Partial<UserProfile>) => {
    setUserProfile(prev => prev ? { ...prev, ...updates } : null);
    toast({
      title: "Profile Updated",
      description: "Your profile has been saved locally",
    });
  };

  // Booking functions
  const addBooking = (booking: BookingRecord) => {
    setBookingHistory(prev => [booking, ...prev]);
    toast({
      title: "Booking Confirmed",
      description: `Your booking for ${booking.eventTitle} has been saved`,
    });
  };

  const updateBooking = (bookingId: string, updates: Partial<BookingRecord>) => {
    setBookingHistory(prev => 
      prev.map(booking => 
        booking.id === bookingId ? { ...booking, ...updates } : booking
      )
    );
  };

  // Event caching functions
  const addEvent = (event: CachedEvent) => {
    setCachedEvents(prev => {
      const existing = prev.find(e => e.id === event.id);
      if (existing) {
        return prev.map(e => e.id === event.id ? { ...event, lastUpdated: new Date().toISOString() } : e);
      }
      return [...prev, { ...event, lastUpdated: new Date().toISOString() }];
    });
  };

  const updateEvent = (eventId: string, updates: Partial<CachedEvent>) => {
    setCachedEvents(prev => 
      prev.map(event => 
        event.id === eventId 
          ? { ...event, ...updates, lastUpdated: new Date().toISOString() } 
          : event
      )
    );
  };

  const getEvent = (eventId: string): CachedEvent | null => {
    return cachedEvents.find(event => event.id === eventId) || null;
  };

  // Preferences functions
  const updatePreferences = (updates: Partial<UserPreferences>) => {
    setPreferences(prev => ({ ...prev, ...updates }));
    toast({
      title: "Preferences Updated",
      description: "Your settings have been saved",
    });
  };

  // Search history functions
  const addSearchTerm = (term: string) => {
    if (term.trim() && !searchHistory.includes(term)) {
      setSearchHistory(prev => [term, ...prev.slice(0, 9)]); // Keep last 10 searches
    }
  };

  const clearSearchHistory = () => {
    setSearchHistory([]);
    toast({
      title: "Search History Cleared",
      description: "Your search history has been removed",
    });
  };

  // Recently viewed functions
  const addRecentlyViewed = (eventId: string) => {
    setRecentlyViewed(prev => {
      const filtered = prev.filter(id => id !== eventId);
      return [eventId, ...filtered.slice(0, 19)]; // Keep last 20 viewed items
    });
  };

  // Clear all data
  const clearAllData = () => {
    setUserProfile(null);
    setBookingHistory([]);
    setCachedEvents([]);
    setSearchHistory([]);
    setRecentlyViewed([]);
    
    // Clear from localStorage
    localStorage.removeItem("userProfile");
    localStorage.removeItem("bookingHistory");
    localStorage.removeItem("cachedEvents");
    localStorage.removeItem("searchHistory");
    localStorage.removeItem("recentlyViewed");
    
    toast({
      title: "Data Cleared",
      description: "All local data has been removed",
    });
  };

  return (
    <LocalStorageContext.Provider value={{
      userProfile,
      updateUserProfile,
      bookingHistory,
      addBooking,
      updateBooking,
      cachedEvents,
      addEvent,
      updateEvent,
      getEvent,
      preferences,
      updatePreferences,
      searchHistory,
      addSearchTerm,
      clearSearchHistory,
      recentlyViewed,
      addRecentlyViewed,
      clearAllData,
    }}>
      {children}
    </LocalStorageContext.Provider>
  );
};