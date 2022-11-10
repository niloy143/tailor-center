import { SiAddthis } from 'react-icons/si';
import { FaCheck } from 'react-icons/fa';
import { Button, Modal, Rating, Spinner } from 'flowbite-react';
import React, { useContext, useEffect, useState } from 'react';
import ReviewBox from './ReviewBox';
import { TailorContext } from '../Contexts/Contexts';
import { NavLink, useLocation } from 'react-router-dom';
import BodySpinner from './BodySpinner';
import MyToast from './MyToast';

const ServiceReviews = ({ serviceId }) => {
    const { user, userLoading } = useContext(TailorContext);
    const { pathname } = useLocation();
    const [showModal, setShowModal] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [submitErr, setSubmitErr] = useState(false);
    const [reviews, setReviews] = useState([]);
    const [reviewsLoading, setReviewsLoading] = useState(true);
    const [deletionToast, setdeletionToast] = useState(false);

    const handleToast = x => {
        setdeletionToast(x);
    }

    useEffect(() => {
        fetch(`http://localhost:1234/reviews/${serviceId}`)
            .then(res => res.json())
            .then(data => {
                const sortedReviews = data.sort((a, b) => b.date - a.date);
                setReviews(sortedReviews);
                setReviewsLoading(false);
            })
    }, [serviceId])

    const handleSubmitReview = e => {
        e.preventDefault();
        setSubmitting(true);
        const reviewTitle = e.target.reviewTitle.value;
        const reviewText = e.target.reviewText.value;
        const rating = parseInt(e.target.rating.value);
        const reviewerId = user.uid;
        const author = {
            uid: user.uid,
            name: user.displayName,
            photo: user.photoURL
        }
        const date = Date.now();

        const review = { reviewTitle, reviewText, author, rating, date, serviceId, reviewerId };

        fetch(`http://localhost:1234/add-review?userId=${user.uid}`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                authtoken: `Bearer ${localStorage.getItem('tailor-center-user-token')}`
            },
            body: JSON.stringify(review)
        })
            .then(res => res.json())
            .then(data => {
                if (data.status) {
                    setSubmitted(true);
                    const updatedReviews = [data.data, ...reviews];
                    setTimeout(() => {
                        setReviews(updatedReviews);
                        modalClose();
                    }, 2000);
                    let totalRating = 0;
                    for (const review of updatedReviews) {
                        totalRating += review.rating;
                    }
                    const updateRating = { averageRating: parseFloat((totalRating / updatedReviews.length).toFixed(1)) };
                    fetch(`http://localhost:1234/service/modify?serviceId=${serviceId}&userId=${user.uid}`, {
                        method: 'PUT',
                        headers: {
                            'content-type': 'application/json',
                            authtoken: `Bearer ${localStorage.getItem('tailor-center-user-token')}`
                        },
                        body: JSON.stringify(updateRating)
                    })
                        .then(res => res.json())
                        .then(data => { })
                }
                else {
                    setSubmitErr(true);
                    setTimeout(() => {
                        setSubmitErr(false);
                    }, 2000);
                }
            })
            .catch(() => {
                setSubmitErr(true);
                setTimeout(() => {
                    setSubmitErr(false);
                }, 2000);
            })
            .finally(() => {
                e.target.reset();
                setSubmitting(false);
            })
    }

    const modalClose = () => {
        setShowModal(false);
        setSubmitted(false);
        setSubmitting(false);
        setSubmitErr(false);
    }

    // limit the reviews title
    const titleLimitation = e => {
        const text = e.target.value;
        if (text.length > 50) {
            e.target.value = text.slice(0, 50);
        }
    }

    // handle deleting a review
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
                    const updatedReviews = [...reviews].filter(review => review._id !== id);
                    setReviews(updatedReviews);
                    setdeletionToast(true);
                    let totalRating = 0;
                    for (const review of updatedReviews) {
                        totalRating += review.rating;
                    }
                    const updateRating = { averageRating: parseFloat((totalRating / updatedReviews.length).toFixed(1)) };
                    fetch(`http://localhost:1234/service/modify?serviceId=${serviceId}&userId=${user.uid}`, {
                        method: 'PUT',
                        headers: {
                            'content-type': 'application/json',
                            authtoken: `Bearer ${localStorage.getItem('tailor-center-user-token')}`
                        },
                        body: JSON.stringify(updateRating)
                    })
                        .then(res => res.json())
                        .then(data => { })
                }
            })
    }

    return (
        <div className='my-12'>
            <MyToast show={deletionToast} setShow={handleToast}>
                <p className='text-green-600 px-8 py-5 bg-green-100 text-center'> Review was <span className='text-red-600'>deleted</span> successfully </p>
            </MyToast>
            <h2 className='sm:text-4xl text-3xl font-semibold text-center mb-8'>What clients say about this service</h2>
            <div className='flex justify-end my-5'>
                {
                    userLoading ? <Spinner /> : user ? <>
                        <Modal
                            show={showModal}
                            onClose={modalClose}
                        >
                            <Modal.Header>Your Review</Modal.Header>
                            <div className='p-5'>
                                <form className='flex flex-col gap-3' onSubmit={handleSubmitReview}>
                                    <input name="reviewTitle" className='rounded-md' placeholder='Review Title (Max: 50 char)' type="text" required onChange={titleLimitation} />
                                    <textarea rows={5} name="reviewText" className='rounded-md' placeholder='Write Here ...' required />
                                    <div className='flex items-center gap-2'>
                                        <Rating className='text-xl font-semibold'>
                                            <p className='mr-1 '>Ratings</p>
                                            (<Rating.Star />):
                                        </Rating>
                                        <select className='rounded-md self-start' defaultValue="5" name="rating">
                                            <option value="5">5 Stars</option>
                                            <option value="4">4 Stars</option>
                                            <option value="3">3 Stars</option>
                                            <option value="2">2 Stars</option>
                                            <option value="1">1 Star</option>
                                        </select>
                                    </div>
                                    {
                                        submitted ? <div className='flex justify-end items-center gap-2 text-green-500'>
                                            <p> Review added successfully</p> <FaCheck />
                                        </div> : <div className='flex justify-end gap-1 p-2'>
                                            <Button color="failure" onClick={modalClose}>Cancel</Button>
                                            <Button type="submit" outline={true} gradientDuoTone="greenToBlue" disabled={submitting}>Submit Review {submitting && <Spinner className='ml-1' />} </Button>
                                        </div>
                                    }
                                    {
                                        submitErr && <p className='text-red-600 text-center my-3'>Submission couldn't be successful!</p>
                                    }

                                </form>
                            </div>
                        </Modal>
                        <Button gradientDuoTone="purpleToBlue" outline onClick={() => setShowModal(true)}>
                            Add Your Review <SiAddthis className='ml-2' />
                        </ Button>
                    </> : <p className='italic text-gray-500 font-semibold'>
                        Please <NavLink to="/signin" className="not-italic text-blue-600 underline hover:no-underline" state={pathname}>Sign-In</NavLink> to add review
                    </p>
                }
            </div >
            <div className='flex flex-col gap-5'>
                {
                    reviewsLoading ? <BodySpinner /> : !(reviews.length) ? <div>
                        <h2 className='text-2xl text-gray-500 font-semibold text-center my-5'>No Reviews Yet!</h2>
                    </div> :
                        reviews.map(review => <ReviewBox deleteReview={deleteReview} review={review} key={review._id} />)
                }
            </div>
        </div >
    );
};

export default ServiceReviews;