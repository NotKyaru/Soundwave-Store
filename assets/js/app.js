// app.js — Lógica central del carrito de compras de SoundWave (localStorage)

const CLAVE_CARRITO_SW = "soundwave_carrito";

function leerCarritoSW() {
    try {
        const datos = JSON.parse(localStorage.getItem(CLAVE_CARRITO_SW));
        return Array.isArray(datos) ? datos : [];
    } catch (error) {
        return [];
    }
}

function guardarCarritoSW(carrito) {
    localStorage.setItem(CLAVE_CARRITO_SW, JSON.stringify(carrito));
    actualizarContadorCarritoSW();
}

function agregarAlCarritoSW(idProducto, cantidad = 1) {
    const carrito = leerCarritoSW();
    const linea = carrito.find((item) => item.id === idProducto);

    if (linea) {
        linea.cantidad += cantidad;
    } else {
        carrito.push({ id: idProducto, cantidad });
    }

    guardarCarritoSW(carrito);
    return carrito;
}

function contarUnidadesCarritoSW() {
    return leerCarritoSW().reduce((total, linea) => total + linea.cantidad, 0);
}

function actualizarContadorCarritoSW() {
    const contador = document.querySelector("#contador-carrito");
    if (!contador) return;

    const unidades = contarUnidadesCarritoSW();
    contador.textContent = String(unidades);
    contador.hidden = unidades === 0;
}

function mostrarAvisoSW(mensaje) {
    const aviso = document.createElement("div");
    aviso.className = "aviso-flotante";
    aviso.textContent = mensaje;
    aviso.setAttribute("role", "status");
    document.body.appendChild(aviso);

    requestAnimationFrame(() => aviso.classList.add("aviso-flotante-visible"));

    setTimeout(() => {
        aviso.classList.remove("aviso-flotante-visible");
        setTimeout(() => aviso.remove(), 300);
    }, 2200);
}

function inicializarBotonesAgregarSW() {
    document.querySelectorAll("[data-id-producto][data-accion-agregar]").forEach((boton) => {
        boton.addEventListener("click", (evento) => {
            evento.preventDefault();
            const idProducto = boton.dataset.idProducto;
            agregarAlCarritoSW(idProducto, 1);

            const destino = boton.dataset.destino;
            if (destino) {
                window.location.href = destino;
                return;
            }

            mostrarAvisoSW("Álbum añadido al carrito");
        });
    });
}

document.addEventListener("DOMContentLoaded", () => {
    actualizarContadorCarritoSW();
    inicializarBotonesAgregarSW();
});
