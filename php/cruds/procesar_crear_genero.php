<?php
// procesar_crear.php
include "../conexion.php";

$response = ["success" => false, "message" => ""];

// Validar campos obligatorios
if (
  !empty($_POST['genero']) && !empty($_POST['desc_genero'])
) {
  // Sanitización básica
  $genero = htmlspecialchars($_POST['genero']);
  $desc_genero = htmlspecialchars($_POST['desc_genero']);

  // Ejecutar la inserción
  try {
    $stmt = $dbh->prepare("INSERT INTO generos (nomgenero, descgenero) 
                               VALUES (?, ?)");
    $stmt->execute([$genero, $desc_genero]);

    $lastId = $dbh->lastInsertId();

    $response["success"] = true;
    $response["message"] = "Registro creado exitosamente.";
    $response["genero"] = [
      "id" => $lastId,
      "nombre" => $genero,
      "descripcion" => $desc_genero
    ];
  } catch (PDOException $e) {
    // Respuesta genérica en caso de error
    $response["message"] = "Hubo un error al procesar la solicitud. Intente más tarde.";
  }
} else {
  $response["message"] = "Todos los campos son obligatorios.";
}

echo json_encode($response);
