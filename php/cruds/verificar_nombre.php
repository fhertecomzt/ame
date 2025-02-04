<?php
include "../conexion.php";

$response = ["existe" => false];

if (!empty($_POST['nombre'])) {
  $nombre = htmlspecialchars($_POST['nombre']);

  // Verificar si el nombre ya existe
  $stmt = $dbh->prepare("SELECT COUNT(*) FROM tiendas WHERE nomtienda = ?");
  $stmt->execute([$nombre]);
  $response["existe"] = $stmt->fetchColumn() > 0;
}

echo json_encode($response);
