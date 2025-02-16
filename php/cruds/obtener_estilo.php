<?php
include "../conexion.php";

$response = ["success" => false, "message" => ""];

// Validar si el ID es proporcionado y es un número
if (!empty($_GET['id']) && ctype_digit($_GET['id'])) {
  $idestilo = $_GET['id'];

  try {
    // Consulta segura con consulta preparada
    $stmt = $dbh->prepare("SELECT * FROM estilos WHERE idestilo = ?");
    $stmt->execute([$idestilo]);
    $estilo = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($estilo) {
      // Sanitizar datos antes de enviarlos en la respuesta (Llenar campos)
      $response["success"] = true;
      $response["estilo"] = [
        "idestilo" => htmlspecialchars($estilo["idestilo"]),
        "estilo" => htmlspecialchars($estilo["nomestilo"]),
        "desc_estilo" => htmlspecialchars($estilo["descestilo"])
      ];
    } else {
      $response["message"] = "No sé a encontrado.";
    }
  } catch (PDOException $e) {
    // Respuesta genérica en caso de error
    $response["message"] = "Hubo un error al procesar la solicitud. Intente más tarde.";
  }
} else {
  $response["message"] = "ID no proporcionado o inválido.";
}
// Enviar respuesta en formato JSON
echo json_encode($response);
