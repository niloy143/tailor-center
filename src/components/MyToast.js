import React, { useEffect } from 'react';

const MyToast = ({ children, show, setShow }) => {
    useEffect(() => {
        setTimeout(() => {
            setShow(false)
        }, 2000);
    }, [setShow])
    return (
        show && <div className={`fixed bottom-2 left-2 rounded-xl shadow-md`} style={{ zIndex: 1000000 }}>
            {children}
        </div>
    );
};

export default MyToast;