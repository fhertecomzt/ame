<?php
include "../conexion.php";

$response = ["success" => false, "message" => ""];

// Validar si el ID es proporcionado y es un número
if (!empty($_GET['id']) && ctype_digit($_GET['id'])) {
  $idcolor = $_GET['id'];

  try {
    // Consulta segura con consulta preparada
    $stmt = $dbh->prepare("SELECT * FROM colores WHERE idcolor = ?");
    $stmt->execute([$idcolor]);
    $color = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($color) {
      // Sanitizar datos antes de enviarlos en la respuesta (Llenar campos)
      $response["success"] = true;
      $response["color"] = [
        "idcolor" => htmlspecialchars($color["idcolor"]),
        "color" => htmlspecialchars($color["nomcolor"]),
        "desc_color" => htmlspecialchars($color["desccolor"])
      ];
    } else {
      $response["message"] = "Categoría no encontrada.";
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
