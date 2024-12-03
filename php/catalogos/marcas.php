<?php
session_start();
//Restricción por rol
if (!isset($_SESSION['idusuario']) || ($_SESSION["rol"] !== "SISTEMAS" && $_SESSION["rol"] !== "GERENCIA")) {
    header("Location: ../../index.php");
    exit;
}

include "../conexion.php";

function obtenerMarcas($dbh)
{
    $stmt = $dbh->prepare("SELECT * FROM marcas");
    $stmt->execute();
    return $stmt->fetchAll(PDO::FETCH_ASSOC);
}

function obtenerMarca($dbh, $idmarca)
{
    $stmt = $dbh->prepare("SELECT * FROM marcas WHERE idmarca = :idmarca");
    $stmt->bindParam(':idmarca', $idmarca);
    $stmt->execute();
    return $stmt->fetch(PDO::FETCH_ASSOC);
}

function crearMarca($dbh, $data)
{
    // Validación de datos
    if (empty($data['nommarca'])) {
        return false;
    }
    $stmt = $dbh->prepare("INSERT INTO marcas (nommarca, descmarca) VALUES (:nommarca, :descmarca)");

    $params = [
        ':nommarca' => $data['nommarca'],
        ':descmarca' => $data['descmarca'],
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

function actualizarMarca($dbh, $data)
{
    $stmt = $dbh->prepare("UPDATE marcas SET nommarca = :nommarca, descmarca = :descmarca WHERE idmarca = :idmarca");
    return $stmt->execute($data);
}

function eliminarMarca($dbh, $idmarca)
{
    $stmt = $dbh->prepare("DELETE FROM marcas WHERE idmarca = :idmarca");
    $stmt->bindParam(':idmarca', $idmarca);
    return $stmt->execute();
}

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $nommarca = filter_input(INPUT_POST, 'nommarca', FILTER_SANITIZE_FULL_SPECIAL_CHARS);
    $descmarca = filter_input(INPUT_POST, 'descmarca', FILTER_SANITIZE_FULL_SPECIAL_CHARS);
    $idmarca = filter_input(INPUT_POST, 'idmarca', FILTER_SANITIZE_NUMBER_INT); // Obtener el ID del usuario

    if (empty($nommarca) || strlen($nommarca) < 4) {
        $error = "El nombre de la marca debe tener al menos 4 caracteres.";
    } elseif (empty(trim($nommarca))) {
        $error = "Los campos no pueden estar vacios";
    } else {

        $data = [
            ':nommarca' => $nommarca,
            ':descmarca' => $descmarca,
            ':idmarca' => $idmarca
        ];

        if ($idmarca) {
            // Actualizar marca
            $data[':idmarca'] = $idmarca;
            if (actualizarMarca($dbh, $data)) {
                $success = "Marca actualizado exitosamente";
            } else {
                $error = "Error al actualizar la Marca"
                    . implode(", ", $stmt->errorInfo());
            }
        } else {
            // Crear nueva Marca, todos los campos a insertar
            if (crearMarca($dbh, ['nommarca' => $nommarca, 'descmarca' => $descmarca])) {
                $success = "Marca creada exitosamente";
            } else {
                $error = "Error al crear el Marca";
            }
        }
    }
}

if (isset($_GET['action']) && $_GET['action'] == 'delete' && isset($_GET['idmarca'])) {
    if (eliminarMarca($dbh, filter_input(INPUT_GET, 'idmarca', FILTER_SANITIZE_NUMBER_INT))) {
        $success = "Marca eliminado exitosamente";
    } else {
        $error = "Error al eliminar el Marca";
    }
}

$marcas = obtenerMarcas($dbh);
$nommarca = isset($_GET['idmarca']) ? obtenerMarca($dbh, filter_input(INPUT_GET, 'idmarca', FILTER_SANITIZE_NUMBER_INT)) : null;
?>

<div class="container">
    <div class="tittle">Formulario de Marcas</div>
    <?php include "../mensajeestado.php"; ?>
    <form method="post" action="marcas.php" id="frmMarcas">
        <input type="hidden" name="idmarca" value="<?php echo htmlspecialchars($nommarca['idmarca'] ?? ''); ?>">
        <div class="form-group">
            <span>Marca:</span>
            <input type="text" id="nommarca" name="nommarca" autocomplete="off" placeholder="Debe contener al menos 4 caracteres" value="<?php echo htmlspecialchars($nommarca['nommarca'] ?? ''); ?>" required>
        </div>
        <div class="form-group">
            <span>Descripción:</span>
            <input type="text" id="descmarca" name="descmarca" autocomplete="off" value="<?php echo htmlspecialchars($nommarca['descmarca'] ?? ''); ?>">
        </div>
        <div class="button">
            <input type="button" id="botonNuevo" onclick="limpiarFormularioMarcas(); cambiarTextoBoton();" value="Nuevo">
        </div>
        <div class="button">
            <input type="submit" id="botonGuardarActualizar" value="<?php echo isset($nommarca) ? 'Actualizar' : 'Guardar'; ?>"></input>
        </div>
    </form>
</div>

<h3>Lista de Marcas</h3>
<table border="1">
    <thead>
        <tr>
            <th>Id</th>
            <th>Marca</th>
            <th>Descripción</th>
            <th>Acciones</th>
        </tr>
    </thead>
    <tbody>
        <?php foreach ($marcas as $u): ?>
            <tr>
                <td><?php echo $u['idmarca']; ?></td>
                <td><?php echo htmlspecialchars($u['nommarca']); ?></td>
                <td><?php echo htmlspecialchars($u['descmarca']); ?></td>
                <td>
                    <a href="#" title="Editar" onclick="cargarEditarMarca(<?php echo $u['idmarca']; ?>); return false;"><i id="btneditar" class="fa-solid fa-pen-to-square"></i></a>
                    &nbsp;&nbsp; &nbsp;
                    <a href="#" title="Eliminar" onclick="eliminarMarca(<?php echo $u['idmarca']; ?>); return false;"><i id="btneliminar" class="fa-solid fa-trash"></i></a>
                </td>
            </tr>
        <?php endforeach; ?>
    </tbody>
</table>