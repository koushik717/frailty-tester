# Google OAuth Setup Instructions

## Prerequisites
You need to create Google OAuth credentials before the authentication will work.

## Step 1: Create Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Click "Select a project" → "New Project"
3. Enter project name (e.g., "FrailtyTester") → Click "Create"

## Step 2: Enable Google+ API

1. In the left sidebar, go to "APIs & Services" → "Library"
2. Search for "Google+ API"
3. Click on it and press "Enable"

##Step 3: Create OAuth Credentials

1. Go to "APIs & Services" → "Credentials"
2. Click "+ CREATE CREDENTIALS" → "OAuth client ID"
3. If prompted, configure the OAuth consent screen first:
   - Choose "External" → Click "Create"
   - Fill in:
     - App name: `FrailtyTester`
     - User support email: Your email
     - Developer contact: Your email
   - Click "Save and Continue" through the remaining steps
4. Back to "Create OAuth client ID":
   - Application type: **Web application**
   - Name: `FrailtyTester Web Client`
   - Authorized redirect URIs:
     - Click "+ ADD URI"
     - Enter: `http://localhost:3000/api/auth/google/callback`
   - Click "Create"
5. Copy the **Client ID** and **Client Secret**

## Step 4: Configure Backend

1. Create a `.env` file in the `backend` directory:
   ```bash
   cd /Users/koushik/Desktop/FrailtyTester/backend
   touch .env
   ```

2. Add your Google credentials to `.env`:
   ```
   GOOGLE_CLIENT_ID=your_client_id_here
   GOOGLE_CLIENT_SECRET=your_client_secret_here
   SESSION_SECRET=some_random_secret_string_here
   ```

3. Restart the backend server:
   ```bash
   # Kill the current server
   # Then run:
   node server.js
   ```

## Step 5: Test Google Login

1. Go to http://localhost:5173/login
2. Click "Sign in with Google"
3. You should be redirected to Google's login page
4. After authorizing, you'll be redirected back to the app
5. You should be logged in with your Google account

## Troubleshooting

- **Error 400: redirect_uri_mismatch**: Make sure the redirect URI in Google Cloud Console exactly matches `http://localhost:3000/api/auth/google/callback`
- **Error: Cannot find module 'dotenv'**: The package should already be installed, but if not, run `npm install dotenv` in the backend directory
- **Session issues**: Make sure cookies are enabled in your browser

## Production Deployment

For production, you'll need to:
1. Add your production domain to authorized redirect URIs in Google Cloud Console
2. Update the callback URL in `googleAuth.js` to use your production domain
3. Set `cookie: { secure: true }` in `server.js` session config (requires HTTPS)
