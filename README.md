# FrailtyTester

A comprehensive health assessment web application built using modern web technologies and AI-powered pose detection for real-time frailty testing and analysis.

## 🎯 Project Overview

FrailtyTester is a professional health assessment platform designed to help seniors and healthcare providers assess physical condition remotely through AI-powered movement analysis. Using pose detection technology, the application guides users through a series of balance tests, reaction time assessments, and provides detailed feedback on their performance.

## 🚀 Live Demo

**Production URL**: [FrailtyTester Demo](https://main.d22cx9qmwqrer1.amplifyapp.com/)

## ⚡ Technology Stack

### Frontend
- **React 18.3.1** - Modern React with hooks and functional components
- **Vite 6.2.1** - Fast build tool and development server
- **Redux Toolkit 2.6.0** - State management
- **React Router DOM 7.7.1** - Client-side routing
- **Tailwind CSS 3.4.15** - Utility-first CSS framework
- **TensorFlow.js 4.22.0** - Machine learning for pose detection
- **React Webcam 7.2.0** - Webcam integration
- **Lucide React 0.477.0** - Modern icon library

### Backend
- **Express.js 4.21.2** - Node.js web framework
- **SQLite3 5.1.7** - Lightweight database
- **CORS 2.8.5** - Cross-origin resource sharing
- **Nodemon 3.1.9** - Development server with auto-reload

### Development Tools
- **ESLint 9.25.1** - Code linting
- **Jest 29.7.0** - Testing framework
- **PostCSS 8.4.49** - CSS processing
- **Autoprefixer 10.4.20** - CSS vendor prefixing

## 🛠️ Setup Instructions

### Prerequisites
- Node.js 18+ and npm
- Git
- Modern web browser with camera access

### Quick Start
```bash
# Clone the repository
git clone https://github.com/JithendraNara/FrailtyTester.git
cd FrailtyTester

# Install dependencies
npm install

# Start frontend development server
npm run dev

# In a new terminal, start backend
cd backend
npm install
npm run dev
```

### Access the Application
- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:3000

## 📂 Repository Structure

```
FrailtyTester/
├── src/                    # React frontend application
│   ├── components/         # Reusable UI components
│   │   ├── poseDetection/  # AI pose detection components
│   │   ├── webCam/         # Camera integration
│   │   └── ...
│   ├── pages/              # Page components and routing
│   │   ├── screens/        # Main application screens
│   │   ├── tests/          # Test-specific components
│   │   └── pageFlow/       # Page flow management
│   ├── hooks/              # Custom React hooks
│   ├── store/              # Redux store and slices
│   ├── services/           # API services
│   ├── utils/              # Utility functions
│   ├── constants/          # Assessment items and configurations
│   └── assets/             # Static assets (images, audio)
├── backend/                # Express.js backend
│   ├── routes/             # API route handlers
│   ├── data/               # Database files and JSON data
│   └── server.js           # Main server file
├── public/                 # Public static files
├── archive/                # Archived/unused components
└── docs/                   # Documentation files
```

## ✅ Current Status

### 🧪 Available Health Tests
- ✅ **Pittsburgh Sleep Quality Index (PSQI)** - Sleep quality assessment
- ✅ **Digit Memory Test** - Cognitive function evaluation
- ✅ **Self Reaction Test** - Cognitive reactivity assessment
- ✅ **Perceived Stress Scale (PSS-10)** - Stress level assessment over the last month
- ✅ **General Health Inventory (SF-36)** - Comprehensive health-related quality of life assessment
- ✅ **Balance Test** - AI-powered movement analysis using TensorFlow.js MoveNet
- ✅ **Chair Stand Test** - Lower body strength assessment
- 🔄 **Reaction Time Test** - Processing speed measurement (in development)

## 📊 Psychological & Health Assessments

### Perceived Stress Scale (PSS-10)
A validated 10-item questionnaire that measures the degree to which situations in one's life are appraised as stressful over the last month.

#### Features
- **10-item Assessment**: Quick stress level evaluation (3-5 minutes)
- **Reverse Scoring**: Items 4, 5, 7, 8 are reverse-scored for accurate measurement
- **Category Classification**: Results categorized as Low (0-13), Moderate (14-26), or High (27-40) stress
- **Progress Tracking**: Real-time completion status and validation
- **Privacy-First**: Local processing with optional result submission

#### Technical Implementation
- **React State Management**: Local component state for responses
- **Form Validation**: Ensures all 10 items are completed before submission
- **API Integration**: POST to `/api/frailty-tests/pss` endpoint
- **Responsive Design**: Mobile-friendly interface with Tailwind CSS

### General Health Inventory (SF-36)
A comprehensive 36-item health survey that measures health-related quality of life across 8 domains.

#### Features
- **8 Health Domains**: Physical Functioning, Role Physical, Bodily Pain, General Health, Vitality, Social Functioning, Role Emotional, Mental Health
- **Domain-Based Navigation**: Paginated interface organized by health domains
- **Global Question Numbering**: Consistent 1-36 numbering across all sections
- **Duplicate Question Handling**: Shared state for questions appearing in multiple domains
- **Comprehensive Scoring**: 0-100 scale for each domain with detailed interpretation
- **Progress Indicators**: Section-by-section progress tracking

#### Technical Implementation
- **Domain Pagination**: 8 sections with validation per page
- **Shared State Management**: `responsesById` object for duplicate question handling
- **Global ID Mapping**: `idToNumber` map for consistent 1-36 numbering
- **API Integration**: POST to `/api/frailty-tests/sf36` endpoint
- **Data Validation**: Safeguard assertions for 1-36 unique question IDs

## 🧘‍♀️ Balance Test

The Balance Test is a sophisticated AI-powered assessment that evaluates postural stability and fall risk using computer vision technology.

### Features
- **Real-time Pose Detection**: Uses TensorFlow.js MoveNet for accurate body keypoint tracking
- **Automatic Trial Management**: 6 trials (3 per foot) with automatic timing and scoring
- **Smart Foot Detection**: Automatically detects which foot is lifted and validates correct positioning
- **Grace Period Logic**: 300ms grace period to prevent false positives from momentary balance loss
- **Age-adjusted Scoring**: Performance assessment based on age group norms (20-40, 40-50, 50-60, 60+)
- **Camera Integration**: Seamless webcam access with permission handling and error states

### Technical Implementation
- **TensorFlow.js**: Lazy-loaded for optimal bundle size
- **MoveNet Model**: SinglePose Thunder variant for real-time performance
- **WebGL Backend**: GPU acceleration for smooth pose detection
- **React Hooks**: Custom `useBalancePose` hook for pose detection logic
- **Canvas Rendering**: Real-time pose skeleton overlay on video feed

### Requirements
- Modern browser with WebGL support
- Camera access permission
- Good lighting conditions
- Stable internet connection for model loading

### 🚧 Features in Development
- User authentication and profiles
- Test result history and trends
- Export results to PDF/CSV
- Admin dashboard for healthcare providers

## 🔒 Security & Privacy

- No hardcoded credentials or API keys
- Environment variables properly configured
- Secure webcam permissions handling
- Local data storage with user consent

## 🧪 Testing

```bash
# Run all tests
npm test

# Run linting
npm run lint

# Build for production
npm run build
```

## 📚 Documentation

- [Contributing Guidelines](CONTRIBUTING.md) - How to contribute to the project

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md) for details on how to submit pull requests, report issues, and contribute to the project.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Team

FrailtyTester is maintained by Jithendra Nara.

## 📞 Support

For questions, issues, or contributions, please:
- Open an issue on GitHub
- Contact the development team
- Review the documentation files

Updated project setup by Koushik Nakka
