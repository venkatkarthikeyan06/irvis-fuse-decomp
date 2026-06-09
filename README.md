# IR-VIS Fusion Analysis Platform

## Introduction

The IR-VIS Fusion Analysis Platform is a computer vision-based system developed to improve object detection and scene understanding in low-light and challenging environmental conditions. The project combines information from Visible Spectrum (VIS) images and Infrared (IR) images to generate a fused image that contains both visual details and thermal information.

Visible images provide clear structural details of a scene, while infrared images capture heat signatures of objects. By combining these two types of images, the system produces an enhanced image that can be used for better object detection and analysis.

The project also integrates Artificial Intelligence techniques to detect and classify objects such as people, vehicles, and animals from visible, infrared, and fused images.

---

## Motivation

In many real-world situations such as night-time surveillance, rescue operations, border security, and autonomous driving, normal cameras may not perform well due to poor lighting conditions.

Thermal cameras can detect heat-emitting objects even in darkness, but they often lack detailed visual information. On the other hand, visible cameras provide detailed images but cannot detect objects effectively in low-light environments.

This project aims to combine the strengths of both imaging systems and provide a more reliable solution for object detection and monitoring.

---

## Objective

The main objectives of this project are:

* To perform image fusion using visible and infrared images.
* To improve scene visibility in low-light conditions.
* To detect and classify objects using deep learning models.
* To track detected objects in video sequences.
* To analyze thermal information present in the scene.
* To visualize thermal data using a 3D representation.
* To evaluate the performance of the fusion and detection processes.

---

## System Overview

The system accepts a visible image and an infrared image as input. These images are processed using an image fusion algorithm to generate a fused image.

The fused image is then analyzed using YOLOv8 Segmentation for object detection. Detected objects are highlighted using bounding boxes and segmentation masks.

For video processing, ByteTrack is used to track objects across multiple frames and maintain object identities.

The platform also includes thermal analysis, benchmarking tools, and 3D visualization features to provide additional insights into the processed data.

---

## Features of the System

### Image Fusion

The platform combines visible and infrared images into a single image. The fused image preserves important visual details from the visible image while incorporating thermal information from the infrared image.

This helps improve object visibility and scene understanding.

---

### Object Detection

The system uses YOLOv8 Segmentation to identify and classify objects present in the scene.

The detected objects may include:

* Person
* Car
* Truck
* Bus
* Motorcycle
* Bicycle
* Animal

For each detected object, the system displays:

* Bounding Box
* Object Label
* Confidence Score
* Segmentation Mask

This allows users to clearly identify objects in visible, infrared, and fused images.

---

### Object Tracking using ByteTrack

For video inputs, ByteTrack is used to track detected objects from one frame to another.

In simple terms, if a person or vehicle moves through a video, the system assigns a unique ID and continues tracking the same object throughout its movement.

This helps avoid repeated detections and improves monitoring accuracy.

---

### Advanced Thermal Analysis

The platform analyzes thermal information present in infrared images.

It can identify regions with high temperature variations and highlight important thermal patterns within the scene.

This feature can be useful in applications such as surveillance, rescue operations, equipment monitoring, and anomaly detection.

---

### 3D Thermal Topography

One of the unique features of the project is the 3D Thermal Topography module.

This module converts thermal information into a three-dimensional surface where temperature values are represented as heights.

Hotter regions appear as elevated areas, while cooler regions appear lower.

This provides a more intuitive way to visualize and understand temperature distribution across the scene.

---

### Real-Time Benchmarking

The platform includes benchmarking tools that evaluate the performance of image fusion and object detection.

The benchmarking module helps compare the results obtained from:

* Visible Images
* Infrared Images
* Fused Images

This allows users to understand whether image fusion improves detection performance.

---

### Analytics Dashboard

The dashboard provides a visual summary of the system's performance and detection results.

It displays:

* Number of detected objects
* Confidence levels
* Processing speed
* Inference time
* Detection statistics
* Tracking information

This makes it easier to monitor the system in real time.

---

## Applications

The proposed system can be applied in several practical scenarios:

### Surveillance and Security

The platform can be used for monitoring restricted areas during day and night conditions.

### Search and Rescue

Thermal information can help locate people in low-visibility environments such as forests, smoke-filled areas, or disaster zones.

### Intelligent Transportation Systems

The system can assist in detecting pedestrians, vehicles, and obstacles during nighttime driving.

### Border Monitoring

The combination of thermal and visible imagery can improve target detection in remote and low-light regions.

### Industrial Monitoring

Thermal analysis can help identify overheating equipment and abnormal temperature patterns.

---

## Technology Stack

### Frontend

* React.js
* TypeScript
* Vite
* Tailwind CSS
* Shadcn UI
* Three.js

### Backend

* Python
* FastAPI

### Computer Vision and AI

* YOLOv8 Segmentation
* ByteTrack
* OpenCV

### Visualization

* Three.js
* Recharts

---

## Datasets

The project is designed to support publicly available thermal datasets such as:

* FLIR Thermal Dataset
* KAIST Multispectral Dataset
* LLVIP Dataset

These datasets can be used for training and evaluating object detection models on thermal and fused imagery.

---

## Performance Metrics

The performance of the system is evaluated using the following metrics:

### Detection Accuracy

Measures how correctly the system identifies objects present in the image.

### Precision

Measures the percentage of detected objects that are actually correct.

### Recall

Measures how many of the actual objects present in the image are successfully detected.

### Mean Average Precision (mAP)

A standard metric used to evaluate the overall performance of object detection models.

### Frames Per Second (FPS)

Measures the number of image frames processed by the system every second.

### Inference Time

Measures the time required by the model to process a single image and generate results.

### Tracking Accuracy

Measures how effectively objects are tracked across multiple video frames.

---

## Conclusion

The IR-VIS Fusion Analysis Platform combines image fusion, object detection, object tracking, thermal analysis, and visualization into a single integrated system.

By utilizing information from both visible and infrared images, the platform improves object visibility and detection performance in challenging environments. The project demonstrates how image fusion and artificial intelligence can be combined to build an effective solution for surveillance, transportation, rescue operations, and security applications.

## 🚀 How to Run the Project

Running this project is as easy as turning on a TV!

1. Open the project folder.
2. Find the file named `start.bat` and double-click it.
3. Two black command windows will pop up (one starting the AI Brain, and one starting the Website).
4. Your web browser will automatically open to `http://localhost:5173`.
5. Upload your images and watch the magic happen!

---

