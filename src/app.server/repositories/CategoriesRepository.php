<?php
include '../config/headers.php';


function getCategoryByID($id)
{
    $connection = getConnection();
    $stmt = $connection->prepare("SELECT nombre_categoria FROM categoria_producto WHERE id_categoria = ?");
    $stmt->bind_param("i", $id);
    $stmt->execute();
    $result = $stmt->get_result();
    $category = $result->fetch_object();

    return json_encode([
        'success' => $category !== null,
        'result' => $category,
        'message' => $category ? 'Categoria encontrada' : 'Categoria no encontrada'
    ]);
}

function getAllCategories()
{
    $connection = getConnection();
    $result = $connection->query("SELECT id_categoria, nombre_categoria FROM categoria_producto");

    if ($result) {
        $categories = $result->fetch_all(MYSQLI_ASSOC);
        return json_encode([
            'success' => true,
            'result' => $categories,
            'message' => 'Categorias obtenidos correctamente'
        ]);
    }

    return json_encode([
        'success' => false,
        'result' => null,
        'message' => 'Error al obtener las categorias'
    ]);
}

function insertCategory($category)
{
    $connection = getConnection();
    $stmt = $connection->prepare("INSERT INTO categoria_producto (nombre_categoria) VALUES (?)");
    $stmt->bind_param("s", $category->nombre_categoria);
    $result = $stmt->execute();

    return json_encode([
        'success' => $result,
        'result' => null,
        'message' => $result ? 'Categoria insertado correctamente' : 'Error al insertar la categoria'
    ]);
}

function getConnection()
{
    $connection = mysqli_connect("localhost", "root", "", "tienda");
    if ($connection->connect_error) {
        die("Error de conexión: " . $connection->connect_error);
    } else {
        return $connection;
    }
}
?>
