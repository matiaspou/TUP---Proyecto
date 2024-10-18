import './Filters.css';
import categories from '../../mocks/categories.json';
import circleX from '../../assets/circle-x.svg';
import minus from '../../assets/minus.svg';
import plus from '../../assets/plus.svg';
import {  useState,  useEffect } from "react";
import { useNavigate, useLocation } from 'react-router-dom';


export function Filters() {

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

    const toggleViewCategories = () =>{
        const listOfCategories = document.getElementById("Filters-ListOfCategories")
        if(listOfCategories.className == "Filters-HideListOfCategories")
        {
            listOfCategories.className = "Filters-ShowListOfCategories";
            setlistOfCategoriesIsVisible(true);
        }
        else{
            listOfCategories.className = "Filters-HideListOfCategories";
            setlistOfCategoriesIsVisible(false);
        }
    }

    const applyCategory = (id, event) => {
        event.preventDefault();
        setCategoryApplicated(id);
        toggleViewCategories();
        navigate(`?cate=${id}`);
    };


    return (
        <>  
            <div className="Filters-Conteiner">
                {/* <button className={categoryApplicated ? "Filters-ShowCategoryApplicated" : "Filters-HideCategoryApplicated"} onClick={(event) => applyCategory(0, event)}>
                        {categoryApplicated ? getCategoryNameById(categoryApplicated) : 'Seleccione una categoría'}<img src={circleX} alt="" />
                </button> */}

                <button className="Filters-Title" onClick={toggleViewCategories} >
                🧐 Filtros
                    <img src={listOfCategoriesIsVisible ? minus : plus} className="Filters-TitleIcon" alt=""/>
                </button>

                {/* <ul className={categoryApplicated ? "Filters-HideListOfCategories" : "Filters-ShowListOfCategories"} id='Filters-ListOfCategories'>
                    {categories.map((category) => (
                        <li key={category.id}>
                            <a
                                onClick={(event) => applyCategory(category.id, event)}
                                href={`?cate=${category.id}`}> 
                                {category.nombre}
                            </a>
                        </li>
                    ))}
                </ul> */}

            </div>
        </>
    );
}    
