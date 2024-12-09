<?php
ini_set('session.cookie_secure', '1'); // Requiere HTTPS
ini_set('session.cookie_httponly', '1'); // Evita acceso por JavaScript
ini_set('session.use_strict_mode', '1'); // Rechaza IDs inválidas

if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

include "tiempo_session.php";

// Incluir conexión a la base de datos
include "conexion.php";

// Inicializar array de errores
$errores = [];

// Validar captcha
if (!isset($_SESSION['captcha_result']) || !isset($_POST['captcha']) || trim($_POST['captcha']) != $_SESSION['captcha_result']) {
    $errores[] = "Error: El captcha es incorrecto.";
}

// Validar usuario y contraseña
$username = filter_input(INPUT_POST, 'txtusuario', FILTER_SANITIZE_STRING);
$password1 = filter_input(INPUT_POST, 'txtpassword1', FILTER_SANITIZE_STRING);

if (empty($_POST['txtusuario'])) {
    $errores[] = "El campo de usuario es obligatorio.";
}
if (empty($_POST['txtpassword1'])) {
    $errores[] = "El campo de contraseña es obligatorio.";
}
if (empty($username)) {
    $errores[] = "El campo de usuario está vacío.";
} elseif (strlen($username) < 3 || strlen($username) > 20) {
    $errores[] = "El nombre de usuario debe tener entre 3 y 20 caracteres.";
} elseif (!preg_match('/^[a-zA-Z0-9_]+$/', $username)) {
    $errores[] = "El nombre de usuario solo puede contener letras, números y guiones bajos.";
}
if (strlen($password1) < 6 || strlen($password1) > 32) {
    $errores[] = "La contraseña debe tener entre 6 y 32 caracteres.";
}

// Si hay errores, redirigir con mensajes
if (!empty($errores)) {
    $_SESSION['errores'] = $errores; // Guardar los errores en la sesión
    header("Location: ../index.php");
    exit;
}

// Consulta a la tabla de usuarios roles y tiendas
try {
    $stmt = $dbh->prepare("
    SELECT usuarios.idusuario, usuarios.usuario, usuarios.nombre, usuarios.appaterno, usuarios.apmaterno, usuarios.password1, usuarios.imagen, roles.nomrol, tiendas.nomtienda
    FROM usuarios
    JOIN roles ON usuarios.idrol = roles.idrol
    JOIN tiendas ON usuarios.sucursales_id = tiendas.idtienda
    WHERE usuarios.usuario = :username");
    $stmt->bindParam(':username', $username);
    $stmt->execute();
    $user = $stmt->fetch(PDO::FETCH_ASSOC);
} catch (PDOException $e) {
    error_log("Error en la base de datos: " . $e->getMessage());
    $_SESSION['errores'] = ["Ocurrió un problema. Por favor, inténtalo más tarde."];
    header("Location: ../index.php");
    exit;
}

// Verificar usuario y contraseña
if ($user && password_verify($password1, $user['password1'])) {
    // Regenerar la ID de sesión para evitar ataques de secuestro de sesión
    session_regenerate_id(true);
    // Crear sesiones
    $_SESSION['idusuario'] = $user['idusuario'];
    $_SESSION['usuario'] = $user['usuario'];
    $_SESSION['nombre'] = $user['nombre'];
    $_SESSION['appaterno'] = $user['appaterno'];
    $_SESSION['apmaterno'] = $user['apmaterno'];
    $_SESSION['rol'] = $user['nomrol'];
    $_SESSION['sucursal_nombre'] = $user['nomtienda'];
    $_SESSION['imagen'] = $user['imagen'];

    // Redirigir según el rol
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
            error_log("Rol desconocido: {$_SESSION['rol']} para usuario: {$_SESSION['usuario']}");
            header("Location: ../index.php");
            break;
    }
    exit;
} else {
    $_SESSION['errores'] = ["Credenciales incorrectas. Inténtalo de nuevo."];
    header("Location: ../index.php");
    exit;
}
