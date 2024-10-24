<?php   
header("Access-Control-Allow-Headers: Content-Disposition, Content-Type, Content-Length, Accept-Encoding");
header("Access-Control-Allow-Origin: http://localhost:5173"); 
header("Access-Control-Allow-Methods: OPTIONS,GET,PUT,POST,DELETE");
header("Access-Control-Allow-Headers: Content-Disposition, Content-Type, Content-Length, Accept-Encoding"); 
header("Access-Control-Allow-Credentials: true");
header("connection:keep-alive");
header("Content-Type: application/json"); 

session_set_cookie_params([
    'lifetime' => 86400, // Duración de la cookie
    'path' => '/',
    'domain' => 'localhost',
    'secure' => true, // Cambia a true si usas HTTPS
    'httponly' => true,
    'samesite' => 'Lax'
]);
?>