import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginUser } from '../store/slices/userSlice';

const AuthSuccess = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        const userParam = searchParams.get('user');
        if (userParam) {
            try {
                const user = JSON.parse(decodeURIComponent(userParam));
                dispatch(loginUser(user));
                if (user.hasPersonalDetails) {
                    navigate('/profile');
                } else {
                    navigate('/personal-details');
                }
            } catch (err) {
                console.error('Error parsing user data:', err);
                navigate('/login');
            }
        } else {
            navigate('/login');
        }
    }, [searchParams, navigate, dispatch]);

    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="text-center">
                <h2 className="text-2xl font-bold text-gray-900">Signing you in...</h2>
                <p className="mt-2 text-gray-600">Please wait while we complete your authentication.</p>
            </div>
        </div>
    );
};

export default AuthSuccess;
