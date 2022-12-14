import { Button, Spinner } from 'flowbite-react';
import React, { useEffect, useState } from 'react';
import useTitle from '../customHooks/useTitle';
import BodySpinner from './BodySpinner';
import ServiceCard from './ServiceCard';

const ServicesPage = () => {
    useTitle('Services');
    const [loading, setLoading] = useState(true);
    const [services, setServices] = useState([]);
    const [amount, setAmount] = useState(6);
    const [total, setTotal] = useState(0);
    const [loadMore, setLoadMore] = useState(false);

    useEffect(() => {
        setLoadMore(true);
        fetch(`https://tailor-center-server.vercel.app/services?count=${amount}`)
            .then(res => res.json())
            .then(data => {
                setServices(data.services);
                setTotal(data.count);
                setLoadMore(false);
                setLoading(false);
            })
    }, [amount])

    return (
        loading ? <div className='h-screen'><BodySpinner /></div> :
            <div className='max-w-5xl mx-auto'>
                <div>
                    <h2 className='text-xl sm:text-3xl font-semibold text-gray-700 text-center my-12'>Showing <span className='text-purple-500'>{services.length}</span> out of <span className='text-purple-500'>{total}</span> services</h2>
                </div>
                <div className='flex flex-col gap-5 my-12'>
                    {
                        services.map(service => <ServiceCard service={service} key={service._id} />)
                    }
                </div>
                {
                    services.length < total && <div className='-mt-8 mb-12 px-3 flex justify-end'>
                        <Button gradientDuoTone="purpleToBlue" onClick={() => setAmount(amount + 3)} disabled={loadMore}>{loadMore ? <> Loading... <Spinner className='ml-1' size='sm' /></> : 'Load More'} </Button>
                    </div>
                }
            </div>
    );
};

export default ServicesPage;