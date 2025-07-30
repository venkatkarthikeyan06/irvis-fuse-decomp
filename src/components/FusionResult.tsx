import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Download, Share2, BarChart3, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FusionResultProps {
  fusedImage?: string;
  metrics?: {
    ssim: number;
    psnr: number;
    entropy: number;
    gradient_strength: number;
  };
  processingTime?: number;
}

export const FusionResult: React.FC<FusionResultProps> = ({
  fusedImage,
  metrics,
  processingTime
}) => {
  return (
    <Card className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-fusion opacity-5" />
      <div className="relative p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-full bg-gradient-fusion flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-semibold">Fusion Result</h3>
            <p className="text-sm text-muted-foreground">
              {processingTime && `Processed in ${processingTime}ms`}
            </p>
          </div>
        </div>

        {fusedImage ? (
          <div className="space-y-6">
            <div className="relative group">
              <img
                src={fusedImage}
                alt="Fused result"
                className={cn(
                  "w-full h-64 object-cover rounded-lg transition-all duration-300",
                  "group-hover:shadow-fusion"
                )}
              />
              <div className="absolute inset-0 bg-gradient-fusion opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-lg" />
            </div>

            {metrics && (
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-lg bg-card/50 border border-border">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">SSIM</span>
                    <Badge variant="outline">{metrics.ssim.toFixed(3)}</Badge>
                  </div>
                  <div className="w-full bg-secondary rounded-full h-2 mt-2">
                    <div 
                      className="bg-gradient-fusion h-2 rounded-full transition-all duration-500"
                      style={{ width: `${metrics.ssim * 100}%` }}
                    />
                  </div>
                </div>

                <div className="p-4 rounded-lg bg-card/50 border border-border">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">PSNR</span>
                    <Badge variant="outline">{metrics.psnr.toFixed(1)} dB</Badge>
                  </div>
                  <div className="w-full bg-secondary rounded-full h-2 mt-2">
                    <div 
                      className="bg-gradient-visible h-2 rounded-full transition-all duration-500"
                      style={{ width: `${Math.min(metrics.psnr / 50, 1) * 100}%` }}
                    />
                  </div>
                </div>

                <div className="p-4 rounded-lg bg-card/50 border border-border">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Entropy</span>
                    <Badge variant="outline">{metrics.entropy.toFixed(2)}</Badge>
                  </div>
                  <div className="w-full bg-secondary rounded-full h-2 mt-2">
                    <div 
                      className="bg-gradient-infrared h-2 rounded-full transition-all duration-500"
                      style={{ width: `${(metrics.entropy / 8) * 100}%` }}
                    />
                  </div>
                </div>

                <div className="p-4 rounded-lg bg-card/50 border border-border">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Gradient</span>
                    <Badge variant="outline">{metrics.gradient_strength.toFixed(2)}</Badge>
                  </div>
                  <div className="w-full bg-secondary rounded-full h-2 mt-2">
                    <div 
                      className="bg-primary h-2 rounded-full transition-all duration-500"
                      style={{ width: `${Math.min(metrics.gradient_strength / 100, 1) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            )}

            <div className="flex gap-3">
              <Button variant="outline" size="sm" className="flex-1">
                <Download className="w-4 h-4 mr-2" />
                Download
              </Button>
              <Button variant="outline" size="sm" className="flex-1">
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </Button>
              <Button variant="outline" size="sm" className="flex-1">
                <BarChart3 className="w-4 h-4 mr-2" />
                Analyze
              </Button>
            </div>
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="w-16 h-16 mx-auto rounded-full bg-gradient-fusion opacity-20 flex items-center justify-center mb-4">
              <Sparkles className="w-8 h-8 text-foreground" />
            </div>
            <p className="text-muted-foreground">
              Upload images and run fusion to see results
            </p>
          </div>
        )}
      </div>
    </Card>
  );
};