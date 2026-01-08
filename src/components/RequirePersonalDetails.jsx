import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import { fetchPersonalDetails } from '../store/slices/userSlice';

const RequirePersonalDetails = ({ children }) => {
    const { isAuthenticated, personalDetails, isLoadingDetails } = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const location = useLocation();

    useEffect(() => {
        // If logged in but no details, try fetching them
        if (isAuthenticated && !personalDetails && !isLoadingDetails) {
            dispatch(fetchPersonalDetails());
        }
    }, [isAuthenticated, personalDetails, isLoadingDetails, dispatch]);

    // If not authenticated, let the auth guard handle it (or redirect to home/login)
    // Assuming this component is nested INSIDE an auth guard, or we handle it here:
    if (!isAuthenticated) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    // Debug logging
    useEffect(() => {
        console.log("RequirePersonalDetails Check:", {
            isAuthenticated,
            hasDetails: !!personalDetails,
            keys: personalDetails ? Object.keys(personalDetails) : [],
            personalDetails
        });
    }, [isAuthenticated, personalDetails]);

    if (isLoadingDetails) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#FBF9F6]">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-600"></div>
            </div>
        );
    }

    // Check if details exist and are complete (essential fields)
    const hasDetails = personalDetails &&
        personalDetails.gender &&
        personalDetails.dob &&
        personalDetails.height &&
        personalDetails.weight;

    if (!hasDetails) {
        // Redirect to personal details form
        return <Navigate to="/personal-details" replace />;
    }

    return children;
};

export default RequirePersonalDetails;
