<?php
session_start();
//Restricción por rol
if (
    !isset($_SESSION['idusuario']) ||
    !in_array($_SESSION['rol'], ['SISTEMAS', 'GERENCIA', 'VENTAS'])
) {
    header("Location: logout.php");
    exit;
}

include "conexion.php";

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

function obtenerUsuario($dbh, $idusuario)
{
    $stmt = $dbh->prepare("SELECT usuarios.*, roles.nomrol, tiendas.nomtienda
FROM usuarios
JOIN roles ON usuarios.idrol = roles.idrol
JOIN tiendas ON usuarios.sucursales_id = tiendas.idtienda
WHERE idusuario = :idusuario");
    $stmt->bindParam(':idusuario', $idusuario);
    $stmt->execute();
    return $stmt->fetch(PDO::FETCH_ASSOC);
}

// Rellenamos la lista de roles excluyendo "Superusuario"
$consulta_roles = $dbh->prepare("SELECT * FROM roles WHERE nomrol != 'SISTEMAS'");
$consulta_roles->execute();

$lista_roles = []; // Inicializa como un array

while ($rol = $consulta_roles->fetch(PDO::FETCH_ASSOC)) {
    $lista_roles[] = $rol; // Agrega cada rol al array
}

// Rellenamos la lista de tiendas
$consulta_tiendas = $dbh->prepare("SELECT * FROM tiendas");
$consulta_tiendas->execute();
$lista_tiendas = []; // Inicializa como un array

while ($tienda = $consulta_tiendas->fetch(PDO::FETCH_ASSOC)) {
    $lista_tiendas[] = $tienda; // Agrega cada sucursal al array
}


function crearUsuario($dbh, $data, $imagen)
{
    // Validación de datos
    if (empty($data['usuario']) || empty($data['nombre']) || empty($data['appaterno']) || empty($data['apmaterno']) || empty($data['idrol']) || empty($data['password1']) || empty($data['sucursales_id']) || empty($data['comision'])) {
        return false;
    }

    // Hash de la contraseña
    $hashedPassword1 = password_hash($data['password1'], PASSWORD_DEFAULT);

    // Procesar imagen si existe
    $rutaImagen = null;
    if ($imagen['size'] > 0) {
        $nombreImagen = uniqid() . '-' . basename($imagen['name']);
        $rutaImagen = '../imgs/users' . $nombreImagen;
        if (!move_uploaded_file($imagen['tmp_name'], $rutaImagen)) {
            error_log("Error al subir la imagen");
            return false;
        }
    }

    $stmt = $dbh->prepare("INSERT INTO usuarios (usuario, nombre, appaterno, apmaterno, idrol, password1, sucursales_id, imagen, comision) VALUES (:usuario, :nombre, :appaterno, :apmaterno, :idrol, :password1, :sucursales_id, :imagen, :comision)");

    $params = [
        ':usuario' => $data['usuario'],
        ':nombre' => $data['nombre'],
        ':appaterno' => $data['appaterno'],
        ':apmaterno' => $data['apmaterno'],
        ':idrol' => $data['idrol'],
        ':password1' => $hashedPassword1,
        ':sucursales_id' => $data['sucursales_id'],
        ':imagen' => $rutaImagen,
        ':comision' => $data['comision'],
    ];
    // var_dump($params); Aquí verificamos si manda todos los datos esperados

    if ($stmt->execute($params)) {
        return true; //Indicamos que tuvimos exit
    } else {
        $errorInfo = $stmt->errorInfo();
        error_log(print_r($errorInfo, true)); // Esto te ayudará a ver el error en el log
        return false;
    }
}

function actualizarUsuario($dbh, $data, $imagen = null)
{
    // Mantener la ruta de la imagen existente si no se sube una nueva
    $rutaImagen = $data['imagen'];

    if ($imagen && $imagen['size'] > 0) {
        $nombreImagen = uniqid() . '-' . basename($imagen['name']);
        $rutaImagen = '../imgs/users/' . $nombreImagen;

        if (!move_uploaded_file($imagen['tmp_name'], $rutaImagen)) {
            error_log("Error al subir la imagen");
            return false;
        }
    }

    // Crear el array de parámetros
    $params = [
        ':idusuario' => $data['idusuario'],
        ':usuario' => $data['usuario'],
        ':nombre' => $data['nombre'],
        ':appaterno' => $data['appaterno'],
        ':apmaterno' => $data['apmaterno'],
        ':idrol' => $data['idrol'],
        ':sucursales_id' => $data['sucursales_id'],
        ':comision' => $data['comision']
    ];

    // Añadir la imagen solo si se ha subido una nueva
    $sql = "UPDATE usuarios SET usuario = :usuario, nombre = :nombre, appaterno = :appaterno, apmaterno = :apmaterno, idrol = :idrol, sucursales_id = :sucursales_id, comision = :comision";

    if (!empty($data['password1'])) {
        $hashedPassword = password_hash($data['password1'], PASSWORD_DEFAULT);
        $params[':password1'] = $hashedPassword;
        $sql .= ", password1 = :password1";
    }

    if ($imagen && $imagen['size'] > 0) {
        $params[':imagen'] = $rutaImagen;
        $sql .= ", imagen = :imagen";
    }

    $sql .= " WHERE idusuario = :idusuario";

    $stmt = $dbh->prepare($sql);
    return $stmt->execute($params);
}


function eliminarUsuario($dbh, $idusuario)
{
    $stmt = $dbh->prepare("DELETE FROM usuarios WHERE idusuario = :idusuario");
    $stmt->bindParam(':idusuario', $idusuario);
    return $stmt->execute();
}

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    // Recoger y limpiar los datos del formulario
    $usuario = filter_input(INPUT_POST, 'usuario', FILTER_SANITIZE_FULL_SPECIAL_CHARS);
    $nombre = filter_input(INPUT_POST, 'nombre', FILTER_SANITIZE_FULL_SPECIAL_CHARS);
    $appaterno = filter_input(INPUT_POST, 'appaterno', FILTER_SANITIZE_FULL_SPECIAL_CHARS);
    $apmaterno = filter_input(INPUT_POST, 'apmaterno', FILTER_SANITIZE_FULL_SPECIAL_CHARS);
    $idrol = filter_input(INPUT_POST, 'idrol', FILTER_SANITIZE_NUMBER_INT);
    $password1 = filter_input(INPUT_POST, 'password1', FILTER_SANITIZE_FULL_SPECIAL_CHARS);
    $password2 = filter_input(INPUT_POST, 'password2', FILTER_SANITIZE_FULL_SPECIAL_CHARS);
    $sucursales_id = filter_input(INPUT_POST, 'sucursales_id', FILTER_SANITIZE_NUMBER_INT);
    $comision = filter_input(INPUT_POST, 'comision', FILTER_SANITIZE_NUMBER_INT);
    $idusuario = filter_input(INPUT_POST, 'idusuario', FILTER_SANITIZE_NUMBER_INT); // Obtener el ID del usuario

    //Validaciones
    if ($password1 !== $password2) {
        $error = "Las contraseñas no coinciden";
    } elseif (empty($usuario) || empty($nombre) || empty($appaterno) || empty($apmaterno) || empty($idrol) || empty($sucursales_id || empty($comision))) {
        $error = "Todos los campos son obligatorios.";
    } elseif (empty($usuario) || strlen($usuario) < 4) {
        $error = "El nombre de usuario debe tener al menos 4 caracteres.";
    } else {
        $data = [
            'usuario' => $usuario,
            'nombre' => $nombre,
            'appaterno' => $appaterno,
            'apmaterno' => $apmaterno,
            'idrol' => $idrol,
            'password1' => $password1,
            'password2' => $password2,
            'sucursales_id' => $sucursales_id,
            'comision' => $comision

        ];

        // Actualizar usuario
        // Verificar si se está actualizando o creando un nuevo usuario
        if ($idusuario) {
            $data['idusuario'] = $idusuario; // Agregar el ID del usuario para la actualización
            $data['imagen'] = $usuario['imagen'] ?? ''; // Mantener la imagen existente si no se sube una nueva

            if (!empty($password1)) {
                $data['password1'] = $password1; // Agregar la nueva contraseña
            }
            if (actualizarUsuario($dbh, $data, $_FILES['imagen'])) {
                $success = "Usuario actualizado exitosamente";
            } else {
                $error = "Error al actualizar el usuario";
            }
        } else {
            // Crear nuevo usuario
            $data['password1'] = $password1; // Agregar la contraseña
            if (crearUsuario($dbh, $data, $_FILES['imagen'])) {
                $success = "Usuario creado exitosamente";
            } else {
                $error = "Error al crear el usuario";
            }
        }
    }
}


if (isset($_GET['action']) && $_GET['action'] == 'delete' && isset($_GET['idusuario'])) {
    if (eliminarUsuario($dbh, filter_input(INPUT_GET, 'idusuario', FILTER_SANITIZE_NUMBER_INT))) {
        $success = "Usuario eliminado exitosamente";
    } else {
        $error = "Error al eliminar el usuario";
    }
}

$usuarios = obtenerUsuarios($dbh);
$usuario = isset($_GET['idusuario']) ? obtenerUsuario($dbh, filter_input(INPUT_GET, 'idusuario', FILTER_SANITIZE_NUMBER_INT)) : null;
//var_dump($usuario); Comprobamos los datos del usuario
?>

<div class="container">
    <div class="tittle">Formulario de Usuarios</div>
    <!--Incluimos archivo de mensajes de estado para saber si es exito o error-->
    <?php include "mensajeestado.php"; ?>
    <form method="post" action="usuarios.php" id="frmUsuarios" enctype="multipart/form-data">
        <input type="hidden" name="idusuario" value="<?php echo $usuario['idusuario'] ?? ''; ?>">
        <div class="form-group">
            <span>Usuario:</span>
            <input type="text" id="usuario" name="usuario" placeholder="Debe contener al menos 4 caracteres" value="<?php echo htmlspecialchars($usuario['usuario'] ?? ''); ?>" required>
        </div>
        <div class="form-group">
            <span>Nombre(s):</span>
            <input type="text" id="nombre" name="nombre" value="<?php echo htmlspecialchars($usuario['nombre'] ?? ''); ?>" required>
        </div>
        <div class="form-group">
            <span>Apellido paterno:</span>
            <input type="text" id="appaterno" name="appaterno" value="<?php echo htmlspecialchars($usuario['appaterno'] ?? ''); ?>" required>
        </div>
        <div class="form-group">
            <span>Apellido materno:</span>
            <input type="text" id="apmaterno" name="apmaterno" value="<?php echo htmlspecialchars($usuario['apmaterno'] ?? ''); ?>" required>
        </div>
        <!-- Selección del rol -->
        <div class="form-group">
            <span>Rol:</span>
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
            <span>Contraseña:</span>
            <input type="password" id="password1" name="password1" value="">
        </div>
        <div class="form-group">
            <span>Confirma contraseña:</span>
            <input type="password" id="password2" name="password2" value="">
        </div>
        <!-- Selección de la tienda -->
        <div class="form-group">
            <span>Tienda:</span>
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
            <span>Imagen de perfil:</span>
            <input type="file" id="imagen" name="imagen" accept="image/*">
        </div>
        <div class="form-group">
            <span>Comisión %:</span>
            <input type="numeric" id="comision" name="comision" placeholder="Solo escribir la cantidad" value="<?php echo htmlspecialchars($usuario['comision'] ?? ''); ?>" required>
        </div>
    </form>
    <div class="button-container">
        <div class="form-total">
            <div class="button-container">
                <div class="buttons">
                    <input type="button" id="botonNuevo" onclick="limpiarFormularioUsuarios(); cambiarTextoBoton();" value="Nuevo">
                </div>
                <div class="buttons">
                    <input type="submit" id="botonGuardarActualizar" value="<?php echo isset($usuario) ? 'Actualizar' : 'Guardar'; ?>"></input>
                </div>
            </div>
        </div>
    </div>

    <h3>Lista de Usuarios</h3>
    <table border="1">
        <thead>
            <tr>
                <th>ID</th>
                <th>Imagen</th>
                <th>Usuario</th>
                <th>Nombre</th>
                <th>Apellido Paterno</th>
                <th>Apellido Materno</th>
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
                    <td><?php echo $u['idusuario']; ?></td>
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
                        <a href="#" title="Editar" onclick="cargarEditarUsuario(<?php echo $u['idusuario']; ?>); return false;"><i id="btneditar" class="fa-solid fa-pen-to-square"></i></a>
                        &nbsp;&nbsp; &nbsp;

                        <a href="#" title="Eliminar" onclick="eliminarUsuario(<?php echo $u['idusuario']; ?>); return false;"><i id="btneliminar" class="fa-solid fa-trash"></i></a>
                    </td>
                </tr>
            <?php endforeach; ?>
        </tbody>
    </table>