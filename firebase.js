// firebase.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import { getFirestore, collection, addDoc, getDocs, query, where } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "YOUR_KEY",
  authDomain: "YOUR_DOMAIN",
  projectId: "YOUR_ID",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const provider = new GoogleAuthProvider();

let currentUser = null;

// LOGIN
export async function login() {
  if (!currentUser) {
    const result = await signInWithPopup(auth, provider);
    currentUser = result.user;
  }
  return currentUser;
}

// ADD TO CART
export async function addItem(item) {
  const user = await login();
  await addDoc(collection(db, "cart"), {
    email: user.email,
    item: item,
    time: new Date()
  });
}

// GET CART
export async function getCart() {
  const user = await login();
  const q = query(collection(db, "cart"), where("email", "==", user.email));
  const snapshot = await getDocs(q);
  let items = [];
  snapshot.forEach(doc => items.push(doc.data()));
  return items;
}

// PLACE ORDER
export async function placeOrder() {
  const user = await login();
  const items = await getCart();

  for (let item of items) {
    await addDoc(collection(db, "orders"), {
      email: user.email,
      item: item.item,
      time: new Date()
    });
  }

  alert("Order placed 🚀");
}