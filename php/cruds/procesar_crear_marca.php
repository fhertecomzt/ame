<?php
// procesar_crear.php
include "../conexion.php";

$response = ["success" => false, "message" => ""];

// Validar campos obligatorios
if (
  !empty($_POST['marca']) && !empty($_POST['desc_marca'])
) {
  // Sanitización básica
  $marca = htmlspecialchars($_POST['marca']);
  $desc_marca = htmlspecialchars($_POST['desc_marca']);

  // Ejecutar la inserción
  try {
    $stmt = $dbh->prepare("INSERT INTO marcas (nommarca, descmarca) 
                               VALUES (?, ?)");
    $stmt->execute([$marca, $desc_marca]);

    $lastId = $dbh->lastInsertId();

    $response["success"] = true;
    $response["message"] = "Registro fue creado exitosamente.";
    $response["marca"] = [
      "id" => $lastId,
      "nombre" => $marca,
      "descripcion" => $desc_marca
    ];
  } catch (PDOException $e) {
    // Respuesta genérica en caso de error
    $response["message"] = "Hubo un error al procesar la solicitud. Intente más tarde.";
  }
} else {
  $response["message"] = "Todos los campos son obligatorios.";
}

echo json_encode($response);
