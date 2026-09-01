// productos.js — Catálogo de álbumes de SoundWave, usado por carrito.html
// para mostrar los datos de cada línea guardada en localStorage.

const PRODUCTOS_SOUNDWAVE = [
    {
        id: "1",
        titulo: "Demon Days SM64 Soundfont Cover",
        precio: 4990,
        imagen: "assets/img/Screenshot_1.png",
        detalle: "detalle_1.html",
        formato: "MP3, WAV, Soundfont · Descarga digital"
    },
    {
        id: "2",
        titulo: "In Utero SM64 Soundfont Cover",
        precio: 4990,
        imagen: "assets/img/Screenshot_2.png",
        detalle: "detalle_2.html",
        formato: "MP3, WAV, Soundfont · Descarga digital"
    },
    {
        id: "3",
        titulo: "Nevermind SM64 Soundfont Cover",
        precio: 4990,
        imagen: "assets/img/Screenshot_3.png",
        detalle: "detalle_3.html",
        formato: "MP3, WAV, Soundfont · Descarga digital"
    },
    {
        id: "4",
        titulo: "Facelift SM64 Soundfont Cover",
        precio: 4990,
        imagen: "assets/img/Screenshot_4.png",
        detalle: "detalle_4.html",
        formato: "MP3, WAV, Soundfont · Descarga digital"
    },
    {
        id: "5",
        titulo: "Super Black Parade 64 Soundfont Cover",
        precio: 4990,
        imagen: "assets/img/Screenshot_5.png",
        detalle: "detalle_5.html",
        formato: "MP3, WAV, Soundfont · Descarga digital"
    },
    {
        id: "6",
        titulo: "...And Justice for All SM64 Soundfont Cover",
        precio: 4990,
        imagen: "assets/img/Screenshot_6.png",
        detalle: "detalle_6.html",
        formato: "MP3, WAV, Soundfont · Descarga digital"
    }
];

function buscarProductoSW(idProducto) {
    return PRODUCTOS_SOUNDWAVE.find((producto) => producto.id === idProducto);
}
