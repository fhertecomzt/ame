<?php
session_start();
//Restricción por rol
if (!isset($_SESSION['idusuario']) || ($_SESSION["rol"] !== "SISTEMAS" && $_SESSION["rol"] !== "GERENCIA")) {
    header("Location: ../../index.php");
    exit;
}

include "../conexion.php";

function obtenerCategorias($dbh)
{
    $stmt = $dbh->prepare("SELECT * FROM categorias");
    $stmt->execute();
    return $stmt->fetchAll(PDO::FETCH_ASSOC);
}

function obtenerCategoria($dbh, $idcategoria)
{
    $stmt = $dbh->prepare("SELECT * FROM categorias WHERE idcategoria = :idcategoria");
    $stmt->bindParam(':idcategoria', $idcategoria);
    $stmt->execute();
    return $stmt->fetch(PDO::FETCH_ASSOC);
}

function crearCategoria($dbh, $data)
{
    // Validación de datos
    if (empty($data['nomcategoria'])) {
        return false;
    }
    $stmt = $dbh->prepare("INSERT INTO categorias (nomcategoria, desccategoria) VALUES (:nomcategoria, :desccategoria)");

    $params = [
        ':nomcategoria' => $data['nomcategoria'],
        ':desccategoria' => $data['desccategoria'],
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

function actualizarCategoria($dbh, $data)
{
    $stmt = $dbh->prepare("UPDATE categorias SET nomcategoria = :nomcategoria, desccategoria = :desccategoria WHERE idcategoria = :idcategoria");
    return $stmt->execute($data);
}

function eliminarCategoria($dbh, $idcategoria)
{
    $stmt = $dbh->prepare("DELETE FROM categorias WHERE idcategoria = :idcategoria");
    $stmt->bindParam(':idcategoria', $idcategoria);
    return $stmt->execute();
}

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $nomcategoria = filter_input(INPUT_POST, 'nomcategoria', FILTER_SANITIZE_FULL_SPECIAL_CHARS);
    $desccategoria = filter_input(INPUT_POST, 'desccategoria', FILTER_SANITIZE_FULL_SPECIAL_CHARS);
    $idcategoria = filter_input(INPUT_POST, 'idcategoria', FILTER_SANITIZE_NUMBER_INT); // Obtener el ID del usuario

    if (empty($nomcategoria) || strlen($nomcategoria) < 4) {
        $error = "El nombre de la categoria debe tener al menos 4 caracteres.";
    } elseif (empty(trim($nomcategoria))) {
        $error = "Los campos no pueden estar vacios";
    } else {

        $data = [
            ':nomcategoria' => $nomcategoria,
            ':desccategoria' => $desccategoria,
            ':idcategoria' => $idcategoria
        ];

        if ($idcategoria) {
            // Actualizar categoria
            $data[':idcategoria'] = $idcategoria;
            if (actualizarCategoria($dbh, $data)) {
                $success = "Categoria actualizado exitosamente";
            } else {
                $error = "Error al actualizar la Categoria"
                    . implode(", ", $stmt->errorInfo());
            }
        } else {
            // Crear nueva Categoria, todos los campos a insertar
            if (crearCategoria($dbh, ['nomcategoria' => $nomcategoria, 'desccategoria' => $desccategoria])) {
                $success = "Categoria creada exitosamente";
            } else {
                $error = "Error al crear el Categoria";
            }
        }
    }
}

if (isset($_GET['action']) && $_GET['action'] == 'delete' && isset($_GET['idcategoria'])) {
    if (eliminarCategoria($dbh, filter_input(INPUT_GET, 'idcategoria', FILTER_SANITIZE_NUMBER_INT))) {
        $success = "Categoria eliminado exitosamente";
    } else {
        $error = "Error al eliminar el Categoria";
    }
}

$categorias = obtenerCategorias($dbh);
$nomcategoria = isset($_GET['idcategoria']) ? obtenerCategoria($dbh, filter_input(INPUT_GET, 'idcategoria', FILTER_SANITIZE_NUMBER_INT)) : null;
?>

<div class="container">
    <div class="tittle">Formulario de Categorias</div>
    <?php include "../mensajeestado.php"; ?>
    <form method="post" action="categorias.php" id="frmCategorias">
        <input type="hidden" name="idcategoria" value="<?php echo htmlspecialchars($nomcategoria['idcategoria'] ?? ''); ?>">
        <div class="form-group">
            <span>Categoria:</span>
            <input type="text" id="nomcategoria" name="nomcategoria" autocomplete="off" placeholder="Debe contener al menos 4 caracteres" value="<?php echo htmlspecialchars($nomcategoria['nomcategoria'] ?? ''); ?>" required>
        </div>
        <div class="form-group">
            <span>Descripción:</span>
            <input type="text" id="desccategoria" name="desccategoria" autocomplete="off" value="<?php echo htmlspecialchars($nomcategoria['desccategoria'] ?? ''); ?>">
        </div>
        <div class="button">
            <input type="button" id="botonNuevo" onclick="limpiarFormularioCategorias(); cambiarTextoBoton();" value="Nuevo">
        </div>
        <div class="button">
            <input type="submit" id="botonGuardarActualizar" value="<?php echo isset($nomcategoria) ? 'Actualizar' : 'Guardar'; ?>"></input>
        </div>
    </form>
</div>

<h3>Lista de Categorias</h3>
<table border="1">
    <thead>
        <tr>
            <th>Id</th>
            <th>Categoria</th>
            <th>Descripción</th>
            <th>Acciones</th>
        </tr>
    </thead>
    <tbody>
        <?php foreach ($categorias as $u): ?>
            <tr>
                <td><?php echo $u['idcategoria']; ?></td>
                <td><?php echo htmlspecialchars($u['nomcategoria']); ?></td>
                <td><?php echo htmlspecialchars($u['desccategoria']); ?></td>
                <td>
                    <a href="#" title="Editar" onclick="cargarEditarCategoria(<?php echo $u['idcategoria']; ?>); return false;"><i id="btneditar" class="fa-solid fa-pen-to-square"></i></a>
                    &nbsp;&nbsp; &nbsp;
                    <a href="#" title="Eliminar" onclick="eliminarCategoria(<?php echo $u['idcategoria']; ?>); return false;"><i id="btneliminar" class="fa-solid fa-trash"></i></a>
                </td>
            </tr>
        <?php endforeach; ?>
    </tbody>
</table>