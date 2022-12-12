import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/auth';

export const PrivateRoute = ({ children }) => {
    const navigate = useNavigate();
    const { authSession } = useAuth();

    useEffect(() => {
        const userId = authSession?.id;
        if (!userId) navigate('/login');
    }, []);

    return children;
};
