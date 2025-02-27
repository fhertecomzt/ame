<?php
require_once "../conexion.php"; // Tu archivo de conexión a la base de datos

if (isset($_GET['q'])) {
  $filtro = "%" . $_GET['q'] . "%";
  $sql = "SELECT idproducto, codbar_prod, nom_prod desc_prod, precio1_venta_prod FROM productos WHERE codbar_prod LIKE ? OR producto LIKE ?";
  $stmt = $conn->prepare($sql);
  $stmt->execute([$filtro, $filtro]);
  $productos = $stmt->fetchAll(PDO::FETCH_ASSOC);

  echo json_encode($productos);
}
