import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Zap, Settings, Play } from 'lucide-react';

interface FusionControlsProps {
  fusionMethod: string;
  onFusionMethodChange: (method: string) => void;
  fusionWeight: number;
  onFusionWeightChange: (weight: number) => void;
  onRunFusion: () => void;
  isProcessing: boolean;
}

const fusionMethods = [
  { value: 'average', label: 'Average Fusion', description: 'Simple pixel averaging' },
  { value: 'weighted', label: 'Weighted Fusion', description: 'Saliency-based weighting' },
  { value: 'max_gradient', label: 'Max Gradient', description: 'Maximum gradient selection' },
  { value: 'laplacian', label: 'Laplacian Pyramid', description: 'Multi-scale decomposition' },
  { value: 'wavelet', label: 'Wavelet Transform', description: 'Frequency domain fusion' },
  { value: 'guided_filter', label: 'Guided Filter', description: 'Edge-preserving fusion' }
];

export const FusionControls: React.FC<FusionControlsProps> = ({
  fusionMethod,
  onFusionMethodChange,
  fusionWeight,
  onFusionWeightChange,
  onRunFusion,
  isProcessing
}) => {
  const selectedMethod = fusionMethods.find(m => m.value === fusionMethod);

  return (
    <Card className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-fusion opacity-5" />
      <div className="relative p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-full bg-gradient-fusion flex items-center justify-center">
            <Zap className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-semibold">Fusion Controls</h3>
            <p className="text-sm text-muted-foreground">Configure fusion parameters</p>
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <label className="text-sm font-medium mb-3 block">Fusion Method</label>
            <Select value={fusionMethod} onValueChange={onFusionMethodChange}>
              <SelectTrigger>
                <SelectValue placeholder="Select fusion method" />
              </SelectTrigger>
              <SelectContent>
                {fusionMethods.map((method) => (
                  <SelectItem key={method.value} value={method.value}>
                    <div className="flex flex-col">
                      <span className="font-medium">{method.label}</span>
                      <span className="text-xs text-muted-foreground">{method.description}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {selectedMethod && (
              <div className="mt-2">
                <Badge variant="outline" className="text-xs">
                  {selectedMethod.description}
                </Badge>
              </div>
            )}
          </div>

          <div>
            <div className="flex justify-between items-center mb-3">
              <label className="text-sm font-medium">Fusion Weight</label>
              <span className="text-sm text-muted-foreground">{fusionWeight.toFixed(2)}</span>
            </div>
            <Slider
              value={[fusionWeight]}
              onValueChange={(value) => onFusionWeightChange(value[0])}
              max={1}
              min={0}
              step={0.01}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-muted-foreground mt-1">
              <span>IR Dominant</span>
              <span>Balanced</span>
              <span>Visible Dominant</span>
            </div>
          </div>

          <div className="pt-4 border-t border-border">
            <Button
              onClick={onRunFusion}
              disabled={isProcessing}
              variant="fusion"
              size="lg"
              className="w-full"
            >
              {isProcessing ? (
                <>
                  <Settings className="w-5 h-5 mr-2 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <Play className="w-5 h-5 mr-2" />
                  Run Fusion
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};