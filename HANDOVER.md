# Project Handover Guide

**Date:** January 08, 2026
**Author:** Koushik (Intern)
**Repository:** [https://github.com/koushik717/frailty-tester](https://github.com/koushik717/frailty-tester)
**Branch:** `koushik-dev` (Latest development branch)

## Executive Summary
This project is a MERN stack application designed to assess frailty in users through various interactive tests (Reaction Time, Balance, Hearing, Memory, etc.). The application features a robust authentication system (Local + OAuth), a subscription model, and a comprehensive dashboard for tracking results.

## Current Status
- **Frontend:** React + Vite. Fully functional with advanced UI/UX (animations, glassmorphism).
- **Backend:** Node.js + Express. Implements RESTful APIs for auth and user data. Use `sqlite3` for local development.
- **Database:** SQLite (local). Configured for easy migration to PostgreSQL/MongoDB if needed.
- **Deployment:**
    - Frontend: Vercel (configured with `vercel.json`)
    - Backend: Currently local, needs deployment (e.g., Render, Railway).

## Critical Next Steps for the Incoming Developer
1. **Deploy Backend:** The backend is currently running locally. You need to deploy it to a cloud provider and update the `VITE_API_URL` in the frontend `.env`.
2. **Database Migration:** For production, migrate from SQLite to a robust database like PostgreSQL or MongoDB.
3. **Payment Integration:** The "Subscription" page is UI-only. Integrate Stripe or Razorpay for actual payments.
4. **Email Service:** Configure `nodemailer` with real SMTP credentials for password resets.

## Key Resources
- **Design Assets:** See `src/assets` and `src/styles`.
- **Environment Variables:**
    - Frontend: `.env` (needs `VITE_API_BASE_URL`, `VITE_GOOGLE_CLIENT_ID`)
    - Backend: `backend/.env` (needs `JWT_SECRET`, `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`)

## Getting Help
- Check `docs/ARCHITECTURE.md` for system design.
- Check `docs/TEST_MODULES.md` for specific test logic.
