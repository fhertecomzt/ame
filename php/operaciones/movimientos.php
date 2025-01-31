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
  <div class="tittle">Formulario de movimientos demo</div>
  <?php include "../mensajeestado.php"; ?>
  <form method="post" action="movimientos.php" id="frmMovimientos">
    <div class="form-group">
      <span class="is-required">Tipo de movimiento:</span>
      <select name="select">
        <option value="">[Selecciona un tipo de moviento]</option>
        <option value="value1">ENTRADA COMPRA</option>
        <option value="value2">ENTRADA DEVOLUCIÓN</option>
        <option value="value3">ENTRADA TRASPASO</option>
        <option value="value3">SALIDA VENTA</option>
        <option value="value3">SALIDA DEVOLUCIÓN</option>
        <option value="value3">SALIDA TRASPASO</option>
      </select>
    </div>
    <div class="form-group">
      <span>Fecha actual:</span>
      <?php $fcha = date("Y-m-d"); ?>
      <input type="date" class="form-control" value="<?php echo $fcha; ?>" disabled>
    </div>
    <div class="form-group">
      <span class="is-required">Tienda de Origen:</span>
      <select name="select">
        <option value="">[Selecciona un tipo de moviento]</option>
        <option value="value1">Tienda 1</option>
        <option value="value2">Tienda 2</option>
        <option value="value3">Teinda 3</option>
      </select>
    </div>
    <div class="form-group">
      <span class="is-required">Tienda de destino:</span>
      <select name="select">
        <option value="">[Selecciona un tipo de moviento]</option>
        <option value="value1">Tienda 1</option>
        <option value="value2">Tienda 2</option>
        <option value="value3">Teinda 3</option>
      </select>
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
      <span class="is-required">Cantidad:</span>
      <!--Limitamos la cantidad a 1000-->
      <input type="number" id="cant_prod" name="cant_prod" autocomplete="off" value="0" max="1000" oninput="if(this.value.length > 4) this.value = this.value.slice(0, 4);" required>
    </div>
    <div class="form-group">
      <span>Precio:</span>
      <input type="text" id="precio_prod" name="precio_prod" autocomplete="off" disabled>
    </div>
    <div class="form-group">
      <span>Elaboro:</span>
      <input type="text" id="elab_mov" name="elab_mov" autocomplete="off" value="<?php echo $_SESSION['nombre'] . " " . $_SESSION['appaterno'] . " " . $_SESSION['apmaterno']; ?>" disabled>
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
        <th>Código</th>
        <th>Descripción</th>
        <th>Cantidad</th>
        <th>Precio</th>
        <th>Sub Total</th>
        <th>Acciones</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>0050</td>
        <td>56546321</td>
        <td>Producto de prueba 1</td>
        <td>10</td>
        <td>120.00</td>
        <td>1200.00</td>
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
        <input type="button" id="botonNuevo" onclick="limpiarFormularioMovimientos(); cambiarTextoBoton();" value="Nuevo">
      </div>
      <div class="buttons">
        <input type="submit" id="botonGuardarActualizar" value="<?php echo isset($nom_mov) ? 'Actualizar' : 'Guardar movimiento'; ?>"></input>
      </div>
    </div>
    <div class="form-group">
      <span>Total:</span>
      <input type="text" id="total_mov" name="total_mov" autocomplete="off" value="1200.00" style="font-size: 2rem; width: 200px; margin:20px 30px;">
    </div>
  </div>
</div>