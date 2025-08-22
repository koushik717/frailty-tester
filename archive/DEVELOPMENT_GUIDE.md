# Development Guide for Balance Tester

Hi there! This file is to help you have a quick glimpse of what’s been built so far and help you catch up and continue our work. It’s very straightforward — just what you’d want if you’re jumping in fresh.

---

## Core Technology Stack

- **Frontend:** React + Vite + TailwindCSS for styling
- **Backend:** Express.js + nodemon for auto-reload
- **Testing:** Jest + React Testing Library
- **State Management:** Redux Toolkit
- **AI/ML:** TensorFlow.js model, MoveNet to be precise

---

## Directory Structure

Here’s how things are laid out:

```
├── backend/                # Express server
│   ├── data/               # JSON data files
│   ├── routes/             # API routes, to connect to services in Frontend
│   └── server.js           # Server entry point
├── public/                 # Static assets
├── src/
│   ├── assets/            # Images and styles 
│   ├── components/        # Reusable components
│   │   ├── poseDetection/ # Pose detection components
│   │   └── webCam/        # Webcam components
│   ├── hooks/             # Custom React hooks
│   ├── layout/            # Layout components
│   ├── pages/             # Pages or main components that change the flow
│   ├── services/          # API services, using Redux Toolkit Queries
│   ├── store/             # Redux store/slices
│   └── tests/             # Test files
└── config files           # Various config files
```

---

## Instructions

The whole project is currently a monolith (1 frontend and 1 backend in the same repo) and it’s quite straightforward to run. Follow the steps from here.

### Install all dependencies
You’ll need to install `node_modules` in both the root folder (for frontend React) and in the backend (for Express).
**Frontend:**  
From the root folder:
```bash
npm install
```

**Backend:**  
Go into the backend folder:
```bash
cd backend
npm install
```

### To start running servers locally

We use the default React server for the frontend (usually http://localhost:5173):

```bash
npm run dev
```

For the backend, you’ll want to build the frontend first (`npm run build` in the root), then run Express.js (usually http://localhost:3000):

```bash
cd backend
npm run dev
```

### Testing

Run unit tests with Jest:

```bash
npm test
```

If you want to run a specific test file:

```bash
npm test src/tests/fileName.test.js
```

### Code Quality

ESLint is configured to enforce code style and catch potential issues. These errors won't crash your website, but they’re helpful for keeping the codebase clean and maintainable. ESLint checks for:

- Code style consistency
- Potential bugs
- React best practices
- Hook rules
- Unused variables

To run the linter:
```bash
npm run lint
```

---

Good luck!