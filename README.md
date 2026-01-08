# Frailty Tester Application

A comprehensive health assessment platform designed to measure frailty indicators through interactive tests.

## 📌 Project Overview
The Frailty Tester is a MERN-stack application (currently using SQLite) that allows users to perform various health assessments, including:
- **Reaction Time**: Traffic light reflex test.
- **Balance**: AI-powered body sway analysis using TensorFlow.js.
- **Memory**: Digit span and pattern recall.
- **Hearing**: Frequency threshold testing.
- **Health Surveys**: PSS-10 (Stress) and SF-36 (Quality of Life).

## 🚀 Quick Start for Developers

**Important:** This project consists of two parts: `frontend` (root) and `backend`.

### 1. Frontend Setup
```bash
# Install dependencies
npm install

# Start development server
npm run dev
```
The app will run at `http://localhost:5173`.

### 2. Backend Setup
```bash
cd backend

# Install dependencies
npm install

# Start backend server
npm run dev
```
The API will run at `http://localhost:5000`.

## 📚 Documentation
For detailed information, please refer to the following guides:

- **[👋 HANDOVER GUIDE](./HANDOVER.md)**: Start here if you are the new developer taking over.
- **[🏗️ System Architecture](./docs/ARCHITECTURE.md)**: High-level design, database schema, and project structure.
- **[🧪 Test Modules](./docs/TEST_MODULES.md)**: Technical logic behind each specific health test.

## 🛠️ Tech Stack
- **Frontend:** React, Redux Toolkit, Framer Motion, Tailwind CSS.
- **Backend:** Node.js, Express, Passport.js.
- **AI/ML:** TensorFlow.js (MoveNet) for balance testing.
- **Database:** SQLite (Development).

## 📄 License
This project is proprietary.
