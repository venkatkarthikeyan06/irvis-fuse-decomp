import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Database, Download, PlayCircle } from 'lucide-react';
import { toast } from 'sonner';

const MOCK_RESULTS = [
  { method: 'Average', ssim: 0.81, psnr: 27.4, entropy: 6.1, gradient: 5.2 },
  { method: 'Weighted', ssim: 0.82, psnr: 28.5, entropy: 6.3, gradient: 5.5 },
  { method: 'Laplacian', ssim: 0.83, psnr: 28.7, entropy: 6.4, gradient: 5.8 },
  { method: 'Wavelet', ssim: 0.84, psnr: 29.1, entropy: 6.5, gradient: 6.0 },
  { method: 'Deep Learning', ssim: 0.89, psnr: 32.3, entropy: 7.0, gradient: 7.1 }
];

export const DatasetBenchmark: React.FC = () => {
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [hasRun, setHasRun] = useState(false);

  const runBenchmark = () => {
    setIsEvaluating(true);
    toast.loading('Running batch TNO dataset evaluation...', { id: 'bench' });
    setTimeout(() => {
      setIsEvaluating(false);
      setHasRun(true);
      toast.success('Benchmark evaluation complete', { id: 'bench' });
    }, 2500);
  };

  return (
    <Card className="p-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 border-b border-border pb-4">
        <div className="flex items-center gap-3">
          <Database className="w-5 h-5 text-primary" />
          <div>
            <h3 className="text-lg font-semibold">TNO Dataset Benchmarking</h3>
            <p className="text-sm text-muted-foreground">Automated bulk evaluation</p>
          </div>
        </div>
        <div className="flex gap-2">
          {!hasRun ? (
            <Button onClick={runBenchmark} disabled={isEvaluating} variant="fusion" size="sm">
               <PlayCircle className="w-4 h-4 mr-2" />
               {isEvaluating ? 'Evaluating...' : 'Batch Evaluation'}
            </Button>
          ) : (
            <Button variant="outline" size="sm" onClick={() => toast.success('Exported to CSV')}>
               <Download className="w-4 h-4 mr-2" /> Export CSV
            </Button>
          )}
        </div>
      </div>
      
      {hasRun ? (
        <div className="overflow-x-auto rounded-lg border border-border">
          <table className="w-full text-sm text-left">
            <thead className="bg-secondary/50 text-xs uppercase font-semibold text-muted-foreground">
              <tr>
                <th className="px-6 py-3">Method</th>
                <th className="px-6 py-3">SSIM</th>
                <th className="px-6 py-3">PSNR</th>
                <th className="px-6 py-3">Entropy</th>
                <th className="px-6 py-3">Gradient</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {MOCK_RESULTS.map((row, idx) => (
                <tr key={idx} className={row.method === 'Deep Learning' ? 'bg-primary/5' : ''}>
                  <td className="px-6 py-3 font-medium flex items-center gap-2">
                    {row.method === 'Deep Learning' && <div className="w-2 h-2 rounded-full bg-primary" />}
                    {row.method}
                  </td>
                  <td className="px-6 py-3 font-mono">{row.ssim.toFixed(2)}</td>
                  <td className="px-6 py-3 font-mono">{row.psnr.toFixed(1)}</td>
                  <td className="px-6 py-3 font-mono">{row.entropy.toFixed(1)}</td>
                  <td className="px-6 py-3 font-mono">{row.gradient.toFixed(1)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="py-12 flex flex-col items-center justify-center text-center text-muted-foreground bg-secondary/10 rounded-lg dashed border border-border">
           <Database className="w-8 h-8 mb-2 opacity-20" />
           <p>Run the benchmark to analyze metrics across 42 standard image pairs</p>
        </div>
      )}
    </Card>
  );
};
