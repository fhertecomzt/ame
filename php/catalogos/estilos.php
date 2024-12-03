<?php
session_start();
//Restricción por rol
if (!isset($_SESSION['idusuario']) || ($_SESSION["rol"] !== "SISTEMAS" && $_SESSION["rol"] !== "GERENCIA")) {
    header("Location: ../../index.php");
    exit;
}

include "../conexion.php";

function obtenerEstilos($dbh)
{
    $stmt = $dbh->prepare("SELECT * FROM estilos");
    $stmt->execute();
    return $stmt->fetchAll(PDO::FETCH_ASSOC);
}

function obtenerEstilo($dbh, $idestilo)
{
    $stmt = $dbh->prepare("SELECT * FROM estilos WHERE idestilo = :idestilo");
    $stmt->bindParam(':idestilo', $idestilo);
    $stmt->execute();
    return $stmt->fetch(PDO::FETCH_ASSOC);
}

function crearEstilo($dbh, $data)
{
    // Validación de datos
    if (empty($data['nomestilo'])) {
        return false;
    }
    $stmt = $dbh->prepare("INSERT INTO estilos (nomestilo, descestilo) VALUES (:nomestilo, :descestilo)");

    $params = [
        ':nomestilo' => $data['nomestilo'],
        ':descestilo' => $data['descestilo'],
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

function actualizarEstilo($dbh, $data)
{
    $stmt = $dbh->prepare("UPDATE estilos SET nomestilo = :nomestilo, descestilo = :descestilo WHERE idestilo = :idestilo");
    return $stmt->execute($data);
}

function eliminarEstilo($dbh, $idestilo)
{
    $stmt = $dbh->prepare("DELETE FROM estilos WHERE idestilo = :idestilo");
    $stmt->bindParam(':idestilo', $idestilo);
    return $stmt->execute();
}

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $nomestilo = filter_input(INPUT_POST, 'nomestilo', FILTER_SANITIZE_FULL_SPECIAL_CHARS);
    $descestilo = filter_input(INPUT_POST, 'descestilo', FILTER_SANITIZE_FULL_SPECIAL_CHARS);
    $idestilo = filter_input(INPUT_POST, 'idestilo', FILTER_SANITIZE_NUMBER_INT); // Obtener el ID del usuario

    if (empty($nomestilo) || strlen($nomestilo) < 4) {
        $error = "El nombre del estilo debe tener al menos 4 caracteres.";
    } elseif (empty(trim($nomestilo))) {
        $error = "Los campos no pueden estar vacios";
    } else {

        $data = [
            ':nomestilo' => $nomestilo,
            ':descestilo' => $descestilo,
            ':idestilo' => $idestilo
        ];

        if ($idestilo) {
            // Actualizar estilo
            $data[':idestilo'] = $idestilo;
            if (actualizarEstilo($dbh, $data)) {
                $success = "Estilo actualizado exitosamente";
            } else {
                $error = "Error al actualizar la Estilo"
                    . implode(", ", $stmt->errorInfo());
            }
        } else {
            // Crear nueva Estilo, todos los campos a insertar
            if (crearEstilo($dbh, ['nomestilo' => $nomestilo, 'descestilo' => $descestilo])) {
                $success = "Estilo creada exitosamente";
            } else {
                $error = "Error al crear el Estilo";
            }
        }
    }
}

if (isset($_GET['action']) && $_GET['action'] == 'delete' && isset($_GET['idestilo'])) {
    if (eliminarEstilo($dbh, filter_input(INPUT_GET, 'idestilo', FILTER_SANITIZE_NUMBER_INT))) {
        $success = "Estilo eliminado exitosamente";
    } else {
        $error = "Error al eliminar el Estilo";
    }
}

$estilos = obtenerEstilos($dbh);
$nomestilo = isset($_GET['idestilo']) ? obtenerEstilo($dbh, filter_input(INPUT_GET, 'idestilo', FILTER_SANITIZE_NUMBER_INT)) : null;
?>

<div class="container">
    <div class="tittle">Formulario de Estilos</div>
    <?php include "../mensajeestado.php"; ?>
    <form method="post" action="estilos.php" id="frmEstilos">
        <input type="hidden" name="idestilo" value="<?php echo htmlspecialchars($nomestilo['idestilo'] ?? ''); ?>">
        <div class="form-group">
            <span>Estilo:</span>
            <input type="text" id="nomestilo" name="nomestilo" autocomplete="off" placeholder="Debe contener al menos 4 caracteres" value="<?php echo htmlspecialchars($nomestilo['nomestilo'] ?? ''); ?>" required>
        </div>
        <div class="form-group">
            <span>Descripción:</span>
            <input type="text" id="descestilo" name="descestilo" autocomplete="off" value="<?php echo htmlspecialchars($nomestilo['descestilo'] ?? ''); ?>">
        </div>
        <div class="button">
            <input type="button" id="botonNuevo" onclick="limpiarFormularioEstilos(); cambiarTextoBoton();" value="Nuevo">
        </div>
        <div class="button">
            <input type="submit" id="botonGuardarActualizar" value="<?php echo isset($nomestilo) ? 'Actualizar' : 'Guardar'; ?>"></input>
        </div>
    </form>
</div>

<h3>Lista de Estilos</h3>
<table border="1">
    <thead>
        <tr>
            <th>Id</th>
            <th>Estilo</th>
            <th>Descripción</th>
            <th>Acciones</th>
        </tr>
    </thead>
    <tbody>
        <?php foreach ($estilos as $u): ?>
            <tr>
                <td><?php echo $u['idestilo']; ?></td>
                <td><?php echo htmlspecialchars($u['nomestilo']); ?></td>
                <td><?php echo htmlspecialchars($u['descestilo']); ?></td>
                <td>
                    <a href="#" title="Editar" onclick="cargarEditarEstilo(<?php echo $u['idestilo']; ?>); return false;"><i id="btneditar" class="fa-solid fa-pen-to-square"></i></a>
                    &nbsp;&nbsp; &nbsp;
                    <a href="#" title="Eliminar" onclick="eliminarEstilo(<?php echo $u['idestilo']; ?>); return false;"><i id="btneliminar" class="fa-solid fa-trash"></i></a>
                </td>
            </tr>
        <?php endforeach; ?>
    </tbody>
</table>