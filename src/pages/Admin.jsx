import { useEffect } from "react"
import { useProductStore } from "../data/store.js"
import { getProducts } from "../data/crud.js"
import ImportProductsButton from "../components/ImportProductsButton.jsx";
import "../styles/admin.css"



const Admin = () => {
    const products = useProductStore(state => state.products);
    const setProducts = useProductStore(state => state.setProducts);
  
    useEffect(() => {
      if (products.length === 0) {
        getProducts(setProducts);
      }
    }, []);
  
    return (
      <main className="admin-page">
            <button className="add-edit-button">Add new product</button>
            {/* <ImportProductsButton /> */}
            

            {products.map(pr => (
            <div key={pr.id} className="admin-product-card">
              <img className="product-image" src={pr.image} alt={pr.title} />
              <h3 className="product-title-admin">{pr.title}</h3>
              <p className="card-price-admin">€{pr.price}</p>
              <button className="add-edit-button">Edit</button>
              <button className="delete-button">Delete</button>
              
            </div>
          ))}
          
      </main>
    );
  };
  
  export default Admin;