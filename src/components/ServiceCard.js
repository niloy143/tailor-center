import { Button, Rating, Spinner } from 'flowbite-react';
import React, { useContext } from 'react';
import { FaArrowRight } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { TailorContext } from '../Contexts/Contexts';
import { PhotoProvider, PhotoView } from 'react-photo-view';
import 'react-photo-view/dist/react-photo-view.css';

const ServiceCard = ({ service }) => {
    const navigate = useNavigate();
    const { _id, title, thumbnail, price, rating, description } = service;
    const { routeLoader, setRouteLoader } = useContext(TailorContext);

    const loadDynamicURL = id => {
        setRouteLoader(true);
        navigate(`/service/${id}`);
    }

    return (
        <div className='max-w-5xl p-5 shadow-md border rounded-md bg-slate-100 flex flex-col sm:flex-row items-center gap-5 m-3'>
            <PhotoProvider>
                <PhotoView src={thumbnail}>
                    <img className='w-72 h-72 mx-auto my-3 rounded-md cursor-pointer' src={thumbnail} alt="" />
                </PhotoView>
            </PhotoProvider>
            <div className='pr-5'>
                <h2 className='text-2xl font-semibold mb-3'>{title}</h2>
                <p className='mb-3'>{description.length > 100 ? `${description.slice(0, 100)}...` : description}</p>
                <div className='flex items-center justify-between text-2xl font-semibold'>
                    <p>${price}</p>
                    <Rating size="xl">
                        <Rating.Star filled={!!rating} />
                        <p className='ml-1 text-lg text-gray-700'>{rating || 'No Ratings Yet'}</p>
                    </Rating>
                </div>
                <Button className="mt-5" gradientMonochrome="info" onClick={() => loadDynamicURL(`${_id}`)} disabled={routeLoader}>See Details <span className='ml-1'>{routeLoader ? <Spinner size="sm" /> : <FaArrowRight />}</span></Button>
            </div>
        </div>
    );
};

export default ServiceCard;