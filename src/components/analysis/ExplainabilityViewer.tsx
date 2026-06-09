import React from 'react';
import { Card } from '@/components/ui/card';
import { ExplainabilityData } from '@/hooks/useFusion';
import { Eye, MapPin } from 'lucide-react';

export const ExplainabilityViewer: React.FC<{ data: ExplainabilityData }> = ({ data }) => {
  return (
    <Card className="p-6">
      <div className="flex items-center gap-3 mb-6 border-b border-border pb-4">
        <Eye className="w-5 h-5 text-primary" />
        <div>
          <h3 className="text-lg font-semibold">Explainable AI (XAI) Visualization</h3>
          <p className="text-sm text-muted-foreground">Neural attention and modality contribution mapping</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="space-y-3">
          <div className="relative aspect-square rounded-lg overflow-hidden border border-border group bg-secondary/10">
            <img src={data.irContributionMap} className="w-full h-full object-cover mix-blend-screen opacity-60" alt="IR Contribution" />
            <div className="absolute inset-0 bg-red-500/10" />
            <MapPin className="absolute top-2 right-2 w-4 h-4 text-red-500" />
          </div>
          <p className="text-center font-semibold text-sm">IR Feature Extraction</p>
        </div>
        
        <div className="space-y-3">
          <div className="relative aspect-square rounded-lg overflow-hidden border border-border group bg-secondary/10">
            <img src={data.visContributionMap} className="w-full h-full object-cover mix-blend-screen opacity-60" alt="Visible Contribution" />
            <div className="absolute inset-0 bg-blue-500/10" />
            <MapPin className="absolute top-2 right-2 w-4 h-4 text-blue-500" />
          </div>
          <p className="text-center font-semibold text-sm">Visible Feature Extration</p>
        </div>
        
        <div className="space-y-3">
          <div className="relative aspect-square rounded-lg overflow-hidden border border-border group bg-secondary/10">
            <img src={data.attentionHeatmap} className="w-full h-full object-cover grayscale" alt="Attention Map" />
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-cyan-500/30 to-purple-500/30 mix-blend-overlay" />
            <MapPin className="absolute top-2 right-2 w-4 h-4 text-primary" />
          </div>
          <p className="text-center font-semibold text-sm">Fusion Layer Attention Mask</p>
        </div>
      </div>
    </Card>
  );
};
