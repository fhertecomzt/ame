<?php
session_start();
if (!isset($_SESSION['idusuario']) || $_SESSION["departamento"] !== "SISTEMAS") {
    header("Location: ../login.php");
    exit;
}
    $sucursal_nombre = $_SESSION['sucursal_nombre'];
?>
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Administrador</title>
    <!-- CDn Font Awesome link-->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
    <!--Estilo Css admin -->
    <link rel="stylesheet" href="../css/estiloadmin.css">
    <style>
        .content { margin-left: 250px; padding: 20px; }
    </style>
</head>
<body>
    <div class="sidebar">
        <div class="logo"></div>
        <ul class="menu">
            <li class="">
                <a href="">
                    <i class="fas fa-tachometer-alt"></i>
                    <span>PANEL</span>
                </a>
            </li>
            <li>
                <a href="#" id="usuarios-link">
                    <i class="fas fa-user"></i>
                    <span>USUARIOS</span>
                </a>
            </li>
            <li>
                <a href="#" id="departamentos-link">
                    <i class="fas fa-chart-bar"></i>
                    <span>DEPARTAMENTOS</span>
                </a>
            </li>
            <li>
                <a href="#">
                    <i class="fas fa-briefcase"></i>
                    <span>TIENDAS</span>
                </a>
            </li>
            <li>
                <a href="#">
                    <i class="fas fa-question-circle"></i>                
                    <span>OTRO</span>
                </a>
            </li>
            <li class="logout">
                <a href="logout.php">
                    <i class="fas fa-sign-out-alt"></i>
                    <span>SALIR</span>
                </a>
            </li>
        </ul>    
    </div>
    
    <div class="main--content" id="main-content">
        <div class="header--wrapper">
            <div class="header--title">
                <h2>Usuario: <?php echo $_SESSION['nombre']." ". $_SESSION['appaterno']." ". $_SESSION['apmaterno']; ?></h2>
                <span>Departamento: <?php echo $_SESSION['departamento'] ?> &nbsp;&nbsp;&nbsp;<span>Tienda: <?php echo htmlspecialchars($sucursal_nombre); ?></span>
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

        <div class="content-area" id="content-area">
                    <!-- Contenido dinámico se cargará aquí -->                  
        </div>

    <script>
        document.getElementById('usuarios-link').addEventListener('click', function(event) {
            event.preventDefault(); // Evita la acción por defecto del enlace
            fetch('usuarios.php')
                .then(response => response.text())
                .then(html => {
                    document.getElementById('content-area').innerHTML = html;
                })
                .catch(error => {
                    console.error('Error al cargar el contenido:', error);
                });
        });

        function cargarEditarUsuario(id) {
            fetch('usuarios.php?id=' + id)
                .then(response => response.text())
                .then(html => {
                    document.getElementById('content-area').innerHTML = html;
                })
                .catch(error => {
                    console.error('Error al cargar el contenido:', error);
                });
        }

        function eliminarUsuario(id) {
            if (confirm('¿Estás seguro de que deseas eliminar este usuario?')) {
                fetch('usuarios.php?action=delete&id=' + id)
                    .then(response => response.text())
                    .then(html => {
                        document.getElementById('content-area').innerHTML = html;
                    })
                    .catch(error => {
                        console.error('Error al eliminar el usuario:', error);
                    });
            }
        }

                document.getElementById('departamentos-link').addEventListener('click', function(event) {
            event.preventDefault(); // Evita la acción por defecto del enlace
            fetch('departamentos.php')
                .then(response => response.text())
                .then(html => {
                    document.getElementById('content-area').innerHTML = html;
                })
                .catch(error => {
                    console.error('Error al cargar el contenido:', error);
                });
        });
    </script>
    </div>
</body>
</html>