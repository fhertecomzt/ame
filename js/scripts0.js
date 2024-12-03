//Función para que no inserten con espacios en blanco
function verificar() {
  if ($("#nombre-input").val().trim().length > 0) {
    alert("El campo contiene un string válido que no son espacios");
  } else {
    alert("El campo contiene espacios y está vacío");
  }
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

// Asignar controlador al formulario
function asignarControladorFormularioTienda() {
  const form = document.querySelector("form"); // Selecciona el formulario dentro del nuevo contenido
  if (form) {
    form.addEventListener("submit", enviarFormularioTienda); // Asigna el evento submit
  }
}

// Inicializar al cargar la página
document.addEventListener("DOMContentLoaded", function () {
  asignarControladorFormularioTienda(); // Asigna el controlador cuando el DOM esté listo
});

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

// Llamar formulario de usuarios
document
  .getElementById("usuarios-link")
  .addEventListener("click", function (event) {
    event.preventDefault(); // Evita la acción por defecto del enlace
    fetch("usuariossup.php")
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
  fetch("usuariossup.php", {
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

function cargarEditarUsuario(id) {
  fetch("usuariossup.php?idusuario=" + id)
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
    fetch("usuariossup.php?action=delete&idusuario=" + id)
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

// Llamar formulario de roles
document
  .getElementById("roles-link")
  .addEventListener("click", function (event) {
    event.preventDefault(); // Evita la acción por defecto del enlace
    fetch("roles.php")
      .then((response) => response.text())
      .then((html) => {
        document.getElementById("content-area").innerHTML = html;
        asignarControladorFormulario();
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
      asignarControladorFormulario();
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
        asignarControladorFormulario();
      })
      .catch((error) => {
        console.error("Error al eliminar el rol:", error);
      });
  }
}
//Guardar roles
function enviarFormulario(event) {
  event.preventDefault(); // Evita la recarga de la página

  const formData = new FormData(event.target);
  fetch("roles.php", {
    method: "POST",
    body: formData,
  })
    .then((response) => response.text())
    .then((html) => {
      document.getElementById("content-area").innerHTML = html;
      asignarControladorFormulario();
    })
    .catch((error) => {
      console.error("Error al enviar el formulario:", error);
    });
}

function asignarControladorFormulario() {
  const form = document.querySelector("form");
  if (form) {
    form.addEventListener("submit", enviarFormulario);
  }
}

document.addEventListener("DOMContentLoaded", function () {
  asignarControladorFormulario();
});

//Función para limpiar el formulario tiendas
function limpiarFormularioTiendas() {
  console.log("Limpiando el formulario Tiendas..."); // Para depuración

  // Seleccionar todos los elementos del formulario
  const campos = document.querySelectorAll(
    '#formularioTiendas input[type="text"], #formularioTiendas input[type="number"], #formularioTiendas input[type="email"], #formularioTiendas input[type="hidden"]'
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

// Llamar formulario de categorias
document
  .getElementById("categorias-link")
  .addEventListener("click", function (event) {
    event.preventDefault(); // Evita la acción por defecto del enlace
    fetch("../php/catalogos/categorias.php")
      .then((response) => response.text())
      .then((html) => {
        document.getElementById("content-area").innerHTML = html;
        asignarControladorFormulario();
      })
      .catch((error) => {
        console.error("Error al cargar el contenido:", error);
      });
  });
//Cargamos datos de las categorias en los campos para editar
function cargarEditarCategoria(id) {
  fetch("../php/catalogos/categorias.php?idcategoria=" + id)
    .then((response) => response.text())
    .then((html) => {
      document.getElementById("content-area").innerHTML = html;
      asignarControladorFormulario();
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
        asignarControladorFormulario();
      })
      .catch((error) => {
        console.error("Error al eliminar la categoria:", error);
      });
  }
}
//Guardar categorias
function enviarFormulario(event) {
  event.preventDefault(); // Evita la recarga de la página

  const formData = new FormData(event.target);
  fetch("../php/catalogos/categorias.php", {
    method: "POST",
    body: formData,
  })
    .then((response) => response.text())
    .then((html) => {
      document.getElementById("content-area").innerHTML = html;
      asignarControladorFormulario();
    })
    .catch((error) => {
      console.error("Error al enviar el formulario:", error);
    });
}

function asignarControladorFormulario() {
  const form = document.querySelector("form");
  if (form) {
    form.addEventListener("submit", enviarFormulario);
  }
}

document.addEventListener("DOMContentLoaded", function () {
  asignarControladorFormulario();
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
        asignarControladorFormulario();
      })
      .catch((error) => {
        console.error("Error al cargar el contenido:", error);
      });
  });
//Cargamos datos de las Unidades de medida en los campos para editar
function cargarEditarUmedida(id) {
  fetch("../php/catalogos/umedidas.php?idumedida=" + id)
    .then((response) => response.text())
    .then((html) => {
      document.getElementById("content-area").innerHTML = html;
      asignarControladorFormulario();
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
        asignarControladorFormulario();
      })
      .catch((error) => {
        console.error("Error al eliminar la Unidad de medida:", error);
      });
  }
}
//Guardar Unidad de medida
function enviarFormulario(event) {
  event.preventDefault(); // Evita la recarga de la página

  const formData = new FormData(event.target);
  fetch("../php/catalogos/umedidas.php", {
    method: "POST",
    body: formData,
  })
    .then((response) => response.text())
    .then((html) => {
      document.getElementById("content-area").innerHTML = html;
      asignarControladorFormulario();
    })
    .catch((error) => {
      console.error("Error al enviar el formulario:", error);
    });
}

function asignarControladorFormulario() {
  const form = document.querySelector("form");
  if (form) {
    form.addEventListener("submit", enviarFormulario);
  }
}

document.addEventListener("DOMContentLoaded", function () {
  asignarControladorFormulario();
});

//Función para limpiar el formulario Unidad de medidas
function limpiarFormularioCategorias() {
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
        asignarControladorFormulario();
      })
      .catch((error) => {
        console.error("Error al cargar el contenido:", error);
      });
  });
//Cargamos datos de las marcas en los campos para editar
function cargarEditarMarca(id) {
  fetch("../php/catalogos/marcas.php?idmarca=" + id)
    .then((response) => response.text())
    .then((html) => {
      document.getElementById("content-area").innerHTML = html;
      asignarControladorFormulario();
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
        asignarControladorFormulario();
      })
      .catch((error) => {
        console.error("Error al eliminar la Marca:", error);
      });
  }
}
//Guardar Marca
function enviarFormulario(event) {
  event.preventDefault(); // Evita la recarga de la página

  const formData = new FormData(event.target);
  fetch("../php/catalogos/marcas.php", {
    method: "POST",
    body: formData,
  })
    .then((response) => response.text())
    .then((html) => {
      document.getElementById("content-area").innerHTML = html;
      asignarControladorFormulario();
    })
    .catch((error) => {
      console.error("Error al enviar el formulario:", error);
    });
}

function asignarControladorFormulario() {
  const form = document.querySelector("form");
  if (form) {
    form.addEventListener("submit", enviarFormulario);
  }
}

document.addEventListener("DOMContentLoaded", function () {
  asignarControladorFormulario();
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
        asignarControladorFormulario();
      })
      .catch((error) => {
        console.error("Error al cargar el contenido:", error);
      });
  });
//Cargamos datos de las tallas en los campos para editar
function cargarEditarTalla(id) {
  fetch("../php/catalogos/tallas.php?idtalla=" + id)
    .then((response) => response.text())
    .then((html) => {
      document.getElementById("content-area").innerHTML = html;
      asignarControladorFormulario();
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
        asignarControladorFormulario();
      })
      .catch((error) => {
        console.error("Error al eliminar la Talla:", error);
      });
  }
}
//Guardar Talla
function enviarFormulario(event) {
  event.preventDefault(); // Evita la recarga de la página

  const formData = new FormData(event.target);
  fetch("../php/catalogos/tallas.php", {
    method: "POST",
    body: formData,
  })
    .then((response) => response.text())
    .then((html) => {
      document.getElementById("content-area").innerHTML = html;
      asignarControladorFormulario();
    })
    .catch((error) => {
      console.error("Error al enviar el formulario:", error);
    });
}

function asignarControladorFormulario() {
  const form = document.querySelector("form");
  if (form) {
    form.addEventListener("submit", enviarFormulario);
  }
}

document.addEventListener("DOMContentLoaded", function () {
  asignarControladorFormulario();
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
        asignarControladorFormulario();
      })
      .catch((error) => {
        console.error("Error al cargar el contenido:", error);
      });
  });
//Cargamos datos de las colores en los campos para editar
function cargarEditarColor(id) {
  fetch("../php/catalogos/colores.php?idcolor=" + id)
    .then((response) => response.text())
    .then((html) => {
      document.getElementById("content-area").innerHTML = html;
      asignarControladorFormulario();
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
        asignarControladorFormulario();
      })
      .catch((error) => {
        console.error("Error al eliminar la Color:", error);
      });
  }
}
//Guardar Color
function enviarFormulario(event) {
  event.preventDefault(); // Evita la recarga de la página

  const formData = new FormData(event.target);
  fetch("../php/catalogos/colores.php", {
    method: "POST",
    body: formData,
  })
    .then((response) => response.text())
    .then((html) => {
      document.getElementById("content-area").innerHTML = html;
      asignarControladorFormulario();
    })
    .catch((error) => {
      console.error("Error al enviar el formulario:", error);
    });
}

function asignarControladorFormulario() {
  const form = document.querySelector("form");
  if (form) {
    form.addEventListener("submit", enviarFormulario);
  }
}

document.addEventListener("DOMContentLoaded", function () {
  asignarControladorFormulario();
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
        asignarControladorFormulario();
      })
      .catch((error) => {
        console.error("Error al cargar el contenido:", error);
      });
  });
//Cargamos datos de las generos en los campos para editar
function cargarEditarGenero(id) {
  fetch("../php/catalogos/generos.php?idgenero=" + id)
    .then((response) => response.text())
    .then((html) => {
      document.getElementById("content-area").innerHTML = html;
      asignarControladorFormulario();
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
        asignarControladorFormulario();
      })
      .catch((error) => {
        console.error("Error al eliminar la Genero:", error);
      });
  }
}
//Guardar Genero
function enviarFormulario(event) {
  event.preventDefault(); // Evita la recarga de la página

  const formData = new FormData(event.target);
  fetch("../php/catalogos/generos.php", {
    method: "POST",
    body: formData,
  })
    .then((response) => response.text())
    .then((html) => {
      document.getElementById("content-area").innerHTML = html;
      asignarControladorFormulario();
    })
    .catch((error) => {
      console.error("Error al enviar el formulario:", error);
    });
}

function asignarControladorFormulario() {
  const form = document.querySelector("form");
  if (form) {
    form.addEventListener("submit", enviarFormulario);
  }
}

document.addEventListener("DOMContentLoaded", function () {
  asignarControladorFormulario();
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
        asignarControladorFormulario();
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
      asignarControladorFormulario();
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
        asignarControladorFormulario();
      })
      .catch((error) => {
        console.error("Error al eliminar la Estilo:", error);
      });
  }
}
//Guardar Estilo
function enviarFormulario(event) {
  event.preventDefault(); // Evita la recarga de la página

  const formData = new FormData(event.target);
  fetch("../php/catalogos/estilos.php", {
    method: "POST",
    body: formData,
  })
    .then((response) => response.text())
    .then((html) => {
      document.getElementById("content-area").innerHTML = html;
      asignarControladorFormulario();
    })
    .catch((error) => {
      console.error("Error al enviar el formulario:", error);
    });
}

function asignarControladorFormulario() {
  const form = document.querySelector("form");
  if (form) {
    form.addEventListener("submit", enviarFormulario);
  }
}

document.addEventListener("DOMContentLoaded", function () {
  asignarControladorFormulario();
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
        asignarControladorFormulario();
      })
      .catch((error) => {
        console.error("Error al cargar el contenido:", error);
      });
  });
//Cargamos datos de las mpagos en los campos para editar
function cargarEditarMpago(id) {
  fetch("../php/catalogos/mpagos.php?idmpago=" + id)
    .then((response) => response.text())
    .then((html) => {
      document.getElementById("content-area").innerHTML = html;
      asignarControladorFormulario();
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
        asignarControladorFormulario();
      })
      .catch((error) => {
        console.error("Error al eliminar la Mpago:", error);
      });
  }
}
//Guardar Mpago
function enviarFormulario(event) {
  event.preventDefault(); // Evita la recarga de la página

  const formData = new FormData(event.target);
  fetch("../php/catalogos/mpagos.php", {
    method: "POST",
    body: formData,
  })
    .then((response) => response.text())
    .then((html) => {
      document.getElementById("content-area").innerHTML = html;
      asignarControladorFormulario();
    })
    .catch((error) => {
      console.error("Error al enviar el formulario:", error);
    });
}

function asignarControladorFormulario() {
  const form = document.querySelector("form");
  if (form) {
    form.addEventListener("submit", enviarFormulario);
  }
}

document.addEventListener("DOMContentLoaded", function () {
  asignarControladorFormulario();
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
