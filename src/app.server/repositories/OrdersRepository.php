<?php
include '../config/headers.php';

function deleteOrder($id)
{
    $connection = getConnection();
    $stmt = $connection->prepare("DELETE FROM pedido WHERE id_pedido = ?");
    $stmt->bind_param("i", $id); 
    $result = $stmt->execute();
    
    return json_encode([
        'success' => $result,
        'result' => null,
        'message' => $result ? 'Pedido eliminado correctamente' : 'Error al eliminar el pedido'
    ]);
}

function insertOrder($order)
{
    if (!isset($order['id_usuario'], $order['fecha_pedido'], $order['forma_de_pago'], $order['descuento'], $order['precio_total'], $order['metodo_de_entrega'])) {
        return json_encode([
            'success' => false,
            'message' => 'Faltan datos requeridos para crear el pedido.'
        ]);
    }

    $connection = getConnection();

    $stmt = $connection->prepare("INSERT INTO pedido (id_usuario, fecha_pedido, estado_general, estado_pago, estado_envio, forma_de_pago, descuento, precio_total, metodo_de_entrega) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)");

    if (!$stmt) {
        return json_encode([
            'success' => false,
            'message' => 'Error en la preparación de la consulta: ' . $connection->error
        ]);
    }

    $estado_general = "Pendiente de pago"; 
    $estado_pago = "Pago pendiente"; 
    $estado_envio = "No iniciado"; 


    $stmt->bind_param("isssssiis", 
        $order['id_usuario'], 
        $order['fecha_pedido'], 
        $estado_general, 
        $estado_pago, 
        $estado_envio, 
        $order['forma_de_pago'], 
        $order['descuento'], 
        $order['precio_total'], 
        $order['metodo_de_entrega']
    );


    $result = $stmt->execute();


    $lastId = $connection->insert_id; 

    return json_encode([
        'success' => $result,
        'result' => $result ? $lastId : null, 
        'message' => $result ? 'Pedido creado correctamente' : 'Error al crear el pedido: ' . $stmt->error
    ]);
}



function setDetailOrder($order_id, $cart)
{
    $connection = getConnection();
    $stmt = $connection->prepare("INSERT INTO detalle_pedido (id_pedido, id_producto, cantidad, precio_unitario) VALUES (?, ?, ?, ?)");


    foreach ($cart as $item) {

        $cantidad = isset($item['quantity']) ? $item['quantity'] : 1;
        
        $stmt->bind_param("iiii", 
            $order_id, 
            $item['id_producto'], 
            $cantidad, 
            $item['precio']
        );
        
        $result = $stmt->execute();

        if (!$result) {
            return json_encode([
                'success' => false,
                'result' => null,
                'message' => 'Error al insertar detalle de pedido: ' . $stmt->error
            ]);
        }
    }

    return json_encode([
        'success' => true,
        'result' => null,
        'message' => 'Detalles del pedido insertados correctamente'
    ]);
}



function updateOrder($order)
{
    $connection = getConnection();
    $stmt = $connection->prepare("UPDATE pedido SET estado_general = ?, estado_pago = ?, estado_envio = ? WHERE id_order = ?");
    $stmt->bind_param("sssi", $order->estado_general, $order->estado_pago, $order->estado_envio, $order->id_order);
    $result = $stmt->execute();

    return json_encode([
        'success' => $result,
        'result' => null,
        'message' => $result ? 'Pedido actualizado correctamente' : 'Error al actualizar el pedido'
    ]);
}

function getOrdersByUser($id_usuario)
{
    $connection = getConnection();
    $query = "
        SELECT 
            p.id_pedido,
            p.fecha_pedido,
            p.estado_general,
            p.estado_pago,
            p.estado_envio,
            p.forma_de_pago,
            p.descuento,
            p.precio_total,
            p.metodo_de_entrega,
            dp.id_detalle,
            dp.id_producto,
            dp.cantidad,
            dp.precio_unitario,
            pr.nombre_producto
        FROM 
            pedido p
        JOIN 
            detalle_pedido dp ON p.id_pedido = dp.id_pedido
        JOIN 
            producto pr ON dp.id_producto = pr.id_producto
        WHERE 
            p.id_usuario = ?
    ";

    $stmt = $connection->prepare($query);
    $stmt->bind_param("i", $id_usuario); 

    $stmt->execute();
    $result = $stmt->get_result();

    if ($result) {
        $orders = [];

        while ($row = $result->fetch_assoc()) {
            $orderId = $row['id_pedido'];
            
            if (!isset($orders[$orderId])) {
                $orders[$orderId] = [
                    'id_pedido' => $orderId,
                    'fecha_pedido' => $row['fecha_pedido'],
                    'estado_general' => $row['estado_general'],
                    'estado_pago' => $row['estado_pago'],
                    'estado_envio' => $row['estado_envio'],
                    'forma_de_pago' => $row['forma_de_pago'],
                    'descuento' => $row['descuento'],
                    'precio_total' => $row['precio_total'],
                    'metodo_de_entrega' => $row['metodo_de_entrega'],
                    'productos' => []
                ];
            }

            $orders[$orderId]['productos'][] = [
                'id_detalle' => $row['id_detalle'],
                'id_producto' => $row['id_producto'],
                'nombre_producto' => $row['nombre_producto'],
                'cantidad' => $row['cantidad'],
                'precio_unitario' => $row['precio_unitario']
            ];
        }

        return json_encode([
            'success' => true,
            'result' => array_values($orders),
            'message' => 'Pedidos obtenidos correctamente'
        ]);
    } else {
        return json_encode([
            'success' => false,
            'result' => [],
            'message' => 'No se encontraron pedidos'
        ]);
    }
}




function getAllOrder()
{
    $connection = getConnection();
    $result = $connection->query("SELECT id_ordero, nombre_ordero, precio, url_imagen, id_categoria, marca FROM pedido");

    if ($result) {
        $orders = $result->fetch_all(MYSQLI_ASSOC);
        return json_encode([
            'success' => true,
            'result' => $orders,
            'message' => 'pedidos obtenidos correctamente'
        ]);
    }

    return json_encode([
        'success' => false,
        'result' => null,
        'message' => 'Error al obtener pedidos'
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
