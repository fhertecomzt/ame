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


$marcas = obtenerMarcas($dbh);

?>

<div class="containerr">
    <button class="boton" onclick="abrirModalMarca('crear-modalMarca')">Nuevo</button>
    <label class="buscarlabel" for="buscarboxmarca">Buscar:</label>
    <input class="buscar--box" id="buscarboxmarca" type="search" placeholder="Qué estas buscando?">
</div>

<h3>Lista de marcas</h3>
<table border="1" id="tabla-marcas">
    <thead>
        <tr>
            <th>Marca</th>
            <th>Descripción</th>
            <th>Acciones</th>
        </tr>
    </thead>
    <tbody>
        <?php foreach ($marcas as $u): ?>
            <tr>
                <td><?php echo htmlspecialchars($u['nommarca']); ?></td>
                <td><?php echo htmlspecialchars($u['descmarca']); ?></td>
                <td>
                    <button title="Editar" class="editarMarca fa-solid fa-pen-to-square" data-id="<?php echo $u['idmarca']; ?>"></button>
                    <button title="Eliminar" class="eliminarMarca fa-solid fa-trash" data-id="<?php echo $u['idmarca']; ?>"></button>
                </td>
            </tr>
        <?php endforeach; ?>
    </tbody>
</table>
<!-- Mensaje no encuentra resultados -->
<p id="mensaje-vacio" style="display: none; color: red;">No se encontraron resultados.</p>

<!-- Modal para crear Marca -->
<div id="crear-modalMarca" class="modal" style="display: none;">
    <div class="modal-content" style="height: 269px;">
        <span title="Cerrar" class="close" onclick="cerrarModalMarca('crear-modalMarca')">&times;</span>
        <h2 class="tittle">Crear Marca</h2>
        <form id="form-crearMarca" onsubmit="validarFormularioMarca(event, 'crear')">

            <div class="form-group">
                <label for="crear-marca">Nombre:</label>
                <input type="text" id="crear-marca" name="marca" autocomplete="off"
                    pattern="[a-zA-ZÀ-ÿ\s]+"
                    title="Solo se permiten letras y espacios."
                    oninput="this.value = this.value.replace(/[^a-zA-ZÀ-ÿ\s]/g, '')" required>
            </div>

            <div class="form-group">
                <label for="crear-desc_marca">Descripción:</label>
                <input type="text" id="crear-desc_marca" name="desc_marca" autocomplete="off" required>
            </div>
            <button type="submit">Guardar</button>
        </form>
    </div>
</div>

<!-- Modal para editar Marca -->
<div id="editar-modalMarca" class="modal" style="display: none;">
    <div class="modal-content" style="height: 269px;">
        <span title="Cerrar" class="close" onclick="cerrarModalMarca('editar-modalMarca')">&times;</span>
        <h2 class="tittle">Editar Marca</h2>
        <form id="form-editarMarca">
            <input type="hidden" id="editar-idmarca" name="editar-idmarca" value="" />
            <div class="form-group">
                <label for="editar-marca">Nombre de la Marca:</label>
                <input type="text" id="editar-marca" name="marca" autocomplete="off"
                    pattern="[a-zA-ZÀ-ÿ\s]+"
                    title="Solo se permiten letras y espacios."
                    oninput="this.value = this.value.replace(/[^a-zA-ZÀ-ÿ\s]/g, '')" required>
            </div>
            <div class="form-group">
                <label for="editar-desc_marca">Descripción:</label>
                <input type="text" id="editar-desc_marca" name="desc_marca" autocomplete="off" required>
            </div>
            <button type="submit">Actualizar</button>
        </form>
    </div>
</div>