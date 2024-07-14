<?php
session_start();
if (!isset($_SESSION['idusuario']) || $_SESSION["departamento"] !== "SISTEMAS") {
    header("Location: ../login.php");
    exit;
}
$sucursal_nombre = $_SESSION['sucursal_nombre'];

include "conexion.php";
include "ver_sucursales.php";
include "ver_departamentos.php";

function obtenerUsuarios($dbh) {
    $stmt = $dbh->prepare("SELECT usuarios.*, departamentos.departamento, sucursales.nombresucursal 
    FROM usuarios 
    JOIN departamentos ON usuarios.iddepartamento = departamentos.iddepartamento
    JOIN sucursales ON usuarios.sucursales_id = sucursales.id");
    $stmt->execute();
    return $stmt->fetchAll(PDO::FETCH_ASSOC);
}

function obtenerUsuario($dbh, $idusuario) {
    $stmt = $dbh->prepare("SELECT usuarios.*, departamentos.departamento, sucursales.nombresucursal 
    FROM usuarios 
    JOIN departamentos ON usuarios.iddepartamento = departamentos.iddepartamento 
    JOIN sucursales ON usuarios.sucursales_id = sucursales.id
    WHERE idusuario = :idusuario");
    $stmt->bindParam(':idusuario', $idusuario);
    $stmt->execute();
    return $stmt->fetch(PDO::FETCH_ASSOC);
}

function crearUsuario($dbh, $data) {
    $stmt = $dbh->prepare("INSERT INTO usuarios (usuario, nombre, appaterno, apmaterno, iddepartamento, password, sucursales_id) 
                          VALUES (:usuario, :nombre, :appaterno, :apmaterno, :departamento, :password, :sucursal)");
    
    $params = [
        ':usuario' => $data['usuario'],
        ':nombre' => $data['nombre'],
        ':appaterno' => $data['appaterno'],
        ':apmaterno' => $data['apmaterno'],
        ':departamento' => $data['iddepartamento'], // Debe coincidir con el nombre en $data
        ':password' => $data['password'],
        ':sucursal' => $data['sucursal'] // Debe coincidir con el nombre en $data
    ];

    return $stmt->execute($params);
}

function actualizarUsuario($dbh, $data) {
    $stmt = $dbh->prepare("UPDATE usuarios SET usuario = :usuario, nombre = :nombre, appaterno = :appaterno, apmaterno = :apmaterno, iddepartamento = :departamento, password = :password, sucursales_id = :sucursal WHERE idusuario = :idusuario");
    return $stmt->execute($data);
}

function eliminarUsuario($dbh, $idusuario) {
    $stmt = $dbh->prepare("DELETE FROM usuarios WHERE idusuario = :idusuario");
    $stmt->bindParam(':idusuario', $idusuario);
    return $stmt->execute();
}

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $idusuario = filter_input(INPUT_POST, 'idusuario', FILTER_SANITIZE_NUMBER_INT);
    $usuario = filter_input(INPUT_POST, 'usuario', FILTER_SANITIZE_STRING);
    $nombre = filter_input(INPUT_POST, 'nombre', FILTER_SANITIZE_STRING);
    $appaterno = filter_input(INPUT_POST, 'appaterno', FILTER_SANITIZE_STRING);
    $apmaterno = filter_input(INPUT_POST, 'apmaterno', FILTER_SANITIZE_STRING);
    $departamento = filter_input(INPUT_POST, 'departamento', FILTER_SANITIZE_NUMBER_INT);
    $sucursal = filter_input(INPUT_POST, 'sucursal', FILTER_SANITIZE_NUMBER_INT);
    $password1 = filter_input(INPUT_POST, 'password1', FILTER_SANITIZE_STRING);
    $password2 = filter_input(INPUT_POST, 'password2', FILTER_SANITIZE_STRING);

    if ($password1 !== $password2) {
        $error = "Las contraseñas no coinciden";
    } else {
        $passwordHash = password_hash($password1, PASSWORD_BCRYPT);
        $data = [
            ':usuario' => $usuario,
            ':nombre' => $nombre,
            ':appaterno' => $appaterno,
            ':apmaterno' => $apmaterno,
            ':departamento' => $departamento,
            ':sucursal' => $sucursal,
            ':password' => $passwordHash
        ];

        if ($idusuario) {
            $data[':idusuario'] = $idusuario;
            if (actualizarUsuario($dbh, $data)) {
                $success = "Usuario actualizado exitosamente";
            } else {
                $error = "Error al actualizar el usuario";
            }
        } else {
            if (crearUsuario($dbh, $data)) {
                $success = "Usuario creado exitosamente";
            } else {
                $error = "Error al crear el usuario";
            }
        }
    }
}

if (isset($_GET['action']) && $_GET['action'] == 'delete' && isset($_GET['id'])) {
    if (eliminarUsuario($dbh, filter_input(INPUT_GET, 'id', FILTER_SANITIZE_NUMBER_INT))) {
        $success = "Usuario eliminado exitosamente";
    } else {
        $error = "Error al eliminar el usuario";
    }
}

$usuarios = obtenerUsuarios($dbh);
$usuario = isset($_GET['id']) ? obtenerUsuario($dbh, filter_input(INPUT_GET, 'id', FILTER_SANITIZE_NUMBER_INT)) : null;
?>

<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Usuarios</title>
    <link rel="stylesheet" href="../css/estiloadmin.css">
</head>
<body>
    <h3>Formulario de Usuarios</h3>
    <?php if (isset($error)): ?>
        <p style="color: red;"><?php echo htmlspecialchars($error); ?></p>
    <?php endif; ?>
    <?php if (isset($success)): ?>
        <p style="color: green;"><?php echo htmlspecialchars($success); ?></p>
    <?php endif; ?>
    <form method="post" action="usuarios.php">
        <input type="hidden" name="idusuario" value="<?php echo $usuario['idusuario'] ?? ''; ?>">
        <label for="usuario">Usuario:</label>
        <input type="text" id="usuario" name="usuario" value="<?php echo htmlspecialchars($usuario['usuario'] ?? ''); ?>" required>
        <br>
        <label for="nombre">Nombre(s):</label>
        <input type="text" id="nombre" name="nombre" value="<?php echo htmlspecialchars($usuario['nombre'] ?? ''); ?>" required>
        <br>
        <label for="appaterno">Apellido paterno:</label>
        <input type="text" id="appaterno" name="appaterno" value="<?php echo htmlspecialchars($usuario['appaterno'] ?? ''); ?>" required>
        <br>
        <label for="apmaterno">Apellido materno:</label>
        <input type="text" id="apmaterno" name="apmaterno" value="<?php echo htmlspecialchars($usuario['apmaterno'] ?? ''); ?>" required>
        <br>
        <label for="departamento">Seleccione un departamento:</label>
        <select id="departamento" name="departamento">
            <?php foreach ($departamentos as $departamento): ?>
                <option value="<?php echo $departamento['iddepartamento']; ?>" <?php echo isset($usuario['iddepartamento']) && $usuario['iddepartamento'] == $departamento['iddepartamento'] ? 'selected' : ''; ?>><?php echo $departamento['departamento']; ?></option>
            <?php endforeach; ?>
        </select>
        <br>
        <label for="password1">Contraseña:</label>
        <input type="password" id="password1" name="password1" required>
        <br>
        <label for="password2">Confirmar contraseña:</label>
        <input type="password" id="password2" name="password2" required>
        <br>
        <label for="sucursal">Seleccione una sucursal:</label>
        <select id="sucursal" name="sucursal">
            <?php foreach ($sucursales as $sucursal): ?>
                <option value="<?php echo $sucursal['id']; ?>" <?php echo isset($usuario['sucursales_id']) && $usuario['sucursales_id'] == $sucursal['id'] ? 'selected' : ''; ?>><?php echo $sucursal['nombresucursal']; ?></option>
            <?php endforeach; ?>
        </select>
        <br>
        <button type="submit"><?php echo isset($usuario) ? 'Actualizar' : 'Guardar'; ?></button>
    </form>

    <h3>Lista de Usuarios</h3>
    <table border="1">
        <thead>
            <tr>
                <th>ID</th>
                <th>Usuario</th>
                <th>Nombre</th>
                <th>Apellido Paterno</th>
                <th>Apellido Materno</th>
                <th>Departamento</th>
                <th>Sucursal</th>
                <th>Acciones</th>
            </tr>
        </thead>
        <tbody>
            <?php foreach ($usuarios as $u): ?>
                <tr>
                    <td><?php echo $u['idusuario']; ?></td>
                    <td><?php echo htmlspecialchars($u['usuario']); ?></td>
                    <td><?php echo htmlspecialchars($u['nombre']); ?></td>
                    <td><?php echo htmlspecialchars($u['appaterno']); ?></td>
                    <td><?php echo htmlspecialchars($u['apmaterno']); ?></td>
                    <td><?php echo htmlspecialchars($u['departamento']); ?></td>                   
                    <td><?php echo htmlspecialchars($u['nombresucursal']); ?></td>
                    <td>
                        <a href="usuarios.php?id=<?php echo $u['idusuario']; ?>">Editar</a>
                        <a href="usuarios.php?action=delete&id=<?php echo $u['idusuario']; ?>" onclick="return confirm('¿Estás seguro de que deseas eliminar este usuario?');">Eliminar</a>
                    </td>
                </tr>
            <?php endforeach; ?>
        </tbody>
    </table>
</body>
</html>
