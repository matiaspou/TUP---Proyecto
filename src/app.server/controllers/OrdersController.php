<?php
include '../repositories/OrdersRepository.php';
include '../config/headers.php';

header("Content-Type: application/json"); 



if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $input = json_decode(file_get_contents('php://input'), true);

    $action = $input['action'];

    switch ($action) {
        case 'deleteProduct': 
            $id = $input['id_producto']; 
            $response = deleteProduct($id);
            echo ([$response]);
            break;

        case 'updateProduct':
            $product = $input['product']; 
            $response = updateProduct($product);
            echo ([$response]);
            break;

        case 'getOrdersByUser':
            if (isset($input['id_usuario'])) {  
                $id = $input['id_usuario']; 
                $response = getOrdersByUser($id);
                echo $response;
            } else {
                echo json_encode(['success' => false, 'message' => 'ID no proporcionado']);
            }
        break;

        
        case 'getAllProducts':
            $response = getAllProducts();
            echo $response;
            break;

        case 'insertOrder':
            $order = $input['order']; 
            $cart = $input['cart']; 
            
            $response = json_decode(insertOrder($order), true);
            
            if ($response['success']) {
                $order_id = $response['result'];
                
                $response2 = json_decode(setDetailOrder($order_id, $cart), true);
            } else {
                echo json_encode([
                    'success' => false,
                    'message' => 'Error al crear el pedido: ' . $response['message']
                ]);
                return;
            }

            if ($response['success'] && $response2['success']) {
                echo json_encode([
                    'success' => true,
                    'result' => null, 
                    'message' => 'Pedido creado y detalles agregados correctamente'
                ]);
            } else {
                echo json_encode([
                    'success' => false,
                    'message' => 'Error al crear los detalles del pedido: ' . $response2['message']
                ]);
            }
        break;

            


        default:
            echo json_encode(['success' => false, 'result' => '','message' => 'Acción no válida']);
            break;
    }
    
} else {
    echo json_encode(['success' => false, 'message' => 'Método no permitido']);
}
?>
