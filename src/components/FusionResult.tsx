import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Download, Share2, BarChart3, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

interface FusionResultProps {
  fusedImage?: string;
  metrics?: {
    ssim: number;
    psnr: number;
    entropy: number;
    gradient_strength: number;
  };
  processingTime?: number;
  onAnalyze?: () => void;
}

export const FusionResult: React.FC<FusionResultProps> = ({
  fusedImage,
  metrics,
  processingTime,
  onAnalyze
}) => {
  const handleDownload = () => {
    if (!fusedImage) return;

    const link = document.createElement('a');
    link.href = fusedImage;
    link.download = `fusion-result-${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success('Image downloaded successfully');
  };

  const handleShare = async () => {
    if (!fusedImage) return;

    try {
      if (navigator.share) {
        await navigator.share({
          title: 'FusionLab Result',
          text: 'Check out this image fusion result!',
          url: window.location.href,
        });
      } else {
        await navigator.clipboard.writeText(window.location.href);
        toast.info('Link copied to clipboard');
      }
    } catch (error) {
      console.error('Error sharing:', error);
      toast.error('Failed to share result');
    }
  };

  const handleAnalyze = () => {
    if (!metrics) return;

    let qualityMessage = "";
    if (metrics.ssim > 0.9) {
      qualityMessage = "Exceptional structural preservation. The fused image maintains almost all details from both sources.";
    } else if (metrics.ssim > 0.8) {
      qualityMessage = "High quality fusion. Good balance between thermal information and visual details.";
    } else {
      qualityMessage = "Standard fusion. Some structural information may be prioritized for visibility.";
    }

    const noiseInfo = metrics.psnr > 35 ? "Very low noise levels (Excellent PSNR)." :
      metrics.psnr > 30 ? "Clear output with minimal artifacts." :
        "Moderate noise levels, optimized for feature visibility.";

    const detailInfo = metrics.entropy > 7 ? "Rich information density with high detail retention." : "Good detail clarity in target areas.";

    toast.info(`Fusion Analysis Report`, {
      description: `${qualityMessage} ${noiseInfo} ${detailInfo}`,
      duration: 6000,
    });

    if (onAnalyze) onAnalyze();
  };

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
              <Button variant="outline" size="sm" className="flex-1" onClick={handleDownload}>
                <Download className="w-4 h-4 mr-2" />
                Download
              </Button>
              <Button variant="outline" size="sm" className="flex-1" onClick={handleShare}>
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </Button>
              <Button variant="outline" size="sm" className="flex-1" onClick={handleAnalyze}>
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