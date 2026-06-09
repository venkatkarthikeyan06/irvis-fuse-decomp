export interface DetectionResult {
  class: string;
  confidence: number;
  bbox: [number, number, number, number]; // [x, y, width, height]
  polygon?: number[][]; // Segment polygon points [[x1, y1], [x2, y2], ...]
  tracking_id?: number;
}

export interface DetectionResponse {
  detections: DetectionResult[];
  fps: number;
  inferenceTime: number;
  thermalAnalysis?: any;
}

const getBlobFromSource = (
  imageSource: HTMLImageElement | HTMLCanvasElement
): Promise<Blob> => {
  return new Promise((resolve, reject) => {
    let canvas: HTMLCanvasElement;
    if (imageSource instanceof HTMLImageElement) {
      canvas = document.createElement('canvas');
      canvas.width = imageSource.naturalWidth;
      canvas.height = imageSource.naturalHeight;
      const ctx = canvas.getContext('2d')!;
      ctx.drawImage(imageSource, 0, 0);
    } else {
      canvas = imageSource;
    }
    
    canvas.toBlob((blob) => {
      if (blob) {
        resolve(blob);
      } else {
        reject(new Error('Canvas to Blob conversion failed'));
      }
    }, 'image/jpeg');
  });
};

export const detectObjects = async (
  imageSource: HTMLImageElement | HTMLCanvasElement,
  confidenceThreshold: number = 0.5,
  isThermal: boolean = false,
  isFused: boolean = false,
  useTracking: boolean = false
): Promise<DetectionResponse> => {
  try {
    const blob = await getBlobFromSource(imageSource);
    const formData = new FormData();
    formData.append('file', blob, 'image.jpg');
    formData.append('confidence', confidenceThreshold.toString());
    formData.append('track', useTracking ? 'true' : 'false');

    let endpoint = 'http://localhost:8000/detect-visible';
    if (isFused) {
      endpoint = 'http://localhost:8000/detect-fused';
    } else if (isThermal) {
      endpoint = 'http://localhost:8000/detect-ir';
    }

    const response = await fetch(endpoint, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`API returned ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();
    return {
      detections: data.detections || [],
      fps: data.fps || 0,
      inferenceTime: data.inference_time_ms || 0,
      thermalAnalysis: data.thermal_analysis
    };
  } catch (error) {
    console.error("Detection via FastAPI failed:", error);
    return { detections: [], fps: 0, inferenceTime: 0, thermalAnalysis: undefined };
  }
};
