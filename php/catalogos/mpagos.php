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


$mpagos = obtenerMpagos($dbh);

?>

<div class="containerr">
    <button class="boton" onclick="abrirModalMpago('crear-modalMpago')">Nuevo</button>
    <label class="buscarlabel" for="buscarboxmpago">Buscar:</label>
    <input class="buscar--box" id="buscarboxmpago" type="search" placeholder="Qué estas buscando?">
</div>

<h3>Lista de Métodos de pago</h3>
<table border="1" id="tabla-mpagos">
    <thead>
        <tr>
            <th>M. Pago</th>
            <th>Descripción</th>
            <th>Acciones</th>
        </tr>
    </thead>
    <tbody>
        <?php foreach ($mpagos as $u): ?>
            <tr>
                <td><?php echo htmlspecialchars($u['nommpago']); ?></td>
                <td><?php echo htmlspecialchars($u['descmpago']); ?></td>
                <td>
                    <button title="Editar" class="editarMpago fa-solid fa-pen-to-square" data-id="<?php echo $u['idmpago']; ?>"></button>
                    <button title="Eliminar" class="eliminarMpago fa-solid fa-trash" data-id="<?php echo $u['idmpago']; ?>"></button>
                </td>
            </tr>
        <?php endforeach; ?>
    </tbody>
</table>
<!-- Mensaje no encuentra resultados -->
<p id="mensaje-vacio" style="display: none; color: red;">No se encontraron resultados.</p>

<!-- Modal para crear Mpago -->
<div id="crear-modalMpago" class="modal" style="display: none;">
    <div class="modal-content" style="height: 269px;">
        <span title="Cerrar" class="close" onclick="cerrarModalMpago('crear-modalMpago')">&times;</span>
        <h2 class="tittle">Crear Método de pago</h2>
        <form id="form-crearMpago" onsubmit="validarFormularioMpago(event, 'crear')">

            <div class="form-group">
                <label for="crear-mpago">Nombre:</label>
                <input type="text" id="crear-mpago" name="mpago" autocomplete="off"
                    pattern="[a-zA-ZÀ-ÿ\s]+"
                    title="Solo se permiten letras y espacios."
                    oninput="this.value = this.value.replace(/[^a-zA-ZÀ-ÿ\s]/g, '')" required>
            </div>

            <div class="form-group">
                <label for="crear-desc_mpago">Descripción:</label>
                <input type="text" id="crear-desc_mpago" name="desc_mpago" autocomplete="off" required>
            </div>
            <button type="submit">Guardar</button>
        </form>
    </div>
</div>

<!-- Modal para editar Mpago -->
<div id="editar-modalMpago" class="modal" style="display: none;">
    <div class="modal-content" style="height: 269px;">
        <span title="Cerrar" class="close" onclick="cerrarModalMpago('editar-modalMpago')">&times;</span>
        <h2 class="tittle">Editar Mpago</h2>
        <form id="form-editarMpago">
            <input type="hidden" id="editar-idmpago" name="editar-idmpago" value="" />
            <div class="form-group">
                <label for="editar-mpago">Nombre de la Mpago:</label>
                <input type="text" id="editar-mpago" name="mpago" autocomplete="off"
                    pattern="[a-zA-ZÀ-ÿ\s]+"
                    title="Solo se permiten letras y espacios."
                    oninput="this.value = this.value.replace(/[^a-zA-ZÀ-ÿ\s]/g, '')" required>
            </div>
            <div class="form-group">
                <label for="editar-desc_mpago">Descripción:</label>
                <input type="text" id="editar-desc_mpago" name="desc_mpago" autocomplete="off" required>
            </div>
            <button type="submit">Actualizar</button>
        </form>
    </div>
</div>