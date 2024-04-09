<?php
session_start();
if(!isset($_SESSION['usuario'])) {
	header("Location: index.php");
	exit();
	}if ($_SESSION['tipodeusuario']!=='VTA') {
		// code...
		header("Location: logout.php");
	}
?>
<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<title>Ventas</title>
</head>
<body>
<h1>Hola bienvenido <h2>Usuario: <?php 										
							     	echo $_SESSION['nombre']." ". $_SESSION['appaterno']." ". $_SESSION['apmaterno'];
						          ?>
					</h2>
</h1>
<a href="logout.php">Salir</a>
</body>
</html>