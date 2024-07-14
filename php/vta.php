<?php
session_start();
if (!isset($_SESSION['idusuario']) || $_SESSION["departamento"] !== "VENTAS") {
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
</head>
<body>
<div class="sidebar">
	<div class="logo"></div>
		<ul class="menu">
			<li class="">
				<a href="#">
					<i class="fas fa-tachometer-alt"></i>
						<span>PANEL</span>
				</a>
			</li>

			<li>
				<a href="#">
					<i class="fas fa-user"></i>
						<span>USUARIOS</span>
				</a>
			</li>
			<li>
				<a href="#">
					<i class="fas fa-chart-bar"></i>
						<span>USUARIOS</span>
				</a>
			</li>

			<li>
				<a href="#">
					<i class="fas fa-briefcase"></i>
						<span>USUARIOS</span>
				</a>
			</li>

			<li>
				<a href="#">
					<i class="fas fa-question-circle"></i>				
						<span>USUARIOS</span>
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
<div class="main--content">
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
</div>
</body>
</html>