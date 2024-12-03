<?php
session_start();
if (!isset($_SESSION['idusuario']) || $_SESSION["rol"] !== "SISTEMAS") {
    header("Location: logout.php");
    exit;
}
//$sucursal_nombre = $_SESSION['sucursal_nombre'];

include "conexion.php";

function obtenerRoles($dbh)
{
    $stmt = $dbh->prepare("SELECT * FROM roles");
    $stmt->execute();
    return $stmt->fetchAll(PDO::FETCH_ASSOC);
}

function obtenerRol($dbh, $idrol)
{
    $stmt = $dbh->prepare("SELECT * FROM roles WHERE idrol = :idrol");
    $stmt->bindParam(':idrol', $idrol);
    $stmt->execute();
    return $stmt->fetch(PDO::FETCH_ASSOC);
}

function crearRol($dbh, $data)
{
    // Validación de datos
    if (empty($data['nomrol']) || empty($data['descrol'])) {
        return false;
    }
    $stmt = $dbh->prepare("INSERT INTO roles (nomrol, descrol) VALUES (:nomrol, :descrol)");

    $params = [
        ':nomrol' => $data['nomrol'],
        ':descrol' => $data['descrol'],
    ];

    // Para Debug var_dump($params); Aquí verificamos si manda todos los datos esperados
    if ($stmt->execute($params)) {
        return true; //Indicamos que tuvimos exit
    } else {
        $errorInfo = $stmt->errorInfo();
        error_log(print_r($errorInfo, true)); // Esto te ayudará a ver el error en el log
        return false;
    }
}

function actualizarRol($dbh, $data)
{
    $stmt = $dbh->prepare("UPDATE roles SET nomrol = :nomrol, descrol = :descrol WHERE idrol = :idrol");
    return $stmt->execute($data);
}

function eliminarRol($dbh, $idrol)
{
    $stmt = $dbh->prepare("DELETE FROM roles WHERE idrol = :idrol");
    $stmt->bindParam(':idrol', $idrol);
    return $stmt->execute();
}

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $nomrol = filter_input(INPUT_POST, 'nomrol', FILTER_SANITIZE_FULL_SPECIAL_CHARS);
    $descrol = filter_input(INPUT_POST, 'descrol', FILTER_SANITIZE_FULL_SPECIAL_CHARS);
    $idrol = filter_input(INPUT_POST, 'idrol', FILTER_SANITIZE_NUMBER_INT); // Obtener el ID del usuario

    if (empty($nomrol) || strlen($nomrol) < 4) {
        $error = "El nombre del rol debe tener al menos 4 caracteres.";
    } elseif (empty(trim($nomrol))) {
        $error = "Los campos no pueden estar vacios";
    } else {

        $data = [
            ':nomrol' => $nomrol,
            ':descrol' => $descrol,
            ':idrol' => $idrol
        ];

        if ($idrol) {
            // Actualizar rol
            $data[':idrol'] = $idrol;
            if (actualizarRol($dbh, $data)) {
                $success = "Rol actualizado exitosamente";
            } else {
                $error = "Error al actualizar el Rol"
                    . implode(", ", $stmt->errorInfo());
            }
        } else {
            // Crear nuevo Rol, todos los campos a insertar
            if (crearRol($dbh, ['nomrol' => $nomrol, 'descrol' => $descrol])) {
                $success = "Rol creado exitosamente";
            } else {
                $error = "Error al crear el Rol";
            }
        }
    }
}

if (isset($_GET['action']) && $_GET['action'] == 'delete' && isset($_GET['idrol'])) {
    if (eliminarRol($dbh, filter_input(INPUT_GET, 'idrol', FILTER_SANITIZE_NUMBER_INT))) {
        $success = "Rol eliminado exitosamente";
    } else {
        $error = "Error al eliminar el Rol";
    }
}

$roles = obtenerRoles($dbh);
$nomrol = isset($_GET['idrol']) ? obtenerRol($dbh, filter_input(INPUT_GET, 'idrol', FILTER_SANITIZE_NUMBER_INT)) : null;
?>

<div class="container">
    <div class="tittle">Formulario de Roles</div>
    <?php include "mensajeestado.php"; ?>
    <form method="post" action="roles.php" id="frmRoles">
        <input type="hidden" name="idrol" value="<?php echo htmlspecialchars($nomrol['idrol'] ?? ''); ?>">
        <div class="form-group">
            <span>Rol:</span>
            <input type="text" id="nomrol" name="nomrol" autocomplete="off" placeholder="Debe contener al menos 4 caracteres" value="<?php echo htmlspecialchars($nomrol['nomrol'] ?? ''); ?>" required>
        </div>
        <div class="form-group">
            <span>Descripción:</span>
            <input type="text" id="descrol" name="descrol" autocomplete="off" value="<?php echo htmlspecialchars($nomrol['descrol'] ?? ''); ?>" required>
        </div>
        <div class="button">
            <input type="button" id="botonNuevo" onclick="limpiarFormularioRoles(); cambiarTextoBoton();" value="Nuevo">
        </div>
        <div class="button">
            <input type="submit" id="botonGuardarActualizar" value="<?php echo isset($nomrol) ? 'Actualizar' : 'Guardar'; ?>"></input>
        </div>
    </form>
</div>

<h3>Lista de Roles</h3>
<table border="1">
    <thead>
        <tr>
            <th>Id</th>
            <th>Rol</th>
            <th>Descripción</th>
            <th>Acciones</th>
        </tr>
    </thead>
    <tbody>
        <?php foreach ($roles as $u): ?>
            <tr>
                <td><?php echo $u['idrol']; ?></td>
                <td><?php echo htmlspecialchars($u['nomrol']); ?></td>
                <td><?php echo htmlspecialchars($u['descrol']); ?></td>
                <td>
                    <a href="#" title="Editar" onclick="cargarEditarRol(<?php echo $u['idrol']; ?>); return false;"><i id="btneditar" class="fa-solid fa-pen-to-square"></i></a>
                    &nbsp;&nbsp; &nbsp;
                    <a href="#" title="Eliminar" onclick="eliminarRol(<?php echo $u['idrol']; ?>); return false;"><i id="btneliminar" class="fa-solid fa-trash"></i></a>
                </td>
            </tr>
        <?php endforeach; ?>
    </tbody>
</table>