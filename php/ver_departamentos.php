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

// Obtener todos las roles
$stmt = $dbh->prepare("SELECT idrol, nomrol FROM roles");
$stmt->execute();
$roles = $stmt->fetchAll(PDO::FETCH_ASSOC);
$stmt = null;

if (!$roles) {
    echo "No hay roles disponibles";
    exit;
}
