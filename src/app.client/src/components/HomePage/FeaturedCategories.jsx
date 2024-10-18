import './FeaturedCategories.css'
import categoriesList from "../../mocks/categories.json"

export function FeaturedCategories () {

    const category1 = categoriesList.find(category => category.id == 3);
    const category2 = categoriesList.find(category => category.id == 5);
    const category3 = categoriesList.find(category => category.id == 11);
    return( 
    <>
    <section className="featuredCategories-Conteiner">
        <div className="featuredCategories-Header">
          <h2>Categorías Destacadas</h2>
        </div>
        <div className="featuredCategories-Grid">
          <a href={`/products?cate=1`} className="category">{category1.nombre}</a>
          <a href={`/products?cate=2`} className="category">{category2.nombre}</a>
          <a href={`/products?cate=3`} className="category">{category3.nombre}</a>
        </div>
      </section>
    </>
)}