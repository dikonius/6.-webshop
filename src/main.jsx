import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { createHashRouter, RouterProvider } from 'react-router-dom';
import Home from './pages/Home.jsx';
import Games from './pages/Games.jsx';
import Consoles from './pages/Consoles.jsx';
import Cart from './pages/Cart.jsx';
import Admin from './pages/Admin.jsx';
import Product from './pages/Product.jsx';
import AddProduct from './components/AddProduct.jsx';
import EditProduct from './components/EditProduct.jsx';
import Login from './pages/Login.jsx';
import ProtectedRoute from './components/ProtectedRout.jsx';
import AuthWrapper from './components/AuthWrapper.jsx';

const router = createHashRouter([
  {
    path: '/',
    element: <AuthWrapper><App /></AuthWrapper>, 
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: '/games',
        element: <Games />,
      },
      {
        path: '/consoles',
        element: <Consoles />,
      },
      {
        path: '/product/:productId',
        element: <Product />,
      },
      {
        path: '/cart/:cartId?',
        element: <Cart />,
      },
      {
        path: '/login',
        element: <Login />,
      },
      {
        element: <ProtectedRoute />, 
        children: [
          {
            path: '/admin',
            element: <Admin />,
          },
          {
            path: '/add-product',
            element: <AddProduct />,
          },
          {
            path: '/edit-product/:productId',
            element: <EditProduct />,
          },
        ],
      },
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);