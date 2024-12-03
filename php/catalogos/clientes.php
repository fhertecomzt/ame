<?php
session_start();
//RESTRICCIONES POR ROL
if (
    !isset($_SESSION['idusuario']) ||
    !in_array($_SESSION['rol'], ['SISTEMAS', 'GERENCIA', 'VENTAS'])
) {
    header("Location: ../logout.php");
    exit;
}

include "../conexion.php";

function obtenerClientes($dbh)
{
    $stmt = $dbh->prepare("SELECT * FROM clientes");
    $stmt->execute();
    return $stmt->fetchAll(PDO::FETCH_ASSOC);
}

function obtenerCliente($dbh, $idcliente)
{
    $stmt = $dbh->prepare("SELECT * FROM clientes WHERE idcliente = :idcliente");
    $stmt->bindParam(':idcliente', $idcliente);
    $stmt->execute();
    return $stmt->fetch(PDO::FETCH_ASSOC);
}

function crearCliente($dbh, $data)
{
    // Validación de datos
    if (empty($data['nom_cliente']) || empty($data['tel_cliente']) || empty($data['email_cliente'])) {
        return false;
    }

    $stmt = $dbh->prepare("INSERT INTO clientes (nom_cliente, rfc_cliente, dom_cliente, noext_cliente, noint_cliente, cp_cliente, col_cliente, cd_cliente, edo_cliente, tel_cliente, email_cliente, limitecred_cliente, diacred_cliente) VALUES (:nom_cliente, :rfc_cliente, :dom_cliente, :noext_cliente, :noint_cliente, :cp_cliente, :col_cliente, :cd_cliente, :edo_cliente, :tel_cliente, :email_cliente, :limitecred_cliente, :diacred_cliente)");

    $params = [
        ':nom_cliente' => $data['nom_cliente'],
        ':rfc_cliente' => $data['rfc_cliente'],
        ':dom_cliente' => $data['dom_cliente'],
        ':noext_cliente' => $data['noext_cliente'],
        ':noint_cliente' => $data['noint_cliente'],
        ':cp_cliente' => $data['cp_cliente'],
        ':col_cliente' => $data['col_cliente'],
        ':cd_cliente' => $data['cd_cliente'],
        ':edo_cliente' => $data['edo_cliente'],
        ':tel_cliente' => $data['tel_cliente'],
        ':email_cliente' => $data['email_cliente'],
        ':limitecred_cliente' => $data['limitecred_cliente'],
        ':diacred_cliente' => $data['diacred_cliente']
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

function actualizarCliente($dbh, $data)
{
    $stmt = $dbh->prepare("UPDATE clientes SET nom_cliente = :nom_cliente, rfc_cliente = :rfc_cliente, dom_cliente = :dom_cliente, noext_cliente = :noext_cliente, noint_cliente = :noint_cliente, cp_cliente = :cp_cliente, col_cliente = :col_cliente, cd_cliente = :cd_cliente, edo_cliente = :edo_cliente, tel_cliente = :tel_cliente, email_cliente = :email_cliente, limitecred_cliente = :limitecred_cliente, diacred_cliente = :diacred_cliente WHERE idcliente = :idcliente");
    return $stmt->execute($data);
}

function eliminarCliente($dbh, $idcliente)
{
    $stmt = $dbh->prepare("DELETE FROM clientes WHERE idcliente = :idcliente");
    $stmt->bindParam(':idcliente', $idcliente);
    return $stmt->execute();
}

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    // Recoger y limpiar los datos del formulario
    $nom_cliente = filter_input(INPUT_POST, 'nom_cliente', FILTER_SANITIZE_FULL_SPECIAL_CHARS);
    $rfc_cliente = filter_input(INPUT_POST, 'rfc_cliente', FILTER_SANITIZE_FULL_SPECIAL_CHARS);
    $dom_cliente = filter_input(INPUT_POST, 'dom_cliente', FILTER_SANITIZE_FULL_SPECIAL_CHARS);
    $noext_cliente = filter_input(INPUT_POST, 'noext_cliente', FILTER_SANITIZE_NUMBER_INT);
    $noint_cliente = filter_input(INPUT_POST, 'noint_cliente', FILTER_SANITIZE_FULL_SPECIAL_CHARS);
    $cp_cliente = filter_input(INPUT_POST, 'cp_cliente', FILTER_SANITIZE_NUMBER_INT);
    $col_cliente = filter_input(INPUT_POST, 'col_cliente', FILTER_SANITIZE_FULL_SPECIAL_CHARS);
    $cd_cliente = filter_input(INPUT_POST, 'cd_cliente', FILTER_SANITIZE_FULL_SPECIAL_CHARS);
    $edo_cliente = filter_input(INPUT_POST, 'edo_cliente', FILTER_SANITIZE_FULL_SPECIAL_CHARS);
    $tel_cliente = filter_input(INPUT_POST, 'tel_cliente', FILTER_SANITIZE_NUMBER_INT);
    $email_cliente = filter_input(
        INPUT_POST,
        'email_cliente',
        FILTER_SANITIZE_EMAIL
    );
    //Validación para email
    if (!filter_var($email_cliente, FILTER_VALIDATE_EMAIL)) {
        $error = "El email no es válido.";
    }
    $limitecred_cliente = filter_input(INPUT_POST, 'limitecred_cliente', FILTER_SANITIZE_FULL_SPECIAL_CHARS);
    $diacred_cliente = filter_input(INPUT_POST, 'diacred_cliente', FILTER_SANITIZE_NUMBER_INT);
    $idcliente = filter_input(INPUT_POST, 'idcliente', FILTER_SANITIZE_NUMBER_INT); // Obtener el ID del cliente

    //Validaciones
    if (empty($nom_cliente) || empty($tel_cliente) || empty($email_cliente)) {
        $error = "Todos los campos con * son obligatorios.";
    } elseif (empty($nom_cliente) || strlen($nom_cliente) < 4) {
        $error = "El nombre de cliente debe tener al menos 4 caracteres.";
    } else {
        $data = [
            'nom_cliente' => $nom_cliente,
            'rfc_cliente' => $rfc_cliente,
            'dom_cliente' => $dom_cliente,
            'noext_cliente' => $noext_cliente,
            'noint_cliente' => $noint_cliente,
            'cp_cliente' => $cp_cliente,
            'col_cliente' => $col_cliente,
            'cd_cliente' => $cd_cliente,
            'edo_cliente' => $edo_cliente,
            'tel_cliente' => $tel_cliente,
            'email_cliente' => $email_cliente,
            'limitecred_cliente' => $limitecred_cliente,
            'diacred_cliente' => $diacred_cliente
        ];


        // Actualizar cliente
        // Verificar si se está actualizando o creando un nuevo cliente
        if ($idcliente) {
            // Actualizar Cliente
            $data[':idcliente'] = $idcliente; // Agregar el ID del usuario para la actualización
            if (actualizarCliente($dbh, $data)) {
                $success = "Cliente actualizado exitosamente";
            } else {
                $error = "Error al actualizar Cliente: " . implode(", ", $stmt->errorInfo());
            }
        } else {
            // Crear nuevo cliente
            if (crearCliente($dbh, $data)) {
                $success = "Cliente creado exitosamente";
            } else {
                $error = "Error al crear el cliente";
            }
        }
    }
}


if (isset($_GET['action']) && $_GET['action'] == 'delete' && isset($_GET['idcliente'])) {
    if (eliminarCliente($dbh, filter_input(INPUT_GET, 'idcliente', FILTER_SANITIZE_NUMBER_INT))) {
        $success = "Cliente eliminado exitosamente";
    } else {
        $error = "Error al eliminar el cliente";
    }
}

$clientes = obtenerClientes($dbh);
$cliente = isset($_GET['idcliente']) ? obtenerCliente($dbh, filter_input(INPUT_GET, 'idcliente', FILTER_SANITIZE_NUMBER_INT)) : null;
//var_dump($cliente); Comprobamos los datos del cliente
?>

<div class="container">
    <div class="tittle">Formulario de Clientes</div>
    <!--Incluimos archivo de mensajes de estado para saber si es exito o error-->
    <?php include "../mensajeestado.php"; ?>

    <form method="post" action="clientes.php" id="frmClientes">
        <input type="hidden" name="idcliente" value="<?php echo $cliente['idcliente'] ?? ''; ?>">
        <div class="form-group">
            <span class="is-required">Nombre Cliente:</span>
            <input type="text" id="nom_cliente" name="nom_cliente" placeholder="Debe contener al menos 4 caracteres" value="<?php echo htmlspecialchars($cliente['nom_cliente'] ?? ''); ?>" required>
        </div>
        <div class="form-group">
            <span>R.F.C.:</span>
            <input type="text" id="rfc_cliente" name="rfc_cliente" value="<?php echo htmlspecialchars($cliente['rfc_cliente'] ?? ''); ?>">
        </div>
        <div class="form-group">
            <span>Domicilio:</span>
            <input type="text" id="dom_cliente" name="dom_cliente" value="<?php echo htmlspecialchars($cliente['dom_cliente'] ?? ''); ?>">
        </div>
        <div class="form-group">
            <span>No. Exterior:</span>
            <input type="number" id="noext_cliente" name="noext_cliente" value="<?php echo htmlspecialchars($cliente['noext_cliente'] ?? ''); ?>">
        </div>
        <div class="form-group">
            <span>No. Interior:</span>
            <input type="number" id="noint_cliente" name="noint_cliente" value="<?php echo htmlspecialchars($cliente['noint_cliente'] ?? ''); ?>">
        </div>
        <div class="form-group">
            <span>Código postal:</span>
            <input type="number" id="cp_cliente" name="cp_cliente" value="<?php echo htmlspecialchars($cliente['cp_cliente'] ?? ''); ?>">
        </div>
        <div class="form-group">
            <span>Colonia:</span>
            <input type="text" id="col_cliente" name="col_cliente" value="<?php echo htmlspecialchars($cliente['col_cliente'] ?? ''); ?>">
        </div>
        <div class="form-group">
            <span>Ciudad:</span>
            <input type="text" id="cd_cliente" name="cd_cliente" value="<?php echo htmlspecialchars($cliente['cd_cliente'] ?? ''); ?>">
        </div>
        <div class="form-group">
            <span>Estado:</span>
            <input type="text" id="edo_cliente" name="edo_cliente" value="<?php echo htmlspecialchars($cliente['edo_cliente'] ?? ''); ?>">
        </div>
        <div class="form-group">
            <span class="is-required">Telefono:</span>
            <input type="number" id="tel_cliente" name="tel_cliente" value="<?php echo htmlspecialchars($cliente['tel_cliente'] ?? ''); ?>" required>
        </div>
        <div class="form-group">
            <span class="is-required">Email:</span>
            <input type="email" id="email_cliente" name="email_cliente" value="<?php echo htmlspecialchars($cliente['email_cliente'] ?? ''); ?>" required>
        </div>
        <div class="form-group">
            <span>Limite de credito:</span>
            <input type="text" id="limitecred_cliente" name="limitecred_cliente" value="<?php echo htmlspecialchars($cliente['limitecred_cliente'] ?? ''); ?>">
        </div>
        <div class="form-group">
            <span>Días de credito:</span>
            <!--Limitamos a los 365 días de un año y a solo 3 digitos-->
            <input type="number" id="diacred_cliente" name="diacred_cliente" value="<?php echo htmlspecialchars($cliente['diacred_cliente'] ?? ''); ?>" max="365" oninput="if(this.value.length > 3) this.value = this.value.slice(0, 3);">
        </div>
        <div class="form-group">
            <span></span>
            <input type="hidden" id="nada" name="nada" value="">
        </div>

        <div class="button">
            <input type="button" id="botonNuevo" onclick="limpiarFormularioClientes(); cambiarTextoBoton();" value="Nuevo">
        </div>
        <div class="button">
            <input type="submit" id="botonGuardarActualizar" value="<?php echo isset($cliente) ? 'Actualizar' : 'Guardar'; ?>"></input>
        </div>
    </form>
</div>

<h3>Lista de Clientes</h3>
<table border="1">
    <thead>
        <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Domicilio</th>
            <th>No. Exterior</th>
            <th>No. Interior</th>
            <th>Telefono</th>
            <th>Email</th>
            <th>Acciones</th>
            <th></th>
        </tr>
    </thead>
    <tbody>
        <?php foreach ($clientes as $u): ?>
            <tr>
                <td><?php echo $u['idcliente']; ?></td>
                <td><?php echo htmlspecialchars($u['nom_cliente']); ?></td>
                <td><?php echo htmlspecialchars($u['dom_cliente']); ?></td>
                <td><?php echo htmlspecialchars($u['noext_cliente']); ?></td>
                <td><?php echo htmlspecialchars($u['noint_cliente']); ?></td>
                <td><?php echo htmlspecialchars($u['tel_cliente']); ?></td>
                <td><?php echo htmlspecialchars($u['email_cliente']); ?></td>
                <td>
                    <a href="#" title="Editar" onclick="cargarEditarCliente(<?php echo $u['idcliente']; ?>); return false;"><i id="btneditar" class="fa-solid fa-pen-to-square"></i></a>
                    &nbsp;&nbsp; &nbsp;

                    <a href="#" title="Eliminar" onclick="eliminarCliente(<?php echo $u['idcliente']; ?>); return false;"><i id="btneliminar" class="fa-solid fa-trash"></i></a>
                </td>
            </tr>
        <?php endforeach; ?>
    </tbody>
</table>