import React from 'react';
import useTitle from '../customHooks/useTitle';
import ServiceSection from './ServiceSection';
import SliderSection from './SliderSection';

const Home = () => {
    useTitle(null, 'Tailor Center');
    return (
        <div>
            <SliderSection />
            <ServiceSection />
        </div>
    );
};

export default Home;