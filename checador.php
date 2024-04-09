<!DOCTYPE html>
<html lang="es">
<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<title>Reloj Checador</title>
	<link rel="stylesheet" href="css/estiloreloj.css">
	<!--Fuente google Nunito -->
	<link rel="preconnect" href="https://fonts.googleapis.com">
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
	<link href="https://fonts.googleapis.com/css2?family=Nunito:wght@300;400,&display=swap" rel="stylesheet">
</head>
<body>
	<h1>Reloj checador</h1>
	<h2 id="fecha"></h2>
	<div class="container">
		<a class="acceso" href="">INGRESA AL SISTEMA</a>
		<p class="codigo">INGRESA TU CÓDIGO:</p>
		<form action="">
			<input type="text" placeholder="CÓDIGO DE EMPLEADO" name="txtcodempleado">
			<div class="botones">
			<a href="" class="entrada">ENTRADA</a>
			<a href="" class="salida">SALIDA</a>
			</div>
		</form>
	</div>

	<script>
		setInterval(() =>{
			let fecha = new Date();
			let fechaHora = fecha.toLocaleString();
			document.getElementById("fecha").textContent = fechaHora;
		}, 1000);
	</script>
</body>
</html>
