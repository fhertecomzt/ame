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
  <div class="tittle">Formulario de ajuste de inventario</div>
  <?php include "../mensajeestado.php"; ?>
  <form method="post" action="movimientos.php" id="frmAjusteinvt">
    <div class="form-group">
      <span class="is-required">Tipo de movimiento:</span>
      <select name="select">
        <option value="">[Selecciona un tipo de moviento]</option>
        <option value="value1">AJUSTE POR INVENTARIO</option>
        <option value="value2">AJUSTE POR CORRECCIÓN</option>
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
      <span class="is-required"><i class="fas fa-barcode"></i> Código producto:</span>
      <input type="text" id="codbar_prod" name="codbar_prod" autocomplete="off" placeholder="Escribe o escanea el código del producto" value="" required>
    </div>
    <div class="form-group">
      <span>Descripción:</span>
      <input type="text" id="desc_prod" name="desc_prod" value="" disabled>
    </div>
    <div class="form-group">
      <span class="is-required">Nueva Existencia:</span>
      <!--Limitamos la cantidad a 1000-->
      <input type="number" id="exist_prod" name="cant_prod" autocomplete="off" value="0" max="1000" oninput="if(this.value.length > 4) this.value = this.value.slice(0, 4);" required>
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
        <th>Nueva existencia</th>
        <th>Existencia actual</th>
        <th>Diferencia</th>
        <th>Precio</th>
        <th>Importe</th>
        <th>Acciones</th>
      </tr>
    </thead>
    <tbody>
      <tr class="diferencianegativa">
        <td>00050</td>
        <td>56546321</td>
        <td>Producto de prueba 1</td>
        <td>18</td>
        <td>19</td>
        <td>-1</td>
        <td>19.00</td>
        <td>-19.00</td>
        <td>
          <a href="#" title="Editar"> <i id="btneditar" class="fa-solid fa-pen-to-square"></i></a>
          <a href="#" title="Eliminar"> <i id="btneliminar" class="fa-solid fa-trash"></i></a>
        </td>
      </tr>
      <tr class="diferenciapositiva">
        <td>00050</td>
        <td>56546321</td>
        <td>Producto de prueba 1</td>
        <td>18</td>
        <td>0</td>
        <td>18</td>
        <td>10.00</td>
        <td>180.00</td>
        <td>
          <a href="#" title="Editar"> <i id="btneditar" class="fa-solid fa-pen-to-square"></i></a>
          <a href="#" title="Eliminar"> <i id="btneliminar" class="fa-solid fa-trash"></i></a>
        </td>
      </tr>
      <tr class="sindiferencia">
        <td>00050</td>
        <td>56546321</td>
        <td>Producto de prueba 1</td>
        <td>5</td>
        <td>5</td>
        <td>0</td>
        <td>30.00</td>
        <td>0.00</td>
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
        <input type="submit" id="botonGuardarActualizar" value="<?php echo isset($nom_mov) ? 'Actualizar' : 'Generar ajuste'; ?>"></input>
      </div>
    </div>
    <div class="form-group">
      <span>Total:</span>
      <input type="text" id="total_ajuste" name="total_ajuste" autocomplete="off" value="161.00" style="font-size: 2rem; width: 200px; margin:20px 45px;">
    </div>
  </div>
</div>