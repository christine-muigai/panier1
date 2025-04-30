// firebase.js

import { initializeApp } from 'firebase/app';
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut
} from 'firebase/auth';

// Firebase configuration using environment variables
const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID,
  measurementId: import.meta.env.VITE_MEASUREMENT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

/**
 * Helper function to format Firebase Auth errors
 */
function formatAuthError(error) {
  switch (error.code) {
    case 'auth/invalid-email':
      return new Error('Invalid email address.');
    case 'auth/user-disabled':
      return new Error('Your account has been disabled.');
    case 'auth/user-not-found':
    case 'auth/wrong-password':
      return new Error('Incorrect email or password.');
    case 'auth/email-already-in-use':
      return new Error('Email is already registered.');
    case 'auth/weak-password':
      return new Error('Password should be at least 6 characters.');
    default:
      return new Error('Authentication failed. Please try again.');
  }
}

/**
 * Sign in with Google using popup
 */
export async function handleGoogleLogin() {
  try {
    return await signInWithPopup(auth, provider);
  } catch (error) {
    throw formatAuthError(error);
  }
}

/**
 * Sign in using email and password
 */
export async function handleEmailLogin(email, password) {
  try {
    return await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    throw formatAuthError(error);
  }
}

/**
 * Create new account using email and password
 */
export async function handleEmailSignUp(email, password) {
  try {
    return await createUserWithEmailAndPassword(auth, email, password);
  } catch (error) {
    throw formatAuthError(error);
  }
}

/**
 * Sign out the current user and redirect to login
 */
export async function handleLogout() {
  try {
    await signOut(auth);
    window.location.href = '/login.html';
  } catch (error) {
    console.error('Logout failed:', error);
  }
}

export { auth, onAuthStateChanged };
