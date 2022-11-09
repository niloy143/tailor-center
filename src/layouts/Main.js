import React from 'react';
import { Outlet } from 'react-router-dom';
import FooterSection from '../components/FooterSection';
import Navigation from '../components/Navigation';

const Main = () => {
    return (
        <div>
            <Navigation />
            <Outlet />
            <FooterSection />
        </div>
    );
};

export default Main;