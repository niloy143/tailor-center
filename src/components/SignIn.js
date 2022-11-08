import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';

const SignIn = () => {
    const { state } = useLocation();
    return (
        <div className='flex justify-center'>
            <div className='p-5 shadow-md border rounded-md w-11/12 sm:w-2/3 lg:w-1/2 2xl:w-1/3 my-12' style={{ minWidth: '250px', maxWidth: '800px' }}>
                <h2 className='text-3xl text-slate-700 font-semibold text-center my-5'>Sign In</h2>
                <form className='flex flex-col gap-3 px-3'>
                    <input className='border-gray-400 border-t-0 border-r-0 border-l-4 focus:ring-0 shadow' type="email" name="email" placeholder='Email Address' />
                    <input className='border-gray-400 border-t-0 border-r-0 border-l-4 focus:ring-0 shadow' type="password" name="password" placeholder='Password' />
                    <button className='bg-orange-500 py-2 w-1/2 rounded font-semibold text-white mx-auto mt-3 mb-2 transition hover:scale-105 active:scale-100' type="submit">Sign In</button>
                </form>
                <p className='text-center mb-5'>Don't have any account? <NavLink to="/signup" state={state} className={`underline text-blue-600 hover:no-underline`}>Create One</NavLink>.</p>
            </div>
        </div>
    );
};

export default SignIn;