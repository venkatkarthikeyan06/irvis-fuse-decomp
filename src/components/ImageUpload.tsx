import React, { useState, useCallback } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Upload, X, Image as ImageIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ImageUploadProps {
  title: string;
  onImageUpload: (file: File) => void;
  uploadedImage?: string;
  variant: 'infrared' | 'visible';
}

export const ImageUpload: React.FC<ImageUploadProps> = ({
  title,
  onImageUpload,
  uploadedImage,
  variant
}) => {
  const [dragOver, setDragOver] = useState(false);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      onImageUpload(files[0]);
    }
  }, [onImageUpload]);

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      onImageUpload(files[0]);
    }
  }, [onImageUpload]);

  const gradientClass = variant === 'infrared' ? 'bg-gradient-infrared' : 'bg-gradient-visible';
  const shadowClass = variant === 'infrared' ? 'shadow-infrared' : 'shadow-visible';

  return (
    <Card className="relative group">
      <div className="p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className={cn("w-3 h-3 rounded-full", gradientClass)} />
          <h3 className="text-lg font-semibold">{title}</h3>
        </div>
        
        <div
          className={cn(
            "relative border-2 border-dashed rounded-lg p-8 text-center transition-all duration-300",
            dragOver ? "border-primary bg-primary/5" : "border-border",
            "hover:border-primary/50 hover:bg-primary/5"
          )}
          onDragOver={(e) => {
            e.preventDefault();
            setDragOver(true);
          }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleDrop}
        >
          {uploadedImage ? (
            <div className="space-y-4">
              <img
                src={uploadedImage}
                alt={`${variant} preview`}
                className={cn(
                  "w-full h-48 object-cover rounded-lg transition-all duration-300",
                  "group-hover:shadow-lg",
                  shadowClass
                )}
              />
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onImageUpload(new File([], ''))}
                className="text-muted-foreground hover:text-foreground"
              >
                <X className="w-4 h-4 mr-2" />
                Remove
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              <div className={cn(
                "w-16 h-16 mx-auto rounded-full flex items-center justify-center",
                gradientClass
              )}>
                <Upload className="w-8 h-8 text-white" />
              </div>
              <div>
                <p className="text-lg font-medium mb-2">Drop your {variant} image here</p>
                <p className="text-muted-foreground text-sm mb-4">
                  Or click to browse files
                </p>
                <Button variant={variant as any} size="sm">
                  <ImageIcon className="w-4 h-4 mr-2" />
                  Choose File
                </Button>
              </div>
            </div>
          )}
          
          <input
            type="file"
            accept="image/*"
            onChange={handleFileInput}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
        </div>
      </div>
    </Card>
  );
};