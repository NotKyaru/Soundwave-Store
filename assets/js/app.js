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

function obtenerCantidadEnCarritoSW(idProducto) {
    const linea = leerCarritoSW().find((item) => item.id === idProducto);
    return linea ? linea.cantidad : 0;
}

// limiteStock: null/undefined = sin límite (álbum digital). Un número = tope
// físico real (instrumentos y equipos). Nunca deja la línea por sobre el tope.
function agregarAlCarritoSW(idProducto, cantidad = 1, limiteStock = null) {
    const carrito = leerCarritoSW();
    const linea = carrito.find((item) => item.id === idProducto);
    const cantidadActual = linea ? linea.cantidad : 0;
    let cantidadFinal = cantidadActual + cantidad;

    if (typeof limiteStock === "number" && !Number.isNaN(limiteStock)) {
        cantidadFinal = Math.min(cantidadFinal, Math.max(limiteStock, 0));
    }

    if (cantidadFinal === cantidadActual) {
        return { carrito, agregado: false };
    }

    if (linea) {
        linea.cantidad = cantidadFinal;
    } else {
        carrito.push({ id: idProducto, cantidad: cantidadFinal });
    }

    guardarCarritoSW(carrito);
    return { carrito, agregado: true };
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

// Los botones "Agregar al carrito" de instrumentos y equipos declaran
// data-stock="N" (ver instrumento_*.html) con el stock real del producto.
// Los álbumes no lo declaran: son descarga digital, sin límite de stock.
function inicializarBotonesAgregarSW() {
    document.querySelectorAll("[data-id-producto][data-accion-agregar]").forEach((boton) => {
        boton.addEventListener("click", (evento) => {
            evento.preventDefault();
            const idProducto = boton.dataset.idProducto;
            const limiteStock = boton.dataset.stock !== undefined ? Number(boton.dataset.stock) : null;

            if (limiteStock !== null && obtenerCantidadEnCarritoSW(idProducto) >= limiteStock) {
                mostrarAvisoSW("No hay más stock disponible de este producto");
                return;
            }

            const resultado = agregarAlCarritoSW(idProducto, 1, limiteStock);

            if (!resultado.agregado) {
                mostrarAvisoSW("No hay más stock disponible de este producto");
                return;
            }

            const destino = boton.dataset.destino;
            if (destino) {
                window.location.href = destino;
                return;
            }

            mostrarAvisoSW("Producto añadido al carrito");
        });
    });
}

document.addEventListener("DOMContentLoaded", () => {
    actualizarContadorCarritoSW();
    inicializarBotonesAgregarSW();
});
