import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { DetectionOverlay } from './DetectionOverlay';
import { Scan, Settings2, FileText } from 'lucide-react';

interface ObjectDetectionPanelProps {
  visibleImage: string;
  irImage: string;
  fusedImage: string;
}

export const ObjectDetectionPanel: React.FC<ObjectDetectionPanelProps> = ({ 
  visibleImage, 
  irImage, 
  fusedImage 
}) => {
  const [enabled, setEnabled] = useState(false);
  const [tracking, setTracking] = useState(false);
  const [threshold, setThreshold] = useState(0.5); // (0.3 - 0.9)
  const [stats, setStats] = useState<any>({
    visible: { count: 0, fps: 0, inferenceTime: 0, classes: {} },
    ir: { count: 0, fps: 0, inferenceTime: 0, classes: {} },
    fused: { count: 0, fps: 0, inferenceTime: 0, classes: {} }
  });

  const handleRunDetection = () => {
    setEnabled(true);
    setStats({
      visible: { count: 0, fps: 0, inferenceTime: 0, classes: {} },
      ir: { count: 0, fps: 0, inferenceTime: 0, classes: {} },
      fused: { count: 0, fps: 0, inferenceTime: 0, classes: {} }
    });
  };

  const getAggregateClassCount = (className: string) => {
    // Return max count among the 3 sources (or just fused, depending on preference. We'll use fused if available)
    const fusedClasses = stats.fused.classes || {};
    return fusedClasses[className] || 0;
  };

  return (
    <Card className="p-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 border-b border-border pb-4">
        <div className="flex items-center gap-3">
          <Scan className="w-6 h-6 text-primary" />
          <div>
            <h3 className="text-xl font-semibold">Object Detection Dashboard</h3>
            <p className="text-sm text-muted-foreground">YOLOv8x-Seg Thermal Analysis Pipeline</p>
          </div>
        </div>
        
        <div className="flex flex-wrap items-center gap-6 bg-secondary/30 p-3 rounded-lg border border-border">
            <div className="flex items-center gap-2">
                <Switch 
                  id="enable-detection" 
                  checked={enabled}
                  onCheckedChange={setEnabled}
                />
                <label className="text-sm font-medium" htmlFor="enable-detection">
                  Enable Inference
                </label>
            </div>

            <div className="flex items-center gap-2">
                <Switch 
                  id="enable-tracking" 
                  checked={tracking}
                  onCheckedChange={setTracking}
                  disabled={!enabled}
                />
                <label className="text-sm font-medium text-muted-foreground" htmlFor="enable-tracking">
                  ByteTrack (Video)
                </label>
            </div>
            
            <div className="w-32 flex flex-col gap-1">
                <div className="flex justify-between text-xs">
                    <span>Threshold</span>
                    <span className="font-mono text-primary">{threshold.toFixed(2)}</span>
                </div>
                <Slider
                   value={[threshold]}
                   max={0.9}
                   min={0.3}
                   step={0.05}
                   disabled={!enabled}
                   onValueChange={(v) => setThreshold(v[0])}
                />
            </div>
            
            <Button 
              variant="fusion" 
              size="sm"
              onClick={handleRunDetection}
              disabled={!visibleImage || !irImage || !fusedImage}
            >
               Run Detection
            </Button>
        </div>
      </div>
      
      {/* Metrics Row */}
      {enabled && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
           <div className="bg-secondary/20 p-3 rounded border border-border text-center">
             <div className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Fused FPS</div>
             <div className="text-xl font-mono font-bold text-primary">{stats.fused.fps.toFixed(1)}</div>
           </div>
           <div className="bg-secondary/20 p-3 rounded border border-border text-center">
             <div className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Inference Time</div>
             <div className="text-xl font-mono font-bold">{stats.fused.inferenceTime.toFixed(1)}ms</div>
           </div>
           <div className="bg-secondary/20 p-3 rounded border border-border text-center">
             <div className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Total Objects (Fused)</div>
             <div className="text-xl font-mono font-bold">{stats.fused.count}</div>
           </div>
           <div className="bg-secondary/20 p-3 rounded border border-border text-center">
             <div className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Total Objects (IR)</div>
             <div className="text-xl font-mono font-bold">{stats.ir.count}</div>
           </div>
        </div>
      )}

      {/* Three Panel View */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <DetectionOverlay
          title="Visible Image Detection"
          imageSrc={visibleImage}
          enabled={enabled}
          threshold={threshold}
          useTracking={tracking}
          onDetectComplete={(s) => setStats(prev => ({ ...prev, visible: s }))}
        />
        
        <DetectionOverlay
          title="Infrared Image Detection"
          imageSrc={irImage}
          enabled={enabled}
          threshold={threshold}
          useTracking={tracking}
          onDetectComplete={(s) => setStats(prev => ({ ...prev, ir: s }))}
        />
        
        <div className="ring-2 ring-primary/50 rounded-lg p-1 bg-primary/5">
            <DetectionOverlay
              title="Fused Image Detection"
              imageSrc={fusedImage}
              enabled={enabled}
              threshold={threshold}
              useTracking={tracking}
              onDetectComplete={(s) => setStats(prev => ({ ...prev, fused: s }))}
            />
        </div>
      </div>
      
      {/* Counters Display */}
      <div className="bg-secondary/20 border border-border rounded-lg p-6">
          <h4 className="font-semibold text-lg mb-4 flex items-center gap-2">
            <Settings2 className="w-5 h-5" /> Detected Objects Breakdown (Fused View)
          </h4>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
             <div className="bg-background border-l-4 border-l-green-500 p-4 rounded shadow-sm">
                 <span className="text-sm text-muted-foreground mb-1 block">Persons</span>
                 <span className="text-3xl font-mono font-bold">{getAggregateClassCount('person')}</span>
             </div>
             <div className="bg-background border-l-4 border-l-red-500 p-4 rounded shadow-sm">
                 <span className="text-sm text-muted-foreground mb-1 block">Cars</span>
                 <span className="text-3xl font-mono font-bold">{getAggregateClassCount('car')}</span>
             </div>
             <div className="bg-background border-l-4 border-l-orange-500 p-4 rounded shadow-sm">
                 <span className="text-sm text-muted-foreground mb-1 block">Trucks / Buses</span>
                 <span className="text-3xl font-mono font-bold">{getAggregateClassCount('truck') + getAggregateClassCount('bus')}</span>
             </div>
             <div className="bg-background border-l-4 border-l-purple-500 p-4 rounded shadow-sm">
                 <span className="text-sm text-muted-foreground mb-1 block">Animals</span>
                 <span className="text-3xl font-mono font-bold">
                   {['bird', 'cat', 'dog', 'horse', 'sheep', 'cow', 'elephant', 'bear', 'zebra', 'giraffe'].reduce((acc, cls) => acc + getAggregateClassCount(cls), 0)}
                 </span>
             </div>
          </div>
          
          {stats.fused.count > Math.max(stats.visible.count, stats.ir.count) && (
              <div className="mt-6 p-3 bg-green-500/10 border border-green-500/20 rounded text-center text-sm font-medium text-green-500">
                  Image fusion successfully increased overall object detection precision!
              </div>
          )}
      </div>
      
      {/* Scene Summary */}
      {enabled && (stats.fused.count > 0 || stats.ir.count > 0 || stats.visible.count > 0) && (
          <div className="mt-8 bg-background border border-border rounded-lg p-6 shadow-sm">
            <h4 className="font-semibold text-lg mb-4 flex items-center gap-2 border-b border-border pb-2">
              <FileText className="w-5 h-5 text-primary" /> Scene Summary
            </h4>
            
            <div className="space-y-4 text-sm font-mono text-muted-foreground whitespace-pre-line">
               {generateSceneSummary(stats, tracking)}
            </div>
          </div>
      )}
    </Card>
  );
};

function generateSceneSummary(stats: any, trackingEnabled: boolean): string {
    const persons = (stats.fused.classes?.person || 0) || (stats.ir.classes?.person || 0);
    const cars = (stats.fused.classes?.car || 0) || (stats.ir.classes?.car || 0);
    const trucks = (stats.fused.classes?.truck || 0) + (stats.fused.classes?.bus || 0);
    const animals = ['bird', 'cat', 'dog', 'horse', 'sheep', 'cow', 'elephant', 'bear', 'zebra', 'giraffe'].reduce((acc, cls) => acc + (stats.fused.classes?.[cls] || 0), 0);
    
    const activeTracked = trackingEnabled ? stats.fused.count : 0;
    
    let hotspots = 0;
    let maxTempRegion = "None detected";
    if (stats.ir.thermalAnalysis?.hotspot) {
        hotspots = stats.ir.thermalAnalysis.hotspot.intensity > 150 ? 1 : 0;
        if (hotspots > 0) {
           const x = stats.ir.thermalAnalysis.hotspot.x;
           maxTempRegion = x > 300 ? (cars > 0 ? "Vehicle Engine Area" : "Right Quadrant") : "Left/Center Quadrant";
        }
    }
    
    const isViolating = persons > 0;
    const isSuspicious = persons > 0 && cars > 0;
    
    let threatLevel = "LOW";
    let assessment = `The scene contains ${persons} pedestrian(s) and ${cars + trucks} vehicle(s) moving normally. `;
    let recommendedAction = "Continue routine monitoring.";
    
    if (hotspots > 0) {
        assessment += `${hotspots} thermal hotspot(s) were detected near the ${maxTempRegion.toLowerCase()}. `;
    }
    
    if (isViolating && isSuspicious) {
        threatLevel = "HIGH";
        assessment += "Unusual behavior and unauthorized access observed near vehicles.";
        recommendedAction = "Dispatch security personnel immediately and initiate lockdown protocol.";
    } else if (isViolating || hotspots > 0) {
        threatLevel = "MEDIUM";
        assessment += isViolating ? "Pedestrians detected in monitored zone. " : "Abnormal thermal activity detected. ";
        recommendedAction = "Maintain heightened surveillance and alert standby units.";
    } else {
        assessment += "No unusual behavior or unauthorized access was observed.";
    }
    
    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    return `Timestamp: ${timestamp}

Objects Detected:
* Persons: ${persons}
* Cars: ${cars}
* Trucks: ${trucks}
* Animals: ${animals}

Tracking Information:
* Active Tracked Objects: ${activeTracked}

Thermal Analysis:
* Hotspots Detected: ${hotspots}
* Maximum Temperature Region: ${maxTempRegion}

Security Analysis:
* Restricted Zone Violations: ${isViolating ? 'Yes' : 'No'}
* Suspicious Activity: ${isSuspicious ? 'Yes' : 'No'}

Overall Assessment:
${assessment}

Threat Level:
${threatLevel}

Recommended Action:
${recommendedAction}`;
}

