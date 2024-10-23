<?php
include '../repositories/CategoriesRepository.php';
include '../config/cors.php';

header("Content-Type: application/json"); 



if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $input = json_decode(file_get_contents('php://input'), true);

    $action = $input['action'];

    switch ($action) {
        case 'getCategoryByID':
            if (isset($input['id'])) {  
                $id = $input['id'];
                $response = getCategoryByID($id);
                echo ($response);
            } else {
                echo json_encode(['success' => false, 'message' => 'ID no proporcionado']);
            }
            break;

        case 'getAllCategories':
            $response = getAllCategories();
            echo $response;
            break;

        case 'insertCategory':
            $id = $input['category']; 
            $response = insertCategory($category);
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
