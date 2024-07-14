<?php
// Verificamos si la sesión está activa
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

if (!isset($_SESSION['idusuario']) || $_SESSION['departamento'] !== 'SISTEMAS') {
    header("Location: ../login.php");
    exit;
}

include "conexion.php";

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $departamento = filter_input(INPUT_POST, 'departamento', FILTER_SANITIZE_STRING);
}
    try {
        $stmt = $dbh->prepare("INSERT INTO departamentos (departamento) VALUES (:departamento)");
        $stmt->bindParam(':departamento', $departamento);
        if ($stmt->execute()) {
            header("Location: departamentos.php?success=Departamento creado exitosamente");
        } else {
            header("Location: departamentos.php?error=Error al crear el Departamento");
        }
    } catch (PDOException $e) {
        header("Location: departamento.php?error=Error en la base de datos: " . $e->getMessage());
    }
?>