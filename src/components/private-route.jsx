import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/auth';

export const PrivateRoute = ({ children }) => {
    const navigate = useNavigate();
    const { cookies } = useAuth();

    useEffect(() => {
        if (!cookies.auth) navigate('/login');
    }, []);

    return children;
};
