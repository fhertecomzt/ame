<?php
include "../conexion.php";

$response = ["success" => false, "message" => ""];

if (!empty($_GET['id'])) {
  $idrol = $_GET['id'];

  try {
    $stmt = $dbh->prepare("SELECT * FROM roles WHERE idrol = ?");
    $stmt->execute([$idrol]);
    $rol = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($rol) {
      $response["success"] = true;
      $response["rol"] = [
        "id" => $rol["idrol"],
        "nombre" => $rol["nomrol"],
        "descripcion" => $rol["descrol"]
      ];
    } else {
      $response["message"] = "Rol no encontrado.";
    }
  } catch (PDOException $e) {
    $response["message"] = "Error al obtener el Rol: " . $e->getMessage();
  }
} else {
  $response["message"] = "ID de rol no proporcionado.";
}

echo json_encode($response);
