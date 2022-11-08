import { Spinner } from 'flowbite-react';
import React, { useContext, useState } from 'react';
import { Navigate, NavLink, useLocation } from 'react-router-dom';
import { TailorContext } from '../Contexts/Contexts';
import BodySpinner from './BodySpinner';

const SignIn = () => {
    const { user, userLoading, signIn } = useContext(TailorContext);
    const [loading, setLoading] = useState(false);
    const [emailErr, setEmailErr] = useState(false);
    const [passErr, setPassErr] = useState(false);
    const [scammer, setScammer] = useState(false);
    const { state } = useLocation();

    const handleSignIn = e => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;

        setLoading(true);
        signIn(email, password)
            .then(result => {
                const { displayName, email, uid } = result.user;
                const user = { displayName, email, uid }
                fetch(`http://localhost:1234/jwt`, {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify(user)
                })
                    .then(res => res.json())
                    .then(data => localStorage.setItem('tailor-center-user-token', data.token))
                    .catch(err => console.error(err))
                    .finally(() => setLoading(false))
            })
            .catch(err => {
                console.error(err.code);
                setEmailErr(err.code === 'auth/user-not-found');
                setPassErr(err.code === 'auth/wrong-password');
                setScammer(err.code === 'auth/too-many-requests');
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
                        <input className={`${emailErr ? 'border-red-600 focus:border-red-600' : 'border-gray-400'} border-t-0 border-r-0 border-l-4 focus:ring-0 shadow`} type="email" name="email" placeholder='Email Address' required />
                        <input className={`${passErr ? 'border-red-600 focus:border-red-600' : 'border-gray-400'} border-t-0 border-r-0 border-l-4 focus:ring-0 shadow`} type="password" name="password" placeholder='Password' required />
                        <button className={`${loading ? 'cursor-not-allowed bg-orange-400' : 'bg-orange-500'} py-2 w-1/2 rounded font-semibold text-white mx-auto mt-3 mb-2 transition ${!loading && 'hover:scale-105 active:scale-100'}`} type="submit" disabled={loading}>Sign In {loading && <Spinner size="sm" className='ml-1' />} </button>
                    </form>
                    <p className='text-center mb-5'>Don't have any account? <NavLink to="/signup" state={state} className={`underline text-blue-600 hover:no-underline`}>Create One</NavLink>.</p>
                </div>
            </div>
    );
};

export default SignIn;