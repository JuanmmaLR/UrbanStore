// ==========================================
// COMPILACION AUTOMATICA JAVASCRIPT
// GRUPO: USER
// FECHA: 2026-01-26 15:12:18
// ==========================================

////////////////////////////////////////////////////////////
// ARCHIVO: Admin_User.js
// RUTA: C:\Users\juanl\Git\PROYECTOS\UrbanStore\UStore\app\static\js\User\Admin_User.js
////////////////////////////////////////////////////////////

// static/js/Admin_User.js
document.addEventListener('DOMContentLoaded', function() {
    // Puedes añadir funcionalidades JavaScript aquí si necesitas
    console.log('Admin User JS cargado');
    
    // Ejemplo: Confirmación antes de eliminar
    const deleteButtons = document.querySelectorAll('button[name="delete_user"]');
    deleteButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            if (!confirm('¿Estás seguro de que deseas eliminar este usuario?')) {
                e.preventDefault();
            }
        });
    });
});

////////////////////////////////////////////////////////////
// ARCHIVO: IniciarSesion.js
// RUTA: C:\Users\juanl\Git\PROYECTOS\UrbanStore\UStore\app\static\js\User\IniciarSesion.js
////////////////////////////////////////////////////////////



////////////////////////////////////////////////////////////
// ARCHIVO: Registrarse.js
// RUTA: C:\Users\juanl\Git\PROYECTOS\UrbanStore\UStore\app\static\js\User\Registrarse.js
////////////////////////////////////////////////////////////

// ============================
// REGISTRARSE.JS
// ============================

document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector(".rs-form");
  const terminos = document.getElementById("rs-terminos");
  const notificaciones = document.getElementById("rs-notificaciones");

  if (!form) return;

  // === Bootstrap Validation personalizada ===
  form.addEventListener("submit", function (event) {
    if (!form.checkValidity()) {
      event.preventDefault();
      event.stopPropagation();
      mostrarAlerta("Por favor, completa todos los campos requeridos.", "danger");
    } else if (!terminos.checked) {
      event.preventDefault();
      mostrarAlerta("Debes aceptar los Términos y Condiciones.", "warning");
    } else {
      mostrarAlerta("Registro enviado correctamente. ¡Bienvenido a UrbanStore!", "success");
    }

    form.classList.add("was-validated");
  });

  // === Mostrar alertas temporales ===
  function mostrarAlerta(mensaje, tipo = "info") {
    // Elimina cualquier alerta previa
    const alertaExistente = document.querySelector(".rs-alerta");
    if (alertaExistente) alertaExistente.remove();

    const alerta = document.createElement("div");
    alerta.className = `alert alert-${tipo} rs-alerta position-fixed top-0 end-0 m-3 shadow`;
    alerta.style.zIndex = "2000";
    alerta.textContent = mensaje;

    document.body.appendChild(alerta);

    setTimeout(() => alerta.remove(), 3500);
  }

  // === Validación en tiempo real ===
  form.querySelectorAll("input").forEach((input) => {
    input.addEventListener("input", () => {
      if (input.checkValidity()) {
        input.classList.remove("is-invalid");
        input.classList.add("is-valid");
      } else {
        input.classList.remove("is-valid");
        input.classList.add("is-invalid");
      }
    });
  });

  // === Enfoque visual en inputs ===
  form.querySelectorAll(".rs-input").forEach((input) => {
    input.addEventListener("focus", () => {
      input.parentElement.classList.add("rs-input-activo");
    });
    input.addEventListener("blur", () => {
      input.parentElement.classList.remove("rs-input-activo");
    });
  });

  // === Recordar preferencia de notificaciones ===
  if (localStorage.getItem("rs-notificaciones") === "true") {
    notificaciones.checked = true;
  }

  notificaciones.addEventListener("change", () => {
    localStorage.setItem("rs-notificaciones", notificaciones.checked);
  });
});


