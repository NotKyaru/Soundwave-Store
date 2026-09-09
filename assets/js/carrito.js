// carrito.js — Renderiza el contenido de carrito.html a partir de lo
// guardado en localStorage (ver app.js). El carrito es compartido entre los
// dos catálogos del sitio (álbumes en productos.js, instrumentos y equipos
// en instrumentos.js), así que busca primero en el catálogo de instrumentos
// y si no aparece ahí, en el de álbumes. Los álbumes son descarga digital
// (sin stock físico real, envío gratis); los instrumentos y equipos son
// físicos: la cantidad no puede superar el stock disponible ni admitir
// decimales, y agregan un costo de envío fijo al pedido si hay al menos uno
// en el carrito.

const COSTO_ENVIO_SW = 3990;
const LIMITE_CANTIDAD_SIN_STOCK_SW = 10; // tope para productos digitales (álbumes), que no tienen stock físico

document.addEventListener("DOMContentLoaded", () => {
    const listaCarrito = document.querySelector("#lista-carrito");
    const mensajeVacio = document.querySelector("#mensaje-vacio");
    const valorSubtotal = document.querySelector("#valor-subtotal");
    const valorEnvio = document.querySelector("#valor-envio");
    const valorTotal = document.querySelector("#valor-total");
    const botonVaciar = document.querySelector("#boton-vaciar");

    function formatearClp(numero) {
        return "$" + numero.toLocaleString("es-CL");
    }

    function buscarProductoUnificadoSW(idProducto) {
        if (typeof buscarInstrumentoSW === "function") {
            const instrumento = buscarInstrumentoSW(idProducto);
            if (instrumento) return instrumento;
        }
        return typeof buscarProductoSW === "function" ? buscarProductoSW(idProducto) : undefined;
    }

    function esProductoFisico(producto) {
        return typeof producto.stock === "number";
    }

    function obtenerLimiteCantidad(producto) {
        return esProductoFisico(producto) ? producto.stock : LIMITE_CANTIDAD_SIN_STOCK_SW;
    }

    function normalizarCantidadEntera(valorCrudo, limite) {
        let cantidad = Math.trunc(Number(valorCrudo));
        if (!Number.isFinite(cantidad) || cantidad < 1) cantidad = 1;
        return Math.min(cantidad, Math.max(limite, 0));
    }

    // Corrige al cargar cualquier línea guardada que haya quedado con una
    // cantidad inválida (decimales de antes de esta validación, o stock que
    // bajó después de agregarse al carrito) y saca del carrito lo que quede
    // en 0 (producto sin stock que ya no se puede comprar).
    function sanearCarritoSW() {
        const carrito = leerCarritoSW();
        let cambio = false;

        const saneado = carrito
            .map((linea) => {
                const producto = buscarProductoUnificadoSW(linea.id);
                if (!producto) return linea;

                const limite = obtenerLimiteCantidad(producto);
                const cantidadSaneada = normalizarCantidadEntera(linea.cantidad, limite);

                if (cantidadSaneada !== linea.cantidad) cambio = true;
                return { ...linea, cantidad: cantidadSaneada };
            })
            .filter((linea) => linea.cantidad > 0);

        if (saneado.length !== carrito.length) cambio = true;
        if (cambio) guardarCarritoSW(saneado);
        return saneado;
    }

    function crearFilaCarrito(linea, producto) {
        const limite = obtenerLimiteCantidad(producto);

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
                           value="${linea.cantidad}" min="1" max="${limite}" step="1" inputmode="numeric">
                    <button type="button" data-accion="sumar" aria-label="Sumar una unidad">+</button>
                </div>
                ${esProductoFisico(producto) ? `<p class="carrito-stock-nota">Máximo ${limite} unidades en stock</p>` : ""}
            </div>
            <p class="carrito-precio">
                <span class="carrito-precio-unitario">${formatearClp(producto.precio)} c/u</span>
                <span class="carrito-subtotal">${formatearClp(producto.precio * linea.cantidad)}</span>
            </p>
        `;
        return li;
    }

    function renderizarCarrito() {
        const carrito = sanearCarritoSW();
        listaCarrito.innerHTML = "";

        if (carrito.length === 0) {
            mensajeVacio.hidden = false;
            botonVaciar.hidden = true;
            valorSubtotal.textContent = formatearClp(0);
            if (valorEnvio) valorEnvio.textContent = "Digital · Gratis";
            valorTotal.textContent = formatearClp(0);
            return;
        }

        mensajeVacio.hidden = true;
        botonVaciar.hidden = false;

        let subtotal = 0;
        let hayProductoFisico = false;

        carrito.forEach((linea) => {
            const producto = buscarProductoUnificadoSW(linea.id);
            if (!producto) return;

            const fila = crearFilaCarrito(linea, producto);
            listaCarrito.appendChild(fila);
            subtotal += producto.precio * linea.cantidad;
            if (esProductoFisico(producto)) hayProductoFisico = true;
        });

        const envio = hayProductoFisico ? COSTO_ENVIO_SW : 0;

        valorSubtotal.textContent = formatearClp(subtotal);
        if (valorEnvio) {
            valorEnvio.textContent = envio > 0 ? formatearClp(envio) : "Digital · Gratis";
        }
        valorTotal.textContent = formatearClp(subtotal + envio);
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

        const producto = buscarProductoUnificadoSW(idProducto);
        const limite = producto ? obtenerLimiteCantidad(producto) : LIMITE_CANTIDAD_SIN_STOCK_SW;

        if (accion === "sumar") {
            if (linea.cantidad >= limite) {
                mostrarAvisoSW("No hay más stock disponible de este producto");
                return;
            }
            linea.cantidad += 1;
        } else if (accion === "restar") {
            linea.cantidad = Math.max(linea.cantidad - 1, 1);
        } else {
            return;
        }

        guardarCarritoSW(carrito);
        renderizarCarrito();
    });

    // Bloquea punto, coma, signo y notación científica al teclear: en la
    // cantidad del carrito no tiene sentido ningún valor que no sea un
    // entero positivo.
    listaCarrito.addEventListener("keydown", (evento) => {
        if (!evento.target.classList.contains("entrada-cantidad")) return;
        if (["-", "+", "e", "E", ".", ","].includes(evento.key)) {
            evento.preventDefault();
        }
    });

    // Red de seguridad por si el valor decimal/negativo entra por otra vía
    // (pegar texto, autocompletado): deja solo dígitos.
    listaCarrito.addEventListener("input", (evento) => {
        if (!evento.target.classList.contains("entrada-cantidad")) return;
        const limpio = evento.target.value.replace(/[^0-9]/g, "");
        if (limpio !== evento.target.value) evento.target.value = limpio;
    });

    listaCarrito.addEventListener("change", (evento) => {
        if (!evento.target.classList.contains("entrada-cantidad")) return;

        const item = evento.target.closest(".carrito-item");
        const idProducto = item.dataset.id;
        const producto = buscarProductoUnificadoSW(idProducto);
        const limite = producto ? obtenerLimiteCantidad(producto) : LIMITE_CANTIDAD_SIN_STOCK_SW;
        const valorCrudo = evento.target.value;
        const cantidad = normalizarCantidadEntera(valorCrudo, limite);

        if (producto && esProductoFisico(producto) && Number(valorCrudo) > limite) {
            mostrarAvisoSW(`Solo hay ${limite} unidades disponibles`);
        }

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
