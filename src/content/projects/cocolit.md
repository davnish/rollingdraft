---
title: Cocolit
summary: Count coconut trees in any box you draw on a satellite map, with a YOLO11n model running on a single k3s node.
url: https://cocolit.rollingdraft.com
repo: https://github.com/davnish/cocolit
status: live
started: 2025-04-08
tags: [computer vision, geospatial, kubernetes, fastapi]
order: 1
---

Draw a box on the map, and a [YOLO11n](https://docs.ultralytics.com/models/yolo11/)
detection model marks every coconut tree inside it.

It began as a way to find out what it takes to build a geospatial ML app end to end,
and became a place to try out everything around the model:

- **Detector:** YOLO11n exported to ONNX, running on onnxruntime behind FastAPI.
  Satellite tiles stream in while inference runs on the patches that have already arrived.
- **Website:** a Leaflet map served by a second FastAPI service, which saves every
  scan to PostGIS.
- **Infrastructure:** one k3s node on Oracle Cloud, reached only through a Cloudflare
  Tunnel. When the detector is busy, requests spill over to Google Cloud Run.
- **Monitoring:** OpenTelemetry into Prometheus, Loki and Tempo, with a public
  Grafana dashboard.

The [architecture docs](https://davnish.github.io/cocolit/architecture/) go into the details.
