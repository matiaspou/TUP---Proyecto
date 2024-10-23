<?php
include '../repositories/UsersRepository.php';
include '../config/cors.php';

header("Content-Type: application/json"); 



if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $input = json_decode(file_get_contents('php://input'), true);

    $action = $input['action'];

    switch ($action) {

        case 'userAuthetication':
            $User = $input['User']; 
            $response = userAuthetication($User);
            echo ([$response]);
            break;

        case 'updateUser':
            $User = $input['User']; 
            $response = updateUser($User);
            echo ([$response]);
            break;

        case 'getUserById':
            if (isset($input['id'])) {  
                $id = $input['id'];
                incrementInteractionsCount($id);
                $response = getUserById($id);
                echo ($response);
            } else {
                echo json_encode(['success' => false, 'message' => 'ID no proporcionado']);
            }
            break;

        case 'getAllUsers':
            $response = getAllUsers();
            echo $response;
            break;

        case 'insertUser':
            $id = $input['User']; 
            $response = insertUser($User);
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
