import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { updateProduct, getProducts, getProductById } from "../data/crud.js";
import { useProductStore } from "../data/store.js";
import { validateProduct } from "../data/validation.js";
import "../pages/Admin.css";
import "../styles/adminForm.css";

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
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      console.log("EditProduct productId:", productId);
      console.log("EditProduct current products:", products);

      const foundProduct = Array.isArray(products)
        ? products.find((p) => String(p.id) === String(productId))
        : null;
      console.log("EditProduct found product in current products:", foundProduct);

      if (foundProduct) {
        setProduct(foundProduct);
        setLoading(false);
        return;
      }

      setLoading(true);
      try {
        const fetchedProducts = await getProducts(setProducts);
        const updatedProduct = fetchedProducts.find((p) => String(p.id) === String(productId));
        console.log("EditProduct found product after getProducts:", updatedProduct);
        setProduct(updatedProduct || null);
        setLoading(false);
      } catch (error) {
        console.log("Failed to fetch products:", error.message);
        setError(`Failed to fetch product with ID ${productId}.`);
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId, setProducts]);

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
    console.log("handleSubmit called with formData:", formData);

    const { error } = validateProduct(formData);
    console.log("Validation result:", error);

    if (error) {
      const newErrors = {};
      error.details.forEach((err) => {
        newErrors[err.path[0]] = err.message;
      });
      console.log("Validation errors:", newErrors);
      setFormErrors(newErrors);
      return;
    }

    setIsSubmitting(true);
    try {
      const updatedProduct = {
        ...formData,
        price: Number(formData.price),
      };
      console.log("Submitting updated product:", updatedProduct);

      setProducts((prev) =>
        (Array.isArray(prev) ? prev : []).filter((p) => String(p.id) !== String(productId))
      );

      const productExists = await getProductById(productId);
      if (productExists) {
        await updateProduct(productId, updatedProduct, setProducts);
        console.log("Product updated successfully, navigating to /admin");
      } else {
        await createProductWithId(productId, updatedProduct, setProducts);
        console.log("Product created successfully, navigating to /admin");
      }
      navigate("/admin");
    } catch (error) {
      console.log("Failed to save product:", error.message);
      setError(`Failed to save product. Please try again.`);
    } finally {
      setIsSubmitting(false);
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
          disabled={isSubmitting}
        >
          Back to Admin
        </button>
      </div>
    );
  }

  if (!product) {
    return (
      <div>
        <p>Product with ID {productId} not found.</p>
        <button
          className="add-edit-button"
          onClick={() => navigate("/admin")}
          disabled={isSubmitting}
        >
          Back to Admin
        </button>
      </div>
    );
  }

  return (
    <main className="admin-page">
      <h2 className="form-title-admin">Edit Product</h2>
      <form onSubmit={handleSubmit} className="product-form">
        <div className="form-group">
          <label htmlFor="type">Type</label>
          <select
            id="type"
            name="type"
            value={formData.type}
            onChange={handleChange}
            disabled={isSubmitting}
          >
            <option value="">Select type</option>
            <option value="game">Game</option>
            <option value="console">Console</option>
          </select>
          <p className={`error ${formErrors.type ? "visible" : ""}`}>
            {formErrors.type || ""}
          </p>
        </div>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter title"
            disabled={isSubmitting}
          />
          <p className={`error ${formErrors.title ? "visible" : ""}`}>
            {formErrors.title || ""}
          </p>
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter description"
            disabled={isSubmitting}
          />
          <p className={`error ${formErrors.description ? "visible" : ""}`}>
            {formErrors.description || ""}
          </p>
        </div>
        <div className="form-group">
          <label htmlFor="image">Image URL</label>
          <input
            id="image"
            name="image"
            value={formData.image}
            onChange={handleChange}
            placeholder="Enter image URL"
            disabled={isSubmitting}
          />
          <p className={`error ${formErrors.image ? "visible" : ""}`}>
            {formErrors.image || ""}
          </p>
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
            disabled={isSubmitting}
          />
          <p className={`error ${formErrors.price ? "visible" : ""}`}>
            {formErrors.price || ""}
          </p>
        </div>
        <div className="form-actions">
          <button
            type="submit"
            className="add-edit-button"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Saving..." : "Save Changes"}
          </button>
          <button
            type="button"
            className="delete-button"
            onClick={() => navigate("/admin")}
            disabled={isSubmitting}
          >
            Cancel
          </button>
        </div>
      </form>
    </main>
  );
};

export default EditProduct;