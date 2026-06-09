import { DetectionResult } from './detectObjects';

export const filterDetections = (
  detections: DetectionResult[],
  minConfidence: number
): DetectionResult[] => {
  return detections.filter(d => d.confidence >= minConfidence);
};

export const getColorForClass = (className: string): string => {
  const c = className.toLowerCase();
  if (['person'].includes(c)) return '#00ff00'; // Green
  if (['car'].includes(c)) return '#ff0000'; // Red
  if (['truck', 'bus'].includes(c)) return '#ffa500'; // Orange
  if (['motorcycle', 'bicycle'].includes(c)) return '#0000ff'; // Blue
  if (['bird', 'cat', 'dog', 'horse', 'sheep', 'cow', 'elephant', 'bear', 'zebra', 'giraffe'].includes(c)) return '#800080'; // Purple
  return '#ffffff'; // White default
};
