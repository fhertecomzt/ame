<?php
//Vericamos si esta la sesión activa 
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}
if (!isset($_SESSION['idusuario'])) {
    header("Location: ../login.php");
    exit;
}

include "conexion.php";

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $sucursal_id = filter_input(INPUT_POST, 'sucursal', FILTER_SANITIZE_NUMBER_INT);

    if (empty($sucursal_id)) {
        header("Location: seleccionar_sucursal.php?error=Seleccione una sucursal");
        exit;
    }

    // Obtener el nombre de la sucursal seleccionada
    $stmt = $dbh->prepare("SELECT nombresucursal FROM sucursales WHERE id = :sucursal_id");
    $stmt->bindParam(':sucursal_id', $sucursal_id, PDO::PARAM_INT);
    $stmt->execute();
    $sucursal = $stmt->fetch(PDO::FETCH_ASSOC);

    if (!$sucursal) {
        header("Location: seleccionar_sucursal.php?error=Sucursal no encontrada");
        exit;
    }

    // Guardar la sucursal seleccionada en la sesión
    $_SESSION['sucursal_id'] = $sucursal_id;
    $_SESSION['sucursal_nombre'] = $sucursal['nombresucursal'];

    // Redirigir al usuario según su tipo de usuario
    switch ($_SESSION['departamento']) {
        case 'SISTEMAS':
            header("Location: ad.php");
            break;
        case 'VENTAS':
            header("Location: vta.php");
            break;
        default:
            header("Location: index.php");
            break;
    }
    exit;
} else {
    header("Location: seleccionar_sucursal.php");
    exit;
}
?>