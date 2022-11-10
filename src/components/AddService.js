import { Button, Modal, Spinner } from 'flowbite-react';
import React, { useContext, useEffect, useState } from 'react';
import { TailorContext } from '../Contexts/Contexts';
import { FaPlus } from 'react-icons/fa';
import BodySpinner from './BodySpinner';
import ServiceCard from './ServiceCard';
import MyToast from './MyToast';
import useTitle from '../customHooks/useTitle';

const AddService = () => {
    useTitle('Add Service')
    const [addedServices, setAddedServices] = useState([]);
    const [serviceLoading, setServiceLoading] = useState(true);
    const { user, isValidImage } = useContext(TailorContext);
    const [showModal, setShowModal] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [submitErr, setSubmitErr] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [showToast, setShowToast] = useState(false);
    const [img, setImg] = useState(true);

    const handleToast = (show) => {
        setShowToast(show);
    }

    useEffect(() => {
        fetch(`https://tailor-center-server.vercel.app/user-added-services?userId=${user.uid}`, {
            headers: {
                authtoken: `Bearer ${localStorage.getItem('tailor-center-user-token')}`
            }
        })
            .then(res => res.json())
            .then(data => {
                const sortedServices = data.sort((a, b) => b.date - a.date);
                setAddedServices(sortedServices);
                setServiceLoading(false);
            })
    }, [user.uid])

    const modalClose = () => {
        setShowModal(false);
    }

    const handleAddService = e => {
        e.preventDefault();

        if (img) {
            setSubmitting(true);
            const form = e.target;
            const title = form.title.value;
            const thumbnail = form.thumbnail.value;
            const description = form.description.value;
            const price = parseInt(form.serviceCharge.value);
            const userId = user.uid;
            const rating = 0;
            const date = Date.now();

            const service = { title, thumbnail, description, price, userId, rating, date }

            fetch(`https://tailor-center-server.vercel.app/service/add?userId=${user.uid}`, {
                method: "POST",
                headers: {
                    'content-type': 'application/json',
                    authtoken: `Bearer ${localStorage.getItem('tailor-center-user-token')}`
                },
                body: JSON.stringify(service)
            })
                .then(res => res.json())
                .then(data => {
                    setSubmitting(false);
                    setShowToast(true);

                    if (data.acknowledged) {
                        setSubmitted(true);
                        setSubmitErr(false);
                        form.reset();
                        setTimeout(() => {
                            modalClose();
                            setAddedServices([service, ...addedServices]);
                        }, 2000);
                    }
                    else {
                        setSubmitErr(true);
                        setSubmitted(false);
                    }
                })
        }
    }

    const titleLimitation = e => {
        const text = e.target.value;
        if (text.length > 50) {
            e.target.value = text.slice(0, 50);
        }
    }

    const imgCheck = e => {
        const img = e.target.value;
        if (img) {
            setImg(false);
            isValidImage(e.target.value)
                .then(res => setImg(res))
        }
        else {
            setImg(true);
        }
    }

    return (
        <div className='max-w-7xl my-12 xl:mx-auto mx-3' style={{ minHeight: '90vh' }}>
            <div className='flex justify-center my-5'>
                <MyToast show={showToast} setShow={handleToast}>
                    {
                        (submitErr && <p className='px-8 py-4 bg-red-100 text-red-600 rounded-xl'>Submission Failed!</p>)
                        ||
                        (submitted && <p className='px-8 py-4 bg-green-100 text-green-600 rounded-xl'>Service added successfully!</p>)
                    }
                </MyToast>
                <Button gradientDuoTone="purpleToBlue" outline onClick={() => setShowModal(true)}>Add Service <FaPlus className='ml-1' /> </Button>
                <Modal
                    show={showModal}
                    onClose={modalClose}
                >
                    <Modal.Header>Add Service</Modal.Header>
                    <div className='p-5'>
                        <form className='flex flex-col gap-3' onSubmit={handleAddService}>
                            <input name="title" className='rounded-md' placeholder='Service Title (Max: 50 char)' type="text" required onChange={titleLimitation} />
                            <input name="thumbnail" className={`rounded-md ${!img && 'focus:ring-red-600 focus:border-red-600 border-red-600'}`} placeholder='Thumbnail URL (Square Shape)' type="text" required onChange={imgCheck} />
                            <textarea rows={5} name="description" className='rounded-md' placeholder='Description ...' required />
                            <div>
                                <label htmlFor='charge' className='font-semibold text-lg'>Service Charge: </label>
                                <input name="serviceCharge" className='rounded-md w-24' placeholder='Amount' type="number" id="charge" required />
                            </div>
                            <div className='flex justify-end gap-1 p-2'>
                                <Button color="failure" onClick={modalClose}>Cancel</Button>
                                <Button type="submit" outline={true} gradientDuoTone="greenToBlue" disabled={submitting}>Submit Review {submitting && <Spinner className='ml-1' />} </Button>
                            </div>
                        </form>
                    </div>
                </Modal>
            </div>

            {/* Added Services */}
            <div>
                {
                    serviceLoading ? <BodySpinner /> : !(addedServices.length) ? <div>
                        <p className='text-2xl sm:text-4xl font-semibold text-center text-gray-400 italic my-8'>You didn't add any service yet!</p>
                    </div> : <div>
                        <h2 className='text-2xl sm:text-4xl font-semibold text-center my-8'>Services you added</h2>
                        <div className='flex flex-col items-center gap-8'>
                            {
                                addedServices.map(service => <ServiceCard service={service} key={service.date} />)
                            }
                        </div>
                    </div>
                }
            </div>
        </div>
    );
};

export default AddService;