import { Button, Rating } from 'flowbite-react';
import React from 'react';
import { FaArrowRight } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const ServiceCard = () => {
    const navigate = useNavigate();
    const { _id, title, thumbnail, price, rating, description } = {
        _id: 'sldfjlksjfl',
        title: 'this is a title',
        thumbnail: "https://www.brightman.com.bd/wp-content/uploads/2019/05/best-Black-formal-shirt-in-bd-400x400.jpg",
        price: 180,
        rating: 0,
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam, tenetur modi id provident voluptas ea similique! Aut rerum nesciunt eaque accusamus asperiores, amet temporibus perferendis in ipsa. Saepe recusandae culpa corrupti! Expedita ab maxime sint corporis qui consequuntur nostrum, fugit impedit error, porro ratione. Saepe, id aut? Id alias esse eaque ea enim rem aspernatur, ipsam eum aperiam autem voluptatibus nemo expedita sunt cumque voluptas nobis nesciunt optio praesentium temporibus quae harum labore, in quo minus. Nesciunt assumenda ipsum excepturi pariatur ipsa illo eligendi. Illo, modi aliquid odit, assumenda iusto ut laudantium perferendis eius reprehenderit deserunt facilis vel molestiae, rerum quas dignissimos tempora? Neque impedit eveniet sapiente ipsam asperiores? Vitae, quaerat temporibus? Reprehenderit eveniet voluptas eaque, nulla quis sed? Voluptatibus vel eligendi numquam expedita laboriosam odio non minus animi corrupti obcaecati facere eaque eos, officiis ullam nemo nostrum quis dolore. Non nulla enim nam commodi sequi voluptatem fuga necessitatibus. Debitis vel sapiente laboriosam nesciunt illo esse consequuntur veritatis accusantium. Rerum quidem explicabo tempora quasi voluptates nihil aperiam autem quam animi repudiandae esse harum illum excepturi ipsa doloremque aut fuga dignissimos voluptatibus placeat ab rem accusamus, ullam illo consectetur. Amet est tempore autem inventore minima praesentium at quisquam voluptas, eveniet veritatis.'
    }
    return (
        <div className='max-w-5xl p-5 shadow-md border rounded-md bg-slate-100 flex flex-col sm:flex-row items-center gap-5 m-3'>
            <img className='w-72 h-72 mx-auto my-3 rounded-md' src={thumbnail} alt="" />
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
                <Button className='my-3 mx-auto sm:mx-0' onClick={() => navigate(_id)}>See Details <FaArrowRight className='ml-1' /> </Button>
            </div>
        </div>
    );
};

export default ServiceCard;