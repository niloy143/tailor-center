import { Avatar, Dropdown, Rating } from 'flowbite-react';
import React, { useContext, useState } from 'react';
import { FiMoreVertical } from 'react-icons/fi';
import { TailorContext } from '../Contexts/Contexts';
import { AiFillLike } from 'react-icons/ai';

const ServiceReviews = () => {
    const { user } = useContext(TailorContext);
    const [fullText, setFullText] = useState(false);
    const { reviewTitle, review, author, rating, date } = {
        reviewTitle: 'Tremendous Work',
        review: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium exercitationem facere, laudantium dicta neque rem iste commodi ducimus voluptas voluptatem illum reiciendis porro vitae omnis quisquam sit repellendus velit atque enim? Ipsam nihil repudiandae reiciendis, delectus temporibus aperiam minus numquam? Debitis ducimus amet impedit? Architecto assumenda atque mollitia fugit eligendi?',
        rating: 4,
        date: '03 August 2013',
        author: {
            uid: 'Y3RZCbAnUBSTFLMl2rEg76iB6xr1',
            name: 'Niloy Mahmud Apu',
            photo: 'https://media-exp1.licdn.com/dms/image/C4E03AQEtYcgrx4dtDw/profile-displayphoto-shrink_200_200/0/1656954828223?e=1673481600&v=beta&t=l2vwyUCTA29N2CRGN9fwZhjYsN71mDyFbMY-9DvHVwI'
        }
    }
    return (
        <div className='my-12'>
            <h2 className='text-4xl font-semibold text-center mb-8'>What clients say about this service</h2>
            <div className='rounded-xl p-5 bg-slate-200'>
                <div className='flex justify-center items-center gap-5 my-3'>
                    <h2 className='text-2xl font-semibold my-3'>{reviewTitle}</h2>
                    <Rating>
                        {
                            [...Array(rating)].map(x => <Rating.Star key={Math.random()} />)
                        }
                        <p className='text-xl font-semibold ml-1'>({rating})</p>
                    </Rating>
                </div>
                <hr className='border-slate-300 w-11/12 mx-auto' />
                <p className='text-justify py-5 px-5'>{review.length > 300 ? !fullText ?
                    <span>{review.slice(0, 300)} <small className='text-blue-600 cursor-pointer hover:text-black' onClick={() => setFullText(true)}>...See More</small></span> :
                    <span>{review} <small className='text-blue-600 cursor-pointer hover:text-black' onClick={() => setFullText(false)}>...See Less</small></span>
                    : review}
                </p>
                <hr className='border-slate-300 w-11/12 mx-auto' />
                <div className='flex justify-between items-center my-3'>
                    <div className='flex items-center gap-2'>
                        <Avatar img={author.photo} rounded />
                        <div>
                            <h4 className='font-semibold text-lg leading-4'>{author.name}</h4>
                            <small>{date}</small>
                        </div>
                    </div>
                    {
                        user?.uid === author.uid ? <Dropdown
                            label={<FiMoreVertical className='text-xl mr-2' />}
                            inline
                            arrowIcon={false}
                        >
                            <Dropdown.Item>Edit</Dropdown.Item>
                            <Dropdown.Item>Delete</Dropdown.Item>
                        </Dropdown> : <div>
                            <AiFillLike className='text-xl mr-2 active:scale-125 active:text-blue-600 transition cursor-pointer' />
                        </div>
                    }
                </div>
            </div>
        </div>
    );
};

export default ServiceReviews;