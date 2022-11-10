import React from 'react';

const BenefitSection = () => {
    return (
        <div className='px-3 max-w-7xl mx-auto grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 my-12'>
            <Benefit
                img="https://i.ibb.co/jWzqyb9/local-shipping-1780496-1517586.png"
                title="Flexible Shipping"
                des="You can get your service regardless of where you live."
            />
            <Benefit
                img="https://i.ibb.co/mBkFnQw/1914661-200.png"
                title="Cash on delivery"
                des="You don't have to pay a single penny until getting your service"
            />
            <Benefit
                img="https://i.ibb.co/C5RBBSB/img-453155.png"
                title="24/7 Customer Support"
                des="Anytime you get a problem, you can contact and get support"
            />
            <Benefit
                img="https://i.ibb.co/cwnPfgS/img-256126.png"
                title="Flexible Shipping"
                des="Sometimes you get special gifts in special days and festivals"
            />
        </div>
    );
};

const Benefit = ({ img, title, des }) => {
    return (
        <div className='text-center'>
            <img className='w-36 mx-auto' src={img} alt="" />
            <h2 className='text-xl font-semibold my-1'>{title}</h2>
            <p className='max-w-xs mx-auto'>{des}</p>
        </div>
    )
}

export default BenefitSection;