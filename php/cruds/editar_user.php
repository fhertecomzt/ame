<?php

include "../conexion.php";

// Inicializamos la respuesta
$response = ["success" => false, "message" => ""];

// Verificamos que el método sea POST
if ($_SERVER["REQUEST_METHOD"] === "POST") {
  $iduser = $_POST["editar-iduser"] ?? null;
  $usuario = $_POST["usuario"] ?? null;
  $papellido = $_POST["papellido"] ?? null;
  $sapellido = $_POST["sapellido"] ?? null;
  $rol = $_POST["idrol"] ?? null;
  $tienda = $_POST["sucursales_id"] ?? null;
  $comision = $_POST["comision"] ?? null;


  // Sanitización y validación de datos
  $iduser = filter_var($iduser, FILTER_SANITIZE_NUMBER_INT);
  if (!$iduser || !filter_var($iduser, FILTER_VALIDATE_INT)) {
    $response["message"] = "El ID del usuario es inválido.";
    echo json_encode($response);
    exit;
  }

  $usuario = filter_var($usuario, FILTER_SANITIZE_STRING);
  if (empty($usuario)) {
    $response["message"] = "El nombre del usuario es obligatorio.";
    echo json_encode($response);
    exit;
  }

  $nombre = filter_var($nombre, FILTER_SANITIZE_STRING);
  if (empty($nombre)) {
    $response["message"] = "El nombre es obligatorio.";
    echo json_encode($response);
    exit;
  }

  // **Validación de tamaño máximo**
  if (strlen($usuario) > 100) {
    $response["message"] = "El nombre del usuario no debe exceder los 1.0 caracteres.";
    echo json_encode($response);
    exit;
  }

  if (strlen($nombre) > 100) {
    $response["message"] = "El nombre no debe exceder los 100 caracteres.";
    echo json_encode($response);
    exit;
  }

  try {
    // Preparar la consulta SQL
    $stmt = $dbh->prepare(
      "UPDATE usuarios 
             SET usuario = :usuario, nombre = :nombre, appaterno = :appaterno, apmaterno = : apmaterno, idrol = :idrol, :sucursales_id = :sucursales_id, comision = :comision
             WHERE idusuario = :idusuario"
    );

    // Ejecutar la consulta con los parámetros
    $stmt->execute([
      ":usuario" => $usuario,
      ":nombre" => $nombre,
      ":appaterno" => $papellido,
      ":apmaterno" => $sapellido,
      ":idrol" => $rol,
      ":sucursales_id" => $tienda,
      ":comision" => $comision,
      ":idusuario" => $idusuario,

    ]);

    // Verificamos si hubo una actualización
    if ($stmt->rowCount() > 0) {
      $response["success"] = true;
      $response["message"] = "Usuario actualizado correctamente.";
    } else {
      $response["message"] = "No se realizaron cambios en el Usuario.";
    }
  } catch (PDOException $e) {
    // Mensaje genérico para evitar exponer detalles técnicos
    $response["message"] = "Error al actualizar el Usuario. Intente nuevamente más tarde.";
  }
} else {
  $response["message"] = "Método no permitido.";
}

// Enviar la respuesta como JSON
header("Content-Type: application/json");
echo json_encode($response);
