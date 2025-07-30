import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Zap } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-border bg-card/30 py-8">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gradient-hero flex items-center justify-center">
              <Zap className="w-4 h-4 text-white" />
            </div>
            <span className="font-medium">FusionLab</span>
            <Badge variant="outline" className="text-xs">v1.0.0</Badge>
          </div>
          <p className="text-sm text-muted-foreground">
            Advanced image fusion visualization • Built with React & TypeScript
          </p>
        </div>
      </div>
    </footer>
  );
};