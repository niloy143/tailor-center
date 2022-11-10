import React from 'react';
import useTitle from '../customHooks/useTitle';
import BenefitSection from './BenefitSection';
import DiscountSection from './DiscountSection';
import ServiceSection from './ServiceSection';
import SliderSection from './SliderSection';

const Home = () => {
    useTitle(null, 'Tailor Center');
    return (
        <div>
            <SliderSection />
            <ServiceSection />
            <DiscountSection />
            <BenefitSection />
        </div>
    );
};

export default Home;