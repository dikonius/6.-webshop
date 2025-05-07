
import { Outlet } from 'react-router'
import './App.css'
import Header from './pages/Header'
import Footer from './pages/Footer'

function App() {


  return (
    <div className="app">
      <Header />
      <Outlet />
      <Footer />
    </div>
  )
}

export default App
