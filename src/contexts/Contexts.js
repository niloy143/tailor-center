import React, { createContext } from 'react';

export const TailorContext = createContext({});

const Contexts = ({ children }) => {
    const value = {
        name: 'Niloy'
    }
    return (
        <TailorContext.Provider value={value}>
            {children}
        </TailorContext.Provider>
    );
};

export default Contexts;