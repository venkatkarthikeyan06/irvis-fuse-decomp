from ultralytics import YOLO

def train_thermal_model():
    print("Starting YOLOv8 Segmentation Training on Thermal Datasets...")
    
    # Load a model (Start with YOLOv8x-seg for high accuracy)
    model = YOLO('yolov8x-seg.pt')  
    
    # Train the model
    results = model.train(
        data='data/thermal_dataset.yaml', # Path to dataset yaml (FLIR/KAIST/LLVIP)
        epochs=100,
        imgsz=640,
        batch=16,
        name='yolov8x_thermal_seg',
        device='0', # GPU ID
        optimizer='auto',
        patience=20,
        workers=8
    )
    
    print("Training Complete. Best weights saved to runs/segment/yolov8x_thermal_seg/weights/best.pt")

if __name__ == "__main__":
    train_thermal_model()
