<?php
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

$roles_permitidos = ["VENTAS"];
include "verificar_sesion.php";

// Encabezados para evitar el caché
header("Cache-Control: no-store, no-cache, must-revalidate, max-age=0");
header("Cache-Control: post-check=0, pre-check=0", false);
header("Pragma: no-cache");

// Verificar si hay una sesión activa y si el rol está permitido
if (!isset($_SESSION['rol']) || !in_array($_SESSION['rol'], $roles_permitidos)) {
    header("Location: ../index.php?error=acceso_denegado");
    exit;
}

// Generar un token único en cada acceso
$current_token = bin2hex(random_bytes(32));
$_SESSION['current_token'] = $current_token;

// Verificar el token de navegación para detectar inconsistencias
if (isset($_SESSION['last_token'])) {
    $page_token = $_POST['page_token'] ?? '';
    if ($_SESSION['last_token'] !== $page_token) {
        // Destruir la sesión y redirigir al inicio con un mensaje
        session_unset();
        session_destroy();
        header("Location: ../index.php?session_expired=1&error=navegacion_inconsistente");
        exit;
    }
}

// Actualizar el último token utilizado
$_SESSION['last_token'] = $current_token;
?>

<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>VENTAS AME</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <!-- CDn Font Awesome link-->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
    <!--Estilo Css GM -->
    <link rel="stylesheet" href="../css/estilovta.css">
    <!--Estilo Css formulario -->
    <link rel="stylesheet" href="../css/formularios.css">
    <!--Estilo Css tablas -->
    <link rel="stylesheet" href="../css/tablas.css">
    <!--Estilo Css errores -->
    <link rel="stylesheet" href="../css/mensajesdeestado.css">
</head>

<body>
    <nav>
        <div class="sidebar">
            <div class="logo"></div>
            <ul class="menu">
                <li>
                    <a href="vta.php#" id="inicio-link">
                        <i class="fas fa-tachometer-alt"></i>
                        <span>INICIO</span>
                    </a>
                </li>
                <li>
                    <a href="#" id="ventas-link">
                        <i class="fas fa-wrench"></i>
                        <span>VENTAS</span>
                    </a>
                    <ul>
                    </ul>
                </li>

                <li>
                    <a href="#">
                        <i class="fa-solid fa-folder-tree"></i>
                        <span>CATALOGOS</span>
                    </a>
                    <ul>
                        <li>
                            <a href="#" id="clientes-link">
                                <i class="fa-solid fa-people-group"></i>
                                <span>CLIENTES</span>
                            </a>
                        </li>
                    </ul>
                </li>

                <li><a href="#">
                        <i class="fa-solid fa-address-card"></i>
                        <span>MI CUENTA</span>
                    </a>
                    <ul>
                        <li>
                            <a href="#" id="perfil-link">
                                <i class="fa-solid fa-user-pen"></i>
                                <span>PERFIL</span>
                            </a>
                        </li>
                        <li>
                            <a href="logout.php" id="">
                                <i class="fa-solid fa-rotate"></i>
                                <span>CAMBIAR DE USUARIO</span>
                            </a>
                        </li>
                        <li>
                            <a href="logout.php" id="">
                                <i class="fa-solid fa-right-from-bracket"></i>
                                <span>SALIR</span>
                            </a>
                        </li>
                    </ul>
                </li>
                </li>
        </div>
    </nav>
    <div class="main--content" id="main-content">
        <div class="header--wrapper">
            <div class="header--title">
                <h2>Usuario: <?php echo $_SESSION['nombre'] . " " . $_SESSION['appaterno'] . " " . $_SESSION['apmaterno']; ?></h2>
                <span>Rol: <?php echo $_SESSION['rol'] ?> &nbsp;&nbsp;&nbsp;<span>Tienda: <?php echo $_SESSION['sucursal_nombre'] ?></span></span>
            </div>
            <div class="user--info">
                <div class="search--box">
                    <i class="fa-solid fa-search"></i>
                    <input disabled type="text" name="buscar" placeholder="Buscar">
                </div>
                <img src="<?php echo $_SESSION['imagen']; ?>" alt="Imagen de perfil" width="50" height="50">
            </div>
        </div>

        <div class="content-area" id="content-area">
            <!-- Contenido dinámico se cargará aquí -->
        </div>
    </div>

    <script src="../js/clientes.js"></script>
    <SCRIPT src="../js/perfil.js"></SCRIPT>
    <script src="../js/ventas.js"></script>
    <script src="../js/tiempo_sessiones.js"></script>
</body>

</html>