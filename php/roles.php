<?php
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

$roles_permitidos = ["SISTEMAS", "GERENCIA"];
//Includes
include "verificar_sesion.php";
include "conexion.php";
include "funciones/funciones.php";


$roles = obtenerRoles($dbh);

?>

<div class="containerr">
    <button class="boton" onclick="abrirModalRol('crear-modalRol')">Nuevo</button>
    <label class="buscarlabel" for="buscarboxrol">Buscar:</label>
    <input class="buscar--box" id="buscarboxrol" type="search" placeholder="Qué estas buscando?">
    <!--Boton limpiar input de busqueda 
    <button title="Limpiar buscar" class="fa-solid" id="limpiar-busquedaRol" type="button" style="display: none;">X</button>-->
</div>

<h3>Lista de Roles</h3>
<table border="1" id="tabla-roles">
    <thead>
        <tr>
            <th>Rol</th>
            <th>Descripción</th>
            <th>Acciones</th>
        </tr>
    </thead>
    <tbody>
        <?php foreach ($roles as $u): ?>
            <tr>
                <td><?php echo htmlspecialchars($u['nomrol']); ?></td>
                <td><?php echo htmlspecialchars($u['descrol']); ?></td>
                <td>
                    <button title="Editar" class="editarRol fa-solid fa-pen-to-square" data-id="<?php echo $u['idrol']; ?>"></button>
                    <button title="Eliminar" class="eliminarRol fa-solid fa-trash" data-id="<?php echo $u['idrol']; ?>"></button>
                </td>
            </tr>
        <?php endforeach; ?>
    </tbody>
</table>
<!-- Mensaje no encuentra resultados -->
<p id="mensaje-vacio" style="display: none; color: red;">No se encontraron resultados.</p>

<!-- Modal para crear Rol -->
<div id="crear-modalRol" class="modal" style="display: none;">
    <div class="modal-content" style="height: 269px;">
        <span title="Cerrar" class="close" onclick="cerrarModalRol('crear-modalRol')">&times;</span>
        <h2 class="tittle">Crear Rol</h2>
        <form id="form-crearRol" onsubmit="procesarFormularioRol(event, 'crear')">

            <div class="form-group">
                <label for="crear-rol">Nombre del Rol:</label>
                <input type="text" id="crear-rol" name="rol" autocomplete="off" required>
            </div>

            <div class="form-group">
                <label for="crear-desc_rol">Descripción:</label>
                <input type="text" id="crear-desc_rol" name="desc_rol" autocomplete="off" required>
            </div>
            <button type="submit">Guardar</button>
        </form>
    </div>
</div>

<!-- Modal para editar Rol -->
<div id="editar-modalRol" class="modal" style="display: none;">
    <div class="modal-content" style="height: 269px;">
        <span title="Cerrar" class="close" onclick="cerrarModalRol('editar-modalRol')">&times;</span>
        <h2 class="tittle">Editar Rol</h2>
        <form id="form-editarRol">
            <input type="hidden" id="editar-idrol" name="editar-idrol" value="" />
            <div class="form-group">
                <label for="editar-rol">Nombre del Rol:</label>
                <input type="text" id="editar-rol" name="rol" autocomplete="off" required>
            </div>
            <div class="form-group">
                <label for="editar_desc_rol">Descripción:</label>
                <input type="text" id="editar_desc_rol" name="desc_rol" autocomplete="off" required>
            </div>
            <button type="submit">Actualizar</button>
        </form>
    </div>
</div>