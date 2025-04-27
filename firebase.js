import { initializeApp } from "firebase/app";
import { 
  getAuth, 
  GoogleAuthProvider, 
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged
} from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID,
  measurementId: import.meta.env.VITE_MEASUREMENT_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// Auth Functions
export async function handleGoogleLogin() {
  try {
    const result = await signInWithPopup(auth, provider);
    return result.user;
  } catch (error) {
    throw formatAuthError(error);
  }
}

export async function handleEmailSignUp(email, password) {
  try {
    await createUserWithEmailAndPassword(auth, email, password);
  } catch (error) {
    throw formatAuthError(error);
  }
}

export async function handleEmailLogin(email, password) {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    throw formatAuthError(error);
  }
}

// Error Formatter
export function formatAuthError(error) {
  const errorMap = {
    'auth/email-already-in-use': 'This email is already registered',
    'auth/invalid-email': 'Invalid email address',
    'auth/weak-password': 'Password must be at least 6 characters',
    'auth/user-not-found': 'No account found with this email',
    'auth/wrong-password': 'Incorrect password',
    'auth/popup-closed-by-user': 'Sign in cancelled by user',
    'auth/network-request-failed': 'Network error occurred'
  };
  
  return new Error(errorMap[error.code] || 'Authentication failed. Please try again.');
}

// Export everything needed
export { 
  auth,
  onAuthStateChanged
};