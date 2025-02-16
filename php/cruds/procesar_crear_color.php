<?php
// procesar_crear.php
include "../conexion.php";

$response = ["success" => false, "message" => ""];

// Validar campos obligatorios
if (
  !empty($_POST['color']) && !empty($_POST['desc_color'])
) {
  // Sanitización básica
  $color = htmlspecialchars($_POST['color']);
  $desc_color = htmlspecialchars($_POST['desc_color']);

  // Ejecutar la inserción
  try {
    $stmt = $dbh->prepare("INSERT INTO colores (nomcolor, desccolor) 
                               VALUES (?, ?)");
    $stmt->execute([$color, $desc_color]);

    $lastId = $dbh->lastInsertId();

    $response["success"] = true;
    $response["message"] = "Registro creado exitosamente.";
    $response["color"] = [
      "id" => $lastId,
      "nombre" => $color,
      "descripcion" => $desc_color
    ];
  } catch (PDOException $e) {
    // Respuesta genérica en caso de error
    $response["message"] = "Hubo un error al procesar la solicitud. Intente más tarde.";
  }
} else {
  $response["message"] = "Todos los campos son obligatorios.";
}

echo json_encode($response);
