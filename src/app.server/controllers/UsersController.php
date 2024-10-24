<?php
include '../repositories/UsersRepository.php';
include '../config/headers.php';

session_start(); 

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $input = json_decode(file_get_contents('php://input'), true);
    $action = $input['action'];

    switch ($action) {
        case 'userAuthetication':
            if (isset($input['User'])) {
                $User = $input['User']; 
                $response = userAuthetication($User);
                echo $response; 
            } else {
                echo json_encode(['success' => false, 'message' => 'Usuario no proporcionado']);
            }
            break;

        case 'sessionDestroy':
            echo sessionDestroy();
            break;

        case 'checkSession':
            echo checkSession();
            break;

        case 'insertUser':
            if (isset($input['User'])) {  
                $User = $input['User']; 
                $response = insertUser($User);
                echo $response; 
            } else {
                echo json_encode(['success' => false, 'message' => 'Por favor envíe datos de usuario válidos']);
            }
        break;
            


        default:
            echo json_encode(['success' => false, 'message' => 'Acción no válida']);
            break;
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Método no permitido']);
}

function userAuthetication($user)
{
    $connection = getConnection();
    $stmt = $connection->prepare("SELECT id_usuario, email, id_rol, nombre, apellido, razon_social, persona_fisica FROM usuario WHERE email = ? AND password = ?");
    
    $stmt->bind_param("ss", $user['email'], $user['password']); 
    $stmt->execute();
    $result = $stmt->get_result(); 

    if ($result->num_rows > 0) {
        $userData = $result->fetch_assoc();
        $_SESSION['id_usuario'] = $userData['id_usuario']; 
        $_SESSION['email'] = $userData['email'];

        return json_encode([
            'success' => true,
            'result' => $userData, 
            'message' => 'Inicio de sesión exitoso'
        ]);
    } else {
        return json_encode([
            'success' => false,
            'result' => null,
            'message' => 'Credenciales incorrectas'
        ]);
    }
}


function sessionDestroy()
{
    session_unset();
    session_destroy();
    return json_encode(['success' => true, 'message' => 'Sesión destruida']);
}

function checkSession()
{
    if (isset($_SESSION['id_usuario'])) {
        return json_encode([
            'success' => true,
            'user' => [
                'id_usuario' => $_SESSION['id_usuario'],
                'email' => $_SESSION['email'],
            ],
            'message' => 'Sesión activa'
        ]);
    } else {
        return json_encode(['success' => false, 'message' => 'Sesión no activa, por favor inicie sesión']);
    }
}

?>
