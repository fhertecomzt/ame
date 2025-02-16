<?php
// procesar_crear.php
include "../conexion.php";

$response = ["success" => false, "message" => ""];

// Validar campos obligatorios
if (
  !empty($_POST['talla']) && !empty($_POST['desc_talla'])
) {
  // Sanitización básica
  $talla = htmlspecialchars($_POST['talla']);
  $desc_talla = htmlspecialchars($_POST['desc_talla']);

  // Ejecutar la inserción
  try {
    $stmt = $dbh->prepare("INSERT INTO tallas (nomtalla, desctalla) 
                               VALUES (?, ?)");
    $stmt->execute([$talla, $desc_talla]);

    $lastId = $dbh->lastInsertId();

    $response["success"] = true;
    $response["message"] = "Registro creado exitosamente.";
    $response["talla"] = [
      "id" => $lastId,
      "nombre" => $talla,
      "descripcion" => $desc_talla
    ];
  } catch (PDOException $e) {
    // Respuesta genérica en caso de error
    $response["message"] = "Hubo un error al procesar la solicitud. Intente más tarde.";
  }
} else {
  $response["message"] = "Todos los campos son obligatorios.";
}

echo json_encode($response);
