import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "./database";

async function getProducts(setProducts) {
  try {
    const productsCollection = collection(db, "Switch Again");
    const productsSnapshot = await getDocs(productsCollection);
    const productsList = productsSnapshot.docs.map((doc) => {
      const data = doc.data();

      return {
        id: String(doc.id),
        ...data,
      };
    });
    setProducts(productsList);
    console.log("getProducts success:", productsList);
    return productsList;
  } catch (error) {
    console.log("Error fetching products:", error.message);
    setProducts([]);
    return [];
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
    console.log("Error fetching product by ID:", error.message);
    return null;
  }
}

async function addProduct(product, setProducts) {
  try {

    const { id, ...productData } = product;
    const productsCollection = collection(db, "Switch Again");
    const docRef = await addDoc(productsCollection, productData);
    setProducts((prev) => {
      const newProduct = { id: String(docRef.id), ...productData };
      console.log("Adding product:", newProduct);
      return [...(Array.isArray(prev) ? prev : []), newProduct];
    });
  } catch (error) {
    console.log("Error adding product:", error.message);
    throw error;
  }
}

async function updateProduct(productId, updatedProduct, setProducts) {
  try {

    const { id, ...productData } = updatedProduct;
    const productDoc = doc(db, "Switch Again", String(productId));
    await updateDoc(productDoc, productData);
    setProducts((prev) => {
      const updatedProducts = (Array.isArray(prev) ? prev : []).map((product) =>
        String(product.id) === String(productId)
          ? { id: String(productId), ...productData }
          : product
      );
      console.log("Updated product:", productId);
      return updatedProducts;
    });
  } catch (error) {
    console.log("Error updating product:", error.message);
    throw error;
  }
}

async function deleteProduct(productId) {
  try {
    const productDoc = doc(db, "Switch Again", String(productId));
    await deleteDoc(productDoc);
    console.log("Deleted product:", productId);
  } catch (error) {
    console.log("Error deleting product:", error.message);
    throw error;
  }
}

export { getProducts, getProductById, addProduct, updateProduct, deleteProduct };