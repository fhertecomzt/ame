<?php
require "../conexion.php";
include "../funciones/funciones.php";
include "../funciones/activoinactivo.php";

$categorias = obtenerRegistros($dbh, "categorias", "idcategoria, nomcategoria", "ASC", "idcategoria");
$marcas = obtenerRegistros($dbh, "marcas", "idmarca, nommarca", "ASC", "idmarca");
$generos = obtenerRegistros($dbh, "generos", "idgenero, nomgenero", "ASC", "idgenero");
$tallas = obtenerRegistros($dbh, "tallas", "idtalla, nomtalla", "ASC", "idtalla");
$estilos = obtenerRegistros($dbh, "estilos", "idestilo, nomestilo", "ASC", "idestilo");
$colores = obtenerRegistros($dbh, "colores", "idcolor, nomcolor", "ASC", "idcolor");

$impuestos = obtenerRegistros($dbh, "impuestos", "idimpuesto, nomimpuesto", "ASC", "idimpuesto");
$umedidas = obtenerRegistros($dbh, "umedidas", "idumedida, nomumedida", "ASC", "idumedida");
$proveedores = obtenerRegistros($dbh, "proveedores", "idproveedor, nomproveedor", "ASC", "idproveedor");

?>
<!DOCTYPE html>
<html lang="es">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Tabla Dinámica para Insertar Productos</title>
  <style>
    table {
      width: 100%;
      border-collapse: collapse;
    }

    th,
    td {
      padding: 10px;
      border: 1px solid #ccc;
    }

    input[type="text"],
    input[type="number"],
    select {
      width: 100%;
    }
  </style>
</head>

<body>
  <form action="insertar_productos.php" method="POST">
    <table id="tabla-productos">
      <thead>
        <tr>
          <th>Código de Barra</th>
          <th>Nombre del Producto</th>
          <th>Descripción</th>
          <th>Categoría</th>
          <th>Talla</th>
          <th>Costo</th>
          <th>Precio 1</th>
          <th>Precio 2</th>
          <th>Impuesto</th>
          <th>Estatus</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><input type="text" name="codbar[]" required></td>
          <td><input type="text" name="nom_prod[]" required></td>
          <td><input type="text" name="desc_prod[]" required></td>
          <td>
            <select name="idcategoria[]" required>
              <!-- Opciones obtenidas de la base de datos -->
              <?php foreach ($categorias as $categoria): ?>
                <option value="<?php echo htmlspecialchars($categoria['idcategoria']); ?>">
                  <?php echo htmlspecialchars($categoria['nomcategoria']); ?>
                </option>
              <?php endforeach; ?>
            </select>
          </td>

          <td>
            <select name="idtalla[]" required>
              <!-- Opciones obtenidas de la base de datos -->
              <?php foreach ($tallas as $talla): ?>
                <option value="<?php echo htmlspecialchars($talla['idtalla']); ?>">
                  <?php echo htmlspecialchars($talla['nomtalla']); ?>
                </option>
              <?php endforeach; ?>
            </select>
          </td>
          <td><input type="number" name="costo_prod[]" step="0.01" required></td>
          <td><input type="number" name="precio1[]" step="0.01" required></td>
          <td><input type="number" name="precio2[]" step="0.01"></td>
          <td>
            <select name="idimpuesto[]" required>
              <!-- Opciones obtenidas de la base de datos -->
              <?php foreach ($impuestos as $impuesto): ?>
                <option value="<?php echo htmlspecialchars($impuesto['idimpuesto']); ?>">
                  <?php echo htmlspecialchars($impuesto['nomimpuesto']); ?>
                </option>
              <?php endforeach; ?>
            </select>
          </td>
          <td>
            <select name="idestatus[]" required>
              <!-- Opciones obtenidas de la base de datos -->
              <?php foreach ($options as $key => $text) { ?>
                <option value="<?= $key ?>" <?= $key === $selected ? 'selected' : '' ?>><?= $text ?></option>
              <?php } ?>
            </select>
          </td>
          <td>
            <button type="button" onclick="eliminarFila(this)">Eliminar</button>
            <button type="button" onclick="agregarFila()">Agregar Fila</button>
            <button type="submit">Guardar Productos</button>
          </td>
        </tr>
      </tbody>
    </table>

  </form>

</body>

</html>