<?php
session_start();
if (!isset($_SESSION['idusuario']) || $_SESSION["rol"] !== "VENTAS") {
    header("Location: ../logout.php");
    exit;
}
//$sucursal_nombre = $_SESSION['sucursal_nombre'];
?>
<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>VENTAS AME</title>
    <!-- CDn Font Awesome link-->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
    <!--Estilo Css admin -->
    <link rel="stylesheet" href="../css/estilovta.css">
</head>

<body>
    <nav>
        <div class="sidebar">
            <div class="logo"></div>
            <ul class="menu">
                <li>
                    <a href="ad.php" id="inicio-link">
                        <i class="fas fa-tachometer-alt"></i>
                        <span>INICIO</span>
                    </a>
                </li>
                <li><a href="#">
                        <i class="fas fa-wrench"></i>
                        <span>VENTAS</span>
                    </a>
                    <ul>
                    </ul>
                </li>

                <li><a href="#">
                        <i class="fa-solid fa-folder-tree"></i>
                        <span>CATALOGOS</span>
                    </a>
                    <ul>
                        <li>
                            <a href="#" id="usuarios-link">
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
    <div class="main--content">
        <div class="header--wrapper">
            <div class="header--title">
                <h2>Usuario: <?php echo $_SESSION['nombre'] . " " . $_SESSION['appaterno'] . " " . $_SESSION['apmaterno']; ?></h2>
                <span>Rol: <?php echo $_SESSION['rol'] ?> &nbsp;&nbsp;&nbsp;<span>Tienda: <?php echo htmlspecialchars($sucursal_nombre); ?></span>
                </span>

            </div>
            <div class="user--info">
                <div class="search--box">
                    <i class="fa-solid fa-search"></i>
                    <input type="text" name="buscar" placeholder="Buscar">
                </div>
                <img src="../imgs/yoredes2024.jpg" alt="">
            </div>
        </div>
    </div>
</body>

</html>