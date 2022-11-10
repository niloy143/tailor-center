import { Spinner } from 'flowbite-react';
import React, { useContext, useState } from 'react';
import { Navigate, NavLink, useLocation } from 'react-router-dom';
import { TailorContext } from '../Contexts/Contexts';
import BodySpinner from './BodySpinner';

const SignUp = () => {
    const { isValidImage, createUser, setNameAndPhoto, user, userLoading } = useContext(TailorContext);
    const { state } = useLocation();
    const [loading, setLoading] = useState(false);
    const [imgErr, setImgErr] = useState(false);
    const [passErr, setPassErr] = useState(false);
    const [passMatchErr, setPassMatchErr] = useState(false);
    const [emailErr, setEmailErr] = useState(false);

    const handleSignUp = e => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const email = form.email.value;
        const photoURL = form.photoURL.value;
        const password = form.password.value;
        const confirm = form.confirm.value;
        setPassMatchErr(password !== confirm);

        if (!imgErr && password === confirm) {
            setLoading(true);
            createUser(email, password)
                .then(result => {
                    setNameAndPhoto(name, photoURL)
                        .then(() => { })
                        .catch(err => console.error(err))
                        .finally(() => {
                            const { displayName, email, uid } = result.user;
                            const user = { displayName, email, uid }
                            fetch(`https://tailor-center-server.vercel.app/jwt`, {
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
                })
                .catch(err => {
                    console.error(err.code);
                    setEmailErr(err.code === 'auth/invalid-email' || err.code === 'auth/email-already-in-use');
                    (err.code === 'auth/weak-password') && setPassErr(true);
                    setLoading(false);
                })
        }
    }

    const checkImg = e => {
        const url = e.target.value;
        if (url !== '') {
            setImgErr(true)
            isValidImage(url)
                .then(res => setImgErr(!res))
                .catch(err => console.error(err.code))
        }
        else {
            setImgErr(false)
        }
    }

    return (
        userLoading ? <BodySpinner /> : user && !loading ? <Navigate to={state || '/'} /> :
            <div className='flex justify-center'>
                <div className='p-5 shadow-md border rounded-md w-11/12 sm:w-2/3 lg:w-1/2 2xl:w-1/3 my-12' style={{ minWidth: '250px', maxWidth: '800px' }}>
                    <h2 className='text-3xl text-slate-700 font-semibold text-center my-5'>Create Account</h2>
                    <form className='flex flex-col gap-3 px-3' onSubmit={handleSignUp}>
                        <input className='border-gray-400 border-t-0 border-r-0 border-l-4 focus:ring-0 shadow' type="text" name="name" placeholder='Your full name' required />
                        <input className={`${imgErr ? 'border-red-600 focus:border-red-600' : 'border-gray-400'} border-t-0 border-r-0 border-l-4 focus:ring-0 shadow`} type="text" name="photoURL" placeholder='Profile Photo URL' onChange={checkImg} />
                        <input className={`${emailErr ? 'border-red-600 focus:border-red-600' : 'border-gray-400'} border-t-0 border-r-0 border-l-4 focus:ring-0 shadow`} type="email" name="email" placeholder='Email address' required />
                        <input className={`${passErr ? 'border-red-600 focus:border-red-600' : 'border-gray-400'} border-t-0 border-r-0 border-l-4 focus:ring-0 shadow`} type="password" name="password" placeholder='Password' required />
                        <input className={`${passMatchErr ? 'border-red-600 focus:border-red-600' : 'border-gray-400'} border-t-0 border-r-0 border-l-4 focus:ring-0 shadow`} type="password" name="confirm" placeholder='Repeat password' />
                        <button className={`${loading ? 'cursor-not-allowed bg-orange-400' : 'bg-orange-500'} py-2 w-1/2 rounded font-semibold text-white mx-auto mt-3 mb-2 transition ${!loading && 'hover:scale-105 active:scale-100'}`} type="submit" disabled={loading} >Create {loading && <Spinner size="sm" className='ml-1' />} </button>
                    </form>
                    <p className='text-center mb-5'>Already have an account? <NavLink to="/signin" state={state} className={`underline text-blue-600 hover:no-underline`}>Sign In</NavLink>.</p>
                </div>
            </div>
    );
};

export default SignUp;