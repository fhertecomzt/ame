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


$umedidas = obtenerUmedidas($dbh);

?>

<div class="containerr">
    <button class="boton" onclick="abrirModalUmed('crear-modalUmed')">Nuevo</button>
    <label class="buscarlabel" for="buscarboxumed">Buscar:</label>
    <input class="buscar--box" id="buscarboxumed" type="search" placeholder="Qué estas buscando?">
</div>

<h3>Lista de unidad de medida</h3>
<table border="1" id="tabla-umed">
    <thead>
        <tr>
            <th>U. Medida</th>
            <th>Descripción</th>
            <th>Acciones</th>
        </tr>
    </thead>
    <tbody>
        <?php foreach ($umedidas as $u): ?>
            <tr>
                <td><?php echo htmlspecialchars($u['nomumedida']); ?></td>
                <td><?php echo htmlspecialchars($u['descumedida']); ?></td>
                <td>
                    <button title="Editar" class="editarUmed fa-solid fa-pen-to-square" data-id="<?php echo $u['idumedida']; ?>"></button>
                    <button title="Eliminar" class="eliminarUmed fa-solid fa-trash" data-id="<?php echo $u['idumedida']; ?>"></button>
                </td>
            </tr>
        <?php endforeach; ?>
    </tbody>
</table>
<!-- Mensaje no encuentra resultados -->
<p id="mensaje-vacio" style="display: none; color: red;">No se encontraron resultados.</p>

<!-- Modal para crear U Medida -->
<div id="crear-modalUmed" class="modal" style="display: none;">
    <div class="modal-content" style="height: 269px;">
        <span title="Cerrar" class="close" onclick="cerrarModalUmed('crear-modalUmed')">&times;</span>
        <h2 class="tittle">Crear U. de medida</h2>
        <form id="form-crearUmed" onsubmit="validarFormularioUmed(event, 'crear')">

            <div class="form-group">
                <label for="crear-umed">Nombre:</label>
                <input type="text" id="crear-umed" name="umed" autocomplete="off"
                    pattern="[a-zA-ZÀ-ÿ\s]+"
                    title="Solo se permiten letras y espacios."
                    oninput="this.value = this.value.replace(/[^a-zA-ZÀ-ÿ\s]/g, '')" required>
            </div>

            <div class="form-group">
                <label for="crear-desc_umed">Descripción:</label>
                <input type="text" id="crear-desc_umed" name="desc_umed" autocomplete="off" required>
            </div>
            <button type="submit">Guardar</button>
        </form>
    </div>
</div>

<!-- Modal para editar U Medida -->
<div id="editar-modalUmed" class="modal" style="display: none;">
    <div class="modal-content" style="height: 269px;">
        <span title="Cerrar" class="close" onclick="cerrarModalUmed('editar-modalUmed')">&times;</span>
        <h2 class="tittle">Editar U. Medida</h2>
        <form id="form-editarUmed">
            <input type="hidden" id="editar-idumed" name="editar-idumed" value="" />
            <div class="form-group">
                <label for="editar-umed">Nombre:</label>
                <input type="text" id="editar-umed" name="umed" autocomplete="off"
                    pattern="[a-zA-ZÀ-ÿ\s]+"
                    title="Solo se permiten letras y espacios."
                    oninput="this.value = this.value.replace(/[^a-zA-ZÀ-ÿ\s]/g, '')" required>
            </div>
            <div class="form-group">
                <label for="editar-desc_umed">Descripción:</label>
                <input type="text" id="editar-desc_umed" name="desc_umed" autocomplete="off" required>
            </div>
            <button type="submit">Actualizar</button>
        </form>
    </div>
</div>