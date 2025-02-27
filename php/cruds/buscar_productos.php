<?php
require_once "../conexion.php";
// Obtenemos los valores de 'q' (búsqueda) y 'estatus' de la URL, si existen
$q = isset($_GET['q']) ? trim($_GET['q']) : '';
$estatus = isset($_GET['estatus']) ? trim($_GET['estatus']) : '';

// Construimos la consulta SQL
$sql = "SELECT * FROM productos WHERE (UPPER(nom_prod) LIKE ? OR UPPER(codbar_prod) LIKE ?";

// Si se pasa un estatus, agregar el filtro de estatus a la consulta
if ($estatus !== '') {
  $sql .= " AND estatus = ?";
}

// Cerramos la consulta SQL
$sql .= ")";

// Preparamos la consulta
$stmt = $dbh->prepare($sql);

// Ejecutamos la consulta con los parámetros adecuados
if ($estatus !== '') {
  $stmt->execute(["%$q%", "%$q%", $estatus]);
} else {
  $stmt->execute(["%$q%", "%$q%"]);
}

// Obtenemos los productos que coinciden con la búsqueda
$productos = $stmt->fetchAll(PDO::FETCH_ASSOC);

// Devolvemos los resultados en formato JSON
echo json_encode($productos);
