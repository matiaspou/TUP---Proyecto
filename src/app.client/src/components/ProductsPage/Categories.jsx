import './Categories.css';
import categories from '../../mocks/categories.json';
import circleX from '../../assets/circle-x.svg';
import minus from '../../assets/minus.svg';
import plus from '../../assets/plus.svg';
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from 'react-router-dom';

export function Categories() {
    const [listOfCategoriesIsVisible, setlistOfCategoriesIsVisible] = useState(true);
    const [categoryApplicated, setCategoryApplicated] = useState(0);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const cate = queryParams.get('cate');
        if (cate) {
            setCategoryApplicated(Number(cate)); 
        }
    }, [location.search]);

    const getCategoryNameById = (id) => {
        const category = categories.find(category => category.id === id);
        return category ? category.nombre : 'Categoría no encontrada';
    };

    const toggleViewCategories = () => {
        setlistOfCategoriesIsVisible(prevState => !prevState);
    };

    const applyCategory = (id, event) => {
        event.preventDefault();
        setCategoryApplicated(id);
        toggleViewCategories();

        const queryParams = new URLSearchParams(location.search);
        const search = queryParams.get('q');
        (search) ? navigate(`?cate=${id}&q=${search}`) : navigate(`?cate=${id}`);
    };

    return (
        <>
            <div className="Categories-Conteiner">

                <button 
                    className={categoryApplicated ? "Categories-ShowCategoryApplicated" : "Categories-HideCategoryApplicated"} 
                    onClick={(event) => applyCategory(0, event)}
                >
                    {categoryApplicated ? getCategoryNameById(categoryApplicated) : 'Seleccione una categoría'}
                    <img src={circleX} alt="Cerrar categoría" />
                </button>

                <button className="Categories-Title" onClick={toggleViewCategories}>
                    🏷️ Categorias
                    <img src={listOfCategoriesIsVisible ? minus : plus} className="Categories-TitleIcon" alt="Icono de desplegar/cerrar" />
                </button>

                <ul className={listOfCategoriesIsVisible ? "Categories-ShowListOfCategories" : "Categories-HideListOfCategories"} id='Categories-ListOfCategories'>
                    {categories.map((category) => (
                        <li key={category.id}>
                            <a
                                onClick={(event) => applyCategory(category.id, event)}
                                href={`?cate=${category.id}`}
                            > 
                                {category.nombre}
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
}
