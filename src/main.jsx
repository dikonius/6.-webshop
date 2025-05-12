import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createHashRouter, RouterProvider } from 'react-router'
import Home from './pages/Home.jsx'
import Games from './pages/Games.jsx'
import Consoles from './pages/Consoles.jsx'
import Cart from './pages/Cart.jsx'
import Admin from './pages/Admin.jsx'
import Product from './pages/Product.jsx'
import AddProduct from './components/AddProduct.jsx'
import EditProduct from './components/EditProduct.jsx'

const router = createHashRouter([
	{
		path: '/',
		Component: App,
		children: [
			{
				index: true,
				Component: Home
			},
			{
				path: '/games',
				Component: Games
			},
			{
				path: '/consoles',
				Component: Consoles
			},
			{
				path: '/product/:productId',
				Component: Product
			},
			{
				path: '/cart/:cartId?',
				Component: Cart
			},
			{
				path: '/admin',
				Component: Admin
			},
			{
				path: '/add-product',
				Component: AddProduct
			},
			{
				path: '/edit-product/:productId',
				Component: EditProduct
			}
		]
	}
])

createRoot(document.getElementById('root')).render(
	<StrictMode>
		<RouterProvider router={router} />
	</StrictMode>,
)
