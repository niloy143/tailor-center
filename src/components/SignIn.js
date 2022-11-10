import { Spinner } from 'flowbite-react';
import React, { useContext, useState } from 'react';
import { Navigate, NavLink, useLocation } from 'react-router-dom';
import { TailorContext } from '../Contexts/Contexts';
import BodySpinner from './BodySpinner';
import { FcGoogle } from 'react-icons/fc';

const SignIn = () => {
    const { user, userLoading, signIn, googleSignIn, isValidImage, setNameAndPhoto, setUserLoading } = useContext(TailorContext);
    const [loading, setLoading] = useState(false);
    const [loginLoader, setLoginLoader] = useState(false);
    const [googleLoader, setGoogleLoader] = useState(false);
    const [emailErr, setEmailErr] = useState(false);
    const [passErr, setPassErr] = useState(false);
    const [scammer, setScammer] = useState(false);
    const { state } = useLocation();

    const setJWT = (result) => {
        const { displayName, email, uid } = result.user;
        const user = { displayName, email, uid }

        return fetch(`https://tailor-center-server.vercel.app/jwt`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)
        })
    }

    const handleSignIn = e => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;

        setLoading(true);
        setLoginLoader(true);
        signIn(email, password)
            .then(result => {
                setJWT(result)
                    .then(res => res.json())
                    .then(data => localStorage.setItem('tailor-center-user-token', data.token))
                    .catch(err => console.error(err))
                    .finally(() => {
                        setLoading(false);
                        setLoginLoader(false);
                    })
            })
            .catch(err => {
                console.error(err.code);
                setEmailErr(err.code === 'auth/user-not-found');
                setPassErr(err.code === 'auth/wrong-password');
                setScammer(err.code === 'auth/too-many-requests');
                setLoginLoader(false);
                setLoading(false);
            })
    }

    const handleGoogleSignIn = () => {
        setGoogleLoader(true);
        setLoading(true);
        googleSignIn()
            .then(result => {

                setJWT(result)
                    .then(res => res.json())
                    .then(data => localStorage.setItem('tailor-center-user-token', data.token))
                    .catch(err => console.error(err))
                    .finally(() => {
                        setLoading(false);
                        setGoogleLoader(false);
                    })

                if (result.user.photoURL) {
                    setUserLoading(true);
                    isValidImage(result.user.photoURL)
                        .then(res => {
                            if (!res) {
                                setNameAndPhoto(result.user.displayName, '')
                                    .then(() => { })
                                    .catch(err => {
                                        console.error(err.code)
                                    })
                                    .finally(() => setUserLoading(false))
                            }
                            else {
                                setUserLoading(false)
                            }
                        })
                        .catch(err => {
                            setUserLoading(true);
                            console.error(err.code)
                        })
                }
            })
            .catch(err => {
                console.error(err.code);
                setGoogleLoader(false);
                setLoading(false);
            })
    }

    return (
        userLoading ? <BodySpinner /> : user && !loading ? <Navigate to={state || '/'} /> :
            <div className='flex justify-center'>
                <div className='p-5 shadow-md border rounded-md w-11/12 sm:w-2/3 lg:w-1/2 2xl:w-1/3 my-12' style={{ minWidth: '250px', maxWidth: '800px' }}>
                    <h2 className='text-3xl text-slate-700 font-semibold text-center my-5'>Sign In</h2>
                    {
                        scammer && <p className='text-red-600 text-center mb-2'>Wrong password multiple times!</p>
                    }
                    <form className='flex flex-col gap-3 px-3' onSubmit={handleSignIn}>
                        <input className={`${emailErr ? 'border-red-600 focus:border-red-600' : 'border-gray-400'} border-t-0 border-r-0 border-l-4 focus:ring-0 shadow`} type="email" name="email" placeholder='Email Address' required onBlur={e => e.target.value === '' && setEmailErr(false)} />
                        <input className={`${passErr ? 'border-red-600 focus:border-red-600' : 'border-gray-400'} border-t-0 border-r-0 border-l-4 focus:ring-0 shadow`} type="password" name="password" placeholder='Password' required onBlur={e => e.target.value === '' && setPassErr(false)} />
                        <button className={`${loading ? 'cursor-not-allowed bg-orange-400' : 'bg-orange-500'} py-2 w-1/2 rounded font-semibold text-white mx-auto mt-3 mb-2 transition ${!loading && 'hover:scale-105 active:scale-100'}`} type="submit" disabled={loading}>Sign In {loginLoader && <Spinner size="sm" className='ml-1' />} </button>
                    </form>
                    <p className='text-center mb-5'>Don't have any account? <NavLink to="/signup" state={state} className={`underline text-blue-600 hover:no-underline`}>Create One</NavLink>.</p>
                    <h2 className='text-2xl font-semibold text-gray-400 text-center my-5 '>OR</h2>
                    <button className={`flex items-center w-72 mx-auto mb-5 border rounded-md px-5 py-3 text-lg font-semibold ${loading ? 'cursor-not-allowed text-gray-500' : 'shadow-md hover:bg-gray-50 active:shadow-none'}`} disabled={loading} onClick={handleGoogleSignIn}>  {googleLoader ? <Spinner /> : <FcGoogle className='text-3xl' />} <span className='grow text-center'>Sign In With Google </span></button>
                </div>
            </div>
    );
};

export default SignIn;