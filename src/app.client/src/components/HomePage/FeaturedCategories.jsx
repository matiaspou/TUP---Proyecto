import './FeaturedCategories.css'
import { useEffect, useState } from 'react';

export function FeaturedCategories () {
    const [categoriesList, setCategoriesList] = useState(null);
    

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
        setCategoriesList(data.result); 
      })
      .catch((error) => console.log('Error en fetch:', error));
    }, []);
    
  if (!categoriesList) {
    return null; 
  }

  const category1 = categoriesList.find(category => category.id_categoria == 3);
  const category2 = categoriesList.find(category => category.id_categoria == 5);
  const category3 = categoriesList.find(category => category.id_categoria == 11);
  
  return (
    <>
      <section className="featuredCategories-Conteiner">
        <div className="featuredCategories-Header">
          <h2>Categorías Destacadas</h2>
        </div>
        <div className="featuredCategories-Grid">
          {category1 && <a href={`/products?cate=${category1.id}`} className="category">{category1.nombre_categoria}</a>}
          {category2 && <a href={`/products?cate=${category2.id}`} className="category">{category2.nombre_categoria}</a>}
          {category3 && <a href={`/products?cate=${category3.id}`} className="category">{category3.nombre_categoria}</a>}
        </div>
      </section>
    </>
  );
}