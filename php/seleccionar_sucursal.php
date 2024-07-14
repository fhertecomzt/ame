<?php
session_start();
if (!isset($_SESSION['idusuario'])) {
    header("Location: ../login.php");
    exit;
}

include "conexion.php";

// Obtener las sucursales a las que el usuario tiene acceso
$stmt = $dbh->prepare("SELECT sucursales.id, sucursales.nombresucursal 
                       FROM sucursales 
                       JOIN usuarios_sucursales ON sucursales.id = usuarios_sucursales.sucursal_id 
                       WHERE usuarios_sucursales.usuario_id = :user_id");
$stmt->bindParam(':user_id', $_SESSION['idusuario']);
$stmt->execute();
$sucursales = $stmt->fetchAll(PDO::FETCH_ASSOC);
$stmt = null;

if (!$sucursales) {
    echo "No tiene acceso a ninguna sucursal";
    exit;
}
?>

<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>AME</title>
    <link rel="stylesheet" type="text/css" href="../css/sucursales.css">
    <link href="https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css" rel="stylesheet">
</head>
<body>
    <div class="contenedor">
    <form id="formulario-login" method="POST" action="select_sucursal.php">
    <div class="input-select">
        <label for="sucursal">Seleccione una tienda:</label>
        <select id="sucursal" name="sucursal" class="tiendas-selects">
            <?php foreach ($sucursales as $sucursal): ?>
                <option value="<?php echo $sucursal['id']; ?>"><?php echo $sucursal['nombresucursal']; ?></option>
            <?php endforeach; ?>
        </select>
    </div>
        <button class="btn_iniciar" type="submit">Acceder</button>
    </form>
    <?php if (isset($_GET['error'])): ?>
        <p style="color: red;"><?php echo htmlspecialchars($_GET['error']); ?></p>
    <?php endif; ?>
</div>
</body>
</html>