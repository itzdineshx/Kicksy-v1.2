import React, { createContext, useContext, useState, useEffect } from "react";
import { useLocalStorage } from "./LocalStorageProvider";

// Mock data for the sports ticketing platform
export interface MockEvent {
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
  featured?: boolean;
  trending?: boolean;
  soldOut?: boolean;
  limited?: boolean;
}

export interface MockNews {
  id: string;
  title: string;
  summary: string;
  content: string;
  author: string;
  publishedAt: string;
  category: string;
  image?: string;
  tags: string[];
}

export interface MockScore {
  id: string;
  matchTitle: string;
  team1: { name: string; score: string; logo?: string };
  team2: { name: string; score: string; logo?: string };
  status: "live" | "completed" | "upcoming";
  sport: string;
  venue: string;
  startTime: string;
}

interface MockDataContextType {
  events: MockEvent[];
  news: MockNews[];
  scores: MockScore[];
  featuredEvents: MockEvent[];
  trendingEvents: MockEvent[];
  getEventsByCategory: (category: string) => MockEvent[];
  searchEvents: (query: string) => MockEvent[];
  getEventById: (id: string) => MockEvent | null;
  refreshData: () => void;
}

const MockDataContext = createContext<MockDataContextType | undefined>(undefined);

export const useMockData = () => {
  const context = useContext(MockDataContext);
  if (!context) {
    throw new Error("useMockData must be used within a MockDataProvider");
  }
  return context;
};

export const MockDataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { cachedEvents, addEvent } = useLocalStorage();

  // Initialize mock events
  const [events] = useState<MockEvent[]>([
    {
      id: "cricket-final-2025",
      title: "IPL Final 2025",
      subtitle: "The Ultimate Showdown",
      teams: "CSK vs RCB",
      date: "Dec 28, 2025",
      time: "7:30 PM",
      venue: "Wankhede Stadium, Mumbai",
      price: "₹2,500",
      originalPrice: "₹3,000",
      category: "cricket",
      rating: 4.9,
      attendance: "45,000",
      image: "/hero-cricket.jpg",
      description: "The most anticipated cricket match of the year featuring two powerhouse teams.",
      highlights: ["Premium seating", "Celebrity appearances", "Live commentary", "Food & beverages"],
      featured: true,
      trending: true,
    },
    {
      id: "football-championship-2025",
      title: "ISL Championship Final",
      subtitle: "Football Fever",
      teams: "Mumbai City FC vs Bengaluru FC",
      date: "Dec 30, 2025",
      time: "8:00 PM",
      venue: "Salt Lake Stadium, Kolkata",
      price: "₹1,800",
      originalPrice: "₹2,200",
      category: "football",
      rating: 4.7,
      attendance: "65,000",
      image: "/hero-football.jpg",
      description: "Indian Super League championship match between top contenders.",
      highlights: ["Stadium atmosphere", "Player meet & greet", "Food court", "Merchandise"],
      featured: true,
      trending: false,
    },
    {
      id: "kabaddi-league-2025",
      title: "Pro Kabaddi League Finals",
      subtitle: "Traditional Sport, Modern Arena",
      teams: "Bengaluru Bulls vs Patna Pirates",
      date: "Jan 5, 2025",
      time: "7:00 PM",
      venue: "Jawaharlal Nehru Stadium, Delhi",
      price: "₹1,200",
      category: "kabaddi",
      rating: 4.6,
      attendance: "8,000",
      image: "/hero-kabaddi.jpg",
      description: "Elite kabaddi teams compete for the championship title.",
      highlights: ["Traditional entertainment", "Commentary in multiple languages"],
      featured: false,
      trending: true,
    },
    {
      id: "tennis-masters-2025",
      title: "Mumbai Tennis Masters",
      subtitle: "World Class Tennis",
      teams: "International Tournament",
      date: "Jan 12, 2025",
      time: "2:00 PM",
      venue: "Brabourne Stadium, Mumbai",
      price: "₹3,500",
      category: "tennis",
      rating: 4.8,
      attendance: "5,000",
      image: "/src/assets/event-tennis-masters.jpg",
      description: "Premier tennis tournament featuring international players.",
      highlights: ["Centre court access", "Player autographs", "Premium hospitality"],
      featured: true,
      trending: false,
      limited: true,
    },
    {
      id: "hockey-league-2025",
      title: "Hockey India League",
      subtitle: "Fast-Paced Action",
      teams: "Punjab Warriors vs Mumbai Marines",
      date: "Jan 18, 2025",
      time: "6:30 PM",
      venue: "Kalinga Stadium, Bhubaneswar",
      price: "₹800",
      category: "hockey",
      rating: 4.4,
      attendance: "15,000",
      image: "/src/assets/event-hockey-league.jpg",
      description: "Professional hockey league featuring India's best teams.",
      highlights: ["Family-friendly", "Interactive zones", "Local cuisine"],
      featured: false,
      trending: false,
    },
    {
      id: "badminton-championship-2025",
      title: "All India Badminton Championship",
      subtitle: "Shuttlecock Showdown",
      teams: "National Championship",
      date: "Jan 25, 2025",
      time: "4:00 PM",
      venue: "Indira Gandhi Arena, Delhi",
      price: "₹1,500",
      category: "badminton",
      rating: 4.5,
      attendance: "3,000",
      image: "/src/assets/event-badminton-championship.jpg",
      description: "India's premier badminton tournament with top national players.",
      highlights: ["Close-up viewing", "Skill demonstrations", "Meet the players"],
      featured: false,
      trending: true,
    }
  ]);

  // Initialize mock news
  const [news] = useState<MockNews[]>([
    {
      id: "news-1",
      title: "IPL 2025 Records Highest Viewership",
      summary: "This year's IPL season breaks all previous viewership records with innovative features.",
      content: "The Indian Premier League 2025 has set new benchmarks in sports entertainment...",
      author: "Sports Desk",
      publishedAt: "2025-12-20T10:30:00Z",
      category: "cricket",
      image: "/src/assets/event-cricket-ipl.jpg",
      tags: ["IPL", "Cricket", "Viewership", "Records"]
    },
    {
      id: "news-2",
      title: "ISL Expands to 14 Teams",
      summary: "Indian Super League announces expansion with two new franchises joining next season.",
      content: "The Indian Super League is set to welcome two new teams in the upcoming season...",
      author: "Football Reporter",
      publishedAt: "2025-12-19T15:45:00Z",
      category: "football",
      tags: ["ISL", "Football", "Expansion", "Teams"]
    },
    {
      id: "news-3",
      title: "Pro Kabaddi League Goes Global",
      summary: "PKL announces international expansion with leagues in multiple countries.",
      content: "Pro Kabaddi League takes the traditional Indian sport to the global stage...",
      author: "Kabaddi Correspondent",
      publishedAt: "2025-12-18T09:15:00Z",
      category: "kabaddi",
      tags: ["PKL", "Kabaddi", "Global", "International"]
    }
  ]);

  // Initialize mock scores
  const [scores] = useState<MockScore[]>([
    {
      id: "score-1",
      matchTitle: "CSK vs RCB - IPL Final",
      team1: { name: "CSK", score: "180/4" },
      team2: { name: "RCB", score: "156/8" },
      status: "completed",
      sport: "cricket",
      venue: "Wankhede Stadium",
      startTime: "2025-12-20T19:30:00Z"
    },
    {
      id: "score-2",
      matchTitle: "Mumbai City vs Bengaluru FC",
      team1: { name: "Mumbai City FC", score: "2" },
      team2: { name: "Bengaluru FC", score: "1" },
      status: "live",
      sport: "football",
      venue: "Salt Lake Stadium",
      startTime: "2025-12-20T20:00:00Z"
    },
    {
      id: "score-3",
      matchTitle: "Bulls vs Pirates - PKL",
      team1: { name: "Bengaluru Bulls", score: "42" },
      team2: { name: "Patna Pirates", score: "38" },
      status: "upcoming",
      sport: "kabaddi",
      venue: "Nehru Stadium",
      startTime: "2025-12-21T19:00:00Z"
    }
  ]);

  // Cache events in localStorage when component mounts
  useEffect(() => {
    events.forEach(event => {
      if (!cachedEvents.find(cached => cached.id === event.id)) {
        addEvent({
          ...event,
          lastUpdated: new Date().toISOString()
        });
      }
    });
  }, [events, cachedEvents, addEvent]);

  // Helper functions
  const featuredEvents = events.filter(event => event.featured);
  const trendingEvents = events.filter(event => event.trending);

  const getEventsByCategory = (category: string) => {
    return events.filter(event => 
      event.category.toLowerCase() === category.toLowerCase()
    );
  };

  const searchEvents = (query: string) => {
    const searchTerm = query.toLowerCase();
    return events.filter(event =>
      event.title.toLowerCase().includes(searchTerm) ||
      event.teams?.toLowerCase().includes(searchTerm) ||
      event.venue.toLowerCase().includes(searchTerm) ||
      event.category.toLowerCase().includes(searchTerm)
    );
  };

  const getEventById = (id: string) => {
    return events.find(event => event.id === id) || null;
  };

  const refreshData = () => {
    // Simulate data refresh - in a real app, this would fetch from an API
    console.log("Data refreshed from mock service");
  };

  return (
    <MockDataContext.Provider value={{
      events,
      news,
      scores,
      featuredEvents,
      trendingEvents,
      getEventsByCategory,
      searchEvents,
      getEventById,
      refreshData,
    }}>
      {children}
    </MockDataContext.Provider>
  );
};