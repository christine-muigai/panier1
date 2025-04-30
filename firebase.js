import { initializeApp } from "firebase/app";
import { 
  getAuth, 
  GoogleAuthProvider, 
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut
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

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
const provider = new GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });

function formatAuthError(error) {
  switch (error.code) {
    case 'auth/invalid-email': return 'Invalid email address';
    case 'auth/user-disabled': return 'Account disabled';
    case 'auth/user-not-found':
    case 'auth/wrong-password': return 'Invalid email or password';
    case 'auth/email-already-in-use': return 'Email already in use';
    case 'auth/weak-password': return 'Password should be at least 6 characters';
    case 'auth/popup-closed-by-user': return 'Google sign-in was canceled';
    default: return 'Authentication failed. Please try again.';
  }
}

export async function handleGoogleLogin() {
  try {
    const result = await signInWithPopup(auth, provider);
    return result.user;
  } catch (error) {
    throw new Error(formatAuthError(error));
  }
}

export async function handleEmailLogin(email, password) {
  try {
    return await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    throw new Error(formatAuthError(error));
  }
}

export async function handleEmailSignUp(email, password) {
  try {
    return await createUserWithEmailAndPassword(auth, email, password);
  } catch (error) {
    throw new Error(formatAuthError(error));
  }
}

export async function handleLogout() {
  try {
    await signOut(auth);
    return true;
  } catch (error) {
    throw new Error('Logout failed. Please try again.');
  }
}

export { onAuthStateChanged };