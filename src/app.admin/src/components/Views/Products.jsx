import './Products.css'


export const Products = () => {

    return(
    <>
        <div className='Products-Conteiner'>
            <div class="Products-Table" >
                    <table id="tablita">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Categoria</th>
                                <th>Titulo</th>
                                <th>Stock</th>
                                <th>Precio</th>
                                <th>Fecha de Ingreso</th>
                                <th>Acciones</th>
                            </tr>
                            <tr id="Productsfiltros">
                                <th><input type="number" id="filtroID" min="1" max="100" step="1"></input></th>
                                <th><input type="text" id="filtroNombre"></input></th>
                                <th><input type="text" id="filtroApellido"></input></th>
                                <th><input type="number" id="filtroID" min="1" max="100" step="1"></input></th>
                                <th><input type="number" id="filtroID" min="1" max="100" step="1"></input></th>
                                <th><input type="date" id="filtroFechaIngreso"></input></th>
                                <th>
                                    <button>Agregar producto ➕</button> 
                                </th>
                            </tr>
                        </thead>
                        <tbody id="table-body">
                            <tr>
                                <td>da</td>
                                <td>da</td>
                                <td>da</td>
                                <td>da</td>
                                <td>da</td>
                                <td>da</td> 
                                <td>
                                    <button>Editar 📝</button>
                                    <button>Eliminar ❌</button>
                                </td> 
                            </tr>
                            <tr>
                                <td>da</td>
                                <td>da</td>
                                <td>da</td>
                                <td>da</td>
                                <td>da</td>
                                <td>da</td> 
                                <td>
                                    <button>Editar 📝</button>
                                    <button>Eliminar ❌</button>
                                </td> 
                            </tr>
                            <tr>
                                <td>da</td>
                                <td>da</td>
                                <td>da</td>
                                <td>da</td>
                                <td>da</td>
                                <td>da</td> 
                                <td>
                                    <button>Editar 📝</button>
                                    <button>Eliminar ❌</button>
                                </td> 
                            </tr>
                        </tbody>
                    </table>
            </div>

            

        </div>
</>
)}

export default Products