import React from 'react';
import { Card } from '@/components/ui/card';
import { Thermometer, Activity, PieChart as PieIcon } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

interface IRAnalysisProps {
    data: {
        min: number;
        max: number;
        avg: number;
        heatmapData: { x: number; y: number; val: number }[];
    };
}

const IRAnalysis: React.FC<IRAnalysisProps> = ({ data }) => {
    // Calculate thermal distribution from point data
    const hotPoints = data.heatmapData.filter(p => p.val >= 70).length;
    const midPoints = data.heatmapData.filter(p => p.val >= 30 && p.val < 70).length;
    const coldPoints = data.heatmapData.filter(p => p.val < 30).length;
    const total = data.heatmapData.length;

    const distributionData = [
        { name: 'Critical (Hot)', value: hotPoints, color: '#EF4444' },
        { name: 'Nominal (Mid)', value: midPoints, color: '#EAB308' },
        { name: 'Ambient (Cold)', value: coldPoints, color: '#3B82F6' },
    ];

    const CustomTooltip = ({ active, payload }: any) => {
        if (active && payload && payload.length) {
            const data = payload[0].payload;
            const percentage = ((data.value / total) * 100).toFixed(1);
            return (
                <div className="bg-popover/95 backdrop-blur-md border border-border p-4 rounded-xl shadow-2xl animate-in zoom-in-95 duration-200">
                    <div className="flex items-center gap-2 mb-2">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: data.color }} />
                        <span className="font-semibold text-popover-foreground">{data.name}</span>
                    </div>
                    <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-sm">
                        <span className="text-muted-foreground">Coverage</span>
                        <span className="font-mono font-medium text-right text-popover-foreground">{percentage}%</span>
                        <span className="text-muted-foreground">Data Points</span>
                        <span className="font-mono font-medium text-right text-popover-foreground">{data.value}</span>
                    </div>
                </div>
            );
        }
        return null;
    };

    return (
        <Card className="p-6 space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between border-b border-border/50 pb-4">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-red-500/10 rounded-lg">
                        <Thermometer className="w-5 h-5 text-red-500" />
                    </div>
                    <div>
                        <h3 className="font-semibold text-lg">Thermal Spectrum</h3>
                        <p className="text-xs text-muted-foreground">Surface temperature analysis</p>
                    </div>
                </div>
                <Activity className="w-5 h-5 text-muted-foreground/50" />
            </div>

            <div className="grid grid-cols-3 gap-3">
                <div className="flex flex-col items-center justify-center p-3 rounded-xl bg-gradient-to-b from-blue-500/10 to-transparent border border-blue-500/20">
                    <p className="text-[11px] uppercase tracking-wider font-semibold text-blue-500/70 mb-1">Min Temp</p>
                    <p className="text-2xl font-bold text-foreground font-mono">{data.min.toFixed(1)}°</p>
                </div>
                <div className="flex flex-col items-center justify-center p-3 rounded-xl bg-gradient-to-b from-amber-500/10 to-transparent border border-amber-500/20 shadow-sm relative overflow-hidden">
                    <div className="absolute inset-x-0 top-0 h-1 bg-amber-500/50" />
                    <p className="text-[11px] uppercase tracking-wider font-semibold text-amber-500/70 mb-1">Average</p>
                    <p className="text-2xl font-bold text-foreground font-mono">{data.avg.toFixed(1)}°</p>
                </div>
                <div className="flex flex-col items-center justify-center p-3 rounded-xl bg-gradient-to-b from-red-500/10 to-transparent border border-red-500/20">
                    <p className="text-[11px] uppercase tracking-wider font-semibold text-red-500/70 mb-1">Max Temp</p>
                    <p className="text-2xl font-bold text-foreground font-mono">{data.max.toFixed(1)}°</p>
                </div>
            </div>

            <div className="space-y-4 pt-2">
                <div className="flex items-center gap-2">
                    <PieIcon className="w-4 h-4 text-muted-foreground" />
                    <p className="text-sm font-medium">Thermal Intensity Profile</p>
                </div>

                <div className="h-[260px] w-full bg-secondary/20 rounded-xl py-6 flex flex-col items-center justify-center border border-border/50 relative">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={distributionData}
                                cx="50%"
                                cy="45%"
                                innerRadius={70}
                                outerRadius={95}
                                paddingAngle={6}
                                dataKey="value"
                                stroke="none"
                                cornerRadius={6}
                            >
                                {distributionData.map((entry, index) => (
                                    <Cell 
                                        key={`cell-${index}`} 
                                        fill={entry.color} 
                                        style={{ filter: `drop-shadow(0px 4px 6px ${entry.color}30)` }}
                                    />
                                ))}
                            </Pie>
                            <Tooltip content={<CustomTooltip />} cursor={{ fill: 'transparent' }} />
                            <Legend
                                verticalAlign="bottom"
                                align="center"
                                iconType="circle"
                                wrapperStyle={{ fontSize: '12px', fontWeight: '500' }}
                            />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </Card>
    );
};

export default IRAnalysis;
