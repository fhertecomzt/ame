<?php
if (session_status() === PHP_SESSION_NONE) {
  session_start();
}

// Definir los roles permitidos para la página
$roles_permitidos = ["SISTEMAS", "GERENCIA", "VENTAS"];

// Establecer un tiempo máximo de inactividad (en segundos)
$tiempo_inactividad = 50; // 10 minutos

// Revisar si existe un timestamp de actividad previa
if (isset($_SESSION['ultimo_acceso'])) {
  $inactivo = time() - $_SESSION['ultimo_acceso'];
  if ($inactivo > $tiempo_inactividad) {
    session_unset();
    session_destroy();
    header("Location: ../index.php");
    exit;
  }
}

$_SESSION['ultimo_acceso'] = time();

// Verificar si el rol del usuario está permitido
if (!isset($_SESSION['rol']) || !in_array($_SESSION['rol'], $roles_permitidos)) {
  header("Location: logout.php");
  exit;
}
