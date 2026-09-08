// catalogo.js — Catálogo unificado de SoundWave: combina los álbumes
// (assets/js/productos.js) y los instrumentos y equipos (assets/js/instrumentos.js)
// en una sola lista, con buscador por nombre/artista/marca y filtro por
// categoría. Mismo patrón de lista + panel de vista previa inspirado en
// Steam que este archivo ya usaba cuando solo mostraba álbumes.

document.addEventListener("DOMContentLoaded", () => {
    const listaCatalogo = document.querySelector("#lista-catalogo");
    const filtrosEtiquetas = document.querySelector("#filtros-etiquetas");
    const panel = document.querySelector("#panel-vista-previa");
    const buscador = document.querySelector("#buscador-catalogo");

    if (!listaCatalogo || !panel) return;

    let categoriaActiva = null;
    let terminoBusqueda = "";

    function formatearClp(numero) {
        return "$" + numero.toLocaleString("es-CL");
    }

    function normalizar(texto) {
        return texto
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .toLowerCase();
    }

    function construirCatalogoCompleto() {
        const albumes = (typeof PRODUCTOS_SOUNDWAVE !== "undefined" ? PRODUCTOS_SOUNDWAVE : [])
            .map((producto) => ({ ...producto, tipo: "album", categoria: "Álbumes" }));
        const instrumentos = (typeof PRODUCTOS_INSTRUMENTOS !== "undefined" ? PRODUCTOS_INSTRUMENTOS : [])
            .map((producto) => ({ ...producto, tipo: "instrumento" }));
        return [...albumes, ...instrumentos];
    }

    const CATALOGO_COMPLETO = construirCatalogoCompleto();

    function textoBuscableDe(producto) {
        const campos = producto.tipo === "album"
            ? [producto.titulo, producto.artista, ...producto.etiquetas]
            : [producto.titulo, producto.marca, producto.modelo, producto.subcategoria];
        return normalizar(campos.join(" "));
    }

    function obtenerCategorias() {
        const vistas = [];
        CATALOGO_COMPLETO.forEach((producto) => {
            if (!vistas.includes(producto.categoria)) vistas.push(producto.categoria);
        });
        return vistas;
    }

    function renderizarFiltros() {
        const categorias = obtenerCategorias();

        const chipTodos = document.createElement("button");
        chipTodos.type = "button";
        chipTodos.className = "filtro-etiqueta";
        chipTodos.textContent = "Todos";
        chipTodos.setAttribute("aria-pressed", String(categoriaActiva === null));
        if (categoriaActiva === null) chipTodos.classList.add("activo");
        chipTodos.addEventListener("click", () => {
            categoriaActiva = null;
            actualizarVista();
        });
        filtrosEtiquetas.appendChild(chipTodos);

        categorias.forEach((categoria) => {
            const chip = document.createElement("button");
            chip.type = "button";
            chip.className = "filtro-etiqueta";
            chip.textContent = categoria;
            chip.setAttribute("aria-pressed", String(categoriaActiva === categoria));
            if (categoriaActiva === categoria) chip.classList.add("activo");
            chip.addEventListener("click", () => {
                categoriaActiva = categoriaActiva === categoria ? null : categoria;
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

        const etiquetasFila = producto.tipo === "album"
            ? producto.etiquetas.slice(0, 3)
            : [producto.subcategoria, producto.marca];

        fila.innerHTML = `
            <img class="fila-portada" src="${producto.imagen}" alt="${producto.titulo}">
            <div class="fila-info">
                <h3 class="fila-titulo">${producto.titulo}</h3>
                <ul class="fila-etiquetas">
                    ${etiquetasFila.map((etiqueta) => `<li>${etiqueta}</li>`).join("")}
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

    function renderizarPanelAlbum(producto) {
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

    function renderizarPanelInstrumento(producto) {
        const disponibilidad = producto.stock > 0
            ? `<strong>Disponible</strong><span>(${producto.stock} unidades en stock)</span>`
            : `<strong>Sin stock</strong><span>por ahora</span>`;

        panel.innerHTML = `
            <img class="portada-ficha" src="${producto.imagen}" alt="${producto.titulo}">
            <h2 class="panel-titulo">${producto.titulo}</h2>
            <p class="nota-compra">${producto.marca} · ${producto.modelo}</p>
            <p class="resumen-ficha">${producto.descripcion}</p>
            <p class="reseñas">
                Disponibilidad:
                ${disponibilidad}
            </p>
            <ul class="etiquetas">
                <li>${producto.categoria}</li>
                <li>${producto.subcategoria}</li>
            </ul>
            <div class="acciones-compra">
                <p class="precio">${formatearClp(producto.precio)}</p>
                <a class="boton-ver-ficha" href="${producto.detalle}">Ver ficha completa</a>
            </div>
        `;
    }

    function renderizarPanel(producto) {
        if (producto.tipo === "album") {
            renderizarPanelAlbum(producto);
        } else {
            renderizarPanelInstrumento(producto);
        }
    }

    function obtenerProductosFiltrados() {
        return CATALOGO_COMPLETO.filter((producto) => {
            const coincideCategoria = categoriaActiva === null || producto.categoria === categoriaActiva;
            const coincideBusqueda = terminoBusqueda === "" || textoBuscableDe(producto).includes(terminoBusqueda);
            return coincideCategoria && coincideBusqueda;
        });
    }

    function actualizarVista() {
        listaCatalogo.innerHTML = "";
        filtrosEtiquetas.innerHTML = "";
        renderizarFiltros();

        const filtrados = obtenerProductosFiltrados();

        filtrados.forEach((producto) => {
            listaCatalogo.appendChild(crearFilaCatalogo(producto));
        });

        if (filtrados.length > 0) {
            const primeraFila = listaCatalogo.querySelector(".fila-catalogo");
            seleccionarFila(primeraFila, filtrados[0]);
        } else {
            panel.innerHTML = '<p class="nota-compra">No hay productos que coincidan con tu búsqueda.</p>';
        }
    }

    if (buscador) {
        buscador.addEventListener("input", (evento) => {
            terminoBusqueda = normalizar(evento.target.value.trim());
            actualizarVista();
        });
    }

    actualizarVista();
});
