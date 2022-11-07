import React, { createContext } from 'react';
import app from '../firebase/firebase-init';
import { getAuth } from 'firebase/auth';

export const TailorContext = createContext({});
const auth = getAuth(app);

const Contexts = ({ children }) => {

    console.log(auth)

    const value = {

    }
    return (
        <TailorContext.Provider value={value}>
            {children}
        </TailorContext.Provider>
    );
};

export default Contexts;