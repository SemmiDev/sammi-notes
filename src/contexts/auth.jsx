import { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../services/supabase';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }) {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [cookies, setCookie] = useCookies(['auth']);

    function handleCookie({ name, value, expires_at }) {
        setCookie(name, value, {
            path: '/',
            maxAge: expires_at,
            sameSite: 'lax',
        });
    }

    function signOut() {
        setCookie('auth', null, {
            path: '/',
            maxAge: 0,
            sameSite: 'lax',
        });

        supabase.auth.signOut().then(() => {
            navigate('/');
        });
    }

    // https://supabase.com/docs/guides/auth/auth-google
    async function signInWithGoogle() {
        const { data, error } = await supabase.auth.signInWithOAuth({
            provider: 'google',
        });

        if (!error) {
            handleCookie({
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
        }
    }

    useEffect(() => {
        // Check active sessions and sets the user
        const session = supabase.auth.getSession();

        // setUser(session.user ?? null); // If there is a user, set it, otherwise set it to null
        setLoading(false);

        // Listen for changes on auth state (logged in, signed out, etc.)
        const { data } = supabase.auth.onAuthStateChange(
            async (event, session) => {
                // setUser(session.user ?? null); // If there is a user, set it, otherwise set it to null);

                if (session.user) {
                    handleCookie({
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
                setLoading(false);
            }
        );

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
        signOut,
        cookies,
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
}
