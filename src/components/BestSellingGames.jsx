import { useEffect } from "react";
import { useProductStore } from "../data/store.js";
import { getProducts } from "../data/crud.js";

const BestGames = () => {
  const products = useProductStore((state) => state.products);
  const setProducts = useProductStore((state) => state.setProducts);

  useEffect(() => {
    if (products.length === 0) {
      getProducts(setProducts);
    }
  }, []);

  // Shuffle and select 3 random games
  const randomGames = products
    .filter((pr) => pr.type === "game")
    .sort(() => Math.random() - 0.5) // Shuffle the array
    .slice(0, 3); 

  return (
    <main className="bestsellers-container">
      {randomGames.map((pr) => (
        <div key={pr.id} className="game-card">
          <img className="game-image" src={pr.image} alt={pr.title} />
          <h3 className="product-title">{pr.title}</h3>
          <p className="card-price">€{pr.price}</p>
        </div>
      ))}
    </main>
  );
};

export default BestGames;