<?php
session_start();
//Restricción por rol
if (!isset($_SESSION['idusuario']) || ($_SESSION["rol"] !== "SISTEMAS" && $_SESSION["rol"] !== "GERENCIA")) {
    header("Location: ../logout.php");
    exit;
}

include "../conexion.php";

function obtenerProveedores($dbh)
{
    $stmt = $dbh->prepare("SELECT * FROM proveedores");
    $stmt->execute();
    return $stmt->fetchAll(PDO::FETCH_ASSOC);
}

function obtenerProveedor($dbh, $idproveedor)
{
    $stmt = $dbh->prepare("SELECT * FROM proveedores WHERE idproveedor = :idproveedor");
    $stmt->bindParam(':idproveedor', $idproveedor);
    $stmt->execute();
    return $stmt->fetch(PDO::FETCH_ASSOC);
}

function crearProveedor($dbh, $data)
{
    // Validación de datos
    if (empty($data['nomproveedor']) || empty($data['celproveedor']) || empty($data['emailproveedor'])) {
        return false;
    }

    $stmt = $dbh->prepare("INSERT INTO proveedores (nomproveedor, contacproveedor, rfcproveedor, telproveedor, celproveedor, emailproveedor, limitecredproveedor, dicredproveedor) VALUES (:nomproveedor, :contacproveedor, :rfcproveedor, :telproveedor, :celproveedor, :emailproveedor, :limitecredproveedor, :dicredproveedor)");

    $params = [
        ':nomproveedor' => $data['nomproveedor'],
        ':contacproveedor' => $data['contacproveedor'],
        ':rfcproveedor' => $data['rfcproveedor'],
        ':telproveedor' => $data['telproveedor'],
        ':celproveedor' => $data['celproveedor'],
        ':emailproveedor' => $data['emailproveedor'],
        ':limitecredproveedor' => $data['limitecredproveedor'],
        ':dicredproveedor' => $data['dicredproveedor']
    ];
    // var_dump($params); Aquí verificamos si manda todos los datos esperados

    if ($stmt->execute($params)) {
        return true; //Indicamos que tuvimos exito
    } else {
        $errorInfo = $stmt->errorInfo();
        error_log(print_r($errorInfo, true)); // Esto te ayudará a ver el error en el log
        return false;
    }
}

function actualizarProveedor($dbh, $data)
{
    $stmt = $dbh->prepare("UPDATE proveedores SET nomproveedor = :nomproveedor, contacproveedor = :contacproveedor, rfcproveedor = :rfcproveedor, telproveedor = :telproveedor, celproveedor = :celproveedor, emailproveedor = :emailproveedor, limitecredproveedor = :limitecredproveedor, dicredproveedor = :dicredproveedor WHERE idproveedor = :idproveedor");
    return $stmt->execute($data);
}


function eliminarProveedor($dbh, $idproveedor)
{
    $stmt = $dbh->prepare("DELETE FROM proveedores WHERE idproveedor = :idproveedor");
    $stmt->bindParam(':idproveedor', $idproveedor);
    return $stmt->execute();
}

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    // Recoger y limpiar los datos del formulario
    $nomproveedor = filter_input(INPUT_POST, 'nomproveedor', FILTER_SANITIZE_FULL_SPECIAL_CHARS);
    $contacproveedor = filter_input(INPUT_POST, 'contacproveedor', FILTER_SANITIZE_FULL_SPECIAL_CHARS);
    $rfcproveedor = filter_input(INPUT_POST, 'rfcproveedor', FILTER_SANITIZE_FULL_SPECIAL_CHARS);
    $telproveedor = filter_input(INPUT_POST, 'telproveedor', FILTER_SANITIZE_FULL_SPECIAL_CHARS);
    $celproveedor = filter_input(INPUT_POST, 'celproveedor', FILTER_SANITIZE_NUMBER_INT);
    $emailproveedor = filter_input(
        INPUT_POST,
        'emailproveedor',
        FILTER_SANITIZE_EMAIL
    );
    //Validación para email
    if (!filter_var($emailproveedor, FILTER_VALIDATE_EMAIL)) {
        $error = "El email no es válido.";
    }
    $limitecredproveedor = filter_input(INPUT_POST, 'limitecredproveedor', FILTER_SANITIZE_FULL_SPECIAL_CHARS);
    $dicredproveedor = filter_input(INPUT_POST, 'dicredproveedor', FILTER_SANITIZE_NUMBER_INT);
    $idproveedor = filter_input(INPUT_POST, 'idproveedor', FILTER_SANITIZE_NUMBER_INT); // Obtener el ID del proveedor

    //Validaciones de datos
    if (empty($nomproveedor) || empty($celproveedor) || empty($emailproveedor)) {
        $error = "Todos los campos con * son obligatorios.";
    } elseif (empty($nomproveedor) || strlen($nomproveedor) < 4) {
        $error = "El nombre de proveedor debe tener al menos 4 caracteres.";
    } else {
        $data = [
            'nomproveedor' => $nomproveedor,
            'contacproveedor' => $contacproveedor,
            'rfcproveedor' => $rfcproveedor,
            'telproveedor' => $telproveedor,
            'celproveedor' => $celproveedor,
            'emailproveedor' => $emailproveedor,
            'limitecredproveedor' => $limitecredproveedor,
            'dicredproveedor' => $dicredproveedor
        ];


        // Actualizar proveedor
        // Verificar si se está actualizando o creando un nuevo proveedor
        if ($idproveedor) {
            // Actualizar Proveedor
            $data[':idproveedor'] = $idproveedor; // Agregar el ID del usuario para la actualización
            if (actualizarProveedor($dbh, $data)) {
                $success = "Provedor actualizado exitosamente";
            } else {
                $error = "Error al actualizar Proveedor: " . implode(", ", $stmt->errorInfo());
            }
        } else {
            // Crear nuevo proveedor
            if (crearProveedor($dbh, $data)) {
                $success = "Proveedor creado exitosamente";
            } else {
                $error = "Error al crear el proveedor";
            }
        }
    }
}


if (isset($_GET['action']) && $_GET['action'] == 'delete' && isset($_GET['idproveedor'])) {
    if (eliminarProveedor($dbh, filter_input(INPUT_GET, 'idproveedor', FILTER_SANITIZE_NUMBER_INT))) {
        $success = "Proveedor eliminado exitosamente";
    } else {
        $error = "Error al eliminar el proveedor";
    }
}

$proveedores = obtenerProveedores($dbh);
$proveedor = isset($_GET['idproveedor']) ? obtenerProveedor($dbh, filter_input(INPUT_GET, 'idproveedor', FILTER_SANITIZE_NUMBER_INT)) : null;
//var_dump($proveedor); Comprobamos los datos del proveedor
?>

<div class="container">
    <div class="tittle">Formulario de Proveedores</div>
    <!--Incluimos archivo de mensajes de estado para saber si es exito o error-->
    <?php include "../mensajeestado.php"; ?>

    <form method="post" action="proveedores.php" id="frmProveedores">
        <input type="hidden" name="idproveedor" value="<?php echo $proveedor['idproveedor'] ?? ''; ?>">
        <div class="form-group">
            <span class="is-required">Nombre Proveedor:</span>
            <input type="text" id="nomproveedor" name="nomproveedor" placeholder="Debe contener al menos 4 caracteres" value="<?php echo htmlspecialchars($proveedor['nomproveedor'] ?? ''); ?>" required>
        </div>
        <div class="form-group">
            <span>Contacto:</span>
            <input type="text" id="contacproveedor" name="contacproveedor" value="<?php echo htmlspecialchars($proveedor['contacproveedor'] ?? ''); ?>">
        </div>
        <div class="form-group">
            <span>R.F.C.:</span>
            <input type="text" id="rfcproveedor" name="rfcproveedor" value="<?php echo htmlspecialchars($proveedor['rfcproveedor'] ?? ''); ?>">
        </div>
        <div class="form-group">
            <span>Télefono:</span>
            <input type="number" id="telproveedor" name="telproveedor" value="<?php echo htmlspecialchars($proveedor['telproveedor'] ?? ''); ?>">
        </div>
        <div class="form-group">
            <span class="is-required">Celular:</span>
            <input type="number" id="celproveedor" name="celproveedor" value="<?php echo htmlspecialchars($proveedor['celproveedor'] ?? ''); ?>" required>
        </div>
        <div class="form-group">
            <span class="is-required">Email:</span>
            <input type="email" id="emailproveedor" name="emailproveedor" value="<?php echo htmlspecialchars($proveedor['emailproveedor'] ?? ''); ?>" required>
        </div>
        <div class="form-group">
            <span>Limite de credito:</span>
            <input type="number" id="limitecredproveedor" name="limitecredproveedor" value="<?php echo htmlspecialchars($proveedor['limitecredproveedor'] ?? ''); ?>">
        </div>
        <div class="form-group">
            <span>Días de credito:</span>
            <!--Limitamos a los 365 días de un año y a solo 3 digitos-->
            <input type="number" id="dicredproveedor" name="dicredproveedor" value="<?php echo htmlspecialchars($proveedor['dicredproveedor'] ?? ''); ?>" max="365" oninput="if(this.value.length > 3) this.value = this.value.slice(0, 3);">
        </div>

        <div class="button">
            <input type="button" id="botonNuevo" onclick="limpiarFormularioProveedores(); cambiarTextoBoton();" value="Nuevo">
        </div>
        <div class="button">
            <input type="submit" id="botonGuardarActualizar" value="<?php echo isset($proveedor) ? 'Actualizar' : 'Guardar'; ?>"></input>
        </div>
    </form>
</div>

<h3>Lista de Proveedores</h3>
<table border="1">
    <thead>
        <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Contacto</th>
            <th>Teléfono</th>
            <th>Celular</th>
            <th>Limite de credito</th>
            <th>Días de credito</th>
            <th>Acciones</th>
            <th></th>
        </tr>
    </thead>
    <tbody>
        <?php foreach ($proveedores as $u): ?>
            <tr>
                <td><?php echo $u['idproveedor']; ?></td>
                <td><?php echo htmlspecialchars($u['nomproveedor']); ?></td>
                <td><?php echo htmlspecialchars($u['contacproveedor']); ?></td>
                <td><?php echo htmlspecialchars($u['telproveedor']); ?></td>
                <td><?php echo htmlspecialchars($u['celproveedor']); ?></td>
                <td><?php echo htmlspecialchars($u['limitecredproveedor']); ?></td>
                <td><?php echo htmlspecialchars($u['dicredproveedor']); ?></td>
                <td>
                    <a href="#" title="Editar" onclick="cargarEditarProveedor(<?php echo $u['idproveedor']; ?>); return false;"><i id="btneditar" class="fa-solid fa-pen-to-square"></i></a>
                    &nbsp;&nbsp; &nbsp;

                    <a href="#" title="Eliminar" onclick="eliminarProveedor(<?php echo $u['idproveedor']; ?>); return false;"><i id="btneliminar" class="fa-solid fa-trash"></i></a>
                </td>
            </tr>
        <?php endforeach; ?>
    </tbody>
</table>