import React, { createContext, useEffect, useState } from 'react';
import app from '../firebase/firebase-init';
import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';

export const TailorContext = createContext({});
const auth = getAuth(app);

const Contexts = ({ children }) => {
    const [user, setUser] = useState(null);
    const [userLoading, setUserLoading] = useState(true);

    // get the user status when loading the site
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, user => {
            setUser(user);
            setUserLoading(false);
        });

        return () => unsubscribe();
    }, [])

    // third-party authentication provider
    const googleProvider = new GoogleAuthProvider();

    // check the image URL whether it's valid or not when a user sign up
    const isValidImage = url => {
        const img = new Image();
        img.src = url;
        return new Promise((resolve) => {
            img.onerror = () => resolve(false);
            img.onload = () => resolve(true);
        });
    }

    // users signup, signin, signout and profile updates
    const logOut = () => signOut(auth);
    const createUser = (email, password) => createUserWithEmailAndPassword(auth, email, password);
    const signIn = (email, password) => signInWithEmailAndPassword(auth, email, password);
    const googleSignIn = () => signInWithPopup(auth, googleProvider);
    const setNameAndPhoto = (name, photo) => updateProfile(auth.currentUser, {
        displayName: name,
        photoURL: photo
    })

    // Context API value
    const value = {
        isValidImage,
        createUser,
        setNameAndPhoto,
        logOut,
        signIn,
        googleSignIn,
        setUserLoading,
        userLoading,
        user
    }
    return (
        <TailorContext.Provider value={value}>
            {children}
        </TailorContext.Provider>
    );
};

export default Contexts;