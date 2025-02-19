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

$generos = obtenerRegistros($dbh, "generos", "idgenero, nomgenero, descgenero", "ASC", "idgenero");
?>

<div class="containerr">
    <button class="boton" onclick="abrirModalGenero('crear-modalGenero')">Nuevo</button>
    <label class="buscarlabel" for="buscarboxgenero">Buscar:</label>
    <input class="buscar--box" id="buscarboxgenero" type="search" placeholder="Qué estas buscando?">
</div>

<h3>Lista de géneros</h3>
<table border="1" id="tabla-generos">
    <thead>
        <tr>
            <th>Género</th>
            <th>Descripción</th>
            <th>Acciones</th>
        </tr>
    </thead>
    <tbody>
        <?php foreach ($generos as $u): ?>
            <tr>
                <td><?php echo htmlspecialchars($u['nomgenero']); ?></td>
                <td><?php echo htmlspecialchars($u['descgenero']); ?></td>
                <td>
                    <button title="Editar" class="editarGenero fa-solid fa-pen-to-square" data-id="<?php echo $u['idgenero']; ?>"></button>
                    <button title="Eliminar" class="eliminarGenero fa-solid fa-trash" data-id="<?php echo $u['idgenero']; ?>"></button>
                </td>
            </tr>
        <?php endforeach; ?>
    </tbody>
</table>
<!-- Mensaje no encuentra resultados -->
<p id="mensaje-vacio" style="display: none; color: red;">No se encontraron resultados.</p>

<!-- Modal para crear Genero -->
<div id="crear-modalGenero" class="modal" style="display: none;">
    <div class="modal-content" style="height: 269px;">
        <span title="Cerrar" class="close" onclick="cerrarModalGenero('crear-modalGenero')">&times;</span>
        <h2 class="tittle">Crear Genero</h2>
        <form id="form-crearGenero" onsubmit="validarFormularioGenero(event, 'crear')">

            <div class="form-group">
                <label for="crear-genero">Nombre:</label>
                <input type="text" id="crear-genero" name="genero" autocomplete="off"
                    pattern="[a-zA-ZÀ-ÿ\s]+"
                    title="Solo se permiten letras y espacios."
                    oninput="this.value = this.value.replace(/[^a-zA-ZÀ-ÿ\s]/g, '')" required>
            </div>

            <div class="form-group">
                <label for="crear-desc_genero">Descripción:</label>
                <input type="text" id="crear-desc_genero" name="desc_genero" autocomplete="off" required>
            </div>
            <button type="submit">Guardar</button>
        </form>
    </div>
</div>

<!-- Modal para editar Genero -->
<div id="editar-modalGenero" class="modal" style="display: none;">
    <div class="modal-content" style="height: 269px;">
        <span title="Cerrar" class="close" onclick="cerrarModalGenero('editar-modalGenero')">&times;</span>
        <h2 class="tittle">Editar Genero</h2>
        <form id="form-editarGenero">
            <input type="hidden" id="editar-idgenero" name="editar-idgenero" value="" />
            <div class="form-group">
                <label for="editar-genero">Nombre de la Genero:</label>
                <input type="text" id="editar-genero" name="genero" autocomplete="off"
                    pattern="[a-zA-ZÀ-ÿ\s]+"
                    title="Solo se permiten letras y espacios."
                    oninput="this.value = this.value.replace(/[^a-zA-ZÀ-ÿ\s]/g, '')" required>
            </div>
            <div class="form-group">
                <label for="editar-desc_genero">Descripción:</label>
                <input type="text" id="editar-desc_genero" name="desc_genero" autocomplete="off" required>
            </div>
            <button type="submit">Actualizar</button>
        </form>
    </div>
</div>