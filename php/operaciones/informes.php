<?php
session_start();
//Restricción por rol
if (!isset($_SESSION['idusuario']) || ($_SESSION["rol"] !== "SISTEMAS" && $_SESSION["rol"] !== "GERENCIA")) {
  header("Location: ../../logout.php");
  exit;
}

include "../conexion.php";
?>

<div class="container">
  <div class="tittle">Informes demo</div>
  <?php include "../mensajeestado.php"; ?>
  <form method="post" action="informes.php" id="frmInformes">
    <div class="form-group">
      <span class="is-required">Tipo de informe:</span>
      <select name="select">
        <option value="">[Selecciona un tipo de informe]</option>
        <option value="value1">Informe Productos</option>
        <option value="value2">Informe Existencias</option>
        <option value="value3">Informe Lista de precios</option>
        <option value="value3">Informe Ventas</option>
        <option value="value3">Informe Compras</option>
        <option value="value3">Informe Clientes</option>
        <option value="value3">Informe Movimientos</option>
        <option value="value3">Informe Ajustes</option>
        <option value="value3">Informe Cortes</option>
      </select>
    </div>
    <div class="form-group">
      <span class="is-required">Fecha inicial:</span>
      <?php $fcha = date("Y-m-d"); ?>
      <input type="date" class="form-control" value="<?php echo $fcha; ?>">
    </div>
    <div class="form-group">
      <span class="is-required">Fecha final:</span>
      <?php $fcha = date("Y-m-d"); ?>
      <input type="date" class="form-control" value="<?php echo $fcha; ?>">
    </div>
    <div class="form-group">
      <span class="is-required">Tienda de Origen:</span>
      <select name="select">
        <option value="">[Selecciona una tienda]</option>
        <option value="value1">Tienda 1</option>
        <option value="value2">Tienda 2</option>
        <option value="value3">Teinda 3</option>
      </select>
    </div>
    <div class="form-group">
      <span>Elaboro:</span>
      <input type="text" id="elab_inf" name="elab_inf" autocomplete="off" value="<?php echo $_SESSION['nombre'] . " " . $_SESSION['appaterno'] . " " . $_SESSION['apmaterno']; ?>" disabled>
    </div>
    <div class="form-group">
      <span>Observaciones:</span>
      <input type="text" id="obs_inf" name="obs_inf" autocomplete="off" value="">
    </div>
  </form>

  <table border="1">
    <thead>
      <tr>
        <th>ID</th>
        <th>Fecha</th>
        <th>Observación</th>
        <th>Tienda</th>
        <th>Acciones</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>6546</td>
        <td>20/11/2024</td>
        <td>Informe de ventas</td>
        <td>Mexico 15</td>
        <td>
          <a href="#" title="EnviarPdf"> <i id="btneenviarpdf" style="color: red;" class="fa-regular fa-file-pdf"></i></a>
        </td>
      </tr>
      <tr>
        <td>6536</td>
        <td>20/11/2024</td>
        <td>Informe de traspasos</td>
        <td>Mexico 15</td>
        <td>
          <a href="#" title="EnviarPdf"> <i id="btneenviarpdf" style="color: red;" class="fa-regular fa-file-pdf"></i></a>
        </td>
      </tr>
      <tr>
        <td>6566</td>
        <td>20/11/2024</td>
        <td>Informe de compras</td>
        <td>Mexico 15</td>
        <td>
          <a href="#" title="EnviarPdf"> <i id="btneenviarpdf" style="color: red;" class="fa-regular fa-file-pdf"></i></a>
        </td>
      </tr>
    </tbody>
  </table>

  <div class="form-total">
    <div class="button-container">
      <div class="buttons">
        <input type="button" id="botonNuevo" onclick="limpiarFormularioInformes(); cambiarTextoBoton();" value="Nuevo">
      </div>
      <div class="buttons">
        <input type="submit" id="botonGuardarActualizar" value="<?php echo isset($nom_mov) ? 'Actualizar' : 'Generar informe'; ?>"></input>
      </div>
    </div>
  </div>
</div>