// Firebase core
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";

// Auth
import { getAuth, GoogleAuthProvider, signInWithPopup } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

// Firestore
import { 
  getFirestore, collection, addDoc, getDocs,
  query, where, deleteDoc, doc
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyD6Kn1k949hm8D8KG-0ClVLuBkacJB6c08",
  authDomain: "ra-bros.firebaseapp.com",
  projectId: "ra-bros",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const provider = new GoogleAuthProvider();

let currentUser = null;

export async function login() {
  if (!currentUser) {
    const result = await signInWithPopup(auth, provider);
    currentUser = result.user;
  }
  return currentUser;
}

// ADD
export async function addToCart(item) {
  const user = await login();

  await addDoc(collection(db, "cart"), {
    email: user.email,
    name: item.name,
    image: item.image,
    time: new Date()
  });
}

// GET
export async function getCart() {
  const user = await login();

  const q = query(collection(db, "cart"), where("email", "==", user.email));
  const snap = await getDocs(q);

  let items = [];
  snap.forEach(docSnap => {
    items.push({ id: docSnap.id, ...docSnap.data() });
  });

  return items;
}

// REMOVE
export async function removeFromCart(id) {
  await deleteDoc(doc(db, "cart", id));
}

// CHECKOUT
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

    await deleteDoc(doc(db, "cart", item.id));
  }

  alert("Order placed 🚀");
}

export { db };
