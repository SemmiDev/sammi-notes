import { useEffect, useRef, useState } from 'react';
import Navbar from '../components/navbar';
import { SpinnerIcon } from '../components/icons';
import MainLayout from '../layouts/main';
import { validateEmail, validatePassword } from '../utils/validation';
import { supabase } from '../services/supabase';
import { useAuth } from '../contexts/auth';

export default function ResetPassword() {
    const { signOut, resetPasswordForEmail } = useAuth();

    const [isLoading, setIsLoading] = useState(false);
    const [email, setEmail] = useState('');
    const emailRef = useRef(null);

    const [errorMessage, setErrorMessage] = useState({
        resetMsg: '',
        email: '',
    });

    const handleResetPassword = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        const error = await resetPasswordForEmail({ email });
        if (error) {
            setErrorMessage({
                resetMsg: error.message,
            });
        } else {
            setErrorMessage({
                resetMsg:
                    'Check your email for the link to reset your password.',
            });
        }

        setIsLoading(false);
    };

    /**
     * SOnce the user is redirected back to your application,
     * ask the user to reset their password.
     */
    useEffect(() => {
        supabase.auth.onAuthStateChange(async (event, session) => {
            if (event == 'PASSWORD_RECOVERY') {
                let newPassword = '';
                let valid = false;
                while (!valid) {
                    newPassword = prompt(
                        'New passsword (Min 8, UPPER/lowercase and numbers)'
                    );
                    // validate password
                    const { message, error } = validatePassword(newPassword);
                    if (error) {
                        alert(message);
                    } else {
                        valid = true;
                    }
                }

                const { data, error } = await supabase.auth.updateUser({
                    password: newPassword,
                });

                if (data) alert('Password updated successfully!');
                if (error) alert('There was an error updating your password.');
                signOut();
            }
        });
    }, []);

    return (
        <MainLayout>
            <Navbar active='sign-in' />
            <div className='flex flex-col justify-center items-center mt-8 pb-12'>
                <div className='p-8 bg-[#f9e1fa] w-[300px] md:w-[350px] border-2 border-black mx-auto rounded-xl'>
                    <div className='mb-4'>
                        <h3 className='font-semibold text-2xl text-black'>
                            Reset Password{' '}
                        </h3>
                        <p className='hover:text-purple-500 text-black'>
                            Please enter your email address to reset your
                            password.
                        </p>
                    </div>

                    <form onSubmit={handleResetPassword}>
                        <fieldset disabled={isLoading}>
                            <div className='space-y-5'>
                                <div className='space-y-2'>
                                    <label
                                        htmlFor='email'
                                        className='text-sm font-medium hover:text-purple-500 text-black tracking-wide'
                                    >
                                        Email{' '}
                                        <span className='text-xs text-red-500 italic tracking-normal'>
                                            {errorMessage.email}
                                        </span>
                                    </label>
                                    <input
                                        className=' w-full text-black bg-transparent px-3 py-2 border-2  border-black  rounded-lg focus:outline-none hover:shadow hover:shadow-black focus:shadow-black'
                                        type='email'
                                        id={'email'}
                                        placeholder='sammi@gmail.com'
                                        required={true}
                                        autoFocus={true}
                                        value={email}
                                        ref={emailRef}
                                        onInput={(e) => {
                                            const { error, message } =
                                                validateEmail(e.target.value);

                                            if (error) {
                                                setErrorMessage(() => ({
                                                    email: message,
                                                }));
                                                emailRef.current.style.border =
                                                    '2px solid red';
                                            } else {
                                                setErrorMessage(() => ({
                                                    email: '',
                                                }));
                                                emailRef.current.style.border =
                                                    '2px solid black';
                                            }
                                            setEmail(e.target.value);
                                        }}
                                    />
                                </div>
                                <div className='flex flex-col gap-3'>
                                    {errorMessage.resetMsg != '' && (
                                        <div className='text-sm text-slate-900 text-center'>
                                            {errorMessage.resetMsg}
                                        </div>
                                    )}

                                    {isLoading ? (
                                        <button className='w-full flex justify-center hover:shadow hover:shadow-black bg-tranparent p-2  border-2 border-black rounded-lg bg-purple-500 text-white tracking-wide font-bold shadow-sm cursor-pointer transition ease-in duration-100'>
                                            <SpinnerIcon />
                                        </button>
                                    ) : (
                                        <button
                                            type='submit'
                                            className='w-full flex justify-center hover:shadow hover:shadow-black bg-tranparent p-2 border-2 border-black rounded-lg bg-purple-500 text-white tracking-wide font-bold shadow-sm cursor-pointer transition ease-in duration-100'
                                        >
                                            <span>Reset</span>
                                        </button>
                                    )}
                                </div>
                            </div>
                        </fieldset>
                    </form>
                </div>
            </div>
        </MainLayout>
    );
}
