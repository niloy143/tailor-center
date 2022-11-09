import { Rating } from 'flowbite-react';
import React, { useContext, useEffect } from 'react';
import { useLoaderData } from 'react-router-dom';
import { TailorContext } from '../Contexts/Contexts';
import { PhotoProvider, PhotoView } from 'react-photo-view';
import 'react-photo-view/dist/react-photo-view.css';
import ServiceReviews from './ServiceReviews';

const ServiceDetails = () => {
    const { setRouteLoader } = useContext(TailorContext);
    const { title, thumbnail, description, rating, price } = useLoaderData();
    useEffect(() => {
        setRouteLoader(false)
    }, [setRouteLoader])
    return (
        <div className='max-w-7xl mx-3 sm:mx-5 lg:mx-12 xl:mx-auto my-12'>
            <h2 className='text-3xl sm:text-5xl text-center font-semibold my-16'>{title}</h2>

            {/* ==== Service Details ===== */}
            <div className='flex flex-col md:flex-row gap-5 lg:gap-12'>
                <div className='w-full'>
                    <PhotoProvider>
                        <PhotoView src={thumbnail}>
                            <img className='w-full rounded-md' src={thumbnail} alt="" />
                        </PhotoView>
                    </PhotoProvider>
                    <div className='p-5 text-lg sm:text-2xl font-semibold'>
                        <div className='flex justify-between items-center'>
                            <p>Price:</p>
                            <p className='text-violet-600'>${price}</p>
                        </div>
                        <div className='flex justify-between items-center mt-3'>
                            <p>Ratings:</p>
                            <Rating size="xl">
                                <Rating.Star filled={!!rating} />
                                <p className={`text-base sm:text-lg ml-1 ${!!rating ? 'text-violet-600' : 'text-gray-400'}`}>{rating || 'No ratings yet'}</p>
                            </Rating>
                        </div>
                    </div>
                </div>
                <p className='w-full text-justify'>{description}</p>
            </div>

            {/* ==== Service Reviews ===== */}
            <div>
                <ServiceReviews />
            </div>
        </div>
    );
};

export default ServiceDetails;