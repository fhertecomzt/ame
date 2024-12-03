<?php
session_start();
include "conexion.php";

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $username = filter_input(INPUT_POST, 'txtusuario', FILTER_SANITIZE_STRING);
    $password1 = filter_input(INPUT_POST, 'txtpassword1', FILTER_SANITIZE_STRING);

    if (empty($username) || empty($password1)) {
        $_SESSION['error'] = "Usuario o contraseña vacíos";
        header("Location: ../index.php?error=Usuario o contraseña vacíos");
        exit;
    }

    // Consulta a la tabla de usuarios haciendo join a la tabla roles para mostrar los nombres
    $stmt = $dbh->prepare("
    SELECT usuarios.*, roles.nomrol
    FROM usuarios 
    JOIN roles ON usuarios.idrol = roles.idrol
    WHERE usuarios.usuario = :username");
    $stmt->bindParam(':username', $username);
    $stmt->execute();
    $user = $stmt->fetch(PDO::FETCH_ASSOC);

    // Consulta a la tabla de usuarios haciendo join a la tabla sucursales para mostrar los nombres
    $stmt2 = $dbh->prepare("
    SELECT usuarios.*, tiendas.nomtienda 
    FROM usuarios 
    JOIN tiendas ON usuarios.sucursales_id = tiendas.idtienda 
    WHERE usuarios.usuario = :username");
    $stmt2->bindParam(':username', $username);
    $stmt2->execute();
    $sucursales = $stmt2->fetch(PDO::FETCH_ASSOC);


    //Combrobación de los usuarios y contraseñas
    if ($user && password_verify($password1, $user['password1'])) {
        // Crear sesiones
        $_SESSION['idusuario'] = $user['idusuario'];
        $_SESSION['usuario'] = $user['usuario'];
        $_SESSION['nombre'] = $user['nombre'];
        $_SESSION['appaterno'] = $user['appaterno'];
        $_SESSION['apmaterno'] = $user['apmaterno'];
        $_SESSION['rol'] = $user['nomrol'];
        $_SESSION['sucursal_nombre'] = $sucursales['nomtienda'];
        $_SESSION['imagen'] = $user['imagen'];

        // Redirigir al usuario según su tipo de usuario
        switch ($_SESSION['rol']) {
            case 'SISTEMAS':
                header("Location: ad.php");
                break;
            case 'VENTAS':
                header("Location: vta.php");
                break;
            case 'GERENCIA':
                header("Location: gm.php");
                break;
            default:
                header("Location: ../index.php");
                break;
        }
        exit;
    } else {
        //Creamos la sesión de error para mostrarla en el login
        $_SESSION['error'] = "Nombre de usuario o contraseña incorrectos";
        header("Location: " . $URL . "../index.php?error=Nombre de usuario o contraseña incorrectos");
        exit;
    }
}
