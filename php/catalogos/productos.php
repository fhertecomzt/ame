<?php
session_start();
//Restricción por rol
if (!isset($_SESSION['idusuario']) || ($_SESSION["rol"] !== "SISTEMAS" && $_SESSION["rol"] !== "GERENCIA")) {
  header("Location: ../../index.php");
  exit;
}

//Includes
require "../conexion.php";
include "../funciones/funciones.php";
include "../funciones/activoinactivo.php";

$productos = obtenerRegistros($dbh, "productos", "idproducto, codbar_prod, nom_prod, costo_compra_prod, precio1_venta_prod, imagen, estatus", "ASC", "idproducto");
$categorias = obtenerRegistros($dbh, "categorias", "idcategoria, nomcategoria", "ASC", "idcategoria");
$marcas = obtenerRegistros($dbh, "marcas", "idmarca, nommarca", "ASC", "idmarca");
$generos = obtenerRegistros($dbh, "generos", "idgenero, nomgenero", "ASC", "idgenero");
$tallas = obtenerRegistros($dbh, "tallas", "idtalla, nomtalla", "ASC", "idtalla");
$estilos = obtenerRegistros($dbh, "estilos", "idestilo, nomestilo", "ASC", "idestilo");
$colores = obtenerRegistros($dbh, "colores", "idcolor, nomcolor", "ASC", "idcolor");

$impuestos = obtenerRegistros($dbh, "impuestos", "idimpuesto, nomimpuesto", "ASC", "idimpuesto");
$umedidas = obtenerRegistros($dbh, "umedidas", "idumedida, nomumedida", "ASC", "idumedida");
$proveedores = obtenerRegistros($dbh, "proveedores", "idproveedor, nomproveedor", "ASC", "idproveedor");

?>

<div class="containerr">
  <button class="boton" onclick="abrirModalProducto('crear-modalProducto')">Nuevo</button>
  <label class="buscarlabel" for="buscarboxproducto">Buscar:</label>
  <input class="buscar--box" id="buscarboxproducto" type="search" placeholder="¿Qué estas buscando?" autocomplete="off">
  <!-- Filtro de estatus -->
  <label class="buscarlabel" for="estatusFiltro">Filtrar por Estatus:</label>
  <select class="buscar--box" id="estatusFiltro" onchange="filtrarPorEstatus()" style="width: 100px;">
    <option value="">Todos</option>
    <option value="activo">Activo</option>
    <option value="inactivo">Inactivo</option>
  </select>

</div>

<h3>Lista de productos</h3>
<div id="scroll-container" style="height: 65vh; overflow-y: auto; position: relative;">
  <table border="1" id="tabla-productos" style="position: sticky; top: 0; background: white;  border-collapse: collapse;">
    <thead style="position: sticky; top: 0; z-index: 100;">
      <tr>
        <th>Imagen</th>
        <th>Código de barras</th>
        <th>Nombre</th>
        <th>Costo</th>
        <th>Precio</th>
        <th>Estatus</th>
        <th>Acciones</th>
      </tr>
    </thead>
    <tbody id="productos-lista">
      <?php foreach ($productos as $u): ?>
        <tr class="producto" data-estatus="<?php echo ($u['estatus'] == 1) ? 'activo' : 'inactivo'; ?>">
          <td><?php if (!empty($u['imagen'])): ?>
              <img src="<?= htmlspecialchars($u['imagen']) ?>" alt="Imagen de producto" width="50" height="50" onerror="this.src='../imgs/default.png'">
            <?php else: ?>
              Sin imagen
            <?php endif; ?>
          </td>
          <td><?php echo htmlspecialchars($u['codbar_prod']); ?></td>
          <td><?php echo htmlspecialchars($u['nom_prod']); ?></td>
          <td><?php echo htmlspecialchars($u['costo_compra_prod']); ?></td>
          <td><?php echo htmlspecialchars($u['precio1_venta_prod']); ?></td>
          <td>
            <button class="btn <?php echo ($u['estatus'] == 1) ? 'btn-success' : 'btn-danger'; ?>">
              <?php echo ($u['estatus'] == 1) ? 'Activo' : 'Inactivo'; ?>
            </button>
          </td>

          <td>
            <button title="Editar" class="editarProducto fa-solid fa-pen-to-square" data-id="<?php echo $u['idproducto']; ?>"></button>&nbsp;&nbsp;&nbsp;
            <button title="Eliminar" class="eliminarProducto fa-solid fa-trash" data-id="<?php echo $u['idproducto']; ?>"></button>
          </td>
        </tr>
      <?php endforeach; ?>
    </tbody>
  </table>
</div>

<!-- Modal para crear Producto -->
<div id=" crear-modalProducto" class="modal" style="display: none;">
  <div class="modal-content">
    <span title="Cerrar" class="close" onclick="cerrarModalProducto('crear-modalProducto')">&times;</span>
    <h2 class="tittle">Crear Producto</h2>
    <form id="form-crearProducto" onsubmit="validarFormularioProducto(event, 'crear');" enctype="multipart/form-data">

      <div class="form-group">
        <label for="crear-codebar">Código de barras:</label>
        <input type="text" id="crear-codebar" name="codebar" autocomplete="off"
          pattern="[a-zA-Z0-9]+"
          title="Solo se permiten letras y números."
          oninput="this.value = this.value.replace(/[^a-zA-Z0-9]/g, '')" maxlength="13" required>
      </div>

      <div class="form-group">
        <label for="crear-producto">Nombre:</label>
        <input type="text" id="crear-producto" name="producto" autocomplete="off"
          pattern="[a-zA-ZÀ-ÿ0-9\s]+"
          title="Solo se permiten letras, números y espacios."
          oninput="this.value = this.value.replace(/[^a-zA-ZÀ-ÿ0-9\s]/g, '')" required>
      </div>

      <div class="form-group">
        <label for="crear-descprod">Descripción:</label>
        <input type="text" id="crear-descprod" name="descprod" autocomplete="off"
          pattern="[a-zA-Z0-9\s]+"
          title="Solo se permiten letras, espacios y números."
          oninput="this.value = this.value.replace(/[^a-zA-Z0-9\s]/g, '')" required>
      </div>

      <!-- Selección de la Categoría -->
      <div class="form-group" id="campo-categoria">
        <label for="crear-categoria">Categoría:</label>
        <select id="crear-categoria" name="idcategoria">
          <option value="">[Selecciona una categoría]</option>
          <?php foreach ($categorias as $categoria): ?>
            <option value="<?php echo htmlspecialchars($categoria['idcategoria']); ?>">
              <?php echo htmlspecialchars($categoria['nomcategoria']); ?>
            </option>
          <?php endforeach; ?>
        </select>
      </div>

      <!--Checkboxes para aparecer caracteristicas de los productos-->
      <label>Características:</label>
      <div class="form-containernum">
        <div class="checkbox-group laquinta">
          <label for="check-marca">Marca
            <input type="checkbox" id="check-marca" name="marca" onchange="toggleCampo('marca')"></label>
        </div>

        <div class="checkbox-group laquinta">
          <label for="check-genero">Género
            <input type="checkbox" id="check-genero" name="genero" onchange="toggleCampo('genero')"></label>
        </div>

        <div class="checkbox-group laquinta">
          <label for="check-talla">Talla
            <input type="checkbox" id="check-talla" name="talla" onchange="toggleCampo('talla')"></label>
        </div>

        <div class="checkbox-group laquinta">
          <label for="check-estilo">Estilo
            <input type="checkbox" id="check-estilo" name="estilo" onchange="toggleCampo('estilo')"></label>
        </div>

        <div class="checkbox-group laquinta">
          <label for="check-color">Color
            <input type="checkbox" id="check-color" name="color" onchange="toggleCampo('color')"></label>
        </div>
      </div>

      <!-- Selección de la Marca -->
      <div class="form-group" id="campo-marca" style="display: none;">
        <label for="crear-marca">Marca:</label>
        <select id="crear-marca" name="idmarca">
          <option value="">[Selecciona una marca]</option>
          <?php foreach ($marcas as $marca): ?>
            <option value="<?php echo htmlspecialchars($marca['idmarca']); ?>">
              <?php echo htmlspecialchars($marca['nommarca']); ?>
            </option>
          <?php endforeach; ?>
        </select>
      </div>

      <!-- Selección de la Genero -->
      <div class="form-group" id="campo-genero" style="display: none;">
        <label for="crear-genero">Genero:</label>
        <select id="crear-genero" name="idgenero">
          <option value="">[Selecciona un género]</option>
          <?php foreach ($generos as $genero): ?>
            <option value="<?php echo htmlspecialchars($genero['idgenero']); ?>">
              <?php echo htmlspecialchars($genero['nomgenero']); ?>
            </option>
          <?php endforeach; ?>
        </select>
      </div>

      <!-- Selección de la Talla -->
      <div class="form-group" id="campo-talla" style="display: none;">
        <label for="crear-talla">Talla:</label>
        <select id="crear-talla" name="idtalla">
          <option value="">[Selecciona una talla]</option>
          <?php foreach ($tallas as $talla): ?>
            <option value="<?php echo htmlspecialchars($talla['idtalla']); ?>">
              <?php echo htmlspecialchars($talla['nomtalla']); ?>
            </option>
          <?php endforeach; ?>
        </select>
      </div>

      <!-- Selección de la Estilo -->
      <div class="form-group" id="campo-estilo" style="display: none;">
        <label for="crear-estilo">Estilo:</label>
        <select id="crear-estilo" name="idestilo">
          <option value="">[Selecciona una estilo]</option>
          <?php foreach ($estilos as $estilo): ?>
            <option value="<?php echo htmlspecialchars($estillo['idestilo']); ?>">
              <?php echo htmlspecialchars($estilo['nomestilo']); ?>
            </option>
          <?php endforeach; ?>
        </select>
      </div>

      <!-- Selección de Color -->
      <div class="form-group" id="campo-color" style="display: none;">
        <label for="crear-color">Color:</label>
        <select id="crear-color" name="idcolor">
          <option value="">[Selecciona un color]</option>
          <?php foreach ($colores as $color): ?>
            <option value="<?php echo htmlspecialchars($color['idcolor']); ?>">
              <?php echo htmlspecialchars($color['nomcolor']); ?>
            </option>
          <?php endforeach; ?>
        </select>
      </div>

      <label>Precios:</label>
      <div class="form-containernum" style="gap: 15px; margin-left: 10px;">
        <div class="form-group laquinta">
          <label for="crear-costo_compra">Costo:</label>
          <input type="number" id="crear-costo_compra" name="costo_compra" autocomplete="off"
            pattern="^\d+(\.\d{1,2})?$"
            title="Ingrese un número válido con hasta 2 decimales (ej. 100.50)" step="0.01" size="10" min="0" maxlength="10" required>
        </div>

        <div class="form-group laquinta">
          <label for="crear-ganancia">Ganancia:</label>
          <input type="text" id="crear-ganancia" name="ganancia" autocomplete="off"
            pattern="^\d+(\.\d{1,2})?$"
            title="Ingrese un número válido con hasta 2 decimales (ej. 100.50)" step="0.01" size="10" min="0" maxlength="10" required>
        </div>

        <div class="form-group laquinta">
          <label for="crear-precio1">Precio 1:</label>
          <input type="number" id="crear-precio1" name="precio1" autocomplete="off"
            pattern="^\d+(\.\d{1,2})?$"
            title="Ingrese un número válido con hasta 2 decimales (ej. 100.50)" size="10" min="0" maxlength="10" required>
        </div>

        <div class="form-group laquinta">
          <label for="crear-precio2">Precio 2:</label>
          <input type="number" id="crear-precio2" name="precio2" autocomplete="off"
            pattern="[0-9]+"
            title="Solo se permiten números."
            oninput="this.value = this.value.replace(/[^0-9]/g, '')" size="10" min="0" maxlength="10" required>
        </div>

        <div class="form-group laquinta">
          <label for="crear-precio3">Precio 3:</label>
          <input type="number" id="crear-precio3" name="precio3" autocomplete="off"
            pattern="[0-9]+"
            title="Solo se permiten números."
            oninput="this.value = this.value.replace(/[^0-9]/g, '')" size="10" min="0" maxlength="10" required>
        </div>
      </div>

      <!-- Selección de Impuesto -->
      <div class="form-group">
        <label for="crear-impuesto">Impuesto:</label>
        <select id="crear-impuesto" name="idimpuesto">
          <option value="">[Selecciona un impuesto]</option>
          <?php foreach ($impuestos as $impuesto): ?>
            <option value="<?php echo htmlspecialchars($impuesto['idimpuesto']); ?>">
              <?php echo htmlspecialchars($impuesto['nomimpuesto']); ?>
            </option>
          <?php endforeach; ?>
        </select>
      </div>

      <!-- Selección de U. Medida -->
      <div class="form-group">
        <label for="crear-umedida">Unidad de Medida:</label>
        <select id="crear-umedida" name="idumedida">
          <option value="">[Selecciona una medida]</option>
          <?php foreach ($umedidas as $umedid): ?>
            <option value="<?php echo htmlspecialchars($umedid['idumedida']); ?>">
              <?php echo htmlspecialchars($umedid['nomumedida']); ?>
            </option>
          <?php endforeach; ?>
        </select>
      </div>

      <!-- Selección de Proveedor -->
      <div class="form-group">
        <label for="crear-proveedor">Proveedor:</label>
        <select id="crear-proveedor" name="idproveedor">
          <option value="">[Selecciona un proveedor]</option>
          <?php foreach ($proveedores as $proveedor): ?>
            <option value="<?php echo htmlspecialchars($proveedor['idproveedor']); ?>">
              <?php echo htmlspecialchars($proveedor['nomproveedor']); ?>
            </option>
          <?php endforeach; ?>
        </select>
      </div>

      <div class="form-group">
        <span>Imagen:</span>
        <input type="file" id="imagen" name="imagen" accept="image/*">
      </div>
      <!-- Selección de Estatus -->
      <div class="form-group">
        <label for="estatus">Estatus:</label>
        <select id="estatus" name="estatus">
          <?php foreach ($options as $key => $text) { ?>
            <option value="<?= $key ?>" <?= $key === $selected ? 'selected' : '' ?>><?= $text ?></option>
          <?php } ?>
        </select>
      </div>

      <button type="submit">Guardar</button>
    </form>
  </div>
</div>

<!-- Modal para editar Producto******************************** -->
<div id="editar-modalProducto" class="modal" style="display: none;">
  <div class="modal-content">
    <span title="Cerrar" class="close" onclick="cerrarModalProducto('editar-modalProducto')">&times;</span>
    <h2 class="tittle">Editar Producto</h2>
    <form id="form-editarProducto" onsubmit="validarFormularioProducto(event, 'editar')">

      <input type="hidden" id="editar-idproducto" name="editar-idproducto" value="" />

      <div class="form-group">
        <label for="editar-codebar">Código de barras:</label>
        <input type="text" id="editar-codebar" name="codebar" autocomplete="off"
          pattern="[a-zA-Z0-9]+"
          title="Solo se permiten letras y números."
          oninput="this.value = this.value.replace(/[^a-zA-Z0-9]/g, '')" maxlength="13" required>
      </div>

      <div class="form-group">
        <label for="editar-producto">Nombre:</label>
        <input type="text" id="editar-producto" name="producto" autocomplete="off"
          pattern="[a-zA-ZÀ-ÿ0-9\s]+"
          title="Solo se permiten letras, números y espacios."
          oninput="this.value = this.value.replace(/[^a-zA-ZÀ-ÿ0-9\s]/g, '')" required>
      </div>


      <div class="form-group">
        <label for="editar-descprod">Descripción:</label>
        <input type="text" id="editar-descprod" name="descprod" autocomplete="off"
          pattern="[a-zA-Z0-9\s]+"
          title="Solo se permiten letras, espacios y números."
          oninput="this.value = this.value.replace(/[^a-zA-Z0-9\s]/g, '')" required>
      </div>

      <!-- Selección de la Categoría -->
      <div class="form-group" id="campo-categoria">
        <label for="editar-categoria">Categoría:</label>
        <select id="editar-categoria" name="idcategoria">
          <option value="">[Selecciona una categoría]</option>
          <?php foreach ($categorias as $categoria): ?>
            <option value="<?php echo htmlspecialchars($categoria['idcategoria']); ?>">
              <?php echo htmlspecialchars($categoria['nomcategoria']); ?>
            </option>
          <?php endforeach; ?>
        </select>
      </div>

      <!-- Selección de la Marca -->
      <div class="form-group" id="campo-marca">
        <label for="editar-marca">Marca:</label>
        <select id="editar-marca" name="idmarca">
          <option value="">[Selecciona una marca]</option>
          <?php foreach ($marcas as $marca): ?>
            <option value="<?php echo htmlspecialchars($marca['idmarca']); ?>">
              <?php echo htmlspecialchars($marca['nommarca']); ?>
            </option>
          <?php endforeach; ?>
        </select>
      </div>

      <!-- Selección de la Genero -->
      <div class="form-group" id="campo-genero">
        <label for="editar-genero">Genero:</label>
        <select id="editar-genero" name="idgenero">
          <option value="">[Selecciona un género]</option>
          <?php foreach ($generos as $genero): ?>
            <option value="<?php echo htmlspecialchars($genero['idgenero']); ?>">
              <?php echo htmlspecialchars($genero['nomgenero']); ?>
            </option>
          <?php endforeach; ?>
        </select>
      </div>

      <!-- Selección de la Talla -->
      <div class="form-group" id="campo-talla">
        <label for="editar-talla">Talla:</label>
        <select id="editar-talla" name="idtalla">
          <option value="">[Selecciona una talla]</option>
          <?php foreach ($tallas as $talla): ?>
            <option value="<?php echo htmlspecialchars($talla['idtalla']); ?>">
              <?php echo htmlspecialchars($talla['nomtalla']); ?>
            </option>
          <?php endforeach; ?>
        </select>
      </div>

      <!-- Selección de Color -->
      <div class="form-group" id="campo-color">
        <label for="editar-color">Color:</label>
        <select id="editar-color" name="idcolor">
          <option value="">[Selecciona un color]</option>
          <?php foreach ($colores as $color): ?>
            <option value="<?php echo htmlspecialchars($color['idcolor']); ?>">
              <?php echo htmlspecialchars($color['nomcolor']); ?>
            </option>
          <?php endforeach; ?>
        </select>
      </div>

      <label>Precios:</label>
      <div class="form-containernum" style="gap: 15px; margin-left: 10px;">
        <div class="form-group laquinta">
          <label for="editar-costo_compra">Costo:</label>
          <input type="number" id="editar-costo_compra" name="costo_compra" autocomplete="off"
            pattern="^\d+(\.\d{1,2})?$"
            title="Ingrese un número válido con hasta 2 decimales (ej. 100.50)" step="0.01" size="10" min="0" maxlength="10" required>
        </div>

        <div class="form-group laquinta">
          <label for="editar-ganancia">Ganancia:</label>
          <input type="text" id="editar-ganancia" name="ganancia" autocomplete="off"
            pattern="^\d+(\.\d{1,2})?$"
            title="Ingrese un número válido con hasta 2 decimales (ej. 100.50)" step="0.01" size="10" min="0" maxlength="10" required>
        </div>

        <div class="form-group laquinta">
          <label for="editar-precio1">Precio 1:</label>
          <input type="number" id="editar-precio1" name="precio1" autocomplete="off"
            pattern="^\d+(\.\d{1,2})?$"
            title="Ingrese un número válido con hasta 2 decimales (ej. 100.50)" size="10" min="0" maxlength="10" required>
        </div>

        <div class="form-group laquinta">
          <label for="editar-precio2">Precio 2:</label>
          <input type="number" id="editar-precio2" name="precio2" autocomplete="off"
            pattern="[0-9]+"
            title="Solo se permiten números."
            oninput="this.value = this.value.replace(/[^0-9]/g, '')" size="10" min="0" maxlength="10" required>
        </div>

        <div class="form-group laquinta">
          <label for="editar-precio3">Precio 3:</label>
          <input type="number" id="editar-precio3" name="precio3" autocomplete="off"
            pattern="[0-9]+"
            title="Solo se permiten números."
            oninput="this.value = this.value.replace(/[^0-9]/g, '')" size="10" min="0" maxlength="10" required>
        </div>
      </div>

      <!-- Selección de Impuesto -->
      <div class="form-group">
        <label for="editar-impuesto">Impuesto:</label>
        <select id="editar-impuesto" name="idimpuesto">
          <option value="">[Selecciona un impuesto]</option>
          <?php foreach ($impuestos as $impuesto): ?>
            <option value="<?php echo htmlspecialchars($impuesto['idimpuesto']); ?>">
              <?php echo htmlspecialchars($impuesto['nomimpuesto']); ?>
            </option>
          <?php endforeach; ?>
        </select>
      </div>

      <!-- Selección de U. Medida -->
      <div class="form-group">
        <label for="editar-umedida">Unidad de Medida:</label>
        <select id="editar-umedida" name="idumedida">
          <option value="">[Selecciona una umedida]</option>
          <?php foreach ($umedidas as $umedida): ?>
            <option value="<?php echo htmlspecialchars($umedida['idumedida']); ?>">
              <?php echo htmlspecialchars($umedida['nomumedida']); ?>
            </option>
          <?php endforeach; ?>
        </select>
      </div>

      <!-- Selección de Proveedor -->
      <div class="form-group">
        <label for="editar-proveedor">Proveedor:</label>
        <select id="editar-proveedor" name="idproveedor">
          <option value="">[Selecciona un proveedor]</option>
          <?php foreach ($proveedores as $proveedor): ?>
            <option value="<?php echo htmlspecialchars($proveedor['idproveedor']); ?>">
              <?php echo htmlspecialchars($proveedor['nomproveedor']); ?>
            </option>
          <?php endforeach; ?>
        </select>
      </div>

      <div class="form-group">
        <span>Imagen:</span>
        <input type="file" id="imagen" name="imagen" accept="image/*">
      </div>
      <!-- Selección de Estatus -->
      <div class="form-group">
        <label for="editar-estatus">Estatus:</label>
        <select id="editar-estatus" name="estatus">
          <?php foreach ($options as $key => $text) { ?>
            <option value="<?= $key ?>" <?= $key === $selected ? 'selected' : '' ?>><?= $text ?></option>
          <?php } ?>
        </select>
      </div>

      <button type="submit">Guardar</button>
    </form>
  </div>
</div>