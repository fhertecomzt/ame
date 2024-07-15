<?php
session_start();
if (!isset($_SESSION['idusuario']) || $_SESSION["departamento"] !== "SISTEMAS") {
    header("Location: ../login.php");
    exit;
}
$sucursal_nombre = $_SESSION['sucursal_nombre'];

include "conexion.php";

function obtenerdepartamentos($dbh) {
    $stmt = $dbh->prepare("SELECT * FROM departamentos");
    $stmt->execute();
    return $stmt->fetchAll(PDO::FETCH_ASSOC);
}

function obtenerdepartamento($dbh, $iddepartamento) {
    $stmt = $dbh->prepare("SELECT * FROM departamentos WHERE iddepartamento = :iddepartamento");
    $stmt->bindParam(':iddepartamento', $iddepartamento);
    $stmt->execute();
    return $stmt->fetch(PDO::FETCH_ASSOC);
}

function crearDepartamento($dbh, $data) {
    $stmt = $dbh->prepare("INSERT INTO departamentos (departamento) VALUES (:departamento)");
    return $stmt->execute([':departamento' => $data['departamento']]);
}

function actualizardepartamentos($dbh, $data) {
    $stmt = $dbh->prepare("UPDATE departamentos SET departamento = :departamento WHERE iddepartamento = :iddepartamento");
    return $stmt->execute($data);
}

function eliminardepartamentos($dbh, $iddepartamento) {
    $stmt = $dbh->prepare("DELETE FROM departamentos WHERE iddepartamento = :iddepartamento");
    $stmt->bindParam(':iddepartamento', $iddepartamento);
    return $stmt->execute();
}

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $iddepartamento = filter_input(INPUT_POST, 'iddepartamento', FILTER_SANITIZE_NUMBER_INT);
    $departamento = filter_input(INPUT_POST, 'departamento', FILTER_SANITIZE_STRING);

    $data = [
        ':departamento' => $departamento,
        ':iddepartamento' => $iddepartamento
    ];

    if ($iddepartamento) {
        // Actualizar departamento
        if (actualizardepartamentos($dbh, $data)) {
            $success = "Departamento actualizado exitosamente";
        } else {
            $error = "Error al actualizar el Departamento";
        }
    } else {
        // Crear nuevo departamento
        if (crearDepartamento($dbh, ['departamento' => $departamento])) {
            $success = "Departamento creado exitosamente";
        } else {
            $error = "Error al crear el Departamento";
        }
    }
}

if (isset($_GET['action']) && $_GET['action'] == 'delete' && isset($_GET['iddepartamento'])) {
    if (eliminardepartamentos($dbh, filter_input(INPUT_GET, 'iddepartamento', FILTER_SANITIZE_NUMBER_INT))) {
        $success = "Departamento eliminado exitosamente";
    } else {
        $error = "Error al eliminar el Departamento";
    }
}

$departamentos = obtenerdepartamentos($dbh);
$departamento = isset($_GET['iddepartamento']) ? obtenerdepartamento($dbh, filter_input(INPUT_GET, 'iddepartamento', FILTER_SANITIZE_NUMBER_INT)) : null;
?>

<?php if (isset($error)): ?>
    <p style="color: red;"><?php echo htmlspecialchars($error); ?></p>
<?php endif; ?>
<?php if (isset($success)): ?>
    <p style="color: green;"><?php echo htmlspecialchars($success); ?></p>
<?php endif; ?>

<h3>Formulario de departamentos</h3>
<form method="post" action="departamentos.php">
    <input type="hidden" name="iddepartamento" value="<?php echo htmlspecialchars($departamento['iddepartamento'] ?? ''); ?>">
    <label for="departamento">Departamento:</label>
    <input type="text" id="departamento" name="departamento" value="<?php echo htmlspecialchars($departamento['departamento'] ?? ''); ?>" required>
    <br>
    <button type="submit"><?php echo isset($departamento) ? 'Actualizar' : 'Guardar'; ?></button>
</form>

<h3>Lista de departamentos</h3>
<table border="1">
    <thead>
        <tr>
            <th>ID</th>
            <th>Departamento</th>
            <th>Acciones</th>
        </tr>
    </thead>
    <tbody>
        <?php foreach ($departamentos as $u): ?>
            <tr>
                <td><?php echo $u['iddepartamento']; ?></td>
                <td><?php echo htmlspecialchars($u['departamento']); ?></td>
                <td>
                    <a href="#" onclick="cargarEditarDepartamento(<?php echo $u['iddepartamento']; ?>); return false;">Editar</a>
                    <a href="#" onclick="eliminarDepartamento(<?php echo $u['iddepartamento']; ?>); return false;">Eliminar</a>
                </td>
            </tr>
        <?php endforeach; ?>
    </tbody>
</table>
