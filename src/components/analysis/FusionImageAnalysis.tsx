import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Maximize2, ZoomIn, ZoomOut, Sparkles, PieChart as PieIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

interface FusionImageAnalysisProps {
    image?: string;
}

const FusionImageAnalysis: React.FC<FusionImageAnalysisProps> = ({
    image
}) => {
    const [zoom, setZoom] = useState(1);

    const handleZoomIn = () => setZoom(prev => Math.min(prev + 0.5, 3));
    const handleZoomOut = () => setZoom(prev => Math.max(prev - 0.5, 1));

    const distributionData = [
        { name: 'Infrared Data', value: 45, color: '#EF4444' },
        { name: 'Visible Detail', value: 55, color: '#3B82F6' },
    ];

    const CustomTooltip = ({ active, payload }: any) => {
        if (active && payload && payload.length) {
            const data = payload[0].payload;
            return (
                <div className="bg-popover/95 backdrop-blur-md border border-border p-3 rounded-xl shadow-2xl animate-in zoom-in-95 duration-200">
                    <div className="flex items-center gap-2 mb-1">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: data.color }} />
                        <span className="font-semibold text-popover-foreground">{data.name}</span>
                    </div>
                    <div className="flex justify-between items-center gap-4 pl-5">
                        <span className="text-sm text-muted-foreground">Contribution</span>
                        <span className="font-mono font-bold text-popover-foreground text-sm">{data.value}%</span>
                    </div>
                </div>
            );
        }
        return null;
    };

    return (
        <Card className="p-6 space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-1000 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between border-b border-border/50 pb-4">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-purple-500/10 rounded-lg">
                        <Sparkles className="w-5 h-5 text-purple-500" />
                    </div>
                    <div>
                        <h3 className="font-semibold text-lg">Fusion Composition</h3>
                        <p className="text-xs text-muted-foreground">Spectral contribution breakdown</p>
                    </div>
                </div>
                <Maximize2 className="w-5 h-5 text-muted-foreground/50" />
            </div>

            <div className="relative group rounded-xl overflow-hidden border-2 border-border/50 bg-black aspect-video flex items-center justify-center cursor-crosshair shadow-inner">
                {image ? (
                    <div className="w-full h-full relative transition-transform duration-300" style={{ transform: `scale(${zoom})` }}>
                        <img src={image} className="w-full h-full object-cover" alt="Fused Result" />
                    </div>
                ) : (
                    <div className="flex flex-col items-center gap-2 text-muted-foreground">
                        <Sparkles className="w-8 h-8 opacity-20" />
                        <span className="text-sm italic">No image data</span>
                    </div>
                )}

                <div className="absolute bottom-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button size="icon" variant="secondary" className="backdrop-blur-sm bg-background/50 hover:bg-background/80" onClick={handleZoomOut} disabled={zoom === 1}>
                        <ZoomOut className="w-4 h-4" />
                    </Button>
                    <Button size="icon" variant="secondary" className="backdrop-blur-sm bg-background/50 hover:bg-background/80" onClick={handleZoomIn} disabled={zoom === 3}>
                        <ZoomIn className="w-4 h-4" />
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4 items-center">
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-muted-foreground">Infrared Weight</span>
                        <span className="text-sm font-mono font-bold text-red-500">45%</span>
                    </div>
                    <div className="h-2 bg-secondary rounded-full overflow-hidden">
                        <div className="h-full bg-red-500 rounded-full" style={{ width: '45%' }} />
                    </div>
                    <div className="flex items-center justify-between pt-2">
                        <span className="text-sm font-medium text-muted-foreground">Visible Weight</span>
                        <span className="text-sm font-mono font-bold text-blue-500">55%</span>
                    </div>
                    <div className="h-2 bg-secondary rounded-full overflow-hidden">
                        <div className="h-full bg-blue-500 rounded-full" style={{ width: '55%' }} />
                    </div>
                </div>

                <div className="h-[180px] w-full bg-secondary/10 rounded-xl py-2 border border-border/30 relative">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={distributionData}
                                cx="50%"
                                cy="50%"
                                innerRadius={45}
                                outerRadius={65}
                                paddingAngle={6}
                                dataKey="value"
                                stroke="none"
                                cornerRadius={6}
                            >
                                {distributionData.map((entry, index) => (
                                    <Cell 
                                        key={`cell-${index}`} 
                                        fill={entry.color} 
                                        style={{ filter: `drop-shadow(0px 3px 5px ${entry.color}40)` }}
                                    />
                                ))}
                            </Pie>
                            <Tooltip content={<CustomTooltip />} cursor={{ fill: 'transparent' }} />
                            <Legend 
                                verticalAlign="bottom" 
                                height={24}
                                iconType="circle"
                                wrapperStyle={{ fontSize: '11px', fontWeight: '500' }} 
                            />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </div>

            <div className="flex justify-between items-center text-[11px] text-muted-foreground border-t border-border/50 pt-3">
                <span className="font-mono bg-secondary/30 px-2 py-1 rounded">Zoom: {zoom.toFixed(1)}x</span>
                <span className="flex items-center gap-1"><Sparkles className="w-3 h-3"/> Hybrid Composition</span>
            </div>
        </Card >
    );
};

export default FusionImageAnalysis;
