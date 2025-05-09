
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'



const firebaseConfig = {
  apiKey: "AIzaSyB5SZvTCRbkY84OcbdaUB11QzP3z2paiQk",
  authDomain: "webshop-cebf0.firebaseapp.com",
  projectId: "webshop-cebf0",
  storageBucket: "webshop-cebf0.firebasestorage.app",
  messagingSenderId: "309359768125",
  appId: "1:309359768125:web:c1f7cad1827c3d419e3054"
};


const app = initializeApp(firebaseConfig);
const db = getFirestore(app)

export { db }