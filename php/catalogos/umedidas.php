<?php
session_start();
//Restricción por rol
if (!isset($_SESSION['idusuario']) || ($_SESSION["rol"] !== "SISTEMAS" && $_SESSION["rol"] !== "GERENCIA")) {
    header("Location: ../../index.php");
    exit;
}

include "../conexion.php";

function obtenerUmedidas($dbh)
{
    $stmt = $dbh->prepare("SELECT * FROM umedidas");
    $stmt->execute();
    return $stmt->fetchAll(PDO::FETCH_ASSOC);
}

function obtenerUmedida($dbh, $idumedida)
{
    $stmt = $dbh->prepare("SELECT * FROM umedidas WHERE idumedida = :idumedida");
    $stmt->bindParam(':idumedida', $idumedida);
    $stmt->execute();
    return $stmt->fetch(PDO::FETCH_ASSOC);
}

function crearUmedida($dbh, $data)
{
    // Validación de datos
    if (empty($data['nomumedida'])) {
        return false;
    }
    $stmt = $dbh->prepare("INSERT INTO umedidas (nomumedida, descumedida) VALUES (:nomumedida, :descumedida)");

    $params = [
        ':nomumedida' => $data['nomumedida'],
        ':descumedida' => $data['descumedida'],
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

function actualizarUmedida($dbh, $data)
{
    $stmt = $dbh->prepare("UPDATE umedidas SET nomumedida = :nomumedida, descumedida = :descumedida WHERE idumedida = :idumedida");
    return $stmt->execute($data);
}

function eliminarUmedida($dbh, $idumedida)
{
    $stmt = $dbh->prepare("DELETE FROM umedidas WHERE idumedida = :idumedida");
    $stmt->bindParam(':idumedida', $idumedida);
    return $stmt->execute();
}

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $nomumedida = filter_input(INPUT_POST, 'nomumedida', FILTER_SANITIZE_FULL_SPECIAL_CHARS);
    $descumedida = filter_input(INPUT_POST, 'descumedida', FILTER_SANITIZE_FULL_SPECIAL_CHARS);
    $idumedida = filter_input(INPUT_POST, 'idumedida', FILTER_SANITIZE_NUMBER_INT); // Obtener el ID del usuario

    if (empty($nomumedida) || strlen($nomumedida) < 4) {
        $error = "El nombre de la umedida debe tener al menos 4 caracteres.";
    } elseif (empty(trim($nomumedida))) {
        $error = "Los campos no pueden estar vacios";
    } else {

        $data = [
            ':nomumedida' => $nomumedida,
            ':descumedida' => $descumedida,
            ':idumedida' => $idumedida
        ];

        if ($idumedida) {
            // Actualizar umedida
            $data[':idumedida'] = $idumedida;
            if (actualizarUmedida($dbh, $data)) {
                $success = "Umedida actualizado exitosamente";
            } else {
                $error = "Error al actualizar la Umedida"
                    . implode(", ", $stmt->errorInfo());
            }
        } else {
            // Crear nueva Umedida, todos los campos a insertar
            if (crearUmedida($dbh, ['nomumedida' => $nomumedida, 'descumedida' => $descumedida])) {
                $success = "Umedida creada exitosamente";
            } else {
                $error = "Error al crear el Umedida";
            }
        }
    }
}

if (isset($_GET['action']) && $_GET['action'] == 'delete' && isset($_GET['idumedida'])) {
    if (eliminarUmedida($dbh, filter_input(INPUT_GET, 'idumedida', FILTER_SANITIZE_NUMBER_INT))) {
        $success = "Umedida eliminado exitosamente";
    } else {
        $error = "Error al eliminar el Umedida";
    }
}

$umedidas = obtenerUmedidas($dbh);
$nomumedida = isset($_GET['idumedida']) ? obtenerUmedida($dbh, filter_input(INPUT_GET, 'idumedida', FILTER_SANITIZE_NUMBER_INT)) : null;
?>

<div class="container">
    <div class="tittle">Formulario de Unidades de medidas</div>
    <?php include "../mensajeestado.php"; ?>
    <form method="post" action="umedidas.php" id="frmUmedidas">
        <input type="hidden" name="idumedida" value="<?php echo htmlspecialchars($nomumedida['idumedida'] ?? ''); ?>">
        <div class="form-group">
            <span>Unidad de medida:</span>
            <input type="text" id="nomumedida" name="nomumedida" autocomplete="off" placeholder="Debe contener al menos 4 caracteres" value="<?php echo htmlspecialchars($nomumedida['nomumedida'] ?? ''); ?>" required>
        </div>
        <div class="form-group">
            <span>Descripción:</span>
            <input type="text" id="descumedida" name="descumedida" autocomplete="off" value="<?php echo htmlspecialchars($nomumedida['descumedida'] ?? ''); ?>">
        </div>
        <div class="button">
            <input type="button" id="botonNuevo" onclick="limpiarFormularioUmedidas(); cambiarTextoBoton();" value="Nuevo">
        </div>
        <div class="button">
            <input type="submit" id="botonGuardarActualizar" value="<?php echo isset($nomumedida) ? 'Actualizar' : 'Guardar'; ?>"></input>
        </div>
    </form>
</div>

<h3>Lista de Unidades de medidas</h3>
<table border="1">
    <thead>
        <tr>
            <th>Id</th>
            <th>U. Medida</th>
            <th>Descripción</th>
            <th>Acciones</th>
        </tr>
    </thead>
    <tbody>
        <?php foreach ($umedidas as $u): ?>
            <tr>
                <td><?php echo $u['idumedida']; ?></td>
                <td><?php echo htmlspecialchars($u['nomumedida']); ?></td>
                <td><?php echo htmlspecialchars($u['descumedida']); ?></td>
                <td>
                    <a href="#" title="Editar" onclick="cargarEditarUmedida(<?php echo $u['idumedida']; ?>); return false;"><i id="btneditar" class="fa-solid fa-pen-to-square"></i></a>
                    &nbsp;&nbsp; &nbsp;
                    <a href="#" title="Eliminar" onclick="eliminarUmedida(<?php echo $u['idumedida']; ?>); return false;"><i id="btneliminar" class="fa-solid fa-trash"></i></a>
                </td>
            </tr>
        <?php endforeach; ?>
    </tbody>
</table>