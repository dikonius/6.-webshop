import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, getDoc } from "firebase/firestore";
import { db } from "./database";

async function getProducts(setProducts) {
  try {
    const productsCollection = collection(db, "Switch Again");
    const productsSnapshot = await getDocs(productsCollection);
    const productsList = productsSnapshot.docs.map((doc) => ({
      id: String(doc.id), // Ensure ID is a string
      ...doc.data(),
    }));
    setProducts(productsList);
    console.log("getProducts success:", productsList);
    return productsList;
  } catch (error) {
    console.error("Error fetching products:", error.message);
    setProducts([]);
    throw error;
  }
}

async function getProductById(productId) {
  try {
    const productDoc = doc(db, "Switch Again", String(productId));
    const docSnap = await getDoc(productDoc);
    if (docSnap.exists()) {
      const product = { id: String(docSnap.id), ...docSnap.data() };
      console.log("getProductById success:", product);
      return product;
    } else {
      console.log("No product found with ID:", productId);
      return null;
    }
  } catch (error) {
    console.error("Error fetching product by ID:", error.message);
    throw error;
  }
}

async function addProduct(product, setProducts) {
  try {
    const productsCollection = collection(db, "Switch Again");
    const docRef = await addDoc(productsCollection, product);
    setProducts((prev) => {
      const newProduct = { id: String(docRef.id), ...product };
      console.log("Adding product:", newProduct);
      return [...(Array.isArray(prev) ? prev : []), newProduct];
    });
  } catch (error) {
    console.error("Error adding product:", error.message);
    throw error;
  }
}

async function updateProduct(productId, updatedProduct, setProducts) {
  try {
    const productDoc = doc(db, "Switch Again", String(productId));
    await updateDoc(productDoc, updatedProduct);
    setProducts((prev) =>
      (Array.isArray(prev) ? prev : []).map((product) =>
        String(product.id) === String(productId) ? { id: String(productId), ...updatedProduct } : product
      )
    );
    console.log("Updated product:", productId);
  } catch (error) {
    console.error("Error updating product:", error.message);
    throw error;
  }
}

async function deleteProduct(productId) {
  try {
    const productDoc = doc(db, "Switch Again", String(productId));
    await deleteDoc(productDoc);
    console.log("Deleted product:", productId);
  } catch (error) {
    console.error("Error deleting product:", error.message);
    throw error;
  }
}

export { getProducts, getProductById, addProduct, updateProduct, deleteProduct };