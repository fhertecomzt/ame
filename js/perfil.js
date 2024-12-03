// Llamar a Perfil
document
  .getElementById("perfil-link")
  .addEventListener("click", function (event) {
    event.preventDefault(); // Evita la acción por defecto del enlace
    fetch("perfil.php")
      .then((response) => response.text())
      .then((html) => {
        document.getElementById("content-area").innerHTML = html;
        asignarControladorFormularioPerfil(); // Asigna el controlador después de cargar el contenido
      })
      .catch((error) => {
        console.error("Error al cargar el contenido:", error);
      });
  });
// Asignar controlador al formulario
function asignarControladorFormularioPerfil() {
  const form = document.querySelector("form"); // Selecciona el formulario dentro del nuevo contenido
  if (form) {
    form.addEventListener("submit", enviarFormularioPerfil); // Asigna el evento submit
  }
}
// Inicializar al cargar la página
document.addEventListener("DOMContentLoaded", function () {
  asignarControladorFormularioPerfil(); // Asigna el controlador cuando el DOM esté listo
});
