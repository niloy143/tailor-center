import { Carousel } from 'flowbite-react';
import React from 'react';
import CarouselItem from './CarouselItem';

const SliderSection = () => {
    return (
        <div className="max-w-6xl mx-auto">
            <Carousel>
                <CarouselItem img="https://i.ibb.co/9c6CV5P/Christies-Tailors-Services.jpg" title="The size that fits you most" description="We are highly focused on making the clothes fit and totally perfect for you. However you are, your clothe are guaranteed to be fit. " />
                <CarouselItem img="https://i.ibb.co/84t1xJK/pexels-photo-404159.jpg" title="Sizings and stuff through internet" description="All the information we need to make a clothe, we can collect through internet. Send your clothe information to use through email or any online system and we get it. Also you can get us on video call to clarify things about your clothe." />
                <CarouselItem img="https://i.ibb.co/Zc1Bx5R/D66-UE7iz-Hh-Sk-Uu-GM08ura3-Dhk-Y9-Mo-U8-UKQDRf-Ma-E1.jpg" title="24/7 work hour and availability." description="We work every hour we have. Whenever you need a service, just contact and you get it everything alright. We response within an hour." />
            </Carousel>
        </div>
    );
};

export default SliderSection;