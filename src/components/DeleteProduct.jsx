import { deleteProduct } from "../data/crud.js";
import { useProductStore } from "../data/store.js";

const DeleteProduct = ({ productId }) => {
  const setProducts = useProductStore((state) => state.setProducts);
  const products = useProductStore((state) => state.products);

  const handleDelete = async () => {
    await deleteProduct(productId);
    setProducts(products.filter((product) => product.id !== productId));
  };

  return (
    <button className="delete-button" onClick={handleDelete}>
      Delete
    </button>
  );
};

export default DeleteProduct;