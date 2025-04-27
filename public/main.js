import { auth, provider } from '../firebase.js';
import { signInWithPopup } from "firebase/auth";

// Login button logic
onAuthStateChanged(auth, (user) => {
    if (!user) {
      // If not logged in, redirect to login page
      window.location.href = "./index.html";
    }
    // If user is logged in, your normal app will load
  });
document.getElementById('loginBtn').addEventListener('click', async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    console.log("User logged in:", result.user);
    alert(`Welcome ${result.user.displayName}`);
  } catch (error) {
    console.error("Error during login:", error);
    alert("Failed to log in, please try again.");
  }
});
