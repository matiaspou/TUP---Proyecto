$(document).ready(function(){
    var objJugadores;
    var objClubes;
    var modal = document.getElementById("modalAgregar");
    var modalModificar = document.getElementById("modalModificar");
    var ordenG="`ID`";
    var direccionG="ASC";


    // evento para aplicar el orden al cambiar el select
    $("#ordenSelect").on("input change",function(){
        ordenG=$("#ordenSelect").val();
        cargarTabla();
    }); 

     // evento para aplicar el orden al cambiar el select
     $("#direccionSelect").on("input change",function(){
        direccionG=$("#direccionSelect").val();
        cargarTabla();
    }); 
    
    cargarSelecciones();

    

     // fucnion para limpiar los filtros
     function limpiarFiltros(){
        $("#filtroID").val("");
        $("#filtroClub").val("");
        $("#filtroNombre").val("");
        $("#filtroFechaNac").val("");
        $("#filtroPosicion").val("");
        $("#filtroPJ").val("");
    };

     // evento para limpiar los filtros
     $("#limpiarFiltros").click(function(){
        limpiarFiltros();
        cargarTabla();
    });

    // evento para aplicar los filtros cuando se escribe en los input
    $("#filtroID,#filtroClub,#filtroNombre,#filtroFechaNac,#filtroPosicion,#filtroPJ").on("input change",function(){
        aplicarFiltros();
    });   
    
    // funcion para aplicar los filtros
    function aplicarFiltros(){
        const filtroID = $("#filtroID").val();
        let filtroClub;
        if($("#filtroClub").val()){
            filtroClub= $("#filtroClub").val().toLowerCase();
        }else{
            filtroClub="";
        }
        
        const filtroNombre = $("#filtroNombre").val().toLowerCase();
        const filtroFechaNac = $("#filtroFechaNac").val();
        const filtroPosicion = $("#filtroPosicion").val().toLowerCase();
        const filtroPJ= $("#filtroPJ").val();

        $("#table-body tr").each(function(){
            const ID = $(this).find("td").eq(0).text();
            const Club = $(this).find("td").eq(1).text().toLowerCase();
            const Nombre = $(this).find("td").eq(2).text().toLowerCase();
            const FechaNac = $(this).find("td").eq(3).text();
            const Posicion = $(this).find("td").eq(4).text().toLowerCase();
            const PJ= $(this).find("td").eq(5).text();

            const IdMatch = ID.includes(filtroID);
            const ClubMatch = filtroClub === "" || Club === filtroClub; // Filtro exacto para el club
            const NombreMatch = Nombre.includes(filtroNombre);
            const FechaNacMatch = FechaNac.includes(filtroFechaNac);
            const PosicionMatch = Posicion.includes(filtroPosicion);
            const PJMatch = PJ.includes(filtroPJ);

            if (IdMatch && ClubMatch && NombreMatch && FechaNacMatch && PosicionMatch && PJMatch) {
                $(this).show();
            } else {
                $(this).hide();
            }
        });
    };

    // Función para cargar la tabla con los datos de los jugadores
    function cargarSelecciones(){
        $.ajax({
            type:"GET",
            url:"salidaClubes.php",
            success:function(res){
                objClubes=res;
                objClubes.clubes.forEach(club => {
                    opciones=`
                    <option value="${club.siglas}" >${club.nombre}</option>
                    `;
                $("#filtroClub").append(opciones); // Agregar opciones en las listas
                $("#ClubModi").append(opciones);
                $("#Club").append(opciones);
                });
            }
        })
    };



// Función para cargar la tabla con los datos de los jugadores
function cargarTabla(){
    $.ajax({
        type: "GET",
        url: "salidaJugadores.php",
        dataType: "json", // Asegúrate de que la respuesta se interprete como JSON
        data: {
            orden: ordenG,
            direccion: direccionG,
        },
        success: function(res) {
            $("#table-body").empty();
            if (res && res.jugadores) {
                objJugadores = res;
                objJugadores.jugadores.forEach(jugador => {
                    let fila = `
                    <tr>
                    <td class="cortito">${jugador.ID}</td>
                    <td class="largo">${jugador.Club}</td>
                    <td class="largo">${jugador.Nombre}</td>
                    <td class="largo">${jugador.FechaNac}</td>
                    <td class="largo">${jugador.Posicion}</td>
                    <td class="cortito">${jugador.PJ}</td>
                    <td class="cortito"><img src="./img/foto.png" alt="Foto del jugador" class="btn-foto" IDfoto="${jugador.ID}"></td>
                    <td class="cortito"><img src="./img/modificar.png" class="modificar" id="btn-modi" IDmodi="${jugador.ID}"></td>
                    <td class="cortito"><img src="./img/eliminar.png" class="eliminar" id="btn-baja" IDremove="${jugador.ID}"></td>
                    </tr>`;
                    $("#table-body").append(fila); // Agrega la fila a la tabla
                    habilitarInputs();
                });
            } else {
                console.error("Datos de jugadores no encontrados.");
            }
        },
        error: function(xhr, status, error) {
            console.error("Error en la solicitud AJAX:", status, error);
        }
    });
    
    
}

    // Función para vaciar la tabla
    function vaciarTabla(){
        $("#table-body").empty();
        limpiarFiltros();
    }
    
     // Función para vaciar el formulario
    function vaciarForm(){
        $("#ID").val("");
        $("#Club").val("");
        $("#Nombre").val("");
        $("#FechaNac").val("");
        $("#Posicion").val("");
        $("#PJ").val("");
        $("#Foto").val("");
    }


    // Evento para cargar la tabla
    $("#cargar").click(function(){
        cargarTabla();
        
    });

    // Evento para vaciar la tabla
    $("#vaciar").click(function(){
        vaciarTabla();
        habilitarInputs();
    });

    // Evento para mostrar el modal de agregar jugador
    $("#agregarJugador").click(function(){
        modal.style.display = "flex";
    });

    
    // Evento para cerrar el modal de agregar jugador
    $("#cerrarModal").click(function(){
        modal.style.display = "none";
        vaciarForm();
    });

    // Evento para cerrar el modal de modificar jugador
    $("#cerrarModalModificar").click(function(){
        modalModificar.style.display = "none";
        
    });

    // Evento para cargar los datos del formulario con los datos del jugador a modificar
    function cargarDatosModificar(IDmodi) {
        $.ajax({
            type: "GET",
            url: "salidaJugadores.php",
            dataType: "json", // Asegúrate de que la respuesta se espera como JSON
            success: function (res) {
                console.log("Respuesta del servidor:", res); // Verifica la respuesta
    
                // Asegúrate de que objJugadores está definido y contiene la estructura correcta
                if (res && res.jugadores) {
                    const jugador = res.jugadores.find(j => j.ID == IDmodi); // Usa find() para obtener el jugador correcto
    
                    if (jugador) {
                        $("#IdModi").val(jugador.ID);
                        $("#IdModi").attr("readonly", true);
                        $("#ClubModi").val(jugador.Club);
                        $("#NombreModi").val(jugador.Nombre);
                        $("#FechaNacModi").val(jugador.FechaNac);
                        $("#PosicionModi").val(jugador.Posicion);
                        $("#PJModi").val(jugador.PJ);
                        $("#FotoModi").attr("src", "verFoto.php?ID=" + jugador.ID); // Ajusta según cómo obtienes la foto
                    } else {
                        console.error("Jugador no encontrado con ID:", IDmodi);
                    }
                } else {
                    console.error("Estructura de datos inesperada:", res);
                }
            },
            error: function (xhr, status, error) {
                console.error("Error en la solicitud AJAX:", error);
            }
        });
    }
    


    // Cerrar el modal para ver imagen
    $('#cerrarModalFoto').click(function() {
        modalFoto.style.display = "none";
        $('#imgFoto').attr('src', '');
    });

    // Evento para mostrar el modal de la foto del jugador
    $(document).on("click", ".btn-foto", function(){
        modalFoto.style.display = "flex";
        var ID = $(this).attr("IDfoto");;
        $.ajax({
            type:"POST",
            url:"verFoto.php",
            data:{ ID: ID },
            success: function(response){
                $('#imgFoto').attr('src', 'data:image/png;base64,' + response); // Establecer src con base64
            }
        });
    });

    // Evento para mostrar el modal de modificar jugador
    $(document).on("click", ".modificar", function(){
        modalModificar.style.display = "flex";
        var ID = $(this).attr("IDmodi");
        cargarDatosModificar(ID);
    });

    // Evento para modificar un jugador
    $("#btn-modificar").click(function(){
        var form = $('#modPlayer')[0];
        var formuDataModi= new FormData(form);
        $.ajax({
            type:"POST",
            url:"modi.php",
            data:formuDataModi,
            contentType: false,
            processData: false,
            success: function(response){
                modalModificar.style.display = "none";
                cargarTabla(); // Recargar la tabla después de modificar el jugador
            }
        });
        return false; // previene que el formulario sea enviado de la manera tradicional (es decir, recargando la página).
    });
    

    // Evento para agregar un nuevo jugador
    $("#btn-agregar").click(function(){
        var form = $('#addPlayer')[0];
        var formuData= new FormData(form);
        $.ajax({
            type:"POST",
            url:"alta.php",
            data:formuData,
            contentType: false,
            processData: false,
            success: function(response){
                modal.style.display = "none";
                vaciarForm();
                cargarTabla(); // Recargar la tabla después de agregar el jugador
                }
        });
        return false; // previene que el formulario sea enviado de la manera tradicional (es decir, recargando la página).
    });

    // Evento para eliminar un nuevo jugador
    $(document).on("click", ".eliminar", function(){
        if(confirm("¿Estás seguro que deseas eliminar este jugador?"))
        {
            var ID = $(this).attr("IDremove");
            $.ajax({
                type:"POST",
                url:"baja.php",
                data:{ ID: ID },
                success: function(response){
                    cargarTabla(); // Recargar la tabla después de eliminar el jugador
                }
            });
        }
        
    });
});