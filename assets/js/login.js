const formularioLogin = document.querySelector("#formulario-login");
const correo = document.querySelector("#correo");
const contrasena = document.querySelector("#contrasena");
const mensajeLogin = document.querySelector("#mensaje-login");

// Funciones para mostrar y limpiar errores
function mostrarError(control, idError, mensaje) {
  const salida = document.querySelector(`#${idError}`);
  salida.textContent = mensaje;
  control.classList.add("campo-invalido");
  control.setAttribute("aria-invalid", "true");
}

function limpiarError(control, idError) {
  const salida = document.querySelector(`#${idError}`);
  salida.textContent = "";
  control.classList.remove("campo-invalido");
  control.removeAttribute("aria-invalid");
}

// Validación de Correo
function validarCorreo(valor) {
  limpiarError(correo, "error-correo");
  if (valor === "") {
    mostrarError(correo, "error-correo", "El correo es obligatorio");
    return false;
  }
  if (!valor.includes("@")) {
    mostrarError(correo, "error-correo", "El correo debe contener @");
    return false;
  }
  return true;
}

// Validación de Contraseña
function validarContrasena(valor) {
  limpiarError(contrasena, "error-contrasena");
  if (valor.length < 6 || valor.length > 12) {
    mostrarError(contrasena, "error-contrasena", "Debe contener entre 6 y 12 caracteres");
    return false;
  }
  return true;
}

// Controlar el evento submit
formularioLogin.addEventListener("submit", function(evento) {
  evento.preventDefault(); 

  const valorCorreo = correo.value.trim().toLowerCase();
  const valorContrasena = contrasena.value; // Sin trim() para la contraseña

  const correoValido = validarCorreo(valorCorreo);
  const contrasenaValida = validarContrasena(valorContrasena);

  if (correoValido && contrasenaValida) {
    mensajeLogin.textContent = "Inicio de sesión exitoso.";
    
    // Persistencia: Guardamos solo el correo
    const sesion = { correo: valorCorreo };
    localStorage.setItem("usuarioSoundwave", JSON.stringify(sesion));
    
    formularioLogin.reset();
  } else {
    mensajeLogin.textContent = "Revisa los campos marcados";
  }
});

// Validación dinámica mientras el usuario corrige
correo.addEventListener("blur", function () { validarCorreo(correo.value.trim().toLowerCase()); });
correo.addEventListener("input", function () { limpiarError(correo, "error-correo"); });
contrasena.addEventListener("blur", function () { validarContrasena(contrasena.value); });
contrasena.addEventListener("input", function () { limpiarError(contrasena, "error-contrasena"); });