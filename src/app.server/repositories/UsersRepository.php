<?php
include '../config/headers.php';

session_start(); 


function updateUser($user)
{
    $connection = getConnection();
    $stmt = $connection->prepare("UPDATE usuario SET email = ?, id_rol = ?, nombre = ?, apellido = ?, razon_social = ?, persona_fisica = ? WHERE id_usuario = ?");
    
    $stmt->bind_param("sissssi", $user->email, $user->id_rol, $user->nombre, $user->apellido, $user->razon_social, $user->persona_fisica, $user->id_usuario);
    
    $result = $stmt->execute();

    return json_encode([
        'success' => $result,
        'result' => null,
        'message' => $result ? 'Usuario actualizado correctamente' : 'Error al actualizar al usuario'
    ]);
}



function getUserById($id)
{
    $connection = getConnection();
    $stmt = $connection->prepare("SELECT id_usuario, email, id_rol, nombre, apellido, razon_social, persona_fisica FROM usuario WHERE id_usuario = ?");
    $stmt->bind_param("i", $id);
    $stmt->execute();
    $result = $stmt->get_result();
    $user = $result->fetch_object();

    return json_encode([
        'success' => $user !== null,
        'result' => $user,
        'message' => $user ? 'Usuario encontrado' : 'Usuario no encontrado'
    ]);
}

function getAllUsers()
{
    $connection = getConnection();
    $result = $connection->query("SELECT id_usuario, email, id_rol, nombre, apellido, razon_social, persona_fisica FROM usuario");
    if ($result) {
        $users = $result->fetch_all(MYSQLI_ASSOC);
        return json_encode([
            'success' => true,
            'result' => $users,
            'message' => 'Usuarios obtenidos correctamente'
        ]);
    }

    return json_encode([
        'success' => false,
        'result' => null,
        'message' => 'Error al obtener a los usuarios'
    ]);
}

function insertUser($user)
{
    $connection = getConnection();
    if (!$connection) {
        return json_encode([
            'success' => false,
            'message' => 'No se pudo conectar a la base de datos.'
        ]);
    }

    print_r($user['email']); 
    
    $stmt = $connection->prepare("INSERT INTO usuario (email, password, id_rol, nombre, apellido, razon_social, persona_fisica) VALUES (?, ?, ?, ?, ?, ?, ?)");
    
    if (!$stmt) {
        return json_encode([
            'success' => false,
            'message' => 'Error en la preparación de la consulta: ' . $connection->error
        ]);
    }

    $stmt->bind_param("ssisssi", $user['email'], $user['password'], $user['id_rol'], $user['nombre'], $user['apellido'], $user['razon_social'], $user['persona_fisica']);
    
    $result = $stmt->execute();
    
    if (!$result) {
        return json_encode([
            'success' => false,
            'result' => null,
            'message' => 'Error al crear el usuario: ' . $stmt->error
        ]);
    }
    
    return json_encode([
        'success' => true,
        'result' => null,
        'message' => 'Usuario creado correctamente'
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
