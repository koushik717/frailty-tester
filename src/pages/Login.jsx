import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Mail, Lock, ArrowRight, ShieldCheck } from 'lucide-react';
import MetyButton from '../components/MetyButton'; // Assuming we can use this or replace
// Assuming MetyButton is a wrapper, but I will inline styles to be safe for glass effect if needed, 
// or I can check MetyButton content. For now I will plain button it to ensure HiFi
import { loginUser } from '../store/slices/userSlice';

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

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [error, setError] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const apiBase = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch(`/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // Critical: Send and receive cookies
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (data.success) {
        console.log('Login successful:', data);
        dispatch(loginUser(data.user));
        if (data.user.hasPersonalDetails) {
          navigate('/profile');
        } else {
          navigate('/personal-details');
        }
      } else {
        setError(data.message || 'Login failed');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('An error occurred. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-primary-100/40 rounded-full blur-[100px] mix-blend-multiply opacity-70 animate-float" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40vw] h-[40vw] bg-accent-100/30 rounded-full blur-[100px] mix-blend-multiply opacity-70 animate-float" style={{ animationDelay: '-3s' }} />
      </div>

      <div className="max-w-md w-full glass-card p-8 sm:p-10 rounded-3xl shadow-2xl relative z-10 mx-4">
        <div className="text-center mb-10">
          <div className="mx-auto w-12 h-12 bg-primary-100/50 rounded-xl flex items-center justify-center mb-4 text-primary-600">
            <ShieldCheck className="w-7 h-7" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 font-montserrat tracking-tight mb-2">
            Welcome Back
          </h2>
          <p className="text-sm text-gray-500">
            Sign in to access your health dashboard
          </p>
          {error && (
            <div className="mt-6 p-3 bg-red-50/50 border border-red-100 text-red-600 text-sm rounded-xl">
              {error}
            </div>
          )}
        </div>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-5">
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-1.5 ml-1">
                Email Address
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400 group-focus-within:text-primary-500 transition-colors" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full pl-11 pr-4 py-3.5 bg-gray-50/50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 sm:text-sm transition-all outline-none"
                  placeholder="name@example.com"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-1.5 ml-1">
                Password
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400 group-focus-within:text-primary-500 transition-colors" />
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-11 pr-4 py-3.5 bg-gray-50/50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 sm:text-sm transition-all outline-none"
                  placeholder="••••••••"
                />
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded cursor-pointer"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-600 cursor-pointer select-none">
                Remember me
              </label>
            </div>

            <div className="text-sm">
              <a href="#" className="font-semibold text-primary-600 hover:text-primary-700 transition-colors">
                Forgot password?
              </a>
            </div>
          </div>

          <button
            type="submit"
            className="w-full flex justify-center items-center py-3.5 px-4 rounded-xl text-sm font-bold text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 shadow-lg shadow-primary-500/30 transition-all hover:-translate-y-0.5"
          >
            Sign In <ArrowRight className="ml-2 h-4 w-4" />
          </button>
        </form>

        <div className="mt-8">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white/0 backdrop-blur-xl text-gray-500 bg-white">
                Or continue with
              </span>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-3">
            <a
              href={`${apiBase}/api/auth/google`}
              className="w-full flex items-center justify-center gap-3 px-4 py-3.5 border border-gray-200 rounded-xl shadow-sm bg-white hover:bg-gray-50 hover:border-gray-300 transition-all duration-200"
            >
              <GoogleIcon />
              <span className="text-sm font-semibold text-gray-700">Sign in with Google</span>
            </a>
            <a
              href={`${apiBase}/api/auth/facebook`}
              className="w-full flex items-center justify-center gap-3 px-4 py-3.5 border border-gray-200 rounded-xl shadow-sm bg-white hover:bg-gray-50 hover:border-gray-300 transition-all duration-200"
            >
              <FacebookIcon />
              <span className="text-sm font-semibold text-gray-700">Sign in with Facebook</span>
            </a>
          </div>
        </div>

        <div className="mt-8 text-center text-sm">
          <span className="text-gray-500">Don't have an account?</span>{' '}
          <Link to="/signup" className="font-semibold text-primary-600 hover:text-primary-700 transition-colors">
            Create free account
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
