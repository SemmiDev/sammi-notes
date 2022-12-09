import { useAuth } from '../contexts/auth';

export default function Navbar({ active }) {
    const { cookies, signOut } = useAuth();

    return (
        <div className='navbar bg-[#fefffe] border border-b-2 border-black  px-12 md:px-16 lg:px-36 text-black'>
            <div className='flex-1'>
                <a className='btn btn-ghost normal-case text-xl'>
                    <div className='flex gap-2 items-center'>
                        <svg
                            xmlns='http://www.w3.org/2000/svg'
                            viewBox='0 0 448 512'
                            className='w-5 h-5'
                        >
                            <path d='M96 0C43 0 0 43 0 96V416c0 53 43 96 96 96H384h32c17.7 0 32-14.3 32-32s-14.3-32-32-32V384c17.7 0 32-14.3 32-32V32c0-17.7-14.3-32-32-32H384 96zm0 384H352v64H96c-17.7 0-32-14.3-32-32s14.3-32 32-32zm32-240c0-8.8 7.2-16 16-16H336c8.8 0 16 7.2 16 16s-7.2 16-16 16H144c-8.8 0-16-7.2-16-16zm16 48H336c8.8 0 16 7.2 16 16s-7.2 16-16 16H144c-8.8 0-16-7.2-16-16s7.2-16 16-16z' />
                        </svg>
                        <a href='/' className='font-bold text-xl text-black'>
                            Sammi <span className='text-purple-500'>Notes</span>
                        </a>
                    </div>
                </a>
            </div>
            <div className='flex-none'>
                <ul className='menu menu-horizontal p-0'>
                    <li>
                        {!cookies.auth ? (
                            <a
                                href={
                                    active == 'sign-in' ? '/register' : '/login'
                                }
                                className='px-2 py-1 font-semibold text-sm bg-transparent border border-purple-500 shadow-sm shadow-purple-600 text-purple-700 hover:shadow-purple-800 rounded-lg'
                            >
                                {active == 'sign-in' ? 'Sign Up' : 'Sign In'}
                            </a>
                        ) : (
                            <div
                                onClick={signOut}
                                className='px-2 py-1 font-semibold text-sm bg-transparent border border-red-500 shadow-sm shadow-red-600 text-red-700 hover:shadow-red-800 rounded-lg'
                            >
                                Log Out
                            </div>
                        )}
                    </li>
                </ul>
            </div>
        </div>
    );
}
