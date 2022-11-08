import React, { useEffect, useState } from 'react';
import ServiceCard from './ServiceCard';
import BodySpinner from './BodySpinner';
import { Button } from 'flowbite-react';
import { useNavigate } from 'react-router-dom';

const Services = () => {
    const [loading, setLoading] = useState(true);
    const [services, setServices] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetch("http://localhost:1234/services?count=3")
            .then(res => res.json())
            .then(data => {
                setServices(data);
                setLoading(false);
            })
    }, [])

    return (
        loading ? <BodySpinner /> :
            <div className='my-12 sm:my-24'>
                <h2 className='text-3xl sm:text-5xl font-semibold text-center my-5 sm:my-10'>Services You Can Get</h2>
                <div className='flex flex-col items-center gap-5'>
                    {
                        services.map(service => <ServiceCard service={service} key={service._id} />)
                    }
                </div>
                <div className='max-w-5xl mx-auto my-5 flex justify-end'>
                    <Button gradientMonochrome="teal" size="lg" onClick={() => navigate('/services')}>Show All Services</Button>
                </div>
            </div>
    );
};

export default Services;