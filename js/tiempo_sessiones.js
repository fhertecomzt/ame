// Tiempo máximo de inactividad en segundos (sincronizado con el servidor)
const tiempoInactividad = 3600; // 3600 60 minutos, para 1 min 160, 600 10 min
let tiempoUltimaActividad = Date.now();
let advertenciaMostrada = false; // Bandera para evitar mostrar múltiples advertencias

// Actualizar el tiempo de última actividad
function actualizarActividad() {
  tiempoUltimaActividad = Date.now();
  advertenciaMostrada = false; // Reinicia la bandera al detectar actividad
}

// Escuchar eventos de interacción del usuario
document.addEventListener("mousemove", actualizarActividad);
document.addEventListener("keypress", actualizarActividad);
document.addEventListener("click", actualizarActividad);
document.addEventListener("scroll", actualizarActividad);

// Verificar periódicamente si se excedió el tiempo de inactividad
setInterval(() => {
  const tiempoActual = Date.now();
  const tiempoInactivo = (tiempoActual - tiempoUltimaActividad) / 1000; // Convertir a segundos

  // Mostrar advertencia 1 minuto antes de la redirección
  if (tiempoInactivo > tiempoInactividad - 3000 && !advertenciaMostrada) {
    // 170 antes y 540 son 10 min
    console.log("Tu sesión está a punto de expirar.");
    alert("Tu sesión está a punto de expirar en menos de un minuto.");
    advertenciaMostrada = true; // Asegura que solo se muestre una vez
  }

  // Redirigir si se excede el tiempo de inactividad
  if (tiempoInactivo > tiempoInactividad) {
    alert(
      "Has estado inactivo demasiado tiempo. Serás redirigido al inicio de sesión."
    );
    window.location.href = "../index.php"; // Redirigir al inicio de sesión
  }
}, 1000); // Verificar cada segundo
