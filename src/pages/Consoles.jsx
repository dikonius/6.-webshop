import { useEffect } from "react"
import { useProductStore } from "../data/store.js"
import { getProducts } from "../data/crud.js"
import { useNavigate } from "react-router-dom"


const Consoles = () => {
    const navigate = useNavigate();
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
              <div key={pr.id} onClick={() => navigate(`/product/${pr.id}`)} className="console-card">
                <img className="console-image" src={pr.image} alt={pr.title} />
                <h3 className="console-title">{pr.title}</h3>
                <p className="console-price">€{pr.price}</p>
              </div>
            ))}
          
        </section>
  
        
      </main>
    );
  };
  
  export default Consoles;