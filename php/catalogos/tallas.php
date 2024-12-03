<?php
session_start();
//Restricción por rol
if (!isset($_SESSION['idusuario']) || ($_SESSION["rol"] !== "SISTEMAS" && $_SESSION["rol"] !== "GERENCIA")) {
    header("Location: ../../index.php");
    exit;
}

include "../conexion.php";

function obtenerTallas($dbh)
{
    $stmt = $dbh->prepare("SELECT * FROM tallas");
    $stmt->execute();
    return $stmt->fetchAll(PDO::FETCH_ASSOC);
}

function obtenerTalla($dbh, $idtalla)
{
    $stmt = $dbh->prepare("SELECT * FROM tallas WHERE idtalla = :idtalla");
    $stmt->bindParam(':idtalla', $idtalla);
    $stmt->execute();
    return $stmt->fetch(PDO::FETCH_ASSOC);
}

function crearTalla($dbh, $data)
{
    // Validación de datos
    if (empty($data['nomtalla'])) {
        return false;
    }
    $stmt = $dbh->prepare("INSERT INTO tallas (nomtalla, desctalla) VALUES (:nomtalla, :desctalla)");

    $params = [
        ':nomtalla' => $data['nomtalla'],
        ':desctalla' => $data['desctalla'],
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

function actualizarTalla($dbh, $data)
{
    $stmt = $dbh->prepare("UPDATE tallas SET nomtalla = :nomtalla, desctalla = :desctalla WHERE idtalla = :idtalla");
    return $stmt->execute($data);
}

function eliminarTalla($dbh, $idtalla)
{
    $stmt = $dbh->prepare("DELETE FROM tallas WHERE idtalla = :idtalla");
    $stmt->bindParam(':idtalla', $idtalla);
    return $stmt->execute();
}

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $nomtalla = filter_input(INPUT_POST, 'nomtalla', FILTER_SANITIZE_FULL_SPECIAL_CHARS);
    $desctalla = filter_input(INPUT_POST, 'desctalla', FILTER_SANITIZE_FULL_SPECIAL_CHARS);
    $idtalla = filter_input(INPUT_POST, 'idtalla', FILTER_SANITIZE_NUMBER_INT); // Obtener el ID del usuario

    if (empty($nomtalla) || strlen($nomtalla) < 4) {
        $error = "El nombre de la talla debe tener al menos 4 caracteres.";
    } elseif (empty(trim($nomtalla))) {
        $error = "Los campos no pueden estar vacios";
    } else {

        $data = [
            ':nomtalla' => $nomtalla,
            ':desctalla' => $desctalla,
            ':idtalla' => $idtalla
        ];

        if ($idtalla) {
            // Actualizar talla
            $data[':idtalla'] = $idtalla;
            if (actualizarTalla($dbh, $data)) {
                $success = "Talla actualizado exitosamente";
            } else {
                $error = "Error al actualizar la Talla"
                    . implode(", ", $stmt->errorInfo());
            }
        } else {
            // Crear nueva Talla, todos los campos a insertar
            if (crearTalla($dbh, ['nomtalla' => $nomtalla, 'desctalla' => $desctalla])) {
                $success = "Talla creada exitosamente";
            } else {
                $error = "Error al crear el Talla";
            }
        }
    }
}

if (isset($_GET['action']) && $_GET['action'] == 'delete' && isset($_GET['idtalla'])) {
    if (eliminarTalla($dbh, filter_input(INPUT_GET, 'idtalla', FILTER_SANITIZE_NUMBER_INT))) {
        $success = "Talla eliminado exitosamente";
    } else {
        $error = "Error al eliminar el Talla";
    }
}

$tallas = obtenerTallas($dbh);
$nomtalla = isset($_GET['idtalla']) ? obtenerTalla($dbh, filter_input(INPUT_GET, 'idtalla', FILTER_SANITIZE_NUMBER_INT)) : null;
?>

<div class="container">
    <div class="tittle">Formulario de Tallas</div>
    <?php include "../mensajeestado.php"; ?>
    <form method="post" action="tallas.php" id="frmTallas">
        <input type="hidden" name="idtalla" value="<?php echo htmlspecialchars($nomtalla['idtalla'] ?? ''); ?>">
        <div class="form-group">
            <span>Talla:</span>
            <input type="text" id="nomtalla" name="nomtalla" autocomplete="off" placeholder="Debe contener al menos 4 caracteres" value="<?php echo htmlspecialchars($nomtalla['nomtalla'] ?? ''); ?>" required>
        </div>
        <div class="form-group">
            <span>Descripción:</span>
            <input type="text" id="desctalla" name="desctalla" autocomplete="off" value="<?php echo htmlspecialchars($nomtalla['desctalla'] ?? ''); ?>">
        </div>
        <div class="button">
            <input type="button" id="botonNuevo" onclick="limpiarFormularioTallas(); cambiarTextoBoton();" value="Nuevo">
        </div>
        <div class="button">
            <input type="submit" id="botonGuardarActualizar" value="<?php echo isset($nomtalla) ? 'Actualizar' : 'Guardar'; ?>"></input>
        </div>
    </form>
</div>

<h3>Lista de Tallas</h3>
<table border="1">
    <thead>
        <tr>
            <th>Id</th>
            <th>Talla</th>
            <th>Descripción</th>
            <th>Acciones</th>
        </tr>
    </thead>
    <tbody>
        <?php foreach ($tallas as $u): ?>
            <tr>
                <td><?php echo $u['idtalla']; ?></td>
                <td><?php echo htmlspecialchars($u['nomtalla']); ?></td>
                <td><?php echo htmlspecialchars($u['desctalla']); ?></td>
                <td>
                    <a href="#" title="Editar" onclick="cargarEditarTalla(<?php echo $u['idtalla']; ?>); return false;"><i id="btneditar" class="fa-solid fa-pen-to-square"></i></a>
                    &nbsp;&nbsp; &nbsp;
                    <a href="#" title="Eliminar" onclick="eliminarTalla(<?php echo $u['idtalla']; ?>); return false;"><i id="btneliminar" class="fa-solid fa-trash"></i></a>
                </td>
            </tr>
        <?php endforeach; ?>
    </tbody>
</table>