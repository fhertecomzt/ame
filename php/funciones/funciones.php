<?php

//Obtener registros*******************************************
function obtenerRegistros($dbh, $tabla, $campos = "*", $orden = "id DESC", $campoId = "id", $registrosPorPagina = 10, $pagina = 1)
{
  // Evita SQL Injection verificando que el nombre de la tabla sea válido
  $tablasPermitidas = ['tiendas', 'roles', 'categorias', 'umedidas', 'marcas', 'tallas', 'colores', 'generos', 'estilos', 'mpagos', 'impuestos','clientes','proveedores'];
  if (!in_array($tabla, $tablasPermitidas)) {
    return []; // Evita consultas en tablas no permitidas
  }

  // Calcular el OFFSET para la paginación
  $offset = ($pagina - 1) * $registrosPorPagina;

  // Consulta SQL con LIMIT y OFFSET para paginación
  $sql = "SELECT $campos FROM $tabla ORDER BY $campoId $orden LIMIT :limit OFFSET :offset";
  $stmt = $dbh->prepare($sql);

  // Bind de los parámetros para evitar SQL Injection
  $stmt->bindParam(':limit', $registrosPorPagina, PDO::PARAM_INT);
  $stmt->bindParam(':offset', $offset, PDO::PARAM_INT);

  $stmt->execute();
  $registros = $stmt->fetchAll(PDO::FETCH_ASSOC);

  return $registros;
}

// Función adicional para obtener el total de registros
function obtenerTotalRegistros($dbh, $tabla)
{
  $sql = "SELECT COUNT(*) FROM $tabla";
  $stmt = $dbh->prepare($sql);
  $stmt->execute();
  return $stmt->fetchColumn();
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