import React from 'react';
import { Navigate } from 'react-router-dom';

import { useAuth } from '../contexts/auth';

export function PrivateRoute({ children }) {
    const { cookies } = useAuth();
    if (!cookies.auth) return <Navigate to='/login' replace={true} />;
    return children;
}
