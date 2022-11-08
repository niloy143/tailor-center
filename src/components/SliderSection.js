import { Carousel } from 'flowbite-react';
import React from 'react';
import CarouselItem from './CarouselItem';

const SliderSection = () => {
    return (
        <div className="max-w-6xl mx-auto">
            <Carousel>
                <CarouselItem img="https://i.ibb.co/9c6CV5P/Christies-Tailors-Services.jpg" title="Lorem ipsum dolor sit amet." description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam illum, unde eos adipisci optio vitae amet suscipit odit rem ipsa reiciendis neque repellat hic pariatur cum! Sint quaerat debitis commodi voluptate officia architecto dolor quos veritatis! Dolore fugiat illo velit vel est facere qui." />
                <CarouselItem img="https://i.ibb.co/84t1xJK/pexels-photo-404159.jpg" title="Lorem ipsum dolor sit amet." description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam illum, unde eos adipisci optio vitae amet suscipit odit rem ipsa reiciendis neque repellat hic pariatur cum! Sint quaerat debitis commodi voluptate officia architecto dolor quos veritatis! Dolore fugiat illo velit vel est facere qui." />
                <CarouselItem img="https://i.ibb.co/Zc1Bx5R/D66-UE7iz-Hh-Sk-Uu-GM08ura3-Dhk-Y9-Mo-U8-UKQDRf-Ma-E1.jpg" title="Lorem ipsum dolor sit amet." description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam illum, unde eos adipisci optio vitae amet suscipit odit rem ipsa reiciendis neque repellat hic pariatur cum! Sint quaerat debitis commodi voluptate officia architecto dolor quos veritatis! Dolore fugiat illo velit vel est facere qui." />
            </Carousel>
        </div>
    );
};

export default SliderSection;