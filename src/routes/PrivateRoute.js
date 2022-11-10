import React, { useContext } from 'react';
import { TailorContext } from '../Contexts/Contexts';
import BodySpinner from '../components/BodySpinner';
import { Navigate, useLocation } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
    const { user, userLoading } = useContext(TailorContext)
    const { pathname } = useLocation();

    return userLoading ? <div className='h-screen'><BodySpinner /></div> : user ? children : <Navigate to="/signin" state={pathname} />
};

export default PrivateRoute;