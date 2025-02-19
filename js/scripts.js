//Función para cambiar de nombre los botones guardar nuevo y actualizar
function cambiarTextoBoton() {
  // Seleccionamos el botón de "Actualizar" / "Guardar" y cambiamos su valor a "Guardar"
  const boton = document.getElementById("botonGuardarActualizar");
  boton.value = "Guardar";
}
//Llamar pagina de Tiendas****************
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

// Crear Tiendas************
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
        // Limpiar los campos del formulario
        event.target.reset();

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
    const inputname = document.querySelector("#crear-nombre");
    inputname.focus();
    inputname.classList.add("input-error"); // Añade la clase de error
  }
  // Elimina la clase de error al corregir
  const inputname = document.querySelector("#crear-nombre");
  inputname.addEventListener("input", () => {
    if (inputname.value.length >= 3) {
      inputname.classList.remove("input-error"); // Quita la clase si el campo es válido
    }
  });

  if (representante.length < 3) {
    errores.push("El representante debe tener al menos 3 caracteres.");
    const inputrep = document.querySelector("#crear-representante");
    inputrep.focus();
    inputrep.classList.add("input-error"); // Añade la clase de error
  }
  // Elimina la clase de error al corregir
  const inputrep = document.querySelector("#crear-representante");
  inputrep.addEventListener("input", () => {
    if (inputrep.value.length >= 3) {
      inputrep.classList.remove("input-error"); // Quita la clase si el campo es válido
    }
  });

  if (rfc.length < 12) {
    errores.push("El RFC debe tener al menos 12 caracteres.");
    const inputrfc = document.querySelector("#crear-rfc");
    inputrfc.focus();
    inputrfc.classList.add("input-error"); // Añade la clase de error
  }
  // Elimina la clase de error al corregir
  const inputrfc = document.querySelector("#crear-rfc");
  inputrfc.addEventListener("input", () => {
    if (inputrfc.value.length >= 12) {
      inputrfc.classList.remove("input-error"); // Quita la clase si el campo es válido
    }
  });

  if (domicilio.length < 3) {
    errores.push("La calle debe tener al menos 3 caracteres.");
    const inputdomicilio = document.querySelector("#crear-domicilio");
    inputdomicilio.focus();
    inputdomicilio.classList.add("input-error"); // Añade la clase de error
  }
  // Elimina la clase de error al corregir
  const inputdomicilio = document.querySelector("#crear-domicilio");
  inputdomicilio.addEventListener("input", () => {
    if (inputdomicilio.value.length >= 3) {
      inputdomicilio.classList.remove("input-error"); // Quita la clase si el campo es válido
    }
  });

  if (isNaN(parseInt(noexterior)) || parseInt(noexterior) < 1) {
    errores.push("El número exterior debe ser mayor a 0");
    const inputnoexterior = document.querySelector("#crear-noexterior");
    inputnoexterior.focus();
    inputnoexterior.classList.add("input-error"); // Añade la clase de error
  }
  // Elimina la clase de error al corregir
  const inputnoexterior = document.querySelector("#crear-noexterior");
  inputnoexterior.addEventListener("input", () => {
    if (inputnoexterior.value.length >= 1) {
      inputnoexterior.classList.remove("input-error"); // Quita la clase si el campo es válido
    }
  });

  if (isNaN(parseInt(nointerior)) || parseInt(nointerior) < 0) {
    errores.push("El número interior debe ser mayor o igual a 0");
    const inputnointerior = document.querySelector("#crear-nointerior");
    inputnointerior.focus();
    inputnointerior.classList.add("input-error"); // Añade la clase de error
  }
  // Elimina la clase de error al corregir
  const inputnointerior = document.querySelector("#crear-nointerior");
  inputnointerior.addEventListener("input", () => {
    if (inputnointerior.value.length >= 1) {
      inputnointerior.classList.remove("input-error"); // Quita la clase si el campo es válido
    }
  });

  if (colonia.length < 3) {
    errores.push("La colonia debe tener al menos 3 caracteres.");
    const inputcolonia = document.querySelector("#crear-colonia");
    inputcolonia.focus();
    inputcolonia.classList.add("input-error"); // Añade la clase de error
  }
  // Elimina la clase de error al corregir
  const inputcolonia = document.querySelector("#crear-colonia");
  inputcolonia.addEventListener("input", () => {
    if (inputcolonia.value.length >= 3) {
      inputcolonia.classList.remove("input-error"); // Quita la clase si el campo es válido
    }
  });

  if (ciudad.length < 3) {
    errores.push("La ciudad debe tener al menos 3 caracteres.");
    const inputciudad = document.querySelector("#crear-ciudad");
    inputciudad.focus();
    inputciudad.classList.add("input-error"); // Añade la clase de error
  }
  // Elimina la clase de error al corregir
  const inputciudad = document.querySelector("#crear-ciudad");
  inputciudad.addEventListener("input", () => {
    if (inputciudad.value.length >= 3) {
      inputciudad.classList.remove("input-error"); // Quita la clase si el campo es válido
    }
  });

  if (estado.length < 3) {
    errores.push("El estado debe tener al menos 3 caracteres.");
    const inputestado = document.querySelector("#crear-estado");
    inputestado.focus();
    inputestado.classList.add("input-error"); // Añade la clase de error
  }
  // Elimina la clase de error al corregir
  const inputestado = document.querySelector("#crear-estado");
  inputestado.addEventListener("input", () => {
    if (inputestado.value.length >= 3) {
      inputestado.classList.remove("input-error"); // Quita la clase si el campo es válido
    }
  });

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
  //console.log("Nombre:", nombre);

  return fetch("cruds/verificar_nombre.php", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ nombre }),
  })
    .then((response) => response.json())
    .then((data) => {
      //console.log("Respuesta de verificar_nombre.php:", data);
      if (data.existe) {
        mostrarAlerta("error", "Error", "El nombre de la tienda ya existe.");
      }
      return data.existe;
    })
    .catch((error) => {
      console.error("Error al verificar duplicado:", error);
      return true; // Asume duplicado en caso de error
    });
}

//Editar Tiendas *************************************
document.addEventListener("DOMContentLoaded", function () {
  // Escuchar clic en el botón de editar
  document.body.addEventListener("click", function (event) {
    if (event.target.classList.contains("editar")) {
      const id = event.target.dataset.id;

      fetch(`cruds/obtener_tienda.php?id=${id}`)
        .then((response) => response.json())
        .then((data) => {
          //console.log("Datos recibidos del servidor:", data);
          if (data.success) {
            const formulario = document.getElementById("form-editar");
            if (formulario) {
              const campos = [
                "id",
                "nombre",
                "representante",
                "rfc",
                "domicilio",
                "noexterior",
                "nointerior",
                "colonia",
                "ciudad",
                "estado",
                "cpostal",
                "email",
                "telefono",
              ];
              campos.forEach((campo) => {
                formulario[`editar-${campo}`].value = data.tienda[campo] || "";
              });
              // console.log("Ese fer", campos);
              abrirModal("editar-modal");
            } else {
              console.error("Formulario de edición no encontrado.");
            }
          } else {
            mostrarAlerta(
              "error",
              "Error",
              data.message || "No se pudo cargar la tienda."
            );
          }
        })
        .catch((error) => {
          console.error("Error al obtener tienda:", error);
          mostrarAlerta(
            "error",
            "Error",
            "Ocurrió un problema al obtener los datos."
          );
        });
    }
  });

  // Validar y enviar el formulario de edición
  document.body.addEventListener("submit", function (event) {
    if (event.target && event.target.id === "form-editar") {
      event.preventDefault();
      validarFormularioEdicion(event.target);
    }
  });
});

// Función genérica para mostrar alertas
function mostrarAlerta(tipo, titulo, mensaje) {
  Swal.fire({ title: titulo, text: mensaje, icon: tipo });
}

//Validar duplicados en edicion

function verificarDuplicadoEditarTienda(nombre, id = 0) {
  //console.log("Nombre:", nombre);
  //console.log("ID (si aplica):", id);

  return fetch("cruds/verificar_nombre.php", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ nombre, id }),
  })
    .then((response) => response.json())
    .then((data) => {
      // console.log("Respuesta de verificar_nombre.php:", data);
      if (data.existe) {
        mostrarAlerta("error", "Error", "El nombre de la tienda ya existe.");
      }
      return data.existe;
    })
    .catch((error) => {
      console.error("Error al verificar duplicado:", error);
      return true; // Asume duplicado en caso de error
    });
}

// Validación del formulario de edición
async function validarFormularioEdicion(formulario) {
  const campos = [
    {
      nombrec: "nombre",
      min: 3,
      mensaje: "El nombre debe tener al menos 3 caracteres.",
    },
    {
      nombrec: "representante",
      min: 3,
      mensaje: "El representante debe tener al menos 3 caracteres.",
    },
    {
      nombrec: "rfc",
      min: 12,
      mensaje: "El RFC debe tener al menos 12 caracteres.",
    },
    {
      nombrec: "domicilio",
      min: 3,
      mensaje: "La calle debe tener al menos 3 caracteres.",
    },
    {
      nombrec: "noexterior",
      min: 1,
      mensaje: "El número exterior debe ser mayor a 0",
      numerico: true,
    },
    {
      nombrec: "nointerior",
      min: 0,
      mensaje: "El número interior debe ser mayor o igual a 0",
      numerico: true,
    },
    {
      nombrec: "colonia",
      min: 3,
      mensaje: "La colonia debe tener al menos 3 caracteres.",
    },
    {
      nombrec: "ciudad",
      min: 3,
      mensaje: "La ciudad debe tener al menos 3 caracteres.",
    },
    {
      nombrec: "estado",
      min: 3,
      mensaje: "El estado debe tener al menos 3 caracteres.",
    },
  ];

  let primerError = null;
  const errores = [];

  // Validar cada campo
  campos.forEach((campo) => {
    const campoFormulario = document.getElementById(`editar-${campo.nombrec}`);
    if (!campoFormulario) {
      console.error(`El campo editar-${campo.nombrec} no se encontró.`);
      return; // Continúa con el siguiente campo
    }
    campoFormulario.addEventListener("input", () => {
      //Quita lo rojo del error al validar que es mayor o igual a su validación
      if (campoFormulario.value.length >= campo.min) {
        campoFormulario.classList.remove("input-error"); // Quita la clase si el campo es válido
      }
    });

    const valor = campoFormulario.value.trim();

    // Verificar si es numérico
    if (campo.numerico) {
      if (isNaN(parseInt(valor)) || parseInt(valor) < campo.min) {
        errores.push(campo.mensaje);
        campoFormulario.classList.add("input-error");
        campoFormulario.focus(); // Establece el foco en el campo inválido
        if (!primerError) primerError = campoFormulario; // Guardar el primer error
      } else {
        campoFormulario.addEventListener("input", () => {
          if (campoFormulario.value.length >= campo.min) {
            campoFormulario.classList.remove("input-error"); // Quita la clase si el campo es válido
          }
        });
        campoFormulario.classList.remove("input-error");
      }
    } else {
      // Validar por longitud mínima
      if (valor.length < campo.min) {
        errores.push(campo.mensaje);
        campoFormulario.classList.add("input-error");
        campoFormulario.focus(); // Establece el foco en el campo inválido
        if (!primerError) primerError = campoFormulario; // Guardar el primer error
      } else {
        campoFormulario.classList.remove("input-error");
      }
    }
  });

  // Si hay errores, mostrar la alerta y enfocar el primer campo con error
  if (errores.length > 0) {
    Swal.fire({
      title: "Errores en el formulario",
      html: errores.join("<br>"),
      icon: "error",
    });
    if (primerError) primerError.focus(); // Enfocar el primer campo con error
    return;
  }

  // Verificar duplicado antes de enviar el formulario
  const nombre = document.getElementById("editar-nombre").value.trim();
  const id = document.getElementById("editar-id").value;
  //console.log("Ver verificado duplicado id: ", id);
  //console.log("Ver verificado duplicado nombre: ", id);

  try {
    const esDuplicado = await verificarDuplicadoEditarTienda(nombre, id);
    if (esDuplicado) {
      return; // No enviar el formulario si hay duplicados
    } else {
      enviarFormularioEdicion(formulario); // Proceder si no hay duplicados
    }
  } catch (error) {
    console.error("Error al verificar duplicado:", error);
  }
}

// Enviar formulario de edición
function enviarFormularioEdicion(formulario) {
  if (!formulario) {
    console.error("El formulario no se encontró.");
    return;
  }
  const formData = new FormData(formulario);

  fetch("cruds/editar_tienda.php", {
    method: "POST",
    body: formData,
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        mostrarAlerta(
          "success",
          "¡Éxito!",
          data.message || "Tienda actualizada correctamente."
        );
        actualizarFilaTabla(formData);
        cerrarModal("editar-modal");
      } else {
        mostrarAlerta(
          "error",
          "Error",
          data.message || "No se pudo actualizar la tienda."
        );
      }
    })
    .catch((error) => {
      console.error("Error al actualizar tienda:", error);
      mostrarAlerta(
        "error",
        "Error",
        "Ocurrió un problema al actualizar la tienda."
      );
    });
}

// Actualizar fila de la tabla
function actualizarFilaTabla(formData) {
  const fila = document
    .querySelector(`button[data-id="${formData.get("editar-id")}"]`)
    .closest("tr");
  if (fila) {
    fila.cells[0].textContent = formData.get("nombre");
    fila.cells[1].textContent = formData.get("representante");
    fila.cells[2].textContent = formData.get("rfc");
    fila.cells[3].textContent = formData.get("email");
  }
}

// Eliminar Tiendas*****************
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

// Llamar pagina de Roles ***********************************************************************************
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
  event.preventDefault(); //Para que no recergue la pagina
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
        // Limpiar los campos del formulario
        event.target.reset();

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
function validarFormularioRol(event) {
  event.preventDefault();

  const rol = document.querySelector("[name='rol']").value.trim();
  const desc_rol = document.querySelector("[name='desc_rol']").value.trim();

  const errores = [];

  if (rol.length < 3) {
    errores.push("El nombre debe tener al menos 3 caracteres.");
    const inputname = document.querySelector("#crear-rol");
    inputname.focus();
    inputname.classList.add("input-error"); // Añade la clase de error
  }
  // Elimina la clase de error al corregir
  const inputname = document.querySelector("#crear-rol");
  inputname.addEventListener("input", () => {
    if (inputname.value.length >= 3) {
      inputname.classList.remove("input-error"); // Quita la clase si el campo es válido
    }
  });

  if (desc_rol.length < 3) {
    errores.push("La descripción debe tener al menos 3 caracteres.");
    const inputdesc = document.querySelector("#crear-desc_rol");
    inputdesc.focus();
    inputdesc.classList.add("input-error"); // Añade la clase de error
  }
  // Elimina la clase de error al corregir
  const inputdesc = document.querySelector("#crear-desc_rol");
  inputdesc.addEventListener("input", () => {
    if (inputdesc.value.length >= 3) {
      inputdesc.classList.remove("input-error"); // Quita la clase si el campo es válido
    }
  });

  if (errores.length > 0) {
    Swal.fire({
      title: "Errores en el formulario",
      html: errores.join("<br>"),
      icon: "error",
    });
    return;
  }

  // Verificar duplicados
  verificarDuplicadoRol(rol)
    .then((esDuplicado) => {
      if (esDuplicado) {
        Swal.fire({
          title: "Error",
          text: "El nombre del Rol ya existe. Por favor, elige otro.",
          icon: "error",
        });
      } else {
        // Si no hay errores, enviar el formulario
        procesarFormularioRol(event, "crear");
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
function verificarDuplicadoRol(rol) {
  //console.log("Nombre verificar:", nombre_rol);

  return fetch("cruds/verificar_nombre_rol.php", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ rol }),
  })
    .then((response) => response.json())
    .then((data) => {
      //console.log("Respuesta de verificar_nombre.php:", data);
      if (data.existe) {
        mostrarAlerta("error", "Error", "El nombre del Rol ya existe.");
      }
      return data.existe;
    })
    .catch((error) => {
      console.error("Error al verificar duplicado:", error);
      return true; // Asume duplicado en caso de error
    });
}
//Editar Roles************************************************************
document.addEventListener("DOMContentLoaded", function () {
  // Escuchar clic en el botón de editar
  document.addEventListener("click", function (event) {
    if (event.target.classList.contains("editarRol")) {
      const id = event.target.dataset.id;
      //console.log("Botón editar clickeado. ID:", id);

      fetch(`cruds/obtener_rol.php?id=${id}`)
        .then((response) => response.json())
        .then((data) => {
          console.log("Datos recibidos del servidor:", data);
          if (data.success) {
            const formularioRol = document.getElementById("form-editarRol");
            if (formularioRol) {
              const campos = ["idrol", "rol", "desc_rol"];
              campos.forEach((campo) => {
                //console.log(`Asignando ${campo}:`, data.rol[campo]);
                formularioRol[`editar-${campo}`].value = data.rol[campo] || "";
              });
              abrirModalRol("editar-modalRol");
            } else {
              console.error("Formulario de edición no encontrado.");
            }
          } else {
            mostrarAlerta(
              "error",
              "Error",
              data.message || "No se pudo cargar el Rol."
            );
          }
        })
        .catch((error) => {
          console.error("Error al obtener Rol:", error);
          mostrarAlerta(
            "error",
            "Error",
            "Ocurrió un problema al obtener los datos."
          );
        });
    }
  });

  // Validar y enviar el formulario de edición
  document.body.addEventListener("submit", function (event) {
    if (event.target && event.target.id === "form-editarRol") {
      event.preventDefault(); // Esto evita el comportamiento predeterminado de recargar la página.
      validarFormularioEdicionRol(event.target);
    }
  });
});

// Función genérica para mostrar alertas
function mostrarAlerta(tipo, titulo, mensaje) {
  Swal.fire({ title: titulo, text: mensaje, icon: tipo });
}

//Validar duplicados en edicion rol
function verificarDuplicadoEditarRol(rol, id = 0) {
  //console.log("Validando duplicados. ID:", id, "Rol:", rol);

  return fetch("cruds/verificar_nombre_rol.php", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ rol, id }),
  })
    .then((response) => response.json())
    .then((data) => {
      //console.log("Respuesta de verificar_nombre.php:", data);
      if (data.existe) {
        mostrarAlerta("error", "Error", "El nombre del Rol ya existe.");
      }
      return data.existe;
    })
    .catch((error) => {
      console.error("Error al verificar duplicado:", error);
      return true; // Asume duplicado en caso de error
    });
}
// Validación del formulario de edición Rol
async function validarFormularioEdicionRol(formulario) {
  const campos = [
    {
      nombre: "rol",
      min: 3,
      mensaje: "El rol debe tener al menos 3 caracteres.",
    },
    {
      nombre: "desc_rol",
      min: 3,
      mensaje: "La descripción debe tener al menos 3 caracteres.",
    },
  ];
  let primerError = null;
  const errores = [];

  // Validar cada campo
  campos.forEach((campo) => {
    const campoFormulario = document.getElementById(`editar-${campo.nombre}`);
    if (!campoFormulario) {
      console.error(`El campo editar-${campo.nombre} no se encontró.`);
      return; // Continúa con el siguiente campo
    }
    campoFormulario.addEventListener("input", () => {
      //Quita lo rojo del error al validar que es mayor o igual a su validación
      if (campoFormulario.value.length >= campo.min) {
        campoFormulario.classList.remove("input-error"); // Quita la clase si el campo es válido
      }
    });
    const valor = campoFormulario.value.trim();
    // Validar por longitud mínima
    if (valor.length < campo.min) {
      errores.push(campo.mensaje);
      campoFormulario.classList.add("input-error");
      campoFormulario.focus(); // Establece el foco en el campo inválido
      if (!primerError) primerError = campoFormulario; // Guardar el primer error
    } else {
      campoFormulario.classList.remove("input-error");
    }
  });
  // Si hay errores, mostrar la alerta y enfocar el primer campo con error
  if (errores.length > 0) {
    Swal.fire({
      title: "Errores en el formulario",
      html: errores.join("<br>"),
      icon: "error",
    });
    if (primerError) primerError.focus(); // Enfocar el primer campo con error
    return;
  }

  // Verificar duplicado antes de enviar el formulario
  const rolInput = document.getElementById("editar-rol");
  const idInput = document.getElementById("editar-idrol");
  if (!rolInput || !idInput) {
    console.log("Error: No se encontró el campo de Rol o ID.");
    return;
  }
  const rol = rolInput.value.trim();
  const id = idInput.value;

  try {
    //console.log("Verificando duplicado. ID:", id, "Rol:", rol);
    const esDuplicado = await verificarDuplicadoEditarRol(rol, id);
    if (esDuplicado) {
      return; // No enviar el formulario si hay duplicados
    } else {
      //cerrarModalRol("editar-modalRol");
      enviarFormularioEdicionRol(formulario); // Proceder si no hay duplicados
    }
  } catch (error) {
    console.error("Error al verificar duplicado:", error);
  }
}
// Enviar formulario de edición rol
function enviarFormularioEdicionRol(formulario) {
  if (!formulario) {
    console.error("El formulario no se encontró.");
    return;
  }
  const formData = new FormData(formulario);

  fetch("cruds/editar_rol.php", {
    method: "POST",
    body: formData,
  })
    .then((response) => response.json())
    .then((data) => {
      //console.log("Respuesta del servidorEdit:", data);
      if (data.success) {
        mostrarAlerta(
          "success",
          "¡Éxito!",
          data.message || "Rol actualizado correctamente."
        );
        actualizarFilaTablaRol(formData);
        cerrarModal("editar-modalRol");
      } else {
        mostrarAlerta(
          "error",
          "Error",
          data.message || "No se pudo actualizar el Rol."
        );
      }
    })
    .catch((error) => {
      console.error("Error al actualizar tienda:", error);
      mostrarAlerta(
        "error",
        "Error",
        "Ocurrió un problema al actualizar la tienda."
      );
    });
}
// Actualizar fila de la tabla
function actualizarFilaTablaRol(formData) {
  const fila = document
    .querySelector(`button[data-id="${formData.get("editar-idrol")}"]`)
    .closest("tr");
  //console.log(formData.get("editar-idrol"));
  if (fila) {
    fila.cells[0].textContent = formData.get("rol");
    fila.cells[1].textContent = formData.get("desc_rol");
  }
}
// Eliminar Roles*****************
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

// Llamar pagina Usuarios *********************************************
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

// Llamar formulario de Categorias ***************************************************
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

//Crear Categoria******************************************
function abrirModalCat(id) {
  document.getElementById(id).style.display = "flex";
}

function cerrarModalCat(id) {
  document.getElementById(id).style.display = "none";
}

function procesarFormularioCat(event, tipo) {
  event.preventDefault(); //Para que no recergue la pagina
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
        // Limpiar los campos del formulario
        event.target.reset();

        // Actualizar la tabla dinámicamente si es 'crear'
        if (tipo === "crear") {
          const tbody = document.querySelector("table tbody");

          // Crear una nueva fila
          const newRow = document.createElement("tr");
          newRow.innerHTML = `
            <td>${data.cat.nombre}</td>
            <td>${data.cat.descripcion}</td>
            <td>
              <button title="Editar" class="editarCat fa-solid fa-pen-to-square" data-id="${data.cat.id}"></button>
              <button title="Eliminar" class="eliminarCat fa-solid fa-trash" data-id="${data.cat.id}"></button>
            </td>
          `;

          // Agregar la nueva fila a la tabla
          tbody.appendChild(newRow);
        }

        // Mostrar un mensaje de éxito
        Swal.fire({
          title: "¡Éxito!",
          text: "La acción se realizó correctamente.",
          icon: "success",
        });
      } else {
        // Mostrar un mensaje de error
        Swal.fire({
          title: "Error",
          text: "Ocurrió un problema.",
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
function validarFormularioCat(event) {
  event.preventDefault();

  const cat = document.querySelector("[name='cat']").value.trim();
  const desc_cat = document.querySelector("[name='desc_cat']").value.trim();

  const errores = [];

  if (cat.length < 3) {
    errores.push("El nombre debe tener al menos 3 caracteres.");
    const inputname = document.querySelector("#crear-cat");
    inputname.focus();
    inputname.classList.add("input-error"); // Añade la clase de error
  }
  // Elimina la clase de error al corregir
  const inputname = document.querySelector("#crear-cat");
  inputname.addEventListener("input", () => {
    if (inputname.value.length >= 3) {
      inputname.classList.remove("input-error"); // Quita la clase si el campo es válido
    }
  });

  if (desc_cat.length < 3) {
    errores.push("La descripción debe tener al menos 3 caracteres.");
    const inputdesc = document.querySelector("#crear-desc_cat");
    inputdesc.focus();
    inputdesc.classList.add("input-error"); // Añade la clase de error
  }
  // Elimina la clase de error al corregir
  const inputdesc = document.querySelector("#crear-desc_cat");
  inputdesc.addEventListener("input", () => {
    if (inputdesc.value.length >= 3) {
      inputdesc.classList.remove("input-error"); // Quita la clase si el campo es válido
    }
  });

  if (errores.length > 0) {
    Swal.fire({
      title: "Errores en el formulario",
      html: errores.join("<br>"),
      icon: "error",
    });
    return;
  }

  // Verificar duplicados
  verificarDuplicadoCat(cat)
    .then((esDuplicado) => {
      if (esDuplicado) {
        Swal.fire({
          title: "Error",
          text: "El nombre de la Categoría ya existe. Por favor, elige otro.",
          icon: "error",
        });
      } else {
        // Si no hay errores, enviar el formulario
        procesarFormularioCat(event, "crear");
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
function verificarDuplicadoCat(cat) {
  //console.log("Nombre verificar duplicado:", nombre_cat);

  return fetch("cruds/verificar_nombre_cat.php", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ cat }),
  })
    .then((response) => response.json())
    .then((data) => {
      //console.log("Respuesta de verificar_nombre.php:", data);
      if (data.existe) {
        mostrarAlerta("error", "Error", "El nombre de la Categoría ya existe.");
      }
      return data.existe;
    })
    .catch((error) => {
      console.error("Error al verificar duplicado:", error);
      return true; // Asume duplicado en caso de error
    });
}
//Editar Categorias************************************************************
document.addEventListener("DOMContentLoaded", function () {
  // Escuchar clic en el botón de editar
  document.addEventListener("click", function (event) {
    if (event.target.classList.contains("editarCat")) {
      const id = event.target.dataset.id;
      //console.log("Botón editar clickeado. ID:", id);

      fetch(`cruds/obtener_cat.php?id=${id}`)
        .then((response) => response.json())
        .then((data) => {
          //console.log("Datos recibidos del servidor:", data);
          if (data.success) {
            const formularioCat = document.getElementById("form-editarCat");
            if (formularioCat) {
              const campos = ["idcat", "cat", "desc_cat"];
              campos.forEach((campo) => {
                //console.log(`Asignando ${campo}:`, data.cat[campo]);
                formularioCat[`editar-${campo}`].value = data.cat[campo] || "";
              });
              abrirModalCat("editar-modalCat");
            } else {
              console.error("Formulario de edición no encontrado.");
            }
          } else {
            mostrarAlerta(
              "error",
              "Error",
              data.message || "No se pudo cargar la Categoría."
            );
          }
        })
        .catch((error) => {
          console.error("Error al obtener Categoría:", error);
          mostrarAlerta(
            "error",
            "Error",
            "Ocurrió un problema al obtener los datos."
          );
        });
    }
  });

  // Validar y enviar el formulario de edición
  document.body.addEventListener("submit", function (event) {
    if (event.target && event.target.id === "form-editarCat") {
      event.preventDefault(); // Esto evita el comportamiento predeterminado de recargar la página.
      validarFormularioEdicionCat(event.target);
    }
  });
});

// Función genérica para mostrar alertas
function mostrarAlerta(tipo, titulo, mensaje) {
  Swal.fire({ title: titulo, text: mensaje, icon: tipo });
}

//Validar duplicados en edicion Categoria
function verificarDuplicadoEditarCat(cat, id = 0) {
  //console.log("Validando duplicados. ID:", id, "Cat:", cat);

  return fetch("cruds/verificar_nombre_cat.php", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ cat, id }),
  })
    .then((response) => response.json())
    .then((data) => {
      // console.log("Respuesta de verificar_nombre.php:", data);
      if (data.existe) {
        mostrarAlerta("error", "Error", "El nombre de la Categoría ya existe.");
      }
      return data.existe;
    })
    .catch((error) => {
      console.error("Error al verificar duplicado:", error);
      return true; // Asume duplicado en caso de error
    });
}
// Validación del formulario de edición Categoria
async function validarFormularioEdicionCat(formulario) {
  const campos = [
    {
      nombre: "cat",
      min: 3,
      mensaje: "La categoría debe tener al menos 3 caracteres.",
    },
    {
      nombre: "desc_cat",
      min: 3,
      mensaje: "La descripción debe tener al menos 3 caracteres.",
    },
  ];
  let primerError = null;
  const errores = [];

  // Validar cada campo
  campos.forEach((campo) => {
    const campoFormulario = document.getElementById(`editar-${campo.nombre}`);
    if (!campoFormulario) {
      console.error(`El campo editar-${campo.nombre} no se encontró.`);
      return; // Continúa con el siguiente campo
    }
    campoFormulario.addEventListener("input", () => {
      //Quita lo rojo del error al validar que es mayor o igual a su validación
      if (campoFormulario.value.length >= campo.min) {
        campoFormulario.classList.remove("input-error"); // Quita la clase si el campo es válido
      }
    });
    const valor = campoFormulario.value.trim();
    // Validar por longitud mínima
    if (valor.length < campo.min) {
      errores.push(campo.mensaje);
      campoFormulario.classList.add("input-error");
      campoFormulario.focus(); // Establece el foco en el campo inválido
      if (!primerError) primerError = campoFormulario; // Guardar el primer error
    } else {
      campoFormulario.classList.remove("input-error");
    }
  });
  // Si hay errores, mostrar la alerta y enfocar el primer campo con error
  if (errores.length > 0) {
    Swal.fire({
      title: "Errores en el formulario",
      html: errores.join("<br>"),
      icon: "error",
    });
    if (primerError) primerError.focus(); // Enfocar el primer campo con error
    return;
  }

  // Verificar duplicado antes de enviar el formulario
  const catInput = document.getElementById("editar-cat");
  const idInput = document.getElementById("editar-idcat");
  if (!catInput || !idInput) {
    console.log("Error: No se encontró el campo de Cat o ID.");
    return;
  }
  const cat = catInput.value.trim();
  const id = idInput.value;

  try {
    //console.log("Verificando duplicado. ID:", id, "Cat:", cat);
    const esDuplicado = await verificarDuplicadoEditarCat(cat, id);
    if (esDuplicado) {
      return; // No enviar el formulario si hay duplicados
    } else {
      enviarFormularioEdicionCat(formulario); // Proceder si no hay duplicados
    }
  } catch (error) {
    console.error("Error al verificar duplicado:", error);
  }
}
// Enviar formulario de edición Cat
function enviarFormularioEdicionCat(formulario) {
  if (!formulario) {
    console.error("El formulario no se encontró.");
    return;
  }
  const formData = new FormData(formulario);

  fetch("cruds/editar_cat.php", {
    method: "POST",
    body: formData,
  })
    .then((response) => response.json())
    .then((data) => {
      //console.log("Respuesta del servidorEdit:", data);
      if (data.success) {
        Swal.fire({
          title: "¡Éxito!",
          text: data.message || "La actualización se realizó correctamente.",
          icon: "success",
        });
        // Actualizar la fila de la tabla sin recargar
        actualizarFilaTablaCat(formData);
        cerrarModal("editar-modalCat");
      } else {
        mostrarAlerta(
          "error",
          "Error",
          data.message || "No se pudo actualizar la Categoría."
        );
      }
    })
    .catch((error) => {
      console.error("Error al actualizar Categoría:", error);
      mostrarAlerta(
        "error",
        "Error",
        "Ocurrió un problema al actualizar la Categoría."
      );
    });
}
// Actualizar fila de la tabla
function actualizarFilaTablaCat(formData) {
  const fila = document
    .querySelector(`button[data-id="${formData.get("editar-idcat")}"]`)
    .closest("tr");
  //console.log(formData.get("editar-idcat"));
  if (fila) {
    fila.cells[0].textContent = formData.get("cat");
    fila.cells[1].textContent = formData.get("desc_cat");
  }
}
// Eliminar Categorias****************************************
document.addEventListener("click", function (event) {
  if (event.target.classList.contains("eliminarCat")) {
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
        fetch(`cruds/eliminar_cat.php?id=${id}`, { method: "POST" })
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
        const buscarBox = document.getElementById("buscarboxcat");
        if (buscarBox) {
          //console.log("Elemento 'buscarboxcat' encontrado dinámicamente");
          agregarEventoBuscarCat(buscarBox);
          observarDOM.disconnect(); // Deja de observar después de encontrarlo
        }
      }
    });
  });

  // Comienza a observar el body del DOM
  observarDOM.observe(document.body, { childList: true, subtree: true });

  // Si el elemento ya existe en el DOM
  const buscarBoxInicial = document.getElementById("buscarboxcat");
  if (buscarBoxInicial) {
    console.log("Elemento 'buscarboxcat' ya existe en el DOM");
    agregarEventoBuscarCat(buscarBoxInicial);
    observarDOM.disconnect(); // No es necesario seguir observando
  }

  // Función para agregar el evento de búsqueda
  function agregarEventoBuscarCat(buscarBox) {
    buscarBox.addEventListener("input", function () {
      const filtro = buscarBox.value.toLowerCase();
      const filas = document.querySelectorAll("#tabla-categorias tbody tr");

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
    if (event.target.id === "buscarboxcat") {
      const buscarBox = event.target; // El input dinámico
      const filtro = buscarBox.value.toLowerCase();
      const limpiarBusquedaCat = document.getElementById("limpiar-busquedaCat"); // Botón dinámico
      const filas = document.querySelectorAll("#tabla-categorias tbody tr");
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
    if (event.target.id === "limpiar-busquedaCat") {
      const buscarBox = document.getElementById("buscarboxcat");
      const limpiarBusquedaCat = event.target;

      if (buscarBox) {
        buscarBox.value = ""; // Limpiar el input
        if (limpiarBusquedaCat) {
          limpiarBusquedaCat.style.display = "none"; // Ocultar el botón de limpiar
          document.getElementById("mensaje-vacio").style.display = "none";
        }
      }

      const filas = document.querySelectorAll("#tabla-categorias tbody tr");
      filas.forEach((fila) => {
        fila.style.display = ""; // Mostrar todas las filas
      });
    }
  });
});
// Llamar pagina de Unidades ****************************************************************
document
  .getElementById("umedidas-link")
  .addEventListener("click", function (event) {
    event.preventDefault(); // Evita la acción por defecto del enlace
    fetch("catalogos/umedidas.php")
      .then((response) => response.text())
      .then((html) => {
        document.getElementById("content-area").innerHTML = html;
      })
      .catch((error) => {
        console.error("Error al cargar el contenido:", error);
      });
  });

//Crear Unidades
function abrirModalUmed(id) {
  document.getElementById(id).style.display = "flex";
}

function cerrarModalUmed(id) {
  document.getElementById(id).style.display = "none";
}

function procesarFormularioUmed(event, tipo) {
  event.preventDefault(); //Para que no recergue la pagina
  const formData = new FormData(event.target);

  fetch(`cruds/procesar_${tipo}_umed.php`, {
    method: "POST",
    body: formData,
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        // Cerrar el modal
        cerrarModalUmed(tipo + "-modalUmed");
        // Limpiar los campos del formulario
        event.target.reset();

        // Actualizar la tabla dinámicamente si es 'crear'
        if (tipo === "crear") {
          const tbody = document.querySelector("table tbody");

          // Crear una nueva fila
          const newRow = document.createElement("tr");
          newRow.innerHTML = `
            <td>${data.umed.nombre}</td>
            <td>${data.umed.descripcion}</td>
            <td>
              <button title="Editar" class="editarUmed fa-solid fa-pen-to-square" data-id="${data.umed.id}"></button>
              <button title="Eliminar" class="eliminarUmed fa-solid fa-trash" data-id="${data.umed.id}"></button>
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
function validarFormularioUmed(event) {
  event.preventDefault();

  const umed = document.querySelector("[name='umed']").value.trim();
  const desc_umed = document.querySelector("[name='desc_umed']").value.trim();

  const errores = [];

  if (umed.length < 3) {
    errores.push("El nombre debe tener al menos 3 caracteres.");
    const inputname = document.querySelector("#crear-umed");
    inputname.focus();
    inputname.classList.add("input-error"); // Añade la clase de error
  }
  // Elimina la clase de error al corregir
  const inputname = document.querySelector("#crear-umed");
  inputname.addEventListener("input", () => {
    if (inputname.value.length >= 3) {
      inputname.classList.remove("input-error"); // Quita la clase si el campo es válido
    }
  });

  if (desc_umed.length < 3) {
    errores.push("La descripción debe tener al menos 3 caracteres.");
    const inputdesc = document.querySelector("#crear-desc_umed");
    inputdesc.focus();
    inputdesc.classList.add("input-error"); // Añade la clase de error
  }
  // Elimina la clase de error al corregir
  const inputdesc = document.querySelector("#crear-desc_umed");
  inputdesc.addEventListener("input", () => {
    if (inputdesc.value.length >= 3) {
      inputdesc.classList.remove("input-error"); // Quita la clase si el campo es válido
    }
  });

  if (errores.length > 0) {
    Swal.fire({
      title: "Errores en el formulario",
      html: errores.join("<br>"),
      icon: "error",
    });
    return;
  }

  // Verificar duplicados
  verificarDuplicadoUmed(umed)
    .then((esDuplicado) => {
      if (esDuplicado) {
        Swal.fire({
          title: "Error",
          text: "El ya existe. Por favor, elige otro.",
          icon: "error",
        });
      } else {
        // Si no hay errores, enviar el formulario
        procesarFormularioUmed(event, "crear");
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
function verificarDuplicadoUmed(umed) {
  //console.log("Nombre verificar:", umed);

  return fetch("cruds/verificar_nombre_umed.php", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ umed }),
  })
    .then((response) => response.json())
    .then((data) => {
      //console.log("Respuesta de verificar_nombre.php:", data);
      if (data.existe) {
        mostrarAlerta(
          "error",
          "Error",
          "El nombre de la unidad de medida ya existe."
        );
      }
      return data.existe;
    })
    .catch((error) => {
      console.error("Error al verificar duplicado:", error);
      return true; // Asume duplicado en caso de error
    });
}
//Editar Unidades************************************************************
document.addEventListener("DOMContentLoaded", function () {
  // Escuchar clic en el botón de editar
  document.addEventListener("click", function (event) {
    if (event.target.classList.contains("editarUmed")) {
      const id = event.target.dataset.id;
      //console.log("Botón editar clickeado. ID:", id);

      fetch(`cruds/obtener_umed.php?id=${id}`)
        .then((response) => response.json())
        .then((data) => {
          //console.log("Datos recibidos del servidor:", data);
          if (data.success) {
            const formularioUmed = document.getElementById("form-editarUmed");
            if (formularioUmed) {
              const campos = ["idumed", "umed", "desc_umed"];
              campos.forEach((campo) => {
                //console.log(`Asignando ${campo}:`, data.umed[campo]);
                formularioUmed[`editar-${campo}`].value =
                  data.umed[campo] || "";
              });
              abrirModalUmed("editar-modalUmed");
            } else {
              console.error("Formulario de edición no encontrado.");
            }
          } else {
            mostrarAlerta(
              "error",
              "Error",
              data.message || "No se pudo cargar el U. medida."
            );
          }
        })
        .catch((error) => {
          console.error("Error al obtener U. medida:", error);
          mostrarAlerta(
            "error",
            "Error",
            "Ocurrió un problema al obtener los datos."
          );
        });
    }
  });

  // Validar y enviar el formulario de edición
  document.body.addEventListener("submit", function (event) {
    if (event.target && event.target.id === "form-editarUmed") {
      event.preventDefault(); // Esto evita el comportamiento predeterminado de recargar la página.
      validarFormularioEdicionUmed(event.target);
    }
  });
});

// Función genérica para mostrar alertas
function mostrarAlerta(tipo, titulo, mensaje) {
  Swal.fire({ title: titulo, text: mensaje, icon: tipo });
}

//Validar duplicados en edicion umed
function verificarDuplicadoEditarUmed(umed, id = 0) {
  //console.log("Validando duplicados. ID:", id, "Umed:", umed);

  return fetch("cruds/verificar_nombre_umed.php", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ umed, id }),
  })
    .then((response) => response.json())
    .then((data) => {
      //console.log("Respuesta de verificar_nombre.php:", data);
      if (data.existe) {
        mostrarAlerta("error", "Error", "El nombre del U. medida ya existe.");
      }
      return data.existe;
    })
    .catch((error) => {
      console.error("Error al verificar duplicado:", error);
      return true; // Asume duplicado en caso de error
    });
}
// Validación del formulario de edición umed
async function validarFormularioEdicionUmed(formulario) {
  const campos = [
    {
      nombre: "umed",
      min: 3,
      mensaje: "El nombre debe tener al menos 3 caracteres.",
    },
    {
      nombre: "desc_umed",
      min: 3,
      mensaje: "La descripción debe tener al menos 3 caracteres.",
    },
  ];
  let primerError = null;
  const errores = [];

  // Validar cada campo
  campos.forEach((campo) => {
    const campoFormulario = document.getElementById(`editar-${campo.nombre}`);
    if (!campoFormulario) {
      console.error(`El campo editar-${campo.nombre} no se encontró.`);
      return; // Continúa con el siguiente campo
    }
    campoFormulario.addEventListener("input", () => {
      //Quita lo rojo del error al validar que es mayor o igual a su validación
      if (campoFormulario.value.length >= campo.min) {
        campoFormulario.classList.remove("input-error"); // Quita la clase si el campo es válido
      }
    });
    const valor = campoFormulario.value.trim();
    // Validar por longitud mínima
    if (valor.length < campo.min) {
      errores.push(campo.mensaje);
      campoFormulario.classList.add("input-error");
      campoFormulario.focus(); // Establece el foco en el campo inválido
      if (!primerError) primerError = campoFormulario; // Guardar el primer error
    } else {
      campoFormulario.classList.remove("input-error");
    }
  });
  // Si hay errores, mostrar la alerta y enfocar el primer campo con error
  if (errores.length > 0) {
    Swal.fire({
      title: "Errores en el formulario",
      html: errores.join("<br>"),
      icon: "error",
    });
    if (primerError) primerError.focus(); // Enfocar el primer campo con error
    return;
  }

  // Verificar duplicado antes de enviar el formulario
  const umedInput = document.getElementById("editar-umed");
  const idInput = document.getElementById("editar-idumed");
  if (!umedInput || !idInput) {
    console.log("Error: No se encontró el campo de Umed o ID.");
    return;
  }
  const umed = umedInput.value.trim();
  const id = idInput.value;

  try {
    //console.log("Verificando duplicado. ID:", id, "Umed:", umed);
    const esDuplicado = await verificarDuplicadoEditarUmed(umed, id);
    if (esDuplicado) {
      return; // No enviar el formulario si hay duplicados
    } else {
      //cerrarModalUmed("editar-modalUmed");
      enviarFormularioEdicionUmed(formulario); // Proceder si no hay duplicados
    }
  } catch (error) {
    console.error("Error al verificar duplicado:", error);
  }
}
// Enviar formulario de edición Unidades
function enviarFormularioEdicionUmed(formulario) {
  if (!formulario) {
    console.error("El formulario no se encontró.");
    return;
  }
  const formData = new FormData(formulario);

  fetch("cruds/editar_umed.php", {
    method: "POST",
    body: formData,
  })
    .then((response) => response.json())
    .then((data) => {
      //console.log("Respuesta del servidorEdit:", data);
      if (data.success) {
        mostrarAlerta(
          "success",
          "¡Éxito!",
          data.message || "U. medida actualizado correctamente."
        );
        actualizarFilaTablaUmed(formData);
        cerrarModal("editar-modalUmed");
      } else {
        mostrarAlerta(
          "error",
          "Error",
          data.message || "No se pudo actualizar el Umed."
        );
      }
    })
    .catch((error) => {
      console.error("Error al actualizar U. medida:", error);
      mostrarAlerta(
        "error",
        "Error",
        "Ocurrió un problema al actualizar la U. medida."
      );
    });
}
// Actualizar fila de la tabla
function actualizarFilaTablaUmed(formData) {
  const fila = document
    .querySelector(`button[data-id="${formData.get("editar-idumed")}"]`)
    .closest("tr");
  //console.log(formData.get("editar-idumed"));
  if (fila) {
    fila.cells[0].textContent = formData.get("umed");
    fila.cells[1].textContent = formData.get("desc_umed");
  }
}
// Eliminar Unidades*****************************
document.addEventListener("click", function (event) {
  if (event.target.classList.contains("eliminarUmed")) {
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
        fetch(`cruds/eliminar_umed.php?id=${id}`, { method: "POST" })
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
            console.error("Error al eliminar la U. medida:", error);
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
        const buscarBox = document.getElementById("buscarboxumed");
        if (buscarBox) {
          //console.log("Elemento 'buscarbox' encontrado dinámicamente");
          agregarEventoBuscarUmed(buscarBox);
          observarDOM.disconnect(); // Deja de observar después de encontrarlo
        }
      }
    });
  });

  // Comienza a observar el body del DOM
  observarDOM.observe(document.body, { childList: true, subtree: true });

  // Si el elemento ya existe en el DOM
  const buscarBoxInicial = document.getElementById("buscarboxumed");
  if (buscarBoxInicial) {
    console.log("Elemento 'buscarboxumed' ya existe en el DOM");
    agregarEventoBuscarUmed(buscarBoxInicial);
    observarDOM.disconnect(); // No es necesario seguir observando
  }

  // Función para agregar el evento de búsqueda
  function agregarEventoBuscarUmed(buscarBox) {
    buscarBox.addEventListener("input", function () {
      const filtro = buscarBox.value.toLowerCase();
      const filas = document.querySelectorAll("#tabla-umed tbody tr");

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
    if (event.target.id === "buscarboxumed") {
      const buscarBox = event.target; // El input dinámico
      const filtro = buscarBox.value.toLowerCase();
      const limpiarBusquedaUmed = document.getElementById(
        "limpiar-busquedaUmed"
      ); // Botón dinámico
      const filas = document.querySelectorAll("#tabla-umed tbody tr");
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
    if (event.target.id === "limpiar-busquedaUmed") {
      const buscarBox = document.getElementById("buscarboxumed");
      const limpiarBusquedaUmed = event.target;

      if (buscarBox) {
        buscarBox.value = ""; // Limpiar el input
        if (limpiarBusquedaUmed) {
          limpiarBusquedaUmed.style.display = "none"; // Ocultar el botón de limpiar
          document.getElementById("mensaje-vacio").style.display = "none";
        }
      }

      const filas = document.querySelectorAll("#tabla-umed tbody tr");
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
    fetch("catalogos/marcas.php")
      .then((response) => response.text())
      .then((html) => {
        document.getElementById("content-area").innerHTML = html;
      })
      .catch((error) => {
        console.error("Error al cargar el contenido:", error);
      });
  });

//Crear Marcas***************************
function abrirModalMarca(id) {
  document.getElementById(id).style.display = "flex";
}

function cerrarModalMarca(id) {
  document.getElementById(id).style.display = "none";
}

function procesarFormularioMarca(event, tipo) {
  event.preventDefault(); //Para que no recergue la pagina
  const formData = new FormData(event.target);

  fetch(`cruds/procesar_${tipo}_marca.php`, {
    method: "POST",
    body: formData,
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        // Cerrar el modal
        cerrarModalMarca(tipo + "-modalMarca");
        // Limpiar los campos del formulario
        event.target.reset();

        // Actualizar la tabla dinámicamente si es 'crear'
        if (tipo === "crear") {
          const tbody = document.querySelector("table tbody");

          // Crear una nueva fila
          const newRow = document.createElement("tr");
          newRow.innerHTML = `
            <td>${data.marca.nombre}</td>
            <td>${data.marca.descripcion}</td>
            <td>
              <button title="Editar" class="editarMarca fa-solid fa-pen-to-square" data-id="${data.marca.id}"></button>
              <button title="Eliminar" class="eliminarMarca fa-solid fa-trash" data-id="${data.marca.id}"></button>
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
function validarFormularioMarca(event) {
  event.preventDefault();

  const marca = document.querySelector("[name='marca']").value.trim();
  const desc_marca = document.querySelector("[name='desc_marca']").value.trim();

  const errores = [];

  if (marca.length < 3) {
    errores.push("El nombre debe tener al menos 3 caracteres.");
    const inputname = document.querySelector("#crear-marca");
    inputname.focus();
    inputname.classList.add("input-error"); // Añade la clase de error
  }
  // Elimina la clase de error al corregir
  const inputname = document.querySelector("#crear-marca");
  inputname.addEventListener("input", () => {
    if (inputname.value.length >= 3) {
      inputname.classList.remove("input-error"); // Quita la clase si el campo es válido
    }
  });

  if (desc_marca.length < 3) {
    errores.push("La descripción debe tener al menos 3 caracteres.");
    const inputdesc = document.querySelector("#crear-desc_marca");
    inputdesc.focus();
    inputdesc.classList.add("input-error"); // Añade la clase de error
  }
  // Elimina la clase de error al corregir
  const inputdesc = document.querySelector("#crear-desc_marca");
  inputdesc.addEventListener("input", () => {
    if (inputdesc.value.length >= 3) {
      inputdesc.classList.remove("input-error"); // Quita la clase si el campo es válido
    }
  });

  if (errores.length > 0) {
    Swal.fire({
      title: "Errores en el formulario",
      html: errores.join("<br>"),
      icon: "error",
    });
    return;
  }

  // Verificar duplicados
  verificarDuplicadoMarca(marca)
    .then((esDuplicado) => {
      if (esDuplicado) {
        Swal.fire({
          title: "Error",
          text: "El nombre de la marca ya existe. Por favor, elige otro.",
          icon: "error",
        });
      } else {
        // Si no hay errores, enviar el formulario
        procesarFormularioMarca(event, "crear");
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
function verificarDuplicadoMarca(marca) {
  //console.log("Nombre verificar:", marca);

  return fetch("cruds/verificar_nombre_marca.php", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ marca }),
  })
    .then((response) => response.json())
    .then((data) => {
      //console.log("Respuesta de verificar_nombre.php:", data);
      if (data.existe) {
        mostrarAlerta("error", "Error", "El nombre de la marca ya existe.");
      }
      return data.existe;
    })
    .catch((error) => {
      console.error("Error al verificar duplicado:", error);
      return true; // Asume duplicado en caso de error
    });
}
//Editar Marcas ************************************************************
document.addEventListener("DOMContentLoaded", function () {
  // Escuchar clic en el botón de editar
  document.addEventListener("click", function (event) {
    if (event.target.classList.contains("editarMarca")) {
      const id = event.target.dataset.id;
      //console.log("Botón editar clickeado. ID:", id);

      fetch(`cruds/obtener_marca.php?id=${id}`)
        .then((response) => response.json())
        .then((data) => {
          //console.log("Datos recibidos del servidor:", data);
          if (data.success) {
            const formularioMarca = document.getElementById("form-editarMarca");
            if (formularioMarca) {
              const campos = ["idmarca", "marca", "desc_marca"];
              campos.forEach((campo) => {
                //console.log(`Asignando ${campo}:`, data.marca[campo]);
                formularioMarca[`editar-${campo}`].value =
                  data.marca[campo] || "";
              });
              abrirModalMarca("editar-modalMarca");
            } else {
              console.error("Formulario de edición no encontrado.");
            }
          } else {
            mostrarAlerta(
              "error",
              "Error",
              data.message || "No se pudo cargar la Marca."
            );
          }
        })
        .catch((error) => {
          console.error("Error al obtener la Marca:", error);
          mostrarAlerta(
            "error",
            "Error",
            "Ocurrió un problema al obtener los datos."
          );
        });
    }
  });

  // Validar y enviar el formulario de edición
  document.body.addEventListener("submit", function (event) {
    if (event.target && event.target.id === "form-editarMarca") {
      event.preventDefault(); // Esto evita el comportamiento predeterminado de recargar la página.
      validarFormularioEdicionMarca(event.target);
    }
  });
});

// Función genérica para mostrar alertas
function mostrarAlerta(tipo, titulo, mensaje) {
  Swal.fire({ title: titulo, text: mensaje, icon: tipo });
}

//Validar duplicados en edicion Marca
function verificarDuplicadoEditarMarca(marca, id = 0) {
  //console.log("Validando duplicados. ID:", id, "Marca:", marca);

  return fetch("cruds/verificar_nombre_marca.php", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ marca, id }),
  })
    .then((response) => response.json())
    .then((data) => {
      //console.log("Respuesta de verificar_nombre.php:", data);
      if (data.existe) {
        mostrarAlerta("error", "Error", "El nombre de la marca ya existe.");
      }
      return data.existe;
    })
    .catch((error) => {
      console.error("Error al verificar duplicado:", error);
      return true; // Asume duplicado en caso de error
    });
}
// Validación del formulario de edición Marca
async function validarFormularioEdicionMarca(formulario) {
  const campos = [
    {
      nombre: "marca",
      min: 3,
      mensaje: "El nombre debe tener al menos 3 caracteres.",
    },
    {
      nombre: "desc_marca",
      min: 3,
      mensaje: "La descripción debe tener al menos 3 caracteres.",
    },
  ];
  let primerError = null;
  const errores = [];

  // Validar cada campo
  campos.forEach((campo) => {
    const campoFormulario = document.getElementById(`editar-${campo.nombre}`);
    if (!campoFormulario) {
      console.error(`El campo editar-${campo.nombre} no se encontró.`);
      return; // Continúa con el siguiente campo
    }
    campoFormulario.addEventListener("input", () => {
      //Quita lo rojo del error al validar que es mayor o igual a su validación
      if (campoFormulario.value.length >= campo.min) {
        campoFormulario.classList.remove("input-error"); // Quita la clase si el campo es válido
      }
    });
    const valor = campoFormulario.value.trim();
    // Validar por longitud mínima
    if (valor.length < campo.min) {
      errores.push(campo.mensaje);
      campoFormulario.classList.add("input-error");
      campoFormulario.focus(); // Establece el foco en el campo inválido
      if (!primerError) primerError = campoFormulario; // Guardar el primer error
    } else {
      campoFormulario.classList.remove("input-error");
    }
  });
  // Si hay errores, mostrar la alerta y enfocar el primer campo con error
  if (errores.length > 0) {
    Swal.fire({
      title: "Errores en el formulario",
      html: errores.join("<br>"),
      icon: "error",
    });
    if (primerError) primerError.focus(); // Enfocar el primer campo con error
    return;
  }

  // Verificar duplicado antes de enviar el formulario
  const marcaInput = document.getElementById("editar-marca");
  const idInput = document.getElementById("editar-idmarca");
  if (!marcaInput || !idInput) {
    console.log("Error: No se encontró el campo de marca o ID.");
    return;
  }
  const marca = marcaInput.value.trim();
  const id = idInput.value;

  try {
    //console.log("Verificando duplicado. ID:", id, "Marca:", marca);
    const esDuplicado = await verificarDuplicadoEditarMarca(marca, id);
    if (esDuplicado) {
      return; // No enviar el formulario si hay duplicados
    } else {
      //cerrarModalMarca("editar-modalMarca");
      enviarFormularioEdicionMarca(formulario); // Proceder si no hay duplicados
    }
  } catch (error) {
    console.error("Error al verificar duplicado:", error);
  }
}
// Enviar formulario de edición Marca
function enviarFormularioEdicionMarca(formulario) {
  if (!formulario) {
    console.error("El formulario no se encontró.");
    return;
  }
  const formData = new FormData(formulario);

  fetch("cruds/editar_marca.php", {
    method: "POST",
    body: formData,
  })
    .then((response) => response.json())
    .then((data) => {
      //console.log("Respuesta del servidorEdit:", data);
      if (data.success) {
        mostrarAlerta(
          "success",
          "¡Éxito!",
          data.message || "Marca actualizado correctamente."
        );
        actualizarFilaTablaMarca(formData);
        cerrarModal("editar-modalMarca");
      } else {
        mostrarAlerta(
          "error",
          "Error",
          data.message || "No se pudo actualizar el Marca."
        );
      }
    })
    .catch((error) => {
      console.error("Error al actualizar la marca:", error);
      mostrarAlerta(
        "error",
        "Error",
        "Ocurrió un problema al actualizar la marca."
      );
    });
}
// Actualizar fila de la tabla
function actualizarFilaTablaMarca(formData) {
  const fila = document
    .querySelector(`button[data-id="${formData.get("editar-idmarca")}"]`)
    .closest("tr");
  //console.log(formData.get("editar-idmarca"));
  if (fila) {
    fila.cells[0].textContent = formData.get("marca");
    fila.cells[1].textContent = formData.get("desc_marca");
  }
}
// Eliminar Marcas*******************************
document.addEventListener("click", function (event) {
  if (event.target.classList.contains("eliminarMarca")) {
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
        fetch(`cruds/eliminar_marca.php?id=${id}`, { method: "POST" })
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
            console.error("Error al eliminar la Marca:", error);
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
        const buscarBox = document.getElementById("buscarboxmarca");
        if (buscarBox) {
          //console.log("Elemento 'buscarbox' encontrado dinámicamente");
          agregarEventoBuscarMarca(buscarBox);
          observarDOM.disconnect(); // Deja de observar después de encontrarlo
        }
      }
    });
  });

  // Comienza a observar el body del DOM
  observarDOM.observe(document.body, { childList: true, subtree: true });

  // Si el elemento ya existe en el DOM
  const buscarBoxInicial = document.getElementById("buscarboxmarca");
  if (buscarBoxInicial) {
    console.log("Elemento 'buscarboxmarca' ya existe en el DOM");
    agregarEventoBuscarMarca(buscarBoxInicial);
    observarDOM.disconnect(); // No es necesario seguir observando
  }

  // Función para agregar el evento de búsqueda
  function agregarEventoBuscarMarca(buscarBox) {
    buscarBox.addEventListener("input", function () {
      const filtro = buscarBox.value.toLowerCase();
      const filas = document.querySelectorAll("#tabla-marcas tbody tr");

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
    if (event.target.id === "buscarboxmarca") {
      const buscarBox = event.target; // El input dinámico
      const filtro = buscarBox.value.toLowerCase();
      const limpiarBusquedaMarca = document.getElementById(
        "limpiar-busquedaMarca"
      ); // Botón dinámico
      const filas = document.querySelectorAll("#tabla-marcas tbody tr");
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
    if (event.target.id === "limpiar-busquedaMarca") {
      const buscarBox = document.getElementById("buscarboxmarca");
      const limpiarBusquedaMarca = event.target;

      if (buscarBox) {
        buscarBox.value = ""; // Limpiar el input
        if (limpiarBusquedaMarca) {
          limpiarBusquedaMarca.style.display = "none"; // Ocultar el botón de limpiar
          document.getElementById("mensaje-vacio").style.display = "none";
        }
      }

      const filas = document.querySelectorAll("#tabla-marcas tbody tr");
      filas.forEach((fila) => {
        fila.style.display = ""; // Mostrar todas las filas
      });
    }
  });
});

// Llamar formulario de Tallas****************************************************
document
  .getElementById("tallas-link")
  .addEventListener("click", function (event) {
    event.preventDefault(); // Evita la acción por defecto del enlace
    fetch("catalogos/tallas.php")
      .then((response) => response.text())
      .then((html) => {
        document.getElementById("content-area").innerHTML = html;
      })
      .catch((error) => {
        console.error("Error al cargar el contenido:", error);
      });
  });

//Crear Tallas***************
function abrirModalTalla(id) {
  document.getElementById(id).style.display = "flex";
}

function cerrarModalTalla(id) {
  document.getElementById(id).style.display = "none";
}

function procesarFormularioTalla(event, tipo) {
  event.preventDefault(); //Para que no recergue la pagina
  const formData = new FormData(event.target);

  fetch(`cruds/procesar_${tipo}_talla.php`, {
    method: "POST",
    body: formData,
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        // Cerrar el modal
        cerrarModalTalla(tipo + "-modalTalla");
        // Limpiar los campos del formulario
        event.target.reset();

        // Actualizar la tabla dinámicamente si es 'crear'
        if (tipo === "crear") {
          const tbody = document.querySelector("table tbody");

          // Crear una nueva fila
          const newRow = document.createElement("tr");
          newRow.innerHTML = `
            <td>${data.talla.nombre}</td>
            <td>${data.talla.descripcion}</td>
            <td>
              <button title="Editar" class="editarTalla fa-solid fa-pen-to-square" data-id="${data.talla.id}"></button>
              <button title="Eliminar" class="eliminarTalla fa-solid fa-trash" data-id="${data.talla.id}"></button>
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
function validarFormularioTalla(event) {
  event.preventDefault();

  const talla = document.querySelector("[name='talla']").value.trim();
  const desc_talla = document.querySelector("[name='desc_talla']").value.trim();

  const errores = [];

  if (talla.length < 3) {
    errores.push("El nombre debe tener al menos 3 caracteres.");
    const inputname = document.querySelector("#crear-talla");
    inputname.focus();
    inputname.classList.add("input-error"); // Añade la clase de error
  }
  // Elimina la clase de error al corregir
  const inputname = document.querySelector("#crear-talla");
  inputname.addEventListener("input", () => {
    if (inputname.value.length >= 3) {
      inputname.classList.remove("input-error"); // Quita la clase si el campo es válido
    }
  });

  if (desc_talla.length < 3) {
    errores.push("La descripción debe tener al menos 3 caracteres.");
    const inputdesc = document.querySelector("#crear-desc_talla");
    inputdesc.focus();
    inputdesc.classList.add("input-error"); // Añade la clase de error
  }
  // Elimina la clase de error al corregir
  const inputdesc = document.querySelector("#crear-desc_talla");
  inputdesc.addEventListener("input", () => {
    if (inputdesc.value.length >= 3) {
      inputdesc.classList.remove("input-error"); // Quita la clase si el campo es válido
    }
  });

  if (errores.length > 0) {
    Swal.fire({
      title: "Errores en el formulario",
      html: errores.join("<br>"),
      icon: "error",
    });
    return;
  }

  // Verificar duplicados
  verificarDuplicadoTalla(talla)
    .then((esDuplicado) => {
      if (esDuplicado) {
        Swal.fire({
          title: "Error",
          text: "El nombre ya existe. Por favor, elige otro.",
          icon: "error",
        });
      } else {
        // Si no hay errores, enviar el formulario
        procesarFormularioTalla(event, "crear");
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
function verificarDuplicadoTalla(talla) {
  //console.log("Nombre verificar:", talla);

  return fetch("cruds/verificar_nombre_talla.php", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ talla }),
  })
    .then((response) => response.json())
    .then((data) => {
      //console.log("Respuesta de verificar_nombre.php:", data);
      if (data.existe) {
        mostrarAlerta("error", "Error", "El nombre ya existe.");
      }
      return data.existe;
    })
    .catch((error) => {
      console.error("Error al verificar duplicado:", error);
      return true; // Asume duplicado en caso de error
    });
}
//Editar Tallas************************************************************
document.addEventListener("DOMContentLoaded", function () {
  // Escuchar clic en el botón de editar
  document.addEventListener("click", function (event) {
    if (event.target.classList.contains("editarTalla")) {
      const id = event.target.dataset.id;
      //console.log("Botón editar clickeado. ID:", id);

      fetch(`cruds/obtener_talla.php?id=${id}`)
        .then((response) => response.json())
        .then((data) => {
          //console.log("Datos recibidos del servidor:", data);
          if (data.success) {
            const formularioTalla = document.getElementById("form-editarTalla");
            if (formularioTalla) {
              const campos = ["idtalla", "talla", "desc_talla"];
              campos.forEach((campo) => {
                //console.log(`Asignando ${campo}:`, data.talla[campo]);
                formularioTalla[`editar-${campo}`].value =
                  data.talla[campo] || "";
              });
              abrirModalTalla("editar-modalTalla");
            } else {
              console.error("Formulario de edición no encontrado.");
            }
          } else {
            mostrarAlerta(
              "error",
              "Error",
              data.message || "No se pudo cargar el campo."
            );
          }
        })
        .catch((error) => {
          console.error("Error al obtener el campo:", error);
          mostrarAlerta(
            "error",
            "Error",
            "Ocurrió un problema al obtener los datos."
          );
        });
    }
  });

  // Validar y enviar el formulario de edición
  document.body.addEventListener("submit", function (event) {
    if (event.target && event.target.id === "form-editarTalla") {
      event.preventDefault(); // Esto evita el comportamiento predeterminado de recargar la página.
      validarFormularioEdicionTalla(event.target);
    }
  });
});

// Función genérica para mostrar alertas
function mostrarAlerta(tipo, titulo, mensaje) {
  Swal.fire({ title: titulo, text: mensaje, icon: tipo });
}

//Validar duplicados en edicion talla
function verificarDuplicadoEditarTalla(talla, id = 0) {
  //console.log("Validando duplicados. ID:", id, "Talla:", talla);

  return fetch("cruds/verificar_nombre_talla.php", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ talla, id }),
  })
    .then((response) => response.json())
    .then((data) => {
      //console.log("Respuesta de verificar_nombre.php:", data);
      if (data.existe) {
        mostrarAlerta("error", "Error", "El nombre ya existe.");
      }
      return data.existe;
    })
    .catch((error) => {
      console.error("Error al verificar duplicado:", error);
      return true; // Asume duplicado en caso de error
    });
}
// Validación del formulario de edición Talla
async function validarFormularioEdicionTalla(formulario) {
  const campos = [
    {
      nombre: "talla",
      min: 3,
      mensaje: "El nombre debe tener al menos 3 caracteres.",
    },
    {
      nombre: "desc_talla",
      min: 3,
      mensaje: "La descripción debe tener al menos 3 caracteres.",
    },
  ];
  let primerError = null;
  const errores = [];

  // Validar cada campo
  campos.forEach((campo) => {
    const campoFormulario = document.getElementById(`editar-${campo.nombre}`);
    if (!campoFormulario) {
      console.error(`El campo editar-${campo.nombre} no se encontró.`);
      return; // Continúa con el siguiente campo
    }
    campoFormulario.addEventListener("input", () => {
      //Quita lo rojo del error al validar que es mayor o igual a su validación
      if (campoFormulario.value.length >= campo.min) {
        campoFormulario.classList.remove("input-error"); // Quita la clase si el campo es válido
      }
    });
    const valor = campoFormulario.value.trim();
    // Validar por longitud mínima
    if (valor.length < campo.min) {
      errores.push(campo.mensaje);
      campoFormulario.classList.add("input-error");
      campoFormulario.focus(); // Establece el foco en el campo inválido
      if (!primerError) primerError = campoFormulario; // Guardar el primer error
    } else {
      campoFormulario.classList.remove("input-error");
    }
  });
  // Si hay errores, mostrar la alerta y enfocar el primer campo con error
  if (errores.length > 0) {
    Swal.fire({
      title: "Errores en el formulario",
      html: errores.join("<br>"),
      icon: "error",
    });
    if (primerError) primerError.focus(); // Enfocar el primer campo con error
    return;
  }

  // Verificar duplicado antes de enviar el formulario
  const tallaInput = document.getElementById("editar-talla");
  const idInput = document.getElementById("editar-idtalla");
  if (!tallaInput || !idInput) {
    console.log("Error: No se encontró el campo o ID.");
    return;
  }
  const talla = tallaInput.value.trim();
  const id = idInput.value;

  try {
    //console.log("Verificando duplicado. ID:", id, "Talla:", talla);
    const esDuplicado = await verificarDuplicadoEditarTalla(talla, id);
    if (esDuplicado) {
      return; // No enviar el formulario si hay duplicados
    } else {
      //cerrarModalTalla("editar-modalTalla");
      enviarFormularioEdicionTalla(formulario); // Proceder si no hay duplicados
    }
  } catch (error) {
    console.error("Error al verificar duplicado:", error);
  }
}
// Enviar formulario de edición Talla
function enviarFormularioEdicionTalla(formulario) {
  if (!formulario) {
    console.error("El formulario no se encontró.");
    return;
  }
  const formData = new FormData(formulario);

  fetch("cruds/editar_talla.php", {
    method: "POST",
    body: formData,
  })
    .then((response) => response.json())
    .then((data) => {
      //console.log("Respuesta del servidorEdit:", data);
      if (data.success) {
        mostrarAlerta(
          "success",
          "¡Éxito!",
          data.message || "Actualizada correctamente."
        );
        actualizarFilaTablaTalla(formData);
        cerrarModal("editar-modalTalla");
      } else {
        mostrarAlerta(
          "error",
          "Error",
          data.message || "No se pudo actualizar."
        );
      }
    })
    .catch((error) => {
      console.error("Error al actualizar:", error);
      mostrarAlerta("error", "Error", "Ocurrió un problema al actualizar.");
    });
}
// Actualizar fila de la tabla
function actualizarFilaTablaTalla(formData) {
  const fila = document
    .querySelector(`button[data-id="${formData.get("editar-idtalla")}"]`)
    .closest("tr");
  //console.log(formData.get("editar-idtalla"));
  if (fila) {
    fila.cells[0].textContent = formData.get("talla");
    fila.cells[1].textContent = formData.get("desc_talla");
  }
}
// Eliminar Tallas*****************************
document.addEventListener("click", function (event) {
  if (event.target.classList.contains("eliminarTalla")) {
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
        fetch(`cruds/eliminar_talla.php?id=${id}`, { method: "POST" })
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
            console.error("Error al eliminar:", error);
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
        const buscarBox = document.getElementById("buscarboxtalla");
        if (buscarBox) {
          //console.log("Elemento 'buscarbox' encontrado dinámicamente");
          agregarEventoBuscarTalla(buscarBox);
          observarDOM.disconnect(); // Deja de observar después de encontrarlo
        }
      }
    });
  });

  // Comienza a observar el body del DOM
  observarDOM.observe(document.body, { childList: true, subtree: true });

  // Si el elemento ya existe en el DOM
  const buscarBoxInicial = document.getElementById("buscarboxtalla");
  if (buscarBoxInicial) {
    console.log("Elemento 'buscarboxtalla' ya existe en el DOM");
    agregarEventoBuscarTalla(buscarBoxInicial);
    observarDOM.disconnect(); // No es necesario seguir observando
  }

  // Función para agregar el evento de búsqueda
  function agregarEventoBuscarTalla(buscarBox) {
    buscarBox.addEventListener("input", function () {
      const filtro = buscarBox.value.toLowerCase();
      const filas = document.querySelectorAll("#tabla-tallas tbody tr");

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
    if (event.target.id === "buscarboxtalla") {
      const buscarBox = event.target; // El input dinámico
      const filtro = buscarBox.value.toLowerCase();
      const limpiarBusquedaTalla = document.getElementById(
        "limpiar-busquedaTalla"
      ); // Botón dinámico
      const filas = document.querySelectorAll("#tabla-tallas tbody tr");
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
    if (event.target.id === "limpiar-busquedaTalla") {
      const buscarBox = document.getElementById("buscarboxtalla");
      const limpiarBusquedaTalla = event.target;

      if (buscarBox) {
        buscarBox.value = ""; // Limpiar el input
        if (limpiarBusquedaTalla) {
          limpiarBusquedaTalla.style.display = "none"; // Ocultar el botón de limpiar
          document.getElementById("mensaje-vacio").style.display = "none";
        }
      }

      const filas = document.querySelectorAll("#tabla-tallas tbody tr");
      filas.forEach((fila) => {
        fila.style.display = ""; // Mostrar todas las filas
      });
    }
  });
});

// Llamar formulario de Colores*****************************************************
document
  .getElementById("colores-link")
  .addEventListener("click", function (event) {
    event.preventDefault(); // Evita la acción por defecto del enlace
    fetch("catalogos/colores.php")
      .then((response) => response.text())
      .then((html) => {
        document.getElementById("content-area").innerHTML = html;
      })
      .catch((error) => {
        console.error("Error al cargar el contenido:", error);
      });
  });

//Crear Colores***************
function abrirModalColor(id) {
  document.getElementById(id).style.display = "flex";
}

function cerrarModalColor(id) {
  document.getElementById(id).style.display = "none";
}

function procesarFormularioColor(event, tipo) {
  event.preventDefault(); //Para que no recergue la pagina
  const formData = new FormData(event.target);

  fetch(`cruds/procesar_${tipo}_color.php`, {
    method: "POST",
    body: formData,
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        // Cerrar el modal
        cerrarModalColor(tipo + "-modalColor");
        // Limpiar los campos del formulario
        event.target.reset();

        // Actualizar la tabla dinámicamente si es 'crear'
        if (tipo === "crear") {
          const tbody = document.querySelector("table tbody");

          // Crear una nueva fila
          const newRow = document.createElement("tr");
          newRow.innerHTML = `
            <td>${data.color.nombre}</td>
            <td>${data.color.descripcion}</td>
            <td>
              <button title="Editar" class="editarColor fa-solid fa-pen-to-square" data-id="${data.color.id}"></button>
              <button title="Eliminar" class="eliminarColor fa-solid fa-trash" data-id="${data.color.id}"></button>
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
function validarFormularioColor(event) {
  event.preventDefault();

  const color = document.querySelector("[name='color']").value.trim();
  const desc_color = document.querySelector("[name='desc_color']").value.trim();

  const errores = [];

  if (color.length < 3) {
    errores.push("El nombre debe tener al menos 3 caracteres.");
    const inputname = document.querySelector("#crear-color");
    inputname.focus();
    inputname.classList.add("input-error"); // Añade la clase de error
  }
  // Elimina la clase de error al corregir
  const inputname = document.querySelector("#crear-color");
  inputname.addEventListener("input", () => {
    if (inputname.value.length >= 3) {
      inputname.classList.remove("input-error"); // Quita la clase si el campo es válido
    }
  });

  if (desc_color.length < 3) {
    errores.push("La descripción debe tener al menos 3 caracteres.");
    const inputdesc = document.querySelector("#crear-desc_color");
    inputdesc.focus();
    inputdesc.classList.add("input-error"); // Añade la clase de error
  }
  // Elimina la clase de error al corregir
  const inputdesc = document.querySelector("#crear-desc_color");
  inputdesc.addEventListener("input", () => {
    if (inputdesc.value.length >= 3) {
      inputdesc.classList.remove("input-error"); // Quita la clase si el campo es válido
    }
  });

  if (errores.length > 0) {
    Swal.fire({
      title: "Errores en el formulario",
      html: errores.join("<br>"),
      icon: "error",
    });
    return;
  }

  // Verificar duplicados
  verificarDuplicadoColor(color)
    .then((esDuplicado) => {
      if (esDuplicado) {
        Swal.fire({
          title: "Error",
          text: "El nombre ya existe. Por favor, elige otro.",
          icon: "error",
        });
      } else {
        // Si no hay errores, enviar el formulario
        procesarFormularioColor(event, "crear");
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
function verificarDuplicadoColor(color) {
  //console.log("Nombre verificar:", color);

  return fetch("cruds/verificar_nombre_color.php", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ color }),
  })
    .then((response) => response.json())
    .then((data) => {
      //console.log("Respuesta de verificar_nombre.php:", data);
      if (data.existe) {
        mostrarAlerta("error", "Error", "El nombre ya existe.");
      }
      return data.existe;
    })
    .catch((error) => {
      console.error("Error al verificar duplicado:", error);
      return true; // Asume duplicado en caso de error
    });
}
//Editar Colores************************************************************
document.addEventListener("DOMContentLoaded", function () {
  // Escuchar clic en el botón de editar
  document.addEventListener("click", function (event) {
    if (event.target.classList.contains("editarColor")) {
      const id = event.target.dataset.id;
      //console.log("Botón editar clickeado. ID:", id);

      fetch(`cruds/obtener_color.php?id=${id}`)
        .then((response) => response.json())
        .then((data) => {
          //console.log("Datos recibidos del servidor:", data);
          if (data.success) {
            const formularioColor = document.getElementById("form-editarColor");
            if (formularioColor) {
              const campos = ["idcolor", "color", "desc_color"];
              campos.forEach((campo) => {
                //console.log(`Asignando ${campo}:`, data.color[campo]);
                formularioColor[`editar-${campo}`].value =
                  data.color[campo] || "";
              });
              abrirModalColor("editar-modalColor");
            } else {
              console.error("Formulario de edición no encontrado.");
            }
          } else {
            mostrarAlerta(
              "error",
              "Error",
              data.message || "No se pudo cargar el campo."
            );
          }
        })
        .catch((error) => {
          console.error("Error al obtener el campo:", error);
          mostrarAlerta(
            "error",
            "Error",
            "Ocurrió un problema al obtener los datos."
          );
        });
    }
  });

  // Validar y enviar el formulario de edición
  document.body.addEventListener("submit", function (event) {
    if (event.target && event.target.id === "form-editarColor") {
      event.preventDefault(); // Esto evita el comportamiento predeterminado de recargar la página.
      validarFormularioEdicionColor(event.target);
    }
  });
});

// Función genérica para mostrar alertas
function mostrarAlerta(tipo, titulo, mensaje) {
  Swal.fire({ title: titulo, text: mensaje, icon: tipo });
}

//Validar duplicados en edicion color
function verificarDuplicadoEditarColor(color, id = 0) {
  //console.log("Validando duplicados. ID:", id, "Color:", color);

  return fetch("cruds/verificar_nombre_color.php", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ color, id }),
  })
    .then((response) => response.json())
    .then((data) => {
      //console.log("Respuesta de verificar_nombre.php:", data);
      if (data.existe) {
        mostrarAlerta("error", "Error", "El nombre ya existe.");
      }
      return data.existe;
    })
    .catch((error) => {
      console.error("Error al verificar duplicado:", error);
      return true; // Asume duplicado en caso de error
    });
}
// Validación del formulario de edición Color
async function validarFormularioEdicionColor(formulario) {
  const campos = [
    {
      nombre: "color",
      min: 3,
      mensaje: "El nombre debe tener al menos 3 caracteres.",
    },
    {
      nombre: "desc_color",
      min: 3,
      mensaje: "La descripción debe tener al menos 3 caracteres.",
    },
  ];
  let primerError = null;
  const errores = [];

  // Validar cada campo
  campos.forEach((campo) => {
    const campoFormulario = document.getElementById(`editar-${campo.nombre}`);
    if (!campoFormulario) {
      console.error(`El campo editar-${campo.nombre} no se encontró.`);
      return; // Continúa con el siguiente campo
    }
    campoFormulario.addEventListener("input", () => {
      //Quita lo rojo del error al validar que es mayor o igual a su validación
      if (campoFormulario.value.length >= campo.min) {
        campoFormulario.classList.remove("input-error"); // Quita la clase si el campo es válido
      }
    });
    const valor = campoFormulario.value.trim();
    // Validar por longitud mínima
    if (valor.length < campo.min) {
      errores.push(campo.mensaje);
      campoFormulario.classList.add("input-error");
      campoFormulario.focus(); // Establece el foco en el campo inválido
      if (!primerError) primerError = campoFormulario; // Guardar el primer error
    } else {
      campoFormulario.classList.remove("input-error");
    }
  });
  // Si hay errores, mostrar la alerta y enfocar el primer campo con error
  if (errores.length > 0) {
    Swal.fire({
      title: "Errores en el formulario",
      html: errores.join("<br>"),
      icon: "error",
    });
    if (primerError) primerError.focus(); // Enfocar el primer campo con error
    return;
  }

  // Verificar duplicado antes de enviar el formulario
  const colorInput = document.getElementById("editar-color");
  const idInput = document.getElementById("editar-idcolor");
  if (!colorInput || !idInput) {
    console.log("Error: No se encontró el campo o ID.");
    return;
  }
  const color = colorInput.value.trim();
  const id = idInput.value;

  try {
    //console.log("Verificando duplicado. ID:", id, "Color:", color);
    const esDuplicado = await verificarDuplicadoEditarColor(color, id);
    if (esDuplicado) {
      return; // No enviar el formulario si hay duplicados
    } else {
      //cerrarModalColor("editar-modalColor");
      enviarFormularioEdicionColor(formulario); // Proceder si no hay duplicados
    }
  } catch (error) {
    console.error("Error al verificar duplicado:", error);
  }
}
// Enviar formulario de edición Color
function enviarFormularioEdicionColor(formulario) {
  if (!formulario) {
    console.error("El formulario no se encontró.");
    return;
  }
  const formData = new FormData(formulario);

  fetch("cruds/editar_color.php", {
    method: "POST",
    body: formData,
  })
    .then((response) => response.json())
    .then((data) => {
      //console.log("Respuesta del servidorEdit:", data);
      if (data.success) {
        mostrarAlerta(
          "success",
          "¡Éxito!",
          data.message || "Actualizado correctamente."
        );
        actualizarFilaTablaColor(formData);
        cerrarModal("editar-modalColor");
      } else {
        mostrarAlerta(
          "error",
          "Error",
          data.message || "No se pudo actualizar."
        );
      }
    })
    .catch((error) => {
      console.error("Error al actualizar:", error);
      mostrarAlerta("error", "Error", "Ocurrió un problema al actualizar.");
    });
}
// Actualizar fila de la tabla
function actualizarFilaTablaColor(formData) {
  const fila = document
    .querySelector(`button[data-id="${formData.get("editar-idcolor")}"]`)
    .closest("tr");
  //console.log(formData.get("editar-idcolor"));
  if (fila) {
    fila.cells[0].textContent = formData.get("color");
    fila.cells[1].textContent = formData.get("desc_color");
  }
}
// Eliminar Colores*****************************
document.addEventListener("click", function (event) {
  if (event.target.classList.contains("eliminarColor")) {
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
        fetch(`cruds/eliminar_color.php?id=${id}`, { method: "POST" })
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
            console.error("Error al eliminar:", error);
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
        const buscarBox = document.getElementById("buscarboxcolor");
        if (buscarBox) {
          //console.log("Elemento 'buscarbox' encontrado dinámicamente");
          agregarEventoBuscarColor(buscarBox);
          observarDOM.disconnect(); // Deja de observar después de encontrarlo
        }
      }
    });
  });

  // Comienza a observar el body del DOM
  observarDOM.observe(document.body, { childList: true, subtree: true });

  // Si el elemento ya existe en el DOM
  const buscarBoxInicial = document.getElementById("buscarboxcolor");
  if (buscarBoxInicial) {
    console.log("Elemento 'buscarboxcolor' ya existe en el DOM");
    agregarEventoBuscarColor(buscarBoxInicial);
    observarDOM.disconnect(); // No es necesario seguir observando
  }

  // Función para agregar el evento de búsqueda
  function agregarEventoBuscarColor(buscarBox) {
    buscarBox.addEventListener("input", function () {
      const filtro = buscarBox.value.toLowerCase();
      const filas = document.querySelectorAll("#tabla-colores tbody tr");

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
    if (event.target.id === "buscarboxcolor") {
      const buscarBox = event.target; // El input dinámico
      const filtro = buscarBox.value.toLowerCase();
      const limpiarBusquedaColor = document.getElementById(
        "limpiar-busquedaColor"
      ); // Botón dinámico
      const filas = document.querySelectorAll("#tabla-colores tbody tr");
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
    if (event.target.id === "limpiar-busquedaColor") {
      const buscarBox = document.getElementById("buscarboxcolor");
      const limpiarBusquedaColor = event.target;

      if (buscarBox) {
        buscarBox.value = ""; // Limpiar el input
        if (limpiarBusquedaColor) {
          limpiarBusquedaColor.style.display = "none"; // Ocultar el botón de limpiar
          document.getElementById("mensaje-vacio").style.display = "none";
        }
      }

      const filas = document.querySelectorAll("#tabla-colores tbody tr");
      filas.forEach((fila) => {
        fila.style.display = ""; // Mostrar todas las filas
      });
    }
  });
});
// Llamar formulario de Generos*****************************************************
document
  .getElementById("generos-link")
  .addEventListener("click", function (event) {
    event.preventDefault(); // Evita la acción por defecto del enlace
    fetch("catalogos/generos.php")
      .then((response) => response.text())
      .then((html) => {
        document.getElementById("content-area").innerHTML = html;
      })
      .catch((error) => {
        console.error("Error al cargar el contenido:", error);
      });
  });

//Crear Generos***************
function abrirModalGenero(id) {
  document.getElementById(id).style.display = "flex";
}

function cerrarModalGenero(id) {
  document.getElementById(id).style.display = "none";
}

function procesarFormularioGenero(event, tipo) {
  event.preventDefault(); //Para que no recergue la pagina
  const formData = new FormData(event.target);

  fetch(`cruds/procesar_${tipo}_genero.php`, {
    method: "POST",
    body: formData,
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        // Cerrar el modal
        cerrarModalGenero(tipo + "-modalGenero");
        // Limpiar los campos del formulario
        event.target.reset();

        // Actualizar la tabla dinámicamente si es 'crear'
        if (tipo === "crear") {
          const tbody = document.querySelector("table tbody");

          // Crear una nueva fila
          const newRow = document.createElement("tr");
          newRow.innerHTML = `
            <td>${data.genero.nombre}</td>
            <td>${data.genero.descripcion}</td>
            <td>
              <button title="Editar" class="editarGenero fa-solid fa-pen-to-square" data-id="${data.genero.id}"></button>
              <button title="Eliminar" class="eliminarGenero fa-solid fa-trash" data-id="${data.genero.id}"></button>
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
function validarFormularioGenero(event) {
  event.preventDefault();

  const genero = document.querySelector("[name='genero']").value.trim();
  const desc_genero = document
    .querySelector("[name='desc_genero']")
    .value.trim();

  const errores = [];

  if (genero.length < 3) {
    errores.push("El nombre debe tener al menos 3 caracteres.");
    const inputname = document.querySelector("#crear-genero");
    inputname.focus();
    inputname.classList.add("input-error"); // Añade la clase de error
  }
  // Elimina la clase de error al corregir
  const inputname = document.querySelector("#crear-genero");
  inputname.addEventListener("input", () => {
    if (inputname.value.length >= 3) {
      inputname.classList.remove("input-error"); // Quita la clase si el campo es válido
    }
  });

  if (desc_genero.length < 3) {
    errores.push("La descripción debe tener al menos 3 caracteres.");
    const inputdesc = document.querySelector("#crear-desc_genero");
    inputdesc.focus();
    inputdesc.classList.add("input-error"); // Añade la clase de error
  }
  // Elimina la clase de error al corregir
  const inputdesc = document.querySelector("#crear-desc_genero");
  inputdesc.addEventListener("input", () => {
    if (inputdesc.value.length >= 3) {
      inputdesc.classList.remove("input-error"); // Quita la clase si el campo es válido
    }
  });

  if (errores.length > 0) {
    Swal.fire({
      title: "Errores en el formulario",
      html: errores.join("<br>"),
      icon: "error",
    });
    return;
  }

  // Verificar duplicados
  verificarDuplicadoGenero(genero)
    .then((esDuplicado) => {
      if (esDuplicado) {
        Swal.fire({
          title: "Error",
          text: "El nombre ya existe. Por favor, elige otro.",
          icon: "error",
        });
      } else {
        // Si no hay errores, enviar el formulario
        procesarFormularioGenero(event, "crear");
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
function verificarDuplicadoGenero(genero) {
  //console.log("Nombre verificar:", genero);

  return fetch("cruds/verificar_nombre_genero.php", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ genero }),
  })
    .then((response) => response.json())
    .then((data) => {
      //console.log("Respuesta de verificar_nombre.php:", data);
      if (data.existe) {
        mostrarAlerta("error", "Error", "El nombre ya existe.");
      }
      return data.existe;
    })
    .catch((error) => {
      console.error("Error al verificar duplicado:", error);
      return true; // Asume duplicado en caso de error
    });
}
//Editar Generos************************************************************
document.addEventListener("DOMContentLoaded", function () {
  // Escuchar clic en el botón de editar
  document.addEventListener("click", function (event) {
    if (event.target.classList.contains("editarGenero")) {
      const id = event.target.dataset.id;
      //console.log("Botón editar clickeado. ID:", id);

      fetch(`cruds/obtener_genero.php?id=${id}`)
        .then((response) => response.json())
        .then((data) => {
          //console.log("Datos recibidos del servidor:", data);
          if (data.success) {
            const formularioGenero =
              document.getElementById("form-editarGenero");
            if (formularioGenero) {
              const campos = ["idgenero", "genero", "desc_genero"];
              campos.forEach((campo) => {
                //console.log(`Asignando ${campo}:`, data.genero[campo]);
                formularioGenero[`editar-${campo}`].value =
                  data.genero[campo] || "";
              });
              abrirModalGenero("editar-modalGenero");
            } else {
              console.error("Formulario de edición no encontrado.");
            }
          } else {
            mostrarAlerta(
              "error",
              "Error",
              data.message || "No se pudo cargar el campo."
            );
          }
        })
        .catch((error) => {
          console.error("Error al obtener el campo:", error);
          mostrarAlerta(
            "error",
            "Error",
            "Ocurrió un problema al obtener los datos."
          );
        });
    }
  });

  // Validar y enviar el formulario de edición
  document.body.addEventListener("submit", function (event) {
    if (event.target && event.target.id === "form-editarGenero") {
      event.preventDefault(); // Esto evita el comportamiento predeterminado de recargar la página.
      validarFormularioEdicionGenero(event.target);
    }
  });
});

// Función genérica para mostrar alertas
function mostrarAlerta(tipo, titulo, mensaje) {
  Swal.fire({ title: titulo, text: mensaje, icon: tipo });
}

//Validar duplicados en edicion genero
function verificarDuplicadoEditarGenero(genero, id = 0) {
  //console.log("Validando duplicados. ID:", id, "Genero:", genero);

  return fetch("cruds/verificar_nombre_genero.php", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ genero, id }),
  })
    .then((response) => response.json())
    .then((data) => {
      //console.log("Respuesta de verificar_nombre.php:", data);
      if (data.existe) {
        mostrarAlerta("error", "Error", "El nombre ya existe.");
      }
      return data.existe;
    })
    .catch((error) => {
      console.error("Error al verificar duplicado:", error);
      return true; // Asume duplicado en caso de error
    });
}
// Validación del formulario de edición Genero
async function validarFormularioEdicionGenero(formulario) {
  const campos = [
    {
      nombre: "genero",
      min: 3,
      mensaje: "El nombre debe tener al menos 3 caracteres.",
    },
    {
      nombre: "desc_genero",
      min: 3,
      mensaje: "La descripción debe tener al menos 3 caracteres.",
    },
  ];
  let primerError = null;
  const errores = [];

  // Validar cada campo
  campos.forEach((campo) => {
    const campoFormulario = document.getElementById(`editar-${campo.nombre}`);
    if (!campoFormulario) {
      console.error(`El campo editar-${campo.nombre} no se encontró.`);
      return; // Continúa con el siguiente campo
    }
    campoFormulario.addEventListener("input", () => {
      //Quita lo rojo del error al validar que es mayor o igual a su validación
      if (campoFormulario.value.length >= campo.min) {
        campoFormulario.classList.remove("input-error"); // Quita la clase si el campo es válido
      }
    });
    const valor = campoFormulario.value.trim();
    // Validar por longitud mínima
    if (valor.length < campo.min) {
      errores.push(campo.mensaje);
      campoFormulario.classList.add("input-error");
      campoFormulario.focus(); // Establece el foco en el campo inválido
      if (!primerError) primerError = campoFormulario; // Guardar el primer error
    } else {
      campoFormulario.classList.remove("input-error");
    }
  });
  // Si hay errores, mostrar la alerta y enfocar el primer campo con error
  if (errores.length > 0) {
    Swal.fire({
      title: "Errores en el formulario",
      html: errores.join("<br>"),
      icon: "error",
    });
    if (primerError) primerError.focus(); // Enfocar el primer campo con error
    return;
  }

  // Verificar duplicado antes de enviar el formulario
  const generoInput = document.getElementById("editar-genero");
  const idInput = document.getElementById("editar-idgenero");
  if (!generoInput || !idInput) {
    console.log("Error: No se encontró el campo o ID.");
    return;
  }
  const genero = generoInput.value.trim();
  const id = idInput.value;

  try {
    //console.log("Verificando duplicado. ID:", id, "Genero:", genero);
    const esDuplicado = await verificarDuplicadoEditarGenero(genero, id);
    if (esDuplicado) {
      return; // No enviar el formulario si hay duplicados
    } else {
      //cerrarModalGenero("editar-modalGenero");
      enviarFormularioEdicionGenero(formulario); // Proceder si no hay duplicados
    }
  } catch (error) {
    console.error("Error al verificar duplicado:", error);
  }
}
// Enviar formulario de edición Genero
function enviarFormularioEdicionGenero(formulario) {
  if (!formulario) {
    console.error("El formulario no se encontró.");
    return;
  }
  const formData = new FormData(formulario);

  fetch("cruds/editar_genero.php", {
    method: "POST",
    body: formData,
  })
    .then((response) => response.json())
    .then((data) => {
      //console.log("Respuesta del servidorEdit:", data);
      if (data.success) {
        mostrarAlerta(
          "success",
          "¡Éxito!",
          data.message || "Actualizada correctamente."
        );
        actualizarFilaTablaGenero(formData);
        cerrarModal("editar-modalGenero");
      } else {
        mostrarAlerta(
          "error",
          "Error",
          data.message || "No se pudo actualizar."
        );
      }
    })
    .catch((error) => {
      console.error("Error al actualizar:", error);
      mostrarAlerta("error", "Error", "Ocurrió un problema al actualizar.");
    });
}
// Actualizar fila de la tabla
function actualizarFilaTablaGenero(formData) {
  const fila = document
    .querySelector(`button[data-id="${formData.get("editar-idgenero")}"]`)
    .closest("tr");
  //console.log(formData.get("editar-idgenero"));
  if (fila) {
    fila.cells[0].textContent = formData.get("genero");
    fila.cells[1].textContent = formData.get("desc_genero");
  }
}
// Eliminar Generos*****************************
document.addEventListener("click", function (event) {
  if (event.target.classList.contains("eliminarGenero")) {
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
        fetch(`cruds/eliminar_genero.php?id=${id}`, { method: "POST" })
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
            console.error("Error al eliminar:", error);
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
        const buscarBox = document.getElementById("buscarboxgenero");
        if (buscarBox) {
          //console.log("Elemento 'buscarbox' encontrado dinámicamente");
          agregarEventoBuscarGenero(buscarBox);
          observarDOM.disconnect(); // Deja de observar después de encontrarlo
        }
      }
    });
  });

  // Comienza a observar el body del DOM
  observarDOM.observe(document.body, { childList: true, subtree: true });

  // Si el elemento ya existe en el DOM
  const buscarBoxInicial = document.getElementById("buscarboxgenero");
  if (buscarBoxInicial) {
    console.log("Elemento 'buscarboxgenero' ya existe en el DOM");
    agregarEventoBuscarGenero(buscarBoxInicial);
    observarDOM.disconnect(); // No es necesario seguir observando
  }

  // Función para agregar el evento de búsqueda
  function agregarEventoBuscarGenero(buscarBox) {
    buscarBox.addEventListener("input", function () {
      const filtro = buscarBox.value.toLowerCase();
      const filas = document.querySelectorAll("#tabla-generos tbody tr");

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
    if (event.target.id === "buscarboxgenero") {
      const buscarBox = event.target; // El input dinámico
      const filtro = buscarBox.value.toLowerCase();
      const limpiarBusquedaGenero = document.getElementById(
        "limpiar-busquedaGenero"
      ); // Botón dinámico
      const filas = document.querySelectorAll("#tabla-generos tbody tr");
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
    if (event.target.id === "limpiar-busquedaGenero") {
      const buscarBox = document.getElementById("buscarboxgenero");
      const limpiarBusquedaGenero = event.target;

      if (buscarBox) {
        buscarBox.value = ""; // Limpiar el input
        if (limpiarBusquedaGenero) {
          limpiarBusquedaGenero.style.display = "none"; // Ocultar el botón de limpiar
          document.getElementById("mensaje-vacio").style.display = "none";
        }
      }

      const filas = document.querySelectorAll("#tabla-generos tbody tr");
      filas.forEach((fila) => {
        fila.style.display = ""; // Mostrar todas las filas
      });
    }
  });
});

// Llamar formulario de Estilos*****************************************************
document
  .getElementById("estilos-link")
  .addEventListener("click", function (event) {
    event.preventDefault(); // Evita la acción por defecto del enlace
    fetch("catalogos/estilos.php")
      .then((response) => response.text())
      .then((html) => {
        document.getElementById("content-area").innerHTML = html;
      })
      .catch((error) => {
        console.error("Error al cargar el contenido:", error);
      });
  });

//Crear Estilos***************
function abrirModalEstilo(id) {
  document.getElementById(id).style.display = "flex";
}

function cerrarModalEstilo(id) {
  document.getElementById(id).style.display = "none";
}

function procesarFormularioEstilo(event, tipo) {
  event.preventDefault(); //Para que no recergue la pagina
  const formData = new FormData(event.target);

  fetch(`cruds/procesar_${tipo}_estilo.php`, {
    method: "POST",
    body: formData,
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        // Cerrar el modal
        cerrarModalEstilo(tipo + "-modalEstilo");
        // Limpiar los campos del formulario
        event.target.reset();

        // Actualizar la tabla dinámicamente si es 'crear'
        if (tipo === "crear") {
          const tbody = document.querySelector("table tbody");

          // Crear una nueva fila
          const newRow = document.createElement("tr");
          newRow.innerHTML = `
            <td>${data.estilo.nombre}</td>
            <td>${data.estilo.descripcion}</td>
            <td>
              <button title="Editar" class="editarEstilo fa-solid fa-pen-to-square" data-id="${data.estilo.id}"></button>
              <button title="Eliminar" class="eliminarEstilo fa-solid fa-trash" data-id="${data.estilo.id}"></button>
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
function validarFormularioEstilo(event) {
  event.preventDefault();

  const estilo = document.querySelector("[name='estilo']").value.trim();
  const desc_estilo = document
    .querySelector("[name='desc_estilo']")
    .value.trim();

  const errores = [];

  if (estilo.length < 3) {
    errores.push("El nombre debe tener al menos 3 caracteres.");
    const inputname = document.querySelector("#crear-estilo");
    inputname.focus();
    inputname.classList.add("input-error"); // Añade la clase de error
  }
  // Elimina la clase de error al corregir
  const inputname = document.querySelector("#crear-estilo");
  inputname.addEventListener("input", () => {
    if (inputname.value.length >= 3) {
      inputname.classList.remove("input-error"); // Quita la clase si el campo es válido
    }
  });

  if (desc_estilo.length < 3) {
    errores.push("La descripción debe tener al menos 3 caracteres.");
    const inputdesc = document.querySelector("#crear-desc_estilo");
    inputdesc.focus();
    inputdesc.classList.add("input-error"); // Añade la clase de error
  }
  // Elimina la clase de error al corregir
  const inputdesc = document.querySelector("#crear-desc_estilo");
  inputdesc.addEventListener("input", () => {
    if (inputdesc.value.length >= 3) {
      inputdesc.classList.remove("input-error"); // Quita la clase si el campo es válido
    }
  });

  if (errores.length > 0) {
    Swal.fire({
      title: "Errores en el formulario",
      html: errores.join("<br>"),
      icon: "error",
    });
    return;
  }

  // Verificar duplicados
  verificarDuplicadoEstilo(estilo)
    .then((esDuplicado) => {
      if (esDuplicado) {
        Swal.fire({
          title: "Error",
          text: "El nombre ya existe. Por favor, elige otro.",
          icon: "error",
        });
      } else {
        // Si no hay errores, enviar el formulario
        procesarFormularioEstilo(event, "crear");
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
function verificarDuplicadoEstilo(estilo) {
  //console.log("Nombre verificar:", estilo);

  return fetch("cruds/verificar_nombre_estilo.php", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ estilo }),
  })
    .then((response) => response.json())
    .then((data) => {
      //console.log("Respuesta de verificar_nombre.php:", data);
      if (data.existe) {
        mostrarAlerta("error", "Error", "El nombre ya existe.");
      }
      return data.existe;
    })
    .catch((error) => {
      console.error("Error al verificar duplicado:", error);
      return true; // Asume duplicado en caso de error
    });
}
//Editar Estilos************************************************************
document.addEventListener("DOMContentLoaded", function () {
  // Escuchar clic en el botón de editar
  document.addEventListener("click", function (event) {
    if (event.target.classList.contains("editarEstilo")) {
      const id = event.target.dataset.id;
      //console.log("Botón editar clickeado. ID:", id);

      fetch(`cruds/obtener_estilo.php?id=${id}`)
        .then((response) => response.json())
        .then((data) => {
          //console.log("Datos recibidos del servidor:", data);
          if (data.success) {
            const formularioEstilo =
              document.getElementById("form-editarEstilo");
            if (formularioEstilo) {
              const campos = ["idestilo", "estilo", "desc_estilo"];
              campos.forEach((campo) => {
                //console.log(`Asignando ${campo}:`, data.estilo[campo]);
                formularioEstilo[`editar-${campo}`].value =
                  data.estilo[campo] || "";
              });
              abrirModalEstilo("editar-modalEstilo");
            } else {
              console.error("Formulario de edición no encontrado.");
            }
          } else {
            mostrarAlerta(
              "error",
              "Error",
              data.message || "No se pudo cargar el campo."
            );
          }
        })
        .catch((error) => {
          console.error("Error al obtener el campo:", error);
          mostrarAlerta(
            "error",
            "Error",
            "Ocurrió un problema al obtener los datos."
          );
        });
    }
  });

  // Validar y enviar el formulario de edición
  document.body.addEventListener("submit", function (event) {
    if (event.target && event.target.id === "form-editarEstilo") {
      event.preventDefault(); // Esto evita el comportamiento predeterminado de recargar la página.
      validarFormularioEdicionEstilo(event.target);
    }
  });
});

// Función genérica para mostrar alertas
function mostrarAlerta(tipo, titulo, mensaje) {
  Swal.fire({ title: titulo, text: mensaje, icon: tipo });
}

//Validar duplicados en edicion estilo
function verificarDuplicadoEditarEstilo(estilo, id = 0) {
  //console.log("Validando duplicados. ID:", id, "Estilo:", estilo);

  return fetch("cruds/verificar_nombre_estilo.php", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ estilo, id }),
  })
    .then((response) => response.json())
    .then((data) => {
      //console.log("Respuesta de verificar_nombre.php:", data);
      if (data.existe) {
        mostrarAlerta("error", "Error", "El nombre ya existe.");
      }
      return data.existe;
    })
    .catch((error) => {
      console.error("Error al verificar duplicado:", error);
      return true; // Asume duplicado en caso de error
    });
}
// Validación del formulario de edición Estilo
async function validarFormularioEdicionEstilo(formulario) {
  const campos = [
    {
      nombre: "estilo",
      min: 3,
      mensaje: "El nombre debe tener al menos 3 caracteres.",
    },
    {
      nombre: "desc_estilo",
      min: 3,
      mensaje: "La descripción debe tener al menos 3 caracteres.",
    },
  ];
  let primerError = null;
  const errores = [];

  // Validar cada campo
  campos.forEach((campo) => {
    const campoFormulario = document.getElementById(`editar-${campo.nombre}`);
    if (!campoFormulario) {
      console.error(`El campo editar-${campo.nombre} no se encontró.`);
      return; // Continúa con el siguiente campo
    }
    campoFormulario.addEventListener("input", () => {
      //Quita lo rojo del error al validar que es mayor o igual a su validación
      if (campoFormulario.value.length >= campo.min) {
        campoFormulario.classList.remove("input-error"); // Quita la clase si el campo es válido
      }
    });
    const valor = campoFormulario.value.trim();
    // Validar por longitud mínima
    if (valor.length < campo.min) {
      errores.push(campo.mensaje);
      campoFormulario.classList.add("input-error");
      campoFormulario.focus(); // Establece el foco en el campo inválido
      if (!primerError) primerError = campoFormulario; // Guardar el primer error
    } else {
      campoFormulario.classList.remove("input-error");
    }
  });
  // Si hay errores, mostrar la alerta y enfocar el primer campo con error
  if (errores.length > 0) {
    Swal.fire({
      title: "Errores en el formulario",
      html: errores.join("<br>"),
      icon: "error",
    });
    if (primerError) primerError.focus(); // Enfocar el primer campo con error
    return;
  }

  // Verificar duplicado antes de enviar el formulario
  const estiloInput = document.getElementById("editar-estilo");
  const idInput = document.getElementById("editar-idestilo");
  if (!estiloInput || !idInput) {
    console.log("Error: No se encontró el campo o ID.");
    return;
  }
  const estilo = estiloInput.value.trim();
  const id = idInput.value;

  try {
    //console.log("Verificando duplicado. ID:", id, "Estilo:", estilo);
    const esDuplicado = await verificarDuplicadoEditarEstilo(estilo, id);
    if (esDuplicado) {
      return; // No enviar el formulario si hay duplicados
    } else {
      //cerrarModalEstilo("editar-modalEstilo");
      enviarFormularioEdicionEstilo(formulario); // Proceder si no hay duplicados
    }
  } catch (error) {
    console.error("Error al verificar duplicado:", error);
  }
}
// Enviar formulario de edición Estilo
function enviarFormularioEdicionEstilo(formulario) {
  if (!formulario) {
    console.error("El formulario no se encontró.");
    return;
  }
  const formData = new FormData(formulario);

  fetch("cruds/editar_estilo.php", {
    method: "POST",
    body: formData,
  })
    .then((response) => response.json())
    .then((data) => {
      //console.log("Respuesta del servidorEdit:", data);
      if (data.success) {
        mostrarAlerta(
          "success",
          "¡Éxito!",
          data.message || "Actualizada correctamente."
        );
        actualizarFilaTablaEstilo(formData);
        cerrarModal("editar-modalEstilo");
      } else {
        mostrarAlerta(
          "error",
          "Error",
          data.message || "No se pudo actualizar."
        );
      }
    })
    .catch((error) => {
      console.error("Error al actualizar:", error);
      mostrarAlerta("error", "Error", "Ocurrió un problema al actualizar.");
    });
}
// Actualizar fila de la tabla
function actualizarFilaTablaEstilo(formData) {
  const fila = document
    .querySelector(`button[data-id="${formData.get("editar-idestilo")}"]`)
    .closest("tr");
  //console.log(formData.get("editar-idestilo"));
  if (fila) {
    fila.cells[0].textContent = formData.get("estilo");
    fila.cells[1].textContent = formData.get("desc_estilo");
  }
}
// Eliminar Estilos*****************************
document.addEventListener("click", function (event) {
  if (event.target.classList.contains("eliminarEstilo")) {
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
        fetch(`cruds/eliminar_estilo.php?id=${id}`, { method: "POST" })
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
            console.error("Error al eliminar:", error);
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
        const buscarBox = document.getElementById("buscarboxestilo");
        if (buscarBox) {
          //console.log("Elemento 'buscarbox' encontrado dinámicamente");
          agregarEventoBuscarEstilo(buscarBox);
          observarDOM.disconnect(); // Deja de observar después de encontrarlo
        }
      }
    });
  });

  // Comienza a observar el body del DOM
  observarDOM.observe(document.body, { childList: true, subtree: true });

  // Si el elemento ya existe en el DOM
  const buscarBoxInicial = document.getElementById("buscarboxestilo");
  if (buscarBoxInicial) {
    console.log("Elemento 'buscarboxestilo' ya existe en el DOM");
    agregarEventoBuscarEstilo(buscarBoxInicial);
    observarDOM.disconnect(); // No es necesario seguir observando
  }

  // Función para agregar el evento de búsqueda
  function agregarEventoBuscarEstilo(buscarBox) {
    buscarBox.addEventListener("input", function () {
      const filtro = buscarBox.value.toLowerCase();
      const filas = document.querySelectorAll("#tabla-estilos tbody tr");

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
    if (event.target.id === "buscarboxestilo") {
      const buscarBox = event.target; // El input dinámico
      const filtro = buscarBox.value.toLowerCase();
      const limpiarBusquedaEstilo = document.getElementById(
        "limpiar-busquedaEstilo"
      ); // Botón dinámico
      const filas = document.querySelectorAll("#tabla-estilos tbody tr");
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
    if (event.target.id === "limpiar-busquedaEstilo") {
      const buscarBox = document.getElementById("buscarboxestilo");
      const limpiarBusquedaEstilo = event.target;

      if (buscarBox) {
        buscarBox.value = ""; // Limpiar el input
        if (limpiarBusquedaEstilo) {
          limpiarBusquedaEstilo.style.display = "none"; // Ocultar el botón de limpiar
          document.getElementById("mensaje-vacio").style.display = "none";
        }
      }

      const filas = document.querySelectorAll("#tabla-estilos tbody tr");
      filas.forEach((fila) => {
        fila.style.display = ""; // Mostrar todas las filas
      });
    }
  });
});
// Llamar formulario de Metodos de pago*********************************************
document
  .getElementById("mpagos-link")
  .addEventListener("click", function (event) {
    event.preventDefault(); // Evita la acción por defecto del enlace
    fetch("catalogos/mpagos.php")
      .then((response) => response.text())
      .then((html) => {
        document.getElementById("content-area").innerHTML = html;
      })
      .catch((error) => {
        console.error("Error al cargar el contenido:", error);
      });
  });

//Crear Mpagos***************
function abrirModalMpago(id) {
  document.getElementById(id).style.display = "flex";
}

function cerrarModalMpago(id) {
  document.getElementById(id).style.display = "none";
}

function procesarFormularioMpago(event, tipo) {
  event.preventDefault(); //Para que no recergue la pagina
  const formData = new FormData(event.target);

  fetch(`cruds/procesar_${tipo}_mpago.php`, {
    method: "POST",
    body: formData,
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        // Cerrar el modal
        cerrarModalMpago(tipo + "-modalMpago");
        // Limpiar los campos del formulario
        event.target.reset();

        // Actualizar la tabla dinámicamente si es 'crear'
        if (tipo === "crear") {
          const tbody = document.querySelector("table tbody");

          // Crear una nueva fila
          const newRow = document.createElement("tr");
          newRow.innerHTML = `
            <td>${data.mpago.nombre}</td>
            <td>${data.mpago.descripcion}</td>
            <td>
              <button title="Editar" class="editarMpago fa-solid fa-pen-to-square" data-id="${data.mpago.id}"></button>
              <button title="Eliminar" class="eliminarMpago fa-solid fa-trash" data-id="${data.mpago.id}"></button>
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
function validarFormularioMpago(event) {
  event.preventDefault();

  const mpago = document.querySelector("[name='mpago']").value.trim();
  const desc_mpago = document.querySelector("[name='desc_mpago']").value.trim();

  const errores = [];

  if (mpago.length < 3) {
    errores.push("El nombre debe tener al menos 3 caracteres.");
    const inputname = document.querySelector("#crear-mpago");
    inputname.focus();
    inputname.classList.add("input-error"); // Añade la clase de error
  }
  // Elimina la clase de error al corregir
  const inputname = document.querySelector("#crear-mpago");
  inputname.addEventListener("input", () => {
    if (inputname.value.length >= 3) {
      inputname.classList.remove("input-error"); // Quita la clase si el campo es válido
    }
  });

  if (desc_mpago.length < 3) {
    errores.push("La descripción debe tener al menos 3 caracteres.");
    const inputdesc = document.querySelector("#crear-desc_mpago");
    inputdesc.focus();
    inputdesc.classList.add("input-error"); // Añade la clase de error
  }
  // Elimina la clase de error al corregir
  const inputdesc = document.querySelector("#crear-desc_mpago");
  inputdesc.addEventListener("input", () => {
    if (inputdesc.value.length >= 3) {
      inputdesc.classList.remove("input-error"); // Quita la clase si el campo es válido
    }
  });

  if (errores.length > 0) {
    Swal.fire({
      title: "Errores en el formulario",
      html: errores.join("<br>"),
      icon: "error",
    });
    return;
  }

  // Verificar duplicados
  verificarDuplicadoMpago(mpago)
    .then((esDuplicado) => {
      if (esDuplicado) {
        Swal.fire({
          title: "Error",
          text: "El nombre ya existe. Por favor, elige otro.",
          icon: "error",
        });
      } else {
        // Si no hay errores, enviar el formulario
        procesarFormularioMpago(event, "crear");
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
function verificarDuplicadoMpago(mpago) {
  //console.log("Nombre verificar:", mpago);

  return fetch("cruds/verificar_nombre_mpago.php", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ mpago }),
  })
    .then((response) => response.json())
    .then((data) => {
      //console.log("Respuesta de verificar_nombre.php:", data);
      if (data.existe) {
        mostrarAlerta("error", "Error", "El nombre ya existe.");
      }
      return data.existe;
    })
    .catch((error) => {
      console.error("Error al verificar duplicado:", error);
      return true; // Asume duplicado en caso de error
    });
}
//Editar Mpagos************************************************************
document.addEventListener("DOMContentLoaded", function () {
  // Escuchar clic en el botón de editar
  document.addEventListener("click", function (event) {
    if (event.target.classList.contains("editarMpago")) {
      const id = event.target.dataset.id;
      //console.log("Botón editar clickeado. ID:", id);

      fetch(`cruds/obtener_mpago.php?id=${id}`)
        .then((response) => response.json())
        .then((data) => {
          //console.log("Datos recibidos del servidor:", data);
          if (data.success) {
            const formularioMpago = document.getElementById("form-editarMpago");
            if (formularioMpago) {
              const campos = ["idmpago", "mpago", "desc_mpago"];
              campos.forEach((campo) => {
                //console.log(`Asignando ${campo}:`, data.mpago[campo]);
                formularioMpago[`editar-${campo}`].value =
                  data.mpago[campo] || "";
              });
              abrirModalMpago("editar-modalMpago");
            } else {
              console.error("Formulario de edición no encontrado.");
            }
          } else {
            mostrarAlerta(
              "error",
              "Error",
              data.message || "No se pudo cargar el campo."
            );
          }
        })
        .catch((error) => {
          console.error("Error al obtener el campo:", error);
          mostrarAlerta(
            "error",
            "Error",
            "Ocurrió un problema al obtener los datos."
          );
        });
    }
  });

  // Validar y enviar el formulario de edición
  document.body.addEventListener("submit", function (event) {
    if (event.target && event.target.id === "form-editarMpago") {
      event.preventDefault(); // Esto evita el comportamiento predeterminado de recargar la página.
      validarFormularioEdicionMpago(event.target);
    }
  });
});

// Función genérica para mostrar alertas
function mostrarAlerta(tipo, titulo, mensaje) {
  Swal.fire({ title: titulo, text: mensaje, icon: tipo });
}

//Validar duplicados en edicion mpago
function verificarDuplicadoEditarMpago(mpago, id = 0) {
  //console.log("Validando duplicados. ID:", id, "Mpago:", mpago);

  return fetch("cruds/verificar_nombre_mpago.php", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ mpago, id }),
  })
    .then((response) => response.json())
    .then((data) => {
      //console.log("Respuesta de verificar_nombre.php:", data);
      if (data.existe) {
        mostrarAlerta("error", "Error", "El nombre ya existe.");
      }
      return data.existe;
    })
    .catch((error) => {
      console.error("Error al verificar duplicado:", error);
      return true; // Asume duplicado en caso de error
    });
}
// Validación del formulario de edición Mpago
async function validarFormularioEdicionMpago(formulario) {
  const campos = [
    {
      nombre: "mpago",
      min: 3,
      mensaje: "El nombre debe tener al menos 3 caracteres.",
    },
    {
      nombre: "desc_mpago",
      min: 3,
      mensaje: "La descripción debe tener al menos 3 caracteres.",
    },
  ];
  let primerError = null;
  const errores = [];

  // Validar cada campo
  campos.forEach((campo) => {
    const campoFormulario = document.getElementById(`editar-${campo.nombre}`);
    if (!campoFormulario) {
      console.error(`El campo editar-${campo.nombre} no se encontró.`);
      return; // Continúa con el siguiente campo
    }
    campoFormulario.addEventListener("input", () => {
      //Quita lo rojo del error al validar que es mayor o igual a su validación
      if (campoFormulario.value.length >= campo.min) {
        campoFormulario.classList.remove("input-error"); // Quita la clase si el campo es válido
      }
    });
    const valor = campoFormulario.value.trim();
    // Validar por longitud mínima
    if (valor.length < campo.min) {
      errores.push(campo.mensaje);
      campoFormulario.classList.add("input-error");
      campoFormulario.focus(); // Establece el foco en el campo inválido
      if (!primerError) primerError = campoFormulario; // Guardar el primer error
    } else {
      campoFormulario.classList.remove("input-error");
    }
  });
  // Si hay errores, mostrar la alerta y enfocar el primer campo con error
  if (errores.length > 0) {
    Swal.fire({
      title: "Errores en el formulario",
      html: errores.join("<br>"),
      icon: "error",
    });
    if (primerError) primerError.focus(); // Enfocar el primer campo con error
    return;
  }

  // Verificar duplicado antes de enviar el formulario
  const mpagoInput = document.getElementById("editar-mpago");
  const idInput = document.getElementById("editar-idmpago");
  if (!mpagoInput || !idInput) {
    console.log("Error: No se encontró el campo o ID.");
    return;
  }
  const mpago = mpagoInput.value.trim();
  const id = idInput.value;

  try {
    //console.log("Verificando duplicado. ID:", id, "Mpago:", mpago);
    const esDuplicado = await verificarDuplicadoEditarMpago(mpago, id);
    if (esDuplicado) {
      return; // No enviar el formulario si hay duplicados
    } else {
      //cerrarModalMpago("editar-modalMpago");
      enviarFormularioEdicionMpago(formulario); // Proceder si no hay duplicados
    }
  } catch (error) {
    console.error("Error al verificar duplicado:", error);
  }
}
// Enviar formulario de edición Mpago
function enviarFormularioEdicionMpago(formulario) {
  if (!formulario) {
    console.error("El formulario no se encontró.");
    return;
  }
  const formData = new FormData(formulario);

  fetch("cruds/editar_mpago.php", {
    method: "POST",
    body: formData,
  })
    .then((response) => response.json())
    .then((data) => {
      //console.log("Respuesta del servidorEdit:", data);
      if (data.success) {
        mostrarAlerta(
          "success",
          "¡Éxito!",
          data.message || "Actualizada correctamente."
        );
        actualizarFilaTablaMpago(formData);
        cerrarModal("editar-modalMpago");
      } else {
        mostrarAlerta(
          "error",
          "Error",
          data.message || "No se pudo actualizar."
        );
      }
    })
    .catch((error) => {
      console.error("Error al actualizar:", error);
      mostrarAlerta("error", "Error", "Ocurrió un problema al actualizar.");
    });
}
// Actualizar fila de la tabla
function actualizarFilaTablaMpago(formData) {
  const fila = document
    .querySelector(`button[data-id="${formData.get("editar-idmpago")}"]`)
    .closest("tr");
  //console.log(formData.get("editar-idmpago"));
  if (fila) {
    fila.cells[0].textContent = formData.get("mpago");
    fila.cells[1].textContent = formData.get("desc_mpago");
  }
}
// Eliminar Mpagos*****************************
document.addEventListener("click", function (event) {
  if (event.target.classList.contains("eliminarMpago")) {
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
        fetch(`cruds/eliminar_mpago.php?id=${id}`, { method: "POST" })
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
            console.error("Error al eliminar:", error);
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
        const buscarBox = document.getElementById("buscarboxmpago");
        if (buscarBox) {
          //console.log("Elemento 'buscarbox' encontrado dinámicamente");
          agregarEventoBuscarMpago(buscarBox);
          observarDOM.disconnect(); // Deja de observar después de encontrarlo
        }
      }
    });
  });

  // Comienza a observar el body del DOM
  observarDOM.observe(document.body, { childList: true, subtree: true });

  // Si el elemento ya existe en el DOM
  const buscarBoxInicial = document.getElementById("buscarboxmpago");
  if (buscarBoxInicial) {
    console.log("Elemento 'buscarboxmpago' ya existe en el DOM");
    agregarEventoBuscarMpago(buscarBoxInicial);
    observarDOM.disconnect(); // No es necesario seguir observando
  }

  // Función para agregar el evento de búsqueda
  function agregarEventoBuscarMpago(buscarBox) {
    buscarBox.addEventListener("input", function () {
      const filtro = buscarBox.value.toLowerCase();
      const filas = document.querySelectorAll("#tabla-mpagos tbody tr");

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
    if (event.target.id === "buscarboxmpago") {
      const buscarBox = event.target; // El input dinámico
      const filtro = buscarBox.value.toLowerCase();
      const limpiarBusquedaMpago = document.getElementById(
        "limpiar-busquedaMpago"
      ); // Botón dinámico
      const filas = document.querySelectorAll("#tabla-mpagos tbody tr");
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
    if (event.target.id === "limpiar-busquedaMpago") {
      const buscarBox = document.getElementById("buscarboxmpago");
      const limpiarBusquedaMpago = event.target;

      if (buscarBox) {
        buscarBox.value = ""; // Limpiar el input
        if (limpiarBusquedaMpago) {
          limpiarBusquedaMpago.style.display = "none"; // Ocultar el botón de limpiar
          document.getElementById("mensaje-vacio").style.display = "none";
        }
      }

      const filas = document.querySelectorAll("#tabla-mpagos tbody tr");
      filas.forEach((fila) => {
        fila.style.display = ""; // Mostrar todas las filas
      });
    }
  });
});
// Llamar formulario de Impuestos***************************************************
document
  .getElementById("impuestos-link")
  .addEventListener("click", function (event) {
    event.preventDefault(); // Evita la acción por defecto del enlace
    fetch("catalogos/impuestos.php")
      .then((response) => response.text())
      .then((html) => {
        document.getElementById("content-area").innerHTML = html;
      })
      .catch((error) => {
        console.error("Error al cargar el contenido:", error);
      });
  });

//Crear Impuestos***************
function abrirModalImpuesto(id) {
  document.getElementById(id).style.display = "flex";
}

function cerrarModalImpuesto(id) {
  document.getElementById(id).style.display = "none";
}

function procesarFormularioImpuesto(event, tipo) {
  event.preventDefault(); //Para que no recergue la pagina
  const formData = new FormData(event.target);

  fetch(`cruds/procesar_${tipo}_impuesto.php`, {
    method: "POST",
    body: formData,
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        // Cerrar el modal
        cerrarModalImpuesto(tipo + "-modalImpuesto");
        // Limpiar los campos del formulario
        event.target.reset();

        // Actualizar la tabla dinámicamente si es 'crear'
        if (tipo === "crear") {
          const tbody = document.querySelector("table tbody");

          // Crear una nueva fila
          const newRow = document.createElement("tr");
          newRow.innerHTML = `
            <td>${data.impuesto.nombre}</td>
            <td>${data.impuesto.tasa}</td>
            <td>
              <button title="Editar" class="editarImpuesto fa-solid fa-pen-to-square" data-id="${data.impuesto.id}"></button>
              <button title="Eliminar" class="eliminarImpuesto fa-solid fa-trash" data-id="${data.impuesto.id}"></button>
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
function validarFormularioImpuesto(event) {
  event.preventDefault();

  const impuesto = document.querySelector("[name='impuesto']").value.trim();
  const tasa = document.querySelector("[name='tasa']").value.trim();

  const errores = [];

  if (impuesto.length < 3) {
    errores.push("El nombre debe tener al menos 3 caracteres.");
    const inputname = document.querySelector("#crear-impuesto");
    inputname.focus();
    inputname.classList.add("input-error"); // Añade la clase de error
  }
  // Elimina la clase de error al corregir
  const inputname = document.querySelector("#crear-impuesto");
  inputname.addEventListener("input", () => {
    if (inputname.value.length >= 3) {
      inputname.classList.remove("input-error"); // Quita la clase si el campo es válido
    }
  });

  if (tasa.length < 1) {
    errores.push("La tasa debe tener al menos 1 carácter.");
    const inputdesc = document.querySelector("#crear-tasa");
    inputdesc.focus();
    inputdesc.classList.add("input-error"); // Añade la clase de error
  }
  // Elimina la clase de error al corregir
  const inputdesc = document.querySelector("#crear-tasa");
  inputdesc.addEventListener("input", () => {
    if (inputdesc.value.length >= 3) {
      inputdesc.classList.remove("input-error"); // Quita la clase si el campo es válido
    }
  });

  if (errores.length > 0) {
    Swal.fire({
      title: "Errores en el formulario",
      html: errores.join("<br>"),
      icon: "error",
    });
    return;
  }

  // Verificar duplicados
  verificarDuplicadoImpuesto(impuesto)
    .then((esDuplicado) => {
      if (esDuplicado) {
        Swal.fire({
          title: "Error",
          text: "El nombre ya existe. Por favor, elige otro.",
          icon: "error",
        });
      } else {
        // Si no hay errores, enviar el formulario
        procesarFormularioImpuesto(event, "crear");
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
function verificarDuplicadoImpuesto(impuesto) {
  //console.log("Nombre verificar:", impuesto);

  return fetch("cruds/verificar_nombre_impuesto.php", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ impuesto }),
  })
    .then((response) => response.json())
    .then((data) => {
      //console.log("Respuesta de verificar_nombre.php:", data);
      if (data.existe) {
        mostrarAlerta("error", "Error", "El nombre ya existe.");
      }
      return data.existe;
    })
    .catch((error) => {
      console.error("Error al verificar duplicado:", error);
      return true; // Asume duplicado en caso de error
    });
}
//Editar Impuestos************************************************************
document.addEventListener("DOMContentLoaded", function () {
  // Escuchar clic en el botón de editar
  document.addEventListener("click", function (event) {
    if (event.target.classList.contains("editarImpuesto")) {
      const id = event.target.dataset.id;
      //console.log("Botón editar clickeado. ID:", id);

      fetch(`cruds/obtener_impuesto.php?id=${id}`)
        .then((response) => response.json())
        .then((data) => {
          //console.log("Datos recibidos del servidor:", data);
          if (data.success) {
            const formularioImpuesto = document.getElementById(
              "form-editarImpuesto"
            );
            if (formularioImpuesto) {
              const campos = ["idimpuesto", "impuesto", "tasa"];
              campos.forEach((campo) => {
                //console.log(`Asignando ${campo}:`, data.impuesto[campo]);
                formularioImpuesto[`editar-${campo}`].value =
                  data.impuesto[campo] || "";
              });
              abrirModalImpuesto("editar-modalImpuesto");
            } else {
              console.error("Formulario de edición no encontrado.");
            }
          } else {
            mostrarAlerta(
              "error",
              "Error",
              data.message || "No se pudo cargar el campo."
            );
          }
        })
        .catch((error) => {
          console.error("Error al obtener el campo:", error);
          mostrarAlerta(
            "error",
            "Error",
            "Ocurrió un problema al obtener los datos."
          );
        });
    }
  });

  // Validar y enviar el formulario de edición
  document.body.addEventListener("submit", function (event) {
    if (event.target && event.target.id === "form-editarImpuesto") {
      event.preventDefault(); // Esto evita el comportamiento predeterminado de recargar la página.
      validarFormularioEdicionImpuesto(event.target);
    }
  });
});

// Función genérica para mostrar alertas
function mostrarAlerta(tipo, titulo, mensaje) {
  Swal.fire({ title: titulo, text: mensaje, icon: tipo });
}

//Validar duplicados en edicion impuesto
function verificarDuplicadoEditarImpuesto(impuesto, id = 0) {
  //console.log("Validando duplicados. ID:", id, "Impuesto:", impuesto);

  return fetch("cruds/verificar_nombre_impuesto.php", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ impuesto, id }),
  })
    .then((response) => response.json())
    .then((data) => {
      //console.log("Respuesta de verificar_nombre.php:", data);
      if (data.existe) {
        mostrarAlerta("error", "Error", "El nombre ya existe.");
      }
      return data.existe;
    })
    .catch((error) => {
      console.error("Error al verificar duplicado:", error);
      return true; // Asume duplicado en caso de error
    });
}
// Validación del formulario de edición Impuesto
async function validarFormularioEdicionImpuesto(formulario) {
  const campos = [
    {
      nombre: "impuesto",
      min: 3,
      mensaje: "El nombre debe tener al menos 3 caracteres.",
    },
    {
      nombre: "tasa",
      min: 1,
      mensaje: "La tasa debe tener al menos 1 carácter.",
    },
  ];
  let primerError = null;
  const errores = [];

  // Validar cada campo
  campos.forEach((campo) => {
    const campoFormulario = document.getElementById(`editar-${campo.nombre}`);
    if (!campoFormulario) {
      console.error(`El campo editar-${campo.nombre} no se encontró.`);
      return; // Continúa con el siguiente campo
    }
    campoFormulario.addEventListener("input", () => {
      //Quita lo rojo del error al validar que es mayor o igual a su validación
      if (campoFormulario.value.length >= campo.min) {
        campoFormulario.classList.remove("input-error"); // Quita la clase si el campo es válido
      }
    });
    const valor = campoFormulario.value.trim();
    // Validar por longitud mínima
    if (valor.length < campo.min) {
      errores.push(campo.mensaje);
      campoFormulario.classList.add("input-error");
      campoFormulario.focus(); // Establece el foco en el campo inválido
      if (!primerError) primerError = campoFormulario; // Guardar el primer error
    } else {
      campoFormulario.classList.remove("input-error");
    }
  });
  // Si hay errores, mostrar la alerta y enfocar el primer campo con error
  if (errores.length > 0) {
    Swal.fire({
      title: "Errores en el formulario",
      html: errores.join("<br>"),
      icon: "error",
    });
    if (primerError) primerError.focus(); // Enfocar el primer campo con error
    return;
  }

  // Verificar duplicado antes de enviar el formulario
  const impuestoInput = document.getElementById("editar-impuesto");
  const idInput = document.getElementById("editar-idimpuesto");
  if (!impuestoInput || !idInput) {
    console.log("Error: No se encontró el campo o ID.");
    return;
  }
  const impuesto = impuestoInput.value.trim();
  const id = idInput.value;

  try {
    //console.log("Verificando duplicado. ID:", id, "Impuesto:", impuesto);
    const esDuplicado = await verificarDuplicadoEditarImpuesto(impuesto, id);
    if (esDuplicado) {
      return; // No enviar el formulario si hay duplicados
    } else {
      //cerrarModalImpuesto("editar-modalImpuesto");
      enviarFormularioEdicionImpuesto(formulario); // Proceder si no hay duplicados
    }
  } catch (error) {
    console.error("Error al verificar duplicado:", error);
  }
}
// Enviar formulario de edición Impuesto
function enviarFormularioEdicionImpuesto(formulario) {
  if (!formulario) {
    console.error("El formulario no se encontró.");
    return;
  }
  const formData = new FormData(formulario);

  fetch("cruds/editar_impuesto.php", {
    method: "POST",
    body: formData,
  })
    .then((response) => response.json())
    .then((data) => {
      //console.log("Respuesta del servidorEdit:", data);
      if (data.success) {
        mostrarAlerta(
          "success",
          "¡Éxito!",
          data.message || "Actualizada correctamente."
        );
        actualizarFilaTablaImpuesto(formData);
        cerrarModal("editar-modalImpuesto");
      } else {
        mostrarAlerta(
          "error",
          "Error",
          data.message || "No se pudo actualizar."
        );
      }
    })
    .catch((error) => {
      console.error("Error al actualizar:", error);
      mostrarAlerta("error", "Error", "Ocurrió un problema al actualizar.");
    });
}
// Actualizar fila de la tabla
function actualizarFilaTablaImpuesto(formData) {
  const fila = document
    .querySelector(`button[data-id="${formData.get("editar-idimpuesto")}"]`)
    .closest("tr");
  //console.log(formData.get("editar-idimpuesto"));
  if (fila) {
    fila.cells[0].textContent = formData.get("impuesto");
    fila.cells[1].textContent = formData.get("tasa");
  }
}
// Eliminar Impuestos*****************************
document.addEventListener("click", function (event) {
  if (event.target.classList.contains("eliminarImpuesto")) {
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
        fetch(`cruds/eliminar_impuesto.php?id=${id}`, { method: "POST" })
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
            console.error("Error al eliminar:", error);
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
        const buscarBox = document.getElementById("buscarboximpuesto");
        if (buscarBox) {
          //console.log("Elemento 'buscarbox' encontrado dinámicamente");
          agregarEventoBuscarImpuesto(buscarBox);
          observarDOM.disconnect(); // Deja de observar después de encontrarlo
        }
      }
    });
  });

  // Comienza a observar el body del DOM
  observarDOM.observe(document.body, { childList: true, subtree: true });

  // Si el elemento ya existe en el DOM
  const buscarBoxInicial = document.getElementById("buscarboximpuesto");
  if (buscarBoxInicial) {
    console.log("Elemento 'buscarboximpuesto' ya existe en el DOM");
    agregarEventoBuscarImpuesto(buscarBoxInicial);
    observarDOM.disconnect(); // No es necesario seguir observando
  }

  // Función para agregar el evento de búsqueda
  function agregarEventoBuscarImpuesto(buscarBox) {
    buscarBox.addEventListener("input", function () {
      const filtro = buscarBox.value.toLowerCase();
      const filas = document.querySelectorAll("#tabla-impuestos tbody tr");

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
    if (event.target.id === "buscarboximpuesto") {
      const buscarBox = event.target; // El input dinámico
      const filtro = buscarBox.value.toLowerCase();
      const limpiarBusquedaImpuesto = document.getElementById(
        "limpiar-busquedaImpuesto"
      ); // Botón dinámico
      const filas = document.querySelectorAll("#tabla-impuestos tbody tr");
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
    if (event.target.id === "limpiar-busquedaImpuesto") {
      const buscarBox = document.getElementById("buscarboximpuesto");
      const limpiarBusquedaImpuesto = event.target;

      if (buscarBox) {
        buscarBox.value = ""; // Limpiar el input
        if (limpiarBusquedaImpuesto) {
          limpiarBusquedaImpuesto.style.display = "none"; // Ocultar el botón de limpiar
          document.getElementById("mensaje-vacio").style.display = "none";
        }
      }

      const filas = document.querySelectorAll("#tabla-impuestos tbody tr");
      filas.forEach((fila) => {
        fila.style.display = ""; // Mostrar todas las filas
      });
    }
  });
});
// Llamar formulario de Proveedores*************************************************
document
  .getElementById("proveedores-link")
  .addEventListener("click", function (event) {
    event.preventDefault(); // Evita la acción por defecto del enlace
    fetch("catalogos/proveedores.php")
      .then((response) => response.text())
      .then((html) => {
        document.getElementById("content-area").innerHTML = html;
      })
      .catch((error) => {
        console.error("Error al cargar el contenido:", error);
      });
  });

//Crear Proveedores***********************************
function abrirModalProveedor(id) {
  document.getElementById(id).style.display = "flex";
}

function cerrarModalProveedor(id) {
  document.getElementById(id).style.display = "none";
}

function procesarFormularioProveedor(event, tipo) {
  event.preventDefault(); //Para que no recergue la pagina
  const formData = new FormData(event.target);

  fetch(`cruds/procesar_${tipo}_proveedor.php`, {
    method: "POST",
    body: formData,
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        // Cerrar el modal
        cerrarModalProveedor(tipo + "-modalProveedor");
        // Limpiar los campos del formulario
        event.target.reset();

        // Actualizar la tabla dinámicamente si es 'crear'
        if (tipo === "crear") {
          const tbody = document.querySelector("table tbody");

          // Crear una nueva fila
          const newRow = document.createElement("tr");
          newRow.innerHTML = `
            <td>${data.proveedor.proveedor}</td>
            <td>${data.proveedor.contacto}</td>
            <td>${data.proveedor.telefono}</td>
            <td>${data.proveedor.email}</td>
            <td>
              <button title="Editar" class="editarProveedor fa-solid fa-pen-to-square" data-id="${data.proveedor.id}"></button>
              <button title="Eliminar" class="eliminarProveedor fa-solid fa-trash" data-id="${data.proveedor.id}"></button>
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
function validarFormularioProveedor(event) {
  event.preventDefault();

  const proveedor = document.querySelector("[name='proveedor']").value.trim();
  const contacto = document.querySelector("[name='contacto']").value.trim();
  const rfc = document.querySelector("[name='rfc']").value.trim();

  const errores = [];

  if (proveedor.length < 3) {
    errores.push("El nombre debe tener al menos 3 caracteres.");
    const inputname = document.querySelector("#crear-proveedor");
    inputname.focus();
    inputname.classList.add("input-error"); // Añade la clase de error
  }
  // Elimina la clase de error al corregir
  const inputname = document.querySelector("#crear-proveedor");
  inputname.addEventListener("input", () => {
    if (inputname.value.length >= 3) {
      inputname.classList.remove("input-error"); // Quita la clase si el campo es válido
    }
  });

  if (contacto.length < 3) {
    errores.push("El contacto debe tener al menos 3 caracteres.");
    const inputcontacto = document.querySelector("#crear-contacto");
    inputcontacto.focus();
    inputcontacto.classList.add("input-error"); // Añade la clase de error
  }
  // Elimina la clase de error al corregir
  const inputcontacto = document.querySelector("#crear-contacto");
  inputcontacto.addEventListener("input", () => {
    if (inputcontacto.value.length >= 3) {
      inputcontacto.classList.remove("input-error"); // Quita la clase si el campo es válido
    }
  });

  if (rfc.length < 12) {
    errores.push("El RFC debe tener al menos 12 caracteres.");
    const inputrfc = document.querySelector("#crear-rfc");
    inputrfc.focus();
    inputrfc.classList.add("input-error"); // Añade la clase de error
  }
  // Elimina la clase de error al corregir
  const inputrfc = document.querySelector("#crear-rfc");
  inputrfc.addEventListener("input", () => {
    if (inputrfc.value.length >= 12) {
      inputrfc.classList.remove("input-error"); // Quita la clase si el campo es válido
    }
  });

  if (errores.length > 0) {
    Swal.fire({
      title: "Errores en el formulario",
      html: errores.join("<br>"),
      icon: "error",
    });
    return;
  }

  // Verificar duplicados
  verificarDuplicadoProveedor(proveedor)
    .then((esDuplicado) => {
      if (esDuplicado) {
        Swal.fire({
          title: "Error",
          text: "El nombre ya existe. Por favor, elige otro.",
          icon: "error",
        });
      } else {
        // Si no hay errores, enviar el formulario
        procesarFormularioProveedor(event, "crear");
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
function verificarDuplicadoProveedor(proveedor) {
  //console.log("Nombre verificar:", proveedor);

  return fetch("cruds/verificar_nombre_proveedor.php", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ proveedor }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Respuesta de verificar_nombre.php:", data);
      if (data.existe) {
        mostrarAlerta("error", "Error", "El nombre ya existe.");
      }
      return data.existe;
    })
    .catch((error) => {
      console.error("Error al verificar duplicado:", error);
      return true; // Asume duplicado en caso de error
    });
}
//Editar Proveedores************************************************************
document.addEventListener("DOMContentLoaded", function () {
  // Escuchar clic en el botón de editar
  document.addEventListener("click", function (event) {
    if (event.target.classList.contains("editarProveedor")) {
      const id = event.target.dataset.id;
      //console.log("Botón editar clickeado. ID:", id);

      fetch(`cruds/obtener_proveedor.php?id=${id}`)
        .then((response) => response.json())
        .then((data) => {
          //console.log("Datos recibidos del servidor:", data);
          if (data.success) {
            const formularioProveedor = document.getElementById(
              "form-editarProveedor"
            );
            if (formularioProveedor) {
              const campos = [
                "idproveedor",
                "proveedor",
                "contacto",
                "rfc",
                "telefono",
                "celular",
                "email",
                "limitecred",
                "diacred",
              ];
              //console.log(`Asignando ${campo}:`, data.proveedor[campo]);
              campos.forEach((campo) => {
                const input = formularioProveedor[`editar-${campo}`];
                if (input) {
                  //console.log(`Asignando ${campo}:`, data.proveedor[campo]);
                  input.value = data.proveedor[campo] || "";
                } else {
                  console.warn(
                    `El campo editar-${campo} no existe en el formulario.`
                  );
                }
              });
              abrirModalProveedor("editar-modalProveedor");
            } else {
              console.error("Formulario de edición no encontrado.");
            }
          } else {
            mostrarAlerta(
              "error",
              "Error",
              data.message || "No se pudo cargar el campo."
            );
          }
        })
        .catch((error) => {
          console.error("Error al obtener el campo:", error);
          mostrarAlerta(
            "error",
            "Error",
            "Ocurrió un problema al obtener los datos."
          );
        });
    }
  });

  // Validar y enviar el formulario de edición
  document.body.addEventListener("submit", function (event) {
    if (event.target && event.target.id === "form-editarProveedor") {
      event.preventDefault(); // Esto evita el comportamiento predeterminado de recargar la página.
      validarFormularioEdicionProveedor(event.target);
    }
  });
});

// Función genérica para mostrar alertas
function mostrarAlerta(tipo, titulo, mensaje) {
  Swal.fire({ title: titulo, text: mensaje, icon: tipo });
}

//Validar duplicados en edicion proveedor
function verificarDuplicadoEditarProveedor(proveedor, id = 0) {
  //console.log("Validando duplicados. ID:", id, "Proveedor:", proveedor);

  return fetch("cruds/verificar_nombre_proveedor.php", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ proveedor, id }),
  })
    .then((response) => response.json())
    .then((data) => {
      //console.log("Respuesta de verificar_nombre.php:", data);
      if (data.existe) {
        mostrarAlerta("error", "Error", "El nombre ya existe.");
      }
      return data.existe;
    })
    .catch((error) => {
      console.error("Error al verificar duplicado:", error);
      return true; // Asume duplicado en caso de error
    });
}
// Validación del formulario de edición Proveedor
async function validarFormularioEdicionProveedor(formulario) {
  const campos = [
    {
      nombre: "proveedor",
      min: 3,
      mensaje: "El nombre debe tener al menos 3 caracteres.",
    },
    {
      nombre: "contacto",
      min: 3,
      mensaje: "El contacto debe tener al menos 3 caracteres.",
    },
    {
      nombre: "rfc",
      min: 12,
      mensaje: "El RFC debe tener al menos 12 caracteres.",
    },
  ];
  let primerError = null;
  const errores = [];

  // Validar cada campo
  campos.forEach((campo) => {
    const campoFormulario = document.getElementById(`editar-${campo.nombre}`);
    if (!campoFormulario) {
      console.error(`El campo editar-${campo.nombre} no se encontró.`);
      return; // Continúa con el siguiente campo
    }
    campoFormulario.addEventListener("input", () => {
      //Quita lo rojo del error al validar que es mayor o igual a su validación
      if (campoFormulario.value.length >= campo.min) {
        campoFormulario.classList.remove("input-error"); // Quita la clase si el campo es válido
      }
    });
    const valor = campoFormulario.value.trim();
    // Validar por longitud mínima
    if (valor.length < campo.min) {
      errores.push(campo.mensaje);
      campoFormulario.classList.add("input-error");
      campoFormulario.focus(); // Establece el foco en el campo inválido
      if (!primerError) primerError = campoFormulario; // Guardar el primer error
    } else {
      campoFormulario.classList.remove("input-error");
    }
  });
  // Si hay errores, mostrar la alerta y enfocar el primer campo con error
  if (errores.length > 0) {
    Swal.fire({
      title: "Errores en el formulario",
      html: errores.join("<br>"),
      icon: "error",
    });
    if (primerError) primerError.focus(); // Enfocar el primer campo con error
    return;
  }

  // Verificar duplicado antes de enviar el formulario
  const proveedorInput = document.getElementById("editar-proveedor");
  const idInput = document.getElementById("editar-idproveedor");
  if (!proveedorInput || !idInput) {
    console.log("Error: No se encontró el campo o ID.");
    return;
  }
  const proveedor = proveedorInput.value.trim();
  const id = idInput.value;

  try {
    //console.log("Verificando duplicado. ID:", id, "Proveedor:", proveedor);
    const esDuplicado = await verificarDuplicadoEditarCliente(proveedor, id);
    if (esDuplicado) {
      return; // No enviar el formulario si hay duplicados
    } else {
      //cerrarModalProveedor("editar-modalProveedor");
      enviarFormularioEdicionProveedor(formulario); // Proceder si no hay duplicados
    }
  } catch (error) {
    console.error("Error al verificar duplicado:", error);
  }
}
// Enviar formulario de edición Proveedor
function enviarFormularioEdicionProveedor(formulario) {
  if (!formulario) {
    console.error("El formulario no se encontró.");
    return;
  }
  const formData = new FormData(formulario);

  fetch("cruds/editar_proveedor.php", {
    method: "POST",
    body: formData,
  })
    .then((response) => response.json())
    .then((data) => {
      //console.log("Respuesta del servidorEdit:", data);
      if (data.success) {
        mostrarAlerta(
          "success",
          "¡Éxito!",
          data.message || "Actualizada correctamente."
        );
        actualizarFilaTablaProveedor(formData);
        cerrarModal("editar-modalProveedor");
      } else {
        mostrarAlerta(
          "error",
          "Error",
          data.message || "No se pudo actualizar."
        );
      }
    })
    .catch((error) => {
      console.error("Error al actualizar:", error);
      mostrarAlerta("error", "Error", "Ocurrió un problema al actualizar.");
    });
}
// Actualizar fila de la tabla
function actualizarFilaTablaProveedor(formData) {
  const fila = document
    .querySelector(`button[data-id="${formData.get("editar-idproveedor")}"]`)
    .closest("tr");
  //console.log(formData.get("editar-idproveedor"));
  if (fila) {
    fila.cells[0].textContent = formData.get("proveedor");
    fila.cells[1].textContent = formData.get("contacto");
    fila.cells[2].textContent = formData.get("telefono");
    fila.cells[3].textContent = formData.get("email");
  }
}
// Eliminar Proveedores*****************************
document.addEventListener("click", function (event) {
  if (event.target.classList.contains("eliminarProveedor")) {
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
        fetch(`cruds/eliminar_proveedor.php?id=${id}`, { method: "POST" })
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
            console.error("Error al eliminar:", error);
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
        const buscarBox = document.getElementById("buscarboxproveedor");
        if (buscarBox) {
          //console.log("Elemento 'buscarbox' encontrado dinámicamente");
          agregarEventoBuscarProveedor(buscarBox);
          observarDOM.disconnect(); // Deja de observar después de encontrarlo
        }
      }
    });
  });

  // Comienza a observar el body del DOM
  observarDOM.observe(document.body, { childList: true, subtree: true });

  // Si el elemento ya existe en el DOM
  const buscarBoxInicial = document.getElementById("buscarboxproveedor");
  if (buscarBoxInicial) {
    console.log("Elemento 'buscarboxproveedor' ya existe en el DOM");
    agregarEventoBuscarProveedor(buscarBoxInicial);
    observarDOM.disconnect(); // No es necesario seguir observando
  }

  // Función para agregar el evento de búsqueda
  function agregarEventoBuscarProveedor(buscarBox) {
    buscarBox.addEventListener("input", function () {
      const filtro = buscarBox.value.toLowerCase();
      const filas = document.querySelectorAll("#tabla-proveedores tbody tr");

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
    if (event.target.id === "buscarboxproveedor") {
      const buscarBox = event.target; // El input dinámico
      const filtro = buscarBox.value.toLowerCase();
      const limpiarBusquedaCliente = document.getElementById(
        "limpiar-busquedaCliente"
      ); // Botón dinámico
      const filas = document.querySelectorAll("#tabla-proveedores tbody tr");
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
    if (event.target.id === "limpiar-busquedaCliente") {
      const buscarBox = document.getElementById("buscarboxproveedor");
      const limpiarBusquedaCliente = event.target;

      if (buscarBox) {
        buscarBox.value = ""; // Limpiar el input
        if (limpiarBusquedaCliente) {
          limpiarBusquedaCliente.style.display = "none"; // Ocultar el botón de limpiar
          document.getElementById("mensaje-vacio").style.display = "none";
        }
      }

      const filas = document.querySelectorAll("#tabla-proveedores tbody tr");
      filas.forEach((fila) => {
        fila.style.display = ""; // Mostrar todas las filas
      });
    }
  });
});

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
