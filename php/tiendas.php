<?php
session_start();
if (!isset($_SESSION['idusuario']) || ($_SESSION["rol"] !== "SISTEMAS")) {
    header("Location: logout.php");
    exit;
}

include "conexion.php";

function obtenerTiendas($dbh)
{
    $stmt = $dbh->prepare("SELECT * FROM tiendas");
    $stmt->execute();
    return $stmt->fetchAll(PDO::FETCH_ASSOC);
}

function obtenerTienda($dbh, $idtienda)
{
    $stmt = $dbh->prepare("SELECT * FROM tiendas WHERE idtienda = :idtienda");
    $stmt->bindParam(':idtienda', $idtienda);
    $stmt->execute();
    return $stmt->fetch(PDO::FETCH_ASSOC);
}

function crearTienda($dbh, $data)
{
    // Validación de datos
    if (empty($data['nomtienda']) || empty($data['reptienda']) || empty($data['rfctienda']) || empty($data['domtienda']) || empty($data['noexttienda']) || empty($data['nointtienda']) || empty($data['coltienda']) || empty($data['cdtienda']) || empty($data['edotienda']) || empty($data['cptienda']) || empty($data['emailtienda']) || empty($data['teltienda'])) {
        return false;
    }

    $stmt = $dbh->prepare("INSERT INTO tiendas (nomtienda, reptienda, rfctienda, domtienda, noexttienda, nointtienda, coltienda, cdtienda, edotienda, cptienda, emailtienda, teltienda) VALUES (:nomtienda, :reptienda, :rfctienda, :domtienda, :noexttienda, :nointtienda, :coltienda, :cdtienda, :edotienda, :cptienda, :emailtienda, :teltienda)");

    $params = [
        ':nomtienda' => $data['nomtienda'],
        ':reptienda' => $data['reptienda'],
        ':rfctienda' => $data['rfctienda'],
        ':domtienda' => $data['domtienda'],
        ':noexttienda' => $data['noexttienda'],
        ':nointtienda' => $data['nointtienda'],
        ':coltienda' => $data['coltienda'],
        ':cdtienda' => $data['cdtienda'],
        ':edotienda' => $data['edotienda'],
        ':cptienda' => $data['cptienda'],
        ':emailtienda' => $data['emailtienda'],
        ':teltienda' => $data['teltienda']
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

function actualizarTienda($dbh, $data)
{
    $stmt = $dbh->prepare("UPDATE tiendas SET nomtienda = :nomtienda, reptienda = :reptienda, rfctienda = :rfctienda, domtienda = :domtienda, noexttienda = :noexttienda, nointtienda = :nointtienda, coltienda = :coltienda, cdtienda = :cdtienda, edotienda = :edotienda, cptienda = :cptienda, emailtienda = :emailtienda, teltienda = :teltienda WHERE idtienda = :idtienda");
    return $stmt->execute($data);
}


function eliminarTienda($dbh, $idtienda)
{
    $stmt = $dbh->prepare("DELETE FROM tiendas WHERE idtienda = :idtienda");
    $stmt->bindParam(':idtienda', $idtienda);
    return $stmt->execute();
}

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    // Recoger y limpiar los datos del formulario
    $nomtienda = filter_input(INPUT_POST, 'nomtienda', FILTER_SANITIZE_FULL_SPECIAL_CHARS);
    $reptienda = filter_input(INPUT_POST, 'reptienda', FILTER_SANITIZE_FULL_SPECIAL_CHARS);
    $rfctienda = filter_input(INPUT_POST, 'rfctienda', FILTER_SANITIZE_FULL_SPECIAL_CHARS);
    $domtienda = filter_input(INPUT_POST, 'domtienda', FILTER_SANITIZE_FULL_SPECIAL_CHARS);
    $noexttienda = filter_input(INPUT_POST, 'noexttienda', FILTER_SANITIZE_NUMBER_INT);
    $nointtienda = filter_input(INPUT_POST, 'nointtienda', FILTER_SANITIZE_NUMBER_INT);
    $coltienda = filter_input(INPUT_POST, 'coltienda', FILTER_SANITIZE_FULL_SPECIAL_CHARS);
    $cdtienda = filter_input(INPUT_POST, 'cdtienda', FILTER_SANITIZE_FULL_SPECIAL_CHARS);
    $edotienda = filter_input(INPUT_POST, 'edotienda', FILTER_SANITIZE_FULL_SPECIAL_CHARS);
    $cptienda = filter_input(INPUT_POST, 'cptienda', FILTER_SANITIZE_FULL_SPECIAL_CHARS);
    $emailtienda = filter_input(
        INPUT_POST,
        'emailtienda',
        FILTER_SANITIZE_EMAIL
    );
    //Validación para email
    if (!filter_var($emailtienda, FILTER_VALIDATE_EMAIL)) {
        $error = "El email no es válido.";
    }
    $teltienda = filter_input(INPUT_POST, 'teltienda', FILTER_SANITIZE_FULL_SPECIAL_CHARS);
    $idtienda = filter_input(INPUT_POST, 'idtienda', FILTER_SANITIZE_NUMBER_INT); // Obtener el ID del tienda

    //Validaciones
    if (empty($nomtienda) || empty($reptienda) || empty($rfctienda) || empty($domtienda) || empty($noexttienda) || empty($coltienda) || empty($cdtienda) || empty($edotienda) || empty($cptienda) || empty($emailtienda) || empty($teltienda)) {
        $error = "Todos los campos son obligatorios.";
    } elseif (empty($nomtienda) || strlen($nomtienda) < 4) {
        $error = "El nombre de la tienda debe tener al menos 4 caracteres.";
    } else {
        $data = [
            'nomtienda' => $nomtienda,
            'reptienda' => $reptienda,
            'rfctienda' => $rfctienda,
            'domtienda' => $domtienda,
            'noexttienda' => $noexttienda,
            'nointtienda' => $nointtienda,
            'coltienda' => $coltienda,
            'cdtienda' => $cdtienda,
            'edotienda' => $edotienda,
            'cptienda' => $cptienda,
            'emailtienda' => $emailtienda,
            'teltienda' => $teltienda
        ];

        // Actualizar tienda
        // Verificar si se está actualizando o creando un nuevo tienda
        if ($idtienda) {
            // Actualizar Tienda
            $data[':idtienda'] = $idtienda; // Agregar el ID del usuario para la actualización
            if (actualizarTienda($dbh, $data)) {
                $success = "Tienda actualizado exitosamente";
            } else {
                $error = "Error al actualizar Tienda: " . implode(", ", $stmt->errorInfo());
            }
        } else {
            // Crear nueva tienda
            if (crearTienda($dbh, $data)) {
                $success = "Tienda creado exitosamente";
            } else {
                $error = "Error al crear el tienda";
            }
        }
    }
}


if (isset($_GET['action']) && $_GET['action'] == 'delete' && isset($_GET['idtienda'])) {
    if (eliminarTienda($dbh, filter_input(INPUT_GET, 'idtienda', FILTER_SANITIZE_NUMBER_INT))) {
        $success = "Tienda eliminada exitosamente";
    } else {
        $error = "Error al eliminar el tienda";
    }
}

$tiendas = obtenerTiendas($dbh);
$tienda = isset($_GET['idtienda']) ? obtenerTienda($dbh, filter_input(INPUT_GET, 'idtienda', FILTER_SANITIZE_NUMBER_INT)) : null;
//var_dump($tienda); Comprobamos los datos del tienda
?>

<div class="container">
    <div class="tittle">Formulario de Tiendas</div>
    <!--Incluimos archivo de mensajes de estado para saber si es exito o error-->
    <?php include "mensajeestado.php"; ?>

    <form method="post" action="tiendas.php" id="frmTiendas">
        <input type="hidden" name="idtienda" value="<?php echo $tienda['idtienda'] ?? ''; ?>">
        <div class="form-group">
            <span>Nombre:</span>
            <input type="text" id="nomtienda" name="nomtienda" placeholder="Debe contener al menos 4 caracteres" value="<?php echo htmlspecialchars($tienda['nomtienda'] ?? ''); ?>" required>
        </div>
        <div class="form-group">
            <span>Representante:</span>
            <input type="text" id="reptienda" name="reptienda" value="<?php echo htmlspecialchars($tienda['reptienda'] ?? ''); ?>" required>
        </div>
        <div class="form-group">
            <span>R.F.C.:</span>
            <input type="text" id="rfctienda" name="rfctienda" value="<?php echo htmlspecialchars($tienda['rfctienda'] ?? ''); ?>" required>
        </div>
        <div class="form-group">
            <span>Domicilio:</span>
            <input type="text" id="domtienda" name="domtienda" value="<?php echo htmlspecialchars($tienda['domtienda'] ?? ''); ?>" required>
        </div>
        <div class="form-group">
            <span>No. Exterior:</span>
            <input type="number" id="noexttienda" name="noexttienda" value="<?php echo htmlspecialchars($tienda['noexttienda'] ?? ''); ?>" required>
        </div>
        <div class="form-group">
            <span>No. Interior:</span>
            <input type="text" id="nointtienda" name="nointtienda" value="<?php echo htmlspecialchars($tienda['nointtienda'] ?? ''); ?>" required>
        </div>
        <div class="form-group">
            <span>Colonia:</span>
            <input type="text" id="coltienda" name="coltienda" value="<?php echo htmlspecialchars($tienda['coltienda'] ?? ''); ?>" required>
        </div>
        <div class="form-group">
            <span>Ciudad:</span>
            <input type="text" id="cdtienda" name="cdtienda" value="<?php echo htmlspecialchars($tienda['cdtienda'] ?? ''); ?>" required>
        </div>
        <div class="form-group">
            <span>Estado:</span>
            <input type="text" id="edotienda" name="edotienda" value="<?php echo htmlspecialchars($tienda['edotienda'] ?? ''); ?>" required>
        </div>
        <div class="form-group">
            <span>Código postal:</span>
            <input type="number" id="cptienda" name="cptienda" value="<?php echo htmlspecialchars($tienda['cptienda'] ?? ''); ?>" required>
        </div>
        <div class="form-group">
            <span>Email:</span>
            <input type="email" id="emailtienda" name="emailtienda" value="<?php echo htmlspecialchars($tienda['emailtienda'] ?? ''); ?>" required>
        </div>
        <div class="form-group">
            <span>Teléfono:</span>
            <input type="number" id="teltienda" name="teltienda" value="<?php echo htmlspecialchars($tienda['teltienda'] ?? ''); ?>" required>
        </div>

        <div class="button">
            <input type="button" id="botonNuevo" onclick="limpiarFormularioTiendas(); cambiarTextoBoton();" value="Nuevo">
        </div>
        <div class="button">
            <input type="submit" id="botonGuardarActualizar" value="<?php echo isset($tienda) ? 'Actualizar' : 'Guardar'; ?>"></input>
        </div>
    </form>
</div>

<h3>Lista de tiendas</h3>
<table border="1">
    <thead>
        <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Representante</th>
            <th>R.F.C.</th>
            <th>Email</th>
            <th>Teléfono</th>
            <th>Acciones</th>
            <th></th>
        </tr>
    </thead>
    <tbody>
        <?php foreach ($tiendas as $u): ?>
            <tr>
                <td><?php echo $u['idtienda']; ?></td>
                <td><?php echo htmlspecialchars($u['nomtienda']); ?></td>
                <td><?php echo htmlspecialchars($u['reptienda']); ?></td>
                <td><?php echo htmlspecialchars($u['rfctienda']); ?></td>
                <td><?php echo htmlspecialchars($u['emailtienda']); ?></td>
                <td><?php echo htmlspecialchars($u['teltienda']); ?></td>
                <td>
                    <a href="#" title="Editar" onclick="cargarEditarTienda(<?php echo $u['idtienda']; ?>); return false;"><i id="btneditar" class="fa-solid fa-pen-to-square"></i></a>
                    &nbsp;&nbsp; &nbsp;

                    <a href="#" title="Eliminar" onclick="eliminarTienda(<?php echo $u['idtienda']; ?>); return false;"><i id="btneliminar" class="fa-solid fa-trash"></i></a>
                </td>
            </tr>
        <?php endforeach; ?>
    </tbody>
</table>