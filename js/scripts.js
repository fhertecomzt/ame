//Función para cambiar de nombre los botones guardar nuevo y actualizar
function cambiarTextoBoton() {
  // Seleccionamos el botón de "Actualizar" / "Guardar" y cambiamos su valor a "Guardar"
  const boton = document.getElementById("botonGuardarActualizar");
  boton.value = "Guardar";
}
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

// Crear tienda
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

          // Crear una nueva fila
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
        Swal.fire({
          title: "¡Éxito!",
          text: data.message, // Usar el mensaje del backend
          icon: "success",
        });

      } else {
        // Mostrar un mensaje de error específico del backend
        Swal.fire({
          title: "Error",
          text: data.message || "Ocurrió un problema.", // Mostrar el mensaje específico si existe
          icon: "error",
        });
      }
    })
    .catch((error) => {
      // Manejar errores inesperados
      console.error("Error:", error);
      Swal.fire({
        title: "Error",
        text: "Ocurrió un error inesperado. Intente más tarde.",
        icon: "error",
      });
    });
}

function validarFormularioTienda(event) {
  event.preventDefault();

  const nombre = document.querySelector("[name='nombre']").value.trim();
  const representante = document
    .querySelector("[name='representante']")
    .value.trim();
  const rfc = document.querySelector("[name='rfc']").value.trim();
  const domicilio = document.querySelector("[name='domicilio']").value.trim();
  const noexterior = document.querySelector("[name='noexterior']").value.trim();
  const nointerior = document.querySelector("[name='nointerior']").value.trim();
  const colonia = document.querySelector("[name='colonia']").value.trim();
  const ciudad = document.querySelector("[name='ciudad']").value.trim();
  const estado = document.querySelector("[name='estado']").value.trim();

  const errores = [];

  if (nombre.length < 3) {
    errores.push("El nombre debe tener al menos 3 caracteres.");
  }
  if (representante.length < 3) {
    errores.push("El representante debe tener al menos 3 caracteres.");
  }
  if (rfc.length < 12) {
    errores.push("El RFC debe tener al menos 12 caracteres.");
  }
  if (domicilio.length < 3) {
    errores.push("La calle debe tener al menos 3 caracteres.");
  }
  if (isNaN(parseInt(noexterior)) || parseInt(noexterior) < 1) {
    errores.push("El número exterior debe ser mayor a 0");
  }
  if (isNaN(parseInt(nointerior)) || parseInt(nointerior) < 0) {
    errores.push("El número interior debe ser mayor o igual a 0");
  }
  if (colonia.length < 3) {
    errores.push("La colonia debe tener al menos 3 caracteres.");
  }
  if (ciudad.length < 3) {
    errores.push("La ciudad debe tener al menos 3 caracteres.");
  }
  if (estado.length < 3) {
    errores.push("El estado debe tener al menos 3 caracteres.");
  }
  if (errores.length > 0) {
    Swal.fire({
      title: "Errores en el formulario",
      html: errores.join("<br>"),
      icon: "error",
    });
    return;
  }

  // Verificar duplicados
  verificarDuplicado(nombre)
    .then((esDuplicado) => {
      if (esDuplicado) {
        Swal.fire({
          title: "Error",
          text: "El nombre de la tienda ya existe. Por favor, elige otro.",
          icon: "error",
        });
      } else {
        // Si no hay errores, enviar el formulario
        procesarFormulario(event, "crear");
      }
    })
    .catch((error) => {
      console.error("Error al verificar duplicados:", error);
      Swal.fire({
        title: "Error",
        text: "Ocurrió un problema al validar el nombre.",
        icon: "error",
      });
    });
}
function verificarDuplicado(nombre) {
  return fetch("cruds/verificar_nombre.php", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ nombre }),
  })
    .then((response) => response.json())
    .then((data) => {
      return data.existe; // Devuelve true si el nombre ya existe
    });
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
          console.log("Datos recibidos del servidor:", data);

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

      // Validaciones antes de enviar
      if (!formData.get("nombre") || !formData.get("email")) {
        Swal.fire({
          title: "Atención",
          text: "Por favor, completa todos los campos obligatorios.",
          icon: "warning",
        });
        return; // Detener si no pasa las validaciones
      }

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

// Llamar pagina de roles *********************************************
document
  .getElementById("roles-link")
  .addEventListener("click", function (event) {
    event.preventDefault(); // Evita la acción por defecto del enlace
    fetch("roles.php")
      .then((response) => response.text())
      .then((html) => {
        document.getElementById("content-area").innerHTML = html;
      })
      .catch((error) => {
        console.error("Error al cargar el contenido:", error);
      });
  });

//Crear Rol
function abrirModalRol(id) {
  document.getElementById(id).style.display = "flex";
}

function cerrarModalRol(id) {
  document.getElementById(id).style.display = "none";
}

function procesarFormularioRol(event, tipo) {
  event.preventDefault();
  const formData = new FormData(event.target);

  fetch(`cruds/procesar_${tipo}_rol.php`, {
    method: "POST",
    body: formData,
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        // Cerrar el modal
        cerrarModalRol(tipo + "-modalRol");

        // Actualizar la tabla dinámicamente si es 'crear'
        if (tipo === "crear") {
          const tbody = document.querySelector("table tbody");

          // Crear una nueva fila
          const newRow = document.createElement("tr");
          newRow.innerHTML = `
            <td>${data.rol.nombre}</td>
            <td>${data.rol.descripcion}</td>
            <td>
              <button title="Editar" class="editarRol fa-solid fa-pen-to-square" data-id="${data.rol.id}"></button>
              <button title="Eliminar" class="eliminarRol fa-solid fa-trash" data-id="${data.rol.id}"></button>
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
//Para editar rol
document.addEventListener("DOMContentLoaded", function () {
  document.addEventListener("click", function (event) {
    if (event.target.classList.contains("editarRol")) {
      const id = event.target.dataset.id;
      console.log("Botón editar clickeado. ID:", id);

      fetch(`cruds/obtener_rol.php?id=${id}`)
        .then((response) => response.json())
        .then((data) => {
          console.log("Datos recibidos del servidor:", data);

          if (data.success) {
            const formularioRol = document.getElementById("form-editarRol");
            if (formularioRol) {
              formularioRol["editar-idrol"].value = data.rol.id || "";
              formularioRol["editar-rol"].value = data.rol.nombre || "";
              formularioRol["editar_desc_rol"].value =
                data.rol.descripcion || "";

              abrirModalRol("editar-modalRol");
            } else {
              console.error("Formulario de edición no encontrado.");
            }
          } else {
            alert(data.message || "Error al cargar los datos del Rol.");
          }
        })
        .catch((error) => console.error("Error al obtener Rol:", error));
    }
  });

  // Delegación de eventos para el formulario dinámico
  document.body.addEventListener("submit", function (event) {
    if (event.target && event.target.id === "form-editarRol") {
      event.preventDefault(); // Esto evita el comportamiento predeterminado de recargar la página.

      const formData = new FormData(event.target);

      fetch("cruds/editar_rol.php", {
        method: "POST",
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => {
          //Prueba console.log("Respuesta del servidorEdit:", data); // Para depuración
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
              .querySelector(
                `button[data-id="${formData.get("editar-idrol")}"]`
              )
              .closest("tr");
            if (fila) {
              fila.cells[0].textContent = formData.get("rol");
              fila.cells[1].textContent = formData.get("desc_rol");
            }
            cerrarModalRol("editar-modalRol");
          } else {
            // Mensaje de error o advertencia del servidor con SweetAlert
            Swal.fire({
              title: "Atención",
              text: data.message || "Hubo un error al actualizar el registro.",
              icon: "warning",
            });
          }
        })
        .catch((error) => {
          console.error("Error al intentar actualizar el registro:", error);
          // Mensaje de error general con SweetAlert
          Swal.fire({
            title: "Error",
            text: "Ocurrió un problema al intentar el registro.",
            icon: "error",
          });
        });
    }
  });
});

// Eliminar
document.addEventListener("click", function (event) {
  if (event.target.classList.contains("eliminarRol")) {
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
        fetch(`cruds/eliminar_rol.php?id=${id}`, { method: "POST" })
          .then((response) => response.json())
          .then((data) => {
            if (data.success) {
              //alert("Registro eliminado correctamente");
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
        const buscarBox = document.getElementById("buscarboxrol");
        if (buscarBox) {
          //console.log("Elemento 'buscarbox' encontrado dinámicamente");
          agregarEventoBuscarRol(buscarBox);
          observarDOM.disconnect(); // Deja de observar después de encontrarlo
        }
      }
    });
  });

  // Comienza a observar el body del DOM
  observarDOM.observe(document.body, { childList: true, subtree: true });

  // Si el elemento ya existe en el DOM
  const buscarBoxInicial = document.getElementById("buscarboxrol");
  if (buscarBoxInicial) {
    console.log("Elemento 'buscarboxrol' ya existe en el DOM");
    agregarEventoBuscarRol(buscarBoxInicial);
    observarDOM.disconnect(); // No es necesario seguir observando
  }

  // Función para agregar el evento de búsqueda
  function agregarEventoBuscarRol(buscarBox) {
    buscarBox.addEventListener("input", function () {
      const filtro = buscarBox.value.toLowerCase();
      const filas = document.querySelectorAll("#tabla-roles tbody tr");

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
    if (event.target.id === "buscarboxrol") {
      const buscarBox = event.target; // El input dinámico
      const filtro = buscarBox.value.toLowerCase();
      const limpiarBusquedaRol = document.getElementById("limpiar-busquedaRol"); // Botón dinámico
      const filas = document.querySelectorAll("#tabla-roles tbody tr");
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
    if (event.target.id === "limpiar-busquedaRol") {
      const buscarBox = document.getElementById("buscarboxrol");
      const limpiarBusquedaRol = event.target;

      if (buscarBox) {
        buscarBox.value = ""; // Limpiar el input
        if (limpiarBusquedaRol) {
          limpiarBusquedaRol.style.display = "none"; // Ocultar el botón de limpiar
          document.getElementById("mensaje-vacio").style.display = "none";
        }
      }

      const filas = document.querySelectorAll("#tabla-roles tbody tr");
      filas.forEach((fila) => {
        fila.style.display = ""; // Mostrar todas las filas
      });
    }
  });
});

// Llamar pagina usuarios *********************************************
document
  .getElementById("usuarios-link")
  .addEventListener("click", function (event) {
    event.preventDefault(); // Evita la acción por defecto del enlace
    fetch("usuarios.php")
      .then((response) => response.text())
      .then((html) => {
        document.getElementById("content-area").innerHTML = html;
      })
      .catch((error) => {
        console.error("Error al cargar el contenido:", error);
      });
  });

//Crear usuario
function abrirModalUser(id) {
  document.getElementById(id).style.display = "flex";
}

function cerrarModalUser(id) {
  document.getElementById(id).style.display = "none";
}

function procesarFormularioUser(event, tipo) {
  event.preventDefault();
  const formData = new FormData(event.target);

  fetch(`cruds/procesar_${tipo}_user.php`, {
    method: "POST",
    body: formData,
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        // Cerrar el modal
        cerrarModalUser(tipo + "-modalUser");

        // Actualizar la tabla dinámicamente si es 'crear'
        if (tipo === "crear") {
          const tbody = document.querySelector("table tbody");

          // Crear una nueva fila
          const newRow = document.createElement("tr");
          newRow.innerHTML = `
            <td>${data.users.id}</td>
            <td>${data.users.usuario}</td>
            <td>${data.users.nombre}</td>
            <td>
              <button title="Editar" class="editarUser fa-solid fa-pen-to-square" data-id="${data.users.id}"></button>
              <button title="Eliminar" class="eliminarUser fa-solid fa-trash" data-id="${data.users.id}"></button>
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
//Para editar usuario
document.addEventListener("DOMContentLoaded", function () {
  document.addEventListener("click", function (event) {
    if (event.target.classList.contains("editarUser")) {
      const id = event.target.dataset.id;
      console.log("Botón editar clickeado. ID:", id);

      fetch(`cruds/obtener_user.php?id=${id}`)
        .then((response) => response.json())
        .then((data) => {
          console.log("Datos recibidos del servidor:", data); //Depuracion

          if (data.success) {
            const formularioUsuario =
              document.getElementById("form-editarUser");
            if (formularioUsuario) {
              formularioUsuario["editar-iduser"].value = data.users.id || "";
              formularioUsuario["editar-User"].value = data.users.usuario || "";
              formularioUsuario["editar-nombre"].value =
                data.users.nombre || "";
              formularioUsuario["editar-papellido"].value =
                data.users.papellido || "";
              formularioUsuario["editar-sapellido"].value =
                data.users.sapellido || "";
              formularioUsuario["idrol"].value = data.users.rol || "";
              formularioUsuario["sucursales_id"].value =
                data.users.tienda || "";
              formularioUsuario["comision"].value = data.users.comision || "";

              abrirModalUser("editar-modalUser");
            } else {
              console.error("Formulario de edición no encontrado.");
            }
          } else {
            alert(data.message || "Error al cargar los datos del Usuario.");
          }
        })
        .catch((error) => console.error("Error al obtener Usuario:", error));
    }
  });

  // Delegación de eventos para el formulario dinámico
  document.body.addEventListener("submit", function (event) {
    if (event.target && event.target.id === "form-editarUser") {
      event.preventDefault(); // Esto evita el comportamiento predeterminado de recargar la página.

      const formData = new FormData(event.target);

      fetch("cruds/editar_user.php", {
        method: "POST",
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => {
          //Prueba console.log("Respuesta del servidorEdit:", data); // Para depuración
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
              .querySelector(
                `button[data-id="${formData.get("editar-iduser")}"]`
              )
              .closest("tr");
            if (fila) {
              fila.cells[1].textContent = formData.get("editar-User");
              fila.cells[2].textContent = formData.get("editar-nombre");
              fila.cells[3].textContent = formData.get("editar-papellido");
              fila.cells[4].textContent = formData.get("editar-sapellido");
            }

            cerrarModalUser("editar-modalUser");
          } else {
            // Mensaje de error o advertencia del servidor con SweetAlert
            Swal.fire({
              title: "Atención",
              text: data.message || "Hubo un error al actualizar el registro.",
              icon: "warning",
            });
          }
        })
        .catch((error) => {
          console.error("Error al intentar actualizar el registro:", error);
          // Mensaje de error general con SweetAlert
          Swal.fire({
            title: "Error",
            text: "Ocurrió un problema al intentar el registro.",
            icon: "error",
          });
        });
    }
  });
});

// Eliminar
document.addEventListener("click", function (event) {
  if (event.target.classList.contains("eliminarUser")) {
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
        fetch(`cruds/eliminar_user.php?id=${id}`, { method: "POST" })
          .then((response) => response.json())
          .then((data) => {
            if (data.success) {
              //alert("Registro eliminado correctamente");
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
        const buscarBox = document.getElementById("buscarboxusuario");
        if (buscarBox) {
          //console.log("Elemento 'buscarbox' encontrado dinámicamente");
          agregarEventoBuscarUsuario(buscarBox);
          observarDOM.disconnect(); // Deja de observar después de encontrarlo
        }
      }
    });
  });

  // Comienza a observar el body del DOM
  observarDOM.observe(document.body, { childList: true, subtree: true });

  // Si el elemento ya existe en el DOM
  const buscarBoxInicial = document.getElementById("buscarboxusuario");
  if (buscarBoxInicial) {
    console.log("Elemento 'buscarboxusuario' ya existe en el DOM");
    agregarEventoBuscarUsuario(buscarBoxInicial);
    observarDOM.disconnect(); // No es necesario seguir observando
  }

  // Función para agregar el evento de búsqueda
  function agregarEventoBuscarUsuario(buscarBox) {
    buscarBox.addEventListener("input", function () {
      const filtro = buscarBox.value.toLowerCase();
      const filas = document.querySelectorAll("#tabla-usuarios tbody tr");

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
    if (event.target.id === "buscarboxusuario") {
      const buscarBox = event.target; // El input dinámico
      const filtro = buscarBox.value.toLowerCase();
      const limpiarBusquedaUsuario = document.getElementById(
        "limpiar-busquedaUsuario"
      ); // Botón dinámico
      const filas = document.querySelectorAll("#tabla-usuarios tbody tr");
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
    if (event.target.id === "limpiar-busquedaUsuarios") {
      const buscarBox = document.getElementById("buscarboxusuario");
      const limpiarBusquedaUsuarios = event.target;

      if (buscarBox) {
        buscarBox.value = ""; // Limpiar el input
        if (limpiarBusquedaUsuarios) {
          limpiarBusquedaUsuarios.style.display = "none"; // Ocultar el botón de limpiar
          document.getElementById("mensaje-vacio").style.display = "none";
        }
      }

      const filas = document.querySelectorAll("#tabla-usuarios tbody tr");
      filas.forEach((fila) => {
        fila.style.display = ""; // Mostrar todas las filas
      });
    }
  });
});

// Llamar formulario de categorias ***********************************************
document
  .getElementById("categorias-link")
  .addEventListener("click", function (event) {
    event.preventDefault(); // Evita la acción por defecto del enlace
    fetch("catalogos/categorias.php")
      .then((response) => response.text())
      .then((html) => {
        document.getElementById("content-area").innerHTML = html;
      })
      .catch((error) => {
        console.error("Error al cargar el contenido:", error);
      });
  });

//Crear Categoria
function abrirModalCat(id) {
  document.getElementById(id).style.display = "flex";
}

function cerrarModalCat(id) {
  document.getElementById(id).style.display = "none";
}

function procesarFormularioCat(event, tipo) {
  event.preventDefault();
  const formData = new FormData(event.target);

  fetch(`cruds/procesar_${tipo}_cat.php`, {
    method: "POST",
    body: formData,
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        // Cerrar el modal
        cerrarModalCat(tipo + "-modalCat");

        // Actualizar la tabla dinámicamente si es 'crear'
        if (tipo === "crear") {
          const tbody = document.querySelector("table tbody");

          // Crear una nueva fila
          const newRow = document.createElement("tr");
          newRow.innerHTML = `
            <td>${data.cats.id}</td>
            <td>${data.cats.nombre}</td>
            <td>${data.cats.descripcion}</td>
            <td>
              <button title="Editar" class="editarCat fa-solid fa-pen-to-square" data-id="${data.cats.id}"></button>
              <button title="Eliminar" class="eliminarCat fa-solid fa-trash" data-id="${data.cats.id}"></button>
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

//Para editar categoria
document.addEventListener("DOMContentLoaded", function () {
  document.addEventListener("click", function (event) {
    if (event.target.classList.contains("editarUser")) {
      const id = event.target.dataset.id;
      console.log("Botón editar clickeado. ID:", id);

      fetch(`cruds/obtener_user.php?id=${id}`)
        .then((response) => response.json())
        .then((data) => {
          console.log("Datos recibidos del servidor:", data); //Depuracion

          if (data.success) {
            const formularioUsuario =
              document.getElementById("form-editarUser");
            if (formularioUsuario) {
              formularioUsuario["editar-iduser"].value = data.users.id || "";
              formularioUsuario["editar-User"].value = data.users.usuario || "";
              formularioUsuario["editar-nombre"].value =
                data.users.nombre || "";
              formularioUsuario["editar-papellido"].value =
                data.users.papellido || "";
              formularioUsuario["editar-sapellido"].value =
                data.users.sapellido || "";
              formularioUsuario["idrol"].value = data.users.rol || "";
              formularioUsuario["sucursales_id"].value =
                data.users.tienda || "";
              formularioUsuario["comision"].value = data.users.comision || "";

              abrirModalUser("editar-modalUser");
            } else {
              console.error("Formulario de edición no encontrado.");
            }
          } else {
            alert(data.message || "Error al cargar los datos del Usuario.");
          }
        })
        .catch((error) => console.error("Error al obtener Usuario:", error));
    }
  });

  // Delegación de eventos para el formulario dinámico
  document.body.addEventListener("submit", function (event) {
    if (event.target && event.target.id === "form-editarUser") {
      event.preventDefault(); // Esto evita el comportamiento predeterminado de recargar la página.

      const formData = new FormData(event.target);

      fetch("cruds/editar_user.php", {
        method: "POST",
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => {
          //Prueba console.log("Respuesta del servidorEdit:", data); // Para depuración
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
              .querySelector(
                `button[data-id="${formData.get("editar-iduser")}"]`
              )
              .closest("tr");
            if (fila) {
              fila.cells[1].textContent = formData.get("editar-User");
              fila.cells[2].textContent = formData.get("editar-nombre");
              fila.cells[3].textContent = formData.get("editar-papellido");
              fila.cells[4].textContent = formData.get("editar-sapellido");
            }

            cerrarModalUser("editar-modalUser");
          } else {
            // Mensaje de error o advertencia del servidor con SweetAlert
            Swal.fire({
              title: "Atención",
              text: data.message || "Hubo un error al actualizar el registro.",
              icon: "warning",
            });
          }
        })
        .catch((error) => {
          console.error("Error al intentar actualizar el registro:", error);
          // Mensaje de error general con SweetAlert
          Swal.fire({
            title: "Error",
            text: "Ocurrió un problema al intentar el registro.",
            icon: "error",
          });
        });
    }
  });
});

// Eliminar
document.addEventListener("click", function (event) {
  if (event.target.classList.contains("eliminarUser")) {
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
        fetch(`cruds/eliminar_user.php?id=${id}`, { method: "POST" })
          .then((response) => response.json())
          .then((data) => {
            if (data.success) {
              //alert("Registro eliminado correctamente");
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
        const buscarBox = document.getElementById("buscarboxusuario");
        if (buscarBox) {
          //console.log("Elemento 'buscarbox' encontrado dinámicamente");
          agregarEventoBuscarUsuario(buscarBox);
          observarDOM.disconnect(); // Deja de observar después de encontrarlo
        }
      }
    });
  });

  // Comienza a observar el body del DOM
  observarDOM.observe(document.body, { childList: true, subtree: true });

  // Si el elemento ya existe en el DOM
  const buscarBoxInicial = document.getElementById("buscarboxusuario");
  if (buscarBoxInicial) {
    console.log("Elemento 'buscarboxusuario' ya existe en el DOM");
    agregarEventoBuscarUsuario(buscarBoxInicial);
    observarDOM.disconnect(); // No es necesario seguir observando
  }

  // Función para agregar el evento de búsqueda
  function agregarEventoBuscarUsuario(buscarBox) {
    buscarBox.addEventListener("input", function () {
      const filtro = buscarBox.value.toLowerCase();
      const filas = document.querySelectorAll("#tabla-usuarios tbody tr");

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
    if (event.target.id === "buscarboxusuario") {
      const buscarBox = event.target; // El input dinámico
      const filtro = buscarBox.value.toLowerCase();
      const limpiarBusquedaUsuario = document.getElementById(
        "limpiar-busquedaUsuario"
      ); // Botón dinámico
      const filas = document.querySelectorAll("#tabla-usuarios tbody tr");
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
    if (event.target.id === "limpiar-busquedaUsuarios") {
      const buscarBox = document.getElementById("buscarboxusuario");
      const limpiarBusquedaUsuarios = event.target;

      if (buscarBox) {
        buscarBox.value = ""; // Limpiar el input
        if (limpiarBusquedaUsuarios) {
          limpiarBusquedaUsuarios.style.display = "none"; // Ocultar el botón de limpiar
          document.getElementById("mensaje-vacio").style.display = "none";
        }
      }

      const filas = document.querySelectorAll("#tabla-usuarios tbody tr");
      filas.forEach((fila) => {
        fila.style.display = ""; // Mostrar todas las filas
      });
    }
  });
});

// Llamar formulario de Marcas ********************************************
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
