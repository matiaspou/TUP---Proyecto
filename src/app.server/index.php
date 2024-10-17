<?php

header("Access-Control-Allow-Origin: *"); // Permite el acceso desde cualquier origen
header("Access-Control-Allow-Methods: GET, POST, OPTIONS"); // Métodos permitidos
header("Access-Control-Allow-Headers: Content-Type"); // Encabezados permitidos

/**
 * Integración básica de Checkout Pro de Mercado Pago
 * usando el SDK versión 3 para PHP
 */

// Desactiva la notificación de errores deprecados en PHP
error_reporting(E_ALL & ~E_DEPRECATED);

// Carga el autoload de Composer para gestionar dependencias
require_once 'vendor/autoload.php';

// Importa las clases necesarias del SDK de MercadoPago
use MercadoPago\Client\Preference\PreferenceClient;
use MercadoPago\MercadoPagoConfig;

// Agrega credenciales ACCESS_TOKEN
MercadoPagoConfig::setAccessToken("TEST-1702368089561904-092817-3872088b97965082452572e1e307488a-187070902");

// Crea una instancia del cliente de preferencias de MercadoPago
$client = new PreferenceClient();

// Recibe los productos desde el frontend
$products = json_decode(file_get_contents('php://input'), true);

// Asegúrate de que se reciben los productos y se calculan los totales
if (isset($products) && is_array($products) && count($products) > 0) {
    $items = [];
    $total = 0;

    foreach ($products as $product) {
        $items[] = [
            "id" => $product['id'],
            "title" => $product['title'],
            "quantity" => 1,
            "unit_price" => (float)$product['price'],
        ];
        $total += $product['price'];
    }

    // Crea una preferencia de pago con los detalles del producto
    $preference = $client->create([
        "items" => $items,
        // Puedes añadir información adicional si es necesario
        "statement_descriptor" => "MI TIENDA",
        "external_reference" => "CDP001",
    ]);

    // Cambia el tipo de respuesta a JSON
    header('Content-Type: application/json');

    // Devuelve el preference_id y el total como respuesta JSON
    echo json_encode(['preference_id' => $preference->id, 'total' => $total]);
} else {
    // Manejar el caso donde no se reciben productos
    echo json_encode(['error' => 'No se recibieron productos']);
}
