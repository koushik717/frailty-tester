import { http, HttpResponse } from 'msw'

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';

// Strip trailing slash if present for cleaner matching
const baseUrl = (path) => {
    const base = API_BASE.replace(/\/$/, '');
    // If path starts with /, append directly. If not, add /.
    // Actually simplest is to just use a wildcard matching or consistent base.
    // We'll try to match exact if possible.
    // Note: If API_BASE includes /api, we use it. 
    // Given vite.config.js has proxy /api -> localhost:3000, 
    // and local fetch calls use /api/auth/login.

    // If we are in "Demo Mode" on Vercel, there is no proxy.
    // The fetch calls will be to relative paths or absolute URLs.
    // We should match fairly loosely to catch both.

    return `${base}${path}`;
};

export const handlers = [
    // Login Handler
    http.post('*/api/auth/login', async ({ request }) => {
        const info = await request.json();

        // Allow any login for demo purposes
        return HttpResponse.json({
            success: true,
            user: {
                id: 'user_123',
                name: 'Demo User',
                email: info.email || 'demo@example.com',
                token: 'mock-jwt-token-12345'
            },
            message: 'Login successful (Demo Mode)'
        })
    }),

    // Get All Results Handler
    http.get('*/results', () => {
        return HttpResponse.json([
            {
                _id: '1',
                testType: 'ReactionTime',
                score: 250,
                date: new Date(Date.now() - 86400000 * 2).toISOString(), // 2 days ago
                metrics: { accuracy: 95 }
            },
            {
                _id: '2',
                testType: 'Balance',
                score: 85,
                date: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
                metrics: { stability: 0.8 }
            },
            {
                _id: '3',
                testType: 'GripStrength',
                score: 30,
                date: new Date().toISOString(), // Today
                metrics: { force: 30 }
            }
        ])
    }),

    // Save Result Handler
    http.post('*/results', async ({ request }) => {
        const newResult = await request.json();
        return HttpResponse.json({
            success: true,
            data: {
                ...newResult,
                _id: Math.random().toString(36).substr(2, 9),
                date: new Date().toISOString()
            }
        })
    }),

    // Handle other auth routes to avoid 404s in console
    http.get('*/api/auth/*', () => {
        return new HttpResponse(null, { status: 200 })
    })
]
