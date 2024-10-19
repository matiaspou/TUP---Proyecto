import './Header.css'
import logo from '../assets/DOMinationSystemsLogo.png';


export const Header = () => {

    return(
    <>
    <header>
        <div className="logo">
            <a href="/"><img src={logo} alt='Logo de DOMination System'/></a>
        </div>
        <div className="Menu">
                <div className="Menu-Buttons">
                    <a href="/products?cate=0"> </a>
                    <a href="/profile">👤 Perfil</a>
                </div>
        </div>
    </header>
    </>
    )
}