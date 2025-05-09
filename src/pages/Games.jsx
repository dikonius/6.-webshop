import { useEffect } from "react"
import { useProductStore } from "../data/store.js"
import { getProducts } from "../data/crud.js"
import "../styles/games-consoles.css"


const Games = () => {
    const products = useProductStore(state => state.products);
    const setProducts = useProductStore(state => state.setProducts);
  
    useEffect(() => {
      if (products.length === 0) {
        getProducts(setProducts);
      }
    }, []);
  
    return (
      <main className="games-page">
        <section className="games-container"> 
          {products
            .filter(pr => pr.type === "game")
            .map(pr => (
              <div key={pr.id} className="game-card">
                <img className="game-image" src={pr.image} alt={pr.title} />
                <h3 className="product-title">{pr.title}</h3>
                <p className="card-price">€{pr.price}</p>
              </div>
            ))}
        </section>
      </main>
    );
  };
  
  export default Games;