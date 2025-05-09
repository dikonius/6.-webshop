import { useEffect } from "react"
import { useProductStore } from "../data/store.js"
import { getProducts } from "../data/crud.js"


const Consoles = () => {
    const products = useProductStore(state => state.products);
    const setProducts = useProductStore(state => state.setProducts);
  
    useEffect(() => {
      if (products.length === 0) {
        getProducts(setProducts);
      }
    }, []);
  
    return (
      <main className="consoles-page">
        <section className="games-container">
          {products
            .filter(pr => pr.type === "console")
            .map(pr => (
              <div key={pr.id} className="console-card">
                <img className="console-image" src={pr.image} alt={pr.title} />
                <h3 className="product-title">{pr.title}</h3>
                <p className="card-price">€{pr.price}</p>
              </div>
            ))}
          
        </section>
  
        
      </main>
    );
  };
  
  export default Consoles;