import React, { useContext, useState } from 'react';
import { Avatar, Dropdown, Rating } from 'flowbite-react';
import { FiMoreVertical } from 'react-icons/fi';
import { TailorContext } from '../Contexts/Contexts';
import { AiFillLike } from 'react-icons/ai';

const ReviewBox = ({ review }) => {
    const { user } = useContext(TailorContext);
    const [fullText, setFullText] = useState(false);
    const { reviewTitle, reviewText, author, rating, date } = review;
    return (
        <div>
            <div className='rounded-xl p-5 bg-slate-200'>
                <div className='flex flex-col items-center my-5'>
                    <h2 className='text-2xl font-semibold'>{reviewTitle}</h2>
                    <Rating>
                        {
                            [...Array(rating)].map(x => <Rating.Star key={Math.random()} />)
                        }
                        <p className='text-xl font-semibold ml-1'>({rating})</p>
                    </Rating>
                </div>
                <hr className='border-slate-300 w-11/12 mx-auto' />
                <p className='text-justify py-5 sm:px-5'>{reviewText.length > 300 ? !fullText ?
                    <span>{reviewText.slice(0, 300)} <small className='text-blue-600 cursor-pointer hover:text-black' onClick={() => setFullText(true)}>...See More</small></span> :
                    <span>{reviewText} <small className='text-blue-600 cursor-pointer hover:text-black' onClick={() => setFullText(false)}>...See Less</small></span>
                    : reviewText}
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

export default ReviewBox;