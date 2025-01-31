<?php
// procesar_crear.php
include "../conexion.php";

$response = ["success" => false, "message" => ""];

// Validar campos obligatorios
if (
  !empty($_POST['rol']) && !empty($_POST['desc_rol'])
) {
  // Sanitización básica
  $nombrerol = htmlspecialchars($_POST['rol']);
  $desc_rol = htmlspecialchars($_POST['desc_rol']);

  // Ejecutar la inserción
  try {
    $stmt = $dbh->prepare("INSERT INTO roles (nomrol, descrol) 
                               VALUES (?, ?)");
    $stmt->execute([$nombrerol, $desc_rol]);

    $lastId = $dbh->lastInsertId();

    $response["success"] = true;
    $response["message"] = "Rol fue creado exitosamente.";
    $response["rol"] = [
      "id" => $lastId,
      "nombre" => $nombrerol,
      "descripcion" => $desc_rol
    ];
  } catch (PDOException $e) {
    // Respuesta genérica en caso de error
    $response["message"] = "Hubo un error al procesar la solicitud. Intente más tarde.";
  }
} else {
  $response["message"] = "Todos los campos son obligatorios.";
}

echo json_encode($response);
