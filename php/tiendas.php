<?php
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

$roles_permitidos = ["SISTEMAS", "GERENCIA"];

//Includes
include "verificar_sesion.php";
include "conexion.php";
include "funciones/funciones.php";


$tiendas = obtenerRegistros($dbh, "tiendas", "idtienda, nomtienda, reptienda, rfctienda, emailtienda, teltienda", "ASC", "idtienda");
?>

<div class="containerr">
    <button class="boton" onclick="abrirModal('crear-modal')">Nuevo</button>
    <label class="buscarlabel" for="buscarbox">Buscar:</label>
    <input class="buscar--box" id="buscarbox" type="search" placeholder="Qué estas buscando?">
</div>


<h3>Lista de tiendas</h3>
<table border=" 1" id="tabla-tiendas">
    <thead>
        <tr>
            <th>Nombre</th>
            <th>Representante</th>
            <th>R.F.C.</th>
            <th>Email</th>
            <th>Teléfono</th>
            <th>Acciones</th>
        </tr>
    </thead>
    <tbody>
        <?php foreach ($tiendas as $tienda) : ?>
            <tr>
                <td><?php echo $tienda['nomtienda']; ?></td>
                <td><?php echo $tienda['reptienda']; ?></td>
                <td><?php echo $tienda['rfctienda']; ?></td>
                <td><?php echo $tienda['emailtienda']; ?></td>
                <td><?php echo $tienda['teltienda']; ?></td>
                <td>
                    <button title="Editar" class="editar fa-solid fa-pen-to-square" data-id="<?php echo $tienda['idtienda']; ?>"></button>
                    <button title="Eliminar" class="eliminar fa-solid fa-trash" data-id="<?php echo $tienda['idtienda']; ?>"></button>
                </td>

            </tr>
        <?php endforeach; ?>
    </tbody>
</table>
<!-- Mensaje no encuentra resultados -->
<p id="mensaje-vacio" style="display: none; color: red;">No se encontraron resultados.</p>

<!-- Modal para crear tienda -->
<div id="crear-modal" class="modal" style="display: none;">
    <div class="modal-content">
        <span title="Cerrar" class="close" onclick="cerrarModal('crear-modal')">&times;</span>
        <h2 class="tittle">Crear Tienda</h2>
        <form id="form-crear" onsubmit="validarFormularioTienda(event)">
            <div class="form-group">
                <label for="crear-nombre">Nombre:</label>
                <input type="text" id="crear-nombre" name="nombre" autocomplete="off"
                    pattern="[a-zA-ZÀ-ÿ\s]+"
                    title="Solo se permiten letras y espacios."
                    oninput="this.value = this.value.replace(/[^a-zA-ZÀ-ÿ\s]/g, '')" required>
            </div>
            <div class="form-group">
                <label for="crear-representante">Representante:</label>
                <input type="text" id="crear-representante" name="representante" autocomplete="off"
                    pattern="[a-zA-ZÀ-ÿ\s]+"
                    title="Solo se permiten letras y espacios."
                    oninput="this.value = this.value.replace(/[^a-zA-ZÀ-ÿ\s]/g, '')" required>
            </div>
            <div class="form-group">
                <label for="crear-rfc">R.F.C.:</label>
                <input type="text" id="crear-rfc" name="rfc" autocomplete="off" maxlength="13"
                    pattern="[a-zA-Z0-9]+"
                    title="Solo se permiten letras y números."
                    oninput="this.value = this.value.replace(/[^a-zA-Z0-9]/g, '')" required>
            </div>
            <div class="form-group">
                <label for="crear-domicilio">Calle:</label>
                <input type="text" id="crear-domicilio" name="domicilio" autocomplete="off" pattern="[a-zA-ZÀ-ÿ\s]+"
                    title="Solo se permiten letras y espacios."
                    oninput="this.value = this.value.replace(/[^a-zA-ZÀ-ÿ]/g, '')" size="10" min="0" maxlength="30" required>
            </div>
            <div class="form-containernum">
                <div class="form-group ladoble">
                    <label for="crear-noexterior">No. Exterior:</label>
                    <input type="number" id="crear-noexterior" name="noexterior" autocomplete="off" size="10" maxlength="10"
                        ptitle="Solo se permiten letras y números."
                        oninput="this.value = this.value.replace(/[^a-zA-ZÀ-ÿ0-9]/g, '')" size="10" min="0" maxlength="6" required>
                </div>
                <div class="form-group ladoble">
                    <label for="crear-nointerior">No. Interior:</label>
                    <input type="text" id="crear-nointerior" name="nointerior" autocomplete="off" size="10" min="0" value="0"
                        title="Solo se permiten letras y números."
                        oninput="this.value = this.value.replace(/[^a-zA-ZÀ-ÿ0-9]/g, '')" size=" 10" min="0" value="0" maxlength="6" required>
                </div>
            </div>
            <div class="form-group ">
                <label for="crear-colonia">Colonia:</label>
                <input type="text" id="crear-colonia" name="colonia" autocomplete="off"
                    pattern="[a-zA-ZÀ-ÿ\s]+"
                    title="Solo se permiten letras y espacios."
                    oninput="this.value = this.value.replace(/[^a-zA-ZÀ-ÿ\s]/g, '')" required>
            </div>
            <div class="form-group">
                <label for="crear-ciudad">Ciudad:</label>
                <input type="text" id="crear-ciudad" name="ciudad" autocomplete="off"
                    pattern="[a-zA-ZÀ-ÿ\s]+"
                    title="Solo se permiten letras y espacios."
                    oninput="this.value = this.value.replace(/[^a-zA-ZÀ-ÿ\s]/g, '')" required>
            </div>
            <div class="form-group">
                <label for="crear-estado">Estado:</label>
                <input type="text" id="crear-estado" name="estado" autocomplete="off"
                    pattern="[a-zA-ZÀ-ÿ\s]+"
                    title="Solo se permiten letras y espacios."
                    oninput="this.value = this.value.replace(/[^a-zA-ZÀ-ÿ\s]/g, '')" required>
            </div>
            <div class="form-group">
                <label for="crear-cpostal">Código postal:</label>
                <input type="text" id="crear-cpostal" name="cpostal" autocomplete="off" maxlength="5"
                    pattern="\d{5}"
                    title="Por favor, ingrese un código postal de 5 dígitos."
                    oninput="this.value = this.value.replace(/[^0-9]/g, '')" required>
            </div>
            <div class="form-group">
                <label for="crear-email">Email:</label>
                <input type="email" id="crear-email" name="email" autocomplete="off" required>
            </div>
            <div class="form-group">
                <label for="crear-telefono">Teléfono:</label>
                <input type="text" id="crear-telefono" name="telefono" autocomplete="off" maxlength="10 "
                    pattern="\d{10}"
                    title="Por favor, ingrese un número de telefono de 10 dígitos."
                    oninput="this.value = this.value.replace(/[^0-9]/g, '')" required>
            </div>
            <button type="submit">Guardar</button>
        </form>
    </div>
</div>

<!-- Modal para editar tienda -->
<div id="editar-modal" class="modal" style="display: none;">
    <div class="modal-content">
        <span title="Cerrar" class="close" onclick="cerrarModal('editar-modal')">&times;</span>
        <h2 class="tittle">Editar Tienda</h2>
        <form id="form-editar">
            <input type="hidden" id="editar-id" name="editar-id" value="" />
            <div class="form-group">
                <label class="form-group" for="editar-nombre">Nombre:</label>
                <input type="text" id="editar-nombre" name="nombre" required />
            </div>
            <div class="form-group">
                <label for="editar-representante">Representante:</label>
                <input type="text" id="editar-representante" name="representante" required />
            </div>
            <div class="form-group">
                <label for="editar-rfc">R.F.C.:</label>
                <input type="text" id="editar-rfc" name="rfc" maxlength="13" required />
            </div>
            <div class="form-group">
                <label for="editar-domicilio">Calle:</label>
                <input type="text" id="editar-domicilio" name="domicilio" required>
            </div>
            <div class="form-containernum">
                <div class="form-group">
                    <label for="editar-noexterior">No. Exterior:</label>
                    <input type="numeric" id="editar-noexterior" name="noexterior" autocomplete="off" maxlength="10"
                        pattern="[0-9]+"
                        title="Solo se permiten números."
                        oninput="this.value = this.value.replace(/[^A-Z0-9]/g, '')" size="10" min="0" value="0" maxlength="10" required>
                </div>
                <div class="form-group">
                    <label for="editar-nointerior">No. Interior:</label>
                    <input type="text" id="editar-nointerior" name="nointerior" autocomplete="off"
                        pattern="[a-zA-Z0-9]+"
                        title="Solo se permiten letras ."
                        oninput="this.value = this.value.replace(/[^a-zA-ZÀ-ÿ0-9]/g, '')" size="10" min="0" value="0" maxlength="10" required>
                </div>
            </div>
            <div class="form-group">
                <label for="editar-colonia">Colonia:</label>
                <input type="text" id="editar-colonia" name="colonia" autocomplete="off" required>
            </div>
            <div class="form-group">
                <label for="editar-ciudad">Ciudad:</label>
                <input type="text" id="editar-ciudad" name="ciudad" autocomplete="off" required>
            </div>
            <div class="form-group">
                <label for="editar-estado">Estado:</label>
                <input type="text" id="editar-estado" name="estado" autocomplete="off" required>
            </div>
            <div class="form-group">
                <label for="editar-cpostal">Código postal:</label>
                <input type="text" id="editar-cpostal" name="cpostal" autocomplete="off" maxlength="5"
                    pattern="\d{5}"
                    title="Por favor, ingrese un código postal de 5 dígitos."
                    oninput="this.value = this.value.replace(/[^0-9]/g, '')" required>
            </div>
            <div class="form-group">
                <label for="editar-email">Email:</label>
                <input type="email" id="editar-email" name="email" autocomplete="off" required />
            </div>
            <div class="form-group">
                <label for="editar-telefono">Teléfono:</label>
                <input type="numeric" id="editar-telefono" name="telefono" autocomplete="off" maxlength="10 "
                    pattern="\d{10}"
                    title="Por favor, ingrese un número de telefono de 10 dígitos."
                    oninput="this.value = this.value.replace(/[^0-9]/g, '')" required>
            </div>

            <button type="submit">Actualizar</button>
        </form>
    </div>
</div>