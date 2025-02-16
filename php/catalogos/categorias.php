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


$categorias = obtenerCategorias($dbh);

?>

<div class="containerr">
    <button class="boton" onclick="abrirModalCat('crear-modalCat')">Nuevo</button>
    <label class="buscarlabel" for="buscarboxcat">Buscar:</label>
    <input class="buscar--box" id="buscarboxcat" type="search" placeholder="Qué estas buscando?">
</div>

<h3>Lista de categorías</h3>
<table border="1" id="tabla-categorias">
    <thead>
        <tr>
            <th>Categoría</th>
            <th>Descripción</th>
            <th>Acciones</th>
        </tr>
    </thead>
    <tbody>
        <?php foreach ($categorias as $u): ?>
            <tr>
                <td><?php echo htmlspecialchars($u['nomcategoria']); ?></td>
                <td><?php echo htmlspecialchars($u['desccategoria']); ?></td>
                <td>
                    <button title="Editar" class="editarCat fa-solid fa-pen-to-square" data-id="<?php echo $u['idcategoria']; ?>"></button>
                    <button title="Eliminar" class="eliminarCat fa-solid fa-trash" data-id="<?php echo $u['idcategoria']; ?>"></button>
                </td>
            </tr>
        <?php endforeach; ?>
    </tbody>
</table>
<!-- Mensaje no encuentra resultados -->
<p id="mensaje-vacio" style="display: none; color: red;">No se encontraron resultados.</p>

<!-- Modal para crear Categoria -->
<div id="crear-modalCat" class="modal" style="display: none;">
    <div class="modal-content" style="height: 269px;">
        <span title="Cerrar" class="close" onclick="cerrarModalCat('crear-modalCat')">&times;</span>
        <h2 class="tittle">Crear Categoría</h2>
        <form id="form-crearCat" onsubmit="validarFormularioCat(event, 'crear')">

            <div class="form-group">
                <label for="crear-cat">Nombre:</label>
                <input type="text" id="crear-cat" name="cat" autocomplete="off"
                    pattern="[a-zA-ZÀ-ÿ\s]+"
                    title="Solo se permiten letras y espacios."
                    oninput="this.value = this.value.replace(/[^a-zA-ZÀ-ÿ\s]/g, '')" required>
            </div>

            <div class="form-group">
                <label for="crear-desc_cat">Descripción:</label>
                <input type="text" id="crear-desc_cat" name="desc_cat" autocomplete="off" required>
            </div>
            <button type="submit">Guardar</button>
        </form>
    </div>
</div>

<!-- Modal para editar Cat -->
<div id="editar-modalCat" class="modal" style="display: none;">
    <div class="modal-content" style="height: 269px;">
        <span title="Cerrar" class="close" onclick="cerrarModalCat('editar-modalCat')">&times;</span>
        <h2 class="tittle">Editar Categoría</h2>
        <form id="form-editarCat">
            <input type="hidden" id="editar-idcat" name="editar-idcat" value="" />
            <div class="form-group">
                <label for="editar-cat">Nombre:</label>
                <input type="text" id="editar-cat" name="cat" autocomplete="off"
                    pattern="[a-zA-ZÀ-ÿ\s]+"
                    title="Solo se permiten letras y espacios."
                    oninput="this.value = this.value.replace(/[^a-zA-ZÀ-ÿ\s]/g, '')" required>
            </div>
            <div class="form-group">
                <label for="editar-desc_cat">Descripción:</label>
                <input type="text" id="editar-desc_cat" name="desc_cat" autocomplete="off" required>
            </div>
            <button type="submit">Actualizar</button>
        </form>
    </div>
</div>