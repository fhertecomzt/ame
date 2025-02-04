<?php

session_start();
// Manejar mensajes de error y añadirlos a la sesión
if (isset($_GET['session_expired'])) {
    $_SESSION['errores'][] = "Tu sesión ha expirado. Por favor, inicia sesión nuevamente.";
}

if (isset($_GET['error']) && $_GET['error'] === 'acceso_denegado') {
    $_SESSION['errores'][] = "No tienes permisos para acceder a esa página.";
}
//Captcha suma basico
$num1 = rand(1, 9);
$num2 = rand(1, 9);
$_SESSION['captcha_result'] = $num1 + $num2;

?>

<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="utf-8">
    <meta htto-equiv="X-UAComptaible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>AME LOGIN</title>
    <meta name="description" content="Sistema de gestión y administración multiempresa.">
    <link rel="stylesheet" type="text/css" href="css/login.css">
    <!-- CDn Font Google link Fuente iconos-->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet">
    <!-- CDn Font Awesome link Fuente iconos-->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
</head>

<body>
    <div class="contenedor-form">
        <div class="information">
            <div class="info-childs">
                <h2>Bienvenido</h2>
                <p>al sistema AME "Administración Multi Empresa".</p>
            </div>
        </div>
        <div class="form-information">
            <div class="form-information-childs">
                <h2>Iniciar sesión</h2>

                <form class="form" action="php/validarlogin.php" method="POST">
                    <label>
                        <input type="text" placeholder="Usuario" name="txtusuario" autofocus required>
                    </label>
                    <label>
                        <input type="password" placeholder="Contraseña" id="pass" name="txtpassword1" autocomplete="off" required>
                        <i class="bx fa-solid fa-eye" style="position:absolute; margin-left: 378px;"></i>
                    </label>
                    <label>
                        <input type="number" placeholder="<?php echo $num1; ?> + <?php echo $num2; ?>=   " name="captcha" style="width: 100%;" required>
                    </label>
                    <div>
                        <!-- Mostrar reCAPTCHA solo si se necesitan -->
                        <?php if (isset($_SESSION['mostrar_recaptcha']) && $_SESSION['mostrar_recaptcha']): ?>
                            <div class="g-recaptcha" data-sitekey="6LfvWZYqAAAAABAAzNP9IPyPePJ5iwxONAh1DfVi"></div>
                        <?php endif; ?>
                    </div>

                    <button type="submit" name="btn_iniciar" class="btn_iniciar" id="botoniniciar">Iniciar sesión</button>
                </form>
                <!-- Mostrar el error si existe -->
                <div style="width: 400px;">
                    <?php
                    if (session_status() === PHP_SESSION_NONE) {
                        session_start();
                    }
                    if (isset($_SESSION['errores']) && !empty($_SESSION['errores'])) {
                        echo '<div class="errror">';
                        foreach ($_SESSION['errores'] as $error) {
                            echo "<p>$error</p>"; // Mostrar cada error en un párrafo
                        }
                        echo '</div>';
                        unset($_SESSION['errores']); // Limpiar errores después de mostrarlos
                    }
                    ?>
                </div>
            </div>
        </div>
    </div>
    <!-- Script de reCAPTCHA -->
    <script src="https://www.google.com/recaptcha/api.js" async defer></script>
    <script src="js/ojito.js"></script>
</body>

</html>