# FrailtyTester — AI-Powered Frailty Assessment Platform

A HealthTech web app that digitizes geriatric frailty assessments with browser-based pose tracking (TensorFlow.js MoveNet) and longitudinal trends dashboards.

**Tech:** React, Redux Toolkit + Persist, TensorFlow.js MoveNet, Node/Express, MongoDB

## Demo
- Live: [Link to Live Demo]
- Video demo (60s): [Link to Video]

## Engineering Highlights
- **Real-time Pose Inference**: MoveNet (Lightning) running at ~60 FPS in-browser via WebGL.
- **Memory Optimization**: `tf.tidy()` used extensively to prevent WebGL memory leaks during long sessions.
- **Resilient Frontend**: Optional Mock Service Worker (MSW) integration for flawless demos even if the backend is cold.

## Getting Started (Local)
### Frontend
```bash
cd client
npm install
npm run dev
```

### Backend
```bash
cd server
npm install
npm run dev
```

## Testing
```bash
cd client
npm test
```
