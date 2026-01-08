import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginUser } from '../store/slices/userSlice';
import { Mail, Facebook, Chrome } from 'lucide-react'; // Simulating Google icon with Chrome for now or custom svg
// Note: Lucide doesn't have a perfect "Google" icon, usually use a custom SVG for brand logos. 
// I will use an SVG for Google and Facebook to match the brand colors in the image if possible, 
// or style Lucide icons. The image showed colored logos. I'll use SVGs.

const GoogleIcon = () => (
    <svg className="w-5 h-5" viewBox="0 0 24 24">
        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
    </svg>
);

const FacebookIcon = () => (
    <svg className="w-5 h-5 text-[#1877F2]" fill="currentColor" viewBox="0 0 24 24">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.791-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
);

const Signup = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        age: '',
        password: ''
    });

    const [passwordStrength, setPasswordStrength] = useState(0);
    const [passwordSuggestions, setPasswordSuggestions] = useState([]);

    const [error, setError] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const apiBase = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';

    const calculateStrength = (password) => {
        let strength = 0;
        const suggestions = [];

        if (password.length >= 8) strength++;
        else suggestions.push("Use at least 8 characters");

        if (/[A-Z]/.test(password)) strength++;
        else suggestions.push("Include at least one uppercase letter");

        if (/[a-z]/.test(password)) strength++;
        else suggestions.push("Include at least one lowercase letter");

        if (/[0-9]/.test(password)) strength++;
        else suggestions.push("Include at least one number");

        if (/[^A-Za-z0-9]/.test(password)) strength++;
        else suggestions.push("Include at least one special character");

        setPasswordStrength(strength);
        setPasswordSuggestions(suggestions);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });

        if (name === 'password') {
            calculateStrength(value);
        }
    };

    // ... handle submit ...

    const getStrengthColor = () => {
        switch (passwordStrength) {
            case 0:
            case 1: return 'bg-red-500';
            case 2: return 'bg-orange-500';
            case 3: return 'bg-yellow-500';
            case 4:
            case 5: return 'bg-green-500';
            default: return 'bg-gray-200';
        }
    };

    const getStrengthLabel = () => {
        switch (passwordStrength) {
            case 0: return 'Very Weak';
            case 1: return 'Weak';
            case 2: return 'Fair';
            case 3: return 'Good';
            case 4:
            case 5: return 'Strong';
            default: return '';
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        // 🔒 Enforce Password Strength
        if (formData.password.length < 8) {
            setError('Password must be at least 8 characters long.');
            return;
        }
        if (passwordStrength < 3) { // Requires at least "Good" strength (3/5)
            setError('Password is too weak. Please include a mix of uppercase, lowercase, numbers, or special characters.');
            return;
        }

        try {
            // Combine names for backend consistency
            const fullName = `${formData.firstName} ${formData.lastName}`.trim();

            const response = await fetch(`/api/auth/signup`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include', // Critical: Send and receive cookies
                body: JSON.stringify({
                    name: fullName,
                    email: formData.email,
                    password: formData.password
                }),
            });

            if (response.ok) {
                const data = await response.json();
                if (data.success) {
                    // Dispatch login to update Redux state immediately
                    if (data.user) {
                        dispatch(loginUser({
                            ...data.user,
                            hasPersonalDetails: false // New users don't have details
                        }));
                    }
                    navigate('/pricing');
                } else {
                    setError(data.message || 'Signup failed');
                }
            } else {
                // Handle non-200 responses (e.g., 400 Bad Request, 500 Server Error)
                const text = await response.text();
                console.error('Signup Error Response:', response.status, text);
                try {
                    const data = JSON.parse(text);
                    setError(data.message || `Signup failed with status: ${response.status}`);
                } catch (e) {
                    setError(`Server error (${response.status}): ${text.substring(0, 50)}...`);
                }
            }
        } catch (err) {
            console.error('Signup Network Error:', err);
            setError(`Network error: ${err.message}. Check console for details.`);
        }
    };

    return (
        <div className="min-h-screen flex flex-col bg-[#FBF9F6]"> {/* Matching background */}


            <div className="flex-grow flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-xl w-full space-y-8">
                    <div className="text-center">
                        <h2 className="text-3xl font-bold text-[#059669] font-montserrat mb-8"> {/* Green Header */}
                            Create An Account
                        </h2>
                    </div>

                    <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                        <div className="space-y-5">

                            {/* First Name */}
                            <div>
                                <label htmlFor="firstName" className="block text-sm font-semibold text-gray-800 mb-2">
                                    First Name*
                                </label>
                                <input
                                    id="firstName"
                                    name="firstName"
                                    type="text"
                                    required
                                    value={formData.firstName}
                                    onChange={handleChange}
                                    className="appearance-none relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-400 text-gray-900 rounded-lg focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500 sm:text-sm italic"
                                    placeholder="First Name"
                                />
                            </div>

                            {/* Last Name */}
                            <div>
                                <label htmlFor="lastName" className="block text-sm font-semibold text-gray-800 mb-2">
                                    Last Name*
                                </label>
                                <input
                                    id="lastName"
                                    name="lastName"
                                    type="text"
                                    required
                                    value={formData.lastName}
                                    onChange={handleChange}
                                    className="appearance-none relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-400 text-gray-900 rounded-lg focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500 sm:text-sm italic"
                                    placeholder="Last Name"
                                />
                            </div>

                            {/* Age */}
                            <div>
                                <label htmlFor="age" className="block text-sm font-semibold text-gray-800 mb-2">
                                    Your Age*
                                </label>
                                <input
                                    id="age"
                                    name="age"
                                    type="number"
                                    required
                                    value={formData.age}
                                    onChange={handleChange}
                                    className="appearance-none relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-400 text-gray-900 rounded-lg focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500 sm:text-sm italic"
                                    placeholder="Age"
                                />
                            </div>

                            {/* Email & Password (Required for functionality, kept clean) */}
                            <div>
                                <label htmlFor="email" className="block text-sm font-semibold text-gray-800 mb-2">
                                    Email Address*
                                </label>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    required
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="appearance-none relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-400 text-gray-900 rounded-lg focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500 sm:text-sm italic"
                                    placeholder="email@example.com"
                                />
                            </div>

                            <div>
                                <label htmlFor="password" className="block text-sm font-semibold text-gray-800 mb-2">
                                    Password*
                                </label>
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    required
                                    value={formData.password}
                                    onChange={handleChange}
                                    className="appearance-none relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-400 text-gray-900 rounded-lg focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500 sm:text-sm italic"
                                    placeholder="••••••••"
                                />
                                {/* Password Strength Meter */}
                                {formData.password && (
                                    <div className="mt-2">
                                        <div className="flex justify-between items-center mb-1">
                                            <span className="text-xs font-semibold text-gray-600">
                                                Strength: <span className={getStrengthColor().replace('bg-', 'text-')}>{getStrengthLabel()}</span>
                                            </span>
                                        </div>
                                        <div className="w-full bg-gray-200 rounded-full h-1.5 dark:bg-gray-700">
                                            <div
                                                className={`h-1.5 rounded-full transition-all duration-300 ${getStrengthColor()}`}
                                                style={{ width: `${Math.min((passwordStrength / 5) * 100, 100)}%` }}
                                            ></div>
                                        </div>
                                        {passwordSuggestions.length > 0 && (
                                            <ul className="mt-2 text-xs text-gray-500 list-disc list-inside">
                                                {passwordSuggestions.map((suggestion, index) => (
                                                    <li key={index}>{suggestion}</li>
                                                ))}
                                            </ul>
                                        )}
                                    </div>
                                )}
                            </div>

                            {/* Disclaimer Text */}
                            <div className="text-sm text-gray-600 space-y-2 mt-4">
                                <p>
                                    Note: Current models are not well calibrated for estimating life expectancy of individuals below 18 years of age.
                                </p>
                                <p>
                                    By clicking sign up, you agree to our <a href="#" className="text-green-600 underline font-semibold">Terms of Use</a> and acknowledge that you have read it.
                                </p>
                            </div>

                            {/* Error Message */}
                            {error && (
                                <div className="text-red-500 text-sm text-center">
                                    {error}
                                </div>
                            )}

                            {/* Buttons */}
                            <div className="space-y-4 pt-4">
                                <button
                                    type="submit"
                                    className="w-full flex justify-center items-center px-4 py-3 border border-green-500 text-sm font-medium rounded-full text-green-700 bg-white hover:bg-green-50 focus:outline-none transition-colors"
                                >
                                    Sign Up (Protected)
                                </button>

                                <a
                                    href={`${apiBase}/api/auth/google`}
                                    className="w-full flex justify-center items-center px-4 py-3 border border-green-500 text-sm font-medium rounded-full text-green-700 bg-white hover:bg-green-50 focus:outline-none transition-colors gap-2"
                                >
                                    <GoogleIcon />
                                    Sign Up with Google
                                </a>

                                <a
                                    href={`${apiBase}/api/auth/facebook`}
                                    className="w-full flex justify-center items-center px-4 py-3 border border-green-500 text-sm font-medium rounded-full text-green-700 bg-white hover:bg-green-50 focus:outline-none transition-colors gap-2"
                                >
                                    <FacebookIcon />
                                    Sign Up with Facebook
                                </a>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Signup;
