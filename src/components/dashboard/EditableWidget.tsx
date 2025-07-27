import React, { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Edit3,
  Settings,
  Trash2,
  Move,
  Maximize2,
  Minimize2,
  MoreVertical,
  Palette,
  BarChart3,
  PieChart,
  LineChart,
  AreaChart,
  RefreshCw,
  Download
} from "lucide-react";
import { DashboardWidget } from "./DashboardEditor";
import { useToast } from "@/hooks/use-toast";

interface EditableWidgetProps {
  widget: DashboardWidget;
  editMode: boolean;
  onUpdate: (id: string, updates: Partial<DashboardWidget>) => void;
  onDelete: (id: string) => void;
  onSelect: (widget: DashboardWidget) => void;
  isSelected: boolean;
  children: React.ReactNode;
}

export const EditableWidget: React.FC<EditableWidgetProps> = ({
  widget,
  editMode,
  onUpdate,
  onDelete,
  onSelect,
  isSelected,
  children
}) => {
  const { toast } = useToast();
  const [isResizing, setIsResizing] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [tempTitle, setTempTitle] = useState(widget.title);
  const [showSettings, setShowSettings] = useState(false);
  const widgetRef = useRef<HTMLDivElement>(null);
  const resizeRef = useRef<HTMLDivElement>(null);

  // Handle drag to move
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!editMode || isResizing) return;
    
    setIsDragging(true);
    const startX = e.clientX - widget.position.x;
    const startY = e.clientY - widget.position.y;

    const handleMouseMove = (e: MouseEvent) => {
      const newX = Math.max(0, e.clientX - startX);
      const newY = Math.max(0, e.clientY - startY);
      
      onUpdate(widget.id, {
        position: { x: newX, y: newY }
      });
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  // Handle resize
  const handleResizeMouseDown = (e: React.MouseEvent) => {
    if (!editMode) return;
    
    e.stopPropagation();
    setIsResizing(true);
    
    const startX = e.clientX;
    const startY = e.clientY;
    const startWidth = widget.size.width;
    const startHeight = widget.size.height;

    const handleResizeMove = (e: MouseEvent) => {
      const newWidth = Math.max(200, startWidth + (e.clientX - startX));
      const newHeight = Math.max(150, startHeight + (e.clientY - startY));
      
      onUpdate(widget.id, {
        size: { width: newWidth, height: newHeight }
      });
    };

    const handleResizeUp = () => {
      setIsResizing(false);
      document.removeEventListener('mousemove', handleResizeMove);
      document.removeEventListener('mouseup', handleResizeUp);
    };

    document.addEventListener('mousemove', handleResizeMove);
    document.addEventListener('mouseup', handleResizeUp);
  };

  // Handle title edit
  const handleTitleSave = () => {
    onUpdate(widget.id, { title: tempTitle });
    setIsEditing(false);
    toast({
      title: "Title Updated! ✏️",
      description: "Widget title has been updated successfully.",
    });
  };

  const handleTitleCancel = () => {
    setTempTitle(widget.title);
    setIsEditing(false);
  };

  // Quick size presets
  const applySizePreset = (preset: 'small' | 'medium' | 'large' | 'wide') => {
    const sizes = {
      small: { width: 300, height: 200 },
      medium: { width: 400, height: 300 },
      large: { width: 600, height: 400 },
      wide: { width: 800, height: 300 }
    };
    
    onUpdate(widget.id, { size: sizes[preset] });
    toast({
      title: "Size Updated! 📏",
      description: `Widget resized to ${preset} preset.`,
    });
  };

  // Chart type change for chart widgets
  const handleChartTypeChange = (chartType: string) => {
    onUpdate(widget.id, {
      config: { ...widget.config, chartType }
    });
    toast({
      title: "Chart Type Changed! 📊",
      description: `Chart type updated to ${chartType}.`,
    });
  };

  return (
    <>
      <Card
        ref={widgetRef}
        className={`
          absolute transition-all duration-200 group
          ${editMode ? 'cursor-move' : ''}
          ${isDragging ? 'z-50 shadow-2xl scale-105' : 'shadow-floating'}
          ${isSelected ? 'ring-2 ring-primary ring-opacity-50' : ''}
          ${editMode ? 'hover:shadow-xl' : ''}
          border-0 bg-gradient-card
        `}
        style={{
          left: widget.position.x,
          top: widget.position.y,
          width: widget.size.width,
          height: widget.size.height,
          visibility: widget.visible ? 'visible' : 'hidden'
        }}
        onMouseDown={handleMouseDown}
        onClick={() => editMode && onSelect(widget)}
      >
        {/* Edit Mode Header */}
        {editMode && (
          <div className="absolute -top-8 left-0 right-0 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10">
            <Badge variant="secondary" className="text-xs bg-primary/10 text-primary border-primary/20">
              {widget.type}
            </Badge>
            
            <div className="flex items-center gap-1">
              <Button
                size="sm"
                variant="ghost"
                className="h-6 w-6 p-0"
                onClick={(e) => {
                  e.stopPropagation();
                  setShowSettings(true);
                }}
              >
                <Settings className="w-3 h-3" />
              </Button>
              
              <Button
                size="sm"
                variant="ghost"
                className="h-6 w-6 p-0"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsEditing(true);
                }}
              >
                <Edit3 className="w-3 h-3" />
              </Button>
              
              <Button
                size="sm"
                variant="ghost"
                className="h-6 w-6 p-0 text-destructive hover:text-destructive"
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(widget.id);
                }}
              >
                <Trash2 className="w-3 h-3" />
              </Button>
            </div>
          </div>
        )}

        {/* Widget Header */}
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium flex items-center justify-between">
            {isEditing ? (
              <div className="flex items-center gap-2 flex-1">
                <Input
                  value={tempTitle}
                  onChange={(e) => setTempTitle(e.target.value)}
                  className="h-6 text-sm"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleTitleSave();
                    if (e.key === 'Escape') handleTitleCancel();
                  }}
                  onClick={(e) => e.stopPropagation()}
                  autoFocus
                />
                <Button size="sm" className="h-6 px-2 text-xs" onClick={handleTitleSave}>
                  Save
                </Button>
              </div>
            ) : (
              <span className="truncate">{widget.title}</span>
            )}
            
            {!editMode && widget.type === 'chart' && (
              <div className="flex items-center gap-1">
                <Button size="sm" variant="ghost" className="h-6 w-6 p-0">
                  <RefreshCw className="w-3 h-3" />
                </Button>
                <Button size="sm" variant="ghost" className="h-6 w-6 p-0">
                  <Download className="w-3 h-3" />
                </Button>
              </div>
            )}
          </CardTitle>
        </CardHeader>

        {/* Widget Content */}
        <CardContent className="p-4 pt-0 h-full overflow-hidden">
          {children}
        </CardContent>

        {/* Resize Handle */}
        {editMode && (
          <div
            ref={resizeRef}
            className="absolute bottom-0 right-0 w-4 h-4 cursor-se-resize opacity-0 group-hover:opacity-100 transition-opacity duration-200"
            onMouseDown={handleResizeMouseDown}
          >
            <div className="absolute bottom-1 right-1 w-0 h-0 border-l-4 border-l-transparent border-b-4 border-b-muted-foreground" />
          </div>
        )}

        {/* Move Handle */}
        {editMode && (
          <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 cursor-move">
            <Move className="w-3 h-3 text-muted-foreground" />
          </div>
        )}
      </Card>

      {/* Widget Settings Dialog */}
      <Dialog open={showSettings} onOpenChange={setShowSettings}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Widget Settings</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            {/* Size Presets */}
            <div>
              <label className="text-sm font-medium mb-2 block">Size Presets</label>
              <div className="grid grid-cols-2 gap-2">
                <Button size="sm" variant="outline" onClick={() => applySizePreset('small')}>
                  <Minimize2 className="w-3 h-3 mr-1" />
                  Small
                </Button>
                <Button size="sm" variant="outline" onClick={() => applySizePreset('medium')}>
                  Medium
                </Button>
                <Button size="sm" variant="outline" onClick={() => applySizePreset('large')}>
                  <Maximize2 className="w-3 h-3 mr-1" />
                  Large
                </Button>
                <Button size="sm" variant="outline" onClick={() => applySizePreset('wide')}>
                  Wide
                </Button>
              </div>
            </div>

            {/* Chart Type (for chart widgets) */}
            {widget.type === 'chart' && (
              <div>
                <label className="text-sm font-medium mb-2 block">Chart Type</label>
                <Select 
                  value={widget.config.chartType || 'bar'} 
                  onValueChange={handleChartTypeChange}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="bar">
                      <div className="flex items-center gap-2">
                        <BarChart3 className="w-4 h-4" />
                        Bar Chart
                      </div>
                    </SelectItem>
                    <SelectItem value="line">
                      <div className="flex items-center gap-2">
                        <LineChart className="w-4 h-4" />
                        Line Chart
                      </div>
                    </SelectItem>
                    <SelectItem value="area">
                      <div className="flex items-center gap-2">
                        <AreaChart className="w-4 h-4" />
                        Area Chart
                      </div>
                    </SelectItem>
                    <SelectItem value="pie">
                      <div className="flex items-center gap-2">
                        <PieChart className="w-4 h-4" />
                        Pie Chart
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}

            {/* Widget Info */}
            <div className="text-xs text-muted-foreground space-y-1">
              <div>Type: {widget.type}</div>
              <div>Size: {widget.size.width} × {widget.size.height}</div>
              <div>Position: ({widget.position.x}, {widget.position.y})</div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};