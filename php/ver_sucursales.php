<?php
//Vericamos si esta la sesión activa 
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}
if (!isset($_SESSION['idusuario'])) {
    header("Location: ../index.php");
    exit;
}

include "conexion.php";

// Obtener todas las sucursales
$stmt = $dbh->prepare("SELECT idsucursal, nombresucursal FROM sucursales");
$stmt->execute();
$sucursales = $stmt->fetchAll(PDO::FETCH_ASSOC);
$stmt = null;

if (!$sucursales) {
    echo "No hay sucursales disponibles";
    exit;
}
