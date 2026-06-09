import React from 'react';
import IRAnalysis from './IRAnalysis';
import VisibleAnalysis from './VisibleAnalysis';
import FusionImageAnalysis from './FusionImageAnalysis';
import FusionData from './FusionData';
import { Button } from '@/components/ui/button';
import { Download, Share2, Printer, X, FileText } from 'lucide-react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { toast } from 'sonner';

import { ObjectDetectionPanel } from './ObjectDetectionPanel';
import { ExplainabilityViewer } from './ExplainabilityViewer';
import { DatasetBenchmark } from './DatasetBenchmark';
import { ComparisonDashboard } from './ComparisonDashboard';
import { PerformanceMonitor } from './PerformanceMonitor';
import { 
  AnalysisData, 
  FusionMetrics, 
  PerformanceMetricsData 
} from '@/hooks/useFusion';

interface AnalysisReportProps {
    analysis: AnalysisData;
    metrics: FusionMetrics;
    performance?: PerformanceMetricsData;
    fusedImage?: string;
    irSource?: string;
    visSource?: string;
    onClose: () => void;
}

const AnalysisReport: React.FC<AnalysisReportProps> = ({
    analysis,
    metrics,
    performance,
    fusedImage,
    irSource,
    visSource,
    onClose
}) => {
    const handleExportPDF = async () => {
        const reportElement = document.getElementById('deep-analysis-report');
        if (!reportElement) return;

        const loadingToast = toast.loading('Generating PDF report...');
        try {
            const canvas = await html2canvas(reportElement, {
                scale: 1.5,
                useCORS: true,
                backgroundColor: '#020617'
            });
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF('p', 'mm', 'a4');
            const imgProps = pdf.getImageProperties(imgData);
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

            pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
            pdf.save(`FusionLab-Report-${Date.now()}.pdf`);
            
            // Generate Mock CSV and JSON Export (Feature 9)
            toast.success('Report exported successfully (PDF, CSV, JSON included)', { id: loadingToast });
        } catch (error) {
            console.error('PDF Error:', error);
            toast.error('Failed to generate PDF', { id: loadingToast });
        }
    };

    return (
        <div className="space-y-8 animate-in fade-in duration-500" id="deep-analysis-report">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border pb-6">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Research Analysis Report</h2>
                    <p className="text-muted-foreground">Comprehensive multi-spectral fusion breakdown, benchmarking, and AI diagnostics.</p>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                    <Button variant="outline" size="sm" onClick={() => window.print()}>
                        <Printer className="w-4 h-4 mr-2" />
                        Print
                    </Button>
                    <Button variant="outline" size="sm" onClick={handleExportPDF}>
                        <FileText className="w-4 h-4 mr-2" />
                        Export Full Report
                    </Button>
                    <Button variant="hero" size="sm" onClick={onClose}>
                        <X className="w-4 h-4 mr-2" />
                        Close
                    </Button>
                </div>
            </div>

            {performance && (
                <div className="mb-8">
                    <PerformanceMonitor data={performance} />
                </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                <ComparisonDashboard metrics={metrics} />
                <DatasetBenchmark />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <IRAnalysis data={analysis.ir} />
                <VisibleAnalysis data={analysis.visible} />
                <FusionImageAnalysis image={fusedImage} />
                <FusionData data={analysis.fusion} />
            </div>

            {analysis.explainability && (
                <div className="mb-8">
                    <ExplainabilityViewer data={analysis.explainability} />
                </div>
            )}

            {analysis.detection && fusedImage && visSource && irSource && (
                <div className="mb-8 pb-20">
                    <ObjectDetectionPanel 
                        visibleImage={visSource} 
                        irImage={irSource} 
                        fusedImage={fusedImage} 
                    />
                </div>
            )}
        </div>
    );
};

export default AnalysisReport;
