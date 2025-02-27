<?php
session_start();

//Restricción por rol
if (!isset($_SESSION['idusuario']) || ($_SESSION["rol"] !== "SISTEMAS" && $_SESSION["rol"] !== "GERENCIA")) {
    header("Location: ../logout.php ");
    exit;
}

include "../conexion.php";

//Función obtener productos
function obtenerProductos($dbh)
{
    $stmt = $dbh->prepare("SELECT productos.*, categorias.nomcategoria, umedidas.nomumedida
FROM productos
JOIN categorias ON productos.idcategoria = categorias.idcategoria
JOIN umedidas ON productos.idumedida = umedidas.idumedida");
    $stmt->execute();
    return $stmt->fetchAll(PDO::FETCH_ASSOC);
}

function obtenerProducto($dbh, $idproducto)
{
    $stmt = $dbh->prepare("SELECT productos.*, categorias.nomcategoria, umedidas.nomumedida
FROM productos
JOIN categorias ON productos.idcategoria = categorias.idcategoria
JOIN umedidas ON productos.idumedida = umedidas.idumedida
WHERE idproducto = :idproducto");
    $stmt->bindParam(':idproducto', $idproducto);
    $stmt->execute();
    return $stmt->fetch(PDO::FETCH_ASSOC);
}

// Rellenamos la lista de categorias
$consulta_categorias = $dbh->prepare("SELECT * FROM categorias");
$consulta_categorias->execute();

$lista_categorias = []; // Inicializa como un array

while ($categoria = $consulta_categorias->fetch(PDO::FETCH_ASSOC)) {
    $lista_categorias[] = $categoria; // Agrega cada categoria al array
}

// Rellenamos la lista de unidad de medida
$consulta_umedidas = $dbh->prepare("SELECT * FROM umedidas");
$consulta_umedidas->execute();

$lista_umedidas = []; // Inicializa como un array

while ($umedida = $consulta_umedidas->fetch(PDO::FETCH_ASSOC)) {
    $lista_umedidas[] = $umedida; // Agrega cada umedida al array
}

// Rellenamos la lista de marcas
$consulta_marcas = $dbh->prepare("SELECT * FROM marcas");
$consulta_marcas->execute();

$lista_marcas = []; // Inicializa como un array

while ($marca = $consulta_marcas->fetch(PDO::FETCH_ASSOC)) {
    $lista_marcas[] = $marca; // Agrega cada marca al array
}

// Rellenamos la lista de unidad de genero
$consulta_generos = $dbh->prepare("SELECT * FROM generos");
$consulta_generos->execute();

$lista_generos = []; // Inicializa como un array

while ($genero = $consulta_generos->fetch(PDO::FETCH_ASSOC)) {
    $lista_generos[] = $genero; // Agrega cada genero al array
}

// Rellenamos la lista de unidad de tallas
$consulta_tallas = $dbh->prepare("SELECT * FROM tallas");
$consulta_tallas->execute();

$lista_tallas = []; // Inicializa como un array

while ($talla = $consulta_tallas->fetch(PDO::FETCH_ASSOC)) {
    $lista_tallas[] = $talla; // Agrega cada talla al array
}

// Rellenamos la lista de unidad de estilos
$consulta_estilos = $dbh->prepare("SELECT * FROM estilos");
$consulta_estilos->execute();

$lista_estilos = []; // Inicializa como un array

while ($estilo = $consulta_estilos->fetch(PDO::FETCH_ASSOC)) {
    $lista_estilos[] = $estilo; // Agrega cada estilo al array
}

// Rellenamos la lista de Colores
$consulta_colores = $dbh->prepare("SELECT * FROM colores");
$consulta_colores->execute();

$lista_colores = []; // Inicializa como un array

while ($color = $consulta_colores->fetch(PDO::FETCH_ASSOC)) {
    $lista_colores[] = $color; // Agrega cada color al array
}

// Rellenamos la lista de Proveedores
$consulta_proveedores = $dbh->prepare("SELECT * FROM proveedores");
$consulta_proveedores->execute();

$lista_proveedores = []; // Inicializa como un array

while ($proveedor = $consulta_proveedores->fetch(PDO::FETCH_ASSOC)) {
    $lista_proveedores[] = $proveedor; // Agrega cada proveedor al array
}

// Rellenamos la lista de Impuestos
$consulta_impuestos = $dbh->prepare("SELECT * FROM impuestos");
$consulta_impuestos->execute();

$lista_impuestos = []; // Inicializa como un array

while ($impuesto = $consulta_impuestos->fetch(PDO::FETCH_ASSOC)) {
    $lista_impuestos[] = $impuesto; // Agrega cada impuesto al array
}

function crearProducto($dbh, $data, $imagen)
{
    // Validación de datos
    $requiredFields = ['nom_prod', 'codbar_prod', 'desc_prod', 'idcategoria', 'idumedida', 'idmarca', 'idgenero', 'idtalla', 'idestilo', 'idcolor', 'idproveedor', 'idimpuesto'];

    foreach ($requiredFields as $field) {
        if (empty($data[$field])) {
            error_log("El campo $field es obligatorio");
            return false;
        }
    }
    // Procesar imagen si existe
    $rutaImagen = null;
    if ($imagen['size'] > 0) {
        $nombreImagen = uniqid() . '-' . basename($imagen['name']);
        $rutaImagen = '../../imgs/productos/' . $nombreImagen;
        if (!move_uploaded_file($imagen['tmp_name'], $rutaImagen)) {
            error_log("Error al subir la imagen: " . $imagen['error']);
            return false;
        }
    }


    $stmt = $dbh->prepare("INSERT INTO productos (nom_prod, codbar_prod, desc_prod, idcategoria, idumedida, idmarca, idgenero, idtalla, idestilo, idcolor, idproveedor, idimpuesto, imagen) VALUES (:nom_prod, :codbar_prod, :desc_prod, :idcategoria, :idumedida, :idmarca, :idgenero, :idtalla, :idestilo, :idcolor, :idproveedor, :idimpuesto, :imagen)");

    $params = [
        ':nom_prod' => $data['nom_prod'],
        ':codbar_prod' => $data['codbar_prod'],
        ':desc_prod' => $data['desc_prod'],
        ':idcategoria' => $data['idcategoria'],
        ':idumedida' => $data['idumedida'],
        ':idmarca' => $data['idmarca'],
        ':idgenero' => $data['idgenero'],
        ':idtalla' => $data['idtalla'],
        ':idestilo' => $data['idestilo'],
        ':idcolor' => $data['idcolor'],
        ':idproveedor' => $data['idproveedor'],
        ':idimpuesto' => $data['idimpuesto'],
        ':imagen' => $rutaImagen

    ];
    // Aquí verificamos si manda todos los datos esperados
    //var_dump($params);

    if ($stmt->execute($params)) {
        return true; //Indicamos que tuvimos exito
    } else {
        $errorInfo = $stmt->errorInfo();
        error_log(print_r($errorInfo, true)); // Esto te ayudará a ver el error en el log
        return false;
    }
}

function actualizarProducto($dbh, $data, $imagen = null)
{
    // Mantener la ruta de la imagen existente si no se sube una nueva
    $rutaImagen = $data['imagen'];

    if ($imagen && $imagen['size'] > 0) {
        $nombreImagen = uniqid() . '-' . basename($imagen['name']);
        $rutaImagen = '../../imgs/productos/' . $nombreImagen;

        if (!move_uploaded_file($imagen['tmp_name'], $rutaImagen)) {
            error_log("Error al subir la imagen");
            return false;
        }
    }

    // Crear el array de parámetros
    $params = [
        ':idproducto' => $data['idproducto'], //Id del producto al array
        ':nom_prod' => $data['nom_prod'],
        ':codbar_prod' => $data['codbar_prod'],
        ':desc_prod' => $data['desc_prod'],
        ':idcategoria' => $data['idcategoria'],
        ':idumedida' => $data['idumedida'],
        ':idmarca' => $data['idmarca'],
        ':idgenero' => $data['idgenero'],
        ':idtalla' => $data['idtalla'],
        ':idestilo' => $data['idestilo'],
        ':idcolor' => $data['idcolor'],
        ':idproveedor' => $data['idproveedor'],
        ':idimpuesto' => $data['idimpuesto']
    ];

    // Añadir la imagen solo si se ha subido una nueva
    $sql = "UPDATE productos SET nom_prod = :nom_prod, codbar_prod = :codbar_prod, desc_prod = :desc_prod, idcategoria = :idcategoria, idumedida = :idumedida, idmarca = :idmarca, idgenero = :idgenero, idtalla = :idtalla, idestilo = :idestilo, idcolor = :idcolor, idproveedor = :idproveedor, idimpuesto = :idimpuesto";

    if ($imagen && $imagen['size'] > 0) {
        $params[':imagen'] = $rutaImagen;
        $sql .= ", imagen = :imagen";
    }

    $sql .= " WHERE idproducto = :idproducto";

    $stmt = $dbh->prepare($sql);
    return $stmt->execute($params);
}


function eliminarProducto($dbh, $idproducto)
{
    $stmt = $dbh->prepare("DELETE FROM productos WHERE idproducto = :idproducto");
    $stmt->bindParam(':idproducto', $idproducto);
    return $stmt->execute();
}

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    // Recoger y limpiar los datos del formulario
    $nom_prod = filter_input(INPUT_POST, 'nom_prod', FILTER_SANITIZE_FULL_SPECIAL_CHARS);
    $codbar_prod = filter_input(INPUT_POST, 'codbar_prod', FILTER_SANITIZE_FULL_SPECIAL_CHARS);
    $desc_prod = filter_input(INPUT_POST, 'desc_prod', FILTER_SANITIZE_FULL_SPECIAL_CHARS);
    $idcategoria = filter_input(INPUT_POST, 'idcategoria', FILTER_SANITIZE_FULL_SPECIAL_CHARS);
    $idumedida = filter_input(INPUT_POST, 'idumedida', FILTER_SANITIZE_FULL_SPECIAL_CHARS);
    $idmarca = filter_input(INPUT_POST, 'idmarca', FILTER_SANITIZE_NUMBER_INT);
    $idgenero = filter_input(INPUT_POST, 'idgenero', FILTER_SANITIZE_FULL_SPECIAL_CHARS);
    $idtalla = filter_input(INPUT_POST, 'idtalla', FILTER_SANITIZE_FULL_SPECIAL_CHARS);
    $idestilo = filter_input(INPUT_POST, 'idestilo', FILTER_SANITIZE_NUMBER_INT);
    $idcolor = filter_input(INPUT_POST, 'idcolor', FILTER_SANITIZE_NUMBER_INT);
    $idproveedor = filter_input(INPUT_POST, 'idproveedor', FILTER_SANITIZE_NUMBER_INT);
    $idimpuesto = filter_input(INPUT_POST, 'idimpuesto', FILTER_SANITIZE_NUMBER_INT);
    $idproducto = filter_input(INPUT_POST, 'idproducto', FILTER_SANITIZE_NUMBER_INT); // Obtener el ID del producto

    //Validaciones de datos
    if (
        empty($nom_prod) || empty($codbar_prod) || empty($desc_prod) ||
        empty($idcategoria) || empty($idumedida) || empty($idmarca) ||
        empty($idgenero) || empty($idtalla) || empty($idestilo) ||
        empty($idcolor) || empty($idproveedor) || empty($idimpuesto)
    ) {
        $error = "Todos los campos son obligatorios.";
    } elseif (empty($nom_prod) || strlen($nom_prod) < 4) {
        $error = "El nombre de producto debe tener al menos 4 caracteres.";
    } else {
        $data = [
            'nom_prod' => $nom_prod,
            'codbar_prod' => $codbar_prod,
            'desc_prod' => $desc_prod,
            'idcategoria' => $idcategoria,
            'idumedida' => $idumedida,
            'idmarca' => $idmarca,
            'idgenero' => $idgenero,
            'idtalla' => $idtalla,
            'idestilo' => $idestilo,
            'idcolor' => $idcolor,
            'idproveedor' => $idproveedor,
            'idimpuesto' => $idimpuesto

        ];

        // Actualizar producto
        // Verificar si se está actualizando o creando un nuevo producto
        if ($idproducto) {
            $data['idproducto'] = $idproducto; // Agregar el ID del producto para la actualización
            $data['imagen'] = $nom_prod['imagen'] ?? ''; // Mantener la imagen existente si no se sube una nueva


            if (actualizarProducto($dbh, $data, $_FILES['imagen'])) {
                $success = "Producto actualizado exitosamente";
            } else {
                $error = "Error al actualizar el producto";
            }
        } else {
            // Crear nuevo producto            
            if (crearProducto($dbh, $data, $_FILES['imagen'])) {
                $success = "Producto creado exitosamente";
            } else {
                $error = "Error al crear el producto";
            }
        }
    }
}


if (isset($_GET['action']) && $_GET['action'] == 'delete' && isset($_GET['idproducto'])) {
    if (eliminarProducto($dbh, filter_input(INPUT_GET, 'idproducto', FILTER_SANITIZE_NUMBER_INT))) {
        $success = "Producto eliminado exitosamente";
    } else {
        $error = "Error al eliminar el producto";
    }
}

$productos = obtenerProductos($dbh);
$producto = isset($_GET['idproducto']) ? obtenerProducto($dbh, filter_input(INPUT_GET, 'idproducto', FILTER_SANITIZE_NUMBER_INT)) : null;
//Comprobamos los datos del formulario productos
//var_dump($producto);
?>

<div class="container">
    <div class="tittle">Formulario de Productos</div>
    <!--Incluimos archivo de mensajes de estado para saber si es exito o error-->
    <?php include "../mensajeestado.php"; ?>
    <form method="post" action="productos.php" id="frmProductos" enctype="multipart/form-data">
        <input type="hidden" name="idproducto" value="<?php echo $producto['idproducto'] ?? ''; ?>">
        <div class="form-group">
            <span>Nombre:</span>
            <input type="text" id="nom_prod" name="nom_prod" placeholder="Debe contener al menos 4 caracteres" value="<?php echo htmlspecialchars($producto['nom_prod'] ?? ''); ?>">
        </div>
        <div class="form-group">
            <span>Código de barras:</span>
            <input type="text" id="codbar_prod" name="codbar_prod" value="<?php echo htmlspecialchars($producto['codbar_prod'] ?? ''); ?>">
        </div>
        <div class="form-group">
            <span>Descripción:</span>
            <input type="text" id="desc_prod" name="desc_prod" value="<?php echo htmlspecialchars($producto['desc_prod'] ?? ''); ?>">
        </div>
        <!-- Selección de categoria -->
        <div class="form-group">
            <span>Categoría:</span>
            <select id="idcategoria" name="idcategoria">
                <option value="">[Selecciona una categoría]</option>
                <?php
                // Asumiendo que $lista_categoria es un array de categorias
                foreach ($lista_categorias as $categoria): ?>
                    <option value="<?php echo htmlspecialchars($categoria['idcategoria']); ?>" <?php echo (isset($producto) && $producto['idcategoria'] == $categoria['idcategoria']) ? 'selected' : ''; ?>>
                        <?php echo htmlspecialchars($categoria['nomcategoria']); ?>
                    </option>
                <?php endforeach; ?>
            </select>
        </div>
        <!-- Selección de unidad de medida -->
        <div class="form-group">
            <span>Unidad de medida:</span>
            <select id="idumedida" name="idumedida">
                <option value="">[Selecciona una unidad de medida]</option>
                <?php
                // Asumiendo que $lista_umedidas es un array de umedidas
                foreach ($lista_umedidas as $umedida): ?>
                    <option value="<?php echo htmlspecialchars($umedida['idumedida']); ?>" <?php echo (isset($producto) && $producto['idumedida'] == $umedida['idumedida']) ? 'selected' : ''; ?>>
                        <?php echo htmlspecialchars($umedida['nomumedida']); ?>
                    </option>
                <?php endforeach; ?>
            </select>
        </div>
        <!-- Selección de la marca -->
        <div class="form-group">
            <span>Marca:</span>
            <select id="marca" name="idmarca">
                <option value="">[Selecciona una marca]</option>
                <?php
                foreach ($lista_marcas as $marca): ?>
                    <option value="<?php echo htmlspecialchars($marca['idmarca']); ?>" <?php echo (isset($producto) && $producto['idmarca'] == $marca['idmarca']) ? 'selected' : ''; ?>>
                        <?php echo htmlspecialchars($marca['nommarca']); ?>
                    </option>
                <?php endforeach; ?>
            </select>
        </div>

        <!-- Selección de la genero -->
        <div class="form-group">
            <span>Genero:</span>
            <select id="genero" name="idgenero">
                <option value="">[Selecciona una genero]</option>
                <?php
                foreach ($lista_generos as $genero): ?>
                    <option value="<?php echo htmlspecialchars($genero['idgenero']); ?>" <?php echo (isset($producto) && $producto['idgenero'] == $genero['idgenero']) ? 'selected' : ''; ?>>
                        <?php echo htmlspecialchars($genero['nomgenero']); ?>
                    </option>
                <?php endforeach; ?>
            </select>
        </div>

        <!-- Selección de la talla -->
        <div class="form-group">
            <span>Talla:</span>
            <select id="talla" name="idtalla">
                <option value="">[Selecciona una talla]</option>
                <?php
                foreach ($lista_tallas as $talla): ?>
                    <option value="<?php echo htmlspecialchars($talla['idtalla']); ?>" <?php echo (isset($producto) && $producto['idtalla'] == $talla['idtalla']) ? 'selected' : ''; ?>>
                        <?php echo htmlspecialchars($talla['nomtalla']); ?>
                    </option>
                <?php endforeach; ?>
            </select>
        </div>

        <!-- Selección de la estilo -->
        <div class="form-group">
            <span>Estilo:</span>
            <select id="estilo" name="idestilo">
                <option value="">[Selecciona una estilo]</option>
                <?php
                foreach ($lista_estilos as $estilo): ?>
                    <option value="<?php echo htmlspecialchars($estilo['idestilo']); ?>" <?php echo (isset($producto) && $producto['idestilo'] == $estilo['idestilo']) ? 'selected' : ''; ?>>
                        <?php echo htmlspecialchars($estilo['nomestilo']); ?>
                    </option>
                <?php endforeach; ?>
            </select>
        </div>

        <!-- Selección de la color -->
        <div class="form-group">
            <span>Color:</span>
            <select id="color" name="idcolor">
                <option value="">[Selecciona una color]</option>
                <?php
                foreach ($lista_colores as $color): ?>
                    <option value="<?php echo htmlspecialchars($color['idcolor']); ?>" <?php echo (isset($producto) && $producto['idcolor'] == $color['idcolor']) ? 'selected' : ''; ?>>
                        <?php echo htmlspecialchars($color['nomcolor']); ?>
                    </option>
                <?php endforeach; ?>
            </select>
        </div>

        <!-- Selección de la proveedor -->
        <div class="form-group">
            <span>Proveedor:</span>
            <select id="proveedor" name="idproveedor">
                <option value="">[Selecciona una proveedor]</option>
                <?php
                foreach ($lista_proveedores as $proveedor): ?>
                    <option value="<?php echo htmlspecialchars($proveedor['idproveedor']); ?>" <?php echo (isset($producto) && $producto['idproveedor'] == $proveedor['idproveedor']) ? 'selected' : ''; ?>>
                        <?php echo htmlspecialchars($proveedor['nomproveedor']); ?>
                    </option>
                <?php endforeach; ?>
            </select>
        </div>

        <!-- Selección de la impuesto -->
        <div class="form-group">
            <span>Impuesto:</span>
            <select id="impuesto" name="idimpuesto">
                <option value="">[Selecciona una impuesto]</option>
                <?php
                foreach ($lista_impuestos as $impuesto): ?>
                    <option value="<?php echo htmlspecialchars($impuesto['idimpuesto']); ?>" <?php echo (isset($producto) && $producto['idimpuesto'] == $impuesto['idimpuesto']) ? 'selected' : ''; ?>>
                        <?php echo htmlspecialchars($impuesto['nomimpuesto']); ?>
                    </option>
                <?php endforeach; ?>
            </select>
        </div>

        <div class="form-group">
            <span>Imagen de perfil:</span>
            <input type="file" id="imagen" name="imagen" accept="image/*">
        </div>

        <div class="form-group">
            <span></span>
            <input type="hidden" id="blanco" name="blanco">
        </div>

        <div class="button">
            <input type="button" id="botonNuevo" onclick="limpiarFormularioProductos(); cambiarTextoBoton();" value="Nuevo">
        </div>
        <div class="button">
            <input type="submit" id="botonGuardarActualizar" value="<?php echo isset($producto) ? 'Actualizar' : 'Guardar'; ?>"></input>
        </div>
    </form>
</div>

<h3>Lista de Productos</h3>
<table border="1">
    <thead>
        <tr>
            <th>ID</th>
            <th>Imagen</th>
            <th>Nombre</th>
            <th>Codigo Barras</th>
            <th>Acciones</th>
            <th></th>
        </tr>
    </thead>
    <tbody>
        <?php foreach ($productos as $u): ?>
            <tr>
                <td><?php echo $u['idproducto']; ?></td>
                <td><?php if (!empty($u['imagen'])): ?>
                        <img src="<?php echo htmlspecialchars($u['imagen']); ?>" alt="Imagen de perfil" width="50" height="50">
                    <?php else: ?>
                        Sin imagen
                    <?php endif; ?>
                </td>
                <td><?php echo htmlspecialchars($u['nom_prod']); ?></td>
                <td><?php echo htmlspecialchars($u['codbar_prod']); ?></td>
                <td>
                    <a href="#" title="Editar" onclick="cargarEditarProducto(<?php echo $u['idproducto']; ?>); return false;"><i id="btneditar" class="fa-solid fa-pen-to-square"></i></a>
                    &nbsp;&nbsp; &nbsp;

                    <a href="#" title="Eliminar" onclick="eliminarProducto(<?php echo $u['idproducto']; ?>); return false;"><i id="btneliminar" class="fa-solid fa-trash"></i></a>
                </td>
            </tr>
        <?php endforeach; ?>
    </tbody>
</table>