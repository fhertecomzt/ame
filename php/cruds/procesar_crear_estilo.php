<?php
// procesar_crear.php
include "../conexion.php";

$response = ["success" => false, "message" => ""];

// Validar campos obligatorios
if (
  !empty($_POST['estilo']) && !empty($_POST['desc_estilo'])
) {
  // Sanitización básica
  $estilo = htmlspecialchars($_POST['estilo']);
  $desc_estilo = htmlspecialchars($_POST['desc_estilo']);

  // Ejecutar la inserción
  try {
    $stmt = $dbh->prepare("INSERT INTO estilos (nomestilo, descestilo) 
                               VALUES (?, ?)");
    $stmt->execute([$estilo, $desc_estilo]);

    $lastId = $dbh->lastInsertId();

    $response["success"] = true;
    $response["message"] = "Registro creado exitosamente.";
    $response["estilo"] = [
      "id" => $lastId,
      "nombre" => $estilo,
      "descripcion" => $desc_estilo
    ];
  } catch (PDOException $e) {
    // Respuesta genérica en caso de error
    $response["message"] = "Hubo un error al procesar la solicitud. Intente más tarde.";
  }
} else {
  $response["message"] = "Todos los campos son obligatorios.";
}

echo json_encode($response);
