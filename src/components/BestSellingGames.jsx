import { useEffect } from "react";
import { useProductStore } from "../data/store.js";
import { getProducts } from "../data/crud.js";
import { useNavigate } from "react-router-dom";

const BestGames = () => {
  const navigate = useNavigate();
  const products = useProductStore((state) => state.products);
  const setProducts = useProductStore((state) => state.setProducts);

  useEffect(() => {
    if (products.length === 0) {
      getProducts(setProducts);
    }
  }, []);

  
  const randomGames = products
    .filter((pr) => pr.type === "game")
    .sort(() => Math.random() - 0.5) 
    .slice(0, 3); 

    
  return (
    <main className="bestsellers-container">
      {randomGames.map((pr) => (
        <div key={pr.id} onClick={() => navigate(`/product/${pr.id}`)} className="best-game-card">
          <img className="best-game-image" src={pr.image} alt={pr.title} />
          <h3 className="best-product-title">{pr.title}</h3>
          <p className="best-card-price">€{pr.price}</p>
        </div>
      ))}
    </main>
  );
};

export default BestGames;