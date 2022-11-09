import React from 'react';
import { BsFacebook, BsLinkedin, BsGithub } from 'react-icons/bs';
import { FaRegCopyright } from 'react-icons/fa';

const FooterSection = () => {
    return (
        <div className='bg-slate-200 py-10 px-3'>
            <div className='max-w-7xl mx-auto'>
                <div className='flex flex-col sm:flex-row justify-between items-center'>
                    <h2 className='text-2xl font-semibold font-serif text-orange-700'>Tailor Center</h2>
                    <div className='flex flex-col sm:flex-row items-center gap-3'>
                        <h4 className='text-lg font-semibold'>Stay Connected</h4>
                        <div className='flex items-center gap-2 text-xl'>
                            <a href="https://facebook.com/niloymahmudapu1" target="_blank" rel="noopener noreferrer"><BsFacebook className='hover:text-blue-600' /></a>
                            <a href="https://linkedin.com/in/niloymahmudapu" target="_blank" rel="noopener noreferrer"><BsLinkedin className='hover:text-blue-600' /></a>
                            <a href="https://github.com/niloy143" target="_blank" rel="noopener noreferrer"><BsGithub className='hover:text-blue-600' /></a>
                        </div>
                    </div>
                </div>
                <hr className='border-slate-400 my-5' />
                <p className='flex items-center justify-center gap-1 font-semibold text-gray-500 italic text-sm sm:text-base'> Copyright 2022-2024 <FaRegCopyright /> All rights reserved. </p>
            </div>
        </div>
    );
};

export default FooterSection;