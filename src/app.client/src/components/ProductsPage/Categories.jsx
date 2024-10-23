import './Categories.css';
import circleX from '../../assets/circle-x.svg';
import minus from '../../assets/minus.svg';
import plus from '../../assets/plus.svg';
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from 'react-router-dom';

export function Categories() {
    const [listOfCategoriesIsVisible, setListOfCategoriesIsVisible] = useState(true);
    const [categories, setCategories] = useState(null);
    const [categoryApplicated, setCategoryApplicated] = useState(0);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        fetch("http://localhost/src/TUP---Proyecto/src/app.server/controllers/CategoriesController.php", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ action: 'getAllCategories'})
        })
        .then(response => response.json())
        .then(data => {
            setCategories(data.result); 
        })
        .catch((error) => console.log('Error en fetch:', error));
    }, []);

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const cate = queryParams.get('cate');
        if (cate) {
            setCategoryApplicated(Number(cate)); 
        }
    }, [location.search]);

    const getCategoryNameById = (id) => {
        const category = categories?.find(category => category.id_categoria === String(id)); 
        return category ? category.nombre_categoria : 'Categoría no encontrada';
    };
    

    const toggleViewCategories = () => {
        setListOfCategoriesIsVisible(prevState => !prevState);
    };

    const applyCategory = (id, event) => {
        event.preventDefault();
        setCategoryApplicated(id);
        toggleViewCategories();

        const queryParams = new URLSearchParams(location.search);
        const search = queryParams.get('q');
        navigate(`?cate=${id}${search ? `&q=${search}` : ''}`);
    };

    return (
        <div className="Categories-Conteiner">
            <button 
                className={categoryApplicated ? "Categories-ShowCategoryApplicated" : "Categories-HideCategoryApplicated"} 
                onClick={(event) => applyCategory(0, event)}
            >
                {categoryApplicated ? getCategoryNameById(categoryApplicated) : 'Seleccione una categoría'}
                <img src={circleX} alt="Cerrar categoría" />
            </button>

            <button className="Categories-Title" onClick={toggleViewCategories}>
                🏷️ Categorías
                <img src={listOfCategoriesIsVisible ? minus : plus} className="Categories-TitleIcon" alt="Icono de desplegar/cerrar" />
            </button>

            {categories && (
                <ul className={listOfCategoriesIsVisible ? "Categories-ShowListOfCategories" : "Categories-HideListOfCategories"} id='Categories-ListOfCategories'>
                    {categories.map((category) => (
                        <li key={category.id_categoria}>
                            <a
                                onClick={(event) => applyCategory(category.id_categoria, event)}
                                href={`?cate=${category.id_categoria}`}
                            > 
                                {category.nombre_categoria}
                            </a>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
