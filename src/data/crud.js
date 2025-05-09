import { collection, getDocs } from "firebase/firestore";
import { db } from "./database";

async function getProducts(setProducts) {
	const productsCollection = collection(db, 'Switch Again');
	const productsSnapshot = await getDocs(productsCollection);
	const productsList = productsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
	setProducts(productsList);
	console.log('getProducts', productsList)
}

export { getProducts }