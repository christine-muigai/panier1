
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID",
  measurementId: "YOUR_MEASUREMENT_ID"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

function formatAuthError(error) {
  switch (error.code) {
    case 'auth/invalid-email': return new Error('Invalid email address');
    case 'auth/user-disabled': return new Error('Account disabled');
    case 'auth/user-not-found':
    case 'auth/wrong-password': return new Error('Invalid email or password');
    case 'auth/email-already-in-use': return new Error('Email already in use');
    case 'auth/weak-password': return new Error('Password should be at least 6 characters');
    default: return new Error('Authentication failed. Please try again.');
  }
}

window.auth = auth;
window.onAuthStateChanged = onAuthStateChanged;
window.handleGoogleLogin = () => signInWithPopup(auth, provider).catch(e => { throw formatAuthError(e); });
window.handleEmailLogin = (email, password) => signInWithEmailAndPassword(auth, email, password).catch(e => { throw formatAuthError(e); });
window.handleEmailSignUp = (email, password) => createUserWithEmailAndPassword(auth, email, password).catch(e => { throw formatAuthError(e); });
window.handleLogout = () => signOut(auth).then(() => window.location.href = '/login.html');

