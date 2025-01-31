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
  <div class="tittle">Lista de créditos de Proveedores demo</div>
  <?php include "../mensajeestado.php"; ?>
  <form method="post" action="abonoproveedores.php" id="frmAbonosProveedor">
    <div class="form-group">
      <span>Fecha actual:</span>
      <?php $fcha = date("Y-m-d"); ?>
      <input type="date" class="form-control" value="<?php echo $fcha; ?>" disabled>
    </div>
    <div class="form-group">
      <span class="is-required"><i class="fa solid fa-magnifying-glass"></i>Buscar:</span>
      <input type="text" id="codbar_prod" name="codbar_prod" autocomplete="off" placeholder="Escribe el nombre o télefono del proveedor" value="" required>
    </div>
  </form>

  <table border="1">
    <thead>
      <tr>
        <th>ID</th>
        <th>Proveedor</th>
        <th>Télefono</th>
        <th>Celular</th>
        <th>Deuda</th>
        <th>Acciones</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>1</td>
        <td>proveedor1</td>
        <td>232323232</td>
        <td>2323232</td>
        <td>1,200.00</td>
        <td>
          <a href="#" title="Abonar"> <i id="btneditar" class="fa-solid fa-money-bill"></i></a>
        </td>
      </tr>
      <tr>
        <td>2</td>
        <td>Proveedor 2 </td>
        <td>445454522</td>
        <td>5555556667</td>
        <td>5,200.00</td>
        <td>
          <a href="#" title="Abonar"> <i id="btneditar" class="fa-solid fa-money-bill"></i></a>
        </td>
      </tr>
    </tbody>
  </table>

  <div class="form-total">
    <div class="button-container">
      <div class="buttons">
        <input type="button" id="botonNuevo" onclick="limpiarFormularioAbonosProveedor(); cambiarTextoBoton();" value="Nuevo">
      </div>
      <div class="buttons">
        <input type="submit" id="botonGuardarActualizar" value="<?php echo isset($nom_mov) ? 'Actualizar' : 'Abonar'; ?>"></input>
      </div>
    </div>
    <div class="form-group">
      <span>Total:</span>
      <input type="text" id="total_mov" name="total_mov" autocomplete="off" value="6,400.00" style="font-size: 2rem; width: 200px; margin:20px 30px;">
    </div>
  </div>
</div>