<?php
include "../conexion.php";

$response = ["success" => false, "message" => ""];

// Validar si el ID es proporcionado y es un número
if (!empty($_GET['id']) && ctype_digit($_GET['id'])) {
  $idrol = $_GET['id'];

  try {
    // Consulta segura con consulta preparada
    $stmt = $dbh->prepare("SELECT * FROM roles WHERE idrol = ?");
    $stmt->execute([$idrol]);
    $rol = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($rol) {
      // Sanitizar datos antes de enviarlos en la respuesta (Llenar campos)
      $response["success"] = true;
      $response["rol"] = [
        "idrol" => htmlspecialchars($rol["idrol"]),
        "rol" => htmlspecialchars($rol["nomrol"]),
        "desc_rol" => htmlspecialchars($rol["descrol"])
      ];
    } else {
      $response["message"] = "Rol no encontrado.";
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
