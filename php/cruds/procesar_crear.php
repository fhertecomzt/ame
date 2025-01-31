<?php
// procesar_crear.php
include "../conexion.php";

$response = ["success" => false, "message" => ""];

// Validar campos obligatorios
if (
  !empty($_POST['nombre']) && !empty($_POST['representante']) && !empty($_POST['rfc']) && !empty($_POST['domicilio']) &&
  !empty($_POST['noexterior']) && !empty($_POST['colonia']) && !empty($_POST['ciudad']) && !empty($_POST['estado']) &&
  !empty($_POST['cpostal']) && !empty($_POST['email']) && !empty($_POST['telefono'])
) {

  // Sanitización básica
  $nombre = htmlspecialchars($_POST['nombre']);
  $representante = htmlspecialchars($_POST['representante']);
  $rfc = htmlspecialchars($_POST['rfc']);
  $domicilio = htmlspecialchars($_POST['domicilio']);
  $noexterior = htmlspecialchars($_POST['noexterior']);
  $nointerior = htmlspecialchars($_POST['nointerior']);
  $colonia = htmlspecialchars($_POST['colonia']);
  $ciudad = htmlspecialchars($_POST['ciudad']);
  $estado = htmlspecialchars($_POST['estado']);
  $cpostal = htmlspecialchars($_POST['cpostal']);
  $email = filter_var($_POST['email'], FILTER_SANITIZE_EMAIL);
  $telefono = htmlspecialchars($_POST['telefono']);

  // Validar email
  if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $response["message"] = "El correo electrónico no tiene un formato válido.";
    echo json_encode($response);
    exit;
  }

  // Validar código postal y teléfono
  if (!ctype_digit($cpostal) || strlen($cpostal) !== 5) {
    $response["message"] = "El código postal debe contener 5 dígitos.";
    echo json_encode($response);
    exit;
  }
  if (!ctype_digit($telefono) || strlen($telefono) < 10) {
    $response["message"] = "El teléfono debe contener al menos 10 dígitos.";
    echo json_encode($response);
    exit;
  }

  // Ejecutar la inserción
  try {
    $stmt = $dbh->prepare("INSERT INTO tiendas (nomtienda, reptienda, rfctienda, domtienda, noexttienda, nointtienda, coltienda, cdtienda, edotienda, cptienda, emailtienda, teltienda) 
                               VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
    $stmt->execute([$nombre, $representante, $rfc, $domicilio, $noexterior, $nointerior, $colonia, $ciudad, $estado, $cpostal, $email, $telefono]);

    $lastId = $dbh->lastInsertId();

    $response["success"] = true;
    $response["message"] = "La tienda fue creada exitosamente.";
    $response["tienda"] = [
      "id" => $lastId,
      "nombre" => $nombre,
      "representante" => $representante,
      "rfc" => $rfc,
      "domicilio" => $domicilio,
      "noexterior" => $noexterior,
      "nointerior" => $nointerior,
      "colonia" => $colonia,
      "ciudad" => $ciudad,
      "estado" => $estado,
      "cpostal" => $cpostal,
      "email" => $email,
      "telefono" => $telefono
    ];
  } catch (PDOException $e) {
    // Respuesta genérica en caso de error
    $response["message"] = "Hubo un error al procesar la solicitud. Intente más tarde.";
  }
} else {
  $response["message"] = "Todos los campos son obligatorios.";
}

echo json_encode($response);
