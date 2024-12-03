// Llamar formulario de Clientes
document
  .getElementById("clientes-link")
  .addEventListener("click", function (event) {
    event.preventDefault(); // Evita la acción por defecto del enlace
    fetch("../php/catalogos/clientes.php")
      .then((response) => response.text())
      .then((html) => {
        document.getElementById("content-area").innerHTML = html;
        asignarControladorFormularioCliente(); // Asigna el controlador después de cargar el contenido
      })
      .catch((error) => {
        console.error("Error al cargar el contenido:", error);
      });
  });
// Guardar cLIENTE
function enviarFormularioCliente(event) {
  event.preventDefault(); // Evita la recarga de la página

  const formData = new FormData(event.target); // Obtiene los datos del formulario
  fetch("../php/catalogos/clientes.php", {
    method: "POST",
    body: formData,
  })
    .then((response) => response.text())
    .then((html) => {
      document.getElementById("content-area").innerHTML = html; // Actualiza el contenido
      asignarControladorFormularioCliente(); // Vuelve a asignar el controlador para el nuevo contenido
    })
    .catch((error) => {
      console.error("Error al enviar el formulario:", error);
    });
}
//Cargamos datos para editar el Cliente
function cargarEditarCliente(id) {
  fetch("../php/catalogos/clientes.php?idcliente=" + id)
    .then((response) => response.text())
    .then((html) => {
      document.getElementById("content-area").innerHTML = html;
      asignarControladorFormularioCliente();
    })
    .catch((error) => {
      console.error("Error al cargar el contenido:", error);
    });
}
//Eliminamos Cliente
function eliminaCliente(id) {
  if (confirm("¿Estás seguro de que deseas eliminar este Cliente?")) {
    fetch("../php/catalogos/clientes.php?action=delete&idcliente=" + id)
      .then((response) => response.text())
      .then((html) => {
        document.getElementById("content-area").innerHTML = html;
        asignarControladorFormularioCliente();
      })
      .catch((error) => {
        console.error("Error al eliminar el Cliente:", error);
      });
  }
}
// Asignar controlador al formulario
function asignarControladorFormularioCliente() {
  const form = document.querySelector("form"); // Selecciona el formulario dentro del nuevo contenido
  if (form) {
    form.addEventListener("submit", enviarFormularioCliente); // Asigna el evento submit
  }
}
// Inicializar al cargar la página
document.addEventListener("DOMContentLoaded", function () {
  asignarControladorFormularioCliente(); // Asigna el controlador cuando el DOM esté listo
});

// Función para limpiar el formulario Clientes
function limpiarFormularioClientes() {
  console.log("Limpiando el formulario Clientes..."); // Para depuración

  // Seleccionar todos los elementos input de texto y ocultos
  const campos = document.querySelectorAll(
    '#frmClientes input[type="text"], #frmClientes input[type="hidden"], #frmClientes input[type="email"], #frmClientes input[type="number"]'
  );
  campos.forEach((campo) => (campo.value = ""));

  // Seleccionar todos los elementos select del formulario
  const selects = document.querySelectorAll("#frmClientes select");
  selects.forEach((select) => (select.selectedIndex = 0)); // Reinicia el select al primer valor (generalmente un placeholder)
}
