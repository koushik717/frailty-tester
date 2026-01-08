import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';

const RequireSubscription = ({ children }) => {
    const { isAuthenticated, user } = useSelector((state) => state.user);
    const location = useLocation();

    if (!isAuthenticated || !user) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    const hasActivePlan = user.subscription_plan &&
        user.subscription_status === 'Active';

    if (!hasActivePlan) {
        // Redirect to pricing if no active plan
        return <Navigate to="/pricing" replace />;
    }

    return children;
};

export default RequireSubscription;
