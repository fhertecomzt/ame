// Llamar formulario de usuarios super
document
  .getElementById("usuariossup-link")
  .addEventListener("click", function (event) {
    event.preventDefault(); // Evita la acción por defecto del enlace
    fetch("usuariossup.php")
      .then((response) => response.text())
      .then((html) => {
        document.getElementById("content-area").innerHTML = html;
        asignarControladorFormularioUsuarioSup(); // Asigna el controlador después de cargar el contenido
      })
      .catch((error) => {
        console.error("Error al cargar el contenido:", error);
      });
  });

// Guardar Usuario super
function enviarFormularioUsuarioSup(event) {
  event.preventDefault(); // Evita la recarga de la página

  const formData = new FormData(event.target); // Obtiene los datos del formulario
  fetch("usuariossup.php", {
    method: "POST",
    body: formData,
  })
    .then((response) => response.text())
    .then((html) => {
      document.getElementById("content-area").innerHTML = html; // Actualiza el contenido
      asignarControladorFormularioUsuarioSup(); // Vuelve a asignar el controlador para el nuevo contenido
    })
    .catch((error) => {
      console.error("Error al enviar el formulario:", error);
    });
}
//Cargamos los datos a editar
function cargarEditarUsuarioSup(id) {
  fetch("usuariossup.php?idusuario=" + id)
    .then((response) => response.text())
    .then((html) => {
      document.getElementById("content-area").innerHTML = html;
      asignarControladorFormularioUsuarioSup();
    })
    .catch((error) => {
      console.error("Error al cargar el contenido:", error);
    });
}
//Eliminamos usuario super
function eliminarUsuarioSup(id) {
  if (confirm("¿Estás seguro de que deseas eliminar este usuario?")) {
    fetch("usuariossup.php?action=delete&idusuario=" + id)
      .then((response) => response.text())
      .then((html) => {
        document.getElementById("content-area").innerHTML = html;
        asignarControladorFormularioUsuarioSup();
      })
      .catch((error) => {
        console.error("Error al eliminar el usuario:", error);
      });
  }
}
// Asignar controlador al formulario
function asignarControladorFormularioUsuarioSup() {
  const form = document.querySelector("form"); // Selecciona el formulario dentro del nuevo contenido
  if (form) {
    form.addEventListener("submit", enviarFormularioUsuarioSup); // Asigna el evento submit
  }
}

// Inicializar al cargar la página
document.addEventListener("DOMContentLoaded", function () {
  asignarControladorFormularioUsuarioSup(); // Asigna el controlador cuando el DOM esté listo
});

// Función para limpiar el formulario Usuarios
function limpiarFormularioUsuariosSup() {
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
