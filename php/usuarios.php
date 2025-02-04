<?php
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

$roles_permitidos = ["SISTEMAS", "GERENCIA"];

//Includes
include "verificar_sesion.php";
include "conexion.php";
include "cruds/rellenos.php";

//Función obtener usuarios ocultando los rol de SISTEMAS
function obtenerUsuarios($dbh)
{
    $stmt = $dbh->prepare("SELECT usuarios.*, roles.nomrol, tiendas.nomtienda
FROM usuarios
JOIN roles ON usuarios.idrol = roles.idrol
JOIN tiendas ON usuarios.sucursales_id = tiendas.idtienda
WHERE roles.nomrol != 'SISTEMAS'");
    $stmt->execute();
    return $stmt->fetchAll(PDO::FETCH_ASSOC);
}

$usuarios = obtenerUsuarios($dbh);
?>

<div class="containerr">
    <button class="boton" onclick="abrirModalUser('crear-modalUser')">Nuevo</button>
    <label class="buscarlabel" for="buscarboxrol">Buscar:</label>
    <input class="buscar--box" id="buscarboxrol" type="search" placeholder="Qué estas buscando?">
</div>

<h3>Lista de Usuarios</h3>
<table border="1" id="tabla-usuarios">
    <thead>
        <tr>
            <th>Imagen</th>
            <th>Usuario</th>
            <th>Nombre</th>
            <th>Primer Apellido</th>
            <th>Segundo Apellido</th>
            <th>Rol</th>
            <th>Tienda</th>
            <th>Comisión</th>
            <th>Acciones</th>
            <th></th>
        </tr>
    </thead>
    <tbody>
        <?php foreach ($usuarios as $u): ?>
            <tr>
                <td><?php if (!empty($u['imagen'])): ?>
                        <img src="<?php echo htmlspecialchars($u['imagen']); ?>" alt="Imagen de perfil" width="50" height="50">
                    <?php else: ?>
                        Sin imagen
                    <?php endif; ?>
                </td>
                <td><?php echo htmlspecialchars($u['usuario']); ?></td>
                <td><?php echo htmlspecialchars($u['nombre']); ?></td>
                <td><?php echo htmlspecialchars($u['appaterno']); ?></td>
                <td><?php echo htmlspecialchars($u['apmaterno']); ?></td>
                <td><?php echo htmlspecialchars($u['nomrol']); ?></td>
                <td><?php echo htmlspecialchars($u['nomtienda']); ?></td>
                <td><?php echo htmlspecialchars($u['comision']); ?></td>
                <td>
                    <button title="Editar" class="editarUser fa-solid fa-pen-to-square" data-id="<?php echo $u['idusuario']; ?>"></button>
                    <button title="Eliminar" class="eliminarUser fa-solid fa-trash" data-id="<?php echo $u['idusuario']; ?>"></button>
                </td>
            </tr>
        <?php endforeach; ?>
    </tbody>
</table>

<!-- Mensaje no encuentra resultados -->
<p id="mensaje-vacio" style="display: none; color: red;">No se encontraron resultados.</p>

<!-- Modal para crear Usuario -->
<div id="crear-modalUser" class="modal" style="display: none;">
    <div class="modal-content" style="height: 700px;">
        <span title="Cerrar" class="close" onclick="cerrarModalUser('crear-modalUser')">&times;</span>
        <h2 class="tittle">Crear Usuario</h2>
        <form id="form-crearUser" onsubmit="procesarFormularioUser(event, 'crear')">

            <div class="form-group">
                <label for="crear-User">Usuario:</label>
                <input type="text" id="crear-User" name="usuario" autocomplete="off" required>
            </div>

            <div class="form-group">
                <label for="crear-nombre">Nombre:</label>
                <input type="text" id="crear-nombre" name="nombre" autocomplete="off" required>
            </div>

            <div class="form-group">
                <label for="crear-papellido">Primer apellido:</label>
                <input type="text" id="crear-papellido" name="papellido" autocomplete="off" required>
            </div>

            <div class="form-group">
                <label for="crear-sapellido">Segundo apellido:</label>
                <input type="text" id="crear-sapellido" name="sapellido" autocomplete="off" required>
            </div>

            <!-- Selección del rol -->
            <div class="form-group">
                <label for="crear-idrol">Rol:</label>
                <select id="crear-idrol" name="idrol" required>
                    <option value="">[Selecciona un rol]</option>
                    <?php
                    // Asumiendo que $lista_roles es un array de roles
                    foreach ($lista_roles as $rol): ?>
                        <option value="<?php echo htmlspecialchars($rol['idrol']); ?>" <?php echo (isset($usuario) && $usuario['idrol'] == $rol['idrol']) ? 'selected' : ''; ?>>
                            <?php echo htmlspecialchars($rol['nomrol']); ?>
                        </option>
                    <?php endforeach; ?>
                </select>
            </div>

            <div class="form-group">
                <label for="crear-password1">Contraseña:</label>
                <input type="password" id="crear-password1" name="password1" autocomplete="off" required>
            </div>

            <div class="form-group">
                <label for="crear-password2">Confirma Contraseña:</label>
                <input type="password" id="crear-password2" name="password2" autocomplete="off" required>
            </div>

            <!-- Selección de la tienda -->
            <div class="form-group">
                <label for="crear-tienda">Tienda:</label>
                <select id="crear-tienda" name="sucursales_id" required>
                    <option value="">[Selecciona una tienda]</option>
                    <?php
                    foreach ($lista_tiendas as $tienda): ?>
                        <option value="<?php echo htmlspecialchars($tienda['idtienda']); ?>" <?php echo (isset($usuario) && $usuario['sucursales_id'] == $tienda['idtienda']) ? 'selected' : ''; ?>>
                            <?php echo htmlspecialchars($tienda['nomtienda']); ?>
                        </option>
                    <?php endforeach; ?>
                </select>
            </div>

            <div class="form-group">
                <label for="crear-imagen">Imagen de perfil:</label>
                <input type="file" id="crear-imagen" name="imagen" accept="image/*">
            </div>

            <div class="form-group">
                <Label for="crear-comision">Comisión %:</Label>
                <input type="numeric" id="crear-comision" name="comision" placeholder="Solo escribir la cantidad" value="<?php echo htmlspecialchars($usuario['comision'] ?? ''); ?>" required>
            </div>

            <button type="submit">Guardar</button>

        </form>
    </div>
</div>

<!-- Modal para editar Usuario -->
<div id="editar-modalUser" class="modal" style="display: none;">
    <div class="modal-content" style="height: 700px;">
        <span title="Cerrar" class="close" onclick="cerrarModalUser('editar-modalUser')">&times;</span>
        <h2 class="tittle">Editar Usuario</h2>

        <form id="form-editarUser">
            <input type="hidden" id="editar-iduser" name="editar-iduser" value="" />

            <div class="form-group">
                <label for="editar-User">Usuario:</label>
                <input type="text" id="editar-User" name="usuario" autocomplete="off" required>
            </div>

            <div class="form-group">
                <label for="editar-nombre">Nombre:</label>
                <input type="text" id="editar-nombre" name="nombre" autocomplete="off" required>
            </div>

            <div class="form-group">
                <label for="editar-papellido">Primer apellido:</label>
                <input type="text" id="editar-papellido" name="papellido" autocomplete="off" required>
            </div>

            <div class="form-group">
                <label for="editar-sapellido">Segundo apellido :</label>
                <input type="text" id="editar-sapellido" name="sapellido" autocomplete="off" required>
            </div>

            <!-- Selección del rol -->
            <div class="form-group">
                <label for="idrol">Rol:</label>
                <select id="idrol" name="idrol" required>
                    <option value="">[Selecciona un rol]</option>
                    <?php
                    // Asumiendo que $lista_roles es un array de roles
                    foreach ($lista_roles as $rol): ?>
                        <option value="<?php echo htmlspecialchars($rol['idrol']); ?>" <?php echo (isset($usuario) && $usuario['idrol'] == $rol['idrol']) ? 'selected' : ''; ?>>
                            <?php echo htmlspecialchars($rol['nomrol']); ?>
                        </option>
                    <?php endforeach; ?>
                </select>
            </div>

            <div class="form-group">
                <label for="editar-password1">Contraseña:</label>
                <input type="text" id="editar-password1" name="password1" autocomplete="off">
            </div>

            <div class="form-group">
                <label for="editar-password2">Confirma Contraseña:</label>
                <input type="text" id="editar-password2" name="password2" autocomplete="off">
            </div>

            <!-- Selección de la tienda -->
            <div class="form-group">
                <label for="tienda">Tienda:</label>
                <select id="tienda" name="sucursales_id" required>
                    <option value="">[Selecciona una tienda]</option>
                    <?php
                    foreach ($lista_tiendas as $tienda): ?>
                        <option value="<?php echo htmlspecialchars($tienda['idtienda']); ?>" <?php echo (isset($usuario) && $usuario['sucursales_id'] == $tienda['idtienda']) ? 'selected' : ''; ?>>
                            <?php echo htmlspecialchars($tienda['nomtienda']); ?>
                        </option>
                    <?php endforeach; ?>
                </select>
            </div>

            <div class="form-group">
                <label for="imagen">Imagen de perfil:</label>
                <input type="file" id="imagen" name="imagen" accept="image/*">
            </div>

            <div class="form-group">
                <label for="comision">Comisión %:</label>
                <input type="numeric" id="comision" name="comision" placeholder="Solo escribir la cantidad" value="<?php echo htmlspecialchars($usuario['comision'] ?? ''); ?>" required>
            </div>

            <button type="submit">Actualizar</button>
        </form>
    </div>
</div>