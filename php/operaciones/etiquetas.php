<?php
session_start();
//Restricción por rol
if (!isset($_SESSION['idusuario']) || ($_SESSION["rol"] !== "SISTEMAS" && $_SESSION["rol"] !== "GERENCIA")) {
  header("Location: ../../index.php");
  exit;
}

include "../conexion.php";
?>

<div class="container">
  <div class="tittle">Formulario Generador de etiquetas</div>
  <?php include "../mensajeestado.php"; ?>
  <form method="post" action="movimientos.php" id="frmMovimientos">

    <div class="form-group">
      <span class="is-required"><i class="fas fa-barcode"></i> Código producto:</span>
      <input type="text" id="codbar_prod" name="codbar_prod" autocomplete="off" placeholder="Escribe o escanea el código del producto" autofocus>
    </div>
    <div class="form-group">
      <span>Descripción:</span>
      <input type="text" id="desc_prod" name="desc_prod" value="" disabled>
    </div>
    <div class="form-group">
      <span class="is-required">Cantidad:</span>
      <!--Limitamos la cantidad a 1000-->
      <input type="number" id="cant_prod" name="cant_prod" autocomplete="off" value="0" max="1000" oninput="if(this.value.length > 4) this.value = this.value.slice(0, 4);" required>
    </div>
  </form>

  <table border="1">
    <thead>
      <tr>
        <th>Código</th>
        <th>Descripción</th>
        <th>Cantidad</th>
        <th>Acciones</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>56546321</td>
        <td>Producto de prueba 1</td>
        <td>10</td>
        <td>
          <a href="#" title="Editar"> <i id="btneditar" class="fa-solid fa-pen-to-square"></i></a>
          <a href="#" title="Eliminar"> <i id="btneliminar" class="fa-solid fa-trash"></i></a>
          <a href="#" title="Editar"> <i id="btneditar" class="fa-regular fa-file-pdf"></i></a>
        </td>
      </tr>
      <tr>
        <td>876878</td>
        <td>Producto de prueba 2</td>
        <td>10</td>
        <td>
          <a href="#" title="Editar" onclick="cargarEditarCategoria(<?php echo $u['idcategoria']; ?>); return false;"><i id="btneditar" class="fa-solid fa-pen-to-square"></i></a>
          <a href="#" title="Eliminar" onclick="eliminarCategoria(<?php echo $u['idcategoria']; ?>); return false;"><i id="btneliminar" class="fa-solid fa-trash"></i></a>
          <a href="#" title="Imprimir" onclick="cargarEditarCategoria(<?php echo $u['idcategoria']; ?>); return false;"><i id="btneditar" class="fa-regular fa-file-pdf"></i></a>
        </td>
      </tr>
    </tbody>
  </table>

  <div class="form-total">
    <div class="button-container">
      <div class="buttons">
        <input type="button" id="botonNuevo" onclick="limpiarFormularioEtiquetas(); cambiarTextoBoton();" value="Nuevo">
      </div>
      <div class="buttons">
        <input type="submit" id="botonGuardarActualizar" value="<?php echo isset($nom_mov) ? 'Actualizar' : 'Imprimir'; ?>"></input>
      </div>
    </div>
  </div>
</div>