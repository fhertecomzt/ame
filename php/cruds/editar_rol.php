<?php

include "../conexion.php";

// Inicializamos la respuesta
$response = ["success" => false, "message" => ""];

// Verificamos que el método sea POST
if ($_SERVER["REQUEST_METHOD"] === "POST") {
  $idrol = $_POST["editar-idrol"] ?? null;
  $rol = $_POST["rol"] ?? null;
  $descripcion = $_POST["desc_rol"] ?? null;

  // Sanitización y validación de datos
  $idrol = filter_var($idrol, FILTER_SANITIZE_NUMBER_INT);
  if (!$idrol || !filter_var($idrol, FILTER_VALIDATE_INT)) {
    $response["message"] = "El ID del rol es inválido.";
    echo json_encode($response);
    exit;
  }

  $rol = filter_var($rol, FILTER_SANITIZE_STRING);
  if (empty($rol)) {
    $response["message"] = "El nombre del rol es obligatorio.";
    echo json_encode($response);
    exit;
  }

  $descripcion = filter_var($descripcion, FILTER_SANITIZE_STRING);
  if (empty($descripcion)) {
    $response["message"] = "La descripción del rol es obligatoria.";
    echo json_encode($response);
    exit;
  }

  // **Validación de tamaño máximo**
  if (strlen($rol) > 20) {
    $response["message"] = "El nombre del rol no debe exceder los 20 caracteres.";
    echo json_encode($response);
    exit;
  }

  if (strlen($descripcion) > 100) {
    $response["message"] = "La descripción no debe exceder los 100 caracteres.";
    echo json_encode($response);
    exit;
  }

  try {
    // Preparar la consulta SQL
    $stmt = $dbh->prepare(
      "UPDATE roles 
             SET nomrol = :rol, descrol = :descripcion 
             WHERE idrol = :idrol"
    );

    // Ejecutar la consulta con los parámetros
    $stmt->execute([
      ":rol" => $rol,
      ":descripcion" => $descripcion,
      ":idrol" => $idrol,
    ]);

    // Verificamos si hubo una actualización
    if ($stmt->rowCount() > 0) {
      $response["success"] = true;
      $response["message"] = "Rol actualizado correctamente.";
    } else {
      $response["message"] = "No se realizaron cambios en el rol.";
    }
  } catch (PDOException $e) {
    // Mensaje genérico para evitar exponer detalles técnicos
    $response["message"] = "Error al actualizar el rol. Intente nuevamente más tarde.";
  }
} else {
  $response["message"] = "Método no permitido.";
}

// Enviar la respuesta como JSON
header("Content-Type: application/json");
echo json_encode($response);
