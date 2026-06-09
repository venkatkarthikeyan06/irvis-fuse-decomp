import { DetectionResult } from './detectObjects';
import { getColorForClass } from './filterDetections';

export const drawBoundingBoxes = (
  canvas: HTMLCanvasElement,
  image: HTMLImageElement,
  detections: DetectionResult[]
) => {
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  // Clear previous frame
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  // Set dimensions
  canvas.width = image.naturalWidth;
  canvas.height = image.naturalHeight;
  
  // Base Draw
  ctx.drawImage(image, 0, 0);

  detections.forEach((d) => {
    const color = getColorForClass(d.class);
    const [x, y, w, h] = d.bbox;

    // Draw Segmentation Polygon if available
    if (d.polygon && d.polygon.length > 0) {
      ctx.beginPath();
      ctx.moveTo(d.polygon[0][0], d.polygon[0][1]);
      for (let i = 1; i < d.polygon.length; i++) {
        ctx.lineTo(d.polygon[i][0], d.polygon[i][1]);
      }
      ctx.closePath();
      
      // Semi-transparent fill
      ctx.fillStyle = color;
      ctx.globalAlpha = 0.3;
      ctx.fill();
      
      ctx.strokeStyle = color;
      ctx.lineWidth = 1;
      ctx.globalAlpha = 1.0;
      ctx.stroke();
    }

    // Bounding Box Stroke
    ctx.strokeStyle = color;
    ctx.lineWidth = 3; // Rule: thickness 3px
    ctx.strokeRect(x, y, w, h);

    const score = Math.round(d.confidence * 100);
    const className = d.class.charAt(0).toUpperCase() + d.class.slice(1);
    const label = d.tracking_id 
      ? `${className} #${d.tracking_id} (${score}%)`
      : `${className} ${score}%`;

    // Font calculation
    const fontSize = Math.max(16, image.naturalWidth / 40);
    ctx.font = `bold ${fontSize}px sans-serif`;
    
    // Label Plate Background (semi-transparent)
    const textWidth = ctx.measureText(label).width;
    ctx.fillStyle = color;
    ctx.globalAlpha = 0.85; // Solid enough to read
    
    // Position label above box if space, otherwise inside top
    const labelYOffset = y > fontSize + 10 ? y - fontSize - 10 : y;
    
    ctx.fillRect(x, labelYOffset, textWidth + 10, fontSize + 10);
    
    // Reset alpha and draw Text
    ctx.globalAlpha = 1.0;
    ctx.fillStyle = '#ffffff'; // White text on dark colored background
    
    // Determine if black text needed for lighter backgrounds
    if (color === '#ffff00' || color === '#00ff00') {
      ctx.fillStyle = '#000000';
    }
    
    ctx.fillText(label, x + 5, labelYOffset + fontSize);
  });
};
