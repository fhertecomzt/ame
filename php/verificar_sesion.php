<?php
if (session_status() === PHP_SESSION_NONE) {
  session_start();
}

$rol_requerido = isset($rol_requerido) ? $rol_requerido : null;

// Establecer un tiempo máximo de inactividad (en segundos)
$tiempo_inactividad = 600; // 10 minutos

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

// Verificar si el usuario tiene sesión activa y el rol permitido
if (!isset($_SESSION['idusuario']) || ($rol_requerido && $_SESSION['rol'] !== $rol_requerido)) {
  header("Location: logout.php");
  exit;
}
