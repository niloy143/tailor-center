import React from 'react';

const CarouselItem = ({ img, title, description }) => {
    return (
        <div className='w-full relative'>
            <img className='h-full w-full' src={img} alt="" />
            <div className='hidden sm:flex w-full h-1/2 absolute bottom-0 m-auto bg-black/50 text-white justify-center items-center'>
                <div className='text-center p-5'>
                    <h2 className='text-2xl sm:text-4xl font-semibold mb-5'>{title}</h2>
                    <p className='max-w-4xl'>{description}</p>
                </div>
            </div>
        </div>
    );
};

export default CarouselItem;