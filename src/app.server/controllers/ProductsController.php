<?php
include '../repositories/ProductsRepository.php';
include '../config/cors.php';

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

        case 'getProductById':
            if (isset($input['id'])) {  
                $id = $input['id'];
                incrementInteractionsCount($id);
                $response = getProductById($id);
                echo ($response);
            } else {
                echo json_encode(['success' => false, 'message' => 'ID no proporcionado']);
            }
            break;

        case 'getAllProducts':
            $response = getAllProducts();
            echo $response;
            break;

        case 'getSelectedProducts':
            $response = getSelectedProducts();
            echo $response;
            break;

        case 'insertProduct':
            $id = $input['product']; 
            $response = insertProduct($product);
            echo $response;
            break;

        default:
            echo json_encode(['success' => false, 'result' => '','message' => 'Acción no válida']);
            break;
    }
    
} else {
    echo json_encode(['success' => false, 'message' => 'Método no permitido']);
}
?>
