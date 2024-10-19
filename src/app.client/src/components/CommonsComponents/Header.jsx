import './Header.css'
import logo from '../../assets/DOMinationSystemsLogo.png';
import cartCircle from '../../assets/cart-circle.svg';
import { useCart } from "../../context/CartController.jsx";
import { useLocation, useNavigate } from 'react-router-dom';


export const Header = () => {
    const { getQuantityProductsInCart } = useCart();
    const cartNumber = getQuantityProductsInCart();
    const navigate = useNavigate();
    const location = useLocation();


    if (cartNumber > 0)
    {
        const divQuantityProductsInCart = document.getElementById('QuantityProductsInCart'); 
        divQuantityProductsInCart.className= 'ShowQuantityProductsInCart';
    }

    const searchProduct = (event) =>{
        event.preventDefault(); 
        console.log("Entree!");
        
        const queryInput = document.getElementById("Search-bar").value;
        const queryParams = new URLSearchParams(location.search);
        const cate = queryParams.get('cate');
        if (cate) {
            navigate(`/products?cate=${cate}&q=${queryInput}`);
        } else {
            navigate(`/products?q=${queryInput}`);
        }
    };

    return(
    <>
    <header>
        <div className="logo">
            <a href="/"><img src={logo} alt='Logo de DOMination System'/></a>
        </div>

        <div className="SearchBar">
            <div className="SearchBar-Header"> 🔍 </div>
            <hr />
            <form onSubmit={searchProduct}><input type="text" id="Search-bar"  placeholder="Notebook Asus VivoBook 14, Ryzen 7, Nvidia GTX, Disco SSD..."></input></form>
        </div>
        


        <div className="Menu">
                <div className="Menu-Buttons">
                    <a href="/products?cate=0">📦 Productos </a>
                    <hr />
                    <a href="/Cart" className="cart">
                        <div className="cartIcon">
                            <div className="cartImage">🛒</div>
                            <div className="HideQuantityProductsInCart" id='QuantityProductsInCart'>
                                <div className='QuantityProductsInCart-circle' ><img src={cartCircle} alt=""  /></div>
                                <div className={(cartNumber>9) ? 'QuantityProductsInCart-number2' : 'QuantityProductsInCart-number'}>{cartNumber}</div>
                            </div>
                        </div>

                        <div className="cartTitle">Carrito</div>
                    </a >
                    <hr />
                    <a href="/profile">👤 Perfil</a>
                </div>
        </div>

    </header>
    </>
    )
}