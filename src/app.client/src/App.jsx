import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import ProductsPage from './pages/ProductsPage.jsx'
import HomePage from './pages/HomePage.jsx'

function App() {
//falta agregar una vista de productos nuevos e imagenes tipo poster

  return (
    <>
      <Router>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/products" element={<ProductsPage />} />
          </Routes>
      </Router>
    </>
  )
}

export default App
