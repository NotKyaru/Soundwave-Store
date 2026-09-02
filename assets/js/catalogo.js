// catalogo.js — Lista de álbumes con panel de vista previa (inspirado en
// la lista de la tienda de Steam): al pasar el mouse o el foco por una
// fila se actualiza el panel de la derecha con el resumen y las pistas
// del álbum. Los datos vienen de assets/js/productos.js.

document.addEventListener("DOMContentLoaded", () => {
    const listaCatalogo = document.querySelector("#lista-catalogo");
    const filtrosEtiquetas = document.querySelector("#filtros-etiquetas");
    const panel = document.querySelector("#panel-vista-previa");

    if (!listaCatalogo || !panel) return;

    let etiquetaActiva = null;

    function formatearClp(numero) {
        return "$" + numero.toLocaleString("es-CL");
    }

    function obtenerEtiquetasFiltrables() {
        const conteo = new Map();

        PRODUCTOS_SOUNDWAVE.forEach((producto) => {
            producto.etiquetas.forEach((etiqueta) => {
                conteo.set(etiqueta, (conteo.get(etiqueta) || 0) + 1);
            });
        });

        // Solo interesan las etiquetas que NO están en todos los álbumes:
        // filtrar por "Soundfont" o "SM64" no serviría de nada porque
        // aparecen en los 6 discos.
        return [...conteo.entries()]
            .filter(([, cantidad]) => cantidad < PRODUCTOS_SOUNDWAVE.length)
            .map(([etiqueta]) => etiqueta);
    }

    function renderizarFiltros() {
        const etiquetas = obtenerEtiquetasFiltrables();

        const chipTodos = document.createElement("button");
        chipTodos.type = "button";
        chipTodos.className = "filtro-etiqueta";
        chipTodos.textContent = "Todos";
        chipTodos.setAttribute("aria-pressed", String(etiquetaActiva === null));
        if (etiquetaActiva === null) chipTodos.classList.add("activo");
        chipTodos.addEventListener("click", () => {
            etiquetaActiva = null;
            actualizarVista();
        });
        filtrosEtiquetas.appendChild(chipTodos);

        etiquetas.forEach((etiqueta) => {
            const chip = document.createElement("button");
            chip.type = "button";
            chip.className = "filtro-etiqueta";
            chip.textContent = etiqueta;
            chip.setAttribute("aria-pressed", String(etiquetaActiva === etiqueta));
            if (etiquetaActiva === etiqueta) chip.classList.add("activo");
            chip.addEventListener("click", () => {
                etiquetaActiva = etiquetaActiva === etiqueta ? null : etiqueta;
                actualizarVista();
            });
            filtrosEtiquetas.appendChild(chip);
        });
    }

    function crearFilaCatalogo(producto) {
        const fila = document.createElement("a");
        fila.href = producto.detalle;
        fila.className = "fila-catalogo";
        fila.dataset.id = producto.id;

        fila.innerHTML = `
            <img class="fila-portada" src="${producto.imagen}" alt="${producto.titulo}">
            <div class="fila-info">
                <h3 class="fila-titulo">${producto.titulo}</h3>
                <ul class="fila-etiquetas">
                    ${producto.etiquetas.map((etiqueta) => `<li>${etiqueta}</li>`).join("")}
                </ul>
            </div>
            <p class="fila-precio">${formatearClp(producto.precio)}</p>
        `;

        fila.addEventListener("mouseenter", () => seleccionarFila(fila, producto));
        fila.addEventListener("focus", () => seleccionarFila(fila, producto));

        return fila;
    }

    function seleccionarFila(fila, producto) {
        listaCatalogo.querySelectorAll(".fila-catalogo").forEach((elemento) => {
            elemento.classList.toggle("activa", elemento === fila);
        });
        renderizarPanel(producto);
    }

    function renderizarPanel(producto) {
        panel.innerHTML = `
            <img class="portada-ficha" src="${producto.imagen}" alt="Portada de ${producto.titulo}">
            <h2 class="panel-titulo">${producto.titulo}</h2>
            <p class="nota-compra">Por ${producto.artista}</p>
            <p class="resumen-ficha">${producto.resumen}</p>
            <p class="reseñas">
                Reseñas generales:
                <strong>${producto.reseña.texto}</strong>
                <span>(${producto.reseña.porcentaje}% de ${producto.reseña.cantidad} reseñas)</span>
            </p>
            <ul class="etiquetas">
                ${producto.etiquetas.map((etiqueta) => `<li>${etiqueta}</li>`).join("")}
            </ul>
            <div class="bloque-texto panel-pistas">
                <h3>Lista de pistas</h3>
                <ol class="lista-pistas">
                    ${producto.pistas
                        .map(
                            (pista) => `
                        <li class="${pista.destacada ? "pista-destacada" : ""}">
                            <span>${pista.titulo}</span>
                            <span>${pista.duracion}</span>
                        </li>
                    `
                        )
                        .join("")}
                </ol>
            </div>
            <div class="acciones-compra">
                <p class="precio">${formatearClp(producto.precio)}</p>
                <a class="boton-ver-ficha" href="${producto.detalle}">Ver ficha completa</a>
            </div>
        `;
    }

    function actualizarVista() {
        listaCatalogo.innerHTML = "";
        filtrosEtiquetas.innerHTML = "";
        renderizarFiltros();

        const productosFiltrados = etiquetaActiva
            ? PRODUCTOS_SOUNDWAVE.filter((producto) => producto.etiquetas.includes(etiquetaActiva))
            : PRODUCTOS_SOUNDWAVE;

        productosFiltrados.forEach((producto) => {
            listaCatalogo.appendChild(crearFilaCatalogo(producto));
        });

        if (productosFiltrados.length > 0) {
            const primeraFila = listaCatalogo.querySelector(".fila-catalogo");
            seleccionarFila(primeraFila, productosFiltrados[0]);
        } else {
            panel.innerHTML = "<p class=\"nota-compra\">No hay álbumes con esa etiqueta todavía.</p>";
        }
    }

    actualizarVista();
});
