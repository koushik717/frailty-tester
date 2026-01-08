# System Architecture

## Overview
The Frailty Tester application follows a standard **MERN-like** architecture (using SQLite instead of MongoDB for the current phase). It consists of a React frontend and an Express/Node.js backend.

## Frontend Architecture
- **Framework:** React 18 + Vite
- **State Management:** Redux Toolkit (`src/store`)
    - `userSlice`: Manages authentication state and user profile.
    - `testSlice`: Temporarily holds test results before submission.
    - `webcamSlice`: UI state for camera-based tests.
- **Routing:** React Router v6.
- **Styling:** Tailwind CSS + Vanilla CSS (for custom animations).
- **Mocking:** MSW (Mock Service Worker) is set up for development without a backend.

### Directory Structure (`src/`)
- `components/`: Reusable UI atoms (Buttons, Cards).
- `layout/`: Global layout components (Header, Footer).
- `pages/`: Route components.
    - `tests/`: specific implementations for each frailty test.
- `store/`: Redux setup.
- `utils/`: Helper functions (scoring logic, math).

## Backend Architecture
- **Framework:** Express.js
- **Database:** SQLite3 (`backend/data/frailty_test_results.db`)
    - *Note:* chosen for simplicity in MVP. Easily replaceable with PostgreSQL.
- **Authentication:** Passport.js
    - Strategies: `passport-local` (Email/Password), `passport-google-oauth20`, `passport-facebook`.
    - Sessions are managed via `express-session` and stored in memory (needs Redis for production).

## API Routes (`backend/routes/`)
- `/auth`: Login, Signup, OAuth endpoints.
- `/api/users`: specific user data handling.
- `/api/results`: POST/GET test results.

## Data Flow
1. **User Action:** User completes a test (e.g., Reaction Time).
2. **Local Processing:** Score is calculated independently on the client (`src/utils`).
3. **Submission:** Client sends POST request to `/api/results/save-result`.
4. **Storage:** Backend validates session and saves to SQLite `results` table.
