<?php
session_start();
//Restricción por rol
if (!isset($_SESSION['idusuario']) || ($_SESSION["rol"] !== "SISTEMAS" && $_SESSION["rol"] !== "GERENCIA")) {
    header("Location: ../../index.php");
    exit;
}

//Includes
include "../conexion.php";
include "../funciones/funciones.php";


$impuestos = obtenerImpuestos($dbh);

?>

<div class="containerr">
    <button class="boton" onclick="abrirModalImpuesto('crear-modalImpuesto')">Nuevo</button>
    <label class="buscarlabel" for="buscarboximpuesto">Buscar:</label>
    <input class="buscar--box" id="buscarboximpuesto" type="search" placeholder="Qué estas buscando?">
</div>

<h3>Lista de impuestos</h3>
<table border="1" id="tabla-impuestos">
    <thead>
        <tr>
            <th>Impuesto</th>
            <th>Tasa</th>
            <th>Acciones</th>
        </tr>
    </thead>
    <tbody>
        <?php foreach ($impuestos as $u): ?>
            <tr>
                <td><?php echo htmlspecialchars($u['nomimpuesto']); ?></td>
                <td><?php echo htmlspecialchars($u['tasa']); ?></td>
                <td>
                    <button title="Editar" class="editarImpuesto fa-solid fa-pen-to-square" data-id="<?php echo $u['idimpuesto']; ?>"></button>
                    <button title="Eliminar" class="eliminarImpuesto fa-solid fa-trash" data-id="<?php echo $u['idimpuesto']; ?>"></button>
                </td>
            </tr>
        <?php endforeach; ?>
    </tbody>
</table>
<!-- Mensaje no encuentra resultados -->
<p id="mensaje-vacio" style="display: none; color: red;">No se encontraron resultados.</p>

<!-- Modal para crear Impuesto -->
<div id="crear-modalImpuesto" class="modal" style="display: none;">
    <div class="modal-content" style="height: 269px;">
        <span title="Cerrar" class="close" onclick="cerrarModalImpuesto('crear-modalImpuesto')">&times;</span>
        <h2 class="tittle">Crear Impuesto</h2>
        <form id="form-crearImpuesto" onsubmit="validarFormularioImpuesto(event, 'crear')">

            <div class="form-group">
                <label for="crear-impuesto">Nombre:</label>
                <input type="text" id="crear-impuesto" name="impuesto" autocomplete="off" required>
            </div>

            <div class="form-group">
                <label for="crear-tasa">Tasa:</label>
                <input type="number" id="crear-tasa" name="tasa" min="0" autocomplete="off" required>
            </div>
            <button type="submit">Guardar</button>
        </form>
    </div>
</div>

<!-- Modal para editar Impuesto -->
<div id="editar-modalImpuesto" class="modal" style="display: none;">
    <div class="modal-content" style="height: 269px;">
        <span title="Cerrar" class="close" onclick="cerrarModalImpuesto('editar-modalImpuesto')">&times;</span>
        <h2 class="tittle">Editar Impuesto</h2>
        <form id="form-editarImpuesto">
            <input type="hidden" id="editar-idimpuesto" name="editar-idimpuesto" value="" />
            <div class="form-group">
                <label for="editar-impuesto">Nombre:</label>
                <input type="text" id="editar-impuesto" name="impuesto" autocomplete="off" required>
            </div>
            <div class="form-group">
                <label for="editar-tasa">Tasa:</label>
                <input type="text" id="editar-tasa" name="tasa" autocomplete="off" required>
            </div>
            <button type="submit">Actualizar</button>
        </form>
    </div>
</div>