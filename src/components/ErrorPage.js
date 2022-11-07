import React from 'react';
import Navigation from './Navigation';

const ErrorPage = () => {
    return (
        <div>
            <Navigation />
            <p className='text-3xl my-12 font-semibold text-center text-gray-400'>Page Not Found</p>
        </div>
    );
};

export default ErrorPage;