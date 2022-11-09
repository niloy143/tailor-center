import { Button, Modal, Rating, Spinner } from 'flowbite-react';
import React, { useContext, useState } from 'react';
import { FaCheck } from 'react-icons/fa';
import { useLoaderData, useLocation, useNavigate } from 'react-router-dom';
import { TailorContext } from '../Contexts/Contexts';

const EditReview = () => {
    const [submitting, setSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [submitErr, setSubmitErr] = useState(false);
    const { state } = useLocation();
    const navigate = useNavigate();
    const { user } = useContext(TailorContext);
    const { _id, reviewTitle, reviewText, rating, author, serviceId, date, reviewerId } = useLoaderData();

    const titleLimitation = e => {
        const text = e.target.value;
        if (text.length > 50) {
            e.target.value = text.slice(0, 50);
        }
    }

    const handleUpdateReview = e => {
        e.preventDefault();
        setSubmitting(true);
        const reviewTitle = e.target.reviewTitle.value;
        const reviewText = e.target.reviewText.value;
        const rating = parseInt(e.target.rating.value);
        const lastUpdate = Date.now();

        const review = { reviewTitle, reviewText, author, rating, date, serviceId, lastUpdate, reviewerId };

        fetch(`http://localhost:1234/review/update?id=${_id}&userId=${user.uid}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json',
                authtoken: `Bearer ${localStorage.getItem('tailor-center-user-token')}`
            },
            body: JSON.stringify(review)
        })
            .then(res => res.json())
            .then(data => {
                if (data.matchedCount) {
                    setSubmitted(true);
                    setTimeout(() => {
                        navigate(state)
                    }, 2000);
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

    return (
        <div className='h-screen'>
            <Modal
                show={true}
                onClose={() => navigate(state)}
            >
                <Modal.Header>Your Review</Modal.Header>
                <div className='p-5'>
                    <form className='flex flex-col gap-3' onSubmit={handleUpdateReview}>
                        <input name="reviewTitle" className='rounded-md' placeholder='Review Title (Max: 50 char)' type="text" defaultValue={reviewTitle} required onChange={titleLimitation} />
                        <textarea rows={5} name="reviewText" className='rounded-md' placeholder='Write Here ...' defaultValue={reviewText} required />
                        <div className='flex items-center gap-2'>
                            <Rating className='text-xl font-semibold'>
                                <p className='mr-1 '>Ratings</p>
                                (<Rating.Star />):
                            </Rating>
                            <select className='rounded-md self-start' defaultValue={`${rating}`} name="rating">
                                <option value="5">5 Stars</option>
                                <option value="4">4 Stars</option>
                                <option value="3">3 Stars</option>
                                <option value="2">2 Stars</option>
                                <option value="1">1 Star</option>
                            </select>
                        </div>
                        {
                            submitted ? <div className='flex justify-end items-center gap-2 text-green-500'>
                                <p> Updated successfully</p> <FaCheck />
                            </div> : <div className='flex justify-end gap-1 p-2'>
                                <Button color="failure" onClick={() => navigate(state)}>Cancel</Button>
                                <Button type="submit" outline={true} gradientDuoTone="greenToBlue" disabled={submitting}>Update Review {submitting && <Spinner className='ml-1' />} </Button>
                            </div>
                        }
                        {
                            submitErr && <p className='text-red-600 text-center my-3'>Update Failed!</p>
                        }

                    </form>
                </div>
            </Modal>
        </div>
    );
};

export default EditReview;