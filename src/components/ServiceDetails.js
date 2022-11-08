import React, { useContext, useEffect } from 'react';
import { TailorContext } from '../Contexts/Contexts';

const ServiceDetails = () => {
    const { setRouteLoader } = useContext(TailorContext);
    useEffect(() => {
        setRouteLoader(false)
    }, [setRouteLoader])
    return (
        <div>
            this is ServiceDetails page
        </div>
    );
};

export default ServiceDetails;