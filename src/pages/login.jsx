import { useState, useRef, useEffect } from 'react';
import Navbar from '../components/navbar';
import Spinner, { EyeCloseIcon, EyeOpenIcon } from '../components/icons';
import MainLayout from '../layouts/main';
import { validateEmail, validatePassword } from '../utils/validation';

import { useAuth } from '../contexts/auth';
import { useNavigate } from 'react-router-dom';

export default function Login() {
    const [isLoading, setIsLoading] = useState(false);
    const [enableSubmitButton, setEnableSubmitButton] = useState(false);
    const [errorMessage, setErrorMessage] = useState({
        loginProcess: '',
        email: '',
        password: '',
    });

    const isEmptyErrorMessage = ({ errorMessage }) => {
        for (const key in errorMessage) {
            if (errorMessage[key] !== '') {
                return false;
            }
        }
        return true;
    };

    const [isProcessed, setIsProcessed] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const emailRef = useRef(null);
    const passwordRef = useRef(null);

    const clearErrorMessage = () => {
        setErrorMessage({
            loginProcess: '',
            email: '',
            password: '',
        });

        emailRef.current.style.border = '2px solid black';
        passwordRef.current.style.border = '2px solid black';
    };

    const { cookies, signInWithEmailPassword, signInWithGoogle } = useAuth();
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        clearErrorMessage();
        setIsLoading(true);

        const { error } = await signInWithEmailPassword({
            email,
            password,
        });
        if (error) {
            setErrorMessage(() => ({
                loginProcess: error.message,
            }));
        } else {
            navigate('/');
        }

        setIsProcessed(true);
        setIsLoading(false);
    };

    useEffect(() => {
        if (cookies.auth) navigate('/');
    }, []);

    // use effect for check if errorMessages is empty
    useEffect(() => {
        const isEmpty = isEmptyErrorMessage({ errorMessage });
        if (isEmpty) {
            setEnableSubmitButton(true);
        }
    }, [errorMessage]);

    return (
        <MainLayout>
            <Navbar active='sign-in' />
            <div className='flex flex-col justify-center items-center mt-8 pb-12'>
                <div className='p-8 bg-[#f9e1fa] w-[300px] md:w-[350px] border-2 border-black mx-auto rounded-xl'>
                    <div className='mb-4'>
                        <h3 className='font-semibold text-2xl text-black'>
                            Sign In{' '}
                        </h3>
                        <p className='hover:text-purple-500 text-black'>
                            Please fill in this form to continue.
                        </p>
                    </div>

                    <form onSubmit={handleLogin}>
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
                                <div className='space-y-2'>
                                    <label
                                        htmlFor='password'
                                        className='mb-5 text-sm font-medium hover:text-purple-500 text-black tracking-wide'
                                    >
                                        Password{' '}
                                        <span className='text-xs text-red-500 italic tracking-normal'>
                                            {errorMessage.password}
                                        </span>
                                    </label>
                                    <div className='relative'>
                                        <input
                                            className=' w-full text-black bg-transparent px-3 py-2 border-2  border-black  rounded-lg focus:outline-none hover:shadow hover:shadow-black focus:shadow-black'
                                            type={
                                                showPassword
                                                    ? 'text'
                                                    : 'password'
                                            }
                                            id={'password'}
                                            placeholder='********'
                                            required={true}
                                            value={password}
                                            ref={passwordRef}
                                            onInput={(e) => {
                                                const { error, message } =
                                                    validatePassword(
                                                        e.target.value
                                                    );

                                                if (error) {
                                                    setErrorMessage(() => ({
                                                        password: message,
                                                    }));
                                                    passwordRef.current.style.border =
                                                        '2px solid red';
                                                } else {
                                                    setErrorMessage(() => ({
                                                        password: '',
                                                    }));
                                                    passwordRef.current.style.border =
                                                        '2px solid black';
                                                }
                                                setPassword(e.target.value);
                                            }}
                                        />
                                        <div
                                            className='absolute right-3 top-3 hover:cursor-pointer'
                                            onClick={() =>
                                                setShowPassword(!showPassword)
                                            }
                                        >
                                            {showPassword ? (
                                                <EyeCloseIcon className='w-5 h-5 text-black fill-current' />
                                            ) : (
                                                <EyeOpenIcon className='w-5 h-5 text-black fill-current' />
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <div className='flex items-center justify-between'>
                                    <div className='text-sm'>
                                        <a
                                            href='/reset-password'
                                            className='hover:text-purple-500 text-black'
                                        >
                                            Forgot your password?
                                        </a>
                                    </div>
                                </div>
                                <div className='flex flex-col gap-3'>
                                    {isProcessed ? (
                                        <p className='text-xs md:text-sm text-center text-purple-900'>
                                            {errorMessage.loginProcess}
                                            <span
                                                onClick={() => {
                                                    setIsProcessed(false);
                                                    setEmail('');
                                                    setPassword('');
                                                    setErrorMessage(() => ({
                                                        loginProcess: '',
                                                    }));
                                                    clearErrorMessage();
                                                }}
                                                className='hover:text-purple-500 hover:cursor-pointer text-black'
                                            >
                                                {' '}
                                                Try again
                                            </span>
                                        </p>
                                    ) : isLoading ? (
                                        <button className='w-full flex justify-center hover:shadow hover:shadow-black bg-tranparent p-2  border-2 border-black rounded-lg bg-purple-500 text-white tracking-wide font-bold shadow-sm cursor-pointer transition ease-in duration-100'>
                                            <Spinner />
                                        </button>
                                    ) : (
                                        <button
                                            disabled={!enableSubmitButton}
                                            type='submit'
                                            className='w-full flex justify-center hover:shadow hover:shadow-black bg-tranparent p-2 border-2 border-black rounded-lg bg-purple-500 text-white tracking-wide font-bold shadow-sm cursor-pointer transition ease-in duration-100'
                                        >
                                            <span>Sign In</span>
                                        </button>
                                    )}
                                </div>
                            </div>
                        </fieldset>
                    </form>

                    <button
                        onClick={signInWithGoogle}
                        className='w-full mt-3 flex items-center justify-center hover:shadow hover:shadow-black bg-tranparent p-2  border-2 border-black rounded-lg bg-white text-black tracking-wide font-bold shadow-sm cursor-pointer transition ease-in duration-100'
                    >
                        <svg
                            xmlns='http://www.w3.org/2000/svg'
                            viewBox='0 0 488 512'
                            className='h-4 w-4 fill-current text-slate-900'
                        >
                            <path d='M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z' />
                        </svg>
                        <span className='ml-2'>Continue with Google</span>
                    </button>
                </div>
            </div>
        </MainLayout>
    );
}
