const formularioContacto = document.querySelector("#formulario-contacto");
const nombre = document.querySelector("#nombre");
const correo = document.querySelector("#correo");
const mensaje = document.querySelector("#mensaje");
const mensajeExito = document.querySelector("#mensaje-exito");

// Funciones base obligatorias para mostrar/limpiar errores
function mostrarError(control, idError, texto) {
  const salida = document.querySelector(`#${idError}`);
  salida.textContent = texto;
  control.classList.add("campo-invalido");
  control.setAttribute("aria-invalid", "true");
}

function limpiarError(control, idError) {
  const salida = document.querySelector(`#${idError}`);
  salida.textContent = "";
  control.classList.remove("campo-invalido");
  control.removeAttribute("aria-invalid");
}

// Validaciones
function validarNombre(valor) {
  limpiarError(nombre, "error-nombre");
  if (valor === "") {
    mostrarError(nombre, "error-nombre", "El nombre es obligatorio");
    return false;
  }
  if (valor.length > 50) {
    mostrarError(nombre, "error-nombre", "Máximo 50 caracteres");
    return false;
  }
  return true;
}

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

function validarMensaje(valor) {
  limpiarError(mensaje, "error-mensaje");
  if (valor === "") {
    mostrarError(mensaje, "error-mensaje", "El mensaje es obligatorio");
    return false;
  }
  if (valor.length < 20 || valor.length > 500) {
    mostrarError(mensaje, "error-mensaje", "El mensaje debe tener entre 20 y 500 caracteres");
    return false;
  }
  return true;
}

// Controlar el evento submit
formularioContacto.addEventListener("submit", function(evento) {
  evento.preventDefault(); 

  const valorNombre = nombre.value.trim();
  const valorCorreo = correo.value.trim().toLowerCase();
  const valorMensaje = mensaje.value.trim();

  const nombreValido = validarNombre(valorNombre);
  const correoValido = validarCorreo(valorCorreo);
  const mensajeValido = validarMensaje(valorMensaje);

  if (nombreValido && correoValido && mensajeValido) {
    mensajeExito.textContent = "¡Mensaje enviado correctamente! (Simulación)";
    mensajeExito.style.color = "#2a7f62"; // Color verde oscuro de tu paleta
    formularioContacto.reset();
  } else {
    mensajeExito.textContent = "Revisa los campos marcados";
    mensajeExito.style.color = "#b42318";
  }
});

// Validación dinámica mientras el usuario corrige (blur e input)
nombre.addEventListener("blur", function () { validarNombre(nombre.value.trim()); });
nombre.addEventListener("input", function () { limpiarError(nombre, "error-nombre"); });

correo.addEventListener("blur", function () { validarCorreo(correo.value.trim().toLowerCase()); });
correo.addEventListener("input", function () { limpiarError(correo, "error-correo"); });

mensaje.addEventListener("blur", function () { validarMensaje(mensaje.value.trim()); });
mensaje.addEventListener("input", function () { limpiarError(mensaje, "error-mensaje"); });