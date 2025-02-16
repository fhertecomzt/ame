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


$colores = obtenerColores($dbh);

?>

<div class="containerr">
    <button class="boton" onclick="abrirModalColor('crear-modalColor')">Nuevo</button>
    <label class="buscarlabel" for="buscarboxcolor">Buscar:</label>
    <input class="buscar--box" id="buscarboxcolor" type="search" placeholder="Qué estas buscando?">
</div>

<h3>Lista de colores</h3>
<table border="1" id="tabla-colores">
    <thead>
        <tr>
            <th>Color</th>
            <th>Descripción</th>
            <th>Acciones</th>
        </tr>
    </thead>
    <tbody>
        <?php foreach ($colores as $u): ?>
            <tr>
                <td><?php echo htmlspecialchars($u['nomcolor']); ?></td>
                <td><?php echo htmlspecialchars($u['desccolor']); ?></td>
                <td>
                    <button title="Editar" class="editarColor fa-solid fa-pen-to-square" data-id="<?php echo $u['idcolor']; ?>"></button>
                    <button title="Eliminar" class="eliminarColor fa-solid fa-trash" data-id="<?php echo $u['idcolor']; ?>"></button>
                </td>
            </tr>
        <?php endforeach; ?>
    </tbody>
</table>
<!-- Mensaje no encuentra resultados -->
<p id="mensaje-vacio" style="display: none; color: red;">No se encontraron resultados.</p>

<!-- Modal para crear Color -->
<div id="crear-modalColor" class="modal" style="display: none;">
    <div class="modal-content" style="height: 269px;">
        <span title="Cerrar" class="close" onclick="cerrarModalColor('crear-modalColor')">&times;</span>
        <h2 class="tittle">Crear Color</h2>
        <form id="form-crearColor" onsubmit="validarFormularioColor(event, 'crear')">

            <div class="form-group">
                <label for="crear-color">Nombre:</label>
                <input type="text" id="crear-color" name="color" autocomplete="off"
                    pattern="[a-zA-ZÀ-ÿ\s]+"
                    title="Solo se permiten letras y espacios."
                    oninput="this.value = this.value.replace(/[^a-zA-ZÀ-ÿ\s]/g, '')" required>
            </div>

            <div class="form-group">
                <label for="crear-desc_color">Descripción:</label>
                <input type="text" id="crear-desc_color" name="desc_color" autocomplete="off" required>
            </div>
            <button type="submit">Guardar</button>
        </form>
    </div>
</div>

<!-- Modal para editar Color -->
<div id="editar-modalColor" class="modal" style="display: none;">
    <div class="modal-content" style="height: 269px;">
        <span title="Cerrar" class="close" onclick="cerrarModalColor('editar-modalColor')">&times;</span>
        <h2 class="tittle">Editar Color</h2>
        <form id="form-editarColor">
            <input type="hidden" id="editar-idcolor" name="editar-idcolor" value="" />
            <div class="form-group">
                <label for="editar-color">Nombre de la Color:</label>
                <input type="text" id="editar-color" name="color" autocomplete="off"
                    pattern="[a-zA-ZÀ-ÿ\s]+"
                    title="Solo se permiten letras y espacios."
                    oninput="this.value = this.value.replace(/[^a-zA-ZÀ-ÿ\s]/g, '')" required>
            </div>
            <div class="form-group">
                <label for="editar-desc_color">Descripción:</label>
                <input type="text" id="editar-desc_color" name="desc_color" autocomplete="off" required>
            </div>
            <button type="submit">Actualizar</button>
        </form>
    </div>
</div>