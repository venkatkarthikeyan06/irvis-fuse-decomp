import React from 'react';
import { Card } from '@/components/ui/card';
import { PerformanceMetricsData } from '@/hooks/useFusion';
import { Activity, Cpu, Microchip, Clock } from 'lucide-react';

export const PerformanceMonitor: React.FC<{ data: PerformanceMetricsData }> = ({ data }) => {
  return (
    <Card className="p-6 bg-secondary/20">
      <div className="flex items-center gap-3 mb-6">
        <Activity className="w-5 h-5 text-primary" />
        <h3 className="text-lg font-semibold">Real-Time Performance</h3>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-background rounded-lg p-4 border border-border">
          <div className="flex items-center gap-2 text-muted-foreground mb-2">
            <Clock className="w-4 h-4" />
            <span className="text-sm">Fusion Time</span>
          </div>
          <div className="text-2xl font-mono font-bold">{data.processingTime} ms</div>
        </div>
        <div className="bg-background rounded-lg p-4 border border-border">
          <div className="flex items-center gap-2 text-muted-foreground mb-2">
            <Activity className="w-4 h-4" />
            <span className="text-sm">FPS</span>
          </div>
          <div className="text-2xl font-mono font-bold">{data.fps}</div>
        </div>
        <div className="bg-background rounded-lg p-4 border border-border">
          <div className="flex items-center gap-2 text-muted-foreground mb-2">
            <Cpu className="w-4 h-4" />
            <span className="text-sm">Memory</span>
          </div>
          <div className="text-2xl font-mono font-bold">{data.memoryUsage} MB</div>
        </div>
        <div className="bg-background rounded-lg p-4 border border-border">
          <div className="flex items-center gap-2 text-muted-foreground mb-2">
            <Microchip className="w-4 h-4" />
            <span className="text-sm">GPU Status</span>
          </div>
          <div className="text-sm font-semibold truncate mt-2 text-primary">{data.gpuAcceleration}</div>
        </div>
      </div>
    </Card>
  );
};
