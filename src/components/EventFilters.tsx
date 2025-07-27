import { useState } from "react";
import { Filter, Calendar, MapPin, DollarSign, Star, Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

interface FilterState {
  search: string;
  categories: string[];
  cities: string[];
  dateRange: string;
  priceRange: [number, number];
  rating: number;
  sortBy: string;
}

interface EventFiltersProps {
  onFiltersChange: (filters: FilterState) => void;
}

const EventFilters = ({ onFiltersChange }: EventFiltersProps) => {
  const [filters, setFilters] = useState<FilterState>({
    search: "",
    categories: [],
    cities: [],
    dateRange: "",
    priceRange: [0, 5000],
    rating: 0,
    sortBy: "date"
  });

  const [activeFilters, setActiveFilters] = useState<string[]>([]);

  const categories = [
    "Cricket", "Football", "Kabaddi", "Tennis", "Badminton", "Hockey", "Basketball", "Volleyball"
  ];

  const cities = [
    "Mumbai", "Delhi", "Bangalore", "Chennai", "Kolkata", "Hyderabad", "Pune", "Ahmedabad"
  ];

  const sortOptions = [
    { value: "date", label: "Date" },
    { value: "price-low", label: "Price: Low to High" },
    { value: "price-high", label: "Price: High to Low" },
    { value: "rating", label: "Rating" },
    { value: "popularity", label: "Popularity" }
  ];

  const updateFilters = (key: keyof FilterState, value: any) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFiltersChange(newFilters);
    updateActiveFilters(newFilters);
  };

  const updateActiveFilters = (currentFilters: FilterState) => {
    const active: string[] = [];
    
    if (currentFilters.search) active.push(`Search: ${currentFilters.search}`);
    if (currentFilters.categories.length) active.push(`Categories: ${currentFilters.categories.length}`);
    if (currentFilters.cities.length) active.push(`Cities: ${currentFilters.cities.length}`);
    if (currentFilters.dateRange) active.push(`Date: ${currentFilters.dateRange}`);
    if (currentFilters.priceRange[0] > 0 || currentFilters.priceRange[1] < 5000) {
      active.push(`Price: ₹${currentFilters.priceRange[0]}-₹${currentFilters.priceRange[1]}`);
    }
    if (currentFilters.rating > 0) active.push(`Rating: ${currentFilters.rating}+`);
    
    setActiveFilters(active);
  };

  const handleCategoryChange = (category: string, checked: boolean) => {
    const newCategories = checked 
      ? [...filters.categories, category]
      : filters.categories.filter(c => c !== category);
    updateFilters("categories", newCategories);
  };

  const handleCityChange = (city: string, checked: boolean) => {
    const newCities = checked 
      ? [...filters.cities, city]
      : filters.cities.filter(c => c !== city);
    updateFilters("cities", newCities);
  };

  const clearAllFilters = () => {
    const resetFilters: FilterState = {
      search: "",
      categories: [],
      cities: [],
      dateRange: "",
      priceRange: [0, 5000],
      rating: 0,
      sortBy: "date"
    };
    setFilters(resetFilters);
    onFiltersChange(resetFilters);
    setActiveFilters([]);
  };

  const removeFilter = (filterText: string) => {
    if (filterText.startsWith("Search:")) {
      updateFilters("search", "");
    } else if (filterText.startsWith("Categories:")) {
      updateFilters("categories", []);
    } else if (filterText.startsWith("Cities:")) {
      updateFilters("cities", []);
    } else if (filterText.startsWith("Date:")) {
      updateFilters("dateRange", "");
    } else if (filterText.startsWith("Price:")) {
      updateFilters("priceRange", [0, 5000]);
    } else if (filterText.startsWith("Rating:")) {
      updateFilters("rating", 0);
    }
  };

  return (
    <div className="space-y-6">
      {/* Search and Sort Bar */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search events, teams, venues..."
            value={filters.search}
            onChange={(e) => updateFilters("search", e.target.value)}
            className="pl-10"
          />
        </div>
        
        <Select value={filters.sortBy} onValueChange={(value) => updateFilters("sortBy", value)}>
          <SelectTrigger className="w-full sm:w-48">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            {sortOptions.map(option => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="w-full sm:w-auto">
              <Filter className="w-4 h-4 mr-2" />
              Filters
              {activeFilters.length > 0 && (
                <Badge variant="secondary" className="ml-2">
                  {activeFilters.length}
                </Badge>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80" align="end">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h4 className="font-semibold">Filters</h4>
                {activeFilters.length > 0 && (
                  <Button variant="ghost" size="sm" onClick={clearAllFilters}>
                    Clear All
                  </Button>
                )}
              </div>

              {/* Categories */}
              <div>
                <Label className="text-sm font-medium mb-3 block">Categories</Label>
                <div className="grid grid-cols-2 gap-2">
                  {categories.map(category => (
                    <div key={category} className="flex items-center space-x-2">
                      <Checkbox
                        id={category}
                        checked={filters.categories.includes(category)}
                        onCheckedChange={(checked) => handleCategoryChange(category, checked as boolean)}
                      />
                      <Label htmlFor={category} className="text-sm cursor-pointer">
                        {category}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Cities */}
              <div>
                <Label className="text-sm font-medium mb-3 block">Cities</Label>
                <div className="grid grid-cols-2 gap-2">
                  {cities.map(city => (
                    <div key={city} className="flex items-center space-x-2">
                      <Checkbox
                        id={city}
                        checked={filters.cities.includes(city)}
                        onCheckedChange={(checked) => handleCityChange(city, checked as boolean)}
                      />
                      <Label htmlFor={city} className="text-sm cursor-pointer">
                        {city}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Date Range */}
              <div>
                <Label className="text-sm font-medium mb-3 block">Date Range</Label>
                <Select value={filters.dateRange} onValueChange={(value) => updateFilters("dateRange", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select date range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="today">Today</SelectItem>
                    <SelectItem value="tomorrow">Tomorrow</SelectItem>
                    <SelectItem value="this-week">This Week</SelectItem>
                    <SelectItem value="this-month">This Month</SelectItem>
                    <SelectItem value="next-month">Next Month</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Price Range */}
              <div>
                <Label className="text-sm font-medium mb-3 block">
                  Price Range: ₹{filters.priceRange[0]} - ₹{filters.priceRange[1]}
                </Label>
                <Slider
                  value={filters.priceRange}
                  onValueChange={(value) => updateFilters("priceRange", value as [number, number])}
                  max={5000}
                  step={100}
                  className="mt-2"
                />
              </div>

              {/* Rating */}
              <div>
                <Label className="text-sm font-medium mb-3 block">Minimum Rating</Label>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map(rating => (
                    <Button
                      key={rating}
                      variant={filters.rating >= rating ? "default" : "outline"}
                      size="sm"
                      onClick={() => updateFilters("rating", rating)}
                    >
                      <Star className="w-3 h-3" />
                      {rating}+
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>

      {/* Active Filters */}
      {activeFilters.length > 0 && (
        <div className="flex flex-wrap gap-2">
          <span className="text-sm text-muted-foreground">Active filters:</span>
          {activeFilters.map((filter, index) => (
            <Badge key={index} variant="secondary" className="flex items-center gap-1">
              {filter}
              <Button
                variant="ghost"
                size="sm"
                className="h-auto p-0 ml-1"
                onClick={() => removeFilter(filter)}
              >
                <X className="w-3 h-3" />
              </Button>
            </Badge>
          ))}
        </div>
      )}
    </div>
  );
};

export default EventFilters;