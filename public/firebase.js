// public/firebase.js
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js';
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-auth.js';

const firebaseConfig = {
  apiKey: "AIzaSyBq1MSSFZhh9nGzzS_0dypa3kmZd-fIdZw",
  authDomain: "panier-50ae4.firebaseapp.com",
  projectId: "panier-50ae4",
  storageBucket: "panier-50ae4.appspot.com",
  messagingSenderId: "1063695543555",
  appId: "1:1063695543555:web:a70478a9d00d13ac984d36",
  measurementId: "G-K03B8HFLFH"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

function formatAuthError(error) {
  switch (error.code) {
    case 'auth/invalid-email':
      return new Error('Invalid email address.');
    case 'auth/user-disabled':
      return new Error('This account has been disabled.');
    case 'auth/user-not-found':
    case 'auth/wrong-password':
      return new Error('Incorrect email or password.');
    case 'auth/email-already-in-use':
      return new Error('Email already in use.');
    case 'auth/weak-password':
      return new Error('Password should be at least 6 characters.');
    case 'auth/popup-closed-by-user':
      return new Error('Google sign-in was cancelled.');
    default:
      return new Error('Authentication failed.');
  }
}

export async function handleGoogleLogin() {
  try {
    return await signInWithPopup(auth, provider);
  } catch (error) {
    throw formatAuthError(error);
  }
}

export async function handleEmailLogin(email, password) {
  try {
    return await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    throw formatAuthError(error);
  }
}

export async function handleEmailSignUp(email, password) {
  try {
    return await createUserWithEmailAndPassword(auth, email, password);
  } catch (error) {
    throw formatAuthError(error);
  }
}

export async function handleLogout() {
  try {
    await signOut(auth);
    window.location.href = '/login.html';
  } catch (error) {
    console.error('Logout error:', error.message);
  }
}

export { auth, onAuthStateChanged };
