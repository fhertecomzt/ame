<?php
include "../conexion.php";

$response = ["success" => false, "message" => ""];

// Validar si el ID es proporcionado y es un número
if (!empty($_GET['id']) && ctype_digit($_GET['id'])) {
  $idmarca = $_GET['id'];

  try {
    // Consulta segura con consulta preparada
    $stmt = $dbh->prepare("SELECT * FROM marcas WHERE idmarca = ?");
    $stmt->execute([$idmarca]);
    $marca = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($marca) {
      // Sanitizar datos antes de enviarlos en la respuesta (Llenar campos)
      $response["success"] = true;
      $response["marca"] = [
        "idmarca" => htmlspecialchars($marca["idmarca"]),
        "marca" => htmlspecialchars($marca["nommarca"]),
        "desc_marca" => htmlspecialchars($marca["descmarca"])
      ];
    } else {
      $response["message"] = "Marca no encontrado.";
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
