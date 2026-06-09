import cv2
import numpy as np
import io
import time
from fastapi import FastAPI, File, UploadFile, Form
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from ultralytics import YOLO
import uvicorn

app = FastAPI(title="IR-VIS Fusion Analysis API", version="1.0")

# Enable CORS for frontend
# Enable CORS for frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load YOLOv8n segmentation model (Nano variant for high-speed CPU inference)
model = YOLO('yolov8n-seg.pt')

# Target classes (Person: 0, Vehicle: 2, 3, 5, 7, Animal: 15-23, Drone/Airplane: 4)
TARGET_CLASSES = [0, 1, 2, 3, 5, 7, 15, 16, 17, 18, 19, 20, 21, 22, 23, 4]

def process_image(file_bytes: bytes, conf: float, is_thermal: bool = False, use_tracking: bool = False):
    start_time = time.time()
    # Decode image
    nparr = np.frombuffer(file_bytes, np.uint8)
    img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
    
    inference_img = img
    
    if is_thermal:
        # COCO-trained YOLO models struggle with raw thermal images.
        # We apply CLAHE (Contrast Limited Adaptive Histogram Equalization) 
        # to boost the contrast of the heat signatures, making shapes more prominent.
        gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
        clahe = cv2.createCLAHE(clipLimit=3.0, tileGridSize=(8,8))
        gray_clahe = clahe.apply(gray)
        inference_img = cv2.cvtColor(gray_clahe, cv2.COLOR_GRAY2BGR)
        
        # Override confidence for thermal because COCO models are less confident on thermal shapes
        conf = min(conf, 0.15)
    
    # Run YOLOv8 Segmentation or Tracking
    if use_tracking:
        results = model.track(inference_img, persist=True, tracker="bytetrack.yaml", conf=conf, classes=TARGET_CLASSES)
    else:
        results = model(inference_img, conf=conf, classes=TARGET_CLASSES)
    
    detections = []
    
    for result in results:
        boxes = result.boxes
        masks = result.masks
        
        if boxes is not None:
            for i, box in enumerate(boxes):
                x1, y1, x2, y2 = box.xyxy[0].tolist()
                cls_id = int(box.cls[0].item())
                class_name = model.names[cls_id]
                score = float(box.conf[0].item())
                
                track_id = None
                if use_tracking and boxes.id is not None:
                    try:
                        track_id = int(boxes.id[i].item())
                    except:
                        pass
                
                # Default polygon
                polygon = []
                if masks is not None and len(masks.xy) > i:
                    polygon = masks.xy[i].tolist()
                
                det = {
                    "class": class_name,
                    "confidence": score,
                    "bbox": [x1, y1, x2 - x1, y2 - y1], # x, y, width, height
                    "polygon": polygon
                }
                if track_id is not None:
                    det["tracking_id"] = track_id
                
                detections.append(det)
    
    inference_time = (time.time() - start_time) * 1000 # ms
    fps = 1000 / inference_time if inference_time > 0 else 0

    # Additional thermal specific analysis (Mock for hotspots if is_thermal)
    thermal_analysis = {}
    if is_thermal:
        gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
        minVal, maxVal, minLoc, maxLoc = cv2.minMaxLoc(gray)
        thermal_analysis = {
            "hotspot": {"x": maxLoc[0], "y": maxLoc[1], "intensity": maxVal},
            "avg_temperature_proxy": float(np.mean(gray))
        }

    return {
        "detections": detections, 
        "thermal_analysis": thermal_analysis, 
        "inference_time_ms": inference_time,
        "fps": fps
    }

@app.post("/detect-ir")
async def detect_ir(file: UploadFile = File(...), confidence: float = Form(0.25), track: bool = Form(False)):
    contents = await file.read()
    result = process_image(contents, confidence, is_thermal=True, use_tracking=track)
    return JSONResponse(content=result)

@app.post("/detect-visible")
async def detect_visible(file: UploadFile = File(...), confidence: float = Form(0.5), track: bool = Form(False)):
    contents = await file.read()
    result = process_image(contents, confidence, is_thermal=False, use_tracking=track)
    return JSONResponse(content=result)

@app.post("/detect-fused")
async def detect_fused(file: UploadFile = File(...), confidence: float = Form(0.5), track: bool = Form(False)):
    contents = await file.read()
    result = process_image(contents, confidence, is_thermal=False, use_tracking=track)
    return JSONResponse(content=result)

@app.post("/track")
async def track(file: UploadFile = File(...), confidence: float = Form(0.5)):
    # Standard tracking endpoint
    contents = await file.read()
    result = process_image(contents, confidence, is_thermal=False, use_tracking=True)
    return JSONResponse(content=result)

@app.post("/analyze")
async def analyze():
    # Return mock comparison stats
    return JSONResponse(content={
        "model": "YOLOv8n-seg",
        "fps_estimate": 45,
        "precision": 0.94,
        "recall": 0.91,
        "mAP": 0.93
    })

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
