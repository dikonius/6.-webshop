import { useState } from 'react';
import { useAuth } from '../components/AuthContext.jsx';
import Joi from 'joi';
import './Login.css';

const loginSchema = Joi.object({
  username: Joi.string().min(3).required().messages({
    'string.empty': 'Username is required',
    'string.min': 'Username must be at least 3 characters long',
  }),
  password: Joi.string().min(8).required().messages({
    'string.empty': 'Password is required',
    'string.min': 'Password must be at least 8 characters long',
  }),
});

const Login = () => {
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
    setServerError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { error } = loginSchema.validate(formData, { abortEarly: false });

    if (error) {
      const newErrors = {};
      error.details.forEach((err) => {
        newErrors[err.path[0]] = err.message;
      });
      setErrors(newErrors);
      return;
    }

  
    if (formData.username === 'admin' && formData.password === 'password') {
      login(formData);
    } else {
      setServerError('Invalid username or password');
    }
  };

  return (
    <main className="login-page">
      <h2 className="form-title-admin">Admin Login</h2>
      <form onSubmit={handleSubmit} className="login-form">
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Enter username"
          />
          {errors.username && <p className="error visible">{errors.username}</p>}
          {!errors.username && <p className="error"></p>}
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter password"
          />
          {errors.password && <p className="error visible">{errors.password}</p>}
          {!errors.password && <p className="error"></p>}
        </div>
        {serverError && <p className="error visible">{serverError}</p>}
        <button type="submit" className="login-button">
          Login
        </button>
      </form>
    </main>
  );
};

export default Login;