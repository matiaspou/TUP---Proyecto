import './Orders.css'


export const Orders = () => {

    return(
    <>
        <div className='Orders-Conteiner'>
            <div class="Orders-Table" >
                    <table id="tablita">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Nombre</th>
                                <th>Apellido</th>
                                <th>Fecha de Ingreso</th>
                                <th>Tipo de usuario</th>
                                <th>Permisos</th>
                                <th>Acciones</th>
                            </tr>
                            <tr id="Orders-Filters">
                                <th><input type="number" id="filtroID" min="1" max="100" step="1"></input></th>
                                <th><input type="text" id="filtroNombre"></input></th>
                                <th><input type="text" id="filtroApellido"></input></th>
                                <th><input type="date" id="filtroFechaIngreso"></input></th>
                                <th>
                                    <select id="filtroTipo">
                                        <option value="Admin">Admin</option>
                                        <option value="Client">Client</option>
                                    </select>
                                </th>
                                <th><input type="text" id="filtroApellido"></input></th>
                                <th>
                                    
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

export default Orders