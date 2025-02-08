<?php

//Includes
include "../conexion.php";

$response = ["success" => false, "message" => ""];

// Verificar que el método sea POST
if ($_SERVER["REQUEST_METHOD"] === "POST") {
  $id = $_POST["editar-id"] ?? null;
  $nombre = $_POST["nombre"] ?? null;
  $representante = $_POST["representante"] ?? null;
  $rfc = $_POST["rfc"] ?? null;
  $domicilio = $_POST["domicilio"] ?? null;
  $noexterior = $_POST["noexterior"] ?? null;
  $nointerior = $_POST["nointerior"] ?? null;
  $colonia = $_POST["colonia"] ?? null;
  $ciudad = $_POST["ciudad"] ?? null;
  $estado = $_POST["estado"] ?? null;
  $cpostal = $_POST["cpostal"] ?? null;
  $email = $_POST["email"] ?? null;
  $telefono = $_POST["telefono"] ?? null;


  try {

    // Preparar la consulta SQL
    $stmt = $dbh->prepare(
      "UPDATE tiendas 
            SET nomtienda = :nombre, 
                reptienda = :representante, 
                rfctienda = :rfc, 
                domtienda = :domicilio, 
                noexttienda = :noexterior, 
                nointtienda = :nointerior, 
                coltienda = :colonia, 
                cdtienda = :ciudad, 
                edotienda = :estado, 
                cptienda = :cpostal, 
                emailtienda = :email, 
                teltienda = :telefono 
            WHERE idtienda = :id"
    );

    // Ejecutar la consulta con los parámetros
    $stmt->execute([
      ":nombre" => $nombre,
      ":representante" => $representante,
      ":rfc" => $rfc,
      ":domicilio" => $domicilio,
      ":noexterior" => $noexterior,
      ":nointerior" => $nointerior,
      ":colonia" => $colonia,
      ":ciudad" => $ciudad,
      ":estado" => $estado,
      ":cpostal" => $cpostal,
      ":email" => $email,
      ":telefono" => $telefono,
      ":id" => $id
    ]);

    // Verificar si se actualizó alguna fila
    if ($stmt->rowCount() > 0) {
      $response["success"] = true;
      $response["message"] = "Tienda actualizada correctamente.";
    } else {
      $response["message"] = "No se realizaron cambios en la tienda.";
    }
  } catch (PDOException $e) {
    // Evitar exponer detalles técnicos en el mensaje de error
    $response["message"] = "Error al actualizar la tienda. Intente más tarde.";
  }
} else {
  $response["message"] = "Método no permitido.";
}

// Enviar la respuesta JSON
header("Content-Type: application/json");
echo json_encode($response);
