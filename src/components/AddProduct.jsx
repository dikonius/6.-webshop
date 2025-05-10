import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addProduct } from "../data/crud.js";
import { useProductStore } from "../data/store.js";
import { validateProduct } from "../data/validation.js";
import "../styles/admin.css";

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

    const newProduct = {
      ...formData,
      price: Number(formData.price),
    };
    await addProduct(newProduct, setProducts);
    navigate("/admin");
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  return (
    <main className="admin-page">
      <h2>Add New Product</h2>
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
          {errors.type && <p className="error">{errors.type}</p>}
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
          {errors.title && <p className="error">{errors.title}</p>}
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
          {errors.description && <p className="error">{errors.description}</p>}
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
          {errors.image && <p className="error">{errors.image}</p>}
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
          {errors.price && <p className="error">{errors.price}</p>}
        </div>
        <div className="form-actions">
          <button type="submit" className="add-edit-button">
            Add Product
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

export default AddProduct;