import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { Search, Clock, MapPin, Calendar, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useBooking } from "@/components/BookingProvider";

interface SearchResult {
  id: number;
  title: string;
  type: "event" | "venue" | "team" | "player";
  category: string;
  date?: string;
  venue?: string;
  price?: string;
  image?: string;
  description?: string;
}

interface SearchContextType {
  searchQuery: string;
  searchResults: SearchResult[];
  recentSearches: string[];
  isSearching: boolean;
  setSearchQuery: (query: string) => void;
  performSearch: (query: string) => void;
  clearSearch: () => void;
  addRecentSearch: (query: string) => void;
}

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export const useSearch = () => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error("useSearch must be used within a SearchProvider");
  }
  return context;
};

const mockSearchData: SearchResult[] = [
  {
    id: 1,
    title: "India vs Australia ODI",
    type: "event",
    category: "Cricket",
    date: "Today, 2:30 PM",
    venue: "Wankhede Stadium",
    price: "₹1,500",
    image: "🏏",
    description: "High-octane cricket match between India and Australia"
  },
  {
    id: 2,
    title: "Mumbai City FC vs Bengaluru FC",
    type: "event", 
    category: "Football",
    date: "Tomorrow, 7:30 PM",
    venue: "DY Patil Stadium",
    price: "₹800",
    image: "⚽",
    description: "ISL league match between top teams"
  },
  {
    id: 3,
    title: "Wankhede Stadium",
    type: "venue",
    category: "Cricket",
    description: "Premier cricket stadium in Mumbai"
  },
  {
    id: 4,
    title: "Virat Kohli",
    type: "player",
    category: "Cricket",
    description: "Indian cricket team captain and batsman"
  },
  {
    id: 5,
    title: "PKL Finals",
    type: "event",
    category: "Kabaddi",
    date: "Dec 20, 8:00 PM",
    venue: "Nehru Stadium",
    price: "₹600",
    image: "🤼",
    description: "Pro Kabaddi League finals"
  }
];

export const SearchProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [recentSearches, setRecentSearches] = useState<string[]>([
    "India vs Australia",
    "Mumbai football",
    "Wankhede Stadium"
  ]);
  const [isSearching, setIsSearching] = useState(false);

  const performSearch = (query: string) => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    setIsSearching(true);
    
    // Simulate API delay
    setTimeout(() => {
      const filtered = mockSearchData.filter(item =>
        item.title.toLowerCase().includes(query.toLowerCase()) ||
        item.category.toLowerCase().includes(query.toLowerCase()) ||
        item.description?.toLowerCase().includes(query.toLowerCase())
      );
      
      setSearchResults(filtered);
      setIsSearching(false);
    }, 300);
  };

  const clearSearch = () => {
    setSearchQuery("");
    setSearchResults([]);
  };

  const addRecentSearch = (query: string) => {
    if (query.trim() && !recentSearches.includes(query)) {
      setRecentSearches(prev => [query, ...prev.slice(0, 4)]);
    }
  };

  useEffect(() => {
    if (searchQuery) {
      performSearch(searchQuery);
    } else {
      setSearchResults([]);
    }
  }, [searchQuery]);

  return (
    <SearchContext.Provider value={{
      searchQuery,
      searchResults,
      recentSearches,
      isSearching,
      setSearchQuery,
      performSearch,
      clearSearch,
      addRecentSearch
    }}>
      {children}
    </SearchContext.Provider>
  );
};

export const SearchModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ 
  isOpen, 
  onClose 
}) => {
  const { 
    searchQuery, 
    searchResults, 
    recentSearches, 
    isSearching,
    setSearchQuery, 
    clearSearch,
    addRecentSearch 
  } = useSearch();
  const { openBookingModal } = useBooking();

  if (!isOpen) return null;

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    addRecentSearch(query);
  };

  const handleResultClick = (result: SearchResult) => {
    if (result.type === "event" && result.date && result.venue && result.price) {
      openBookingModal({
        id: result.id,
        title: result.title,
        date: result.date,
        time: "TBD",
        venue: result.venue,
        price: result.price,
        category: result.category
      });
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-start justify-center pt-20">
      <div className="w-full max-w-2xl mx-4">
        <Card className="shadow-floating border-0">
          <CardContent className="p-0">
            {/* Search Input */}
            <div className="p-6 border-b">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search events, venues, teams, players..."
                  className="pl-10 pr-10 h-12 text-lg"
                  autoFocus
                />
                {searchQuery && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0"
                    onClick={clearSearch}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                )}
              </div>
            </div>

            {/* Search Results */}
            <div className="max-h-96 overflow-y-auto">
              {!searchQuery && recentSearches.length > 0 && (
                <div className="p-4">
                  <h3 className="text-sm font-medium text-muted-foreground mb-3">Recent Searches</h3>
                  <div className="space-y-2">
                    {recentSearches.map((search, index) => (
                      <Button
                        key={index}
                        variant="ghost"
                        className="w-full justify-start h-auto p-3"
                        onClick={() => handleSearch(search)}
                      >
                        <Clock className="w-4 h-4 mr-3 text-muted-foreground" />
                        {search}
                      </Button>
                    ))}
                  </div>
                </div>
              )}

              {isSearching && (
                <div className="p-8 text-center">
                  <div className="animate-spin w-6 h-6 border-2 border-primary border-t-transparent rounded-full mx-auto mb-2" />
                  <p className="text-muted-foreground">Searching...</p>
                </div>
              )}

              {searchQuery && !isSearching && searchResults.length === 0 && (
                <div className="p-8 text-center text-muted-foreground">
                  <Search className="w-8 h-8 mx-auto mb-2 opacity-50" />
                  <p>No results found for "{searchQuery}"</p>
                </div>
              )}

              {searchResults.length > 0 && (
                <div className="p-4 space-y-2">
                  {searchResults.map((result) => (
                    <Card
                      key={result.id}
                      className="cursor-pointer transition-all duration-200 hover:shadow-card hover:scale-[1.02]"
                      onClick={() => handleResultClick(result)}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-center gap-4">
                          {result.image && (
                            <div className="text-2xl">{result.image}</div>
                          )}
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="font-medium">{result.title}</h3>
                              <Badge variant="secondary" className="text-xs">
                                {result.type}
                              </Badge>
                            </div>
                            {result.description && (
                              <p className="text-sm text-muted-foreground mb-2">
                                {result.description}
                              </p>
                            )}
                            <div className="flex items-center gap-4 text-xs text-muted-foreground">
                              {result.date && (
                                <div className="flex items-center gap-1">
                                  <Calendar className="w-3 h-3" />
                                  {result.date}
                                </div>
                              )}
                              {result.venue && (
                                <div className="flex items-center gap-1">
                                  <MapPin className="w-3 h-3" />
                                  {result.venue}
                                </div>
                              )}
                              {result.price && (
                                <div className="font-medium text-primary">
                                  {result.price}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>

            {/* Close Button */}
            <div className="p-4 border-t text-center">
              <Button variant="ghost" onClick={onClose}>
                Close
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};