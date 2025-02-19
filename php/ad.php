<?php

//Encabezados para evitar el caché
header("Cache-Control: no-store, no-cache, must-revalidate, max-age=0");
header("Cache-Control: post-check=0, pre-check=0", false);
header("Pragma: no-cache");

if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

$roles_permitidos = ["SISTEMAS"];
include "verificar_sesion.php";


/* Verificar si hay una sesión activa y si el rol está permitido
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
$_SESSION['last_token'] = $current_token;*/

?>


<!DOCTYPE html>
<html>

<head>
    <meta charset="utf8mb4">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Administrador AME</title>
    <!-- CDn Font Awesome link fuente iconos-->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
    <!--Estilo Css admin -->
    <link rel="stylesheet" href="../css/estiloadmin.css">
    <!--Estilo Css formulario -->
    <link rel="stylesheet" href="../css/formularios.css">
    <!--Estilo Css tablas -->
    <link rel="stylesheet" href="../css/tablas.css">
    <!--Estilo Css errores -->
    <link rel="stylesheet" href="../css/mensajesdeestado.css">
    <style>
        .content {
            margin-left: 250px;
            padding: 20px;
        }
    </style>
</head>

<body>
    <nav>
        <div class="sidebar">
            <div class="logo">
                <img src="../imgs/logo.jpg" alt="SOUMAZ" style="height: 50px; width: 50px; border-radius: 25px">
            </div>
            <ul class="menu">
                <li>
                    <a href="ad.php#" id="inicio-link">
                        <i class="fas fa-tachometer-alt"></i>
                        <span>INICIO</span>
                    </a>
                </li>
                <li><a href="#">
                        <i class="fas fa-wrench"></i>
                        <span>MANTENIMIENTO</span>
                    </a>
                    <ul>
                        <li>
                            <a href="#" id="tiendas-link">
                                <i class="fa-solid fa-shop"></i>
                                <span>TIENDAS</span>
                            </a>
                        </li>
                        <li>
                            <a href="#" id="roles-link">
                                <i class="fa-regular fa-address-book"></i>
                                <span>ROLES</span>
                            </a>
                        </li>

                        <li>
                            <a href="#" id="usuarios-link">
                                <i class="fas fa-user"></i>
                                <span>USUARIOS</span>
                            </a>
                        </li>
                        <li>
                            <a href="#" id="usuariossup-link">
                                <i class="fas fa-user"></i>
                                <span>SUPUSUARIOS</span>
                            </a>
                        </li>
                    </ul>
                </li>
                <li><a href="#">
                        <i class="fa-solid fa-folder-tree"></i>
                        <span>CATÁLOGOS</span>
                    </a>
                    <ul>
                        <li>
                            <a href="#" id="productos-link">
                                <i class="fa-solid fa-boxes-stacked"></i>
                                <span>PRODUCTOS</span>
                            </a>
                        </li>
                        <li>
                            <a href="#" id="categorias-link">
                                <i class="fa-solid fa-layer-group"></i>
                                <span>CATEGORIAS</span>
                            </a>
                        </li>

                        <li>
                            <a href="#" id="umedidas-link">
                                <i class="fa-solid fa-ruler"></i>
                                <span>UNIDADES</span>
                            </a>
                        </li>
                        <li>
                            <a href="#" id="marcas-link">
                                <i class="fa-regular fa-copyright"></i>
                                <span>MARCAS</span>
                            </a>
                        </li>
                        <li>
                            <a href="#" id="tallas-link">
                                <i class="fa-solid fa-up-right-and-down-left-from-center"></i>
                                <span>TALLAS</span>
                            </a>
                        </li>
                        <li>
                            <a href="#" id="colores-link">
                                <i class="fa-solid fa-palette"></i>
                                <span>COLORES</span>
                            </a>
                        </li>
                        <li>
                            <a href="#" id="generos-link">
                                <i class="fa-solid fa-venus-mars"></i>
                                <span>GÉNEROS</span>
                            </a>
                        </li>
                        <li>
                            <a href="#" id="estilos-link">
                                <i class="fa-solid fa-vest-patches"></i>
                                <span>ESTILOS</span>
                            </a>
                        </li>
                        <li>
                            <a href="#" id="mpagos-link">
                                <i class="fa-solid fa-file-invoice-dollar"></i>
                                <span>MÉTODOS DE PAGO</span>
                            </a>
                        </li>
                        <li>
                            <a href="#" id="impuestos-link">
                                <i class="fa-solid fa-file-invoice-dollar"></i>
                                <span>IMPUESTOS</span>
                            </a>
                        </li>
                        <li>
                            <a href="#" id="proveedores-link">
                                <i class="fa-solid fa-person-half-dress"></i>
                                <span>PROVEEDORES</span>
                            </a>
                        </li>
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
                        <span>OPERACIONES</span>
                    </a>
                    <ul>
                        <li>
                            <a href="#" id="movimientos-link">
                                <i class="fa-solid fa-list-check"></i>
                                <span>MOVIMIENTOS</span>
                            </a>
                        </li>
                        <li>
                            <a href="#" id="etiquetas-link">
                                <i class="fa-solid fa-barcode"></i>
                                <span>ETIQUETAS</span>
                            </a>
                        </li>
                        <li>
                            <a href="#" id="ajustesinventario-link">
                                <i class="fa-solid fa-sliders"></i>
                                <span>AJUSTES INVENTARIO</span>
                            </a>
                        </li>
                        <li>
                            <a href="#" id="abonosproveedor-link">
                                <i class="fa-solid fa-money-bill-1-wave"></i>
                                <span>ABONOS A PROVEEDOR</span>
                            </a>
                        </li>
                    </ul>
                </li>

                <li><a href="#" id="informes-link">
                        <i class="fa-solid fa-sheet-plastic"></i>
                        <span>INFORMES</span>
                    </a>
                </li>
                <li><a href="#" id="ventas-link">
                        <i class="fa-solid fa-cash-register"></i>
                        <span>VENTAS</span>
                    </a>

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
                <h2>Tienda: <?php echo $_SESSION['sucursal_nombre'] ?></h2>
                <span>Rol: <?php echo $_SESSION['rol'] ?> &nbsp;&nbsp;&nbsp;<span>Usuario: <?php echo $_SESSION['nombre'] . " " . $_SESSION['appaterno'] . " " . $_SESSION['apmaterno']; ?></span></span>
            </div>
            <div class="user--info">

                <img src="<?php echo $_SESSION['imagen']; ?>" alt="Imagen de perfil" width="50" height="50">
            </div>
        </div>

        <div class="content-area" id="content-area">
            <!-- Contenido dinámico se cargará aquí -->
            <?php
            if (isset($_GET['page']) && $_GET['page'] === 'tiendas') {
                include 'tiendas.php';
            }
            ?>
        </div>
    </div>

    <!--Scripts JS-->
    <script src="../js/scripts.js"></script>
    <script src="../js/scriptssup.js"></script>
    <script src="../js/clientes.js"></script>
    <script src="../js/ventas.js"></script>
    <script src="../js/perfil.js"></script>
    <script src="../js/tiempo_sessiones.js"></script>
    <!--Alertas SweetAlert2-->
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
</body>

</html>