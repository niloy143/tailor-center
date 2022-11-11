import { Avatar, Dropdown, Navbar, Spinner } from 'flowbite-react';
import React, { useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { TailorContext } from '../Contexts/Contexts';

const Navigation = () => {
    const navigate = useNavigate();
    const { user, userLoading, logOut } = useContext(TailorContext);
    return (
        <div className='shadow-md mb-3 sticky top-0 z-10'>
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
                        {
                            userLoading ? <Spinner /> : user && <>
                                <NavLink to="/my-reviews" className={({ isActive }) => `${isActive && 'text-blue-600'} hover:text-blue-600`}>My Reviews</NavLink>
                                <NavLink to="/add-service" className={({ isActive }) => `${isActive && 'text-blue-600'} hover:text-blue-600`}>Add Service</NavLink>
                            </>
                        }
                        <NavLink to="/services" className={({ isActive }) => `${isActive && 'text-blue-600'} hover:text-blue-600`}>Services</NavLink>
                        <NavLink to="/blogs" className={({ isActive }) => `${isActive && 'text-blue-600'} hover:text-blue-600`}>Blog</NavLink>
                        {
                            userLoading ? <Spinner /> : user ? <Dropdown
                                label={<Avatar img={user.photoURL} rounded />}
                                inline
                                arrowIcon={false}
                            >
                                <Dropdown.Header>
                                    <div className='p-2'>
                                        <Avatar img={user.photoURL} size="lg" rounded />
                                        <div className='text-center'>
                                            <h4 className='text-lg font-semibold pt-2 -mb-1'>{user.displayName}</h4>
                                            <small>{user.email}</small>
                                        </div>
                                    </div>
                                </Dropdown.Header>
                                <Dropdown.Item onClick={() => logOut()}>Sign Out</Dropdown.Item>
                            </Dropdown> :
                                <NavLink to="/signin" className={({ isActive }) => `bg-orange-500 text-white ${isActive ? 'bg-orange-600 italic' : 'hover:bg-orange-600'} px-4 py-2 rounded`}>Sign-In</NavLink>
                        }
                    </div>
                </Navbar.Collapse>
            </Navbar>
        </div>
    );
};

export default Navigation;