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
- ✅ **Balance Test** - AI-powered movement analysis
- ✅ **Chair Stand Test** - Lower body strength assessment
- 🔄 **Reaction Time Test** - Processing speed measurement (in development)

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

