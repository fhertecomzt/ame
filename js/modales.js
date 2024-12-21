document.addEventListener("DOMContentLoaded", function () {
  const contentArea = document.getElementById("content-area");

  if (contentArea) {
    // Configuración del observador para detectar cambios en el contenido
    const observer = new MutationObserver(function () {
      initializeModalEvents(); // Inicializar eventos del modal después de que el contenido cambie
    });

    // Observa los cambios en los hijos del contenedor
    observer.observe(contentArea, {
      childList: true, // Detecta adiciones o eliminaciones de elementos hijos
    });
  } else {
    console.error("No se encontró el contenedor con ID 'content-area'.");
  }

  function initializeModalEvents() {
    const modal = document.getElementById("modal");
    const openModal = document.getElementById("openModal");
    const closeModal = document.getElementById("closeModal");
    const modalForm = document.getElementById("modalForm");

    // Abrir el modal
    if (openModal) {
      openModal.addEventListener("click", function () {
        modal.style.display = "flex";
        console.log("Modal abierto");
      });
    } else {
      console.error("No se encontró el botón para abrir el modal.");
    }

    // Cerrar el modal
    if (closeModal) {
      closeModal.addEventListener("click", function () {
        modal.style.display = "none";
        console.log("Modal cerrado");
      });
    } else {
      console.error("No se encontró el botón para cerrar el modal.");
    }

    // Cerrar el modal al hacer clic fuera del contenido
    if (modal) {
      window.addEventListener("click", function (event) {
        if (event.target === modal) {
          modal.style.display = "none";
        }
      });
    }

    // Enviar datos del formulario
    if (modalForm) {
      modalForm.addEventListener("submit", function (event) {
        event.preventDefault(); // Evita el comportamiento predeterminado

        const formData = new FormData(modalForm);

        fetch("process.php", {
          method: "POST",
          body: formData,
        })
          .then((response) => response.text())
          .then((data) => {
            alert(data); // Mostrar respuesta del servidor
            modal.style.display = "none"; // Cerrar el modal
            modalForm.reset(); // Reiniciar el formulario
          })
          .catch((error) => console.error("Error:", error));
      });
    }
  }

  // Inicializa los eventos del modal cuando se carga la página
  initializeModalEvents();
});
