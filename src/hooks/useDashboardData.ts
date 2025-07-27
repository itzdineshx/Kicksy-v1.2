import { useState, useEffect, useCallback, useMemo } from 'react';
import { useLocalStorage } from '@/components/LocalStorageProvider';

export interface DashboardMetrics {
  totalRevenue: number;
  ticketsSold: number;
  customerSatisfaction: number;
  activeEvents: number;
  conversionRate: number;
  avgOrderValue: number;
}

export interface SalesPrediction {
  event: string;
  currentSales: number;
  predictedFinal: number;
  trend: 'up' | 'down' | 'moderate';
  suggestion: string;
  confidence: number;
  urgency: 'high' | 'medium' | 'low';
}

export interface AIInsight {
  id: string;
  type: 'pricing' | 'marketing' | 'inventory' | 'capacity';
  title: string;
  message: string;
  action: string;
  priority: 'high' | 'medium' | 'low';
  impact: string;
  confidence: number;
  timestamp: Date;
}

const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

export const useDashboardData = () => {
  // Create generic localStorage helpers
  const getItem = (key: string): string | null => {
    try {
      return localStorage.getItem(key);
    } catch (error) {
      console.error(`Error reading ${key} from localStorage:`, error);
      return null;
    }
  };

  const setItem = (key: string, value: string): void => {
    try {
      localStorage.setItem(key, value);
    } catch (error) {
      console.error(`Error writing ${key} to localStorage:`, error);
    }
  };
  const [metrics, setMetrics] = useState<DashboardMetrics | null>(null);
  const [predictions, setPredictions] = useState<SalesPrediction[]>([]);
  const [insights, setInsights] = useState<AIInsight[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  // Simulated real-time data fetching
  const fetchDashboardData = useCallback(async () => {
    try {
      setError(null);
      
      // Check cache first
      const cachedData = getItem('dashboardData');
      const cacheTimestamp = getItem('dashboardCacheTimestamp');
      
      if (cachedData && cacheTimestamp) {
        const timeDiff = Date.now() - parseInt(cacheTimestamp);
        if (timeDiff < CACHE_DURATION) {
          const parsed = JSON.parse(cachedData);
          setMetrics(parsed.metrics);
          setPredictions(parsed.predictions);
          setInsights(parsed.insights);
          setLastUpdated(new Date(parseInt(cacheTimestamp)));
          setLoading(false);
          return;
        }
      }

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Generate realistic mock data
      const mockMetrics: DashboardMetrics = {
        totalRevenue: Math.floor(280000 + Math.random() * 50000),
        ticketsSold: Math.floor(1200 + Math.random() * 200),
        customerSatisfaction: Math.floor(90 + Math.random() * 8),
        activeEvents: Math.floor(6 + Math.random() * 4),
        conversionRate: Math.floor(12 + Math.random() * 8),
        avgOrderValue: Math.floor(2200 + Math.random() * 500),
      };

      const mockPredictions: SalesPrediction[] = [
        {
          event: "Cricket Championship Final",
          currentSales: Math.floor(80 + Math.random() * 15),
          predictedFinal: Math.floor(90 + Math.random() * 8),
          trend: 'up',
          suggestion: "Increase premium seat pricing by ₹200-300",
          confidence: Math.floor(88 + Math.random() * 10),
          urgency: 'high'
        },
        {
          event: "Football League Match",
          currentSales: Math.floor(60 + Math.random() * 15),
          predictedFinal: Math.floor(70 + Math.random() * 10),
          trend: 'moderate',
          suggestion: "Flash sale for next 2-3 hours recommended",
          confidence: Math.floor(82 + Math.random() * 10),
          urgency: 'medium'
        },
        {
          event: "Badminton Tournament",
          currentSales: Math.floor(30 + Math.random() * 15),
          predictedFinal: Math.floor(40 + Math.random() * 15),
          trend: 'down',
          suggestion: "Consider price reduction or combo offers",
          confidence: Math.floor(75 + Math.random() * 15),
          urgency: 'low'
        }
      ];

      const mockInsights: AIInsight[] = [
        {
          id: '1',
          type: 'pricing',
          title: 'Dynamic Pricing Opportunity',
          message: 'Weekend cricket matches show 40% higher demand. Consider premium pricing.',
          action: 'Apply Smart Pricing',
          priority: 'high',
          impact: '+₹45,000 potential revenue',
          confidence: Math.floor(85 + Math.random() * 10),
          timestamp: new Date()
        },
        {
          id: '2',
          type: 'marketing',
          title: 'Audience Engagement Peak',
          message: 'Target audience most active 6-8 PM. Schedule promotions accordingly.',
          action: 'Schedule Campaign',
          priority: 'medium',
          impact: '+25% engagement rate',
          confidence: Math.floor(78 + Math.random() * 12),
          timestamp: new Date()
        },
        {
          id: '3',
          type: 'inventory',
          title: 'VIP Section Optimization',
          message: 'VIP sections sell out 2 days early. Consider early bird pricing.',
          action: 'Set Early Bird Pricing',
          priority: 'low',
          impact: '+15% early bookings',
          confidence: Math.floor(70 + Math.random() * 15),
          timestamp: new Date()
        }
      ];

      // Cache the data
      const dataToCache = {
        metrics: mockMetrics,
        predictions: mockPredictions,
        insights: mockInsights
      };
      
      setItem('dashboardData', JSON.stringify(dataToCache));
      setItem('dashboardCacheTimestamp', Date.now().toString());

      setMetrics(mockMetrics);
      setPredictions(mockPredictions);
      setInsights(mockInsights);
      setLastUpdated(new Date());
      
    } catch (err) {
      setError('Failed to fetch dashboard data');
      console.error('Dashboard data fetch error:', err);
    } finally {
      setLoading(false);
    }
  }, [getItem, setItem]);

  // Auto-refresh data every 5 minutes
  useEffect(() => {
    fetchDashboardData();
    
    const interval = setInterval(fetchDashboardData, CACHE_DURATION);
    return () => clearInterval(interval);
  }, [fetchDashboardData]);

  // Memoized computed values
  const computedMetrics = useMemo(() => {
    if (!metrics) return null;
    
    return {
      ...metrics,
      revenueGrowth: ((metrics.totalRevenue - 250000) / 250000) * 100,
      salesEfficiency: (metrics.ticketsSold / metrics.activeEvents) || 0,
      satisfactionTrend: metrics.customerSatisfaction > 90 ? 'excellent' : 
                        metrics.customerSatisfaction > 80 ? 'good' : 'needs_improvement'
    };
  }, [metrics]);

  const prioritizedInsights = useMemo(() => {
    return insights.sort((a, b) => {
      const priorityOrder = { high: 3, medium: 2, low: 1 };
      return priorityOrder[b.priority] - priorityOrder[a.priority];
    });
  }, [insights]);

  const refreshData = useCallback(() => {
    setLoading(true);
    fetchDashboardData();
  }, [fetchDashboardData]);

  return {
    metrics: computedMetrics,
    predictions,
    insights: prioritizedInsights,
    loading,
    error,
    lastUpdated,
    refreshData,
    isStale: lastUpdated && (Date.now() - lastUpdated.getTime()) > CACHE_DURATION
  };
};