<?php
include "../conexion.php";

$response = ["success" => false, "message" => ""];

if (!empty($_GET['id'])) {
  $idusuario = $_GET['id'];

  try {
    $stmt = $dbh->prepare("SELECT * FROM usuarios WHERE idusuario = ?");
    $stmt->execute([$idusuario]);
    $users = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($users) {
      $response["success"] = true;
      $response["users"] = [
        "id" => $users["idusuario"] ?? "",
        "usuario" => $users["usuario"] ?? "",
        "nombre" => $users["nombre"] ?? "",
        "papellido" => $users["appaterno"] ?? "",
        "sapellido" => $users["apmaterno"] ?? "",
        "rol" => $users["idrol"] ?? "",
        "tienda" => $users["sucursales_id"] ?? "",
        "comision" => $users["comision"] ?? ""
      ];
    } else {
      $response["message"] = "Usuario no encontrado.";
    }
  } catch (PDOException $e) {
    $response["message"] = "Error al obtener el Usuario: " . $e->getMessage();
  }
} else {
  $response["message"] = "ID de Usuario no proporcionado.";
}

echo json_encode($response);
