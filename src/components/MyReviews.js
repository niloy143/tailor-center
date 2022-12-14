import { Button, Spinner, Tooltip } from 'flowbite-react';
import React, { useContext, useEffect, useState } from 'react';
import { TailorContext } from '../Contexts/Contexts';
import BodySpinner from './BodySpinner';
import ReviewBox from './ReviewBox';
import { FaArrowRight } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';
import MyToast from './MyToast';
import useTitle from '../customHooks/useTitle';

const MyReviews = () => {
    useTitle('My Reviews');
    const [myReviews, setMyReviews] = useState([]);
    const [reviewLoading, setReviewLoading] = useState(true);
    const { user, setRouteLoader, routeLoader } = useContext(TailorContext);
    const [deletionToast, setdeletionToast] = useState(false);

    const handleToast = x => {
        setdeletionToast(x);
    }

    useEffect(() => {
        fetch(`https://tailor-center-server.vercel.app/my-reviews?user=${user.uid}`, {
            headers: {
                authtoken: `Bearer ${localStorage.getItem('tailor-center-user-token')}`
            }
        })
            .then(res => res.json())
            .then(data => {
                const sortedReviews = data.sort((a, b) => b.date - a.date);
                setMyReviews(sortedReviews);
                setReviewLoading(false);
            })
    }, [user.uid])

    const deleteReview = id => {
        fetch(`https://tailor-center-server.vercel.app/review/delete?id=${id}&userId=${user.uid}`, {
            method: 'DELETE',
            headers: {
                'content-type': 'application/json',
                authtoken: `Bearer ${localStorage.getItem('tailor-center-user-token')}`
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data.deletedCount) {
                    const updatedReviews = [...myReviews].filter(review => review._id !== id);
                    setMyReviews(updatedReviews);
                    setdeletionToast(true);
                }
            })
    }

    return (
        reviewLoading ? <div className='h-screen'><BodySpinner /></div> : !(myReviews.length) ? <div className='h-screen'>
            <h2 className='text-2xl sm:text-4xl font-semibold italic text-center my-12 text-gray-400'>No reviews were added!</h2>
        </div> : <div style={{ minHeight: '90vh' }}>
            <h2 className='text-2xl sm:text-4xl font-semibold text-center my-12'>My Reviews</h2>
            <div className='max-w-7xl mx-auto flex flex-col gap-5 my-12'>
                {
                    myReviews.map(review => <div key={review._id}>
                        <ReviewBox review={review} deleteReview={deleteReview} />
                        <div className='flex justify-end my-1'>
                            <Tooltip content='The service where this review was added'>
                                <NavLink to={`/service/${review.serviceId}`}>
                                    <Button gradientMonochrome="teal" onClick={() => setRouteLoader(true)}>Go to the service {routeLoader ? <Spinner className='ml-1' size="sm" /> : <FaArrowRight className='ml-1' />} </Button>
                                </NavLink>
                            </Tooltip>
                        </div>
                    </div>)
                }
            </div>
            <MyToast show={deletionToast} setShow={handleToast}>
                <p className='text-green-600 px-8 py-5 bg-green-100 text-center'> Review was <span className='text-red-600'>deleted</span> successfully </p>
            </MyToast>
        </div>
    );
};

export default MyReviews;