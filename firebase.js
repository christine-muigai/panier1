import { initializeApp } from "firebase/app";
import { 
  getAuth, 
  GoogleAuthProvider, 
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword 
} from "firebase/auth";

// Firebase config
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

// Auth functions
export async function handleGoogleLogin() {
  try {
    const result = await signInWithPopup(auth, provider);
    alert(`Welcome ${result.user.displayName}`);
    window.location.href = "/index.html";
  } catch (error) {
    showAuthError(error);
  }
}

export async function handleEmailSignUp(email, password) {
  try {
    await createUserWithEmailAndPassword(auth, email, password);
    window.location.href = "/index.html";
  } catch (error) {
    showAuthError(error);
  }
}

export async function handleEmailLogin(email, password) {
  try {
    await signInWithEmailAndPassword(auth, email, password);
    window.location.href = "/index.html";
  } catch (error) {
    showAuthError(error);
  }
}

function showAuthError(error) {
  const errorMessages = {
    "auth/email-already-in-use": "Email already registered",
    "auth/invalid-email": "Invalid email address",
    "auth/weak-password": "Password should be at least 6 characters",
    "auth/user-not-found": "Email not found",
    "auth/wrong-password": "Incorrect password"
  };
  alert(errorMessages[error.code] || "Authentication failed");
}

// Auto-inject styles and bind forms
document.addEventListener('DOMContentLoaded', () => {
  injectAuthStyles();
  bindAuthForms();
});

function injectAuthStyles() {
  const style = document.createElement('style');
  style.textContent = `
    .auth-container {
      max-width: 400px;
      margin: 50px auto;
      padding: 30px;
      border-radius: 10px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.1);
      background: white;
    }
    .auth-title {
      text-align: center;
      margin-bottom: 25px;
      color: #2c3e50;
    }
    .auth-form {
      display: flex;
      flex-direction: column;
      gap: 15px;
    }
    .auth-input {
      padding: 12px 15px;
      border: 1px solid #ddd;
      border-radius: 6px;
      font-size: 16px;
    }
    .auth-button {
      background: #4285F4;
      color: white;
      border: none;
      padding: 12px;
      border-radius: 6px;
      cursor: pointer;
      font-size: 16px;
      transition: background 0.3s;
    }
    .auth-button:hover {
      background: #3367D6;
    }
    .google-btn {
      background: white;
      color: #757575;
      border: 1px solid #ddd;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 10px;
    }
    .auth-toggle {
      text-align: center;
      margin-top: 20px;
      color: #666;
    }
    .auth-toggle a {
      color: #4285F4;
      cursor: pointer;
    }
  `;
  document.head.appendChild(style);
}

function bindAuthForms() {
  const container = document.getElementById('auth-container');
  if (!container) return;

  container.innerHTML = `
    <div class="auth-container">
      <h2 class="auth-title">Welcome Back</h2>
      <form id="login-form" class="auth-form">
        <input type="email" class="auth-input" placeholder="Email" required>
        <input type="password" class="auth-input" placeholder="Password" required>
        <button type="submit" class="auth-button">Login</button>
      </form>
      
      <button id="google-login" class="auth-button google-btn">
        <img src="https://www.google.com/favicon.ico" width="20" alt="G"> 
        Continue with Google
      </button>
      
      <div class="auth-toggle">
        Don't have an account? <a id="show-signup">Sign up</a>
      </div>
    </div>
  `;

  // Form switching
  document.getElementById('show-signup')?.addEventListener('click', () => {
    container.innerHTML = `
      <div class="auth-container">
        <h2 class="auth-title">Create Account</h2>
        <form id="signup-form" class="auth-form">
          <input type="email" class="auth-input" placeholder="Email" required>
          <input type="password" class="auth-input" placeholder="Password (min 6 chars)" required>
          <button type="submit" class="auth-button">Sign Up</button>
        </form>
        
        <div class="auth-toggle">
          Already have an account? <a id="show-login">Login</a>
        </div>
      </div>
    `;
    
    document.getElementById('show-login')?.addEventListener('click', bindAuthForms);
    document.getElementById('signup-form')?.addEventListener('submit', (e) => {
      e.preventDefault();
      const [email, password] = e.target.elements;
      handleEmailSignUp(email.value, password.value);
    });
  });

  // Bind form handlers
  document.getElementById('login-form')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const [email, password] = e.target.elements;
    handleEmailLogin(email.value, password.value);
  });

  document.getElementById('google-login')?.addEventListener('click', handleGoogleLogin);
}