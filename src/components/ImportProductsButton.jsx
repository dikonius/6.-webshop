import { addDoc, collection } from "firebase/firestore";
import { db } from "../data/database.js"; 
import switchAgainList from "../data/switchAgainList.js"; 
import { useState } from "react";


const products = switchAgainList;

const ImportProductsButton = () => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");


  const productsCollectionRef = collection(db, "Switch Again");

  
  const importProducts = async () => {
    setLoading(true);
    setMessage("Påbörjar import av produkter...");
    console.log("Påbörjar import av produkter...");

    try {
    
      for (const product of products) {
        try {

          const docRef = await addDoc(productsCollectionRef, product);
          console.log(`Produkt "${product.name}" tillagd med ID: ${docRef.id}`);
        } catch (e) {
          console.error(`Fel vid import av "${product.name}": `, e);
        }
      }
      setMessage("Import klar!");
      console.log("Import klar!");
    } catch (e) {
      setMessage("Ett fel uppstod vid importen.");
      console.error("Fel vid import: ", e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button className="delete-button" onClick={importProducts} disabled={loading}>
        {loading ? "Importerar..." : "Importera Produkter"}
      </button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default ImportProductsButton;