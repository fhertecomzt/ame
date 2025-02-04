//Llamar pagina de tiendas
document
  .getElementById("tiendas-link")
  .addEventListener("click", function (event) {
    event.preventDefault(); // Evita la acción por defecto del enlace
    fetch("tiendas.php")
      .then((response) => response.text())
      .then((html) => {
        document.getElementById("content-area").innerHTML = html;
      })
      .catch((error) => {
        console.error("Error al cargar el contenido:", error);
      });
  });

//Crear tienda
function abrirModal(id) {
  document.getElementById(id).style.display = "flex";
}

function cerrarModal(id) {
  document.getElementById(id).style.display = "none";
}

function procesarFormulario(event, tipo) {
  event.preventDefault();
  const formData = new FormData(event.target);

  fetch(`cruds/procesar_${tipo}.php`, {
    method: "POST",
    body: formData,
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        // Cerrar el modal
        cerrarModal(tipo + "-modal");

        // Actualizar la tabla dinámicamente si es 'crear'
        if (tipo === "crear") {
          const tbody = document.querySelector("table tbody");

          // Crear una nueva fila Test <td>${data.tienda.id}</td>
          const newRow = document.createElement("tr");
          newRow.innerHTML = `
            
            <td>${data.tienda.nombre}</td>
            <td>${data.tienda.representante}</td>
            <td>${data.tienda.rfc}</td>
            <td>${data.tienda.email}</td>
            <td>${data.tienda.telefono}</td>
            <td>
              <button title="Editar" class="editar fa-solid fa-pen-to-square" data-id="${data.tienda.id}"></button>
              <button title="Eliminar" class="eliminar fa-solid fa-trash" data-id="${data.tienda.id}"></button>
            </td>
          `;

          // Agregar la nueva fila a la tabla
          tbody.appendChild(newRow);
        }

        // Mostrar un mensaje de éxito
        //alert(data.message);
        Swal.fire({
          title: "¡Éxito!",
          text: "La acción se realizó correctamente.",
          icon: "success",
        });
      } else {
        // Mostrar un mensaje de error
        //alert(`Error: ${data.message}`);
        Swal.fire({
          title: "Error",
          text: "Ocurrió un problema.",
          icon: "error",
        });
      }
    })
    .catch((error) => console.error("Error:", error));
}
//Para editar
document.addEventListener("DOMContentLoaded", function () {
  document.addEventListener("click", function (event) {
    if (event.target.classList.contains("editar")) {
      const id = event.target.dataset.id;
      console.log("Botón editar clickeado. ID:", id);

      fetch(`cruds/obtener_tienda.php?id=${id}`)
        .then((response) => response.json())
        .then((data) => {
          // Prueba console.log("Datos recibidos del servidor:", data);

          if (data.success) {
            const formulario = document.getElementById("form-editar");
            if (formulario) {
              formulario["editar-id"].value = data.tienda.id || "";
              formulario["editar-nombre"].value = data.tienda.nombre || "";
              formulario["editar-representante"].value =
                data.tienda.representante || "";
              formulario["editar-rfc"].value = data.tienda.rfc || "";
              formulario["editar-domicilio"].value =
                data.tienda.domicilio || "";
              formulario["editar-noexterior"].value =
                data.tienda.noexterior || "";
              formulario["editar-nointerior"].value =
                data.tienda.nointerior || "";
              formulario["editar-colonia"].value = data.tienda.colonia || "";
              formulario["editar-ciudad"].value = data.tienda.ciudad || "";
              formulario["editar-estado"].value = data.tienda.estado || "";
              formulario["editar-cpostal"].value = data.tienda.cpostal || "";
              formulario["editar-email"].value = data.tienda.email || "";
              formulario["editar-telefono"].value = data.tienda.telefono || "";

              abrirModal("editar-modal");
            } else {
              console.error("Formulario de edición no encontrado.");
            }
          } else {
            alert(data.message || "Error al cargar los datos de la tienda.");
          }
        })
        .catch((error) => console.error("Error al obtener tienda:", error));
    }
  });

  // Delegación de eventos para el formulario dinámico
  document.body.addEventListener("submit", function (event) {
    if (event.target && event.target.id === "form-editar") {
      event.preventDefault(); // Esto evita el comportamiento predeterminado de recargar la página.

      const formData = new FormData(event.target);

      fetch("cruds/editar_tienda.php", {
        method: "POST",
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Respuesta del servidor:", data); // Para depuración
          if (data.success) {
            // Mensaje de éxito con SweetAlert
            Swal.fire({
              title: "¡Éxito!",
              text:
                data.message || "La actualización se realizó correctamente.",
              icon: "success",
            });

            // Actualizar la fila de la tabla sin recargar
            const fila = document
              .querySelector(`button[data-id="${formData.get("editar-id")}"]`)
              .closest("tr");
            if (fila) {
              fila.cells[0].textContent = formData.get("nombre");
              fila.cells[1].textContent = formData.get("representante");
              fila.cells[2].textContent = formData.get("rfc");
              fila.cells[3].textContent = formData.get("email");
              fila.cells[4].textContent = formData.get("telefono");
            }
            cerrarModal("editar-modal");
          } else {
            // Mensaje de error o advertencia del servidor con SweetAlert
            Swal.fire({
              title: "Atención",
              text: data.message || "Hubo un error al actualizar la tienda.",
              icon: "warning",
            });
          }
        })
        .catch((error) => {
          console.error("Error al intentar actualizar la tienda:", error);
          // Mensaje de error general con SweetAlert
          Swal.fire({
            title: "Error",
            text: "Ocurrió un problema al intentar actualizar la tienda.",
            icon: "error",
          });
        });
    }
  });
});

// Eliminar
document.addEventListener("click", function (event) {
  if (event.target.classList.contains("eliminar")) {
    const id = event.target.dataset.id;

    Swal.fire({
      title: "¿Estás seguro?",
      text: "No podrás revertir esta acción",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        // Realizar la solicitud para eliminar
        fetch(`cruds/eliminar_tienda.php?id=${id}`, { method: "POST" })
          .then((response) => response.json())
          .then((data) => {
            if (data.success) {
              //alert("Tienda eliminada correctamente");
              Swal.fire(
                "¡Eliminado!",
                "El registro ha sido eliminado correctamente.",
                "success"
              );
              // Remover la fila de la tabla
              event.target.closest("tr").remove();
            } else {
              Swal.fire(
                "Error",
                data.message || "No se pudo eliminar el registro.",
                "error"
              );
            }
          })
          .catch((error) => {
            Swal.fire(
              "Error",
              "Hubo un problema al procesar tu solicitud.",
              "error"
            );
            console.error("Error al eliminar la tienda:", error);
          });
      }
    });
  }
});

//Buscar en la tabla y filtrar
document.addEventListener("DOMContentLoaded", function () {
  const observarDOM = new MutationObserver(function (mutations) {
    mutations.forEach((mutation) => {
      if (mutation.type === "childList") {
        const buscarBox = document.getElementById("buscarbox");
        if (buscarBox) {
          //console.log("Elemento 'buscarbox' encontrado dinámicamente");
          agregarEventoBuscar(buscarBox);
          observarDOM.disconnect(); // Deja de observar después de encontrarlo
        }
      }
    });
  });

  // Comienza a observar el body del DOM
  observarDOM.observe(document.body, { childList: true, subtree: true });

  // Si el elemento ya existe en el DOM
  const buscarBoxInicial = document.getElementById("buscarbox");
  if (buscarBoxInicial) {
    console.log("Elemento 'buscarbox' ya existe en el DOM");
    agregarEventoBuscar(buscarBoxInicial);
    observarDOM.disconnect(); // No es necesario seguir observando
  }

  // Función para agregar el evento de búsqueda
  function agregarEventoBuscar(buscarBox) {
    buscarBox.addEventListener("input", function () {
      const filtro = buscarBox.value.toLowerCase();
      const filas = document.querySelectorAll("#tabla-tiendas tbody tr");

      filas.forEach((fila) => {
        const textoFila = fila.textContent.toLowerCase();
        fila.style.display = textoFila.includes(filtro) ? "" : "none";
      });
    });
  }
});

//Limpiar busqueda
document.addEventListener("DOMContentLoaded", function () {
  // Delegación del evento 'input' en el campo de búsqueda
  document.addEventListener("input", function (event) {
    if (event.target.id === "buscarbox") {
      const buscarBox = event.target; // El input dinámico
      const filtro = buscarBox.value.toLowerCase();
      const limpiarBusqueda = document.getElementById("limpiar-busqueda"); // Botón dinámico
      const filas = document.querySelectorAll("#tabla-tiendas tbody tr");
      const mensajeVacio = document.getElementById("mensaje-vacio");

      let coincidencias = 0; // Contador de filas visibles

      filas.forEach((fila) => {
        const textoFila = fila.textContent.toLowerCase();
        if (textoFila.includes(filtro)) {
          fila.style.display = ""; // Mostrar fila
          coincidencias++;
        } else {
          fila.style.display = "none"; // Ocultar fila
        }
      });

      // Mostrar/ocultar mensaje de resultados vacíos
      if (coincidencias === 0) {
        mensajeVacio.style.display = "block";
      } else {
        mensajeVacio.style.display = "none";
      }

      // Filtrar las filas de la tabla
      filas.forEach((fila) => {
        const textoFila = fila.textContent.toLowerCase();
        fila.style.display = textoFila.includes(filtro) ? "" : "none";
      });
    }
  });

  // Delegación del evento 'click' en el botón "Limpiar"
  document.addEventListener("click", function (event) {
    if (event.target.id === "limpiar-busqueda") {
      const buscarBox = document.getElementById("buscarbox");
      const limpiarBusqueda = event.target;

      if (buscarBox) {
        buscarBox.value = ""; // Limpiar el input
        if (limpiarBusqueda) {
          limpiarBusqueda.style.display = "none"; // Ocultar el botón de limpiar
          document.getElementById("mensaje-vacio").style.display = "none";
        }
      }

      const filas = document.querySelectorAll("#tabla-tiendas tbody tr");
      filas.forEach((fila) => {
        fila.style.display = ""; // Mostrar todas las filas
      });
    }
  });
});
