<?php
session_start();
include "conexion.php";

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $username = filter_input(INPUT_POST, 'txtusuario', FILTER_SANITIZE_STRING);
    $password1 = filter_input(INPUT_POST, 'txtpassword1', FILTER_SANITIZE_STRING);

    if (empty($username) || empty($password1)) {
        header("Location: login.php?error=Usuario o contraseña vacíos");
        exit;
    }

    // Consulta a la tabla de usuarios haciendo join a la tabla departamentos para mostrar los nombres
    $stmt = $dbh->prepare("
    SELECT usuarios.*, departamentos.departamento 
    FROM usuarios 
    JOIN departamentos ON usuarios.iddepartamento = departamentos.iddepartamento 
    WHERE usuarios.usuario = :username
");
    $stmt->bindParam(':username', $username);
    $stmt->execute();
    $user = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($user && password_verify($password1, $user['password1'])) {
        // Crear sesiones
        $_SESSION['idusuario'] = $user['idusuario'];
        $_SESSION['usuario'] = $user['usuario'];
        $_SESSION['nombre'] = $user['nombre'];
        $_SESSION['appaterno'] = $user['appaterno'];
        $_SESSION['apmaterno'] = $user['apmaterno'];
        $_SESSION['departamento'] = $user['departamento'];

        // Redirigir a la selección de sucursal
        header("Location: ".$URL." seleccionar_sucursal.php");
        exit;
    } else {
        header("Location: ".$URL."login.php?error=Nombre de usuario o contraseña incorrectos");
        exit;
    }
}
?>