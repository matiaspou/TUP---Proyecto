import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './Categories.css';
import categories from '../mocks/categories.json';
import circleX from '../assets/circle-x.svg';
import dot from '../assets/dot-single.svg';
import minus from '../assets/minus.svg';
import plus from '../assets/plus.svg';

export function Categories() {
    const [categoryApplicated, setCategoryApplicated] = useState(0);
    const navigate = useNavigate();
    const location = useLocation();

    const [listOfCategoriesIsVisible, setlistOfCategoriesIsVisible] = useState(true);

    // Convertimos el parámetro 'cate' a número al obtenerlo de la URL
    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const cate = queryParams.get('cate');
        if (cate) {
            setCategoryApplicated(Number(cate)); // Convertimos 'cate' a número
        }
    }, [location.search]);

    // Función para navegar y actualizar la categoría seleccionada
    const applyCategory = (id, event) => {
        event.preventDefault();
        setCategoryApplicated(id);
        (id!=0) ? setlistOfCategoriesIsVisible(false): setlistOfCategoriesIsVisible(true);;
        navigate(`?cate=${id}`);
    };

    // Función para obtener el nombre de la categoría por ID
    const getCategoryNameById = (id) => {
        const category = categories.find(category => category.id === id);
        return category ? category.nombre : 'Categoría no encontrada';
    };

    const toggleViewCategories = () =>{
        const listOfCategories = document.getElementById("Categories-ListOfCategories")
        if(listOfCategories.className == "Categories-HideListOfCategories")
        {
            listOfCategories.className = "Categories-ShowListOfCategories";
            setlistOfCategoriesIsVisible(true);
        }
        else{
            listOfCategories.className = "Categories-HideListOfCategories";
            setlistOfCategoriesIsVisible(false);
        }
    }

    

    return (
        <>  
            <div className="Categories-Conteiner">
                <button className={categoryApplicated ? "Categories-ShowCategoryApplicated" : "Categories-HideCategoryApplicated"} onClick={(event) => applyCategory(0, event)}>
                        {categoryApplicated ? getCategoryNameById(categoryApplicated) : 'Seleccione una categoría'}<img src={circleX} alt="" />
                </button>

                <button className="Categories-Title" onClick={toggleViewCategories} >
                    Categorias
                    <img src={listOfCategoriesIsVisible ? minus : plus} className="Categories-TitleIcon" alt=""/>
                </button>

                <ul className={categoryApplicated ? "Categories-HideListOfCategories" : "Categories-ShowListOfCategories"} id='Categories-ListOfCategories'>
                    {categories.map((category) => (
                        <li key={category.id}>
                            <a
                                onClick={(event) => applyCategory(category.id, event)}
                                href={`?cate=${category.id}`}> {/* El href también navega */}
                                {category.nombre}
                            </a>
                        </li>
                    ))}
                </ul>

            </div>
        </>
    );
}    
