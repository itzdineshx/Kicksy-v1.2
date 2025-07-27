import React, { useState, useEffect, useCallback } from "react";
import { DashboardEditor, DashboardWidget } from "./DashboardEditor";
import { EditableWidget } from "./EditableWidget";
import { MetricsCard } from "./MetricsCard";
import { 
  RevenueAnalyticsChart,
  SportsPerformanceRadar,
  AudienceDemographicsChart,
  EventTimelineChart,
  PerformanceScatterChart,
  TrendComparisonChart
} from "./EnhancedChartComponents";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { 
  TrendingUp, 
  Users, 
  Calendar, 
  BarChart3,
  PieChart,
  Target,
  Activity,
  DollarSign
} from "lucide-react";

interface DashboardContainerProps {
  userType: 'user' | 'organizer' | 'admin';
  initialWidgets?: DashboardWidget[];
}

export const DashboardContainer: React.FC<DashboardContainerProps> = ({
  userType,
  initialWidgets
}) => {
  const { toast } = useToast();
  const [editMode, setEditMode] = useState(false);
  const [selectedWidget, setSelectedWidget] = useState<DashboardWidget | null>(null);
  const [widgets, setWidgets] = useState<DashboardWidget[]>([]);

  // Initialize default widgets based on user type
  useEffect(() => {
    if (initialWidgets) {
      setWidgets(initialWidgets);
      return;
    }

    // Load from localStorage or create default layout
    const savedLayout = localStorage.getItem(`dashboard-layout-${userType}`);
    
    if (savedLayout) {
      try {
        setWidgets(JSON.parse(savedLayout));
        return;
      } catch (error) {
        console.warn('Failed to load saved layout:', error);
      }
    }

    // Create default widgets based on user type
    const defaultWidgets = getDefaultWidgets(userType);
    setWidgets(defaultWidgets);
  }, [userType, initialWidgets]);

  // Auto-save layout when widgets change
  useEffect(() => {
    if (widgets.length > 0) {
      localStorage.setItem(`dashboard-layout-${userType}`, JSON.stringify(widgets));
    }
  }, [widgets, userType]);

  const getDefaultWidgets = (type: 'user' | 'organizer' | 'admin'): DashboardWidget[] => {
    const baseWidgets = [
      {
        id: 'metrics-1',
        type: 'metric' as const,
        title: 'Key Metrics',
        position: { x: 0, y: 0 },
        size: { width: 300, height: 200 },
        visible: true,
        config: { metric: 'revenue' }
      },
      {
        id: 'chart-1',
        type: 'chart' as const,
        title: 'Performance Chart',
        position: { x: 320, y: 0 },
        size: { width: 500, height: 350 },
        visible: true,
        config: { chartType: 'bar' }
      }
    ];

    if (type === 'organizer' || type === 'admin') {
      baseWidgets.push(
        {
          id: 'chart-2',
          type: 'chart' as const,
          title: 'Revenue Analytics',
          position: { x: 0, y: 220 },
          size: { width: 400, height: 300 },
          visible: true,
          config: { chartType: 'area' }
        },
        {
          id: 'chart-3',
          type: 'chart' as const,
          title: 'Audience Demographics',
          position: { x: 420, y: 220 },
          size: { width: 400, height: 300 },
          visible: true,
          config: { chartType: 'pie' }
        }
      );
    }

    if (type === 'admin') {
      baseWidgets.push({
        id: 'chart-4',
        type: 'chart' as const,
        title: 'Platform Overview',
        position: { x: 0, y: 540 },
        size: { width: 820, height: 300 },
        visible: true,
        config: { chartType: 'line' }
      });
    }

    return baseWidgets;
  };

  const handleWidgetsChange = useCallback((newWidgets: DashboardWidget[]) => {
    setWidgets(newWidgets);
  }, []);

  const handleWidgetUpdate = useCallback((id: string, updates: Partial<DashboardWidget>) => {
    setWidgets(prev => prev.map(widget => 
      widget.id === id ? { ...widget, ...updates } : widget
    ));
  }, []);

  const handleWidgetDelete = useCallback((id: string) => {
    setWidgets(prev => prev.filter(widget => widget.id !== id));
    if (selectedWidget?.id === id) {
      setSelectedWidget(null);
    }
  }, [selectedWidget]);

  const renderWidgetContent = (widget: DashboardWidget) => {
    // Mock data for demonstration
    const mockData = {
      revenue: [
        { month: 'Jan', revenue: 45000, bookings: 120 },
        { month: 'Feb', revenue: 52000, bookings: 145 },
        { month: 'Mar', revenue: 48000, bookings: 135 },
        { month: 'Apr', revenue: 61000, bookings: 168 },
        { month: 'May', revenue: 58000, bookings: 155 },
        { month: 'Jun', revenue: 67000, bookings: 180 }
      ],
      demographics: [
        { name: '18-24', value: 25, percentage: 25 },
        { name: '25-34', value: 35, percentage: 35 },
        { name: '35-44', value: 20, percentage: 20 },
        { name: '45-54', value: 15, percentage: 15 },
        { name: '55+', value: 5, percentage: 5 }
      ],
      sports: [
        { sport: 'Cricket', performance: 85, popularity: 92 },
        { sport: 'Football', performance: 78, popularity: 85 },
        { sport: 'Kabaddi', performance: 72, popularity: 65 },
        { sport: 'Tennis', performance: 80, popularity: 75 }
      ]
    };

    switch (widget.type) {
      case 'metric':
        return (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">
                ₹{Math.floor(Math.random() * 100)}K
              </div>
              <div className="text-sm text-muted-foreground">
                {widget.config.metric || 'Revenue'}
              </div>
              <Badge variant="secondary" className="mt-2">
                +12% vs last month
              </Badge>
            </div>
          </div>
        );

      case 'chart':
        const chartType = widget.config.chartType || 'bar';
        
        switch (chartType) {
          case 'area':
            return (
              <div className="h-full">
                <RevenueAnalyticsChart
                  data={mockData.revenue}
                  title=""
                  className="border-0 shadow-none"
                />
              </div>
            );
          case 'pie':
            return (
              <div className="h-full">
                <AudienceDemographicsChart
                  data={mockData.demographics}
                  title=""
                  className="border-0 shadow-none"
                />
              </div>
            );
          case 'radar':
            return (
              <div className="h-full">
                <SportsPerformanceRadar
                  data={mockData.sports}
                  title=""
                  className="border-0 shadow-none"
                />
              </div>
            );
          default:
            return (
              <div className="h-full flex items-center justify-center">
                <div className="text-center">
                  <BarChart3 className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <div className="text-sm text-muted-foreground">
                    {chartType.charAt(0).toUpperCase() + chartType.slice(1)} Chart
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">
                    Sample data visualization
                  </div>
                </div>
              </div>
            );
        }

      case 'table':
        return (
          <div className="h-full overflow-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2">Event</th>
                  <th className="text-left p-2">Sales</th>
                  <th className="text-left p-2">Revenue</th>
                </tr>
              </thead>
              <tbody>
                {Array.from({ length: 5 }).map((_, i) => (
                  <tr key={i} className="border-b">
                    <td className="p-2">Event {i + 1}</td>
                    <td className="p-2">{Math.floor(Math.random() * 500)}</td>
                    <td className="p-2">₹{Math.floor(Math.random() * 50)}K</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );

      case 'text':
        return (
          <div className="h-full p-4">
            <div className="text-sm text-muted-foreground">
              This is a text widget. You can add custom content, notes, or any information here.
              {editMode && ' Click to edit this content.'}
            </div>
          </div>
        );

      default:
        return (
          <div className="h-full flex items-center justify-center">
            <div className="text-center">
              <Activity className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
              <div className="text-sm text-muted-foreground">
                Custom Widget
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="space-y-6">
      {/* Dashboard Editor Controls */}
      <DashboardEditor
        widgets={widgets}
        onWidgetsChange={handleWidgetsChange}
        editMode={editMode}
        onEditModeChange={setEditMode}
      />

      {/* Dashboard Canvas */}
      <div className="relative min-h-[800px] bg-gradient-subtle rounded-lg p-6">
        {editMode && (
          <div className="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none" />
        )}
        
        {widgets.map((widget) => (
          <EditableWidget
            key={widget.id}
            widget={widget}
            editMode={editMode}
            onUpdate={handleWidgetUpdate}
            onDelete={handleWidgetDelete}
            onSelect={setSelectedWidget}
            isSelected={selectedWidget?.id === widget.id}
          >
            {renderWidgetContent(widget)}
          </EditableWidget>
        ))}

        {/* Empty State */}
        {widgets.length === 0 && (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <BarChart3 className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No Widgets Added</h3>
              <p className="text-muted-foreground mb-4">
                Turn on edit mode and add some widgets to get started.
              </p>
              <Button onClick={() => setEditMode(true)}>
                Start Editing
              </Button>
            </div>
          </div>
        )}

        {/* Grid Helper (Edit Mode) */}
        {editMode && (
          <div className="absolute inset-0 pointer-events-none">
            <svg className="w-full h-full opacity-10">
              <defs>
                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1"/>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>
          </div>
        )}
      </div>
    </div>
  );
};