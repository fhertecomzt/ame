<?php
session_start();
//Restricción por rol
if (!isset($_SESSION['idusuario']) || ($_SESSION["rol"] !== "SISTEMAS" && $_SESSION["rol"] !== "GERENCIA")) {
    header("Location: ../../index.php");
    exit;
}

include "../conexion.php";

function obtenerMpagos($dbh)
{
    $stmt = $dbh->prepare("SELECT * FROM mpagos");
    $stmt->execute();
    return $stmt->fetchAll(PDO::FETCH_ASSOC);
}

function obtenerMpago($dbh, $idmpago)
{
    $stmt = $dbh->prepare("SELECT * FROM mpagos WHERE idmpago = :idmpago");
    $stmt->bindParam(':idmpago', $idmpago);
    $stmt->execute();
    return $stmt->fetch(PDO::FETCH_ASSOC);
}

function crearMpago($dbh, $data)
{
    // Validación de datos
    if (empty($data['nommpago'])) {
        return false;
    }
    $stmt = $dbh->prepare("INSERT INTO mpagos (nommpago, descmpago) VALUES (:nommpago, :descmpago)");

    $params = [
        ':nommpago' => $data['nommpago'],
        ':descmpago' => $data['descmpago'],
    ];

    // Para Debug var_dump($params); Aquí verificamos si manda todos los datos esperados
    if ($stmt->execute($params)) {
        return true; //Indicamos que tuvimos exito
    } else {
        $errorInfo = $stmt->errorInfo();
        error_log(print_r($errorInfo, true)); // Esto te ayudará a ver el error en el log
        return false;
    }
}

function actualizarMpago($dbh, $data)
{
    $stmt = $dbh->prepare("UPDATE mpagos SET nommpago = :nommpago, descmpago = :descmpago WHERE idmpago = :idmpago");
    return $stmt->execute($data);
}

function eliminarMpago($dbh, $idmpago)
{
    $stmt = $dbh->prepare("DELETE FROM mpagos WHERE idmpago = :idmpago");
    $stmt->bindParam(':idmpago', $idmpago);
    return $stmt->execute();
}

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $nommpago = filter_input(INPUT_POST, 'nommpago', FILTER_SANITIZE_FULL_SPECIAL_CHARS);
    $descmpago = filter_input(INPUT_POST, 'descmpago', FILTER_SANITIZE_FULL_SPECIAL_CHARS);
    $idmpago = filter_input(INPUT_POST, 'idmpago', FILTER_SANITIZE_NUMBER_INT); // Obtener el ID del usuario

    if (empty($nommpago) || strlen($nommpago) < 4) {
        $error = "El nombre del metodo de pago debe tener al menos 4 caracteres.";
    } elseif (empty(trim($nommpago))) {
        $error = "Los campos no pueden estar vacios";
    } else {

        $data = [
            ':nommpago' => $nommpago,
            ':descmpago' => $descmpago,
            ':idmpago' => $idmpago
        ];

        if ($idmpago) {
            // Actualizar mpago
            $data[':idmpago'] = $idmpago;
            if (actualizarMpago($dbh, $data)) {
                $success = "Metodo de pago actualizado exitosamente";
            } else {
                $error = "Error al actualizar la Mpago"
                    . implode(", ", $stmt->errorInfo());
            }
        } else {
            // Crear nueva Mpago, todos los campos a insertar
            if (crearMpago($dbh, ['nommpago' => $nommpago, 'descmpago' => $descmpago])) {
                $success = "Metodo de pago creado exitosamente";
            } else {
                $error = "Error al crear el Mpago";
            }
        }
    }
}

if (isset($_GET['action']) && $_GET['action'] == 'delete' && isset($_GET['idmpago'])) {
    if (eliminarMpago($dbh, filter_input(INPUT_GET, 'idmpago', FILTER_SANITIZE_NUMBER_INT))) {
        $success = "Metodo de pago eliminado exitosamente";
    } else {
        $error = "Error al eliminar el Mpago";
    }
}

$mpagos = obtenerMpagos($dbh);
$nommpago = isset($_GET['idmpago']) ? obtenerMpago($dbh, filter_input(INPUT_GET, 'idmpago', FILTER_SANITIZE_NUMBER_INT)) : null;
?>

<div class="container">
    <div class="tittle">Formulario de Metodo de pagos</div>
    <?php include "../mensajeestado.php"; ?>
    <form method="post" action="mpagos.php" id="frmMpagos">
        <input type="hidden" name="idmpago" value="<?php echo htmlspecialchars($nommpago['idmpago'] ?? ''); ?>">
        <div class="form-group">
            <span>Metodo de pago:</span>
            <input type="text" id="nommpago" name="nommpago" autocomplete="off" placeholder="Debe contener al menos 4 caracteres" value="<?php echo htmlspecialchars($nommpago['nommpago'] ?? ''); ?>" required>
        </div>
        <div class="form-group">
            <span>Descripción:</span>
            <input type="text" id="descmpago" name="descmpago" autocomplete="off" value="<?php echo htmlspecialchars($nommpago['descmpago'] ?? ''); ?>">
        </div>
        <div class="button">
            <input type="button" id="botonNuevo" onclick="limpiarFormularioMpagos(); cambiarTextoBoton();" value="Nuevo">
        </div>
        <div class="button">
            <input type="submit" id="botonGuardarActualizar" value="<?php echo isset($nommpago) ? 'Actualizar' : 'Guardar'; ?>"></input>
        </div>
    </form>
</div>

<h3>Lista de Mpagos</h3>
<table border="1">
    <thead>
        <tr>
            <th>Id</th>
            <th>Mpago</th>
            <th>Descripción</th>
            <th>Acciones</th>
        </tr>
    </thead>
    <tbody>
        <?php foreach ($mpagos as $u): ?>
            <tr>
                <td><?php echo $u['idmpago']; ?></td>
                <td><?php echo htmlspecialchars($u['nommpago']); ?></td>
                <td><?php echo htmlspecialchars($u['descmpago']); ?></td>
                <td>
                    <a href="#" title="Editar" onclick="cargarEditarMpago(<?php echo $u['idmpago']; ?>); return false;"><i id="btneditar" class="fa-solid fa-pen-to-square"></i></a>
                    &nbsp;&nbsp; &nbsp;
                    <a href="#" title="Eliminar" onclick="eliminarMpago(<?php echo $u['idmpago']; ?>); return false;"><i id="btneliminar" class="fa-solid fa-trash"></i></a>
                </td>
            </tr>
        <?php endforeach; ?>
    </tbody>
</table>