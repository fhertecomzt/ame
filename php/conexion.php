<?php
// conexion.php

//Conexion para PC
//$dsn = 'mysql:host=localhost;dbname=gestion;charset=utf8mb4'; // Usar utf8mb4 para mayor compatibilidad con caracteres especiales. cambioar en github

//Conexiòn Mac local
$dsn = 'mysql:host=192.168.1.112;dbname=gestion;charset=utf8mb4'; // Usar utf8mb4 para mayor compatibilidad con caracteres especiales.
$username = 'redmac'; // Verifica si el usuario es realmente 'roots'.
$password = 'Serverred2025/';

try {
    $dbh = new PDO($dsn, $username, $password);
    $dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION); // Habilita el modo de errores para capturar excepciones.
} catch (PDOException $e) {
    error_log('Error de conexión: ' . $e->getMessage()); // Registra el error en el log del servidor.
    die('No se pudo conectar a la base de datos.'); // Mensaje más seguro para evitar exponer detalles sensibles.
}
