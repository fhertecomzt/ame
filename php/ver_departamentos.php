<?php
//Vericamos si esta la sesión activa 
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}
if (!isset($_SESSION['idusuario'])) {
    header("Location: ../login.php");
    exit;
}

include "conexion.php";

// Obtener todas las departamentos
$stmt = $dbh->prepare("SELECT iddepartamento, departamento FROM departamentos");
$stmt->execute();
$departamentos = $stmt->fetchAll(PDO::FETCH_ASSOC);
$stmt = null;

if (!$departamentos) {
    echo "No hay departamentos disponibles";
    exit;
}
?>