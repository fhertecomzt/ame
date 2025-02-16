<?php

//Includes
include "../conexion.php";

// Inicializamos la respuesta
$response = ["success" => false, "message" => ""];

// Verificamos que el método sea POST
if ($_SERVER["REQUEST_METHOD"] === "POST") {
  $idcolor = $_POST["editar-idcolor"] ?? null;
  $color = $_POST["color"] ?? null;
  $descripcion = $_POST["desc_color"] ?? null;

  try {
    // Preparar la consulta SQL
    $stmt = $dbh->prepare(
      "UPDATE colores 
         SET nomcolor = :color, 
             desccolor = :descripcion 
       WHERE idcolor = :id"
    );

    // Ejecutar la consulta con los parámetros
    $stmt->execute([
      ":color" => $color,
      ":descripcion" => $descripcion,
      ":id" => $idcolor
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
