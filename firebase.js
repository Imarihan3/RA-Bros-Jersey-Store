// 🔥 Firebase core
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";

// 🔐 Auth
import { getAuth, GoogleAuthProvider, signInWithPopup } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

// ☁️ Firestore
import { getFirestore, collection, addDoc, getDocs, query, where } 
from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

// ⚙️ CONFIG
const firebaseConfig = {
  apiKey: "AIzaSyD6Kn1k949hm8D8KG-0ClVLuBkacJB6c08",
  authDomain: "ra-bros.firebaseapp.com",
  projectId: "ra-bros",
};

// 🚀 INIT
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const provider = new GoogleAuthProvider();

let currentUser = null;

// 🔐 LOGIN
export async function login() {
  if (!currentUser) {
    const result = await signInWithPopup(auth, provider);
    currentUser = result.user;
  }
  return currentUser;
}

// 🛒 ADD TO CART
export async function addToCart(item) {
  const user = await login();

  await addDoc(collection(db, "cart"), {
    email: user.email,
    name: item.name,
    image: item.image,
    time: new Date()
  });
}

// 📦 GET CART
export async function getCart() {
  const user = await login();
  const q = query(collection(db, "cart"), where("email", "==", user.email));
  const snap = await getDocs(q);

  let items = [];
  snap.forEach(doc => items.push(doc.data()));
  return items;
}

// 💳 CHECKOUT
export async function checkoutCart() {
  const user = await login();
  const items = await getCart();

  for (let item of items) {
    await addDoc(collection(db, "orders"), {
      email: user.email,
      name: item.name,
      image: item.image,
      time: new Date()
    });
  }

  alert("Order placed 🚀");
}

export { db };
