<?php
// procesar_crear.php
include "../conexion.php";

$response = ["success" => false, "message" => ""];

// Validar campos obligatorios
if (
  !empty($_POST['cat']) && !empty($_POST['desc_cat'])
) {
  // Sanitización básica
  $nombrecat = htmlspecialchars($_POST['cat']);
  $desc_cat = htmlspecialchars($_POST['desc_cat']);

  // Ejecutar la inserción
  try {
    $stmt = $dbh->prepare("INSERT INTO categorias (nomcategoria, desccategoria) 
                               VALUES (?, ?)");
    $stmt->execute([$nombrecat, $desc_cat]);

    $lastId = $dbh->lastInsertId();

    $response["success"] = true;
    $response["message"] = "Categoría fue creado exitosamente.";
    $response["categoria"] = [
      "id" => $lastId,
      "nombre" => $nombrecat,
      "descripcion" => $desc_cat
    ];
  } catch (PDOException $e) {
    // Respuesta genérica en caso de error
    $response["message"] = "Hubo un error al procesar la solicitud. Intente más tarde.";
  }
} else {
  $response["message"] = "Todos los campos son obligatorios.";
}

echo json_encode($response);
