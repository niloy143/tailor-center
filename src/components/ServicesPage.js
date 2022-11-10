import { Button } from 'flowbite-react';
import React, { useEffect, useState } from 'react';
import BodySpinner from './BodySpinner';
import ServiceCard from './ServiceCard';

const ServicesPage = () => {
    const [loading, setLoading] = useState(true);
    const [services, setServices] = useState([]);
    const [amount, setAmount] = useState(6);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        fetch(`http://localhost:1234/services?count=${amount}`)
            .then(res => res.json())
            .then(data => {
                setServices(data.services);
                setTotal(data.count);
                setLoading(false);
            })
    }, [amount])

    return (
        loading ? <BodySpinner /> :
            <div>
                <div>
                    <h2 className='text-xl sm:text-3xl font-semibold text-gray-700 text-center my-12'>Showing <span className='text-purple-500'>{services.length}</span> out of <span className='text-purple-500'>{total}</span> services</h2>
                </div>
                <div className='flex flex-col items-center gap-5 my-12'>
                    {
                        services.map(service => <ServiceCard service={service} key={service._id} />)
                    }
                </div>
                {
                    services.length < total && <div className='-mt-8 mb-12 max-w-5xl mx-auto flex justify-end'>
                        <Button gradientDuoTone="purpleToBlue" onClick={() => setAmount(amount + 3)}>Load More...</Button>
                    </div>
                }
            </div>
    );
};

export default ServicesPage;