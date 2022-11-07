import { Navbar } from 'flowbite-react';
import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

const Navigation = () => {
    const navigate = useNavigate();
    return (
        <div>
            <Navbar>
                <Navbar.Brand>
                    <div className='flex items-center gap-2 cursor-pointer' onClick={() => navigate('/')}>
                        <img className='w-12 sm:w-16' src="https://i.ibb.co/Jv5x7zK/sewing-machine-icon.png" alt="" />
                        <h2 className='text-2xl sm:text-3xl font-semibold font-serif text-orange-700'>Tailor Center</h2>
                    </div>
                </Navbar.Brand>
                <Navbar.Toggle />
                <Navbar.Collapse>
                    <div className='flex flex-col sm:flex-row items-center gap-5 text-lg'>
                        <NavLink to="/services" className={({ isActive }) => `${isActive && 'text-blue-600'} hover:text-blue-600`}>Services</NavLink>
                        <NavLink to="/blogs" className={({ isActive }) => `${isActive && 'text-blue-600'} hover:text-blue-600`}>Blog</NavLink>
                        <NavLink to="/login" className={({ isActive }) => `${isActive && 'text-blue-600'} hover:text-blue-600`}>Login</NavLink>
                    </div>
                </Navbar.Collapse>
            </Navbar>
        </div>
    );
};

export default Navigation;