# 🎸 SoundWave Store

Tienda en línea de instrumentos musicales, equipos de sonido y álbumes, desarrollada como proyecto académico para el curso **DSY1104 – Desarrollo FullStack II**. El proyecto está inspirado en el caso de negocio **"Sonido Vivo"**: una tienda de instrumentos que necesita pasar de la venta presencial y por WhatsApp/Instagram a un catálogo online ordenado, con carrito de compras y una interfaz que funcione en celular, tablet y escritorio.

> Este repositorio contiene el **prototipo de frontend** de la solución: la maqueta visual y funcional del sitio, construida con HTML, CSS y JavaScript puro.

---

## 📋 Tabla de contenidos

- [Sobre el proyecto](#-sobre-el-proyecto)
- [Funcionalidades](#-funcionalidades)
- [Tecnologías](#-tecnologías)
- [Estructura del proyecto](#-estructura-del-proyecto)
- [Cómo ejecutarlo](#-cómo-ejecutarlo)
- [Roadmap](#-roadmap)
- [Autores](#-autores)

---

## 🛒 Sobre el proyecto

Sonido Vivo es una tienda física en Viña del Mar que hoy recibe pedidos remotos por WhatsApp e Instagram y controla su inventario a mano en Excel y cuadernos. Esto genera mensajes sin responder, stock desactualizado y ventas duplicadas.

SoundWave Store busca resolver ese problema entregando una experiencia de compra online: catálogo navegable, ficha de producto, carrito con reglas de stock, y vistas de autenticación, todo pensado para funcionar igual de bien en un teléfono que en un computador de escritorio.

## ✨ Funcionalidades

- **Catálogo unificado** — combina instrumentos/equipos (con stock real) y álbumes digitales en una sola vista, con buscador por nombre/marca/artista y filtro por categoría.
- **Fichas de producto** — una página de detalle por cada instrumento y álbum, con imagen, descripción, precio y disponibilidad.
- **Carrito de compras persistente** — guardado en `localStorage`, con reglas distintas para productos físicos (cantidad limitada al stock disponible, costo de envío fijo) y álbumes digitales (sin límite de stock, envío gratis).
- **Diseño responsive** — probado en los tres quiebres que pide el proyecto: móvil (≥360px), tablet (≥768px) y escritorio (≥1280px), con menú tipo "hamburguesa" en pantallas pequeñas.
- **Vistas de autenticación** — pantallas de inicio de sesión y registro (maquetas de UI, ver [Roadmap](#-roadmap)).
- **Contenido institucional** — secciones de blog/noticias y "Nosotros".

## 🛠 Tecnologías

| Capa | Tecnología |
|---|---|
| Estructura | HTML5 semántico |
| Estilos | CSS3 (mobile-first, `@media` queries) |
| Interactividad | JavaScript (vanilla, sin frameworks) |
| Persistencia de datos | `localStorage` del navegador |

No se usan librerías ni build tools: el sitio corre abriendo los `.html` directamente o sirviéndolos con cualquier servidor estático.

## 📁 Estructura del proyecto

```
Soundwave-Store/
├── inicio.html              # Página principal
├── catalogo.html            # Catálogo unificado (instrumentos + álbumes)
├── carrito.html             # Carrito de compras
├── login.html               # Inicio de sesión (maqueta)
├── register.html            # Registro de cuenta (maqueta)
├── nosotros.html            # Quiénes somos
├── blog.html                # Blog / noticias
├── noticia-detalle-*.html   # Detalle de cada noticia
├── instrumentos/            # Ficha de detalle por instrumento (instrumento_XXNNN.html)
├── albumes/                 # Ficha de detalle por álbum
└── assets/
    ├── css/estilos.css      # Todos los estilos del sitio
    ├── js/
    │   ├── app.js           # Lógica central del carrito (localStorage)
    │   ├── catalogo.js      # Buscador y filtros del catálogo
    │   ├── carrito.js       # Renderizado y edición del carrito
    │   ├── productos.js     # Datos de los álbumes
    │   ├── instrumentos.js  # Datos de instrumentos y equipos
    │   └── menu.js          # Menú hamburguesa (mobile)
    └── img/                 # Imágenes y logo
```

## ▶ Cómo ejecutarlo

No requiere instalación ni dependencias.

1. Clona el repositorio.
2. Abre `inicio.html` en tu navegador (doble clic, o "Open with Live Server" en VS Code).

```bash
git clone https://github.com/NotKyaru/Soundwave-Store.git
```

## 🗺 Roadmap

### Problemas que enfrentamos y cómo los resolvimos

| Problema | Solución aplicada |
|---|---|
| El catálogo mostraba solo álbumes (formato tipo tienda de música); el negocio real vende instrumentos y equipos. | Se unificó todo en un solo catálogo (`catalogo.js`) que combina ambos orígenes de datos y distingue producto físico de digital al momento de renderizar. |
| Un producto físico y uno digital no pueden compartir las mismas reglas de carrito (uno tiene stock limitado y envío, el otro no). | Se agregó lógica en `carrito.js`/`app.js` que detecta el tipo de producto (`stock` numérico = físico) y aplica límites de cantidad y costo de envío solo cuando corresponde. |
| El menú de navegación se rompía en celulares al rotar la pantalla (orientación horizontal). | Se corrigió el CSS del menú responsive para landscape. |
| Un merge entre ramas de trabajo en paralelo sobrescribió por error el contenido de `nosotros.html`. | Se reconstruyó la página manualmente a partir del contenido perdido y se tuvo más cuidado al resolver conflictos en los merges siguientes. |
| El proyecto empezó con todos los archivos sueltos en la raíz, dificultando ubicar cosas a medida que crecía. | Se reorganizó todo en carpetas por tipo (`assets/css`, `assets/js`, `assets/img`, `instrumentos/`, `albumes/`). |
| Cantidades inválidas podían quedar guardadas en el carrito (decimales, o más unidades que el stock actual). | Se agregó un saneo automático del carrito al cargar la página, que corrige o elimina líneas inválidas. |

### Qué falta para cumplir el alcance completo del proyecto

El enunciado del curso pide una solución fullstack con roles de usuario, backend en microservicios y base de datos. Este repositorio cubre la capa visual; lo siguiente queda pendiente:

- [ ] **Backend real** con Spring Boot, organizado en microservicios independientes que expongan una API REST en JSON (hoy los datos de productos viven hardcodeados en `productos.js` / `instrumentos.js`).
- [ ] **Base de datos** relacional (MySQL/PostgreSQL) normalizada, reemplazando los arreglos en JavaScript y el carrito en `localStorage`.
- [ ] **Autenticación y roles reales** (Administrador, Vendedor, Cliente). Hoy `login.html` y `register.html` son solo maquetas de interfaz: no validan credenciales ni protegen ninguna vista.
- [ ] **Panel de administración** para gestionar usuarios, productos y stock.
- [ ] **Flujo de pedidos completo**, con estados de seguimiento (en preparación, despachado, entregado) en vez del carrito actual, que termina en nada.
- [ ] **Mapa interactivo** (Leaflet o Google Maps) con la ubicación de la tienda y puntos de retiro.
- [ ] **Despliegue en la nube** (AWS + Docker), hoy el sitio solo corre localmente.
- [ ] Migrar el frontend a **React**, tal como exige el stack tecnológico del proyecto.

## 👥 Autores

Proyecto desarrollado en equipo para DSY1104 — Desarrollo FullStack II.

- Kyaru ([@NotKyaru](https://github.com/NotKyaru))
- dzynss / dzy
- Enrique Gutierrez

---

<p align="center">Proyecto académico · Sin fines comerciales</p>
