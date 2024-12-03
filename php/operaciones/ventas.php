<?php
session_start();
//Restricción por rol
if (
  !isset($_SESSION['idusuario']) ||
  !in_array($_SESSION['rol'], ['SISTEMAS', 'GERENCIA', 'VENTAS'])
) {
  header("Location: ../../logout.php");
  exit;
}

include "../conexion.php";
?>

<div class="container">
  <div class="tittle">Formulario de Ventas demo</div>
  <?php include "../mensajeestado.php"; ?>
  <form method="post" action="ventas.php" id="frmVentas">
    <div class="form-group">
      <span class="is-required">Tipo de venta:</span>
      <select name="select">
        <option value="">[Selecciona un tipo de venta]</option>
        <option value="value1">VENTA A CONTADO</option>
        <option value="value2">VENTA A CREDITO</option>
      </select>
    </div>
    <div class="form-group">
      <span>Fecha actual:</span>
      <?php $fcha = date("Y-m-d"); ?>
      <input type="date" class="form-control" value="<?php echo $fcha; ?>" disabled>
    </div>
    <div class="form-group">
      <span>Tienda:</span>
      <input type="text" value="Tienda 1" disabled>
    </div>
    <div class="form-group">
      <span class="is-required"><i class="fas fa-barcode"></i> Código producto:</span>
      <input type="text" id="codbar_prod" name="codbar_prod" autocomplete="off" placeholder="Escribe o escanea el código del producto" value="" required>
    </div>
    <div class="form-group">
      <span>Descripción:</span>
      <input type="text" id="desc_prod" name="desc_prod" value="" disabled>
    </div>
    <div class="form-group">
      <span>Precio:</span>
      <input type="number" id="precio_prod" name="precio_prod" autocomplete="off" value="" disabled>
    </div>
    <div class="form-group">
      <span>Cantidad:</span>
      <input type="number" id="cant_prod" name="cant_prod" autocomplete="off" value="">
    </div>
    <div class="form-group">
      <span>Observaciones:</span>
      <input type="text" id="obs_mov" name="obs_mov" autocomplete="off" value="">
    </div>
  </form>

  <table border="1">
    <thead>
      <tr>
        <th>ID</th>
        <th>Descripción</th>
        <th>Cantidad</th>
        <th>Precio</th>
        <th>Sub total</th>
        <th>Acciones</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>00553</td>
        <td>Producto de prueba 1</td>
        <td>5</td>
        <td>100.00</td>
        <td>1,000.00</td>
        <td>
          <a href="#" title="Editar"> <i id="btneditar" class="fa-solid fa-pen-to-square"></i></a>
          <a href="#" title="Eliminar"> <i id="btneliminar" class="fa-solid fa-trash"></i></a>
        </td>
      </tr>
      <tr>
        <td>00554</td>
        <td>Producto de prueba 2</td>
        <td>2</td>
        <td>100.00</td>
        <td>200.00</td>
        <td>
          <a href="#" title="Editar"> <i id="btneditar" class="fa-solid fa-pen-to-square"></i></a>
          <a href="#" title="Eliminar"> <i id="btneliminar" class="fa-solid fa-trash"></i></a>
        </td>
      </tr>
      <tr>
        <td>00555</td>
        <td>Producto de prueba 3</td>
        <td>20</td>
        <td>100.00</td>
        <td>2,000.00</td>
        <td>
          <a href="#" title="Editar"> <i id="btneditar" class="fa-solid fa-pen-to-square"></i></a>
          <a href="#" title="Eliminar"> <i id="btneliminar" class="fa-solid fa-trash"></i></a>
        </td>
      </tr>
    </tbody>
  </table>

  <div class="form-total">
    <div class="button-container">
      <div class="buttons">
        <input type="button" id="botonNuevo" onclick="limpiarFormularioAjusteinvt(); cambiarTextoBoton();" value="Nuevo">
      </div>
      <div class="buttons">
        <input type="submit" id="botonGuardarActualizar" value="<?php echo isset($nom_mov) ? 'Actualizar' : 'Generar venta'; ?>"></input>
      </div>
    </div>
    <div class="form-group">
      <span>Total:</span>
      <input type="text" id="total_ajuste" name="total_ajuste" autocomplete="off" value="2,200.00" style="font-size: 2rem; width: 200px; margin:20px 45px;">
    </div>
  </div>
</div>