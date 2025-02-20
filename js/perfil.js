document.addEventListener("DOMContentLoaded", function () {
  const userImage = document.querySelector(".user--info img");
  const modalPerfil = document.getElementById("perfil-Modal");
  const closeModal = document.querySelector(".closePerfil");

  if (userImage && modalPerfil && closeModal) {
    userImage.addEventListener("click", function () {
      modalPerfil.style.display = "flex";
    });

    closeModal.addEventListener("click", function () {
      modalPerfil.style.display = "none";
    });

    window.addEventListener("click", function (event) {
      if (event.target === modalPerfil) {
        modalPerfil.style.display = "none";
      }
    });
  } else {
    console.error(
      "No se encontraron todos los elementos necesarios para el modal."
    );
  }
});
