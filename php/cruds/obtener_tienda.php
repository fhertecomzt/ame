<?php
include "../conexion.php";

$response = ["success" => false, "message" => ""];

// Validar si el ID es proporcionado y es un número
if (!empty($_GET['id']) && ctype_digit($_GET['id'])) {
  $id = $_GET['id'];

  try {
    // Consulta segura con consulta preparada
    $stmt = $dbh->prepare("SELECT * FROM tiendas WHERE idtienda = ?");
    $stmt->execute([$id]);
    $tienda = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($tienda) {
      // Sanitizar los datos antes de enviarlos en la respuesta
      $response["success"] = true;
      $response["tienda"] = [
        "id" => htmlspecialchars($tienda["idtienda"]),
        "nombre" => htmlspecialchars($tienda["nomtienda"]),
        "representante" => htmlspecialchars($tienda["reptienda"]),
        "rfc" => htmlspecialchars($tienda["rfctienda"]),
        "domicilio" => htmlspecialchars($tienda["domtienda"]),
        "noexterior" => htmlspecialchars($tienda["noexttienda"]),
        "nointerior" => htmlspecialchars($tienda["nointtienda"]),
        "colonia" => htmlspecialchars($tienda["coltienda"]),
        "ciudad" => htmlspecialchars($tienda["cdtienda"]),
        "estado" => htmlspecialchars($tienda["edotienda"]),
        "cpostal" => htmlspecialchars($tienda["cptienda"]),
        "email" => htmlspecialchars($tienda["emailtienda"]),
        "telefono" => htmlspecialchars($tienda["teltienda"]),
      ];
    } else {
      $response["message"] = "Tienda no encontrada.";
    }
  } catch (PDOException $e) {
    // Respuesta genérica en caso de error
    $response["message"] = "Hubo un error al procesar la solicitud. Intente más tarde.";
  }
} else {
  $response["message"] = "ID de tienda no proporcionado o inválido.";
}
// Enviar respuesta en formato JSON
echo json_encode($response);
