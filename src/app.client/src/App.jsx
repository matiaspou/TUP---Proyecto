import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { CartController } from "./context/CartController";
import ProductsPage from './pages/ProductsPage.jsx'
import HomePage from './pages/HomePage.jsx'
import SingleProductPage from './pages/SingleProductPage.jsx'
import CartPage from './pages/CartPage.jsx';
import ProfilePage from './pages/ProfilePage.jsx';
import PaymentPage from './pages/PaymentPage.jsx';
import LoginAndRegisterPage from './pages/LoginAndRegisterPage.jsx';

function App() {
//falta agregar una vista de productos nuevos e imagenes tipo poster

  return (
    <>
     <CartController>
        <Router>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/products" element={<ProductsPage />} />
              <Route path="/product" element={<SingleProductPage/>} />
              <Route path="/cart" element={<CartPage/>} />
              <Route path="/profile" element={<ProfilePage/>} />
              <Route path="/login" element={<LoginAndRegisterPage/>} />
              <Route path="/payment" element={<PaymentPage/>} />
            </Routes>
        </Router>
      </CartController>
    </>
  )
}

export default App
