import React, { useContext, useEffect, useState } from 'react';
import { TailorContext } from '../Contexts/Contexts';
import BodySpinner from './BodySpinner';

const MyReviews = () => {
    const [myReviews, setMyReviews] = useState([]);
    const [reviewLoading, setReviewLoading] = useState(true);
    const { user } = useContext(TailorContext);

    useEffect(() => {
        fetch(`http://localhost:1234/my-reviews?user=${user.uid}`, {
            headers: {
                authtoken: `Bearer ${localStorage.getItem('tailor-center-user-token')}`
            }
        })
            .then(res => res.json())
            .then(data => {
                setMyReviews(data);
                setReviewLoading(false);
            })
    }, [user.uid])

    return (
        reviewLoading ? <BodySpinner /> : !(myReviews.length) ? <div className='h-screen flex items-center justify-center'>
            <h2 className='text-2xl sm:text-4xl font-semibold italic text-gray-500'>No reviews were added!</h2>
        </div> : <div>
            {console.log(myReviews)}
        </div>
    );
};

export default MyReviews;