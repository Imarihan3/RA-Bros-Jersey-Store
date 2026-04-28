// firebase.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyD6Kn1k949hm8D8KG-0ClVLuBkacJB6c08",
  authDomain: "ra-bros.firebaseapp.com",
  projectId: "ra-bros",
  storageBucket: "ra-bros.appspot.com",
  messagingSenderId: "389146527012",
  appId: "1:389146527012:web:6e18f2f5c7e1f40d"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const provider = new GoogleAuthProvider();

export async function login() {
  const result = await signInWithPopup(auth, provider);
  return result.user;
}

export { db, auth };
