# IR-VIS Fusion Analysis Platform - Backend

This FastAPI backend replaces the legacy in-browser TensorFlow.js (COCO-SSD) model with a high-accuracy, real-time YOLOv8 Segmentation pipeline.

## Features
- **YOLOv8 Segmentation**: Provides bounding boxes, class labels, confidence scores, and segmentation masks (polygons).
- **Target Tracking**: Uses ByteTrack for multi-object tracking.
- **Thermal Analysis**: Basic hotspot and temperature anomaly detection for IR images.
- **REST APIs**: Endpoints to detect on IR, Visible, and Fused images.

## Setup Instructions

### Prerequisites
- Python 3.9+
- GPU recommended for real-time inference (CUDA)

### Installation
1. Navigate to this `backend` directory.
2. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
   *(Note: Ultralytics YOLOv8 will automatically download the `yolov8n-seg.pt` model weights on first run).*

### Running the Server
Run the FastAPI application using Uvicorn:
```bash
uvicorn main:app --host 0.0.0.0 --port 8000 --reload
```
The API documentation (Swagger UI) will be available at: http://localhost:8000/docs

## API Endpoints

### 1. `POST /detect-visible`
- **Description**: Detects objects in standard visible light imagery.
- **Parameters**: `file` (multipart form image), `confidence` (float).
- **Returns**: JSON list of `detections` (class, confidence, bbox, polygon).

### 2. `POST /detect-ir`
- **Description**: Detects objects and performs thermal analysis on infrared imagery.
- **Parameters**: `file`, `confidence`.
- **Returns**: `detections` and `thermal_analysis` (hotspot coords).

### 3. `POST /detect-fused`
- **Description**: Detects objects on fused IR-VIS imagery.
- **Parameters**: `file`, `confidence`.
- **Returns**: `detections`.

### 4. `POST /track`
- **Description**: Basic ByteTrack object tracking over frames.
- **Parameters**: `file` (current frame).
- **Returns**: Tracks with track IDs.

### 5. `POST /analyze`
- **Description**: Returns model metrics and comparison data (COCO-SSD vs YOLOv8).

## Dataset Support
This architecture is flexible enough to train on or evaluate FLIR, KAIST, and LLVIP datasets. You can train a custom YOLOv8 model using those datasets and simply replace the `yolov8n-seg.pt` weights in `main.py` with your `best.pt`.
