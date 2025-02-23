<?php
//Includes
include "../conexion.php";

// Inicializamos la respuesta
$response = ["success" => false, "message" => ""];

// Verificamos que el método sea POST
if ($_SERVER["REQUEST_METHOD"] === "POST") {
  $idcat = $_POST["editar-idcat"] ?? null;
  $cat = $_POST["cat"] ?? null;
  $descripcion = $_POST["desc_cat"] ?? null;

  try {
    // Preparar la consulta SQL
    $stmt = $dbh->prepare(
      "UPDATE categorias 
         SET nomcategoria = :cat, 
             desccategoria = :descripcion 
       WHERE idcategoria = :id"
    );

    // Ejecutar la consulta con los parámetros
    $stmt->execute([
      ":cat" => $cat,
      ":descripcion" => $descripcion,
      ":id" => $idcat
    ]);

    // Verificamos si hubo una actualización
    if ($stmt->rowCount() > 0) {
      $response["success"] = true;
      $response["message"] = "Categoría actualizado correctamente.";
    } else {
      $response["message"] = "No se realizaron cambios en el Categoría.";
    }
  } catch (PDOException $e) {
    // Mensaje genérico para evitar exponer detalles técnicos
    $response["message"] = "Error al actualizar la Categoría. Intente nuevamente más tarde.";
  }
} else {
  $response["message"] = "Método no permitido.";
}

// Enviar la respuesta como JSON
header("Content-Type: application/json");
echo json_encode($response);
