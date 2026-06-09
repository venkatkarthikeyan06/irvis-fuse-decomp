import React from 'react';
import { Card } from '@/components/ui/card';
import { ShieldCheck, AlertCircle, TrendingUp, Cpu, Info } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { cn } from '@/lib/utils';

interface FusionDataProps {
    data: {
        confidence: number;
        anomalies: string[];
        spectralData: { name: number; ir: number; visible: number; fused: number }[];
    };
}

const FusionData: React.FC<FusionDataProps> = ({ data }) => {
    const getDynamicAnalysis = (score: number) => {
        if (score > 0.92) return "System stability is optimal. Fusion core reporting near-zero entropy loss with high-fidelity spectral alignment.";
        if (score > 0.88) return "Strong fusion alignment detected. Neural weights prioritized thermal features for target identification.";
        return "Fusion confidence is within nominal parameters. Minority signal artifacts detected but suppressed by decomposition filter.";
    };

    return (
        <Card className="p-6 space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-1000">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-green-500">
                    <ShieldCheck className="w-5 h-5" />
                    <h3 className="font-semibold">Fusion Data Intelligence</h3>
                </div>
                <Cpu className="w-5 h-5 text-muted-foreground" />
            </div>

            <div className="space-y-6">
                <div className="flex items-center justify-between p-4 rounded-xl bg-green-500/10 border border-green-500/20">
                    <div>
                        <p className="text-xs text-muted-foreground uppercase">Confidence Score</p>
                        <p className="text-2xl font-bold text-green-500">{(data.confidence * 100).toFixed(1)}%</p>
                    </div>
                    <TrendingUp className="w-8 h-8 opacity-20" />
                </div>

                <div className="p-4 rounded-xl bg-secondary/20 space-y-2 border border-border/50">
                    <div className="flex items-center gap-2 text-xs font-semibold text-muted-foreground uppercase">
                        <Info className="w-3 h-3" />
                        Dynamic Agent Analysis
                    </div>
                    <p className="text-sm text-foreground leading-relaxed italic">
                        "{getDynamicAnalysis(data.confidence)}"
                    </p>
                </div>

                <div className="space-y-2">
                    <p className="text-sm font-medium">Spectral Signal Visualization</p>
                    <div className="h-40 w-full bg-slate-900/50 rounded-lg p-2 border border-border">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={data.spectralData}>
                                <defs>
                                    <linearGradient id="colorIr" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
                                    </linearGradient>
                                    <linearGradient id="colorFused" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                                <XAxis dataKey="name" hide />
                                <YAxis hide domain={[0, 100]} />
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#0f172a', border: 'none', borderRadius: '8px' }}
                                    itemStyle={{ fontSize: '10px' }}
                                />
                                <Area type="monotone" dataKey="ir" stroke="#ef4444" fillOpacity={1} fill="url(#colorIr)" />
                                <Area type="monotone" dataKey="fused" stroke="#10b981" fillOpacity={1} fill="url(#colorFused)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                    <div className="flex justify-center gap-4 text-[10px] text-muted-foreground">
                        <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-red-500" /> Infrared</span>
                        <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-green-500" /> Fused Signal</span>
                    </div>
                </div>


                <div className="space-y-2">
                    <p className="text-sm font-medium">Diagnostic Log</p>
                    {data.anomalies.length > 0 ? (
                        <div className="space-y-2">
                            {data.anomalies.map((anno, i) => (
                                <div key={i} className="flex items-center gap-2 p-2 rounded-lg bg-orange-500/10 border border-orange-500/20 text-orange-500">
                                    <AlertCircle className="w-4 h-4" />
                                    <span className="text-xs font-medium">{anno}</span>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-xs text-muted-foreground italic p-2 border border-dashed rounded-lg bg-card/30">
                            Neural network reported no spectral anomalies.
                        </div>
                    )}
                </div>
            </div>
        </Card>
    );
};

export default FusionData;
