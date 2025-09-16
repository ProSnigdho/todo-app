import { auth } from './firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';

// Register a new user
export const doCreateUserWithEmailAndPassward = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
};

// Sign in with email and password
export const doSignInWithEmailAndPassword = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
};

// Sign in with Google
export const doSignInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth, provider);
};

// Sign out
export const doSignOut = () => {
    return signOut(auth);
};