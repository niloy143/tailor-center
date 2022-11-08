import React, { createContext } from 'react';
import app from '../firebase/firebase-init';
import { getAuth } from 'firebase/auth';

export const TailorContext = createContext({});
const auth = getAuth(app);

const Contexts = ({ children }) => {

    const isValidImage = url => {
        const img = new Image();
        img.src = url;
        return new Promise((resolve) => {
            img.onerror = () => resolve(false);
            img.onload = () => resolve(true);
        });
    }

    const value = {
        isValidImage
    }
    return (
        <TailorContext.Provider value={value}>
            {children}
        </TailorContext.Provider>
    );
};

export default Contexts;