// carrito.js — Renderiza el contenido de carrito.html a partir de lo
// guardado en localStorage (ver app.js) y el catálogo (ver productos.js).

document.addEventListener("DOMContentLoaded", () => {
    const listaCarrito = document.querySelector("#lista-carrito");
    const mensajeVacio = document.querySelector("#mensaje-vacio");
    const valorSubtotal = document.querySelector("#valor-subtotal");
    const valorTotal = document.querySelector("#valor-total");
    const botonVaciar = document.querySelector("#boton-vaciar");

    function formatearClp(numero) {
        return "$" + numero.toLocaleString("es-CL");
    }

    function crearFilaCarrito(linea) {
        const producto = buscarProductoSW(linea.id);
        if (!producto) return null;

        const li = document.createElement("li");
        li.className = "carrito-item";
        li.dataset.id = producto.id;

        li.innerHTML = `
            <img src="${producto.imagen}" alt="${producto.titulo}">
            <div class="carrito-info">
                <h3><a href="${producto.detalle}">${producto.titulo}</a></h3>
                <p class="carrito-formato">${producto.formato}</p>
                <button type="button" class="carrito-quitar" data-accion="quitar">Quitar</button>
            </div>
            <div class="carrito-cantidad">
                <label for="cantidad-${producto.id}">Cantidad</label>
                <div class="control-cantidad">
                    <button type="button" data-accion="restar" aria-label="Restar una unidad">−</button>
                    <input type="number" id="cantidad-${producto.id}" class="entrada-cantidad"
                           value="${linea.cantidad}" min="1" max="10" inputmode="numeric">
                    <button type="button" data-accion="sumar" aria-label="Sumar una unidad">+</button>
                </div>
            </div>
            <p class="carrito-precio">
                <span class="carrito-precio-unitario">${formatearClp(producto.precio)} c/u</span>
                <span class="carrito-subtotal">${formatearClp(producto.precio * linea.cantidad)}</span>
            </p>
        `;
        return li;
    }

    function renderizarCarrito() {
        const carrito = leerCarritoSW();
        listaCarrito.innerHTML = "";

        if (carrito.length === 0) {
            mensajeVacio.hidden = false;
            botonVaciar.hidden = true;
            valorSubtotal.textContent = formatearClp(0);
            valorTotal.textContent = formatearClp(0);
            return;
        }

        mensajeVacio.hidden = true;
        botonVaciar.hidden = false;

        let total = 0;
        carrito.forEach((linea) => {
            const producto = buscarProductoSW(linea.id);
            if (!producto) return;

            const fila = crearFilaCarrito(linea);
            listaCarrito.appendChild(fila);
            total += producto.precio * linea.cantidad;
        });

        valorSubtotal.textContent = formatearClp(total);
        valorTotal.textContent = formatearClp(total);
    }

    listaCarrito.addEventListener("click", (evento) => {
        const boton = evento.target.closest("button");
        if (!boton) return;

        const item = boton.closest(".carrito-item");
        const idProducto = item.dataset.id;
        const accion = boton.dataset.accion;
        const carrito = leerCarritoSW();
        const linea = carrito.find((l) => l.id === idProducto);
        if (!linea) return;

        if (accion === "quitar") {
            guardarCarritoSW(carrito.filter((l) => l.id !== idProducto));
            renderizarCarrito();
            return;
        }

        if (accion === "sumar") {
            linea.cantidad = Math.min(linea.cantidad + 1, 10);
        } else if (accion === "restar") {
            linea.cantidad = Math.max(linea.cantidad - 1, 1);
        } else {
            return;
        }

        guardarCarritoSW(carrito);
        renderizarCarrito();
    });

    listaCarrito.addEventListener("change", (evento) => {
        if (!evento.target.classList.contains("entrada-cantidad")) return;

        const item = evento.target.closest(".carrito-item");
        const idProducto = item.dataset.id;
        let cantidad = Number(evento.target.value);

        if (Number.isNaN(cantidad) || cantidad < 1) cantidad = 1;
        cantidad = Math.min(cantidad, 10);

        const carrito = leerCarritoSW();
        const linea = carrito.find((l) => l.id === idProducto);
        if (linea) {
            linea.cantidad = cantidad;
            guardarCarritoSW(carrito);
        }
        renderizarCarrito();
    });

    botonVaciar.addEventListener("click", () => {
        guardarCarritoSW([]);
        renderizarCarrito();
    });

    renderizarCarrito();
});
