import { createContext, useState, useContext, useEffect } from "react";

const CartContext = createContext();

export const CartController = ({ children }) => {

  const cartLocalStorage = JSON.parse(localStorage.getItem("productsInCart"));
  
  const [productsInCart, setProductsInCart] = useState([]);
  
 
  useEffect(() => {
    if(cartLocalStorage){
      setProductsInCart(cartLocalStorage);
    } 
  }, [children])


  useEffect(() => {
      localStorage.setItem("productsInCart", JSON.stringify(productsInCart));
  }, [productsInCart])


  const addToCart = async (idProductToAdd) => {
    var productAddedBefore = productsInCart.find((product) => product.id_producto == idProductToAdd);
    
    if (productAddedBefore) {
      productAddedBefore.quantity += 1;
      setProductsInCart([...productsInCart]);
    } 

    else {
      var productToAdd = await getProductByID(idProductToAdd);
      
      const mappedProductToAdd = {
        id_producto: productToAdd.id_producto,
        nombre_producto: productToAdd.nombre_producto,
        url_imagen: productToAdd.url_imagen,
        precio: productToAdd.precio,
        quantity: 1
      };
      setProductsInCart([...productsInCart, mappedProductToAdd]);
    }
  };

  const getProductByID = async (id) => {
    try {
      const response = await fetch("http://localhost/src/TUP---Proyecto/src/app.server/controllers/ProductsController.php", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ action: 'getProductById', id: id })
      });
  
      const data = await response.json();
      return data.result;  
  
    } catch (error) {
      console.log('Error en fetch:', error);
      return null; 
    }
  };
  

  const getProductsInCart = () => {
    return productsInCart;
  };

  const checkIdInCart = (id) => {
    if(productsInCart.find((product) => product.id_producto == id)){
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
        product.id_producto === productId
          ? { ...product, quantity: product.quantity+newQuantity } 
          : product 
      )
    );
  };

  const deleteProductInCart = (id) =>{
    const productsFiltered = productsInCart.filter(product => product.id_producto !== id);
    setProductsInCart(productsFiltered)
  }

  const getPriceTotalOfCart = () => {
    const priceTotal = productsInCart.reduce((acum, product) => {
      return acum + (product.precio * product.quantity);
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
