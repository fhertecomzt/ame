<?php
//Modulo mantenimiento*******************************************
function obtenerTiendas($dbh)
{
  $stmt = $dbh->prepare("SELECT * FROM tiendas");
  $stmt->execute();
  return $stmt->fetchAll(PDO::FETCH_ASSOC);
}

function obtenerRoles($dbh)
{
  $stmt = $dbh->prepare("SELECT * FROM roles");
  $stmt->execute();
  return $stmt->fetchAll(PDO::FETCH_ASSOC);
}

function obtenerUsuarios($dbh)
{
  $stmt = $dbh->prepare("SELECT usuarios.*, roles.nomrol, tiendas.nomtienda
FROM usuarios
JOIN roles ON usuarios.idrol = roles.idrol
JOIN tiendas ON usuarios.sucursales_id = tiendas.idtienda
WHERE roles.nomrol IN ('SISTEMAS')");
  $stmt->execute();
  return $stmt->fetchAll(PDO::FETCH_ASSOC);
}


function obtenerUsuariosSup($dbh)
{
  $stmt = $dbh->prepare("SELECT usuarios.*, roles.nomrol, tiendas.nomtienda
FROM usuarios
JOIN roles ON usuarios.idrol = roles.idrol
JOIN tiendas ON usuarios.sucursales_id = tiendas.idtienda
WHERE roles.nomrol IN ('SISTEMAS')");
  $stmt->execute();
  return $stmt->fetchAll(PDO::FETCH_ASSOC);
}

//Modulo catalogos*************************************************
function obtenerCategorias($dbh)
{
  $stmt = $dbh->prepare("SELECT * FROM categorias");
  $stmt->execute();
  return $stmt->fetchAll(PDO::FETCH_ASSOC);
}
