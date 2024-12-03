//Función para cambiar de nombre los botones guardar nuevo y actualizar
function cambiarTextoBoton() {
  // Seleccionamos el botón de "Actualizar" / "Guardar" y cambiamos su valor a "Guardar"
  const boton = document.getElementById("botonGuardarActualizar");
  boton.value = "Guardar";
}

// Llamar formulario de tiendas
document
  .getElementById("tiendas-link")
  .addEventListener("click", function (event) {
    event.preventDefault(); // Evita la acción por defecto del enlace
    fetch("tiendas.php")
      .then((response) => response.text())
      .then((html) => {
        document.getElementById("content-area").innerHTML = html;
        asignarControladorFormularioTienda(); // Asigna el controlador después de cargar el contenido
      })
      .catch((error) => {
        console.error("Error al cargar el contenido:", error);
      });
  });

// Guardar Tiendas
function enviarFormularioTienda(event) {
  event.preventDefault(); // Evita la recarga de la página

  const formData = new FormData(event.target); // Obtiene los datos del formulario
  fetch("tiendas.php", {
    method: "POST",
    body: formData,
  })
    .then((response) => response.text())
    .then((html) => {
      document.getElementById("content-area").innerHTML = html; // Actualiza el contenido
      asignarControladorFormularioTienda(); // Vuelve a asignar el controlador para el nuevo contenido
    })
    .catch((error) => {
      console.error("Error al enviar el formulario:", error);
    });
}
//Cargamos datos para editar
function cargarEditarTienda(id) {
  fetch("tiendas.php?idtienda=" + id)
    .then((response) => response.text())
    .then((html) => {
      document.getElementById("content-area").innerHTML = html;
      asignarControladorFormularioTienda();
    })
    .catch((error) => {
      console.error("Error al cargar el contenido:", error);
    });
}
//eliminamos la tienda
function eliminarTienda(id) {
  if (confirm("¿Estás seguro de que deseas eliminar esta tienda?")) {
    fetch("tiendas.php?action=delete&idtienda=" + id)
      .then((response) => response.text())
      .then((html) => {
        document.getElementById("content-area").innerHTML = html;
        asignarControladorFormularioTienda();
      })
      .catch((error) => {
        console.error("Error al eliminar la tienda:", error);
      });
  }
}

// Asignar controlador al formulario
function asignarControladorFormularioTienda() {
  const form = document.querySelector("form"); // Selecciona el formulario dentro del nuevo contenido
  if (form) {
    form.addEventListener("submit", enviarFormularioTienda); // Asigna el evento submit
  }
}
//Función para limpiar el formulario tiendas
function limpiarFormularioTiendas() {
  console.log("Limpiando el formulario Tiendas..."); // Para depuración

  // Seleccionar todos los elementos del formulario
  const campos = document.querySelectorAll(
    '#frmTiendas input[type="text"], #frmTiendas input[type="number"], #frmTiendas input[type="email"], #frmTiendas input[type="hidden"]'
  );

  // Limpiar el valor de cada campo seleccionado
  campos.forEach((campo) => (campo.value = ""));
}
//Función para cambiar de nombre los botones guardar nuevo y actualizar
function cambiarTextoBoton() {
  // Seleccionamos el botón de "Actualizar" / "Guardar" y cambiamos su valor a "Guardar"
  const boton = document.getElementById("botonGuardarActualizar");
  boton.value = "Guardar";
}

// Inicializar al cargar la página
document.addEventListener("DOMContentLoaded", function () {
  asignarControladorFormularioTienda(); // Asigna el controlador cuando el DOM esté listo
});

// Llamar formulario de roles
document
  .getElementById("roles-link")
  .addEventListener("click", function (event) {
    event.preventDefault(); // Evita la acción por defecto del enlace
    fetch("roles.php")
      .then((response) => response.text())
      .then((html) => {
        document.getElementById("content-area").innerHTML = html;
        asignarControladorFormularioRol();
      })
      .catch((error) => {
        console.error("Error al cargar el contenido:", error);
      });
  });
//Cargamos datos en los campos para editar
function cargarEditarRol(id) {
  fetch("roles.php?idrol=" + id)
    .then((response) => response.text())
    .then((html) => {
      document.getElementById("content-area").innerHTML = html;
      asignarControladorFormularioRol();
    })
    .catch((error) => {
      console.error("Error al cargar el contenido:", error);
    });
}
//Eliminar rol
function eliminarRol(id) {
  if (confirm("¿Estás seguro de que deseas eliminar este rol?")) {
    fetch("roles.php?action=delete&idrol=" + id)
      .then((response) => response.text())
      .then((html) => {
        document.getElementById("content-area").innerHTML = html;
        asignarControladorFormularioRol();
      })
      .catch((error) => {
        console.error("Error al eliminar el rol:", error);
      });
  }
}
//Guardar roles
function enviarFormularioRol(event) {
  event.preventDefault(); // Evita la recarga de la página

  const formData = new FormData(event.target);
  fetch("roles.php", {
    method: "POST",
    body: formData,
  })
    .then((response) => response.text())
    .then((html) => {
      document.getElementById("content-area").innerHTML = html;
      asignarControladorFormularioRol();
    })
    .catch((error) => {
      console.error("Error al enviar el formulario:", error);
    });
}

function asignarControladorFormularioRol() {
  const form = document.querySelector("form");
  if (form) {
    form.addEventListener("submit", enviarFormularioRol);
  }
}

document.addEventListener("DOMContentLoaded", function () {
  asignarControladorFormularioRol();
});

//Función para limpiar el formulario Roles
function limpiarFormularioRoles() {
  console.log("Limpiando el formulario Roles..."); // Para depuración

  // Seleccionar todos los elementos del formulario
  const campos = document.querySelectorAll(
    '#frmRoles input[type="text"], #frmRoles input[type="hidden"]'
  );

  // Limpiar el valor de cada campo seleccionado
  campos.forEach((campo) => (campo.value = ""));
}

// Llamar formulario de usuarios
document
  .getElementById("usuarios-link")
  .addEventListener("click", function (event) {
    event.preventDefault(); // Evita la acción por defecto del enlace
    fetch("usuarios.php")
      .then((response) => response.text())
      .then((html) => {
        document.getElementById("content-area").innerHTML = html;
        asignarControladorFormularioUsuario(); // Asigna el controlador después de cargar el contenido
      })
      .catch((error) => {
        console.error("Error al cargar el contenido:", error);
      });
  });

// Guardar Usuario
function enviarFormularioUsuario(event) {
  event.preventDefault(); // Evita la recarga de la página

  const formData = new FormData(event.target); // Obtiene los datos del formulario
  fetch("usuarios.php", {
    method: "POST",
    body: formData,
  })
    .then((response) => response.text())
    .then((html) => {
      document.getElementById("content-area").innerHTML = html; // Actualiza el contenido
      asignarControladorFormularioUsuario(); // Vuelve a asignar el controlador para el nuevo contenido
    })
    .catch((error) => {
      console.error("Error al enviar el formulario:", error);
    });
}
//Cargamos los datos a editar
function cargarEditarUsuario(id) {
  fetch("usuarios.php?idusuario=" + id)
    .then((response) => response.text())
    .then((html) => {
      document.getElementById("content-area").innerHTML = html;
      asignarControladorFormularioUsuario();
    })
    .catch((error) => {
      console.error("Error al cargar el contenido:", error);
    });
}
//Eliminamos usuario
function eliminarUsuario(id) {
  if (confirm("¿Estás seguro de que deseas eliminar este usuario?")) {
    fetch("usuarios.php?action=delete&idusuario=" + id)
      .then((response) => response.text())
      .then((html) => {
        document.getElementById("content-area").innerHTML = html;
        asignarControladorFormularioUsuario();
      })
      .catch((error) => {
        console.error("Error al eliminar el usuario:", error);
      });
  }
}
// Asignar controlador al formulario
function asignarControladorFormularioUsuario() {
  const form = document.querySelector("form"); // Selecciona el formulario dentro del nuevo contenido
  if (form) {
    form.addEventListener("submit", enviarFormularioUsuario); // Asigna el evento submit
  }
}

// Inicializar al cargar la página
document.addEventListener("DOMContentLoaded", function () {
  asignarControladorFormularioUsuario(); // Asigna el controlador cuando el DOM esté listo
});

// Función para limpiar el formulario Usuarios
function limpiarFormularioUsuarios() {
  console.log("Limpiando el formulario Usuarios..."); // Para depuración

  // Seleccionar todos los elementos input de texto y ocultos
  const campos = document.querySelectorAll(
    '#frmUsuarios input[type="text"], #frmUsuarios input[type="hidden"]'
  );
  campos.forEach((campo) => (campo.value = ""));

  // Seleccionar todos los elementos select del formulario
  const selects = document.querySelectorAll("#frmUsuarios select");
  selects.forEach((select) => (select.selectedIndex = 0)); // Reinicia el select al primer valor (generalmente un placeholder)
}

// Llamar formulario de productos
document
  .getElementById("productos-link")
  .addEventListener("click", function (event) {
    event.preventDefault(); // Evita la acción por defecto del enlace
    fetch("../php/catalogos/productos.php")
      .then((response) => response.text())
      .then((html) => {
        document.getElementById("content-area").innerHTML = html;
        asignarControladorFormularioProducto(); // Asigna el controlador después de cargar el contenido
      })
      .catch((error) => {
        console.error("Error al cargar el contenido:", error);
      });
  });

// Guardar productos
function enviarFormularioProducto(event) {
  event.preventDefault(); // Evita la recarga de la página

  const formData = new FormData(event.target); // Obtiene los datos del formulario
  fetch("../php/catalogos/productos.php", {
    method: "POST",
    body: formData,
  })
    .then((response) => response.text())
    .then((html) => {
      document.getElementById("content-area").innerHTML = html; // Actualiza el contenido
      asignarControladorFormularioProducto(); // Vuelve a asignar el controlador para el nuevo contenido
    })
    .catch((error) => {
      console.error("Error al enviar el formulario:", error);
    });
}
//Cargamos los datos para editar
function cargarEditarProducto(id) {
  fetch("../php/catalogos/productos.php?idproducto=" + id)
    .then((response) => response.text())
    .then((html) => {
      document.getElementById("content-area").innerHTML = html;
      asignarControladorFormularioProducto();
    })
    .catch((error) => {
      console.error("Error al cargar el contenido:", error);
    });
}
//Eliminamos Producto
function eliminarProducto(id) {
  if (confirm("¿Estás seguro de que deseas eliminar este producto?")) {
    fetch("../php/catalogos/productos.php?action=delete&idproducto=" + id)
      .then((response) => response.text())
      .then((html) => {
        document.getElementById("content-area").innerHTML = html;
        asignarControladorFormularioProducto();
      })
      .catch((error) => {
        console.error("Error al eliminar el producto:", error);
      });
  }
}
// Asignar controlador al formulario
function asignarControladorFormularioProducto() {
  const form = document.querySelector("form"); // Selecciona el formulario dentro del nuevo contenido
  if (form) {
    form.addEventListener("submit", enviarFormularioProducto); // Asigna el evento submit
  }
}
// Inicializar al cargar la página
document.addEventListener("DOMContentLoaded", function () {
  asignarControladorFormularioProducto(); // Asigna el controlador cuando el DOM esté listo
});
//Función para limpiar el formulario Productos
function limpiarFormularioProductos() {
  console.log("Limpiando el formulario Productos ..."); // Para depuración
  // Seleccionar todos los elementos del formulario
  const campos = document.querySelectorAll(
    '#frmProductos input[type="text"], #frmProductos input[type="hidden"]'
  );
  // Limpiar el valor de cada campo seleccionado
  campos.forEach((campo) => (campo.value = ""));
  // Seleccionar todos los elementos select del formulario
  const selects = document.querySelectorAll("#frmProductos select");
  selects.forEach((select) => (select.selectedIndex = 0)); // Reinicia el select al primer valor (generalmente un placeholder)
}

// Llamar formulario de categorias
document
  .getElementById("categorias-link")
  .addEventListener("click", function (event) {
    event.preventDefault(); // Evita la acción por defecto del enlace
    fetch("../php/catalogos/categorias.php")
      .then((response) => response.text())
      .then((html) => {
        document.getElementById("content-area").innerHTML = html;
        asignarControladorFormularioCategoria();
      })
      .catch((error) => {
        console.error("Error al cargar el contenido:", error);
      });
  });
//Guardar categorias
function enviarFormularioCategoria(event) {
  event.preventDefault(); // Evita la recarga de la página

  const formData = new FormData(event.target);
  fetch("../php/catalogos/categorias.php", {
    method: "POST",
    body: formData,
  })
    .then((response) => response.text())
    .then((html) => {
      document.getElementById("content-area").innerHTML = html;
      asignarControladorFormularioCategoria();
    })
    .catch((error) => {
      console.error("Error al enviar el formulario:", error);
    });
}
//Cargamos datos de las categorias en los campos para editar
function cargarEditarCategoria(id) {
  fetch("../php/catalogos/categorias.php?idcategoria=" + id)
    .then((response) => response.text())
    .then((html) => {
      document.getElementById("content-area").innerHTML = html;
      asignarControladorFormularioCategoria();
    })
    .catch((error) => {
      console.error("Error al cargar el contenido:", error);
    });
}
//Eliminar Categoria
function eliminarCategoria(id) {
  if (confirm("¿Estás seguro de que deseas eliminar esta categoria?")) {
    fetch("../php/catalogos/categorias.php?action=delete&idcategoria=" + id)
      .then((response) => response.text())
      .then((html) => {
        document.getElementById("content-area").innerHTML = html;
        asignarControladorFormularioCategoria();
      })
      .catch((error) => {
        console.error("Error al eliminar la categoria:", error);
      });
  }
}
// Asignar controlador al formulario
function asignarControladorFormularioCategoria() {
  const form = document.querySelector("form");
  if (form) {
    form.addEventListener("submit", enviarFormularioCategoria);
  }
}
// Inicializar al cargar la página
document.addEventListener("DOMContentLoaded", function () {
  asignarControladorFormularioCategoria();
});

//Función para limpiar el formulario Categorias
function limpiarFormularioCategorias() {
  console.log("Limpiando el formulario Categorias..."); // Para depuración

  // Seleccionar todos los elementos del formulario
  const campos = document.querySelectorAll(
    '#frmCategorias input[type="text"], #frmCategorias input[type="hidden"]'
  );

  // Limpiar el valor de cada campo seleccionado
  campos.forEach((campo) => (campo.value = ""));
}

// Llamar formulario de Unidades de medida
document
  .getElementById("umedidas-link")
  .addEventListener("click", function (event) {
    event.preventDefault(); // Evita la acción por defecto del enlace
    fetch("../php/catalogos/umedidas.php")
      .then((response) => response.text())
      .then((html) => {
        document.getElementById("content-area").innerHTML = html;
        asignarControladorFormularioUmedida();
      })
      .catch((error) => {
        console.error("Error al cargar el contenido:", error);
      });
  });
//Guardar Unidad de medida
function enviarFormularioUmedida(event) {
  event.preventDefault(); // Evita la recarga de la página

  const formData = new FormData(event.target);
  fetch("../php/catalogos/umedidas.php", {
    method: "POST",
    body: formData,
  })
    .then((response) => response.text())
    .then((html) => {
      document.getElementById("content-area").innerHTML = html;
      asignarControladorFormularioUmedida();
    })
    .catch((error) => {
      console.error("Error al enviar el formulario:", error);
    });
}
//Cargamos datos de las Unidades de medida en los campos para editar
function cargarEditarUmedida(id) {
  fetch("../php/catalogos/umedidas.php?idumedida=" + id)
    .then((response) => response.text())
    .then((html) => {
      document.getElementById("content-area").innerHTML = html;
      asignarControladorFormularioUmedida();
    })
    .catch((error) => {
      console.error("Error al cargar el contenido:", error);
    });
}
//Eliminar Umedida
function eliminarUmedida(id) {
  if (confirm("¿Estás seguro de que deseas eliminar esta Unidad de medida?")) {
    fetch("../php/catalogos/umedidas.php?action=delete&idumedida=" + id)
      .then((response) => response.text())
      .then((html) => {
        document.getElementById("content-area").innerHTML = html;
        asignarControladorFormularioUmedida();
      })
      .catch((error) => {
        console.error("Error al eliminar la Unidad de medida:", error);
      });
  }
}
// Asignar controlador al formulario
function asignarControladorFormularioUmedida() {
  const form = document.querySelector("form");
  if (form) {
    form.addEventListener("submit", enviarFormularioUmedida);
  }
}
// Inicializar al cargar la página
document.addEventListener("DOMContentLoaded", function () {
  asignarControladorFormularioUmedida();
});
//Función para limpiar el formulario Unidad de medidas
function limpiarFormularioUmedidas() {
  console.log("Limpiando el formulario Unidades de medida..."); // Para depuración

  // Seleccionar todos los elementos del formulario
  const campos = document.querySelectorAll(
    '#frmUmedidas input[type="text"], #frmUmedidas input[type="hidden"]'
  );

  // Limpiar el valor de cada campo seleccionado
  campos.forEach((campo) => (campo.value = ""));
}

// Llamar formulario de Marcas
document
  .getElementById("marcas-link")
  .addEventListener("click", function (event) {
    event.preventDefault(); // Evita la acción por defecto del enlace
    fetch("../php/catalogos/marcas.php")
      .then((response) => response.text())
      .then((html) => {
        document.getElementById("content-area").innerHTML = html;
        asignarControladorFormularioMarca();
      })
      .catch((error) => {
        console.error("Error al cargar el contenido:", error);
      });
  });
//Guardar Marca
function enviarFormularioMarca(event) {
  event.preventDefault(); // Evita la recarga de la página

  const formData = new FormData(event.target);
  fetch("../php/catalogos/marcas.php", {
    method: "POST",
    body: formData,
  })
    .then((response) => response.text())
    .then((html) => {
      document.getElementById("content-area").innerHTML = html;
      asignarControladorFormularioMarca();
    })
    .catch((error) => {
      console.error("Error al enviar el formulario:", error);
    });
}
//Cargamos datos de las marcas en los campos para editar
function cargarEditarMarca(id) {
  fetch("../php/catalogos/marcas.php?idmarca=" + id)
    .then((response) => response.text())
    .then((html) => {
      document.getElementById("content-area").innerHTML = html;
      asignarControladorFormularioMarca();
    })
    .catch((error) => {
      console.error("Error al cargar el contenido:", error);
    });
}
//Eliminar Marca
function eliminarMarca(id) {
  if (confirm("¿Estás seguro de que deseas eliminar esta marca?")) {
    fetch("../php/catalogos/marcas.php?action=delete&idmarca=" + id)
      .then((response) => response.text())
      .then((html) => {
        document.getElementById("content-area").innerHTML = html;
        asignarControladorFormularioMarca();
      })
      .catch((error) => {
        console.error("Error al eliminar la Marca:", error);
      });
  }
}
// Asignar controlador al formulario
function asignarControladorFormularioMarca() {
  const form = document.querySelector("form");
  if (form) {
    form.addEventListener("submit", enviarFormularioMarca);
  }
}
// Inicializar al cargar la página
document.addEventListener("DOMContentLoaded", function () {
  asignarControladorFormularioMarca();
});

//Función para limpiar el formulario Marcas
function limpiarFormularioMarcas() {
  console.log("Limpiando el formulario Marcas..."); // Para depuración

  // Seleccionar todos los elementos del formulario
  const campos = document.querySelectorAll(
    '#frmMarcas input[type="text"], #frmMarcas input[type="hidden"]'
  );

  // Limpiar el valor de cada campo seleccionado
  campos.forEach((campo) => (campo.value = ""));
}

// Llamar formulario de Tallas
document
  .getElementById("tallas-link")
  .addEventListener("click", function (event) {
    event.preventDefault(); // Evita la acción por defecto del enlace
    fetch("../php/catalogos/tallas.php")
      .then((response) => response.text())
      .then((html) => {
        document.getElementById("content-area").innerHTML = html;
        asignarControladorFormularioTalla();
      })
      .catch((error) => {
        console.error("Error al cargar el contenido:", error);
      });
  });
//Guardar Talla
function enviarFormularioTalla(event) {
  event.preventDefault(); // Evita la recarga de la página

  const formData = new FormData(event.target);
  fetch("../php/catalogos/tallas.php", {
    method: "POST",
    body: formData,
  })
    .then((response) => response.text())
    .then((html) => {
      document.getElementById("content-area").innerHTML = html;
      asignarControladorFormularioTalla();
    })
    .catch((error) => {
      console.error("Error al enviar el formulario:", error);
    });
}
//Cargamos datos de las tallas en los campos para editar
function cargarEditarTalla(id) {
  fetch("../php/catalogos/tallas.php?idtalla=" + id)
    .then((response) => response.text())
    .then((html) => {
      document.getElementById("content-area").innerHTML = html;
      asignarControladorFormularioTalla();
    })
    .catch((error) => {
      console.error("Error al cargar el contenido:", error);
    });
}
//Eliminar Talla
function eliminarTalla(id) {
  if (confirm("¿Estás seguro de que deseas eliminar esta talla?")) {
    fetch("../php/catalogos/tallas.php?action=delete&idtalla=" + id)
      .then((response) => response.text())
      .then((html) => {
        document.getElementById("content-area").innerHTML = html;
        asignarControladorFormularioTalla();
      })
      .catch((error) => {
        console.error("Error al eliminar la Talla:", error);
      });
  }
}
// Asignar controlador al formulario
function asignarControladorFormularioTalla() {
  const form = document.querySelector("form");
  if (form) {
    form.addEventListener("submit", enviarFormularioTalla);
  }
}
// Inicializar al cargar la página
document.addEventListener("DOMContentLoaded", function () {
  asignarControladorFormularioTalla();
});

//Función para limpiar el formulario Tallas
function limpiarFormularioTallas() {
  console.log("Limpiando el formulario Tallas..."); // Para depuración

  // Seleccionar todos los elementos del formulario
  const campos = document.querySelectorAll(
    '#frmTallas input[type="text"], #frmTallas input[type="hidden"]'
  );

  // Limpiar el valor de cada campo seleccionado
  campos.forEach((campo) => (campo.value = ""));
}

// Llamar formulario de Colores
document
  .getElementById("colores-link")
  .addEventListener("click", function (event) {
    event.preventDefault(); // Evita la acción por defecto del enlace
    fetch("../php/catalogos/colores.php")
      .then((response) => response.text())
      .then((html) => {
        document.getElementById("content-area").innerHTML = html;
        asignarControladorFormularioColor();
      })
      .catch((error) => {
        console.error("Error al cargar el contenido:", error);
      });
  });
//Guardar Color
function enviarFormularioColor(event) {
  event.preventDefault(); // Evita la recarga de la página

  const formData = new FormData(event.target);
  fetch("../php/catalogos/colores.php", {
    method: "POST",
    body: formData,
  })
    .then((response) => response.text())
    .then((html) => {
      document.getElementById("content-area").innerHTML = html;
      asignarControladorFormularioColor();
    })
    .catch((error) => {
      console.error("Error al enviar el formulario:", error);
    });
}
//Cargamos datos de las colores en los campos para editar
function cargarEditarColor(id) {
  fetch("../php/catalogos/colores.php?idcolor=" + id)
    .then((response) => response.text())
    .then((html) => {
      document.getElementById("content-area").innerHTML = html;
      asignarControladorFormularioColor();
    })
    .catch((error) => {
      console.error("Error al cargar el contenido:", error);
    });
}
//Eliminar Color
function eliminarColor(id) {
  if (confirm("¿Estás seguro de que deseas eliminar esta color?")) {
    fetch("../php/catalogos/colores.php?action=delete&idcolor=" + id)
      .then((response) => response.text())
      .then((html) => {
        document.getElementById("content-area").innerHTML = html;
        asignarControladorFormularioColor();
      })
      .catch((error) => {
        console.error("Error al eliminar la Color:", error);
      });
  }
}
// Asignar controlador al formulario
function asignarControladorFormularioColor() {
  const form = document.querySelector("form");
  if (form) {
    form.addEventListener("submit", enviarFormularioColor);
  }
}
// Inicializar al cargar la página
document.addEventListener("DOMContentLoaded", function () {
  asignarControladorFormularioColor();
});

//Función para limpiar el formulario Colores
function limpiarFormularioColores() {
  console.log("Limpiando el formulario Colores..."); // Para depuración

  // Seleccionar todos los elementos del formulario
  const campos = document.querySelectorAll(
    '#frmColores input[type="text"], #frmColores input[type="hidden"]'
  );

  // Limpiar el valor de cada campo seleccionado
  campos.forEach((campo) => (campo.value = ""));
}

// Llamar formulario de Generos
document
  .getElementById("generos-link")
  .addEventListener("click", function (event) {
    event.preventDefault(); // Evita la acción por defecto del enlace
    fetch("../php/catalogos/generos.php")
      .then((response) => response.text())
      .then((html) => {
        document.getElementById("content-area").innerHTML = html;
        asignarControladorFormularioGenero();
      })
      .catch((error) => {
        console.error("Error al cargar el contenido:", error);
      });
  });
//Guardar Genero
function enviarFormularioGenero(event) {
  event.preventDefault(); // Evita la recarga de la página

  const formData = new FormData(event.target);
  fetch("../php/catalogos/generos.php", {
    method: "POST",
    body: formData,
  })
    .then((response) => response.text())
    .then((html) => {
      document.getElementById("content-area").innerHTML = html;
      asignarControladorFormularioGenero();
    })
    .catch((error) => {
      console.error("Error al enviar el formulario:", error);
    });
}
//Cargamos datos de las generos en los campos para editar
function cargarEditarGenero(id) {
  fetch("../php/catalogos/generos.php?idgenero=" + id)
    .then((response) => response.text())
    .then((html) => {
      document.getElementById("content-area").innerHTML = html;
      asignarControladorFormularioGenero();
    })
    .catch((error) => {
      console.error("Error al cargar el contenido:", error);
    });
}
//Eliminar Genero
function eliminarGenero(id) {
  if (confirm("¿Estás seguro de que deseas eliminar esta genero?")) {
    fetch("../php/catalogos/generos.php?action=delete&idgenero=" + id)
      .then((response) => response.text())
      .then((html) => {
        document.getElementById("content-area").innerHTML = html;
        asignarControladorFormularioGenero();
      })
      .catch((error) => {
        console.error("Error al eliminar la Genero:", error);
      });
  }
}
// Asignar controlador al formulario
function asignarControladorFormularioGenero() {
  const form = document.querySelector("form");
  if (form) {
    form.addEventListener("submit", enviarFormularioGenero);
  }
}
// Inicializar al cargar la página
document.addEventListener("DOMContentLoaded", function () {
  asignarControladorFormularioGenero();
});

//Función para limpiar el formulario Generos
function limpiarFormularioGeneros() {
  console.log("Limpiando el formulario Generos..."); // Para depuración

  // Seleccionar todos los elementos del formulario
  const campos = document.querySelectorAll(
    '#frmGeneros input[type="text"], #frmGeneros input[type="hidden"]'
  );

  // Limpiar el valor de cada campo seleccionado
  campos.forEach((campo) => (campo.value = ""));
}

// Llamar formulario de Estilos
document
  .getElementById("estilos-link")
  .addEventListener("click", function (event) {
    event.preventDefault(); // Evita la acción por defecto del enlace
    fetch("../php/catalogos/estilos.php")
      .then((response) => response.text())
      .then((html) => {
        document.getElementById("content-area").innerHTML = html;
        asignarControladorFormularioEstilo();
      })
      .catch((error) => {
        console.error("Error al cargar el contenido:", error);
      });
  });
//Cargamos datos de las estilos en los campos para editar
function cargarEditarEstilo(id) {
  fetch("../php/catalogos/estilos.php?idestilo=" + id)
    .then((response) => response.text())
    .then((html) => {
      document.getElementById("content-area").innerHTML = html;
      asignarControladorFormularioEstilo();
    })
    .catch((error) => {
      console.error("Error al cargar el contenido:", error);
    });
}
//Eliminar Estilo
function eliminarEstilo(id) {
  if (confirm("¿Estás seguro de que deseas eliminar esta estilo?")) {
    fetch("../php/catalogos/estilos.php?action=delete&idestilo=" + id)
      .then((response) => response.text())
      .then((html) => {
        document.getElementById("content-area").innerHTML = html;
        asignarControladorFormularioEstilo();
      })
      .catch((error) => {
        console.error("Error al eliminar la Estilo:", error);
      });
  }
}
//Guardar Estilo
function enviarFormularioEstilo(event) {
  event.preventDefault(); // Evita la recarga de la página

  const formData = new FormData(event.target);
  fetch("../php/catalogos/estilos.php", {
    method: "POST",
    body: formData,
  })
    .then((response) => response.text())
    .then((html) => {
      document.getElementById("content-area").innerHTML = html;
      asignarControladorFormularioEstilo();
    })
    .catch((error) => {
      console.error("Error al enviar el formulario:", error);
    });
}
// Asignar controlador al formulario
function asignarControladorFormularioEstilo() {
  const form = document.querySelector("form");
  if (form) {
    form.addEventListener("submit", enviarFormularioEstilo);
  }
}
// Inicializar al cargar la página
document.addEventListener("DOMContentLoaded", function () {
  asignarControladorFormularioEstilo();
});

//Función para limpiar el formulario Estilos
function limpiarFormularioEstilos() {
  console.log("Limpiando el formulario Estilos..."); // Para depuración

  // Seleccionar todos los elementos del formulario
  const campos = document.querySelectorAll(
    '#frmEstilos input[type="text"], #frmEstilos input[type="hidden"]'
  );

  // Limpiar el valor de cada campo seleccionado
  campos.forEach((campo) => (campo.value = ""));
}

// Llamar formulario de Mpagos
document
  .getElementById("mpagos-link")
  .addEventListener("click", function (event) {
    event.preventDefault(); // Evita la acción por defecto del enlace
    fetch("../php/catalogos/mpagos.php")
      .then((response) => response.text())
      .then((html) => {
        document.getElementById("content-area").innerHTML = html;
        asignarControladorFormularioMpago();
      })
      .catch((error) => {
        console.error("Error al cargar el contenido:", error);
      });
  });
//Guardar Mpago
function enviarFormularioMpago(event) {
  event.preventDefault(); // Evita la recarga de la página

  const formData = new FormData(event.target);
  fetch("../php/catalogos/mpagos.php", {
    method: "POST",
    body: formData,
  })
    .then((response) => response.text())
    .then((html) => {
      document.getElementById("content-area").innerHTML = html;
      asignarControladorFormularioMpago();
    })
    .catch((error) => {
      console.error("Error al enviar el formulario:", error);
    });
}
//Cargamos datos de las mpagos en los campos para editar
function cargarEditarMpago(id) {
  fetch("../php/catalogos/mpagos.php?idmpago=" + id)
    .then((response) => response.text())
    .then((html) => {
      document.getElementById("content-area").innerHTML = html;
      asignarControladorFormularioMpago();
    })
    .catch((error) => {
      console.error("Error al cargar el contenido:", error);
    });
}
//Eliminar Mpago
function eliminarMpago(id) {
  if (confirm("¿Estás seguro de que deseas eliminar esta metodo de pago?")) {
    fetch("../php/catalogos/mpagos.php?action=delete&idmpago=" + id)
      .then((response) => response.text())
      .then((html) => {
        document.getElementById("content-area").innerHTML = html;
        asignarControladorFormularioMpago();
      })
      .catch((error) => {
        console.error("Error al eliminar la Mpago:", error);
      });
  }
}
// Asignar controlador al formulario
function asignarControladorFormularioMpago() {
  const form = document.querySelector("form");
  if (form) {
    form.addEventListener("submit", enviarFormularioMpago);
  }
}
// Inicializar al cargar la página
document.addEventListener("DOMContentLoaded", function () {
  asignarControladorFormularioMpago();
});

//Función para limpiar el formulario Mpagos
function limpiarFormularioMpagos() {
  console.log("Limpiando el formulario Mpagos..."); // Para depuración

  // Seleccionar todos los elementos del formulario
  const campos = document.querySelectorAll(
    '#frmMpagos input[type="text"], #frmMpagos input[type="hidden"]'
  );

  // Limpiar el valor de cada campo seleccionado
  campos.forEach((campo) => (campo.value = ""));
}

// Llamar formulario de Impuestos
document
  .getElementById("impuestos-link")
  .addEventListener("click", function (event) {
    event.preventDefault(); // Evita la acción por defecto del enlace
    fetch("../php/catalogos/impuestos.php")
      .then((response) => response.text())
      .then((html) => {
        document.getElementById("content-area").innerHTML = html;
        asignarControladorFormularioImpuesto();
      })
      .catch((error) => {
        console.error("Error al cargar el contenido:", error);
      });
  });
// Guardar Impuesto
function enviarFormularioImpuesto(event) {
  event.preventDefault(); // Evita la recarga de la página

  const formData = new FormData(event.target); // Obtiene los datos del formulario
  fetch("../php/catalogos/impuestos.php", {
    method: "POST",
    body: formData,
  })
    .then((response) => response.text())
    .then((html) => {
      document.getElementById("content-area").innerHTML = html; // Actualiza el contenido
      asignarControladorFormularioImpuesto(); // Vuelve a asignar el controlador para el nuevo contenido
    })
    .catch((error) => {
      console.error("Error al enviar el formulario:", error);
    });
}

// Asignar controlador al Impuesto
function asignarControladorFormularioImpuesto() {
  const form = document.querySelector("form"); // Selecciona el formulario dentro del nuevo contenido
  if (form) {
    form.addEventListener("submit", enviarFormularioImpuesto); // Asigna el evento submit
  }
}

// Inicializar al cargar la página
document.addEventListener("DOMContentLoaded", function () {
  asignarControladorFormularioImpuesto(); // Asigna el controlador cuando el DOM esté listo
});
//Cargamos datos de las impuestos en los campos para editar
function cargarEditarImpuesto(id) {
  fetch("../php/catalogos/impuestos.php?idimpuesto=" + id)
    .then((response) => response.text())
    .then((html) => {
      document.getElementById("content-area").innerHTML = html;
      asignarControladorFormularioImpuesto();
    })
    .catch((error) => {
      console.error("Error al cargar el contenido:", error);
    });
}
//Eliminar Impuesto
function eliminarImpuesto(id) {
  if (confirm("¿Estás seguro de que deseas eliminar este impuesto?")) {
    fetch("../php/catalogos/impuestos.php?action=delete&idimpuesto=" + id)
      .then((response) => response.text())
      .then((html) => {
        document.getElementById("content-area").innerHTML = html;
        asignarControladorFormularioImpuesto();
      })
      .catch((error) => {
        console.error("Error al eliminar la Impuesto:", error);
      });
  }
}
//Función para limpiar el formulario Impuestos
function limpiarFormularioImpuestos() {
  console.log("Limpiando el formulario Impuestos..."); // Para depuración

  // Seleccionar todos los elementos del formulario
  const campos = document.querySelectorAll(
    '#frmImpuestos input[type="text"], #frmImpuestos input[type="hidden"]'
  );

  // Limpiar el valor de cada campo seleccionado
  campos.forEach((campo) => (campo.value = ""));
}

// Llamar formulario de proveedores
document
  .getElementById("proveedores-link")
  .addEventListener("click", function (event) {
    event.preventDefault(); // Evita la acción por defecto del enlace
    fetch("../php/catalogos/proveedores.php")
      .then((response) => response.text())
      .then((html) => {
        document.getElementById("content-area").innerHTML = html;
        asignarControladorFormularioProveedor(); // Asigna el controlador después de cargar el contenido
      })
      .catch((error) => {
        console.error("Error al cargar el contenido:", error);
      });
  });
// Guardar proveedor
function enviarFormularioProveedor(event) {
  event.preventDefault(); // Evita la recarga de la página

  const formData = new FormData(event.target); // Obtiene los datos del formulario
  fetch("../php/catalogos/proveedores.php", {
    method: "POST",
    body: formData,
  })
    .then((response) => response.text())
    .then((html) => {
      document.getElementById("content-area").innerHTML = html; // Actualiza el contenido
      asignarControladorFormularioProveedor(); // Vuelve a asignar el controlador para el nuevo contenido
    })
    .catch((error) => {
      console.error("Error al enviar el formulario:", error);
    });
}
//Cargamos datos para editar el proveedor
function cargarEditarProveedor(id) {
  fetch("../php/catalogos/proveedores.php?idproveedor=" + id)
    .then((response) => response.text())
    .then((html) => {
      document.getElementById("content-area").innerHTML = html;
      asignarControladorFormularioProveedor();
    })
    .catch((error) => {
      console.error("Error al cargar el contenido:", error);
    });
}
//Eliminamos Proveedor
function eliminarProveedor(id) {
  if (confirm("¿Estás seguro de que deseas eliminar este Proveedor?")) {
    fetch("../php/catalogos/proveedores.php?action=delete&idproveedor=" + id)
      .then((response) => response.text())
      .then((html) => {
        document.getElementById("content-area").innerHTML = html;
        asignarControladorFormularioProveedor();
      })
      .catch((error) => {
        console.error("Error al eliminar el proveedor:", error);
      });
  }
}
// Asignar controlador al formulario
function asignarControladorFormularioProveedor() {
  const form = document.querySelector("form"); // Selecciona el formulario dentro del nuevo contenido
  if (form) {
    form.addEventListener("submit", enviarFormularioProveedor); // Asigna el evento submit
  }
}
// Inicializar al cargar la página
document.addEventListener("DOMContentLoaded", function () {
  asignarControladorFormularioProveedor(); // Asigna el controlador cuando el DOM esté listo
});

// Función para limpiar el formulario Proveedores
function limpiarFormularioProveedores() {
  console.log("Limpiando el formulario Proveedores..."); // Para depuración

  // Seleccionar todos los elementos input de texto y ocultos
  const campos = document.querySelectorAll(
    '#frmProveedores input[type="text"], #frmProveedores input[type="hidden"], #frmProveedores input[type="email"], #frmProveedores input[type="number"]'
  );
  campos.forEach((campo) => (campo.value = ""));

  // Seleccionar todos los elementos select del formulario
  const selects = document.querySelectorAll("#frmProveedores select");
  selects.forEach((select) => (select.selectedIndex = 0)); // Reinicia el select al primer valor (generalmente un placeholder)
}

// Llamar a formulario movimientos
document
  .getElementById("movimientos-link")
  .addEventListener("click", function (event) {
    event.preventDefault(); // Evita la acción por defecto del enlace
    fetch("../php/operaciones/movimientos.php")
      .then((response) => response.text())
      .then((html) => {
        document.getElementById("content-area").innerHTML = html;
        asignarControladorFormularioMovimiento(); // Asigna el controlador después de cargar el contenido
      })
      .catch((error) => {
        console.error("Error al cargar el contenido:", error);
      });
  });

// Guardar Movimiento
function enviarFormularioMovimiento(event) {
  event.preventDefault(); // Evita la recarga de la página

  const formData = new FormData(event.target); // Obtiene los datos del formulario
  fetch("../php/operaciones/movimientos.php", {
    method: "POST",
    body: formData,
  })
    .then((response) => response.text())
    .then((html) => {
      document.getElementById("content-area").innerHTML = html; // Actualiza el contenido
      asignarControladorFormularioMovimiento(); // Vuelve a asignar el controlador para el nuevo contenido
    })
    .catch((error) => {
      console.error("Error al enviar el formulario:", error);
    });
}
//Cargamos datos para editar el Movimiento
function cargarEditarMovimiento(id) {
  fetch("../php/operaciones/movimientos.php?idmovimiento=" + id)
    .then((response) => response.text())
    .then((html) => {
      document.getElementById("content-area").innerHTML = html;
      asignarControladorFormularioMovimiento();
    })
    .catch((error) => {
      console.error("Error al cargar el contenido:", error);
    });
}
//Eliminamos Movimiento
function eliminaMovimiento(id) {
  if (confirm("¿Estás seguro de que deseas eliminar este Cliente?")) {
    fetch("../php/catalogos/clientes.php?action=delete&idcliente=" + id)
      .then((response) => response.text())
      .then((html) => {
        document.getElementById("content-area").innerHTML = html;
        asignarControladorFormularioMovimiento();
      })
      .catch((error) => {
        console.error("Error al eliminar el Cliente:", error);
      });
  }
}
// Asignar controlador al formulario
function asignarControladorFormularioMovimiento() {
  const form = document.querySelector("form"); // Selecciona el formulario dentro del nuevo contenido
  if (form) {
    form.addEventListener("submit", enviarFormularioMovimiento); // Asigna el evento submit
  }
}
// Inicializar al cargar la página
document.addEventListener("DOMContentLoaded", function () {
  asignarControladorFormularioMovimiento(); // Asigna el controlador cuando el DOM esté listo
});

// Función para limpiar el formulario Movimientos
function limpiarFormularioMovimientos() {
  console.log("Limpiando el formulario Movimientos..."); // Para depuración

  // Seleccionar todos los elementos input de texto y ocultos
  const campos = document.querySelectorAll(
    '#frmMovimientos input[type="hidden"], #frmMovimientos[type="text"], #frmMovimientos input[type="email"], #frmMovimientos input[type="number"]'
  );
  campos.forEach((campo) => (campo.value = ""));

  // Seleccionar todos los elementos select del formulario
  const selects = document.querySelectorAll("#frmMovimientos select");
  selects.forEach((select) => (select.selectedIndex = 0)); // Reinicia el select al primer valor (generalmente un placeholder)
}

// Llamar a formulario generador de etiquetas
document
  .getElementById("etiquetas-link")
  .addEventListener("click", function (event) {
    event.preventDefault(); // Evita la acción por defecto del enlace
    fetch("../php/operaciones/etiquetas.php")
      .then((response) => response.text())
      .then((html) => {
        document.getElementById("content-area").innerHTML = html;
        asignarControladorFormularioEtiqueta(); // Asigna el controlador después de cargar el contenido
        // Asegurarse de enfocar manualmente el campo con autofocus
        const inputAutofocus = document.querySelector("input[autofocus]");
        if (inputAutofocus) {
          inputAutofocus.focus();
        }
      })
      .catch((error) => {
        console.error("Error al cargar el contenido:", error);
      });
  });

// Guardar Etiqueta
function enviarFormularioEtiqueta(event) {
  event.preventDefault(); // Evita la recarga de la página

  const formData = new FormData(event.target); // Obtiene los datos del formulario
  fetch("../php/operaciones/etiquetas.php", {
    method: "POST",
    body: formData,
  })
    .then((response) => response.text())
    .then((html) => {
      document.getElementById("content-area").innerHTML = html; // Actualiza el contenido
      asignarControladorFormularioetiquetas(); // Vuelve a asignar el controlador para el nuevo contenido
    })
    .catch((error) => {
      console.error("Error al enviar el formulario:", error);
    });
}
//Cargamos datos para editar
function cargarEditarEtiqueta(id) {
  fetch("../php/operaciones/etiquetas.php?idetiqueta=" + id)
    .then((response) => response.text())
    .then((html) => {
      document.getElementById("content-area").innerHTML = html;
      asignarControladorFormularioEtiqueta();
    })
    .catch((error) => {
      console.error("Error al cargar el contenido:", error);
    });
}
//Eliminamos Etiqueta db
function eliminaEtiqueta(id) {
  if (confirm("¿Estás seguro de que deseas eliminar esta etiqueta?")) {
    fetch("../php/operaciones/etiquetas.php?action=delete&idcliente=" + id)
      .then((response) => response.text())
      .then((html) => {
        document.getElementById("content-area").innerHTML = html;
        asignarControladorFormularioEtiquetas();
      })
      .catch((error) => {
        console.error("Error al eliminar el Cliente:", error);
      });
  }
}
// Inicializar al cargar la página
document.addEventListener("DOMContentLoaded", function () {
  asignarControladorFormularioEtiqueta(); // Asigna el controlador cuando el DOM esté listo
});

// Asignar controlador al formulario
function asignarControladorFormularioEtiqueta() {
  const form = document.querySelector("form"); // Selecciona el formulario dentro del nuevo contenido
  if (form) {
    form.addEventListener("submit", enviarFormularioEtiqueta); // Asigna el evento submit
  }
}
// Función para limpiar el formulario Etiquetas
function limpiarFormularioEtiquetas() {
  console.log("Limpiando el formulario etiquetas..."); // Para depuración

  // Seleccionar todos los elementos input de texto y ocultos
  const campos = document.querySelectorAll(
    '#frmEtiquetas input[type="hidden"], #frmEtiquetas[type="text"], #frmEtiquetas input[type="email"], #frmEtiquetas input[type="number"]'
  );
  campos.forEach((campo) => (campo.value = ""));

  // Seleccionar todos los elementos select del formulario
  const selects = document.querySelectorAll("#frmEtiquetas select");
  selects.forEach((select) => (select.selectedIndex = 0)); // Reinicia el select al primer valor (generalmente un placeholder)
}

// Llamar a formulario ajuste de inventario
document
  .getElementById("ajustesinventario-link")
  .addEventListener("click", function (event) {
    event.preventDefault(); // Evita la acción por defecto del enlace
    fetch("../php/operaciones/ajusteinvt.php")
      .then((response) => response.text())
      .then((html) => {
        document.getElementById("content-area").innerHTML = html;
        asignarControladorFormularioAjusteinvt(); // Asigna el controlador después de cargar el contenido
      })
      .catch((error) => {
        console.error("Error al cargar el contenido:", error);
      });
  });

// Guardar Etiqueta
function enviarFormularioAjusteinvt(event) {
  event.preventDefault(); // Evita la recarga de la página

  const formData = new FormData(event.target); // Obtiene los datos del formulario
  fetch("../php/operaciones/ajusteinvt.php", {
    method: "POST",
    body: formData,
  })
    .then((response) => response.text())
    .then((html) => {
      document.getElementById("content-area").innerHTML = html; // Actualiza el contenido
      asignarControladorFormularioAjusteinvt(); // Vuelve a asignar el controlador para el nuevo contenido
    })
    .catch((error) => {
      console.error("Error al enviar el formulario:", error);
    });
}
//Cargamos datos para editar
function cargarEditarAjusteinvt(id) {
  fetch("../php/operaciones/ajusteinvt.php?idajuste=" + id)
    .then((response) => response.text())
    .then((html) => {
      document.getElementById("content-area").innerHTML = html;
      asignarControladorFormularioAjusteinvt();
    })
    .catch((error) => {
      console.error("Error al cargar el contenido:", error);
    });
}
//Eliminamos Etiqueta db
function eliminaAjusteinvt(id) {
  if (confirm("¿Estás seguro de que deseas eliminar este ajuste?")) {
    fetch("../php/operaciones/ajusteinvt.php?action=delete&ididajuste=" + id)
      .then((response) => response.text())
      .then((html) => {
        document.getElementById("content-area").innerHTML = html;
        asignarControladorFormularioAjusteinvt();
      })
      .catch((error) => {
        console.error("Error al eliminar el Ajuste:", error);
      });
  }
}
// Inicializar al cargar la página
document.addEventListener("DOMContentLoaded", function () {
  asignarControladorFormularioAjusteinvt(); // Asigna el controlador cuando el DOM esté listo
});

// Asignar controlador al formulario
function asignarControladorFormularioAjusteinvt() {
  const form = document.querySelector("form"); // Selecciona el formulario dentro del nuevo contenido
  if (form) {
    form.addEventListener("submit", enviarFormularioAjusteinvt); // Asigna el evento submit
  }
}
// Función para limpiar el formulario Ajustes de inventario
function limpiarFormularioAjusteinvt() {
  console.log("Limpiando el formulario de ajuste de inventario..."); // Para depuración

  // Seleccionar todos los elementos input de texto y ocultos
  const campos = document.querySelectorAll(
    '#frmAjusteinvt input[type="hidden"], #frmAjusteinvt[type="text"], #frmAjusteinvt input[type="email"], #frmEAjusteinvt input[type="number"]'
  );
  campos.forEach((campo) => (campo.value = ""));

  // Seleccionar todos los elementos select del formulario
  const selects = document.querySelectorAll("#frmAjusteinvt select");
  selects.forEach((select) => (select.selectedIndex = 0)); // Reinicia el select al primer valor (generalmente un placeholder)
}

// Llamar a formulario abono a proveedores
document
  .getElementById("abonosproveedor-link")
  .addEventListener("click", function (event) {
    event.preventDefault(); // Evita la acción por defecto del enlace
    fetch("../php/operaciones/abonosproveedores.php")
      .then((response) => response.text())
      .then((html) => {
        document.getElementById("content-area").innerHTML = html;
        asignarControladorFormularioAbonoProveedor(); // Asigna el controlador después de cargar el contenido
      })
      .catch((error) => {
        console.error("Error al cargar el contenido:", error);
      });
  });

// Guardar abono
function enviarFormularioAbonoProveedor(event) {
  event.preventDefault(); // Evita la recarga de la página

  const formData = new FormData(event.target); // Obtiene los datos del formulario
  fetch("../php/operaciones/abonosproveedores.php", {
    method: "POST",
    body: formData,
  })
    .then((response) => response.text())
    .then((html) => {
      document.getElementById("content-area").innerHTML = html; // Actualiza el contenido
      asignarControladorFormularioAbonoProveedor(); // Vuelve a asignar el controlador para el nuevo contenido
    })
    .catch((error) => {
      console.error("Error al enviar el formulario:", error);
    });
}
//Cargamos datos para editar
function cargarEditarAbonoProveedor(id) {
  fetch("../php/operaciones/ajusteinvt.php?idajuste=" + id)
    .then((response) => response.text())
    .then((html) => {
      document.getElementById("content-area").innerHTML = html;
      asignarControladorFormularioAbonoProveedor();
    })
    .catch((error) => {
      console.error("Error al cargar el contenido:", error);
    });
}
//Eliminamos el Abono
function eliminarAbono(id) {
  if (confirm("¿Estás seguro de que deseas eliminar este abono?")) {
    fetch(
      "../php/operaciones/abonosproveedores.php?action=delete&idabono=" + id
    )
      .then((response) => response.text())
      .then((html) => {
        document.getElementById("content-area").innerHTML = html;
        asignarControladorFormularioAbonoProveedor();
      })
      .catch((error) => {
        console.error("Error al eliminar el Abono:", error);
      });
  }
}
// Inicializar al cargar la página
document.addEventListener("DOMContentLoaded", function () {
  asignarControladorFormularioAbonoProveedor(); // Asigna el controlador cuando el DOM esté listo
});

// Asignar controlador al formulario
function asignarControladorFormularioAbonoProveedor() {
  const form = document.querySelector("form"); // Selecciona el formulario dentro del nuevo contenido
  if (form) {
    form.addEventListener("submit", enviarFormularioAbonoProveedor); // Asigna el evento submit
  }
}
// Función para limpiar el formulario Abono Proveedor
function limpiarFormularioAbonoProveedor() {
  console.log("Limpiando el formulario de abono a proveedor..."); // Para depuración

  // Seleccionar todos los elementos input de texto y ocultos
  const campos = document.querySelectorAll(
    '#frmAbonosProveedor input[type="hidden"], #frmAbonosProveedor[type="text"], #frmAbonosProveedor input[type="email"], #frmAbonosProveedor input[type="number"]'
  );
  campos.forEach((campo) => (campo.value = ""));

  // Seleccionar todos los elementos select del formulario
  const selects = document.querySelectorAll("#frmAbonosProveedor select");
  selects.forEach((select) => (select.selectedIndex = 0)); // Reinicia el select al primer valor (generalmente un placeholder)
}

// Llamar a formulario ajuste de inventario
document
  .getElementById("ajustesinventario-link")
  .addEventListener("click", function (event) {
    event.preventDefault(); // Evita la acción por defecto del enlace
    fetch("../php/operaciones/ajusteinvt.php")
      .then((response) => response.text())
      .then((html) => {
        document.getElementById("content-area").innerHTML = html;
        asignarControladorFormularioAjusteinvt(); // Asigna el controlador después de cargar el contenido
      })
      .catch((error) => {
        console.error("Error al cargar el contenido:", error);
      });
  });

// Guardar Etiqueta
function enviarFormularioAjusteinvt(event) {
  event.preventDefault(); // Evita la recarga de la página

  const formData = new FormData(event.target); // Obtiene los datos del formulario
  fetch("../php/operaciones/ajusteinvt.php", {
    method: "POST",
    body: formData,
  })
    .then((response) => response.text())
    .then((html) => {
      document.getElementById("content-area").innerHTML = html; // Actualiza el contenido
      asignarControladorFormularioAjusteinvt(); // Vuelve a asignar el controlador para el nuevo contenido
    })
    .catch((error) => {
      console.error("Error al enviar el formulario:", error);
    });
}
//Cargamos datos para editar
function cargarEditarAjusteinvt(id) {
  fetch("../php/operaciones/ajusteinvt.php?idajuste=" + id)
    .then((response) => response.text())
    .then((html) => {
      document.getElementById("content-area").innerHTML = html;
      asignarControladorFormularioAjusteinvt();
    })
    .catch((error) => {
      console.error("Error al cargar el contenido:", error);
    });
}
//Eliminamos Etiqueta db
function eliminaAjusteinvt(id) {
  if (confirm("¿Estás seguro de que deseas eliminar este ajuste?")) {
    fetch("../php/operaciones/ajusteinvt.php?action=delete&ididajuste=" + id)
      .then((response) => response.text())
      .then((html) => {
        document.getElementById("content-area").innerHTML = html;
        asignarControladorFormularioAjusteinvt();
      })
      .catch((error) => {
        console.error("Error al eliminar el Ajuste:", error);
      });
  }
}
// Inicializar al cargar la página
document.addEventListener("DOMContentLoaded", function () {
  asignarControladorFormularioAjusteinvt(); // Asigna el controlador cuando el DOM esté listo
});

// Asignar controlador al formulario
function asignarControladorFormularioAjusteinvt() {
  const form = document.querySelector("form"); // Selecciona el formulario dentro del nuevo contenido
  if (form) {
    form.addEventListener("submit", enviarFormularioAjusteinvt); // Asigna el evento submit
  }
}
// Función para limpiar el formulario Ajustes de inventario
function limpiarFormularioAjusteinvt() {
  console.log("Limpiando el formulario de ajuste de inventario..."); // Para depuración

  // Seleccionar todos los elementos input de texto y ocultos
  const campos = document.querySelectorAll(
    '#frmAjusteinvt input[type="hidden"], #frmAjusteinvt[type="text"], #frmAjusteinvt input[type="email"], #frmEAjusteinvt input[type="number"]'
  );
  campos.forEach((campo) => (campo.value = ""));

  // Seleccionar todos los elementos select del formulario
  const selects = document.querySelectorAll("#frmAjusteinvt select");
  selects.forEach((select) => (select.selectedIndex = 0)); // Reinicia el select al primer valor (generalmente un placeholder)
}

// Llamar a formulario informes
document
  .getElementById("informes-link")
  .addEventListener("click", function (event) {
    event.preventDefault(); // Evita la acción por defecto del enlace
    fetch("../php/operaciones/informes.php")
      .then((response) => response.text())
      .then((html) => {
        document.getElementById("content-area").innerHTML = html;
        asignarControladorFormularioInforme(); // Asigna el controlador después de cargar el contenido
      })
      .catch((error) => {
        console.error("Error al cargar el contenido:", error);
      });
  });

// Guardar informe
function enviarFormularioInforme(event) {
  event.preventDefault(); // Evita la recarga de la página

  const formData = new FormData(event.target); // Obtiene los datos del formulario
  fetch("../php/operaciones/informes.php", {
    method: "POST",
    body: formData,
  })
    .then((response) => response.text())
    .then((html) => {
      document.getElementById("content-area").innerHTML = html; // Actualiza el contenido
      asignarControladorFormularioInformes(); // Vuelve a asignar el controlador para el nuevo contenido
    })
    .catch((error) => {
      console.error("Error al enviar el formulario:", error);
    });
}
//Cargamos datos para editar
function cargarEditarInforme(id) {
  fetch("../php/operaciones/informes.php?idinforme=" + id)
    .then((response) => response.text())
    .then((html) => {
      document.getElementById("content-area").innerHTML = html;
      asignarControladorFormularioInforme();
    })
    .catch((error) => {
      console.error("Error al cargar el contenido:", error);
    });
}
//Eliminamos el informe
function eliminarAbono(id) {
  if (confirm("¿Estás seguro de que deseas eliminar este informe?")) {
    fetch("../php/operaciones/informes.php?action=delete&idinforme=" + id)
      .then((response) => response.text())
      .then((html) => {
        document.getElementById("content-area").innerHTML = html;
        asignarControladorFormularioInforme();
      })
      .catch((error) => {
        console.error("Error al eliminar el Informe:", error);
      });
  }
}
// Inicializar al cargar la página
document.addEventListener("DOMContentLoaded", function () {
  asignarControladorFormularioInforme(); // Asigna el controlador cuando el DOM esté listo
});

// Asignar controlador al formulario
function asignarControladorFormularioInforme() {
  const form = document.querySelector("form"); // Selecciona el formulario dentro del nuevo contenido
  if (form) {
    form.addEventListener("submit", enviarFormularioInforme); // Asigna el evento submit
  }
}
// Función para limpiar el formulario Informes
function limpiarFormularioInformes() {
  console.log("Limpiando el formulario de Informes..."); // Para depuración

  // Seleccionar todos los elementos input de texto y ocultos
  const campos = document.querySelectorAll(
    '#frmInformes input[type="hidden"], #frmInformes[type="text"], #frmInformes input[type="email"], #frmInformes input[type="number"]'
  );
  campos.forEach((campo) => (campo.value = ""));

  // Seleccionar todos los elementos select del formulario
  const selects = document.querySelectorAll("#frmInformes select");
  selects.forEach((select) => (select.selectedIndex = 0)); // Reinicia el select al primer valor (generalmente un placeholder)
}
