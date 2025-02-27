<?php

header('Content-Type: application/json');
require_once "../conexion.php"; // Usamos require_once para evitar múltiples inclusiones.

$response = ["success" => false, "message" => ""];

try {
  // Validar conexión
  if (!isset($dbh)) {
    throw new Exception("Error en la conexión a la base de datos.");
  }

  // Obtener datos del formulario
  $codebar = trim($_POST['codebar'] ?? '');
  $nombre = trim($_POST['producto'] ?? '');
  $descprod = trim($_POST['descprod'] ?? '');
  $categoria = $_POST['categoria'] ?? 1;
  $marca = $_POST['marca'] ?? 1;
  $genero = $_POST['genero'] ?? 1;
  $talla = $_POST['talla'] ?? 1;
  $estilo = $_POST['estilo'] ?? 1;
  $color = $_POST['color'] ?? 1;
  $costo_compra = $_POST['costo_compra'] ?? 0;
  $ganancia = $_POST['ganancia'] ?? 0;
  $precio1 = $_POST['precio1'] ?? 0;
  $precio2 = $_POST['precio2'] ?? 0;
  $precio3 = $_POST['precio3'] ?? 0;
  $impuesto = $_POST['impuesto'] ?? 1;
  $umedida = $_POST['umedida'] ?? 16;
  $proveedor = $_POST['proveedor'] ?? 1;
  $estatus = trim($_POST['estatus'] ?? '');

  // Validación de campos obligatorios
  if (empty($codebar) || empty($nombre) || empty($descprod)) {
    throw new Exception("Los campos Codigo de Barras, Nombre y Descripcion son obligatorios.");
  }

  // Función para verificar existencia en la base de datos
  function verificarExistencia($dbh, $tabla, $columna, $valor)
  {
    $stmt = $dbh->prepare("SELECT COUNT(*) FROM $tabla WHERE $columna = ?");
    $stmt->execute([$valor]);
    return $stmt->fetchColumn() > 0;
  }

  if (!verificarExistencia($dbh, 'categorias', 'idcategoria', $categoria)) {
    throw new Exception("La categoría seleccionada no es válida.");
  }

  if (!verificarExistencia($dbh, 'umedidas', 'idumedida', $umedida)) {
    throw new Exception("La unidad de medida seleccionada no es válida.");
  }

  // Procesar imagen
  $rutaImagen = "";
  if (!empty($_FILES['imagen']['name'])) {
    $directorioImagen = __DIR__ . "../../../imgs/productos/";

    // Verificar permisos de la carpeta
    if (!is_writable($directorioImagen)) {
      throw new Exception("No se puede escribir en la carpeta imgs/productos/");
    }

    // Crear nombre único para la imagen
    $nombreImagen = uniqid() . '-' . basename($_FILES['imagen']['name']);
    $rutaCompleta = $directorioImagen . $nombreImagen;
    $rutaImagen = "../imgs/productos/" . $nombreImagen;

    // Mover la imagen
    if (!move_uploaded_file($_FILES['imagen']['tmp_name'], $rutaCompleta)) {
      throw new Exception("Error al subir la imagen.");
    }
  }

  // Insertar en la base de datos
  $stmt = $dbh->prepare("
        INSERT INTO productos (
            codbar_prod, nom_prod, desc_prod, idcategoria, idmarca, idgenero, idtalla, idestilo, idcolor, 
            costo_compra_prod, ganancia_prod, precio1_venta_prod, precio2_venta_prod, precio3_venta_prod, 
            idimpuesto, idumedida, idproveedor, imagen, estatus
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    ");

  $stmt->execute([
    $codebar,
    $nombre,
    $descprod,
    $categoria,
    $marca,
    $genero,
    $talla,
    $estilo,
    $color,
    $costo_compra,
    $ganancia,
    $precio1,
    $precio2,
    $precio3,
    $impuesto,
    $umedida,
    $proveedor,
    $rutaImagen,
    $estatus
  ]);

  $lastId = $dbh->lastInsertId();

  // Respuesta exitosa
  $response["success"] = true;
  $response["message"] = "El producto fue registrado exitosamente.";
  $response["producto"] = [
    "id" => $lastId,
    "codebar" => $codebar,
    "producto" => $nombre,
    "descprod" => $descprod,
    "categoria" => $categoria,
    "marca" => $marca,
    "genero" => $genero,
    "talla" => $talla,
    "estilo" => $estilo,
    "color" => $color,
    "costo_compra" => $costo_compra,
    "ganancia" => $ganancia,
    "precio1" => $precio1,
    "precio2" => $precio2,
    "precio3" => $precio3,
    "impuesto" => $impuesto,
    "umedida" => $umedida,
    "proveedor" => $proveedor,
    "imagen" => $rutaImagen,
    "estatus" => $estatus
  ];
} catch (Exception $e) {
  $response["message"] = $e->getMessage();
}

echo json_encode($response);
exit;
