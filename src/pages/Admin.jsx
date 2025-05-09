import { useEffect } from "react"
import { useProductStore } from "../data/store.js"
import { getProducts } from "../data/crud.js"
import ImportProductsButton from "../components/ImportProductsButton.jsx";



const Admin = () => {
    const products = useProductStore(state => state.products);
    const setProducts = useProductStore(state => state.setProducts);
  
    useEffect(() => {
      if (products.length === 0) {
        getProducts(setProducts);
      }
    }, []);
  
    return (
      <main>
            <button className="Add new product"></button>
            {/* <ImportProductsButton /> */}
            

            {products.map(pr => (
            <div key={pr.id} className="admin-product-card">
              <img className="console-image" src={pr.image} alt={pr.title} />
              <h3 className="product-title">{pr.title}</h3>
              <p className="card-price">{pr.price} €</p>
              <button className="edit-button">Edit</button>
              <button className="delete-button">Delete</button>
              
            </div>
          ))}
          
      </main>
    );
  };
  
  export default Admin;