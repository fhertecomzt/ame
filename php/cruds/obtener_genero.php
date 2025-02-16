<?php
include "../conexion.php";

$response = ["success" => false, "message" => ""];

// Validar si el ID es proporcionado y es un número
if (!empty($_GET['id']) && ctype_digit($_GET['id'])) {
  $idgenero = $_GET['id'];

  try {
    // Consulta segura con consulta preparada
    $stmt = $dbh->prepare("SELECT * FROM generos WHERE idgenero = ?");
    $stmt->execute([$idgenero]);
    $genero = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($genero) {
      // Sanitizar datos antes de enviarlos en la respuesta (Llenar campos)
      $response["success"] = true;
      $response["genero"] = [
        "idgenero" => htmlspecialchars($genero["idgenero"]),
        "genero" => htmlspecialchars($genero["nomgenero"]),
        "desc_genero" => htmlspecialchars($genero["descgenero"])
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
