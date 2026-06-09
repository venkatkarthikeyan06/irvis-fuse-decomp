import React from 'react';
import { Card } from '@/components/ui/card';
import { Eye, BarChart2, Package } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Badge } from '@/components/ui/badge';

interface VisibleAnalysisProps {
    data: {
        brightness: number;
        contrast: number;
        objects: string[];
        histogram: { bin: string; count: number }[];
    };
}

const VisibleAnalysis: React.FC<VisibleAnalysisProps> = ({ data }) => {
    return (
        <Card className="p-6 space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-blue-500">
                    <Eye className="w-5 h-5" />
                    <h3 className="font-semibold">Visible Spectrum Analysis</h3>
                </div>
                <BarChart2 className="w-5 h-5 text-muted-foreground" />
            </div>

            <div className="space-y-4">
                <div className="flex flex-wrap gap-2">
                    {data.objects.map((obj, i) => (
                        <Badge key={i} variant="secondary" className="flex items-center gap-1">
                            <Package className="w-3 h-3" />
                            {obj}
                        </Badge>
                    ))}
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                        <p className="text-xs text-muted-foreground">Brightness</p>
                        <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
                            <div
                                className="h-full bg-blue-500 transition-all duration-1000"
                                style={{ width: `${data.brightness * 100}%` }}
                            />
                        </div>
                    </div>
                    <div className="space-y-1">
                        <p className="text-xs text-muted-foreground">Contrast</p>
                        <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
                            <div
                                className="h-full bg-blue-400 transition-all duration-1000"
                                style={{ width: `${data.contrast * 100}%` }}
                            />
                        </div>
                    </div>
                </div>

                <div className="h-32 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={data.histogram}>
                            <XAxis dataKey="bin" hide />
                            <YAxis hide />
                            <Tooltip
                                contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px', fontSize: '10px' }}
                                itemStyle={{ color: '#3b82f6' }}
                            />
                            <Bar dataKey="count" fill="#3b82f6" radius={[2, 2, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
                <p className="text-center text-[10px] text-muted-foreground">Luminance Distribution</p>
            </div>
        </Card>
    );
};

export default VisibleAnalysis;
