<?php
ini_set('session.cookie_secure', '1'); // Requiere HTTPS
ini_set('session.cookie_httponly', '1'); // Evita acceso por JavaScript
ini_set('session.use_strict_mode', '1'); // Rechaza IDs inválidas

if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

// Incluir conexión a la base de datos
include "conexion.php";

// Inicializar array de errores
$errores = [];

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
// Validar captcha
if (!isset($_SESSION['captcha_result']) || !isset($_POST['captcha']) || trim($_POST['captcha']) != $_SESSION['captcha_result']) {
    $errores[] = "Error: El captcha es incorrecto.";
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
    SELECT usuarios.idusuario, usuarios.usuario, usuarios.nombre, usuarios.appaterno, usuarios.apmaterno, usuarios.password1, usuarios.imagen, roles.nomrol, tiendas.nomtienda, usuarios.intentos_fallidos, usuarios.bloqueado_hasta
    FROM usuarios
    JOIN roles ON usuarios.idrol = roles.idrol
    JOIN tiendas ON usuarios.sucursales_id = tiendas.idtienda
    WHERE usuarios.usuario = :username");
    $stmt->bindParam(':username', $username);
    $stmt->execute();
    $user = $stmt->fetch(PDO::FETCH_ASSOC);
    //Verificamos que las claves
    $intentosFallidos = isset($user['intentos_fallidos']) ? $user['intentos_fallidos'] : 0;
    $bloqueadoHasta = isset($user['bloqueado_hasta']) ? $user['bloqueado_hasta'] : null;
} catch (PDOException $e) {
    error_log("Error en la base de datos: " . $e->getMessage());
    $_SESSION['errores'] = ["Ocurrió un problema. Por favor, inténtalo más tarde."];
    header("Location: ../index.php");
    exit;
}

if ($user) {
    // Verificar si la cuenta está bloqueada
    if ($user['bloqueado_hasta'] && strtotime($user['bloqueado_hasta']) > time()) {
        $tiempoRestante = strtotime($user['bloqueado_hasta']) - time();
        $_SESSION['errores'] = ["Cuenta bloqueada. Inténtelo de nuevo en " . ceil($tiempoRestante / 60) . " minutos."];
    }

    // Validar reCAPTCHA si es necesario
    if (isset($_SESSION['mostrar_recaptcha']) && $_SESSION['mostrar_recaptcha']) {
        if (!isset($_POST['g-recaptcha-response']) || empty($_POST['g-recaptcha-response'])) {
            $_SESSION['errores'] = ["Por favor completa el reCAPTCHA."];
            header("Location: ../index.php");
            exit;
        }

        $recaptchaSecret = "6LfvWZYqAAAAAMGcQob-npo9ZLY1rN3JZPVTVdJ9"; // Reemplaza con tu clave secreta
        $response = file_get_contents("https://www.google.com/recaptcha/api/siteverify?secret=$recaptchaSecret&response=" . $_POST['g-recaptcha-response']);
        $recaptchaResult = json_decode($response, true);

        if (!$recaptchaResult['success']) {
            $_SESSION['errores'] = ["Validación de reCAPTCHA fallida. Inténtalo de nuevo."];
            header("Location: ../index.php");
            exit;
        }
    }

    // Verificar contraseña
    if (password_verify($password1, $user['password1'])) {
        // Restablecer intentos fallidos
        $stmt = $dbh->prepare("UPDATE usuarios SET intentos_fallidos = 0, bloqueado_hasta = NULL WHERE idusuario = :id");
        $stmt->bindParam(':id', $user['idusuario']);
        $stmt->execute();

        // Iniciar sesión
        session_regenerate_id(true);
        $_SESSION['idusuario'] = $user['idusuario'];
        $_SESSION['usuario'] = $user['usuario'];
        $_SESSION['rol'] = $user['nomrol'];

        $_SESSION['nombre'] = $user['nombre'];
        $_SESSION['appaterno'] = $user['appaterno'];
        $_SESSION['apmaterno'] = $user['apmaterno'];
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
                header("Location: ../index.php");
                break;
        }
        exit;
    } else {
        // Incrementar intentos fallidos
        $stmt = $dbh->prepare("UPDATE usuarios SET intentos_fallidos = intentos_fallidos + 1 WHERE idusuario = :id");
        $stmt->bindParam(':id', $user['idusuario']);
        $stmt->execute();

        $intentosFallidos = $user['intentos_fallidos'] + 1;

        if ($intentosFallidos >= 3) {
            $_SESSION['mostrar_recaptcha'] = true;
        }

        if ($intentosFallidos >= 5) {
            $bloqueoHasta = date("Y-m-d H:i:s", time() + 15 * 60);
            $stmt = $dbh->prepare("UPDATE usuarios SET bloqueado_hasta = :bloqueado WHERE idusuario = :id");
            $stmt->bindParam(':bloqueado', $bloqueoHasta);
            $stmt->bindParam(':id', $user['idusuario']);
            $stmt->execute();
            $_SESSION['errores'] = ["Cuenta bloqueada por 15 minutos."];
            header("Location: ../index.php");
            exit;
        }

        $_SESSION['errores'] = ["Contraseña incorrecta. Intentos restantes: " . (5 - $intentosFallidos)];
        header("Location: ../index.php");
        exit;
    }
} else {
    $_SESSION['errores'] = ["Usuario no encontrado."];
    header("Location: ../index.php");
    exit;
}
