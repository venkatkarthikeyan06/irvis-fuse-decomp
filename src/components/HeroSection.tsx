import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Zap, Eye, Thermometer } from 'lucide-react';

export const HeroSection: React.FC = () => {
  return (
    <section className="relative py-20 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-primary/5" />
      
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-infrared opacity-10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-gradient-visible opacity-10 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-fusion opacity-5 rounded-full blur-3xl animate-pulse delay-500" />
      </div>

      <div className="relative container mx-auto px-6 text-center">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="space-y-4">
            <Badge variant="outline" className="mb-4">
              Advanced Image Fusion Technology
            </Badge>
            <h1 className="text-5xl md:text-7xl font-bold leading-tight">
              <span className="bg-gradient-hero bg-clip-text text-transparent">
                Infrared
              </span>
              {' & '}
              <span className="bg-gradient-visible bg-clip-text text-transparent">
                Visible
              </span>
              <br />
              <span className="bg-gradient-fusion bg-clip-text text-transparent">
                Image Fusion
              </span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Advanced neural network-based fusion of infrared thermal and visible spectrum imagery. 
              Experience state-of-the-art computer vision in real-time.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-card/50 border border-border">
              <Thermometer className="w-5 h-5 text-infrared" />
              <span className="text-sm">Thermal Analysis</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-card/50 border border-border">
              <Eye className="w-5 h-5 text-visible" />
              <span className="text-sm">Visual Enhancement</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-card/50 border border-border">
              <Zap className="w-5 h-5 text-fusion" />
              <span className="text-sm">Real-time Fusion</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="hero" size="xl" className="group">
              Get Started
              <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button variant="glass" size="xl">
              View Demo
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 text-left">
            <div className="p-6 rounded-xl bg-card/30 border border-border backdrop-blur-sm">
              <div className="w-12 h-12 rounded-lg bg-gradient-infrared flex items-center justify-center mb-4">
                <Thermometer className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Infrared Processing</h3>
              <p className="text-muted-foreground text-sm">
                Advanced thermal image processing with edge detection and feature extraction algorithms.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-card/30 border border-border backdrop-blur-sm">
              <div className="w-12 h-12 rounded-lg bg-gradient-visible flex items-center justify-center mb-4">
                <Eye className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Visible Spectrum</h3>
              <p className="text-muted-foreground text-sm">
                High-quality visible light image processing with color correction and enhancement.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-card/30 border border-border backdrop-blur-sm">
              <div className="w-12 h-12 rounded-lg bg-gradient-fusion flex items-center justify-center mb-4">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Neural Fusion</h3>
              <p className="text-muted-foreground text-sm">
                Deep learning-based fusion algorithms for optimal information preservation.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};