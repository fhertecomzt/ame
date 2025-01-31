<?php
// Rellenamos la lista de roles excluyendo "Superusuario"
$consulta_roles = $dbh->prepare("SELECT * FROM roles WHERE nomrol != 'SISTEMAS'");
$consulta_roles->execute();

$lista_roles = []; // Inicializa como un array

while ($rol = $consulta_roles->fetch(PDO::FETCH_ASSOC)) {
  $lista_roles[] = $rol; // Agrega cada rol al array
}

// Rellenamos la lista de tiendas
$consulta_tiendas = $dbh->prepare("SELECT * FROM tiendas");
$consulta_tiendas->execute();
$lista_tiendas = []; // Inicializa como un array

while ($tienda = $consulta_tiendas->fetch(PDO::FETCH_ASSOC)) {
  $lista_tiendas[] = $tienda; // Agrega cada sucursal al array
}
