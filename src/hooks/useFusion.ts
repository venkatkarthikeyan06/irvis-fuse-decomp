import { useState, useCallback } from 'react';

interface FusionMetrics {
  ssim: number;
  psnr: number;
  entropy: number;
  gradient_strength: number;
}

interface FusionState {
  fusedImage?: string;
  metrics?: FusionMetrics;
  processingTime?: number;
  isProcessing: boolean;
}

export const useFusion = () => {
  const [state, setState] = useState<FusionState>({
    isProcessing: false
  });

  const simulateFusion = useCallback(async (
    irImage: string,
    visibleImage: string,
    method: string,
    weight: number
  ): Promise<void> => {
    setState(prev => ({ ...prev, isProcessing: true }));

    // Simulate processing time
    const startTime = Date.now();
    await new Promise(resolve => setTimeout(resolve, 2000 + Math.random() * 3000));
    const processingTime = Date.now() - startTime;

    // Create a simulated fusion result by blending the images
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    if (!ctx) {
      setState(prev => ({ ...prev, isProcessing: false }));
      return;
    }

    // Set canvas size
    canvas.width = 512;
    canvas.height = 512;

    // Create images
    const irImg = new Image();
    const visImg = new Image();

    await Promise.all([
      new Promise((resolve) => {
        irImg.onload = resolve;
        irImg.src = irImage;
      }),
      new Promise((resolve) => {
        visImg.onload = resolve;
        visImg.src = visibleImage;
      })
    ]);

    // Draw blended result
    ctx.globalAlpha = 1 - weight;
    ctx.drawImage(irImg, 0, 0, canvas.width, canvas.height);
    
    ctx.globalCompositeOperation = 'multiply';
    ctx.globalAlpha = weight;
    ctx.drawImage(visImg, 0, 0, canvas.width, canvas.height);

    // Add method-specific effects
    switch (method) {
      case 'weighted':
        ctx.globalCompositeOperation = 'overlay';
        break;
      case 'max_gradient':
        ctx.globalCompositeOperation = 'hard-light';
        break;
      case 'laplacian':
        ctx.globalCompositeOperation = 'soft-light';
        break;
      case 'wavelet':
        ctx.globalCompositeOperation = 'color-dodge';
        break;
      case 'guided_filter':
        ctx.globalCompositeOperation = 'luminosity';
        break;
    }

    const fusedImage = canvas.toDataURL('image/jpeg', 0.9);

    // Generate realistic metrics based on method and weight
    const baseSSIM = 0.75 + Math.random() * 0.2;
    const basePSNR = 25 + Math.random() * 15;
    const baseEntropy = 6 + Math.random() * 2;
    const baseGradient = 50 + Math.random() * 40;

    // Method-specific adjustments
    const methodMultipliers = {
      average: { ssim: 0.9, psnr: 0.8, entropy: 0.9, gradient: 0.8 },
      weighted: { ssim: 1.1, psnr: 1.0, entropy: 1.1, gradient: 1.2 },
      max_gradient: { ssim: 1.0, psnr: 0.9, entropy: 1.0, gradient: 1.5 },
      laplacian: { ssim: 1.2, psnr: 1.1, entropy: 1.2, gradient: 1.3 },
      wavelet: { ssim: 1.3, psnr: 1.2, entropy: 1.3, gradient: 1.1 },
      guided_filter: { ssim: 1.4, psnr: 1.3, entropy: 1.1, gradient: 1.4 }
    };

    const multiplier = methodMultipliers[method as keyof typeof methodMultipliers] || methodMultipliers.average;

    const metrics: FusionMetrics = {
      ssim: Math.min(baseSSIM * multiplier.ssim, 1.0),
      psnr: basePSNR * multiplier.psnr,
      entropy: baseEntropy * multiplier.entropy,
      gradient_strength: baseGradient * multiplier.gradient
    };

    setState({
      fusedImage,
      metrics,
      processingTime,
      isProcessing: false
    });
  }, []);

  const reset = useCallback(() => {
    setState({
      isProcessing: false
    });
  }, []);

  return {
    ...state,
    simulateFusion,
    reset
  };
};