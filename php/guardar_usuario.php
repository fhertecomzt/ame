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
    $usuario = filter_input(INPUT_POST, 'usuario', FILTER_SANITIZE_STRING);
    $nombre = filter_input(INPUT_POST, 'nombre', FILTER_SANITIZE_STRING);
    $appaterno = filter_input(INPUT_POST, 'appaterno', FILTER_SANITIZE_STRING);
    $apmaterno = filter_input(INPUT_POST, 'apmaterno', FILTER_SANITIZE_STRING);
    $departamento = filter_input(INPUT_POST, 'departamento', FILTER_SANITIZE_NUMBER_INT);
    $sucursal = filter_input(INPUT_POST, 'sucursal', FILTER_SANITIZE_NUMBER_INT);
    $password1 = filter_input(INPUT_POST, 'password1', FILTER_SANITIZE_STRING);
    $password2 = filter_input(INPUT_POST, 'password2', FILTER_SANITIZE_STRING);

    if ($password1 !== $password2) {
        header("Location: usuarios.php?error=Las contraseñas no coinciden");
        exit;
    }

    $passwordHash = password_hash($password1, PASSWORD_BCRYPT);
    $passwordHash = password_hash($password2, PASSWORD_BCRYPT);

    try {
        $stmt = $dbh->prepare("INSERT INTO usuarios (usuario, nombre, appaterno, apmaterno, departamento, password1, password2, sucursales_id) VALUES (:usuario, :nombre, :appaterno, :apmaterno, :departamento, :password1, :password2, :sucursal)");
        $stmt->bindParam(':usuario', $usuario);
        $stmt->bindParam(':nombre', $nombre);
        $stmt->bindParam(':appaterno', $appaterno);
        $stmt->bindParam(':apmaterno', $apmaterno);
        $stmt->bindParam(':departamento', $departamento);
        $stmt->bindParam(':password1', $passwordHash);
        $stmt->bindParam(':password2', $passwordHash);
        $stmt->bindParam(':sucursal', $sucursal);

        if ($stmt->execute()) {
            header("Location: usuarios.php?success=Usuario creado exitosamente");
        } else {
            header("Location: usuarios.php?error=Error al crear el usuario");
        }
    } catch (PDOException $e) {
        header("Location: usuarios.php?error=Error en la base de datos: " . $e->getMessage());
    }
}
?>