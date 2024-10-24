<?php
include '../config/headers.php';

function deleteProduct($id)
{
    $connection = getConnection();
    $stmt = $connection->prepare("DELETE FROM producto WHERE id_producto = ?");
    $stmt->bind_param("i", $id); // 'i' indica que $id es un entero
    $result = $stmt->execute();
    
    return json_encode([
        'success' => $result,
        'result' => null,
        'message' => $result ? 'Producto eliminado correctamente' : 'Error al eliminar el producto'
    ]);
}

function updateProduct($product)
{
    $connection = getConnection();
    $stmt = $connection->prepare("UPDATE producto SET nombre_producto = ?, precio = ?, url_imagen = ?, id_categoria = ?, marca = ? WHERE id_producto = ?");
    $stmt->bind_param("sdissi", $product->nombre_producto, $product->precio, $product->url_imagen, $product->id_categoria, $product->marca, $product->id_producto);
    $result = $stmt->execute();

    return json_encode([
        'success' => $result,
        'result' => null,
        'message' => $result ? 'Producto actualizado correctamente' : 'Error al actualizar el producto'
    ]);
}

function incrementInteractionsCount($id)
{
    $connection = getConnection();
    $stmt = $connection->prepare("UPDATE producto SET interacciones = interacciones + 1  WHERE id_producto = ?");
    $stmt->bind_param("i", $id);
    $stmt->execute();
    $result = $stmt->get_result();

    return json_encode([
        'success' => $result,
        'result' => null,
        'message' => $result ? 'Interacciones actualizadas' : 'No se pudo actualizar las interacciones'
    ]);
}

function getProductById($id)
{
    $connection = getConnection();
    $stmt = $connection->prepare("SELECT id_producto, nombre_producto, precio, url_imagen, id_categoria, marca FROM producto WHERE id_producto = ?");
    $stmt->bind_param("i", $id);
    $stmt->execute();
    $result = $stmt->get_result();
    $product = $result->fetch_object();

    return json_encode([
        'success' => $product !== null,
        'result' => $product,
        'message' => $product ? 'Producto encontrado' : 'Producto no encontrado'
    ]);
}

function getAllProducts()
{
    $connection = getConnection();
    $result = $connection->query("SELECT id_producto, nombre_producto, precio, url_imagen, id_categoria, marca FROM producto");

    if ($result) {
        $products = $result->fetch_all(MYSQLI_ASSOC);
        return json_encode([
            'success' => true,
            'result' => $products,
            'message' => 'Productos obtenidos correctamente'
        ]);
    }

    return json_encode([
        'success' => false,
        'result' => null,
        'message' => 'Error al obtener productos'
    ]);
}

function getSelectedProducts()
{
    $connection = getConnection();
    $result = $connection->query("SELECT id_producto, nombre_producto, precio, url_imagen, id_categoria, marca FROM producto LIMIT 15");

    if ($result) {
        $products = $result->fetch_all(MYSQLI_ASSOC);
        return json_encode([
            'success' => true,
            'result' => $products,
            'message' => 'Productos obtenidos correctamente'
        ]);
    }

    return json_encode([
        'success' => false,
        'result' => null,
        'message' => 'Error al obtener productos'
    ]);
}

function insertProduct($product)
{
    $connection = getConnection();
    $stmt = $connection->prepare("INSERT INTO producto (nombre_producto, precio, url_imagen, id_categoria, marca) VALUES (?, ?, ?, ?, ?)");
    $stmt->bind_param("sdsss", $product->nombre_producto, $product->precio, $product->url_imagen, $product->id_categoria, $product->marca);
    $result = $stmt->execute();

    return json_encode([
        'success' => $result,
        'result' => null,
        'message' => $result ? 'Producto insertado correctamente' : 'Error al insertar el producto'
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
