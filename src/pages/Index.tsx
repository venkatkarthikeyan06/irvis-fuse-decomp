import React, { useState } from 'react';
import { Header } from '@/components/Header';
import { HeroSection } from '@/components/HeroSection';
import { Footer } from '@/components/Footer';
import { ImageUpload } from '@/components/ImageUpload';
import { FusionControls } from '@/components/FusionControls';
import { FusionResult } from '@/components/FusionResult';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useFusion } from '@/hooks/useFusion';
import { createImageFromFile, generateSampleImage } from '@/utils/imageUtils';
import { useToast } from '@/hooks/use-toast';
import { Workflow, Zap, Image as ImageIcon, Loader2 } from 'lucide-react';
import AnalysisReport from '@/components/analysis/AnalysisReport';

const Index = () => {
  const [irImage, setIrImage] = useState<string>('');
  const [visibleImage, setVisibleImage] = useState<string>('');
  const [fusionMethod, setFusionMethod] = useState('weighted');
  const [fusionWeight, setFusionWeight] = useState(0.5);
  const [colormap, setColormap] = useState('thermal');
  const [edgeInjection, setEdgeInjection] = useState(0.5);
  const [showWorkspace, setShowWorkspace] = useState(false);
  const [showReport, setShowReport] = useState(false);

  const {
    fusedImage,
    metrics,
    analysis,
    processingTime,
    performance,
    isProcessing,
    history,
    irSource,
    visSource,
    simulateFusion,
    restoreFromHistory,
    reset
  } = useFusion();
  const { toast } = useToast();

  const handleIrImageUpload = async (file: File) => {
    if (file.name === '') {
      setIrImage('');
      return;
    }
    try {
      const imageData = await createImageFromFile(file);
      setIrImage(imageData);
      toast({
        title: "Infrared image uploaded",
        description: "Ready for fusion processing",
      });
    } catch (error) {
      toast({
        title: "Upload failed",
        description: "Could not process the infrared image",
        variant: "destructive",
      });
    }
  };

  const handleVisibleImageUpload = async (file: File) => {
    if (file.name === '') {
      setVisibleImage('');
      return;
    }
    try {
      const imageData = await createImageFromFile(file);
      setVisibleImage(imageData);
      toast({
        title: "Visible image uploaded",
        description: "Ready for fusion processing",
      });
    } catch (error) {
      toast({
        title: "Upload failed",
        description: "Could not process the visible image",
        variant: "destructive",
      });
    }
  };

  const handleRunFusion = async () => {
    if (!irImage || !visibleImage) {
      toast({
        title: "Missing images",
        description: "Please upload both infrared and visible images",
        variant: "destructive",
      });
      return;
    }

    await simulateFusion(irImage, visibleImage, fusionMethod, fusionWeight, colormap as any, edgeInjection);

    toast({
      title: "Fusion complete",
      description: `Successfully fused images using ${fusionMethod} method`,
    });
  };

  const loadSampleImages = () => {
    const sampleIr = generateSampleImage('infrared');
    const sampleVisible = generateSampleImage('visible');
    setIrImage(sampleIr);
    setVisibleImage(sampleVisible);
    setShowWorkspace(true);

    toast({
      title: "Sample images loaded",
      description: "Ready to explore fusion algorithms",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {!showWorkspace ? (
        <>
          <HeroSection onGetStarted={() => setShowWorkspace(true)} />

          <section className="py-20 border-t border-border">
            <div className="container mx-auto px-6 text-center">
              <div className="max-w-2xl mx-auto space-y-8">
                <div>
                  <h2 className="text-3xl font-bold mb-4">
                    Ready to start fusing?
                  </h2>
                  <p className="text-muted-foreground">
                    Upload your own infrared and visible images, or try our sample dataset
                    to experience advanced fusion algorithms in action.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    variant="hero"
                    size="xl"
                    onClick={() => setShowWorkspace(true)}
                  >
                    <ImageIcon className="w-5 h-5 mr-2" />
                    Upload Images
                  </Button>
                  <Button
                    variant="fusion"
                    size="xl"
                    onClick={loadSampleImages}
                  >
                    <Zap className="w-5 h-5 mr-2" />
                    Try Sample Data
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
                  <Card className="p-6 text-left">
                    <Badge variant="outline" className="mb-3">Step 1</Badge>
                    <h3 className="font-semibold mb-2">Upload Images</h3>
                    <p className="text-sm text-muted-foreground">
                      Provide infrared thermal and visible spectrum image pairs
                    </p>
                  </Card>

                  <Card className="p-6 text-left">
                    <Badge variant="outline" className="mb-3">Step 2</Badge>
                    <h3 className="font-semibold mb-2">Configure Fusion</h3>
                    <p className="text-sm text-muted-foreground">
                      Select fusion method and adjust parameters
                    </p>
                  </Card>

                  <Card className="p-6 text-left">
                    <Badge variant="outline" className="mb-3">Step 3</Badge>
                    <h3 className="font-semibold mb-2">Analyze Results</h3>
                    <p className="text-sm text-muted-foreground">
                      View fused output with quality metrics
                    </p>
                  </Card>
                </div>
              </div>
            </div>
          </section>
        </>
      ) : (
        <section className="py-8">
          <div className="container mx-auto px-6">
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <Workflow className="w-6 h-6 text-primary" />
                <h2 className="text-2xl font-bold">Fusion Workspace</h2>
              </div>
              <p className="text-muted-foreground">
                Upload images, configure fusion parameters, and analyze results
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
              <div className="space-y-8">
                <ImageUpload
                  title="Infrared Image"
                  variant="infrared"
                  onImageUpload={handleIrImageUpload}
                  uploadedImage={irImage}
                />

                <ImageUpload
                  title="Visible Image"
                  variant="visible"
                  onImageUpload={handleVisibleImageUpload}
                  uploadedImage={visibleImage}
                />
              </div>

              <FusionControls
                fusionMethod={fusionMethod}
                onFusionMethodChange={setFusionMethod}
                fusionWeight={fusionWeight}
                onFusionWeightChange={setFusionWeight}
                colormap={colormap}
                onColormapChange={setColormap}
                edgeInjection={edgeInjection}
                onEdgeInjectionChange={setEdgeInjection}
                onRunFusion={handleRunFusion}
                isProcessing={isProcessing}
              />

              <FusionResult
                fusedImage={fusedImage}
                metrics={metrics}
                processingTime={processingTime}
                onAnalyze={() => setShowReport(true)}
              />
            </div>

            {isProcessing && (
              <div className="fixed inset-0 z-[100] bg-background/80 backdrop-blur-sm flex items-center justify-center animate-in fade-in duration-300">
                <div className="text-center space-y-4">
                  <Loader2 className="w-12 h-12 text-primary animate-spin mx-auto" />
                  <p className="text-lg font-medium animate-pulse">Processing Neural Fusion...</p>
                </div>
              </div>
            )}

            {showReport && analysis && (
              <div className="mt-12 pt-12 border-t border-border" id="analysis-report">
                <AnalysisReport
                  analysis={analysis}
                  metrics={metrics!}
                  performance={performance}
                  fusedImage={fusedImage}
                  irSource={irSource}
                  visSource={visSource}
                  onClose={() => setShowReport(false)}
                />
              </div>
            )}
            {history.length > 0 && (
              <div className="mt-16 space-y-4">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Workflow className="w-5 h-5" />
                  <h3 className="font-semibold text-sm uppercase tracking-wider">Fusion History</h3>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                  {history.map((item) => (
                    <div
                      key={item.id}
                      onClick={() => restoreFromHistory(item)}
                      className="group relative cursor-pointer rounded-lg overflow-hidden border border-border hover:border-primary transition-all p-2 bg-secondary/10 active:scale-95"
                    >
                      <img src={item.fusedImage} className="w-full aspect-square object-cover rounded shadow-sm" alt="History" />
                      <div className="mt-2 text-center">
                        <p className="text-[10px] font-bold truncate uppercase">{item.method}</p>
                        <p className="text-[10px] text-muted-foreground">{new Date(item.timestamp).toLocaleTimeString()}</p>
                      </div>
                      <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity rounded-lg">
                        <Zap className="w-5 h-5 text-primary" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
};

export default Index;
