import { Button, Tooltip } from 'flowbite-react';
import React, { useContext, useEffect, useState } from 'react';
import { TailorContext } from '../Contexts/Contexts';
import BodySpinner from './BodySpinner';
import ReviewBox from './ReviewBox';
import { FaArrowRight } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';
import MyToast from './MyToast';

const MyReviews = () => {
    const [myReviews, setMyReviews] = useState([]);
    const [reviewLoading, setReviewLoading] = useState(true);
    const { user } = useContext(TailorContext);
    const [deletionToast, setdeletionToast] = useState(false);

    const handleToast = x => {
        setdeletionToast(x);
    }

    useEffect(() => {
        fetch(`http://localhost:1234/my-reviews?user=${user.uid}`, {
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
        fetch(`http://localhost:1234/review/delete?id=${id}&userId=${user.uid}`, {
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
        reviewLoading ? <BodySpinner /> : !(myReviews.length) ? <div className='h-screen flex items-center justify-center'>
            <h2 className='text-2xl sm:text-4xl font-semibold italic text-gray-500'>No reviews were added!</h2>
        </div> : <div style={{ minHeight: '90vh' }}>
            <h2 className='text-2xl sm:text-4xl font-semibold text-center my-12'>My Reviews</h2>
            <div className='max-w-7xl mx-auto flex flex-col gap-5 my-12'>
                {
                    myReviews.map(review => <div>
                        <ReviewBox review={review} deleteReview={deleteReview} />
                        <div className='flex justify-end my-1'>
                            <Tooltip content='The service where this review was added'>
                                <NavLink to={`/service/${review.serviceId}`}>
                                    <Button gradientMonochrome="teal">Go to the service <FaArrowRight className='ml-1' /> </Button>
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