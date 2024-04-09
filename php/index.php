<?php
session_start();
if(!isset($_SESSION["usuario"])){//Extrae la etiqueta de tipo usuario
	header("Location: ../index.html");
	}
	include 'logout.php';
	header("Location: ../index.html");			
?>
