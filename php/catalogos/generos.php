<?php
session_start();
//Restricción por rol
if (!isset($_SESSION['idusuario']) || ($_SESSION["rol"] !== "SISTEMAS" && $_SESSION["rol"] !== "GERENCIA")) {
    header("Location: ../../index.php");
    exit;
}

include "../conexion.php";

function obtenerGeneros($dbh)
{
    $stmt = $dbh->prepare("SELECT * FROM generos");
    $stmt->execute();
    return $stmt->fetchAll(PDO::FETCH_ASSOC);
}

function obtenerGenero($dbh, $idgenero)
{
    $stmt = $dbh->prepare("SELECT * FROM generos WHERE idgenero = :idgenero");
    $stmt->bindParam(':idgenero', $idgenero);
    $stmt->execute();
    return $stmt->fetch(PDO::FETCH_ASSOC);
}

function crearGenero($dbh, $data)
{
    // Validación de datos
    if (empty($data['nomgenero'])) {
        return false;
    }
    $stmt = $dbh->prepare("INSERT INTO generos (nomgenero, descgenero) VALUES (:nomgenero, :descgenero)");

    $params = [
        ':nomgenero' => $data['nomgenero'],
        ':descgenero' => $data['descgenero'],
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

function actualizarGenero($dbh, $data)
{
    $stmt = $dbh->prepare("UPDATE generos SET nomgenero = :nomgenero, descgenero = :descgenero WHERE idgenero = :idgenero");
    return $stmt->execute($data);
}

function eliminarGenero($dbh, $idgenero)
{
    $stmt = $dbh->prepare("DELETE FROM generos WHERE idgenero = :idgenero");
    $stmt->bindParam(':idgenero', $idgenero);
    return $stmt->execute();
}

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $nomgenero = filter_input(INPUT_POST, 'nomgenero', FILTER_SANITIZE_FULL_SPECIAL_CHARS);
    $descgenero = filter_input(INPUT_POST, 'descgenero', FILTER_SANITIZE_FULL_SPECIAL_CHARS);
    $idgenero = filter_input(INPUT_POST, 'idgenero', FILTER_SANITIZE_NUMBER_INT); // Obtener el ID del usuario

    if (empty($nomgenero) || strlen($nomgenero) < 4) {
        $error = "El nombre del genero debe tener al menos 4 caracteres.";
    } elseif (empty(trim($nomgenero))) {
        $error = "Los campos no pueden estar vacios";
    } else {

        $data = [
            ':nomgenero' => $nomgenero,
            ':descgenero' => $descgenero,
            ':idgenero' => $idgenero
        ];

        if ($idgenero) {
            // Actualizar genero
            $data[':idgenero'] = $idgenero;
            if (actualizarGenero($dbh, $data)) {
                $success = "Genero actualizado exitosamente";
            } else {
                $error = "Error al actualizar la Genero"
                    . implode(", ", $stmt->errorInfo());
            }
        } else {
            // Crear nueva Genero, todos los campos a insertar
            if (crearGenero($dbh, ['nomgenero' => $nomgenero, 'descgenero' => $descgenero])) {
                $success = "Genero creada exitosamente";
            } else {
                $error = "Error al crear el Genero";
            }
        }
    }
}

if (isset($_GET['action']) && $_GET['action'] == 'delete' && isset($_GET['idgenero'])) {
    if (eliminarGenero($dbh, filter_input(INPUT_GET, 'idgenero', FILTER_SANITIZE_NUMBER_INT))) {
        $success = "Genero eliminado exitosamente";
    } else {
        $error = "Error al eliminar el Genero";
    }
}

$generos = obtenerGeneros($dbh);
$nomgenero = isset($_GET['idgenero']) ? obtenerGenero($dbh, filter_input(INPUT_GET, 'idgenero', FILTER_SANITIZE_NUMBER_INT)) : null;
?>

<div class="container">
    <div class="tittle">Formulario de Generos</div>
    <?php include "../mensajeestado.php"; ?>
    <form method="post" action="generos.php" id="frmGeneros">
        <input type="hidden" name="idgenero" value="<?php echo htmlspecialchars($nomgenero['idgenero'] ?? ''); ?>">
        <div class="form-group">
            <span>Genero:</span>
            <input type="text" id="nomgenero" name="nomgenero" autocomplete="off" placeholder="Debe contener al menos 4 caracteres" value="<?php echo htmlspecialchars($nomgenero['nomgenero'] ?? ''); ?>" required>
        </div>
        <div class="form-group">
            <span>Descripción:</span>
            <input type="text" id="descgenero" name="descgenero" autocomplete="off" value="<?php echo htmlspecialchars($nomgenero['descgenero'] ?? ''); ?>">
        </div>
        <div class="button">
            <input type="button" id="botonNuevo" onclick="limpiarFormularioGeneros(); cambiarTextoBoton();" value="Nuevo">
        </div>
        <div class="button">
            <input type="submit" id="botonGuardarActualizar" value="<?php echo isset($nomgenero) ? 'Actualizar' : 'Guardar'; ?>"></input>
        </div>
    </form>
</div>

<h3>Lista de Generos</h3>
<table border="1">
    <thead>
        <tr>
            <th>Id</th>
            <th>Genero</th>
            <th>Descripción</th>
            <th>Acciones</th>
        </tr>
    </thead>
    <tbody>
        <?php foreach ($generos as $u): ?>
            <tr>
                <td><?php echo $u['idgenero']; ?></td>
                <td><?php echo htmlspecialchars($u['nomgenero']); ?></td>
                <td><?php echo htmlspecialchars($u['descgenero']); ?></td>
                <td>
                    <a href="#" title="Editar" onclick="cargarEditarGenero(<?php echo $u['idgenero']; ?>); return false;"><i id="btneditar" class="fa-solid fa-pen-to-square"></i></a>
                    &nbsp;&nbsp; &nbsp;
                    <a href="#" title="Eliminar" onclick="eliminarGenero(<?php echo $u['idgenero']; ?>); return false;"><i id="btneliminar" class="fa-solid fa-trash"></i></a>
                </td>
            </tr>
        <?php endforeach; ?>
    </tbody>
</table>