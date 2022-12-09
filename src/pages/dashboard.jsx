import Navbar from '../components/navbar';
import { useAuth } from '../contexts/auth';
import MainLayout from '../layouts/main';

export default function Dashboard() {
    const { cookies } = useAuth();

    return (
        <MainLayout>
            <Navbar />
            <h1 className='text-black m-5 font-bold text-xl'>
                Welcome {cookies.auth?.email}
            </h1>
        </MainLayout>
    );
}
