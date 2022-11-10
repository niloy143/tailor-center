import React from 'react';
import Navigation from './Navigation';
import FooterSection from './FooterSection';
import useTitle from '../customHooks/useTitle';

const ErrorPage = () => {
    useTitle('Page Not Found')
    return (
        <div>
            <Navigation />
            <p className='h-screen text-3xl my-12 font-semibold text-center text-gray-400'>Page Not Found</p>
            <FooterSection />
        </div>
    );
};

export default ErrorPage;