# FrailtyTester

A comprehensive health assessment web application built using modern web technologies and AI-powered pose detection for real-time frailty testing and analysis.

## 🎯 Project Overview

FrailtyTester is a health test web application designed to help seniors and healthcare providers assess physical condition remotely through AI-powered movement analysis. Using pose detection technology, the application guides users through a series of balance tests, reaction time assessments, and provides detailed feedback on their performance.

The project is built using the same technologies and design system as the `Mety-Technology-Website-main` repository, ensuring consistency in branding, user experience, and code quality.

**Current Live Demo**: [Frailty Tester](https://main.d22cx9qmwqrer1.amplifyapp.com/)

## 🛠 Technology Stack

### Frontend
- **React 18.3.1** - Modern React with hooks and functional components
- **Vite 6.2.1** - Fast build tool and development server
- **Redux Toolkit 2.6.0** - State management
- **React Router DOM 7.7.1** - Client-side routing
- **Tailwind CSS 3.4.15** - Utility-first CSS framework
- **TensorFlow.js 4.22.0** - Machine learning for pose detection
- **React Webcam 7.2.0** - Webcam integration
- **Lucide React 0.477.0** - Modern icon library
- **Jest 29.7.0** - Testing framework

### Backend
- **Express.js 4.21.2** - Node.js web framework
- **SQLite3 5.1.7** - Lightweight database
- **CORS 2.8.5** - Cross-origin resource sharing
- **Nodemon 3.1.9** - Development server with auto-reload

### Development Tools
- **ESLint 9.25.1** - Code linting
- **PostCSS 8.4.49** - CSS processing
- **Autoprefixer 10.4.20** - CSS vendor prefixing
- **Babel** - JavaScript transpilation

## 📁 Folder Structure

```
FrailtyTester-main/
├── frontend/                    # React frontend application
│   ├── src/
│   │   ├── components/         # Reusable UI components
│   │   │   ├── poseDetection/  # AI pose detection components
│   │   │   ├── webCam/         # Camera integration
│   │   │   └── ...
│   │   ├── pages/              # Page components and routing
│   │   │   ├── screens/        # Main application screens
│   │   │   ├── tests/          # Test-specific components
│   │   │   └── pageFlow/       # Page flow management
│   │   ├── hooks/              # Custom React hooks
│   │   ├── store/              # Redux store and slices
│   │   ├── services/           # API services
│   │   ├── utils/              # Utility functions
│   │   └── assets/             # Static assets (images, audio)
│   ├── public/                 # Public static files
│   └── package.json
├── backend/                    # Express.js backend
│   ├── routes/                 # API route handlers
│   ├── data/                   # Database files and JSON data
│   └── server.js              # Main server file
├── config.env                 # Environment configuration
└── README.md
```

## 🎨 METY Brand Components

### New React Components with METY Branding

The following components have been created to replicate the Bootstrap structure from the SOURCE repository using Tailwind CSS and METY brand tokens:

## 🧠 Digit Memory Test

**Digit Memory Test**: migrated from MyEdMasters (testId 'digit'), preserving flow: 3→20 digits, 3 failures, 500ms reveal.

### Test Implementation
- **Hook**: `useDigitMemoryTest` - Manages game state, timing, and progression
- **Pages**: 
  - `MemoryIntro` - Instructions and mode selection (practice/test)
  - `MemoryTest` - Core game interface with digit display and input
  - `MemoryResults` - Score display and submission handling
- **Routes**: `/tests/memory-intro`, `/tests/memory-test`, `/tests/memory-results`
- **Features**: Practice mode, progressive difficulty, local storage fallback

#### 1. **MetyNavbar** (`src/components/MetyNavbar.jsx`)
- **Purpose**: Responsive navigation bar with METY branding
- **Features**: Fixed positioning, scroll effects, mobile menu, brand logo
- **Props**: `brandLogo`, `navItems`, `fixed`, `className`
- **Usage**: Main site navigation with METY colors and typography

#### 2. **MetyPageSection** (`src/components/MetyPageSection.jsx`)
- **Purpose**: Page section wrapper with consistent spacing and backgrounds
- **Features**: Multiple background variants, responsive padding, centered content
- **Props**: `background`, `centered`, `maxWidth`, `padding`, `className`
- **Subcomponents**: `MetySectionHeading`, `MetySectionSubheading`

#### 3. **MetyButton** (`src/components/MetyButton.jsx`)
- **Purpose**: Button system with METY brand variants and sizes
- **Features**: Multiple variants (primary, secondary, outline), sizes (sm-xl), states
- **Props**: `variant`, `size`, `disabled`, `className`
- **Subcomponents**: `MetyButtonXL`, `MetySocialButton`

#### 4. **MetyCTASection** (`src/components/MetyCTASection.jsx`)
- **Purpose**: Call-to-action sections with METY branding
- **Features**: Flexible backgrounds, centered content, feature grids
- **Props**: `title`, `description`, `buttonText`, `background`, `centered`
- **Subcomponents**: `MetyFeatureGrid`

#### 5. **MetyNewsletterForm** (`src/components/MetyNewsletterForm.jsx`)
- **Purpose**: Newsletter subscription and email verification forms
- **Features**: Email validation, status messages, responsive layout
- **Props**: `title`, `description`, `onSubmit`, `background`
- **Subcomponents**: `MetyEmailVerificationForm`

### Brand Token Integration

All components use the METY brand tokens defined in:
- **Colors**: `brand-primary` (#e81e1e), `brand-secondary` (#20545c), `brand-accent` (#ffe46c)
- **Fonts**: `font-brandHeading` (Montserrat), `font-brandBody` (Roboto Slab)
- **Spacing**: Consistent padding and margin scales
- **Responsive**: Mobile-first design with Tailwind breakpoints

## 🔄 Migration Plan

### Frontend Migration

#### Components to Adapt from Mety-Technology-Website-main:

1. **Design System Integration** ✅ **COMPLETED**
   - ✅ METY branding colors and typography integrated
   - ✅ Bootstrap components converted to Tailwind CSS
   - ✅ METY brand tokens available throughout application

2. **Core Components to Migrate**
   - `ReactionTimeTestUI.jsx` - Enhanced reaction time testing
   - `TestIntroCard.jsx` - Test introduction cards
   - `AssessmentCard.jsx` - Assessment selection cards
   - `AssessmentDropdown.jsx` - Test selection dropdown
   - `PageSection.jsx` - Page layout sections

3. **Pose Detection Components**
   - `poseDetection/` - AI-powered movement analysis
   - `webCam/` - Camera integration and permissions
   - `PoseAnalyzer.js` - Movement analysis logic
   - `PoseCanvas.jsx` - Real-time pose visualization

4. **UI/UX Enhancements** ✅ **COMPLETED**
   - ✅ METY color scheme integrated (#e81e1e, #20545c, #ffe46c)
   - ✅ Consistent typography applied (Montserrat, Roboto Slab)
   - ✅ Responsive design patterns implemented
   - ✅ Accessibility features added

#### Setup Instructions:

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Run tests
npm test

# Lint code
npm run lint
```

### Backend Migration

#### Express.js Setup:

1. **API Endpoints to Implement**
   ```javascript
   // Test management
   GET /api/exercises - List available tests
   GET /api/exercises/:id - Get test details
   
   // Results management
   POST /api/results - Submit test results
   GET /api/results - Get user results
   GET /api/results/:id - Get specific result
   
   // User management
   POST /api/users - Create user profile
   GET /api/users/:id - Get user profile
   ```

2. **Database Schema**
   ```sql
   -- Users table
   CREATE TABLE users (
     id INTEGER PRIMARY KEY,
     name TEXT,
     email TEXT UNIQUE,
     created_at DATETIME DEFAULT CURRENT_TIMESTAMP
   );
   
   -- Results table
   CREATE TABLE results (
     id INTEGER PRIMARY KEY,
     user_id INTEGER,
     test_type TEXT,
     score REAL,
     details TEXT,
     created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
     FOREIGN KEY (user_id) REFERENCES users(id)
   );
   ```

3. **Backend Setup**
   ```bash
   cd backend
   npm install
   npm run dev
   ```

## 🚀 Local Development Setup

### Prerequisites
- Node.js 18+ and npm
- Git
- Modern web browser with camera access

### Step-by-Step Setup
co
1. **Clone and Install**
   ```bash
   git clone <repository-url>
   cd FrailtyTester-main
   npm install
   ```

2. **Environment Configuration**
   ```bash
   # Copy environment template
   cp config.env.example config.env
   
   # Edit config.env with your settings
   VITE_API_URL=http://localhost:3001
   VITE_APP_NAME=FrailtyTester
   ```

3. **Start Development Servers**
   ```bash
   # Terminal 1: Start frontend
   npm run dev
   
   # Terminal 2: Start backend
   cd backend
   npm run dev
   ```

4. **Access Application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:3001

### Testing Connections

1. **Frontend-Backend Connection**
   ```bash
   # Test API connectivity
   curl http://localhost:3001/api/exercises
   ```

2. **Camera Permissions**
   - Ensure browser allows camera access
   - Test pose detection functionality
   - Verify real-time analysis

3. **Mock Data Setup**
   ```bash
   # Backend includes sample data in data/exercises.json
   # Modify as needed for development
   ```

## 🚀 Deployment

### Frontend Deployment (Netlify/Vercel)

1. **Build Configuration**
   ```bash
   npm run build
   ```

2. **Deploy to Netlify**
   - Connect GitHub repository
   - Set build command: `npm run build`
   - Set publish directory: `dist`
   - Configure environment variables

3. **Deploy to Vercel**
   - Import GitHub repository
   - Framework preset: Vite
   - Build command: `npm run build`
   - Output directory: `dist`

### Backend Deployment (Render/Railway)

1. **Environment Setup**
   ```bash
   # Set production environment variables
   NODE_ENV=production
   PORT=3001
   DATABASE_URL=your-database-url
   ```

2. **Deploy to Render**
   - Create new Web Service
   - Connect GitHub repository
   - Build command: `npm install`
   - Start command: `node server.js`

3. **Database Setup**
   - Use PostgreSQL on Render/Railway
   - Update DATABASE_URL in environment
   - Run database migrations

### Domain and SSL
- Configure custom domain
- Enable SSL certificates
- Set up CORS for production domains

## 🔮 Future Enhancements

### Phase 1: Core Features
- [ ] User authentication and profiles
- [ ] Test result history and trends
- [ ] Export results to PDF/CSV
- [ ] Mobile-responsive design improvements

### Phase 2: Advanced Features
- [ ] Admin dashboard for healthcare providers
- [ ] Real-time analytics and reporting
- [ ] Integration with health monitoring devices
- [ ] Telemedicine consultation features

### Phase 3: AI Enhancements
- [ ] Advanced pose detection algorithms
- [ ] Personalized exercise recommendations
- [ ] Predictive health analytics
- [ ] Voice-guided test instructions

### Phase 4: Enterprise Features
- [ ] Multi-tenant architecture
- [ ] HIPAA compliance
- [ ] Integration with EHR systems
- [ ] Advanced security features

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Team

FrailtyTester was developed by the Unforkgitable Capstone Team at Bellevue College.

**Team Members:**
- **Monica Nguyen** - [GitHub](https://github.com/Monica20030707)
- **Luke Brandes** - [GitHub](https://github.com/lbrandes3)
- **Shawn Men** - [GitHub](https://github.com/ZichenMen)
- **Deshawn Haas** - [GitHub](https://github.com/DeshawnHaas)

Special thanks to Prof. Wentao for guidance and support.

## 📞 Support

For questions, issues, or contributions, please:
- Open an issue on GitHub
- Contact the development team
- Review the [DEVELOPMENT_GUIDE.md](DEVELOPMENT_GUIDE.md) for detailed technical information

---

**Built with ❤️ for better health outcomes**