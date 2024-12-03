<?php
session_start();
//Restricción por rol
if (!isset($_SESSION['idusuario']) || ($_SESSION["rol"] !== "SISTEMAS" && $_SESSION["rol"] !== "GERENCIA")) {
    header("Location: ../../index.php");
    exit;
}

include "../conexion.php";

function obtenerImpuestos($dbh)
{
    $stmt = $dbh->prepare("SELECT * FROM impuestos");
    $stmt->execute();
    return $stmt->fetchAll(PDO::FETCH_ASSOC);
}

function obtenerImpuesto($dbh, $idimpuesto)
{
    $stmt = $dbh->prepare("SELECT * FROM impuestos WHERE idimpuesto = :idimpuesto");
    $stmt->bindParam(':idimpuesto', $idimpuesto);
    $stmt->execute();
    return $stmt->fetch(PDO::FETCH_ASSOC);
}

function crearImpuesto($dbh, $data)
{
    // Validación de datos
    if (empty($data['nomimpuesto'])) {
        return false;
    }
    $stmt = $dbh->prepare("INSERT INTO impuestos (nomimpuesto, tasa) VALUES (:nomimpuesto, :tasa)");

    $params = [
        ':nomimpuesto' => $data['nomimpuesto'],
        ':tasa' => $data['tasa'],
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

function actualizarImpuesto($dbh, $data)
{
    $stmt = $dbh->prepare("UPDATE impuestos SET nomimpuesto = :nomimpuesto, tasa = :tasa WHERE idimpuesto = :idimpuesto");
    return $stmt->execute($data);
}

function eliminarImpuesto($dbh, $idimpuesto)
{
    $stmt = $dbh->prepare("DELETE FROM impuestos WHERE idimpuesto = :idimpuesto");
    $stmt->bindParam(':idimpuesto', $idimpuesto);
    return $stmt->execute();
}

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $nomimpuesto = filter_input(INPUT_POST, 'nomimpuesto', FILTER_SANITIZE_FULL_SPECIAL_CHARS);
    $tasa = filter_input(INPUT_POST, 'tasa', FILTER_SANITIZE_FULL_SPECIAL_CHARS);
    $idimpuesto = filter_input(INPUT_POST, 'idimpuesto', FILTER_SANITIZE_NUMBER_INT); // Obtener el ID del usuario

    if (empty($nomimpuesto) || strlen($nomimpuesto) < 3) {
        $error = "El nombre del impuesto debe tener al menos 3 caracteres.";
    } elseif (empty(trim($nomimpuesto))) {
        $error = "Los campos no pueden estar vacios";
    } else {

        $data = [
            ':nomimpuesto' => $nomimpuesto,
            ':tasa' => $tasa,
            ':idimpuesto' => $idimpuesto
        ];

        if ($idimpuesto) {
            // Actualizar impuesto
            $data[':idimpuesto'] = $idimpuesto;
            if (actualizarImpuesto($dbh, $data)) {
                $success = "Impuesto actualizado exitosamente";
            } else {
                $error = "Error al actualizar la Impuesto"
                    . implode(", ", $stmt->errorInfo());
            }
        } else {
            // Crear nueva Impuesto, todos los campos a insertar
            if (crearImpuesto($dbh, ['nomimpuesto' => $nomimpuesto, 'tasa' => $tasa])) {
                $success = "Impuesto creada exitosamente";
            } else {
                $error = "Error al crear el Impuesto";
            }
        }
    }
}

if (isset($_GET['action']) && $_GET['action'] == 'delete' && isset($_GET['idimpuesto'])) {
    if (eliminarImpuesto($dbh, filter_input(INPUT_GET, 'idimpuesto', FILTER_SANITIZE_NUMBER_INT))) {
        $success = "Impuesto eliminado exitosamente";
    } else {
        $error = "Error al eliminar el Impuesto";
    }
}

$impuestos = obtenerImpuestos($dbh);
$nomimpuesto = isset($_GET['idimpuesto']) ? obtenerImpuesto($dbh, filter_input(INPUT_GET, 'idimpuesto', FILTER_SANITIZE_NUMBER_INT)) : null;
?>

<div class="container">
    <div class="tittle">Formulario de Impuestos</div>
    <?php include "../mensajeestado.php"; ?>
    <form method="post" action="impuestos.php" id="frmImpuestos">
        <input type="hidden" name="idimpuesto" value="<?php echo htmlspecialchars($nomimpuesto['idimpuesto'] ?? ''); ?>">
        <div class="form-group">
            <span>Nombre de impuesto:</span>
            <input type="text" id="nomimpuesto" name="nomimpuesto" autocomplete="off" placeholder="Debe contener al menos 3 caracteres" value="<?php echo htmlspecialchars($nomimpuesto['nomimpuesto'] ?? ''); ?>" required>
        </div>
        <div class="form-group">
            <span>Tasa:</span>
            <input type="number" id="tasa" name="tasa" autocomplete="off" value="<?php echo htmlspecialchars($nomimpuesto['tasa'] ?? ''); ?>">
        </div>
        <div class="button">
            <input type="button" id="botonNuevo" onclick="limpiarFormularioImpuestos(); cambiarTextoBoton();" value="Nuevo">
        </div>
        <div class="button">
            <input type="submit" id="botonGuardarActualizar" value="<?php echo isset($nomimpuesto) ? 'Actualizar' : 'Guardar'; ?>"></input>
        </div>
    </form>
</div>

<h3>Lista de Impuestos</h3>
<table border="1">
    <thead>
        <tr>
            <th>Id</th>
            <th>Impuesto</th>
            <th>Tasa</th>
            <th>Acciones</th>
        </tr>
    </thead>
    <tbody>
        <?php foreach ($impuestos as $u): ?>
            <tr>
                <td><?php echo $u['idimpuesto']; ?></td>
                <td><?php echo htmlspecialchars($u['nomimpuesto']); ?></td>
                <td><?php echo htmlspecialchars($u['tasa']); ?></td>
                <td>
                    <a href="#" title="Editar" onclick="cargarEditarImpuesto(<?php echo $u['idimpuesto']; ?>); return false;"><i id="btneditar" class="fa-solid fa-pen-to-square"></i></a>
                    &nbsp;&nbsp; &nbsp;
                    <a href="#" title="Eliminar" onclick="eliminarImpuesto(<?php echo $u['idimpuesto']; ?>); return false;"><i id="btneliminar" class="fa-solid fa-trash"></i></a>
                </td>
            </tr>
        <?php endforeach; ?>
    </tbody>
</table>