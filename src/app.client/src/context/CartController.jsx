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
      productAddedBefore.quantity += 1;
      setProductsInCart([...productsInCart]);
    } 

    else {
      var productToAdd = productsStock.find((product) => product.id == idProductToAdd);

      const mappedProductToAdd = {
        id: productToAdd.id,
        title: productToAdd.title,
        image: productToAdd.image,
        price: productToAdd.price,
        quantity: 1
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

  const getQuantityProductsInCart = () => {
    return productsInCart.reduce((acc, product) => acc + product.quantity, 0);
  };

  const updateProductQuantity = (productId, newQuantity) => {
    setProductsInCart(prevProducts =>
      prevProducts.map(product => 
        product.id === productId
          ? { ...product, quantity: product.quantity+newQuantity } 
          : product 
      )
    );
  };

  const deleteProductInCart = (id) =>{
    const productsFiltered = productsInCart.filter(product => product.id !== id);
    setProductsInCart(productsFiltered)
  }

  const getPriceTotalOfCart = () => {
    const priceTotal = productsInCart.reduce((acum, product) => {
      return acum + (product.price * product.quantity);
    }, 0);
    return priceTotal;
  }

  return (
    <CartContext.Provider value={{ addToCart, getProductsInCart, getQuantityProductsInCart, checkIdInCart, updateProductQuantity, deleteProductInCart, getPriceTotalOfCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
