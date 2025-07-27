import React, { useState, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import {
  Edit3,
  Settings,
  Plus,
  Trash2,
  Move,
  Eye,
  EyeOff,
  Save,
  RotateCcw,
  Palette,
  Layout,
  Maximize2,
  Minimize2,
  GripVertical
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export interface DashboardWidget {
  id: string;
  type: 'metric' | 'chart' | 'table' | 'text' | 'custom';
  title: string;
  position: { x: number; y: number };
  size: { width: number; height: number };
  visible: boolean;
  config: Record<string, any>;
  data?: any;
}

interface DashboardEditorProps {
  widgets: DashboardWidget[];
  onWidgetsChange: (widgets: DashboardWidget[]) => void;
  editMode: boolean;
  onEditModeChange: (editMode: boolean) => void;
}

export const DashboardEditor: React.FC<DashboardEditorProps> = ({
  widgets,
  onWidgetsChange,
  editMode,
  onEditModeChange
}) => {
  const { toast } = useToast();
  const [draggedWidget, setDraggedWidget] = useState<string | null>(null);
  const [selectedWidget, setSelectedWidget] = useState<DashboardWidget | null>(null);
  const [layoutPreset, setLayoutPreset] = useState<string>('default');

  const handleWidgetUpdate = useCallback((widgetId: string, updates: Partial<DashboardWidget>) => {
    const updatedWidgets = widgets.map(widget =>
      widget.id === widgetId ? { ...widget, ...updates } : widget
    );
    onWidgetsChange(updatedWidgets);
  }, [widgets, onWidgetsChange]);

  const handleAddWidget = useCallback((type: DashboardWidget['type']) => {
    const newWidget: DashboardWidget = {
      id: `widget-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      type,
      title: `New ${type.charAt(0).toUpperCase() + type.slice(1)}`,
      position: { x: 0, y: 0 },
      size: { width: 400, height: 300 },
      visible: true,
      config: {}
    };

    onWidgetsChange([...widgets, newWidget]);
    toast({
      title: "Widget Added! ✨",
      description: `New ${type} widget has been added to your dashboard.`,
    });
  }, [widgets, onWidgetsChange, toast]);

  const handleDeleteWidget = useCallback((widgetId: string) => {
    const updatedWidgets = widgets.filter(widget => widget.id !== widgetId);
    onWidgetsChange(updatedWidgets);
    setSelectedWidget(null);
    toast({
      title: "Widget Removed! 🗑️",
      description: "Widget has been deleted from your dashboard.",
    });
  }, [widgets, onWidgetsChange, toast]);

  const handleDragStart = (e: React.DragEvent, widgetId: string) => {
    setDraggedWidget(widgetId);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e: React.DragEvent, targetId: string) => {
    e.preventDefault();
    if (!draggedWidget || draggedWidget === targetId) return;

    const draggedIndex = widgets.findIndex(w => w.id === draggedWidget);
    const targetIndex = widgets.findIndex(w => w.id === targetId);

    if (draggedIndex === -1 || targetIndex === -1) return;

    const newWidgets = [...widgets];
    const [removed] = newWidgets.splice(draggedIndex, 1);
    newWidgets.splice(targetIndex, 0, removed);

    onWidgetsChange(newWidgets);
    setDraggedWidget(null);
    
    toast({
      title: "Widget Moved! 📍",
      description: "Widget has been repositioned on your dashboard.",
    });
  };

  const applyLayoutPreset = useCallback((preset: string) => {
    let newLayout: Partial<DashboardWidget>[] = [];
    
    switch (preset) {
      case 'grid':
        newLayout = widgets.map((widget, index) => ({
          position: { 
            x: (index % 3) * 420, 
            y: Math.floor(index / 3) * 320 
          },
          size: { width: 400, height: 300 }
        }));
        break;
      case 'compact':
        newLayout = widgets.map((widget, index) => ({
          position: { 
            x: (index % 4) * 310, 
            y: Math.floor(index / 4) * 210 
          },
          size: { width: 300, height: 200 }
        }));
        break;
      case 'focus':
        newLayout = widgets.map((widget, index) => ({
          position: { 
            x: index === 0 ? 0 : 630, 
            y: index === 0 ? 0 : (index - 1) * 160 
          },
          size: { 
            width: index === 0 ? 600 : 300, 
            height: index === 0 ? 400 : 150 
          }
        }));
        break;
      default:
        return;
    }

    const updatedWidgets = widgets.map((widget, index) => ({
      ...widget,
      ...newLayout[index]
    }));

    onWidgetsChange(updatedWidgets);
    setLayoutPreset(preset);
    
    toast({
      title: "Layout Applied! 🎨",
      description: `${preset.charAt(0).toUpperCase() + preset.slice(1)} layout has been applied.`,
    });
  }, [widgets, onWidgetsChange, toast]);

  const resetDashboard = useCallback(() => {
    const defaultWidgets = widgets.map(widget => ({
      ...widget,
      position: { x: 0, y: 0 },
      size: { width: 400, height: 300 },
      visible: true
    }));
    onWidgetsChange(defaultWidgets);
    
    toast({
      title: "Dashboard Reset! ↩️",
      description: "Dashboard has been reset to default layout.",
    });
  }, [widgets, onWidgetsChange, toast]);

  const saveDashboard = useCallback(() => {
    localStorage.setItem('dashboard-layout', JSON.stringify(widgets));
    toast({
      title: "Dashboard Saved! 💾",
      description: "Your dashboard layout has been saved successfully.",
    });
  }, [widgets, toast]);

  return (
    <div className="space-y-4">
      {/* Dashboard Editor Header */}
      <Card className="border-0 bg-gradient-card shadow-floating">
        <CardHeader className="pb-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Switch
                  checked={editMode}
                  onCheckedChange={onEditModeChange}
                  id="edit-mode"
                />
                <Label htmlFor="edit-mode" className="font-medium">
                  Edit Mode
                </Label>
                {editMode && (
                  <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
                    <Edit3 className="w-3 h-3 mr-1" />
                    Editing
                  </Badge>
                )}
              </div>
              
              {editMode && (
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">
                    {widgets.filter(w => w.visible).length} visible widgets
                  </span>
                </div>
              )}
            </div>

            {editMode && (
              <div className="flex items-center gap-2">
                {/* Layout Presets */}
                <Select value={layoutPreset} onValueChange={applyLayoutPreset}>
                  <SelectTrigger className="w-32">
                    <Layout className="w-4 h-4 mr-2" />
                    <SelectValue placeholder="Layout" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="grid">Grid</SelectItem>
                    <SelectItem value="compact">Compact</SelectItem>
                    <SelectItem value="focus">Focus</SelectItem>
                  </SelectContent>
                </Select>

                {/* Add Widget */}
                <Sheet>
                  <SheetTrigger asChild>
                    <Button size="sm" variant="outline">
                      <Plus className="w-4 h-4 mr-2" />
                      Add Widget
                    </Button>
                  </SheetTrigger>
                  <SheetContent>
                    <SheetHeader>
                      <SheetTitle>Add New Widget</SheetTitle>
                    </SheetHeader>
                    <div className="space-y-4 mt-6">
                      {[
                        { type: 'metric' as const, title: 'Metric Card', desc: 'Display key metrics and KPIs' },
                        { type: 'chart' as const, title: 'Chart Widget', desc: 'Visualize data with charts' },
                        { type: 'table' as const, title: 'Data Table', desc: 'Show tabular data' },
                        { type: 'text' as const, title: 'Text Widget', desc: 'Add custom text or notes' },
                        { type: 'custom' as const, title: 'Custom Widget', desc: 'Create your own widget' }
                      ].map(({ type, title, desc }) => (
                        <Card 
                          key={type}
                          className="cursor-pointer transition-all duration-200 hover:shadow-md hover:scale-102"
                          onClick={() => handleAddWidget(type)}
                        >
                          <CardContent className="p-4">
                            <h4 className="font-medium mb-1">{title}</h4>
                            <p className="text-sm text-muted-foreground">{desc}</p>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </SheetContent>
                </Sheet>

                {/* Actions */}
                <Button size="sm" variant="outline" onClick={saveDashboard}>
                  <Save className="w-4 h-4 mr-2" />
                  Save
                </Button>
                
                <Button size="sm" variant="outline" onClick={resetDashboard}>
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Reset
                </Button>
              </div>
            )}
          </div>
        </CardHeader>
      </Card>

      {/* Widget Configuration Panel */}
      {editMode && selectedWidget && (
        <Card className="border-0 bg-gradient-card shadow-floating animate-fade-in">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="w-5 h-5 text-primary" />
              Widget Settings: {selectedWidget.title}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Basic Settings */}
              <div className="space-y-3">
                <div>
                  <Label htmlFor="widget-title">Title</Label>
                  <Input
                    id="widget-title"
                    value={selectedWidget.title}
                    onChange={(e) => handleWidgetUpdate(selectedWidget.id, { title: e.target.value })}
                    placeholder="Widget title..."
                  />
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="flex items-center space-x-2">
                    <Switch
                      checked={selectedWidget.visible}
                      onCheckedChange={(visible) => handleWidgetUpdate(selectedWidget.id, { visible })}
                      id="widget-visible"
                    />
                    <Label htmlFor="widget-visible">Visible</Label>
                  </div>
                  
                  {selectedWidget.visible ? (
                    <Eye className="w-4 h-4 text-green-500" />
                  ) : (
                    <EyeOff className="w-4 h-4 text-muted-foreground" />
                  )}
                </div>
              </div>

              {/* Size Settings */}
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <Label htmlFor="widget-width">Width</Label>
                    <Input
                      id="widget-width"
                      type="number"
                      value={selectedWidget.size.width}
                      onChange={(e) => handleWidgetUpdate(selectedWidget.id, {
                        size: { ...selectedWidget.size, width: parseInt(e.target.value) || 400 }
                      })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="widget-height">Height</Label>
                    <Input
                      id="widget-height"
                      type="number"
                      value={selectedWidget.size.height}
                      onChange={(e) => handleWidgetUpdate(selectedWidget.id, {
                        size: { ...selectedWidget.size, height: parseInt(e.target.value) || 300 }
                      })}
                    />
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleWidgetUpdate(selectedWidget.id, {
                      size: { width: 300, height: 200 }
                    })}
                  >
                    <Minimize2 className="w-3 h-3 mr-1" />
                    Small
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleWidgetUpdate(selectedWidget.id, {
                      size: { width: 600, height: 400 }
                    })}
                  >
                    <Maximize2 className="w-3 h-3 mr-1" />
                    Large
                  </Button>
                </div>
              </div>
            </div>

            <Separator />

            {/* Widget Actions */}
            <div className="flex items-center justify-between">
              <Badge variant="outline">{selectedWidget.type}</Badge>
              
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setSelectedWidget(null)}
                >
                  Close
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => handleDeleteWidget(selectedWidget.id)}
                >
                  <Trash2 className="w-3 h-3 mr-1" />
                  Delete
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Widget List for Edit Mode */}
      {editMode && (
        <Card className="border-0 bg-gradient-card shadow-floating">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Move className="w-5 h-5 text-primary" />
              Dashboard Widgets
              <Badge variant="secondary">{widgets.length} total</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {widgets.map((widget) => (
                <div
                  key={widget.id}
                  draggable={editMode}
                  onDragStart={(e) => handleDragStart(e, widget.id)}
                  onDragOver={handleDragOver}
                  onDrop={(e) => handleDrop(e, widget.id)}
                  className={`
                    flex items-center justify-between p-3 rounded-lg border transition-all duration-200
                    ${draggedWidget === widget.id ? 'opacity-50 scale-95' : 'hover:bg-muted/30'}
                    ${selectedWidget?.id === widget.id ? 'ring-2 ring-primary bg-primary/5' : ''}
                    cursor-move
                  `}
                  onClick={() => setSelectedWidget(widget)}
                >
                  <div className="flex items-center gap-3">
                    <GripVertical className="w-4 h-4 text-muted-foreground" />
                    <div>
                      <div className="font-medium">{widget.title}</div>
                      <div className="text-xs text-muted-foreground">
                        {widget.type} • {widget.size.width}×{widget.size.height}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    {widget.visible ? (
                      <Eye className="w-4 h-4 text-green-500" />
                    ) : (
                      <EyeOff className="w-4 h-4 text-muted-foreground" />
                    )}
                    <Badge variant="outline" className="text-xs">
                      {widget.type}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};