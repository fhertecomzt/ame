<?php
session_start();
//Restricción por rol
if (!isset($_SESSION['idusuario']) || ($_SESSION["rol"] !== "SISTEMAS" && $_SESSION["rol"] !== "GERENCIA")) {
    header("Location: ../../index.php");
    exit;
}

include "../conexion.php";

function obtenerColores($dbh)
{
    $stmt = $dbh->prepare("SELECT * FROM colores");
    $stmt->execute();
    return $stmt->fetchAll(PDO::FETCH_ASSOC);
}

function obtenerColor($dbh, $idcolor)
{
    $stmt = $dbh->prepare("SELECT * FROM colores WHERE idcolor = :idcolor");
    $stmt->bindParam(':idcolor', $idcolor);
    $stmt->execute();
    return $stmt->fetch(PDO::FETCH_ASSOC);
}

function crearColor($dbh, $data)
{
    // Validación de datos
    if (empty($data['nomcolor'])) {
        return false;
    }
    $stmt = $dbh->prepare("INSERT INTO colores (nomcolor, desccolor) VALUES (:nomcolor, :desccolor)");

    $params = [
        ':nomcolor' => $data['nomcolor'],
        ':desccolor' => $data['desccolor'],
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

function actualizarColor($dbh, $data)
{
    $stmt = $dbh->prepare("UPDATE colores SET nomcolor = :nomcolor, desccolor = :desccolor WHERE idcolor = :idcolor");
    return $stmt->execute($data);
}

function eliminarColor($dbh, $idcolor)
{
    $stmt = $dbh->prepare("DELETE FROM colores WHERE idcolor = :idcolor");
    $stmt->bindParam(':idcolor', $idcolor);
    return $stmt->execute();
}

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $nomcolor = filter_input(INPUT_POST, 'nomcolor', FILTER_SANITIZE_FULL_SPECIAL_CHARS);
    $desccolor = filter_input(INPUT_POST, 'desccolor', FILTER_SANITIZE_FULL_SPECIAL_CHARS);
    $idcolor = filter_input(INPUT_POST, 'idcolor', FILTER_SANITIZE_NUMBER_INT); // Obtener el ID del usuario

    if (empty($nomcolor) || strlen($nomcolor) < 4) {
        $error = "El nombre del color debe tener al menos 4 caracteres.";
    } elseif (empty(trim($nomcolor))) {
        $error = "Los campos no pueden estar vacios";
    } else {

        $data = [
            ':nomcolor' => $nomcolor,
            ':desccolor' => $desccolor,
            ':idcolor' => $idcolor
        ];

        if ($idcolor) {
            // Actualizar color
            $data[':idcolor'] = $idcolor;
            if (actualizarColor($dbh, $data)) {
                $success = "Color actualizado exitosamente";
            } else {
                $error = "Error al actualizar la Color"
                    . implode(", ", $stmt->errorInfo());
            }
        } else {
            // Crear nueva Color, todos los campos a insertar
            if (crearColor($dbh, ['nomcolor' => $nomcolor, 'desccolor' => $desccolor])) {
                $success = "Color creada exitosamente";
            } else {
                $error = "Error al crear el Color";
            }
        }
    }
}

if (isset($_GET['action']) && $_GET['action'] == 'delete' && isset($_GET['idcolor'])) {
    if (eliminarColor($dbh, filter_input(INPUT_GET, 'idcolor', FILTER_SANITIZE_NUMBER_INT))) {
        $success = "Color eliminado exitosamente";
    } else {
        $error = "Error al eliminar el Color";
    }
}

$colores = obtenerColores($dbh);
$nomcolor = isset($_GET['idcolor']) ? obtenerColor($dbh, filter_input(INPUT_GET, 'idcolor', FILTER_SANITIZE_NUMBER_INT)) : null;
?>

<div class="container">
    <div class="tittle">Formulario de Colores</div>
    <?php include "../mensajeestado.php"; ?>
    <form method="post" action="colores.php" id="frmColores">
        <input type="hidden" name="idcolor" value="<?php echo htmlspecialchars($nomcolor['idcolor'] ?? ''); ?>">
        <div class="form-group">
            <span>Color:</span>
            <input type="text" id="nomcolor" name="nomcolor" autocomplete="off" placeholder="Debe contener al menos 4 caracteres" value="<?php echo htmlspecialchars($nomcolor['nomcolor'] ?? ''); ?>" required>
        </div>
        <div class="form-group">
            <span>Descripción:</span>
            <input type="text" id="desccolor" name="desccolor" autocomplete="off" value="<?php echo htmlspecialchars($nomcolor['desccolor'] ?? ''); ?>">
        </div>
        <div class="button">
            <input type="button" id="botonNuevo" onclick="limpiarFormularioColores(); cambiarTextoBoton();" value="Nuevo">
        </div>
        <div class="button">
            <input type="submit" id="botonGuardarActualizar" value="<?php echo isset($nomcolor) ? 'Actualizar' : 'Guardar'; ?>"></input>
        </div>
    </form>
</div>

<h3>Lista de Colores</h3>
<table border="1">
    <thead>
        <tr>
            <th>Id</th>
            <th>Color</th>
            <th>Descripción</th>
            <th>Acciones</th>
        </tr>
    </thead>
    <tbody>
        <?php foreach ($colores as $u): ?>
            <tr>
                <td><?php echo $u['idcolor']; ?></td>
                <td><?php echo htmlspecialchars($u['nomcolor']); ?></td>
                <td><?php echo htmlspecialchars($u['desccolor']); ?></td>
                <td>
                    <a href="#" title="Editar" onclick="cargarEditarColor(<?php echo $u['idcolor']; ?>); return false;"><i id="btneditar" class="fa-solid fa-pen-to-square"></i></a>
                    &nbsp;&nbsp; &nbsp;
                    <a href="#" title="Eliminar" onclick="eliminarColor(<?php echo $u['idcolor']; ?>); return false;"><i id="btneliminar" class="fa-solid fa-trash"></i></a>
                </td>
            </tr>
        <?php endforeach; ?>
    </tbody>
</table>