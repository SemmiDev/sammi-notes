import { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../services/supabase';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import { redirectResetPasswordUrl } from '../services/env';

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const navigate = useNavigate();

    const [loading, setLoading] = useState(true);
    const [cookies, setCookie] = useCookies(['auth']);

    const handleSetCookie = ({ name, value, expires_at }) => {
        setCookie(name, value, {
            path: '/',
            maxAge: expires_at,
            sameSite: 'lax',
        });
    };

    const signOut = async () => {
        handleSetCookie({
            name: 'auth',
            value: '',
            expires_at: 0,
        });

        await supabase.auth.signOut().then(() => {
            navigate('/login');
        });
    };

    // https://supabase.com/docs/guides/auth/auth-google
    const signInWithGoogle = async () => {
        const { data, error } = await supabase.auth.signInWithOAuth({
            provider: 'google',
        });

        if (!error) {
            handleSetCookie({
                name: 'auth',
                value: JSON.stringify({
                    id: data.user.id,
                    email: data.user.email,
                    access_token: data.access_token,
                    refresh_token: data.refresh_token,
                    is_logged_in: true,
                }),
                expires_at: data.expires_at,
            });
        } else {
            // if there is an error, redirect to login page to try again
            navigate('/login');
        }
        navigate('/');
    };

    const resetPasswordForEmail = async ({ email }) => {
        // const { data, error } = await supabase.auth.resetPasswordForEmail(
        const redirectTo = redirectResetPasswordUrl + '/reset-password';
        console.log(redirectTo);
        const { error } = await supabase.auth.resetPasswordForEmail(email, {
            redirectTo: redirectTo,
        });
        return error;
    };

    useEffect(() => {
        // Listen for changes on auth state (logged in, signed out, etc.)
        const { data } = supabase.auth.onAuthStateChange(
            async (event, session) => {
                if (session.user) {
                    handleSetCookie({
                        name: 'auth',
                        value: JSON.stringify({
                            id: session.user.id,
                            email: session.user.email,
                            access_token: session.access_token,
                            refresh_token: session.refresh_token,
                            is_logged_in: true,
                        }),
                        expires_at: session.expires_at,
                    });
                }
            }
        );

        setLoading(false);

        return () => {
            data.subscription.unsubscribe();
        };
    }, []);

    // Will be passed down to Signup, Login and Dashboard components
    const value = {
        signUp: (data) => supabase.auth.signUp(data),
        signInWithEmailPassword: (data) =>
            supabase.auth.signInWithPassword(data),
        signInWithGoogle,
        resetPasswordForEmail,
        signOut,
        cookies,
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};
