<?php
session_start();

// Generar números aleatorios
$num1 = rand(1, 9);
$num2 = rand(1, 9);

// Guardar el resultado en la sesión
$_SESSION['captcha_result'] = $num1 + $num2;

// Crear la imagen
$imagen = imagecreatetruecolor(120, 40);

// Colores
$fondo = imagecolorallocate($imagen, 255, 255, 255); // Blanco
$texto = imagecolorallocate($imagen, 0, 0, 0); // Negro

// Rellenar el fondo
imagefilledrectangle($imagen, 0, 0, 120, 40, $fondo);

// Añadir el texto
$texto_captcha = "$num1 + $num2 = ?";
imagettftext($imagen, 20, 0, 10, 30, $texto, __DIR__ . 'arial.ttf');

// Establecer encabezados para la imagen
header("Content-Type: image/png");

// Mostrar la imagen
imagepng($imagen);

// Liberar memoria
imagedestroy($imagen);
