// Firebase core
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
// Auth
import { getAuth, GoogleAuthProvider, signInWithPopup } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
// Firestore
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyD6Kn1k949hm8D8KG-0ClVLuBkacJB6c08",
  authDomain: "ra-bros.firebaseapp.com",
  projectId: "ra-bros",
  storageBucket: "ra-bros.appspot.com",
  messagingSenderId: "389146527012",
  appId: "1:389146527012:web:6e18f2f5c7e1f40d" 
};

// Initialize
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const provider = new GoogleAuthProvider();

let currentUser = null;

// Secure Login Function
export async function login() {
  try {
    if (!currentUser) {
      const result = await signInWithPopup(auth, provider);
      currentUser = result.user;
    }
    return currentUser;
  } catch (error) {
    console.error("Firebase Login Error:", error);
    throw error;
  }
}

export { db };
