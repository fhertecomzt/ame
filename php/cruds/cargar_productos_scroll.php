<?php
// Incluir la conexión a la base de datos
require_once '../conexion.php';
$page = isset($_GET['page']) ? (int) $_GET['page'] : 1;
$limit = 10; // Número de productos por página
$offset = ($page - 1) * $limit;

// Consulta SQL para obtener los productos
$query = "SELECT * FROM productos LIMIT $limit OFFSET $offset"; // Ajusta la consulta según sea necesario
// Ejecutar la consulta usando PDO
try {
  $stmt = $dbh->prepare($query);  // Prepara la consulta
  $stmt->execute();  // Ejecuta la consulta
  $productos = $stmt->fetchAll(PDO::FETCH_ASSOC);  // Obtiene todos los resultados como un array asociativo
} catch (PDOException $e) {
  error_log('Error de consulta: ' . $e->getMessage()); // Log de errores
  die('Hubo un problema al ejecutar la consulta.');
}

// Mostrar los productos en formato JSON
echo json_encode($productos);
?>
