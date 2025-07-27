// Realistic AI data simulation service
import { useState, useEffect } from "react";

export interface PriceData {
  current: string;
  original?: string;
  change: "up" | "down" | "stable";
  percentage: number;
  trend: "increasing" | "decreasing" | "volatile" | "stable";
}

export interface DemandData {
  level: "high" | "medium" | "low";
  percentage: number;
  ticketsLeft: number;
  totalTickets: number;
  predictedSellout: string;
}

export interface AIInsight {
  id: string;
  type: "pricing" | "demand" | "recommendation" | "alert";
  title: string;
  message: string;
  confidence: number;
  timestamp: Date;
  urgent: boolean;
}

// Realistic data generator
class AIDataService {
  private static instance: AIDataService;
  private eventData = new Map();
  private subscribers = new Set<() => void>();

  static getInstance() {
    if (!AIDataService.instance) {
      AIDataService.instance = new AIDataService();
    }
    return AIDataService.instance;
  }

  subscribe(callback: () => void) {
    this.subscribers.add(callback);
    return () => this.subscribers.delete(callback);
  }

  private notify() {
    this.subscribers.forEach(callback => callback());
  }

  generatePriceData(eventId: string): PriceData {
    const basePrice = this.getBasePrice(eventId);
    const timeToEvent = this.getTimeToEvent(eventId);
    const demandLevel = this.getDemandLevel(eventId);
    
    // Realistic price fluctuation based on demand and time
    let multiplier = 1;
    if (timeToEvent < 24) multiplier += 0.2; // Last minute surge
    if (timeToEvent < 7 * 24) multiplier += 0.1; // Week before
    if (demandLevel === "high") multiplier += 0.15;
    if (demandLevel === "low") multiplier -= 0.1;
    
    // Add some realistic volatility
    const volatility = (Math.random() - 0.5) * 0.05;
    multiplier += volatility;
    
    const currentPrice = Math.round(basePrice * multiplier);
    const change = currentPrice > basePrice ? "up" : currentPrice < basePrice ? "down" : "stable";
    const percentage = Math.abs(((currentPrice - basePrice) / basePrice) * 100);
    
    return {
      current: `₹${currentPrice.toLocaleString()}`,
      original: change !== "stable" ? `₹${basePrice.toLocaleString()}` : undefined,
      change,
      percentage: Math.round(percentage),
      trend: this.getPriceTrend(eventId)
    };
  }

  generateDemandData(eventId: string): DemandData {
    const totalTickets = this.getTotalTickets(eventId);
    const timeToEvent = this.getTimeToEvent(eventId);
    const popularity = this.getEventPopularity(eventId);
    
    // Realistic sales curve
    let soldPercentage = 0;
    if (timeToEvent > 30 * 24) soldPercentage = popularity * 0.2; // 1 month+
    else if (timeToEvent > 14 * 24) soldPercentage = popularity * 0.4; // 2 weeks
    else if (timeToEvent > 7 * 24) soldPercentage = popularity * 0.6; // 1 week
    else if (timeToEvent > 3 * 24) soldPercentage = popularity * 0.8; // 3 days
    else soldPercentage = popularity * 0.95; // Last 3 days
    
    // Add realistic variance
    soldPercentage += (Math.random() - 0.5) * 0.1;
    soldPercentage = Math.max(0.1, Math.min(0.98, soldPercentage));
    
    const ticketsSold = Math.round(totalTickets * soldPercentage);
    const ticketsLeft = totalTickets - ticketsSold;
    
    const level = soldPercentage > 0.8 ? "high" : soldPercentage > 0.5 ? "medium" : "low";
    
    // Predict sellout time based on current sales rate
    const salesRate = this.getSalesRate(eventId, soldPercentage);
    const hoursToSellout = ticketsLeft / salesRate;
    const predictedSellout = hoursToSellout < 24 
      ? `${Math.round(hoursToSellout)} hours`
      : `${Math.round(hoursToSellout / 24)} days`;
    
    return {
      level,
      percentage: Math.round(soldPercentage * 100),
      ticketsLeft,
      totalTickets,
      predictedSellout: soldPercentage > 0.95 ? "Soon!" : predictedSellout
    };
  }

  generateAIInsights(eventId: string): AIInsight[] {
    const insights: AIInsight[] = [];
    const now = new Date();
    const demandData = this.generateDemandData(eventId);
    const priceData = this.generatePriceData(eventId);
    
    // Pricing insights
    if (priceData.change === "up" && priceData.percentage > 10) {
      insights.push({
        id: `price-${eventId}-${now.getTime()}`,
        type: "pricing",
        title: "Price Surge Detected",
        message: `Ticket prices have increased by ${priceData.percentage}% due to high demand. Consider booking soon.`,
        confidence: 89,
        timestamp: now,
        urgent: priceData.percentage > 20
      });
    }
    
    // Demand insights
    if (demandData.level === "high" && demandData.ticketsLeft < 100) {
      insights.push({
        id: `demand-${eventId}-${now.getTime()}`,
        type: "demand",
        title: "Limited Availability",
        message: `Only ${demandData.ticketsLeft} tickets remaining. Event likely to sell out ${demandData.predictedSellout}.`,
        confidence: 94,
        timestamp: now,
        urgent: demandData.ticketsLeft < 50
      });
    }
    
    // Recommendation insights
    if (this.shouldRecommendEvent(eventId)) {
      insights.push({
        id: `rec-${eventId}-${now.getTime()}`,
        type: "recommendation",
        title: "Perfect Match Found",
        message: "Based on your viewing history, this event matches your preferences with 92% accuracy.",
        confidence: 92,
        timestamp: now,
        urgent: false
      });
    }
    
    return insights;
  }

  // Helper methods with realistic logic
  private getBasePrice(eventId: string): number {
    const prices = {
      'cricket-final': 5000,
      'football-league': 2500,
      'kabaddi-championship': 1500,
      'tennis-masters': 3500,
      'hockey-league': 1200
    };
    return prices[eventId as keyof typeof prices] || 2000;
  }

  private getTimeToEvent(eventId: string): number {
    // Hours until event (simulated)
    return Math.random() * 30 * 24; // 0-30 days
  }

  private getDemandLevel(eventId: string): "high" | "medium" | "low" {
    const eventPopularity = this.getEventPopularity(eventId);
    return eventPopularity > 0.7 ? "high" : eventPopularity > 0.4 ? "medium" : "low";
  }

  private getEventPopularity(eventId: string): number {
    const popularity = {
      'cricket-final': 0.9,
      'football-league': 0.7,
      'kabaddi-championship': 0.6,
      'tennis-masters': 0.8,
      'hockey-league': 0.5
    };
    return popularity[eventId as keyof typeof popularity] || 0.6;
  }

  private getTotalTickets(eventId: string): number {
    return 50000 + Math.random() * 20000; // 50k-70k capacity
  }

  private getPriceTrend(eventId: string): "increasing" | "decreasing" | "volatile" | "stable" {
    const trends = ["increasing", "decreasing", "volatile", "stable"];
    return trends[Math.floor(Math.random() * trends.length)] as any;
  }

  private getSalesRate(eventId: string, currentSold: number): number {
    // Tickets per hour based on current momentum
    const baseRate = 50;
    const urgencyMultiplier = currentSold > 0.8 ? 3 : currentSold > 0.6 ? 2 : 1;
    return baseRate * urgencyMultiplier * (0.5 + Math.random());
  }

  private shouldRecommendEvent(eventId: string): boolean {
    return Math.random() > 0.7; // 30% chance of recommendation
  }
}

// React hook for using AI data
export const useAIData = (eventId: string) => {
  const [priceData, setPriceData] = useState<PriceData | null>(null);
  const [demandData, setDemandData] = useState<DemandData | null>(null);
  const [insights, setInsights] = useState<AIInsight[]>([]);
  const [loading, setLoading] = useState(true);

  const aiService = AIDataService.getInstance();

  const refreshData = () => {
    const newPriceData = aiService.generatePriceData(eventId);
    const newDemandData = aiService.generateDemandData(eventId);
    const newInsights = aiService.generateAIInsights(eventId);
    
    setPriceData(newPriceData);
    setDemandData(newDemandData);
    setInsights(newInsights);
    setLoading(false);
  };

  useEffect(() => {
    refreshData();
    
    // Update data every 30 seconds for realistic updates
    const interval = setInterval(refreshData, 30000);
    
    // Subscribe to service updates
    const unsubscribe = aiService.subscribe(refreshData);
    
    return () => {
      clearInterval(interval);
      unsubscribe();
    };
  }, [eventId]);

  return {
    priceData,
    demandData,
    insights,
    loading,
    refreshData
  };
};

export default AIDataService;