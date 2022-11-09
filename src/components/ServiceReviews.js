import { SiAddthis } from 'react-icons/si';
import { Button, Modal, Rating, Spinner } from 'flowbite-react';
import React, { useContext, useState } from 'react';
import ReviewBox from './ReviewBox';
import { TailorContext } from '../Contexts/Contexts';
import { NavLink, useLocation } from 'react-router-dom';

const ServiceReviews = () => {
    const { user, userLoading } = useContext(TailorContext);
    const { pathname } = useLocation();
    const [showModal, setShowModal] = useState(false);
    const review = {
        reviewTitle: 'Tremendous Work',
        reviewText: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium exercitationem facere, laudantium dicta neque rem iste commodi ducimus voluptas voluptatem illum reiciendis porro vitae omnis quisquam sit repellendus velit atque enim? Ipsam nihil repudiandae reiciendis, delectus temporibus aperiam minus numquam? Debitis ducimus amet impedit? Architecto assumenda atque mollitia fugit eligendi?',
        rating: 4,
        date: '03 August 2013',
        author: {
            uid: 'Y3RZCbAnUBSTFLMl2rEg76iB6xr1',
            name: 'Niloy Mahmud Apu',
            photo: 'https://media-exp1.licdn.com/dms/image/C4E03AQEtYcgrx4dtDw/profile-displayphoto-shrink_200_200/0/1656954828223?e=1673481600&v=beta&t=l2vwyUCTA29N2CRGN9fwZhjYsN71mDyFbMY-9DvHVwI'
        }
    }

    const handleSubmitReview = e => {
        e.preventDefault();
        console.log(e.target.rating.value);
    }

    return (
        <div className='my-12'>
            <h2 className='text-4xl font-semibold text-center mb-8'>What clients say about this service</h2>
            <div className='flex justify-end my-5'>
                {
                    userLoading ? <Spinner /> : user ? <>
                        <Modal
                            show={showModal}
                            onClose={() => setShowModal(false)}
                        >
                            <Modal.Header>Your Review</Modal.Header>
                            <div className='p-5'>
                                <form className='flex flex-col gap-3' onSubmit={handleSubmitReview}>
                                    <input name="reviewTitle" className='rounded-md' placeholder='Review Title (Max: 50 char)' type="text" required />
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
                                    <div className='flex justify-end gap-1 p-2'>
                                        <Button color="failure" onClick={() => setShowModal(false)}>Cancel</Button>
                                        <Button type="submit" outline={true} gradientDuoTone="greenToBlue">Submit Review</Button>
                                    </div>
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
            <ReviewBox review={review} />
        </div >
    );
};

export default ServiceReviews;