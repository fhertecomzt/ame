<?php

//Includes
include "../conexion.php";

// Inicializamos la respuesta
$response = ["success" => false, "message" => ""];

// Verificamos que el método sea POST
if ($_SERVER["REQUEST_METHOD"] === "POST") {
  $idgenero = $_POST["editar-idgenero"] ?? null;
  $genero = $_POST["genero"] ?? null;
  $descripcion = $_POST["desc_genero"] ?? null;

  try {
    // Preparar la consulta SQL
    $stmt = $dbh->prepare(
      "UPDATE generos 
         SET nomgenero = :genero, 
             descgenero = :descripcion 
       WHERE idgenero = :id"
    );

    // Ejecutar la consulta con los parámetros
    $stmt->execute([
      ":genero" => $genero,
      ":descripcion" => $descripcion,
      ":id" => $idgenero
    ]);

    // Verificamos si hubo una actualización
    if ($stmt->rowCount() > 0) {
      $response["success"] = true;
      $response["message"] = "Registro actualizado correctamente.";
    } else {
      $response["message"] = "No se realizaron cambios.";
    }
  } catch (PDOException $e) {
    // Mensaje genérico para evitar exponer detalles técnicos
    $response["message"] = "Error al actualizar. Intente nuevamente más tarde.";
  }
} else {
  $response["message"] = "Método no permitido.";
}

// Enviar la respuesta como JSON
header("Content-Type: application/json");
echo json_encode($response);
