<?php
session_start();
//RESTRICCIÓN POR ROL
if (
    !isset($_SESSION['idusuario']) ||
    !in_array($_SESSION['rol'], ['SISTEMAS', 'GERENCIA', 'VENTAS'])
) {
    header("Location: ../../logout.php");
    exit;
}

include "conexion.php";

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

$usuario = isset($_GET['idusuario']) ? obtenerUsuario($dbh, filter_input(INPUT_GET, 'idusuario', FILTER_SANITIZE_NUMBER_INT)) : null;
//var_dump($usuario); Comprobamos los datos del usuario
?>

<div class="container">
    <div class="tittle">Perfil de usuario</div>
</div>
<table border="1">
    <thead>
        <tr>
            <th>Imagen</th>
            <th>Nombre(s)</th>
            <th>Apellido Materno</th>
            <th>Apellido Paterno</th>
            <th>Rol</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td><?php if (!empty($_SESSION['imagen'])): ?>
                    <img src="<?php echo htmlspecialchars($_SESSION['imagen']); ?>" alt="Imagen de perfil" width="50" height="50">
                <?php else: ?>
                    Sin imagen
                <?php endif; ?>
            </td>
            <td><?php echo htmlspecialchars($_SESSION['nombre']); ?></td>
            <td><?php echo htmlspecialchars($_SESSION['appaterno']); ?></td>
            <td><?php echo htmlspecialchars($_SESSION['apmaterno']); ?></td>
            <td><?php echo htmlspecialchars($_SESSION['rol']); ?></td>
        </tr>
    </tbody>
</table>