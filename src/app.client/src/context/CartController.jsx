import { createContext, useState, useContext, useEffect } from "react";
import productsStock from "../mocks/products.json";

const CartContext = createContext();

export const CartController = ({ children }) => {

  const cartLocalStorage = JSON.parse(localStorage.getItem("productsInCart"));
  
  const [productsInCart, setProductsInCart] = useState([]);

  useEffect(() => {
    if(cartLocalStorage){
      setProductsInCart(cartLocalStorage);
    } 
  }, {children})


  useEffect(() => {
    if(productsInCart.length>0){
      localStorage.setItem("productsInCart", JSON.stringify(productsInCart));
    }
  }, [productsInCart])

  const addToCart = (idProductToAdd) => {
    var productAddedBefore = productsInCart.find((product) => product.id == idProductToAdd);
    
    if (productAddedBefore) {
      productAddedBefore.amount += 1;
      setProductsInCart([...productsInCart]);
    } 

    else {
      var productToAdd = productsStock.find((product) => product.id == idProductToAdd);

      const mappedProductToAdd = {
        id: productToAdd.id,
        title: productToAdd.title,
        image: productToAdd.image,
        price: productToAdd.price,
        amount: 1
      };
      setProductsInCart([...productsInCart, mappedProductToAdd]);
    }
  };

  const getProductsInCart = () => {
    return productsInCart;
  };

  const checkIdInCart = (id) => {
    if(productsInCart.find((product) => product.id == id)){
      return true;
    }else{
      return false;
    }
  };

  const getAmountProductsInCart = () => {
    return productsInCart.reduce((acc, product) => acc + product.amount, 0);
  };

  return (
    <CartContext.Provider value={{ addToCart, getProductsInCart, getAmountProductsInCart, checkIdInCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
