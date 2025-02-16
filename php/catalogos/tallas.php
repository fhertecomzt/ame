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


$tallas = obtenerTallas($dbh);

?>

<div class="containerr">
    <button class="boton" onclick="abrirModalTalla('crear-modalTalla')">Nuevo</button>
    <label class="buscarlabel" for="buscarboxtalla">Buscar:</label>
    <input class="buscar--box" id="buscarboxtalla" type="search" placeholder="Qué estas buscando?">
</div>

<h3>Lista de tallas</h3>
<table border="1" id="tabla-tallas">
    <thead>
        <tr>
            <th>Talla</th>
            <th>Descripción</th>
            <th>Acciones</th>
        </tr>
    </thead>
    <tbody>
        <?php foreach ($tallas as $u): ?>
            <tr>
                <td><?php echo htmlspecialchars($u['nomtalla']); ?></td>
                <td><?php echo htmlspecialchars($u['desctalla']); ?></td>
                <td>
                    <button title="Editar" class="editarTalla fa-solid fa-pen-to-square" data-id="<?php echo $u['idtalla']; ?>"></button>
                    <button title="Eliminar" class="eliminarTalla fa-solid fa-trash" data-id="<?php echo $u['idtalla']; ?>"></button>
                </td>
            </tr>
        <?php endforeach; ?>
    </tbody>
</table>
<!-- Mensaje no encuentra resultados -->
<p id="mensaje-vacio" style="display: none; color: red;">No se encontraron resultados.</p>

<!-- Modal para crear Talla -->
<div id="crear-modalTalla" class="modal" style="display: none;">
    <div class="modal-content" style="height: 269px;">
        <span title="Cerrar" class="close" onclick="cerrarModalTalla('crear-modalTalla')">&times;</span>
        <h2 class="tittle">Crear Talla</h2>
        <form id="form-crearTalla" onsubmit="validarFormularioTalla(event, 'crear')">

            <div class="form-group">
                <label for="crear-talla">Nombre:</label>
                <input type="text" id="crear-talla" name="talla" autocomplete="off"
                    pattern="[a-zA-ZÀ-ÿ\s]+"
                    title="Solo se permiten letras y espacios."
                    oninput="this.value = this.value.replace(/[^a-zA-ZÀ-ÿ\s]/g, '')" required>
            </div>

            <div class="form-group">
                <label for="crear-desc_talla">Descripción:</label>
                <input type="text" id="crear-desc_talla" name="desc_talla" autocomplete="off" required>
            </div>
            <button type="submit">Guardar</button>
        </form>
    </div>
</div>

<!-- Modal para editar Talla -->
<div id="editar-modalTalla" class="modal" style="display: none;">
    <div class="modal-content" style="height: 269px;">
        <span title="Cerrar" class="close" onclick="cerrarModalTalla('editar-modalTalla')">&times;</span>
        <h2 class="tittle">Editar Talla</h2>
        <form id="form-editarTalla">
            <input type="hidden" id="editar-idtalla" name="editar-idtalla" value="" />
            <div class="form-group">
                <label for="editar-talla">Nombre de la Talla:</label>
                <input type="text" id="editar-talla" name="talla" autocomplete="off"
                    pattern="[a-zA-ZÀ-ÿ\s]+"
                    title="Solo se permiten letras y espacios."
                    oninput="this.value = this.value.replace(/[^a-zA-ZÀ-ÿ\s]/g, '')" required>
            </div>
            <div class="form-group">
                <label for="editar-desc_talla">Descripción:</label>
                <input type="text" id="editar-desc_talla" name="desc_talla" autocomplete="off" required>
            </div>
            <button type="submit">Actualizar</button>
        </form>
    </div>
</div>