import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addProduct } from "../data/crud.js";
import { useProductStore } from "../data/store.js";
import { validateProduct } from "../data/validation.js";
import "../pages/Admin.css";
import "../styles/adminForm.css";

const AddProduct = () => {
  const navigate = useNavigate();
  const setProducts = useProductStore((state) => state.setProducts);
  const [formData, setFormData] = useState({
    type: "",
    title: "",
    description: "",
    image: "",
    price: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { error } = validateProduct(formData);
    if (error) {
      const newErrors = {};
      error.details.forEach((err) => {
        newErrors[err.path[0]] = err.message;
      });
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);
    try {
      const newProduct = {
        ...formData,
        price: Number(formData.price),
      };
      await addProduct(newProduct, setProducts);
      navigate("/admin");
    } catch (error) {
      console.error("Failed to add product:", error.message);
      setErrors({ general: "Failed to add product. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  return (
    <main className="admin-page">
      <h2 className="form-title-admin">Add New Product</h2>
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
          {errors.type && <p className="error visible">{errors.type}</p>}
          {!errors.type && <p className="error"></p>}
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
          {errors.title && <p className="error visible">{errors.title}</p>}
          {!errors.title && <p className="error"></p>}
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
          {errors.description && <p className="error visible">{errors.description}</p>}
          {!errors.description && <p className="error"></p>}
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
          {errors.image && <p className="error visible">{errors.image}</p>}
          {!errors.image && <p className="error"></p>}
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
          {errors.price && <p className="error visible">{errors.price}</p>}
          {!errors.price && <p className="error"></p>}
        </div>
        {errors.general && <p className="error visible">{errors.general}</p>}
        <div className="form-actions">
          <button
            type="submit"
            className="add-edit-button"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Saving..." : "Add Product"}
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

export default AddProduct;