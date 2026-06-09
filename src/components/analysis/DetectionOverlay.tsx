import React, { useEffect, useState, useRef } from 'react';
import { Card } from '@/components/ui/card';
import { DetectionResult, detectObjects } from '@/detection/detectObjects';
import { drawBoundingBoxes } from '@/detection/drawBoundingBoxes';
import { Loader2 } from 'lucide-react';

interface DetectionOverlayProps {
  imageSrc: string;
  enabled: boolean;
  threshold: number;
  onDetectComplete?: (stats: any) => void;
  title: string;
  useTracking?: boolean;
}

export const DetectionOverlay: React.FC<DetectionOverlayProps> = ({ 
  imageSrc, 
  enabled, 
  threshold,
  onDetectComplete,
  title,
  useTracking = false
}) => {
  const [isDetecting, setIsDetecting] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    let isMounted = true;

    const run = async () => {
      if (!enabled || !imgRef.current || !canvasRef.current) return;
      
      setIsDetecting(true);
      try {
        const isThermal = title.includes('Infrared');
        const isFused = title.includes('Fused');
        
        const response = await detectObjects(
          imgRef.current, 
          threshold, 
          isThermal, 
          isFused, 
          useTracking
        );
        
        if (isMounted) {
          drawBoundingBoxes(canvasRef.current, imgRef.current, response.detections);
          
          // Count classes
          const classCounts: Record<string, number> = {};
          response.detections.forEach(d => {
             classCounts[d.class] = (classCounts[d.class] || 0) + 1;
          });
          
          onDetectComplete?.({
             count: response.detections.length,
             fps: response.fps,
             inferenceTime: response.inferenceTime,
             classes: classCounts,
             thermalAnalysis: response.thermalAnalysis
          });
        }
      } catch (err) {
        console.error("Failed detection on overlay:", err);
      } finally {
        if (isMounted) setIsDetecting(false);
      }
    };

    if (enabled && imageSrc) {
      if (imgRef.current?.complete) {
        run();
      } else if (imgRef.current) {
        imgRef.current.onload = run;
      }
    } else if (!enabled && canvasRef.current && imgRef.current) {
      // Clear canvas if disabled
      const ctx = canvasRef.current.getContext('2d');
      if (ctx) {
        canvasRef.current.width = imgRef.current.naturalWidth;
        canvasRef.current.height = imgRef.current.naturalHeight;
        ctx.drawImage(imgRef.current, 0, 0);
      }
    }

    return () => { isMounted = false; };
  }, [imageSrc, enabled, threshold, useTracking]);

  return (
    <div className="flex flex-col gap-2">
      <h4 className="font-semibold text-sm">{title}</h4>
      <div className="relative aspect-square w-full bg-secondary/20 rounded-lg overflow-hidden border border-border flex items-center justify-center group">
        <img 
          ref={imgRef}
          src={imageSrc} 
          crossOrigin="anonymous"
          className="hidden" 
          alt={title} 
        />
        
        <canvas 
          ref={canvasRef} 
          className="w-full h-full object-contain"
          style={{ display: imageSrc ? 'block' : 'none' }}
        />
        
        {isDetecting && (
           <div className="absolute inset-0 bg-background/50 backdrop-blur-sm flex flex-col items-center justify-center text-muted-foreground z-10">
             <Loader2 className="w-8 h-8 animate-spin mb-2 text-primary" />
             <p className="text-sm">Running visual inference...</p>
           </div>
        )}
      </div>
    </div>
  );
};
