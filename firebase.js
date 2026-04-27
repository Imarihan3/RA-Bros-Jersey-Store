// Firebase core
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
// Auth
import { getAuth, GoogleAuthProvider, signInWithPopup } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
// Firestore - ADDED collection, addDoc, doc, setDoc
import { getFirestore, collection, addDoc, doc, setDoc } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

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
    const result = await signInWithPopup(auth, provider);
    currentUser = result.user;
    return currentUser;
  } catch (error) {
    console.error("Firebase Login Error:", error);
    throw error;
  }
}

/** * OPTION A: Save as a NEW unique document every time
 * Use this for logs, new users, or new jersey variants.
 */
export async function addNewItem(collectionPath, data) {
    try {
        // addDoc automatically generates a unique ID so nothing gets overwritten
        const docRef = await addDoc(collection(db, collectionPath), data);
        console.log("Saved with ID:", docRef.id);
        return docRef.id;
    } catch (e) {
        console.error("Error adding document: ", e);
    }
}

/** * OPTION B: Save/Update a SPECIFIC named document
 * Use this for the 3 main shops (Normal, Limited, Custom).
 */
export async function updateShopData(shopID, data) {
    try {
        // doc(db, collection, ID) ensures you target a specific "slot"
        await setDoc(doc(db, "shops", shopID), data, { merge: true });
        console.log("Shop updated:", shopID);
    } catch (e) {
        console.error("Error updating shop: ", e);
    }
}

export { db, auth };
