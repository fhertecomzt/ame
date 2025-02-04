const pass = document.getElementById("pass"),
  icon = document.querySelector(".bx");

// Ocultar el icono inicialmente
icon.style.display = "none";

// Mostrar el icono cuando el usuario comience a escribir
pass.addEventListener("input", () => {
  if (pass.value.length > 0) {
    icon.style.display = "inline"; // Muestra el ícono
  } else {
    icon.style.display = "none"; // Oculta el ícono si el campo está vacío
  }
});

// Alternar la visibilidad de la contraseña al hacer clic en el icono
icon.addEventListener("click", () => {
  if (pass.type === "password") {
    pass.type = "text";
    icon.classList.remove("fa-eye");
    icon.classList.add("fa-eye-slash");
  } else {
    pass.type = "password";
    icon.classList.add("fa-eye");
    icon.classList.remove("fa-eye-slash");
  }
});
