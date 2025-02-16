<?php
include "../conexion.php";

$response = ["success" => false, "message" => ""];

// Validar si el ID es proporcionado y es un número
if (!empty($_GET['id']) && ctype_digit($_GET['id'])) {
  $idtalla = $_GET['id'];

  try {
    // Consulta segura con consulta preparada
    $stmt = $dbh->prepare("SELECT * FROM tallas WHERE idtalla = ?");
    $stmt->execute([$idtalla]);
    $talla = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($talla) {
      // Sanitizar datos antes de enviarlos en la respuesta (Llenar campos)
      $response["success"] = true;
      $response["talla"] = [
        "idtalla" => htmlspecialchars($talla["idtalla"]),
        "talla" => htmlspecialchars($talla["nomtalla"]),
        "desc_talla" => htmlspecialchars($talla["desctalla"])
      ];
    } else {
      $response["message"] = "No sé encontro.";
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
