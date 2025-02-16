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


$estilos = obtenerEstilos($dbh);

?>

<div class="containerr">
    <button class="boton" onclick="abrirModalEstilo('crear-modalEstilo')">Nuevo</button>
    <label class="buscarlabel" for="buscarboxestilo">Buscar:</label>
    <input class="buscar--box" id="buscarboxestilo" type="search" placeholder="Qué estas buscando?">
</div>

<h3>Lista de estilos</h3>
<table border="1" id="tabla-estilos">
    <thead>
        <tr>
            <th>Estilo</th>
            <th>Descripción</th>
            <th>Acciones</th>
        </tr>
    </thead>
    <tbody>
        <?php foreach ($estilos as $u): ?>
            <tr>
                <td><?php echo htmlspecialchars($u['nomestilo']); ?></td>
                <td><?php echo htmlspecialchars($u['descestilo']); ?></td>
                <td>
                    <button title="Editar" class="editarEstilo fa-solid fa-pen-to-square" data-id="<?php echo $u['idestilo']; ?>"></button>
                    <button title="Eliminar" class="eliminarEstilo fa-solid fa-trash" data-id="<?php echo $u['idestilo']; ?>"></button>
                </td>
            </tr>
        <?php endforeach; ?>
    </tbody>
</table>
<!-- Mensaje no encuentra resultados -->
<p id="mensaje-vacio" style="display: none; color: red;">No se encontraron resultados.</p>

<!-- Modal para crear Estilo -->
<div id="crear-modalEstilo" class="modal" style="display: none;">
    <div class="modal-content" style="height: 269px;">
        <span title="Cerrar" class="close" onclick="cerrarModalEstilo('crear-modalEstilo')">&times;</span>
        <h2 class="tittle">Crear Estilo</h2>
        <form id="form-crearEstilo" onsubmit="validarFormularioEstilo(event, 'crear')">

            <div class="form-group">
                <label for="crear-estilo">Nombre:</label>
                <input type="text" id="crear-estilo" name="estilo" autocomplete="off"
                    pattern="[a-zA-ZÀ-ÿ\s]+"
                    title="Solo se permiten letras y espacios."
                    oninput="this.value = this.value.replace(/[^a-zA-ZÀ-ÿ\s]/g, '')" required>
            </div>

            <div class="form-group">
                <label for="crear-desc_estilo">Descripción:</label>
                <input type="text" id="crear-desc_estilo" name="desc_estilo" autocomplete="off" required>
            </div>
            <button type="submit">Guardar</button>
        </form>
    </div>
</div>

<!-- Modal para editar Estilo -->
<div id="editar-modalEstilo" class="modal" style="display: none;">
    <div class="modal-content" style="height: 269px;">
        <span title="Cerrar" class="close" onclick="cerrarModalEstilo('editar-modalEstilo')">&times;</span>
        <h2 class="tittle">Editar Estilo</h2>
        <form id="form-editarEstilo">
            <input type="hidden" id="editar-idestilo" name="editar-idestilo" value="" />
            <div class="form-group">
                <label for="editar-estilo">Nombre de la Estilo:</label>
                <input type="text" id="editar-estilo" name="estilo" autocomplete="off"
                    pattern="[a-zA-ZÀ-ÿ\s]+"
                    title="Solo se permiten letras y espacios."
                    oninput="this.value = this.value.replace(/[^a-zA-ZÀ-ÿ\s]/g, '')" required>
            </div>
            <div class="form-group">
                <label for="editar-desc_estilo">Descripción:</label>
                <input type="text" id="editar-desc_estilo" name="desc_estilo" autocomplete="off" required>
            </div>
            <button type="submit">Actualizar</button>
        </form>
    </div>
</div>