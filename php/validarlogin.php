<?php
session_start();
if(!isset($_POST['btn_iniciar'])) {	
	header("Location: ../index.html");
}

include "conexion.php";

	$usuario = $_POST['txtusuario']; 
	$password1 = md5($_POST['txtpassword1']);

	if ($dbh !=null) { //Conectado a la db
		echo "Conectado a la db. OK</br> ";
		$stmt = $dbh->prepare("SELECT idusuario, usuario, nombre, appaterno, apmaterno, departamento, tipodeusuario FROM usuarios WHERE usuario=:usuario AND password1=:password1");

		$stmt->bindParam(':usuario', $usuario);
		$stmt->bindParam(':password1', $password1);

		$stmt->setFetchMode(PDO::FETCH_ASSOC);
		//Ejecuta consulta
		$stmt->execute();
		$datos = $stmt->fetch();


		if($datos['usuario']!=null) { //Si obtuvo registro
			$_SESSION["idusuario"]=$datos["idusuario"];
			$_SESSION["usuario"]=$datos["usuario"];
			$_SESSION["nombre"]=$datos["nombre"];
			$_SESSION["appaterno"]=$datos["appaterno"];
			$_SESSION["apmaterno"]=$datos["apmaterno"];
			$_SESSION["tipodeusuario"]=$datos["tipodeusuario"];
			$_SESSION["departamento"]=$datos["departamento"];

			if($_SESSION["tipodeusuario"]=='AD'){//Extrae la etiqueta de tipo usuario			 
				//$_SESSION["usuario"]="Administrador";
				header("Location: ad.php");
			}elseif($_SESSION["tipodeusuario"]=='VTA'){
				$_SESSION["usuario"]="Ventas";
				header("Location: vta.php");
			} //fin del elseif			
		} //Fin si se obtuvo registro
			else //No se obtuvo registro
			{	
				echo "<h1>Usuario no registrado.</h1> ";
				echo "<h2>Usuario o Contraseña incorrecta.</h2> ";
				echo "<br><br><a href='../index.html'><img src='../imgs/back.png'>Regresar</a>";
				exit();
			}
			$dbh=null; //Termina la conexión
			}
			else //nO SÉ LOGRO LA CONEXION
			{
				echo "<h1>No hay conexión con la base de datos</h1>";
				}	
?>