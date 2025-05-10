import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { updateProduct, getProducts } from "../data/crud.js";
import { useProductStore } from "../data/store.js";
import { validateProduct } from "../data/validation.js";
import "../styles/admin.css";

const EditProduct = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const products = useProductStore((state) => state.products);
  const setProducts = useProductStore((state) => state.setProducts);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    type: "",
    title: "",
    description: "",
    image: "",
    price: "",
  });
  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    const fetchProduct = async () => {
      console.log("EditProduct productId:", productId);
      console.log("EditProduct current products:", products);

      // Check if product exists in current products
      const foundProduct = products.find((p) => String(p.id) === String(productId));
      console.log("EditProduct found product in current products:", foundProduct);

      if (foundProduct) {
        setProduct(foundProduct);
        setLoading(false);
        return;
      }

      // Fetch products if not found
      setLoading(true);
      try {
        await getProducts(setProducts);
        // After fetching, check for the product again
        const updatedProduct = products.find((p) => String(p.id) === String(productId));
        console.log("EditProduct found product after getProducts:", updatedProduct);
        setProduct(updatedProduct || null);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error.message);
        setError(`Failed to fetch product with ID ${productId}. Error: ${error.message}`);
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId, products, setProducts]);

  useEffect(() => {
    if (product) {
      setFormData({
        type: product.type || "",
        title: product.title || "",
        description: product.description || "",
        image: product.image || "",
        price: product.price || "",
      });
    }
  }, [product]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { error } = validateProduct(formData);
    if (error) {
      const newErrors = {};
      error.details.forEach((err) => {
        newErrors[err.path[0]] = err.message;
      });
      setFormErrors(newErrors);
      return;
    }

    const updatedProduct = {
      ...formData,
      price: Number(formData.price),
    };
    try {
      await updateProduct(productId, updatedProduct, setProducts);
      navigate("/admin");
    } catch (error) {
      console.error("Error updating product:", error.message);
      setError(`Failed to update product. Error: ${error.message}`);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setFormErrors({ ...formErrors, [e.target.name]: "" });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return (
      <div>
        <p>{error}</p>
        <button
          className="add-edit-button"
          onClick={() => navigate("/admin")}
        >
          Back to Admin
        </button>
      </div>
    );
  }

  if (!product) {
    return (
      <div>
        <p>Product with ID {productId} not found in Firestore. Please verify the ID exists.</p>
        <button
          className="add-edit-button"
          onClick={() => navigate("/admin")}
        >
          Back to Admin
        </button>
      </div>
    );
  }

  return (
    <main className="admin-page">
      <h2>Edit Product</h2>
      <form onSubmit={handleSubmit} className="product-form">
        <div className="form-group">
          <label htmlFor="type">Type</label>
          <select
            id="type"
            name="type"
            value={formData.type}
            onChange={handleChange}
          >
            <option value="">Select type</option>
            <option value="game">Game</option>
            <option value="console">Console</option>
          </select>
          {formErrors.type && <p className="error">{formErrors.type}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter title"
          />
          {formErrors.title && <p className="error">{formErrors.title}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter description"
          />
          {formErrors.description && <p className="error">{formErrors.description}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="image">Image URL</label>
          <input
            id="image"
            name="image"
            value={formData.image}
            onChange={handleChange}
            placeholder="Enter image URL"
          />
          {formErrors.image && <p className="error">{formErrors.image}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="price">Price (€)</label>
          <input
            id="price"
            name="price"
            type="number"
            step="0.01"
            value={formData.price}
            onChange={handleChange}
            placeholder="Enter price"
          />
          {formErrors.price && <p className="error">{formErrors.price}</p>}
        </div>
        <div className="form-actions">
          <button type="submit" className="add-edit-button">
            Save Changes
          </button>
          <button
            type="button"
            className="delete-button"
            onClick={() => navigate("/admin")}
          >
            Cancel
          </button>
        </div>
      </form>
    </main>
  );
};

export default EditProduct;