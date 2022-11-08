import React, { useEffect, useState } from 'react';
import BodySpinner from './BodySpinner';
import ServiceCard from './ServiceCard';

const ServicesPage = () => {
    const [loading, setLoading] = useState(true);
    const [services, setServices] = useState([]);

    useEffect(() => {
        fetch('http://localhost:1234/services')
            .then(res => res.json())
            .then(data => {
                setLoading(false);
                setServices(data);
            })
    }, [])

    return (
        loading ? <BodySpinner /> :
            <div>
                <div className='flex flex-col items-center gap-5'>
                    {
                        services.map(service => <ServiceCard service={service} key={service._id} />)
                    }
                </div>
            </div>
    );
};

export default ServicesPage;