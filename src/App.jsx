import { Navigate, Route, Routes } from 'react-router-dom';
import { PrivateRoute } from './components/private-route';
import { AuthProvider } from './contexts/auth';
import Login from './pages/login';
import { CookiesProvider, useCookies } from 'react-cookie';
import Register from './pages/register';
import Dashboard from './pages/dashboard';
import ResetPassword from './pages/reset-password';
import NewNotes from './pages/new-notes';
import NotesDetails from './pages/notes-details';

function App() {
    return (
        <main>
            <CookiesProvider>
                <AuthProvider>
                    <Routes>
                        <Route
                            path='/'
                            element={
                                <PrivateRoute>
                                    <Dashboard />
                                </PrivateRoute>
                            }
                        />{' '}
                        <Route
                            path='/new-notes'
                            element={
                                // <PrivateRoute>
                                <NewNotes />
                                // </PrivateRoute>
                            }
                        />
                        <Route
                            path='/notes-details'
                            element={
                                // <PrivateRoute>
                                <NotesDetails />
                                // </PrivateRoute>
                            }
                        />
                        <Route path='login' element={<Login />} />
                        <Route path='register' element={<Register />} />
                        <Route
                            path='reset-password'
                            element={<ResetPassword />}
                        />
                        <Route path='*' element={<Navigate to='/' />} />
                    </Routes>
                </AuthProvider>
            </CookiesProvider>
        </main>
    );
}

export default App;
